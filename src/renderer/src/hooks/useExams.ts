import { useState, useEffect } from 'react'
import { Exam, ExamFormData } from '@renderer/features/exams/exam.types'
import { usePatients } from './usePatients'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Datos iniciales mock
const initialMockExams: Exam[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'María González',
    type: 'Hematología',
    date: '2025-03-20',
    parameters: [
      { id: 'hemoglobina', name: 'Hemoglobina', unit: 'g/dL', referenceMin: 12, referenceMax: 16, value: 14.5, type: 'number' },
      { id: 'hematocrito', name: 'Hematocrito', unit: '%', referenceMin: 36, referenceMax: 48, value: 42, type: 'number' },
      { id: 'leucocitos', name: 'Leucocitos', unit: 'x10³/µL', referenceMin: 4.5, referenceMax: 11, value: 7.2, type: 'number' },
      { id: 'plaquetas', name: 'Plaquetas', unit: 'x10³/µL', referenceMin: 150, referenceMax: 450, value: 280, type: 'number' },
    ],
    notes: 'Paciente en buen estado'
  }
]

// Función para cargar datos desde localStorage (si existe)
const loadExamsFromStorage = (): Exam[] => {
  const stored = localStorage.getItem('exams')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return initialMockExams
    }
  }
  return initialMockExams
}

// Función para guardar en localStorage
const saveExamsToStorage = (exams: Exam[]) => {
  localStorage.setItem('exams', JSON.stringify(exams))
}

export function useExams() {
  const [exams, setExams] = useState<Exam[]>(loadExamsFromStorage)
  const [isLoading, setIsLoading] = useState(false)
  const { patients } = usePatients()

  // Guardar en localStorage cada vez que cambien los exámenes
  useEffect(() => {
    saveExamsToStorage(exams)
  }, [exams])

  const createExam = async (data: ExamFormData): Promise<Exam> => {
    setIsLoading(true)
    await delay(500)

    const patient = patients.find(p => p.id === data.patientId)
    const patientName = patient ? patient.fullName : 'Paciente desconocido'

    const newExam: Exam = {
      id: String(Date.now()),
      patientId: data.patientId,
      patientName: patientName,
      type: data.type,
      date: data.date,
      parameters: data.parameters.map(p => ({
        ...p,
        value: p.value !== undefined ? p.value : (p.type === 'select' ? '' : 0),
        unit: p.unit || '',
        referenceMin: p.referenceMin || 0,
        referenceMax: p.referenceMax || 0,
      })),
      notes: data.notes,
    }

    setExams(prev => {
      const updated = [...prev, newExam]
      return updated
    })
    setIsLoading(false)
    return newExam
  }

  const updateExam = async (id: string, data: ExamFormData): Promise<Exam> => {
    setIsLoading(true)
    await delay(500)

    const patient = patients.find(p => p.id === data.patientId)
    const patientName = patient ? patient.fullName : 'Paciente desconocido'

    const updatedExam: Exam = {
      id,
      patientId: data.patientId,
      patientName: patientName,
      type: data.type,
      date: data.date,
      parameters: data.parameters.map(p => ({
        ...p,
        value: p.value !== undefined ? p.value : (p.type === 'select' ? '' : 0),
        unit: p.unit || '',
        referenceMin: p.referenceMin || 0,
        referenceMax: p.referenceMax || 0,
      })),
      notes: data.notes,
    }

    setExams(prev => prev.map(e => e.id === id ? updatedExam : e))
    setIsLoading(false)
    return updatedExam
  }

  const deleteExam = async (id: string) => {
    setIsLoading(true)
    await delay(500)
    setExams(prev => prev.filter(e => e.id !== id))
    setIsLoading(false)
  }

  return {
    exams,
    isLoading,
    createExam,
    updateExam,
    deleteExam,
  }
}