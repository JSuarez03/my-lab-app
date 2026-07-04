// src/renderer/src/features/patients/patient.types.tsx
import { z } from 'zod'

export const patientSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  identification: z
    .string()
    .regex(/^[0-9]{6,8}$/, 'La cédula debe tener entre 6 y 8 dígitos numéricos'), // ✅ Cambiado
  phone: z
    .string()
    .min(7, 'El teléfono debe tener al menos 7 caracteres')
    .max(15, 'El teléfono debe tener como máximo 15 caracteres')
    .regex(/^[0-9+\-() ]+$/, 'El teléfono solo puede contener números, espacios y + - ( )'),
  age: z.number().int('La edad debe ser un número entero').min(0, 'La edad no puede ser negativa').max(120, 'Edad máxima 120 años'),
  birthDate: z
    .string()
    .min(1, 'La fecha de nacimiento es requerida')
    .refine((value) => !Number.isNaN(Date.parse(value)), 'Fecha de nacimiento inválida'),
  gender: z.enum(['M', 'F', 'Otro']),
  address: z.string().optional(),
})

export type Patient = z.infer<typeof patientSchema>
export type PatientFormData = z.infer<typeof patientSchema>