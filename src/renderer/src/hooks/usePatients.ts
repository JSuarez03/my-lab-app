// src/renderer/src/hooks/usePatients.ts
import { useState, useEffect } from 'react'
import { Patient, PatientFormData } from '@renderer/features/patients/patient.types'
import { apiClient } from '@renderer/lib/api-client'

const mapApiPatientToPatient = (apiPatient: any): Patient => ({
  id: String(apiPatient.id),
  fullName: apiPatient.full_name,
  identification: apiPatient.identification,
  phone: apiPatient.phone,
  age: apiPatient.age,
  birthDate: apiPatient.birth_date,
  gender: apiPatient.gender,
  address: apiPatient.address ?? '',
})

const mapPatientFormDataToApi = (data: PatientFormData) => ({
  full_name: data.fullName,
  identification: data.identification,
  phone: data.phone,
  age: data.age,
  birth_date: data.birthDate,
  gender: data.gender,
  address: data.address || null,
})

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem('access_token') // o usar useAuth() para obtener el token

  const loadPatients = async () => {
    setIsLoading(true)
    try {
      const data = await apiClient.get('/patients', token || undefined)
      setPatients(data.map(mapApiPatientToPatient))
    } catch (error) {
      console.error('Error cargando pacientes:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createPatient = async (data: PatientFormData) => {
    setIsLoading(true)
    try {
      const newPatient = await apiClient.post('/patients', mapPatientFormDataToApi(data), token || undefined)
      const patient = mapApiPatientToPatient(newPatient)
      setPatients(prev => [...prev, patient])
      return patient
    } catch (error) {
      console.error('Error creando paciente:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updatePatient = async (id: string, data: PatientFormData) => {
    setIsLoading(true)
    try {
      const updatedPatient = await apiClient.put(`/patients/${id}`, mapPatientFormDataToApi(data), token || undefined)
      const patient = mapApiPatientToPatient(updatedPatient)
      setPatients(prev => prev.map(p => p.id === id ? patient : p))
      return patient
    } catch (error) {
      console.error('Error actualizando paciente:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deletePatient = async (id: string) => {
    setIsLoading(true)
    try {
      await apiClient.delete(`/patients/${id}`, token || undefined)
      setPatients(prev => prev.filter(p => p.id !== id))
      return true
    } catch (error) {
      console.error('Error eliminando paciente:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPatients()
  }, [])

  return {
    patients,
    isLoading,
    createPatient,
    updatePatient,
    deletePatient,
  }
}