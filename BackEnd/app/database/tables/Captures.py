from sqlalchemy import Column, Date, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database.database import Base

class Captures(Base):
    __tablename__ = "captures"

    CaptureId = Column(Integer, primary_key=True, index=True)
    FilterId = Column(Integer, ForeignKey("filters.FilterId"), index=True)
    StartDate = Column(Date, index=True)
    EndDate = Column(Date, index=True)
    Interface = Column(Integer, index=True)

    filter = relationship("Filters", back_populates="captures")
    
