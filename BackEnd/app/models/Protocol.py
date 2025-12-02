from pydantic import BaseModel

class Protocol(BaseModel):
  id : int
  name : str