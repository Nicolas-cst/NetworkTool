from dataclasses import dataclass
from pydantic import BaseModel
from models.Protocol import Protocol

class Packet(BaseModel):
    id: int
    timestamp: str
    src_ip: str
    dest_ip: str
    protocol: Protocol
    length: int