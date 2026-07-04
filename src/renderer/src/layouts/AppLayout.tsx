import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom' // 👈 Importar useLocation
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@renderer/components/ui/sidebar'
import { Button } from '@renderer/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'
import { useAuth } from '@renderer/hooks/useAuth'
import { useTheme } from '@renderer/providers/ThemeProvider'
import {
  LayoutDashboard,
  Users,
  Microscope,
  FileText,
  AlertTriangle,
  BarChart3,
  UserCircle,
  LogOut,
  Menu,
  Moon,
  Sun,
} from 'lucide-react'

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { title: 'Pacientes', icon: Users, path: '/patients' },
  { title: 'Exámenes', icon: Microscope, path: '/exams' },
  { title: 'Resultados', icon: FileText, path: '/results' },
  { title: 'Valores Críticos', icon: AlertTriangle, path: '/critical-values' },
  { title: 'Reportes', icon: BarChart3, path: '/reports' },
  { title: 'Perfil', icon: UserCircle, path: '/profile' },
]

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() // 👈 Obtener la ubicación actual
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Función para verificar si un ítem está activo
  const isActive = (path: string) => {
    // Si es la ruta raíz, comparar exactamente
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard'
    }
    return location.pathname === path
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <img
                src={theme === 'dark' ? '/src/assets/ivss-dark.png' : '/src/assets/ivss.png'}
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="font-semibold text-lg text-foreground">IVSS</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.path)} // 👈 Resaltar si está activo
                      >
                        <Link to={item.path} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-blue-100">
                <AvatarImage src={user?.profileImage || ''} alt={user?.name} />
                <AvatarFallback className="bg-blue-600 text-white font-medium">
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.role === 'bioanalyst' ? 'Bioanalista' : 'Administrador'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleTheme}
                  title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger className="lg:hidden">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <h1 className="ml-4 text-lg font-semibold">Sistema de Laboratorio Clínico</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}