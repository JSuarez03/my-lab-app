import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@renderer/hooks/useAuth'

export function PrivateRoute() {
  const { user, isCheckingSession } = useAuth()

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando sesión...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}