import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Save, Camera, X } from 'lucide-react'
import { useAuth } from '@renderer/hooks/useAuth'
import { useUpdateProfile } from '@renderer/hooks/useUpdateProfile'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'
import { profileSchema, ProfileFormData } from './profile.types'

export function Profile() {
  const { user, updateUser } = useAuth()
  const { updateProfile, isLoading } = useUpdateProfile()
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfileImage(base64String)
        // Actualizar usuario en contexto y localStorage
        if (user) {
          updateUser({ ...user, profileImage: base64String })
        }
        toast.success('Imagen de perfil actualizada')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    if (user) {
      const { profileImage, ...rest } = user
      updateUser({ ...rest, profileImage: undefined })
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast.info('Imagen de perfil eliminada')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data)
      toast.success('Perfil actualizado correctamente')
      form.setValue('currentPassword', '')
      form.setValue('newPassword', '')
      form.setValue('confirmPassword', '')
      setIsChangingPassword(false)
    } catch (error) {
      toast.error('Error al actualizar el perfil')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            {/* Avatar con carga de imagen */}
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-blue-100 dark:border-blue-800">
                <AvatarImage src={profileImage || ''} alt={user?.name || 'Usuario'} />
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-2xl font-bold">
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              {/* Overlay al hacer hover */}
              <div 
                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-8 w-8 text-white" />
              </div>
              {/* Botón para eliminar imagen (solo si hay imagen) */}
              {profileImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div>
              <CardTitle className="text-2xl">Mi Perfil</CardTitle>
              <CardDescription>
                Gestiona tu información personal
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-1">
                Haz clic en la imagen para cambiarla
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="correo@ejemplo.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    Rol: <span className="font-medium">
                      {user?.role === 'bioanalyst' ? 'Bioanalista' : 'Administrador'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cambiar contraseña */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                  >
                    {isChangingPassword ? 'Cancelar' : 'Cambiar contraseña'}
                  </Button>
                </div>

                {isChangingPassword && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña actual</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nueva contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar nueva contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="submit" disabled={isLoading} className="bg-blue-900 hover:bg-blue-800">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}