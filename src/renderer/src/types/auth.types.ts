export interface User {
  id: string
  email: string
  name: string
  role: 'bioanalyst' | 'admin'
  profileImage?: string // Opcional, para la imagen de perfil
}

export interface LoginCredentials {
  email: string
  password: string
}