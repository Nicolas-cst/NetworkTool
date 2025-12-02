from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Protocols(Base):
    __tablename__ = "protocols"

    ProtocolId = Column(Integer, primary_key=True, index=True)
    Name = Column(String, index=True, nullable=False)

    filters = relationship("Filters", secondary="protocolFilterLink", back_populates="protocols")
    
