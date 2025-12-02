from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship 
from database import Base

class IpRanges(Base):
    __tablename__ = "ipRanges"

    RangeId = Column(Integer, primary_key=True, index=True)
    FilterId = Column(Integer, ForeignKey("filters.FilterId"), index=True)
    Type = Column(Integer, index=True)
    StartIp = Column(String, index=True)
    EndtIp = Column(String, index=True)

    filter = relationship("filters", back_populates="ipRanges")