import { z } from 'zod'

export interface ExamParameter {
  id: string
  name: string
  type: 'number' | 'select' | 'text'
  value?: number | string
  options?: string[]
  unit?: string
  referenceMin?: number
  referenceMax?: number
  lowThreshold?: number
  lowCriticalThreshold?: number
  highThreshold?: number
  highCriticalThreshold?: number
  group?: string
}

export type ExamType = 'Coagulación' | 'Heces' | 'Hematología' | 'Orina' | 'Serología' | 'Química Sanguínea'

export interface ExamDefinition {
  type: ExamType
  label: string
  parameters: Omit<ExamParameter, 'value'>[]
}

export interface Exam {
  id: string
  patientId: string
  patientName?: string
  type: ExamType
  date: string
  parameters: ExamParameter[]
  notes?: string
}

export const examSchema = z.object({
  patientId: z.string().min(1, 'Selecciona un paciente'),
  type: z.enum(['Coagulación', 'Heces', 'Hematología', 'Orina', 'Serología', 'Química Sanguínea']),
  date: z.string().min(1, 'Fecha requerida'),
  parameters: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['number', 'select', 'text']), // <--- También actualizar aquí
    value: z.union([z.number(), z.string()]).optional(),
    options: z.array(z.string()).optional(),
    unit: z.string().optional(),
    referenceMin: z.number().optional(),
    referenceMax: z.number().optional(),
    lowThreshold: z.number().optional(),
    lowCriticalThreshold: z.number().optional(),
    highThreshold: z.number().optional(),
    highCriticalThreshold: z.number().optional(),
    group: z.string().optional(),
  })),
  notes: z.string().optional(),
})

export type ExamFormData = z.infer<typeof examSchema>