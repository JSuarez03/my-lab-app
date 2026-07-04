// src/renderer/src/lib/api-client.ts
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

class ApiError extends Error {
  status: number
  data: any

  constructor(status: number, data: any) {
    // Extraer mensaje de error de diferentes formatos de respuesta del backend
    const message = extractErrorMessage(data)
    super(message)
    this.status = status
    this.data = data
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

function normalizeErrorMessage(message: string, field?: string): string {
  const cleaned = message
    .replace(/^\s*\d+\s*:\s*/u, '')
    .replace(/^\s*Value error\s*,?\s*-?\s*/i, '')
    .replace(/^\s*[-–—]\s*/u, '')
    .trim()

  const match = cleaned.match(/^String should have at least (\d+) characters\.?$/i)
  if (match) {
    const count = match[1]
    const fieldLabel = field ? getFieldLabel(field) : 'El campo'
    return `${fieldLabel} debe tener al menos ${count} caracteres`
  }

  return cleaned
}

function getFieldLabel(field: string): string {
  const map: Record<string, string> = {
    full_name: 'El nombre',
    fullName: 'El nombre',
    email: 'El correo',
    password: 'La contraseña',
    confirmPassword: 'La confirmación',
    confirm_password: 'La confirmación',
    role: 'El rol',
  }
  return map[field] ?? field.replace(/[_-]/g, ' ')
}

/**
 * Extrae un mensaje de error legible desde la respuesta del backend
 * Soporta:
 * - { detail: "mensaje" } (string)
 * - { detail: [{ loc: [...], msg: "mensaje", type: "..." }] } (validación Pydantic)
 * - { detail: { ... } } (objeto anidado)
 * - string directo
 */
async function parseResponseBody(res: Response) {
  const text = await res.text()

  if (!text) return null

  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  }

  return text
}

function extractErrorMessage(data: any): string {
  if (!data) return 'Error en la petición'

  // Si es un string, devolverlo directamente
  if (typeof data === 'string') return data

  // Si tiene detail
  if (data.detail) {
    // Si detail es un string
    if (typeof data.detail === 'string') return normalizeErrorMessage(data.detail)

    // Si detail es un array (errores de validación de Pydantic)
    if (Array.isArray(data.detail) && data.detail.length > 0) {
      // Extraer todos los mensajes de validación
      const messages = data.detail
        .map((err: any) => {
          if (typeof err.msg === 'string') {
            const field = err.loc && err.loc.length > 0 ? err.loc[err.loc.length - 1] : undefined
            return normalizeErrorMessage(err.msg, field)
          }
          return null
        })
        .filter(Boolean)

      if (messages.length > 0) {
        return messages.join('; ')
      }
      // Si no se pudo extraer mensajes, devolver el primer elemento
      if (typeof data.detail[0] === 'string') return data.detail[0]
      return JSON.stringify(data.detail)
    }

    // Si detail es un objeto, intentar extraer mensajes de sus propiedades
    if (typeof data.detail === 'object') {
      // Si tiene un campo message
      if (data.detail.message) return data.detail.message
      // Si tiene un campo msg
      if (data.detail.msg) return data.detail.msg
      // Si tiene un campo error
      if (data.detail.error) return data.detail.error
      // Intentar serializar de forma legible
      try {
        return JSON.stringify(data.detail)
      } catch {
        return 'Error en la petición'
      }
    }
  }

  // Si el objeto tiene un campo message
  if (data.message) return data.message

  // Si el objeto tiene un campo msg
  if (data.msg) return data.msg

  // Si el objeto tiene un campo error
  if (data.error) return data.error

  // Fallback: intentar serializar el objeto
  try {
    return JSON.stringify(data)
  } catch {
    return 'Error en la petición'
  }
}

export const apiClient = {
  get: async (endpoint: string, token?: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${API_BASE}${endpoint}`, { headers })
    if (!res.ok) {
      const data = await parseResponseBody(res)
      throw new ApiError(res.status, data ?? { detail: 'Error en la respuesta' })
    }
    return parseResponseBody(res)
  },
  post: async (endpoint: string, data: any, token?: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const errorData = await parseResponseBody(res)
      throw new ApiError(res.status, errorData ?? { detail: 'Error en la petición' })
    }
    return parseResponseBody(res)
  },
  put: async (endpoint: string, data: any, token?: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const errorData = await parseResponseBody(res)
      throw new ApiError(res.status, errorData ?? { detail: 'Error en la petición' })
    }
    return parseResponseBody(res)
  },
  delete: async (endpoint: string, token?: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      headers,
    })
    if (!res.ok) {
      const errorData = await parseResponseBody(res)
      throw new ApiError(res.status, errorData ?? { detail: 'Error en la petición' })
    }
    return parseResponseBody(res)
  },
}