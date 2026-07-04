import { useState } from 'react'  // <--- Solo useState, sin useEffect
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@renderer/lib/utils'
import { Button } from '@renderer/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@renderer/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { usePatients } from '@renderer/hooks/usePatients'

interface PatientSelectProps {
  value: string
  onSelect: (patientId: string) => void
  disabled?: boolean
}

export function PatientSelect({ value, onSelect, disabled }: PatientSelectProps) {
  const [open, setOpen] = useState(false)
  const { patients } = usePatients()

  const selectedPatient = patients.find(p => p.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedPatient ? selectedPatient.fullName : 'Seleccionar paciente...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Buscar paciente..." />
          <CommandEmpty>No se encontraron pacientes.</CommandEmpty>
          <CommandGroup>
            {patients.map((patient) => (
              <CommandItem
                key={patient.id}
                value={patient.id || ''}  // <--- Aseguramos que sea string
                onSelect={() => {
                  if (patient.id) {       // <--- Validamos antes de llamar
                    onSelect(patient.id)
                    setOpen(false)
                  }
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === patient.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {patient.fullName} - {patient.identification}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}