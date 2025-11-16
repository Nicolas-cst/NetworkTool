from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services import network_service  
import asyncio
router = APIRouter()
ns = network_service.NetworkService()

# @router.get("/network/packets")
# def get_network_packets():
#     return network_service.get_network_packets()


## Launch capture
@router.websocket("/network/start")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()  # Accepte la connexion

    loop = asyncio.get_running_loop()  # récupère le loop principal

    async def send_packet(packet_dict):
        await websocket.send_json(packet_dict)

    ns.start_sniffing(send_callback=send_packet, loop=loop)

    try:
        while True:
            await websocket.receive_text()  # Maintient la connexion ouverte
    except WebSocketDisconnect:
        ns.stop_sniffing = True




# ## Stop capture
# @router.websocket("/network/stop")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
    

@router.get("/network/interfaces")
def get_network_interfaces():
    return ns.all_network_interfaces()
