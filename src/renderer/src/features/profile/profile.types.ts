import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  // Si se está cambiando la contraseña, verificar que coincidan
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false
  }
  return true
}, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})

export type ProfileFormData = z.infer<typeof profileSchema>