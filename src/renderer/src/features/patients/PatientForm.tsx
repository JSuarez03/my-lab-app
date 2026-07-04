import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@renderer/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@renderer/components/ui/select'
import { Calendar } from '@renderer/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { cn } from '@renderer/lib/utils'
import { patientSchema, PatientFormData, Patient } from './patient.types'

interface PatientFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patient?: Patient | null
  onSubmit: (data: PatientFormData) => Promise<void>
}

export function PatientForm({ open, onOpenChange, patient, onSubmit }: PatientFormProps) {
  const isEditing = !!patient
  const [date, setDate] = useState<Date | undefined>()

  // Parse an ISO date string (YYYY-MM-DD or YYYY-MM-DDTHH:mm:SS) to a local Date
  const parseISOToLocal = (iso?: string): Date | undefined => {
    if (!iso) return undefined
    const datePart = iso.split('T')[0]
    const parts = datePart.split('-').map((p) => parseInt(p, 10))
    if (parts.length !== 3 || parts.some(Number.isNaN)) return undefined
    const [y, m, d] = parts
    return new Date(y, m - 1, d)
  }

  const toISODate = (d: Date) => format(d, 'yyyy-MM-dd')

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: '',
      identification: '',
      phone: '',
      age: 0,
      birthDate: '',
      gender: 'M',
      address: '',
    }
  })

  useEffect(() => {
    if (patient) {
      const parsed = parseISOToLocal(patient.birthDate)
      form.reset({
        fullName: patient.fullName,
        identification: patient.identification,
        phone: patient.phone,
        age: patient.age,
        birthDate: parsed ? toISODate(parsed) : '',
        gender: patient.gender,
        address: patient.address || '',
      })
      if (parsed) {
        setDate(parsed)
        // Recompute age from parsed date to ensure consistency
        const today = new Date()
        let age = today.getFullYear() - parsed.getFullYear()
        const monthDiff = today.getMonth() - parsed.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < parsed.getDate())) {
          age--
        }
        form.setValue('age', age)
      }
    } else {
      form.reset({
        fullName: '',
        identification: '',
        phone: '',
        age: 0,
        birthDate: '',
        gender: 'M',
        address: '',
      })
      setDate(undefined)
    }
  }, [patient, form])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const formattedDate = toISODate(selectedDate)
      form.setValue('birthDate', formattedDate)
      // Calcular edad automáticamente
      const today = new Date()
      let age = today.getFullYear() - selectedDate.getFullYear()
      const monthDiff = today.getMonth() - selectedDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
        age--
      }
      form.setValue('age', age)
    } else {
      form.setValue('birthDate', '')
      form.setValue('age', 0)
    }
  }

  const handleSubmit = async (data: PatientFormData) => {
    await onSubmit(data)
    onOpenChange(false)
    form.reset()
    setDate(undefined)
  }

  // Año actual para el rango del calendario
  // const currentYear = new Date().getFullYear()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md transition-all duration-200">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Paciente' : 'Nuevo Paciente'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="identification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="04121234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edad</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="35"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Nacimiento</FormLabel>
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
                              format(parseISOToLocal(field.value) as Date, 'dd/MM/yyyy', { locale: es })
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
                          selected={date}
                          onSelect={handleDateSelect}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          locale={es}
                          captionLayout="dropdown"
                          startMonth={new Date(1900, 0, 1)}   // <--- Usa startMonth/endMonth en lugar de fromYear/toYear
                          endMonth={new Date()}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Género</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Femenino</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle, ciudad, estado" {...field} />
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
                {isEditing ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}