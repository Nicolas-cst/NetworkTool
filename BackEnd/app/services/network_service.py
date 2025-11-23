from typing import List
import psutil
from scapy.all import sniff, IP, IPv6, TCP, UDP
import threading
from datetime import datetime
import logging

logger = logging.getLogger("uvicorn")

class NetworkService:
    def __init__(self):
        self.packets = []
        self.capturing = False
        self.interface = None
        self.capture_thread = None
        self.packet_id_counter = 0
        logger.info("✅ NetworkService initialized")

    def all_network_interfaces(self):
        return list(psutil.net_if_addrs().keys())
    
    def start_capture(self, interface_index: int):
        logger.info(f"🚀 start_capture called with interface_index={interface_index}")
        if self.capturing:
            return {"status": "Capture already running"}

        # Convertir l'index en nom d'interface
        interfaces = self.all_network_interfaces()
        if interface_index < 0 or interface_index >= len(interfaces):
            return {"status": "error", "message": "Invalid interface index"}
        
        self.interface = interfaces[interface_index]
        self.capturing = True
        self.packets = []
        self.packet_id_counter = 0

        # Lancement du thread
        self.capture_thread = threading.Thread(
            target=self._sniff_loop,
            daemon=True
        )
        self.capture_thread.start()

        return {"status": "capture started", "interface": self.interface}
    
    def stop_capture(self):
        logger.info("🛑 stop_capture called")
        self.capturing = False
        return {"status": "Capture stopped"}
    
    def getPackets(self):
        return self.packets 
    
    def _sniff_loop(self):
        logger.info(f"🔍 Starting sniff on interface {self.interface}")
        """sniff en continu sans bloquer l'API"""
        while self.capturing:
            sniff(
                iface=self.interface,
                prn=self._process_packet,
                store=False,
                timeout=1
            )

    def _process_packet(self, pkt):
        """Convertit un paquet Scapy en dictionnaire sérialisable"""
        try:
            self.packet_id_counter += 1
            packet_dict = {
                "id": self.packet_id_counter,
                "timestamp": datetime.now().isoformat(),
                "src_ip": None,
                "dest_ip": None,
                "protocol": pkt.name if hasattr(pkt, 'name') else "Unknown",
                "length": len(pkt)
            }
            
            # Extraire les IPs si disponibles
            if IP in pkt:
                packet_dict["src_ip"] = pkt[IP].src
                packet_dict["dest_ip"] = pkt[IP].dst
                if TCP in pkt:
                    packet_dict["protocol"] = "TCP"
                elif UDP in pkt:
                    packet_dict["protocol"] = "UDP"
            elif IPv6 in pkt:
                packet_dict["src_ip"] = pkt[IPv6].src
                packet_dict["dest_ip"] = pkt[IPv6].dst
                if TCP in pkt:
                    packet_dict["protocol"] = "TCP"
                elif UDP in pkt:
                    packet_dict["protocol"] = "UDP"
            
            self.packets.append(packet_dict)
        except Exception as e:
            logger.error(f"❌ Error processing packet: {e}")