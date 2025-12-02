from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class LengthRanges(Base):
    __tablename__ = "lengthRanges"

    LengthRangeId = Column(Integer, primary_key=True, index=True)
    FilterId = Column(Integer, ForeignKey("filters.FilterId"), index=True)
    MinLength = Column(Integer, index=True)
    MaxLength = Column(Integer, index=True)

    filter = relationship("Filters", back_populates="length_ranges")    
    
