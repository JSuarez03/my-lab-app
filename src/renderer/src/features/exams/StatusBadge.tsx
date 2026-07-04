import { ExamParameter } from './exam.types'
import { cn } from '@renderer/lib/utils'

interface StatusBadgeProps {
  value?: number | string
  param: ExamParameter
}

export function StatusBadge({ value, param }: StatusBadgeProps) {
  if (param.type !== 'number' || value === undefined || value === null || isNaN(Number(value))) {
    return null
  }

  const numValue = Number(value)
  let statusText = ''
  let statusClass = ''

  // Determinar estado
  if (param.lowCriticalThreshold !== undefined && numValue < param.lowCriticalThreshold) {
    statusText = 'Bajo Crítico'
    statusClass = 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-400'
  } else if (param.lowThreshold !== undefined && numValue < param.lowThreshold) {
    statusText = 'Bajo'
    statusClass = 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-400'
  } else if (param.highCriticalThreshold !== undefined && numValue > param.highCriticalThreshold) {
    statusText = 'Alto Crítico'
    statusClass = 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-400'
  } else if (param.highThreshold !== undefined && numValue > param.highThreshold) {
    statusText = 'Alto'
    statusClass = 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-400'
  } else {
    // Normal: mostrar solo si queremos, pero podemos omitir para no saturar
    return null
  }

  return (
    <span className={cn(
      'text-xs font-medium px-2 py-0.5 rounded-full border',
      statusClass
    )}>
      {statusText}
    </span>
  )
}