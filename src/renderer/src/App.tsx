import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Login } from '@renderer/features/auth/Login'
import { Register } from '@renderer/features/auth/Register'
import { Dashboard } from '@renderer/features/dashboard/Dashboard'
import { Patients } from '@renderer/features/patients/Patients'
import { Exams } from '@renderer/features/exams/Exams'
import { CriticalValues } from '@renderer/features/critical-values/CriticalValues'
import { Profile } from '@renderer/features/profile/Profile'
import { Reports } from '@renderer/features/reports/Reports'
import { Error404 } from '@renderer/features/error/Error404'
import { AppLayout } from '@renderer/layouts/AppLayout'
import { PrivateRoute } from '@renderer/components/PrivateRoute'
import { AuthProvider } from '@renderer/hooks/useAuth'
import { ThemeProvider } from '@renderer/providers/ThemeProvider'

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        {/* Rutas con layout (sidebar) */}
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="exams" element={<Exams />} />
          <Route path="critical-values" element={<CriticalValues />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* Ruta 404 sin layout */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App