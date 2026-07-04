import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { User, LoginCredentials } from '@renderer/types/auth.types'

const SESSION_KEY = 'user_session'
const TOKEN_KEY = 'access_token'
const SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 horas (coincide con backend)

type AuthContextType = {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<User>
  logout: () => void
  updateUser: (user: User) => void
  isLoading: boolean
  isCheckingSession: boolean
  error: string | null
  restoreSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ===== LOGIN REAL CON BACKEND =====
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Credenciales inválidas')
      }

      const data = await response.json()
      const token = data.access_token

      // Decodificar el token JWT para obtener la información del usuario
      const payload = JSON.parse(atob(token.split('.')[1]))
      
      // Construir el objeto User (ajusta según lo que devuelva tu JWT)
      const userData: User = {
        id: payload.sub || payload.id || '1',
        email: payload.sub || credentials.email,
        name: payload.full_name || payload.name || credentials.email,
        role: payload.role || 'bioanalyst',
        // profileImage: payload.profile_image || undefined, // si lo incluyes en JWT
      }

      // Guardar token y sesión
      localStorage.setItem(TOKEN_KEY, token)
      const session = { user: userData, timestamp: Date.now() }
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))

      setUser(userData)
      return userData
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // ===== LOGOUT =====
  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }

  // ===== ACTUALIZAR USUARIO EN SESIÓN =====
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    const session = localStorage.getItem(SESSION_KEY)
    if (session) {
      try {
        const parsed = JSON.parse(session)
        parsed.user = updatedUser
        localStorage.setItem(SESSION_KEY, JSON.stringify(parsed))
      } catch {
        // Si falla, no hacer nada
      }
    }
  }

  // ===== RESTAURAR SESIÓN =====
  const restoreSession = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const stored = localStorage.getItem(SESSION_KEY)

    if (token && stored) {
      try {
        const session = JSON.parse(stored)
        const elapsed = Date.now() - session.timestamp

        // Verificar si la sesión sigue vigente (por tiempo local)
        if (elapsed < SESSION_DURATION) {
          // También podrías verificar si el token sigue siendo válido llamando a /auth/me
          // pero por ahora confiamos en el timestamp local
          setUser(session.user)
        } else {
          // Sesión expirada
          localStorage.removeItem(SESSION_KEY)
          localStorage.removeItem(TOKEN_KEY)
        }
      } catch {
        localStorage.removeItem(SESSION_KEY)
        localStorage.removeItem(TOKEN_KEY)
      }
    }

    setIsCheckingSession(false)
  }

  // ===== RESTAURAR AL MONTAR =====
  useEffect(() => {
    restoreSession()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isLoading,
        isCheckingSession,
        error,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}