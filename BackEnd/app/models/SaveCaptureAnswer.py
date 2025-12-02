from pydantic import BaseModel

class SaveCaptureAnswer(BaseModel):
    capture_id: int
    