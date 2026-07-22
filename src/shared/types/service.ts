export type ServiceCategory =
  | 'BUSINESS'
  | 'CIVIL_REGISTRY'
  | 'PERMITS'
  | 'TAXES'
  | 'HEALTH'
  | 'EDUCATION'
  | 'SOCIAL_WELFARE'
  | 'OTHER'

export type QuestionType = 'boolean' | 'single-select' | 'multi-select' | 'text' | 'number' | 'date' | 'file'

export interface ServiceDefinition {
  id: string
  name: string
  description: string
  category: ServiceCategory
  agency: string
  version: string
  status: 'active' | 'deprecated' | 'draft'
  estimatedDuration?: string
  requiredVerifications: string[]
  workflow: ServiceWorkflow
  source?: ServiceSource
}

export interface ServiceWorkflow {
  questions: ServiceQuestion[]
  documents: DocumentRequirement[]
  steps: string[]
  fees?: FeeStructure[]
}

export interface ServiceQuestion {
  id: string
  type: QuestionType
  label: string
  explanation?: string
  placeholder?: string
  required: boolean
  options?: QuestionOption[]
  validation?: ValidationRule
  conditional?: ConditionalRule
}

export interface QuestionOption {
  value: string
  label: string
  description?: string
}

export interface ValidationRule {
  min?: number
  max?: number
  pattern?: string
  message?: string
}

export interface ConditionalRule {
  dependsOn: string
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan'
  value: unknown
}

export interface DocumentRequirement {
  id: string
  type: string
  label: string
  description: string
  required: boolean
  requiredWhen?: ConditionalRule
  accepts?: string[]
  maxSize?: number
  example?: string
}

export interface FeeStructure {
  id: string
  description: string
  amount: number
  currency: string
  conditional?: ConditionalRule
}

export interface ServiceSource {
  type: string
  reference: string
  reviewedBy?: string
  reviewedAt?: string
  url?: string
}

export interface ServiceSearchResult {
  id: string
  name: string
  description: string
  category: ServiceCategory
  agency: string
  relevanceScore: number
}
