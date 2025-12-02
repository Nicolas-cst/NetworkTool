from pydantic import BaseModel

class LengthRange(BaseModel):
  min : int
  max : int