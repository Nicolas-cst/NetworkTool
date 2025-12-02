from sqlalchemy import Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Packets(Base):
    __tablename__ = "packets"

    PacketId = Column(Integer, primary_key=True, index=True)
    CaptureId = Column(Integer, ForeignKey("captures.CaptureId"), index=True)
    ProtocolId = Column(Integer, ForeignKey("protocols.ProtocolId"), index=True)
    Timestamp = Column(Date, index=True)
    SourceIp = Column(String, index=True)
    DestIp = Column(String, index=True)
    Length = Column(Integer, index=True)

    protocol = relationship("Protocolss", back_populates="packets")
    capture = relationship("Captures", back_populates="packets")