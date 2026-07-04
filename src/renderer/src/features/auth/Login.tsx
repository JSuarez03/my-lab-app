// src/renderer/src/features/auth/Login.tsx
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Mail, Lock } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import { useAuth } from '@renderer/hooks/useAuth'
import { useTheme } from '@renderer/providers/ThemeProvider'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
})

type LoginFormValues = z.infer<typeof loginSchema>

export function Login() {
  const navigate = useNavigate()
  const { user, login, isLoading } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
      toast.success('¡Bienvenido!')
    }
  }, [user, navigate])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setErrorMessage(null)
      await login(values)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error al iniciar sesión')
      toast.error('Credenciales incorrectas')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gray-100 dark:bg-gray-900">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/src/assets/hospital.png")' }}
      />
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

      <Card className="w-full max-w-md shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={theme === 'dark' ? '/src/assets/ivss-dark.png' : '/src/assets/ivss.png'}
              alt="Logo del Hospital" 
              className="h-20 w-auto object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-black">Sistema de Laboratorio</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="bioanalista@lab.com" 
                          type="email" 
                          className="pl-9" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          className="pl-9" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMessage && (
                <p className="text-sm text-red-500 text-center">{errorMessage}</p>
              )}
              <Button 
                type="submit" 
                className="w-full bg-blue-900 hover:bg-blue-800" 
                disabled={isLoading}
              >
                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="text-blue-900 hover:underline">
                  Regístrate
                </Link>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Demo: <span className="font-mono">bioanalista@lab.com / 123456</span>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}