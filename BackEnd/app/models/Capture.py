from pydantic import BaseModel
from typing import List
from datetime import date
from models.Filter import Filter
from models.Packet import Packet

class Capture(BaseModel):
    id: int
    filter: Filter
    start_date: date
    end_date: date
    data: List[Packet]
    interfaceId: str
    
