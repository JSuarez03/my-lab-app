import { ColumnDef } from '@tanstack/react-table'
import { Exam } from './exam.types'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { Badge } from '@renderer/components/ui/badge'
import { Button } from '@renderer/components/ui/button'
import { Eye, Pencil, Trash2 } from 'lucide-react'

export const columns = (
  onView: (exam: Exam) => void,
  onEdit: (exam: Exam) => void,
  onDelete: (exam: Exam) => void
): ColumnDef<Exam>[] => [
  {
    accessorKey: 'patientName',
    header: 'Paciente',
  },
  {
    accessorKey: 'type',
    header: 'Tipo de Examen',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return <Badge variant="outline">{type}</Badge>
    }
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      return format(parseISO(date), 'dd/MM/yyyy', { locale: es })
    },
  },
  {
    accessorKey: 'parameters',
    header: 'Parámetros',
    cell: ({ row }) => {
      const params = row.getValue('parameters') as any[]
      return params ? `${params.length} parámetros` : '-'
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const exam = row.original
      return (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(exam)}
            className="h-8 w-8"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(exam)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(exam)}
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]