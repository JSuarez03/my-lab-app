import { ColumnDef } from '@tanstack/react-table'
import { Patient } from './patient.types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from '@renderer/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

export const columns = (
  onEdit: (patient: Patient) => void,
  onDelete: (patient: Patient) => void
): ColumnDef<Patient>[] => [
  {
    accessorKey: 'fullName',
    header: 'Nombre',
  },
  {
    accessorKey: 'identification',
    header: 'Cédula',
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
  },
  {
    accessorKey: 'birthDate',
    header: 'Fecha Nac.',
    cell: ({ row }) => {
      const date = row.getValue('birthDate') as string
      if (!date) return '-'
      try {
        return format(new Date(date), 'dd/MM/yyyy', { locale: es })
      } catch {
        return 'Fecha inválida'
      }
    },
  },
  {
    accessorKey: 'age',
    header: 'Edad',
    cell: ({ row }) => {
      const age = row.getValue('age') as number
      return age ? `${age} años` : '-'
    }
  },
  {
    accessorKey: 'gender',
    header: 'Género',
    cell: ({ row }) => {
      const gender = row.getValue('gender') as string
      return gender === 'M' ? 'Masculino' : gender === 'F' ? 'Femenino' : 'Otro'
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const patient = row.original
      return (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(patient)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(patient)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      )
    },
  },
]