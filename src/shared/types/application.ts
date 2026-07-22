import { ApplicationId, UserId, Timestamp, DocumentId, TransactionId } from './common'

export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'DOCUMENTS_PENDING'
  | 'UNDER_REVIEW'
  | 'ADDITIONAL_INFO_REQUIRED'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'CANCELLED'

export type PaymentStatus =
  | 'NOT_REQUIRED'
  | 'PENDING_ASSESSMENT'
  | 'READY_FOR_PAYMENT'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'FAILED'
  | 'EXPIRED'
  | 'REFUNDED'

export interface Application {
  id: ApplicationId
  userId: UserId
  serviceId: string
  serviceName: string
  status: ApplicationStatus
  paymentStatus: PaymentStatus
  referenceNumber: string
  submittedAt?: Timestamp
  updatedAt: Timestamp
  createdAt: Timestamp
  completedAt?: Timestamp
  data: ApplicationData
  timeline: TimelineEvent[]
}

export interface ApplicationData {
  answers: Record<string, unknown>
  documents: DocumentId[]
  payment?: PaymentInfo
  blockchain?: string
  metadata?: Record<string, unknown>
}

export interface PaymentInfo {
  transactionId: TransactionId
  amount: number
  currency: string
  method: string
  status: PaymentStatus
  paidAt?: Timestamp
  receiptUrl?: string
}

export interface TimelineEvent {
  id: string
  type: string
  status: string
  title: string
  description?: string
  timestamp: Timestamp
  actor?: {
    type: 'USER' | 'SYSTEM' | 'OFFICER'
    name: string
  }
  metadata?: Record<string, unknown>
}

export interface ApplicationReviewData {
  service: {
    id: string
    name: string
    agency: string
  }
  answers: Array<{
    question: string
    answer: unknown
  }>
  documents: Array<{
    type: string
    name: string
    status: string
  }>
  fees: Array<{
    description: string
    amount: number
  }>
  totalAmount: number
}

export interface ApplicationSummary {
  id: ApplicationId
  serviceName: string
  status: ApplicationStatus
  referenceNumber: string
  submittedAt?: Timestamp
  lastUpdate: {
    message: string
    timestamp: Timestamp
  }
}
