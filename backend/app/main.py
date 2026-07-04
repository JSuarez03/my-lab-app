from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app import models
from app.routes import auth, patients


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Laboratorio Clínico API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)  # ✅ Esto es correcto
app.include_router(patients.router)  # ✅ Esto es correcto

@app.get("/")
def root():
    return {"message": "API del Laboratorio Clínico IVSS"}

@app.get("/health")
def health():
    return {"status": "ok", "message": "Servidor funcionando correctamente"}