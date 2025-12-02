from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Ips(Base):
    __tablename__ = "Ips"

    FilterId = Column(Integer, ForeignKey("filters.FilterId"), primary_key=True, index=True)
    Ip = Column(String, primary_key=True, index=True)
    Type = Column(Integer, index=True)

    filter = relationship("Filters", back_populates="ips")
    
