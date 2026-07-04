import { useMemo } from 'react'
import { useExams } from './useExams'
import { CriticalExam, CriticalParameter } from '@renderer/features/critical-values/critical.types'

function getParameterStatus(param: any): {
  isAltered: boolean
  isCritical: boolean
  statusText: string
  statusClass: string
} {
  if (!param.value) {
    return { isAltered: false, isCritical: false, statusText: '', statusClass: '' }
  }

  if (param.type === 'select') {
    const irregularValues = ['Positivo', 'Reactivo', 'Trazas', 'Presente', 'Observado']
    if (irregularValues.includes(param.value)) {
      return {
        isAltered: true,
        isCritical: true,
        statusText: 'Irregular',
        statusClass: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-400'
      }
    }
    return { isAltered: false, isCritical: false, statusText: '', statusClass: '' }
  }

  if (param.type === 'number' && typeof param.value === 'number') {
    const val = param.value

    if (param.highCriticalThreshold !== undefined && val >= param.highCriticalThreshold) {
      return {
        isAltered: true,
        isCritical: true,
        statusText: 'Alto Crítico',
        statusClass: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-400'
      }
    }
    if (param.lowCriticalThreshold !== undefined && val <= param.lowCriticalThreshold) {
      return {
        isAltered: true,
        isCritical: true,
        statusText: 'Bajo Crítico',
        statusClass: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-400'
      }
    }

    if (param.highThreshold !== undefined && val > param.highThreshold) {
      return {
        isAltered: true,
        isCritical: false,
        statusText: 'Alto',
        statusClass: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-400'
      }
    }
    if (param.lowThreshold !== undefined && val < param.lowThreshold) {
      return {
        isAltered: true,
        isCritical: false,
        statusText: 'Bajo',
        statusClass: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-400'
      }
    }
  }

  return { isAltered: false, isCritical: false, statusText: '', statusClass: '' }
}

export function useCriticalExams() {
  const { exams } = useExams()

  const criticalExams = useMemo(() => {
    return exams
      .map((exam): CriticalExam | null => {
        const criticalParameters: CriticalParameter[] = []
        let alteredCount = 0
        let criticalCount = 0
        let stableCount = 0

        exam.parameters.forEach((param) => {
          const result = getParameterStatus(param)
          if (result.isAltered) {
            alteredCount++
            if (result.isCritical) criticalCount++
            criticalParameters.push({
              ...param,
              isCritical: result.isCritical,
              statusText: result.statusText,
              statusClass: result.statusClass
            })
          } else {
            stableCount++
            criticalParameters.push({
              ...param,
              isCritical: false
            })
          }
        })

        if (alteredCount > 0) {
          return {
            ...exam,
            criticalParameters,
            criticalCount,
            alteredCount,
            stableCount,
            totalParameters: exam.parameters.length
          }
        }
        return null
      })
      .filter((exam): exam is CriticalExam => exam !== null)
  }, [exams])

  return { criticalExams }
}