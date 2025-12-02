import json
from fastapi import APIRouter
from models.Capture import Capture
from services import network_service
import logging
from models.Filter import Filter
from models.SaveCaptureAnswer import SaveCaptureAnswer

logger = logging.getLogger("uvicorn")
router = APIRouter()
ns = network_service.NetworkService()


# Lancement de la capture
@router.post("/network/start/{interface}")
def start_capture(interface: int, filter : Filter):
    logger.info(f"📡 Route /network/start/{interface} called with filter {filter}")
    return ns.start_capture(interface, filter)

# Arrêt de la capture
@router.get("/network/stop")
def stop_capture():
    return ns.stop_capture()

# Récupération des paquets capturés
@router.get("/network/packets")
def getPackets():
    return ns.getPackets()

# Récupération des interfaces réseau
@router.get("/network/interfaces")
def get_network_interfaces():
    return ns.all_network_interfaces()

@router.post("/network/save-capture", response_model=SaveCaptureAnswer)
def save_capture(capture: Capture) -> SaveCaptureAnswer:
    capture_id_answer: SaveCaptureAnswer = ns.save_capture(capture)
    return capture_id_answer