from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class ProtocolFilterLink(Base):
    __tablename__ = "protocolFilterLink"
    Base.metadata
    ProtocolId = Column(Integer, ForeignKey("Protocols.id"), primary_key=True, index=True)
    FilterId = Column(Integer, ForeignKey("Filters.id"), primary_key=True, index=True)
    
