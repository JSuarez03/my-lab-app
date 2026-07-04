import { useState } from 'react'
import { Eye, AlertCircle } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { DataTable } from '@renderer/components/data-table'
import { useCriticalExams } from '@renderer/hooks/useCriticalExams'
import { CriticalExamDetails } from './CriticalExamDetails'
import { CriticalExam } from './critical.types'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@renderer/components/ui/badge'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@renderer/lib/utils'

const columns = (
  onView: (exam: CriticalExam) => void
): ColumnDef<CriticalExam>[] => [
  {
    accessorKey: 'patientName',
    header: 'Paciente',
  },
  {
    accessorKey: 'type',
    header: 'Tipo de Examen',
    cell: ({ row }) => <Badge variant="outline">{row.getValue('type')}</Badge>
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      return format(new Date(date), 'dd/MM/yyyy', { locale: es })
    },
  },
  {
    accessorKey: 'alteredCount',
    header: 'Parámetros Alterados',
    cell: ({ row }) => {
      const altered = row.getValue('alteredCount') as number
      return (
        <Badge 
          className="bg-orange-100 text-orange-600 border border-orange-400 font-semibold px-3 py-1 rounded-full"
        >
          {altered} alterados
        </Badge>
      )
    }
  },
  {
    accessorKey: 'criticalCount',
    header: 'Parámetros Críticos',
    cell: ({ row }) => {
      const critical = row.getValue('criticalCount') as number
      return (
        <Badge 
          className={cn(
            "font-semibold px-3 py-1 rounded-full",
            critical > 0 
              ? "bg-red-100 text-red-600 border border-red-400" 
              : "bg-green-100 text-green-600 border border-green-400"
          )}
        >
          {critical > 0 ? `${critical} críticos` : 'Sin críticos'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'stableCount',
    header: 'Valores Estables',
    cell: ({ row }) => {
      const stable = row.getValue('stableCount') as number
      const total = (row.original as CriticalExam).totalParameters as number
      const percentage = total > 0 ? Math.round((stable / total) * 100) : 0
      
      return (
        <Badge 
          className="bg-green-100 text-green-600 border border-green-400 font-semibold px-3 py-1 rounded-full"
        >
          {stable} estables ({percentage}%)
        </Badge>
      )
    }
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const exam = row.original
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(exam)}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          Ver detalles
        </Button>
      )
    },
  }
]

export function CriticalValues() {
  const { criticalExams } = useCriticalExams()
  const [selectedExam, setSelectedExam] = useState<CriticalExam | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleView = (exam: CriticalExam) => {
    setSelectedExam(exam)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Valores Críticos</h1>
        <Badge variant="outline" className="gap-2 bg-red-50 text-red-600 border-red-300">
          <AlertCircle className="h-4 w-4" />
          {criticalExams.length} exámenes críticos
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exámenes con Valores Críticos</CardTitle>
        </CardHeader>
        <CardContent>
          {criticalExams.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay exámenes con valores críticos en este momento.
            </div>
          ) : (
            <DataTable columns={columns(handleView)} data={criticalExams} />
          )}
        </CardContent>
      </Card>

      <CriticalExamDetails
        exam={selectedExam}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}


