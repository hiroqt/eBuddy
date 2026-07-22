import { ApiResponse, Result } from '@/shared/types'

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: unknown
  timeout?: number
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class BaseApiClient {
  constructor(private baseUrl: string) {}

  protected async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<Result<T>> {
    const { method = 'GET', headers = {}, body, timeout = 30000 } = config

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: new ApiError(response.status, data.message || 'Request failed', data),
        }
      }

      return {
        success: true,
        data: data as T,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: new ApiError(0, error.message),
        }
      }
      return {
        success: false,
        error: new ApiError(0, 'Unknown error occurred'),
      }
    }
  }

  protected get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'GET', headers })
  }

  protected post<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'POST', body, headers })
  }

  protected put<T>(endpoint: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'PUT', body, headers })
  }

  protected delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'DELETE', headers })
  }
}
