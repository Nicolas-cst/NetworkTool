from pydantic import BaseModel
from typing import Optional, Dict, Any

class IpRange(BaseModel):
    start: str
    end: str