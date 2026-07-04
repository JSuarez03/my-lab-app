import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@renderer/components/ui/dialog'
import { Badge } from '@renderer/components/ui/badge'
import { CriticalExam } from './critical.types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@renderer/lib/utils'

interface CriticalExamDetailsProps {
  exam: CriticalExam | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CriticalExamDetails({ exam, open, onOpenChange }: CriticalExamDetailsProps) {
  if (!exam) return null

  // Calcular estadísticas
  const totalParams = exam.criticalParameters.length
  const alteredParams = exam.criticalParameters.filter(p => p.isCritical || p.statusText).length
  const criticalParams = exam.criticalParameters.filter(p => p.isCritical).length
  const normalParams = totalParams - alteredParams

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-[70vw] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalles del Examen</DialogTitle>
          <DialogDescription className="text-base">
            Examen de <strong>{exam.patientName}</strong> - {exam.type}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información general con resumen de parámetros */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Paciente</p>
              <p className="text-base font-semibold truncate">{exam.patientName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo</p>
              <Badge variant="outline" className="text-base px-3 py-1">{exam.type}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fecha</p>
              <p className="text-base font-semibold">
                {format(new Date(exam.date), 'dd/MM/yyyy', { locale: es })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Parámetros</p>
              <Badge variant="secondary" className="text-base px-3 py-1 font-semibold">
                {totalParams}
              </Badge>
            </div>
          </div>

          {/* Resumen de estados con badges */}
          <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Alterados:</span>
              <Badge className="bg-orange-500 text-white hover:bg-orange-600 font-semibold px-4 py-1.5 text-base rounded-full">
                {alteredParams}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Críticos:</span>
              <Badge className="bg-red-600 text-white hover:bg-red-700 font-semibold px-4 py-1.5 text-base rounded-full">
                {criticalParams}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Estables:</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 font-semibold px-4 py-1.5 text-base rounded-full">
                {normalParams}
              </Badge>
            </div>
          </div>

          {/* Tabla de parámetros en grid de 3 columnas */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-lg mb-4">Lista de Parámetros</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {exam.criticalParameters.map((param) => {
                const isCritical = param.isCritical
                const isAltered = param.isCritical || !!param.statusText
                
                // Obtener rango de referencia formateado
                const refRange = param.referenceMin !== undefined && param.referenceMax !== undefined
                  ? `${param.referenceMin} - ${param.referenceMax} ${param.unit || ''}`
                  : 'Sin rango'

                // Obtener el valor mostrado
                const displayValue = param.value !== undefined && param.value !== null
                  ? `${param.value} ${param.unit || ''}`
                  : 'N/A'

                return (
                  <div
                    key={param.id}
                    className={cn(
                      'flex flex-col border p-3 rounded-lg transition-all hover:shadow-md',
                      isCritical && 'bg-red-50 dark:bg-red-950 border-red-300',
                      !isCritical && isAltered && 'bg-orange-50 dark:bg-orange-950 border-orange-300',
                      !isAltered && 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                    )}
                  >
                    {/* Nombre del parámetro */}
                    <div className="flex justify-between items-start">
                      <span className={cn(
                        'text-sm font-medium',
                        (isCritical || isAltered) && 'font-semibold'
                      )}>
                        {param.name}
                      </span>
                      <span className="text-sm font-medium">
                        {displayValue}
                      </span>
                    </div>
                    
                    {/* Rango de referencia y estado */}
                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-gray-200/50">
                      <span className="text-xs text-muted-foreground">
                        Ref: {refRange}
                      </span>
                      {param.statusText ? (
                        <Badge className={cn(
                          'text-white border-none text-xs px-2 py-0.5',
                          isCritical ? 'bg-red-600' : 'bg-orange-500'
                        )}>
                          {param.statusText}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-600 border-green-300 text-xs px-2 py-0.5">
                          Estable
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {exam.notes && (
            <div className="border-t pt-4">
              <h4 className="font-medium text-lg mb-2">Notas</h4>
              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">{exam.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}