import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card'
import { usePatients } from '@renderer/hooks/usePatients'
import { PatientForm } from './PatientForm'
import { Patient, PatientFormData } from './patient.types'
import { columns } from './columns'
import { DataTable } from '@renderer/components/data-table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@renderer/components/ui/alert-dialog'

export function Patients() {
  const { patients, createPatient, updatePatient, deletePatient } = usePatients()
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null)

  const filteredPatients = patients.filter(p =>
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.identification.includes(searchTerm) ||
    p.phone.includes(searchTerm)
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleCreate = () => {
    setEditingPatient(null)
    setIsFormOpen(true)
  }

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient)
    setIsFormOpen(true)
  }

  const handleDelete = async () => {
    if (!patientToDelete) return
    try {
      await deletePatient(patientToDelete.id!)
      toast.success('Paciente eliminado correctamente')
      setPatientToDelete(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al eliminar el paciente')
    }
  }

  const handleSubmit = async (data: PatientFormData) => {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id!, data)  // <--- Usamos !
        toast.success('Paciente actualizado correctamente')
      } else {
        await createPatient(data)
        toast.success('Paciente creado correctamente')
      }
      setIsFormOpen(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al guardar')
    }
  }

  const patientColumns = columns(handleEdit, (patient) => setPatientToDelete(patient))

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pacientes</h1>
        <Button onClick={handleCreate} className="bg-blue-900 hover:bg-blue-800">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Paciente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, cédula o teléfono..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={patientColumns} data={filteredPatients} />
        </CardContent>
      </Card>

      <PatientForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        patient={editingPatient}
        onSubmit={handleSubmit}
      />

      <AlertDialog open={!!patientToDelete} onOpenChange={() => setPatientToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará al paciente <strong>{patientToDelete?.fullName}</strong> permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}