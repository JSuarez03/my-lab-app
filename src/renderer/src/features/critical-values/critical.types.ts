import { Exam, ExamParameter } from '@renderer/features/exams/exam.types'

export interface CriticalParameter extends ExamParameter {
  isCritical: boolean
  statusText?: string
  statusClass?: string
}

export interface CriticalExam extends Exam {
  criticalParameters: CriticalParameter[]
  criticalCount: number // Críticos
  alteredCount: number // Todos los alterados (críticos + no críticos)
  stableCount: number // Parámetros normales
  totalParameters: number // 👈 Agregar si lo necesitas
}