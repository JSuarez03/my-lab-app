import { useState, useMemo } from 'react'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { usePatients } from '@renderer/hooks/usePatients'
import { useExams } from '@renderer/hooks/useExams'
import { generatePatientHistoryReport,
  generateCoagulationReport,
  previewCoagulationReport,
  generateChemistryReport,
  previewChemistryReport,
  generateExamReport,      // 👈 Agregar
  previewExamReport,
  generateHematologyReport,   // 👈 Importar
  previewHematologyReport,
  generateSerologyReport,
  previewSerologyReport,
  generateOrinaReport,
  previewOrinaReport,
 } from '@renderer/hooks/useReport'
 import {
  // ... otros
  generateHecesReport,
  previewHecesReport,
} from '@renderer/hooks/useReport'
import { toast } from 'sonner'
import { Eye, Printer, ChevronsUpDown, CalendarIcon, FileText } from 'lucide-react'
import { useAuth } from '@renderer/hooks/useAuth'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@renderer/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Calendar } from '@renderer/components/ui/calendar'
import { format, parseISO, isWithinInterval } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@renderer/components/ui/table'
import { Badge } from '@renderer/components/ui/badge'
import { Exam } from '@renderer/features/exams/exam.types'

export function Reports() {
  const { user } = useAuth()
  const { patients } = usePatients()
  const { exams } = useExams()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)

  // Filtros de fecha
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  // Filtrar pacientes
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients
    const term = searchTerm.trim().toLowerCase()
    return patients.filter((patient) => {
      const name = (patient.fullName || '').toLowerCase()
      const id = String(patient.identification || '')
      return name.includes(term) || id.includes(term)
    })
  }, [patients, searchTerm])

  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  // Obtener exámenes del paciente seleccionado, ordenados por fecha (más reciente primero)
  const patientExams = useMemo(() => {
    if (!selectedPatientId) return []
    const examsForPatient = exams.filter((e) => e.patientId === selectedPatientId)
    return examsForPatient.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [exams, selectedPatientId])

  // Filtrar exámenes por rango de fechas
  const filteredExams = useMemo(() => {
    if (!startDate || !endDate) return patientExams
    return patientExams.filter((exam) => {
      const examDate = parseISO(exam.date)
      return isWithinInterval(examDate, { start: startDate, end: endDate })
    })
  }, [patientExams, startDate, endDate])

  // ===== Funciones de generación de reportes =====

  const handleGenerateReport = async () => {
    if (!selectedPatientId) {
      toast.warning('Selecciona un paciente para generar el reporte')
      return
    }

    const patient = patients.find((p) => p.id === selectedPatientId)
    if (!patient) {
      toast.error('Paciente no encontrado')
      return
    }

    const examsToExport = filteredExams.length > 0 ? filteredExams : patientExams

    if (examsToExport.length === 0) {
      toast.warning('El paciente no tiene exámenes en el período seleccionado')
      return
    }

    try {
      await generatePatientHistoryReport(patient, examsToExport)
      toast.success('Reporte generado correctamente')
    } catch (error) {
      toast.error('Error al generar el reporte')
    }
  }

  // ===== Funciones para acciones por examen =====

  const handlePreviewExam = async (exam: Exam) => {
    if (!selectedPatient) {
      toast.warning('Paciente no encontrado')
      return
    }
    try {
      if (exam.type === 'Coagulación') {
        await previewCoagulationReport(exam, selectedPatient, user?.name || '')
      } else if (exam.type === 'Química Sanguínea') {
        await previewChemistryReport(exam, selectedPatient)
      } else if (exam.type === 'Hematología') {
        await previewHematologyReport(exam, selectedPatient, user?.name || '')
      } else if (exam.type === 'Serología') {
        await previewSerologyReport(exam, selectedPatient, user?.name || '')
      } else if (exam.type === 'Heces') {           // 👈 Agregar
        await previewHecesReport(exam, selectedPatient, user?.name || '')
      } else if (exam.type === 'Orina') {
        await previewOrinaReport(exam, selectedPatient, user?.name || '')
      } else {
        await previewExamReport(exam, selectedPatient, user?.name || '')
      }
    } catch (error) {
      toast.error('Error al generar la vista previa')
    }
  }

  const handlePrintExam = async (exam: Exam) => {
    if (!selectedPatient) {
      toast.warning('Paciente no encontrado')
      return
    }
    try {
      if (exam.type === 'Coagulación') {
        await generateCoagulationReport(exam, selectedPatient, user?.name || '')
        toast.success('Reporte de Coagulación generado correctamente')
      } else if (exam.type === 'Química Sanguínea') {
        await generateChemistryReport(exam, selectedPatient)
        toast.success('Reporte de Química Sanguínea generado correctamente')
      } else if (exam.type === 'Hematología') {
        await generateHematologyReport(exam, selectedPatient, user?.name || '')
        toast.success('Reporte de Hematología generado correctamente')
      } else if (exam.type === 'Serología') {
        await generateSerologyReport(exam, selectedPatient, user?.name || '')
        toast.success('Reporte de Serología generado correctamente')
      } else if (exam.type === 'Heces') {           // 👈 Agregar
        await generateHecesReport(exam, selectedPatient, user?.name || '')
        toast.success('Reporte de Heces generado correctamente')
        } else if (exam.type === 'Orina') {
        await generateOrinaReport(exam, selectedPatient, user?.name || '')
        toast.success('Reporte de Orina generado correctamente')
      } else {
        await generateExamReport(exam, selectedPatient, user?.name || '')
        toast.success(`Reporte de ${exam.type} generado correctamente`)
      }

    } catch (error) {
      toast.error('Error al generar el reporte')
    }
  }

  const resetFilters = () => {
    setStartDate(undefined)
    setEndDate(undefined)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Reportes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Generar Reporte de Paciente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selección de paciente */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium">Seleccionar Paciente</label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {selectedPatient ? (
                        `${selectedPatient.fullName} - ${selectedPatient.identification}`
                      ) : (
                        'Buscar paciente...'
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command shouldFilter={false}>
                      <CommandInput
                        placeholder="Buscar por nombre o cédula..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                      />
                      <CommandList>
                        {filteredPatients.length === 0 ? (
                          <CommandEmpty>No se encontraron pacientes.</CommandEmpty>
                        ) : (
                          <CommandGroup>
                            {filteredPatients.map((patient) => (
                              <CommandItem
                                key={patient.id}
                                onSelect={() => {
                                  setSelectedPatientId(patient.id!)
                                  setSearchTerm('')
                                  setOpen(false)
                                  resetFilters()
                                }}
                              >
                                {patient.fullName} - {patient.identification}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleGenerateReport}
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generar PDF
                </Button>
              </div>
            </div>

            {/* Filtros de fecha */}
            {selectedPatient && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-sm font-medium">Filtrar por fecha:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <CalendarIcon className="mr-2 h-3 w-3" />
                      {startDate ? format(startDate, 'dd/MM/yyyy') : 'Desde'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      autoFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <CalendarIcon className="mr-2 h-3 w-3" />
                      {endDate ? format(endDate, 'dd/MM/yyyy') : 'Hasta'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      autoFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                {(startDate || endDate) && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Limpiar filtros
                  </Button>
                )}
                <span className="text-xs text-muted-foreground">
                  {filteredExams.length} exámenes en este período
                </span>
              </div>
            )}
          </div>

          {/* Vista previa de exámenes con acciones por fila */}
          {selectedPatient && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Historial de Exámenes</h3>
                <span className="text-sm text-muted-foreground">
                  Mostrando {filteredExams.length} de {patientExams.length} exámenes
                </span>
              </div>
              {filteredExams.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border rounded-lg">
                  No hay exámenes en el período seleccionado
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Parámetros</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>{format(new Date(exam.date), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{exam.type}</Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {exam.parameters
                              .map((p) => {
                                const value = p.value !== undefined && p.value !== null ? p.value : 'N/A'
                                return `${p.name}: ${value} ${p.unit || ''}`
                              })
                              .join(' | ')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handlePreviewExam(exam)}
                                title="Vista previa"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handlePrintExam(exam)}
                                title="Imprimir"
                              >
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}