import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon, Save } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@renderer/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@renderer/components/ui/select'
import { Calendar } from '@renderer/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { cn } from '@renderer/lib/utils'
import { PatientSelect } from '@renderer/components/PatientSelect'
import { examSchema, ExamFormData, ExamType, Exam } from './exam.types'
import { EXAM_DEFINITIONS, getExamDefinition } from './exam-definitions'
import { StatusBadge } from './StatusBadge'

interface ExamFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ExamFormData) => Promise<void>
  initialPatientId?: string
  initialData?: Exam
}

export function ExamForm({ open, onOpenChange, onSubmit, initialPatientId, initialData }: ExamFormProps) {
  const form = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      patientId: initialPatientId || '',
      type: 'Hematología',
      date: format(new Date(), 'yyyy-MM-dd'),
      parameters: [],  // ✅ Inicialmente vacío, luego se llena en useEffect
      notes: '',
    }
  })

  const selectedType = form.watch('type') as ExamType
  const definition = getExamDefinition(selectedType)

  // Cargar datos iniciales si estamos editando
  useEffect(() => {
    if (initialData) {
      const exam = initialData
      // Obtener la definición actual del tipo de examen
      const currentDefinition = getExamDefinition(exam.type as ExamType)
      
      // Si hay definición, fusionamos los parámetros guardados con los de la definición
      let mergedParams = exam.parameters.map(p => ({
        ...p,
        value: p.value !== undefined ? p.value : (p.type === 'select' || p.type === 'text' ? '' : undefined)
      }))

      if (currentDefinition) {
        // Crear un mapa de los parámetros guardados por ID
        const savedParamsMap = new Map(mergedParams.map(p => [p.id, p]))
        
        // Recorrer la definición y agregar los parámetros faltantes
        mergedParams = currentDefinition.parameters.map(defParam => {
          const savedParam = savedParamsMap.get(defParam.id)
          if (savedParam) {
            return {
              ...defParam,
              value: savedParam.value !== undefined ? savedParam.value : (defParam.type === 'select' || defParam.type === 'text' ? '' : undefined)
            }
          }
          // Si el parámetro no existe en el examen guardado, lo agregamos vacío
          return {
            ...defParam,
            value: defParam.type === 'select' || defParam.type === 'text' ? '' : undefined
          }
        })
      }

      form.reset({
        patientId: exam.patientId,
        type: exam.type,
        date: exam.date,
        parameters: mergedParams,
        notes: exam.notes || '',
      })
    }
  }, [initialData, form])

  // Actualizar parámetros cuando cambia el tipo de examen
  useEffect(() => {
    if (definition) {
      const currentParams = form.getValues('parameters') || []
      const newParams = definition.parameters.map((defParam) => {
        // Buscar si ya existe un parámetro con el mismo id en currentParams
        const existing = currentParams.find(p => p.id === defParam.id)
        if (existing) {
          const defaultValue = defParam.type === 'select' || defParam.type === 'text' ? '' : undefined
          return {
            ...defParam,
            value: existing.value !== undefined && existing.value !== null ? existing.value : defaultValue,
          }
        } else {
          return {
            ...defParam,
            value: defParam.type === 'select' || defParam.type === 'text' ? '' : undefined,
          }
        }
      })
      form.setValue('parameters', newParams)
    }
  }, [selectedType, definition, form])

  const { fields } = useFieldArray({
    control: form.control,
    name: 'parameters',
  })

  const handleSubmit = async (data: ExamFormData) => {
    await onSubmit(data)
    onOpenChange(false)
    form.reset({
      patientId: '',
      type: 'Hematología',
      date: format(new Date(), 'yyyy-MM-dd'),
      parameters: [],
      notes: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[65vw] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Examen' : 'Registrar Nuevo Examen'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Paciente y Tipo en dos columnas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paciente</FormLabel>
                    <FormControl>
                      <PatientSelect
                        value={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Examen</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona tipo de examen" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EXAM_DEFINITIONS.map((def) => (
                          <SelectItem key={def.type} value={def.type}>
                            {def.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fecha */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(parseISO(field.value), 'dd/MM/yyyy', { locale: es })
                            ) : (
                              <span>Seleccionar fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? parseISO(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(format(date, 'yyyy-MM-dd'))
                            }
                          }}
                          locale={es}
                          captionLayout="dropdown"
                          disabled={(date) => date < new Date(2000, 0, 1) || date > new Date()}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Parámetros dinámicos agrupados por categoría */}
            {definition && fields.length > 0 && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium text-sm">Parámetros</h3>
                {(() => {
                  // Agrupar parámetros por group
                  const groups: Record<string, typeof fields> = {}
                  fields.forEach((field, index) => {
                    const param = definition.parameters[index]
                    if (!param) return
                    const groupKey = param.group || 'General'
                    if (!groups[groupKey]) groups[groupKey] = []
                    groups[groupKey].push(field)
                  })

                  return Object.entries(groups).map(([groupName, groupFields]) => (
                    <div key={groupName} className="space-y-2">
                      {groupName !== 'General' && (
                        <h4 className="text-sm font-semibold text-muted-foreground border-b pb-1">
                          {groupName}
                        </h4>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupFields.map((field) => {
                          const index = fields.findIndex(f => f.id === field.id)
                          const param = definition.parameters[index]
                          if (!param) return null

                          // Detectar irregularidad para selects (incluye Heces)
                          const currentValue = form.watch(`parameters.${index}.value`)
                          const isIrregular = param.type === 'select' &&
                            (currentValue === 'Reactivo' ||
                             currentValue === 'Positivo' ||
                             currentValue === 'Presente' ||
                             currentValue === 'Observado'||
                             currentValue === 'Trazas')

                          return (
                            <div key={field.id} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none">
                                  {param.name}
                                  {param.unit && <span className="text-xs text-muted-foreground ml-1">({param.unit})</span>}
                                  {param.referenceMin !== undefined && param.referenceMax !== undefined && (
                                    <span className="text-xs text-muted-foreground ml-2">
                                      Ref: {param.referenceMin} - {param.referenceMax}
                                    </span>
                                  )}
                                </label>
                                {param.type === 'number' && (
                                  <StatusBadge value={form.watch(`parameters.${index}.value`)} param={param} />
                                )}
                              </div>
                              <FormField
                                control={form.control}
                                name={`parameters.${index}.value`}
                                render={({ field: formField }) => (
                                  <FormItem className="space-y-0">
                                    <FormControl>
                                      {param.type === 'text' ? (
                                        <Input
                                          placeholder="Escribir..."
                                          {...formField}
                                          onChange={(e) => formField.onChange(e.target.value)}
                                        />
                                      ) : param.type === 'select' ? (
                                        <Select
                                          value={currentValue as string}
                                          onValueChange={formField.onChange}
                                        >
                                          <SelectTrigger className={cn(
                                            "w-full",
                                            isIrregular && "border-red-500 bg-red-50 dark:bg-red-950"
                                          )}>
                                            <SelectValue placeholder="Seleccionar..." />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {param.options?.map(opt => (
                                              <SelectItem key={opt} value={opt}>
                                                {opt}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      ) : (
                                        <Input
                                          type="number"
                                          step="0.01"
                                          placeholder="Valor"
                                          {...formField}
                                          onChange={(e) => {
                                            const val = parseFloat(e.target.value)
                                            formField.onChange(isNaN(val) ? undefined : val)
                                          }}
                                        />
                                      )}
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))
                })()}
              </div>
            )}

            {/* Notas */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Observaciones adicionales..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
                <Save className="h-4 w-4 mr-2" />
                {initialData ? 'Actualizar Examen' : 'Guardar Examen'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}