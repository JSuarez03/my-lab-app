from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Patient
from app.schemas import PatientCreate, PatientUpdate, PatientResponse
from app.routes.auth import get_current_user

router = APIRouter(prefix="/patients", tags=["patients"])

@router.get("/", response_model=List[PatientResponse])
def list_patients(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)  # Proteger con JWT
):
    return db.query(Patient).all()

@router.post("/", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
def create_patient(
    patient_data: PatientCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    # Verificar identificación única
    existing = db.query(Patient).filter(Patient.identification == patient_data.identification).first()
    if existing:
        raise HTTPException(status_code=400, detail="La cédula ya está registrada")
    
    new_patient = Patient(**patient_data.model_dump())
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient

@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    return patient

@router.put("/{patient_id}", response_model=PatientResponse)
def update_patient(
    patient_id: int,
    patient_data: PatientUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    # Si se cambia la identificación, verificar que no esté en uso por otro paciente
    if patient_data.identification and patient_data.identification != patient.identification:
        existing = db.query(Patient).filter(Patient.identification == patient_data.identification).first()
        if existing:
            raise HTTPException(status_code=400, detail="La cédula ya está registrada por otro paciente")

    for key, value in patient_data.model_dump(exclude_unset=True).items():
        setattr(patient, key, value)
    
    db.commit()
    db.refresh(patient)
    return patient

@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    db.delete(patient)
    db.commit()
    return None