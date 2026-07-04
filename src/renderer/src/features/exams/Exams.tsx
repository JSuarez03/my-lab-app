import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import { DataTable } from '@renderer/components/data-table'
import { useExams } from '@renderer/hooks/useExams'
import { ExamForm } from './ExamForm'
import { ExamFormData, Exam } from './exam.types'
import { columns } from './columns'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@renderer/components/ui/dialog'
import { Badge } from '@renderer/components/ui/badge'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export function Exams() {
  const { exams, createExam, updateExam, deleteExam } = useExams()
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)
  const [examToDelete, setExamToDelete] = useState<Exam | null>(null)
  const [examToView, setExamToView] = useState<Exam | null>(null)

  // Filtrar exámenes
  const filteredExams = exams.filter((exam) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      exam.patientName?.toLowerCase().includes(searchLower) ||
      exam.type.toLowerCase().includes(searchLower) ||
      exam.date.includes(searchTerm) ||
      exam.parameters.some((p) =>
        p.name.toLowerCase().includes(searchLower)
      )
    )
  })

  const handleCreate = async (data: ExamFormData) => {
    try {
      await createExam(data)
      toast.success('Examen registrado correctamente')
      setIsFormOpen(false)
    } catch (error) {
      toast.error('Error al registrar el examen')
    }
  }

  const handleEdit = async (data: ExamFormData) => {
    if (!editingExam) return
    try {
      await updateExam(editingExam.id!, data)
      toast.success('Examen actualizado correctamente')
      setIsFormOpen(false)
      setEditingExam(null)
    } catch (error) {
      toast.error('Error al actualizar el examen')
    }
  }

  const handleDelete = async () => {
    if (!examToDelete) return
    try {
      await deleteExam(examToDelete.id!)
      toast.success('Examen eliminado correctamente')
      setExamToDelete(null)
    } catch (error) {
      toast.error('Error al eliminar el examen')
    }
  }

  const handleEditClick = (exam: Exam) => {
    setEditingExam(exam)
    setIsFormOpen(true)
  }

  const examColumns = columns(
    (exam) => setExamToView(exam),
    handleEditClick,
    (exam) => setExamToDelete(exam)
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Exámenes</h1>
        <Button onClick={() => setIsFormOpen(true)} className="bg-blue-900 hover:bg-blue-800">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Examen
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente, tipo, fecha o parámetro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={examColumns} data={filteredExams} />
        </CardContent>
      </Card>

      {/* Formulario de creación/edición */}
      <ExamForm
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open)
          if (!open) setEditingExam(null)
        }}
        onSubmit={editingExam ? handleEdit : handleCreate}
        initialPatientId={editingExam?.patientId}
        initialData={editingExam || undefined}
      />

      {/* Diálogo para ver detalles del examen */}
      <Dialog open={!!examToView} onOpenChange={() => setExamToView(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Examen</DialogTitle>
            <DialogDescription>
              Información completa del examen de {examToView?.patientName}
            </DialogDescription>
          </DialogHeader>
          {examToView && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Paciente</p>
                  <p className="text-base">{examToView.patientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                  <Badge variant="outline">{examToView.type}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                  <p className="text-base">
                    {format(parseISO(examToView.date), 'dd/MM/yyyy', { locale: es })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Parámetros</p>
                  <p className="text-base">{examToView.parameters.length}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Valores</h4>
                <div className="grid grid-cols-2 gap-3">
                  {examToView.parameters.map((param) => (
                    <div key={param.id} className="flex justify-between items-center border-b pb-1">
                      <span className="text-sm">{param.name}</span>
                      <span className="text-sm font-medium">
                        {param.value !== undefined && param.value !== null
                          ? `${param.value} ${param.unit || ''}`
                          : 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {examToView.notes && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Notas</h4>
                  <p className="text-sm text-muted-foreground">{examToView.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={!!examToDelete} onOpenChange={() => setExamToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el examen de <strong>{examToDelete?.patientName}</strong> permanentemente.
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