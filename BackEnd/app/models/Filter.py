from pydantic import BaseModel
from typing import List
from models.IpRange import IpRange
from models.Protocol import Protocol
from models.LengthRange import LengthRange

class Filter(BaseModel):
    destinationIpRanges: List[IpRange] = []
    sourceIpRanges: List[IpRange] = []
    destinationIps: List[str] = []
    sourceIps: List[str] = []
    protocols: List[Protocol] = []
    lengthRanges: List[LengthRange] = []
