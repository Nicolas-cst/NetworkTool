from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship
from database import Base

class Filters(Base):
    __tablename__ = "filters"

    FilterId = Column(Integer, primary_key=True, index=True)

    protocols = relationship("Protocols", secondary="protocolFilterLink", back_populates="filters")
    
