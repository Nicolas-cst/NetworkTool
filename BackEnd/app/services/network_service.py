from typing import List
import psutil
from scapy.all import sniff, IP, IPv6, TCP, UDP
import threading
from datetime import datetime
from sqlalchemy.orm import Session
from models import Capture, Filter, Packet, IpRange, LengthRange, Protocol
from database.tables import Captures, Filters, IpRanges, Ips, LengthRanges, Packets, ProtocolFilterLink, Protocols

class NetworkService:

    def __init__(self):
        self.packets = []
        self.capturing = False
        self.interface = None
        self.capture_thread = None
        self.packet_id_counter = 0

    def all_network_interfaces(self):
        return list(psutil.net_if_addrs().keys())
    
    def start_capture(self, interface_index: int, filter):
        logger.info(f"🚀 start_capture called with interface_index={interface_index} and filter={filter}")
        
        if self.capturing:
            return {"status": "Capture already running"}

        # Convertir l'index en nom d'interface
        interfaces = self.all_network_interfaces()
        if interface_index < 0 or interface_index >= len(interfaces):
            return {"status": "error", "message": "Invalid interface index"}
        
        self.interface = interfaces[interface_index]
        self.capturing = True
        self.packet_id_counter = 0
        self.startDatetime = datetime.now()
        self.filter = filter

        self.capture_thread = threading.Thread(
            target=self._sniff_loop,
            daemon=True
        )
        self.capture_thread.start()

        return {"status": "capture started", "interface": self.interface}
    
    def stop_capture(self):
        logger.info("🛑 stop_capture called")
        self.capturing = False
        self.packets = []
        return {"status": "Capture stopped"}
    
    def getPackets(self):
        # On retourne seulement les paquets capturés
        new_packets = self.packets
        self.packets = []
        return new_packets
    
    def _sniff_loop(self):
        logger.info(f"🔍 Starting sniff on interface {self.interface}")
        """sniff en continu sans bloquer l'API"""
        while self.capturing:
            sniff(
                iface=self.interface,
                prn=self._clean_packets,
                store=False,
                timeout=1
            )

    def _clean_packets(self, pkt):
        """Convertit un paquet Scapy en dictionnaire sérialisable"""
        try:
            self.packet_id_counter += 1
            delta = datetime.now() - self.startDatetime
            timestamp = round(delta.total_seconds() * 1000, 3)

            packet_dict = {
                "id": self.packet_id_counter,
                "timestamp": timestamp,
                "src_ip": None,
                "dest_ip": None,
                "protocol":"",
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
    
    def save_capture(db: Session, capture: Capture):
        
        new_filter = Filter()
        db.add(new_filter)
        db.commit()
        db.refresh(new_filter)

        
        new_capture = Captures(
            FilterId=new_filter.FilterId,  
            StartDate=capture.start_date,
            EndDate=capture.end_date,
            Interface=capture.interfaceId
        )
        db.add(new_capture)
        db.commit()
        db.refresh(new_capture)

        for lr in capture.filter.lengthRanges:
            new_lr = LengthRanges(
                FilterId=new_filter.FilterId,
                MinLength=lr.min,
                MaxLength=lr.max
            )
            db.add(new_lr)
        db.commit()

        for ir in capture.filter.sourceIpRanges:
            new_ir = IpRanges(
                FilterId=new_filter.FilterId,
                Type=0,
                StartIp=ir.start,
                EndIp=ir.end
            )
            db.add(new_ir)
  
        for ir in capture.filter.destinationIpRanges:
            new_ir = IpRanges(
                FilterId=new_filter.FilterId,
                Type=1,
                StartIp=ir.start,
                EndIp=ir.end
            )
            db.add(new_ir)
        db.commit()

        for ip in capture.filter.sourceIps:
            new_ip = Ips(FilterId=new_filter.FilterId, Ip=ip, Type=0)
            db.add(new_ip)

        for ip in capture.filter.destinationIps:
            new_ip = Ips(FilterId=new_filter.FilterId, Ip=ip, Type=1)
            db.add(new_ip)
        db.commit()

        for packet in capture.data:
            new_packet = Packets(
                CaptureId=new_capture.CaptureId,
                ProtocolId=packet.protocol.ProtocolId,
                Timestamp=packet.timestamp,
                SourceIp=packet.src_ip,
                DestIp=packet.dest_ip,
                Length=packet.length
            )
            db.add(new_packet)
        db.commit()

        return new_capture.CaptureId
