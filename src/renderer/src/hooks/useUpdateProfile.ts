import { useState } from 'react'
import { useAuth } from './useAuth'
import { ProfileFormData } from '@renderer/features/profile/profile.types'

export function useUpdateProfile() {
  const { user, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const updateProfile = async (data: ProfileFormData) => {
    setIsLoading(true)
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800))

    // Actualizar el usuario en el contexto (mock)
    if (user) {
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
        // Nota: La contraseña se manejaría en el backend, no la guardamos en el frontend
      }
      updateUser(updatedUser)
    }

    setIsLoading(false)
    return { success: true }
  }

  return { updateProfile, isLoading }
}