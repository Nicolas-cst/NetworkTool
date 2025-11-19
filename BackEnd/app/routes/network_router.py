from fastapi import APIRouter, WebSocket
from services import network_service  
import asyncio
from scapy.all import sniff
import websockets
router = APIRouter()
ns = network_service.NetworkService()

# @router.get("/network/packets")
# def get_network_packets():
#     return network_service.get_network_packets()


@router.websocket("/network/start")
async def network_retrieval(websocket: WebSocket):
    await websocket.accept()

    loop = asyncio.get_running_loop()   # <-- correct

    def send_packet(pkt):
        summary = pkt.summary()
        print(f"Packet captured: {summary}")
        asyncio.run_coroutine_threadsafe(
            websocket.send_text(summary),
            loop
        )

    await asyncio.get_running_loop().run_in_executor(
        None,
        sniff,
        {
            "prn": send_packet,
            "store": 0
        }
    )

@router.get("/network/interfaces")
def get_network_interfaces():
    return ns.all_network_interfaces()
