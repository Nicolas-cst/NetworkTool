from dataclasses import dataclass
from typing import Optional

@dataclass
class Packet:
    id: Optional[int] = None
    timestamp: Optional[str] = None
    src_ip: Optional[str] = None
    dest_ip: Optional[str] = None
    protocol: Optional[str] = None
    length: Optional[int] = None