from dataclasses import asdict
import threading
from typing import List
from fastapi import WebSocket, WebSocketDisconnect
from scapy.all import sniff, get_if_list
import asyncio
import psutil
from models import Packet

class NetworkService:

    def __init__(self):
        self.sniff_thread = None
        self.stop_sniffing = False
        
    # async def get_network_packets(self,websocket: WebSocket, iface_id: int, count: int = 0):
    #     loop = asyncio.get_event_loop()
    #     packets: List[dict] = []
    #     counter = 0

    #     def handle_packet(pkt):
    #         nonlocal counter
    #         counter += 1
    #         if pkt.haslayer("IP"):
    #             packet = Packet(
    #                 id=counter,
    #                 timestamp=str(pkt.time),
    #                 src_ip=pkt["IP"].src,
    #                 dest_ip=pkt["IP"].dst,
    #                 protocol=str(pkt["IP"].proto),
    #                 length=len(pkt)
    #             )
    #             packets.append(asdict(packet))

    #     loop.run_in_executor(None, lambda: sniff(iface = get_if_list()[iface_id], count=count, prn=handle_packet))

    #     while True:
    #         if packets:
    #             await websocket.send_json(packets.copy())
    #             packets.clear()
    #         await asyncio.sleep(2)

    def all_network_interfaces(self):
        return list(psutil.net_if_addrs().keys())


   

    def start_sniffing(self, send_callback, loop):
        self.stop_sniffing = False

        def handle_packet(pkt):
            if self.stop_sniffing:
                return
            if pkt.haslayer("IP"):
                packet = Packet(
                    id=int(pkt.time),
                    timestamp=str(pkt.time),
                    src_ip=pkt["IP"].src,
                    dest_ip=pkt["IP"].dst,
                    protocol=str(pkt["IP"].proto),
                    length=len(pkt)
                )
                # Envoie le paquet dans le loop principal
                asyncio.run_coroutine_threadsafe(send_callback(asdict(packet)), loop)

        threading.Thread(target=lambda: sniff(prn=handle_packet), daemon=True).start()
        
    def stop(self):
        """Stoppe proprement le sniff."""
        self.stop_sniffing = True