from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship 
from database import Base

class IpRanges(Base):
    __tablename__ = "ipRanges"

    RangeId = Column(Integer, primary_key=True, index=True)
    FilterId = Column(Integer, ForeignKey("Filters.id"), index=True)
    Type = Column(Integer, index=True)
    StartIp = Column(String, index=True)
    EndtIp = Column(String, index=True)

    filter = relationship("Filter", back_populates="ipRanges")