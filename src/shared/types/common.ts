// Common shared types across the application

export type UUID = string & { readonly brand: unique symbol }

export type Timestamp = string & { readonly brand: unique symbol }

export type ApplicationId = string & { readonly brand: unique symbol }

export type DocumentId = string & { readonly brand: unique symbol }

export type UserId = string & { readonly brand: unique symbol }

export type TransactionId = string & { readonly brand: unique symbol }

// Result type for error handling
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

// Async Result
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>

// API Response wrapper
export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

// Pagination
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Filter and sort
export interface FilterOptions {
  search?: string
  status?: string
  dateFrom?: string
  dateTo?: string
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}
