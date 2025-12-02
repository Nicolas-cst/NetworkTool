from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.network_router import router
from database.database import engine, Base
from database.tables import *


Base.metadata.create_all(bind=engine)   # Crée toutes les tables dans la base de données

app = FastAPI(title="Network Tool API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # mon frontend
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE...
    allow_headers=["*"],  # tous les headers
)

app.include_router(router)
