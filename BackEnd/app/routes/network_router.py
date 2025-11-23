from fastapi import APIRouter
from services import network_service
from scapy.all import sniff
import logging

logger = logging.getLogger("uvicorn")
router = APIRouter()
ns = network_service.NetworkService()


# Lancement de la capture
@router.get("/network/start/{interface}")
def start_capture(interface: int):
    logger.info(f"📡 Route /network/start/{interface} called")
    return ns.start_capture(interface)

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
