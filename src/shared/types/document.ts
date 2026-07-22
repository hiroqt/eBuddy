import { DocumentId, UserId, Timestamp } from './common'

export type DocumentType =
  | 'NATIONAL_ID'
  | 'BIRTH_CERTIFICATE'
  | 'BUSINESS_PERMIT'
  | 'TAX_ID'
  | 'BARANGAY_CLEARANCE'
  | 'LEASE_CONTRACT'
  | 'PROOF_OF_OWNERSHIP'
  | 'FINANCIAL_STATEMENT'
  | 'OTHER'

export type DocumentStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED'

export interface Document {
  id: DocumentId
  userId: UserId
  type: DocumentType
  title: string
  description?: string
  status: DocumentStatus
  fileUrl: string
  fileName: string
  fileSize: number
  mimeType: string
  uploadedAt: Timestamp
  verifiedAt?: Timestamp
  expiresAt?: Timestamp
  metadata?: DocumentMetadata
  blockchain?: BlockchainProof
}

export interface DocumentMetadata {
  issuer?: string
  issueDate?: string
  expiryDate?: string
  documentNumber?: string
  extractedFields?: Record<string, unknown>
  aiAnalysis?: AIAnalysisResult
}

export interface AIAnalysisResult {
  quality: 'good' | 'fair' | 'poor'
  readability: number // 0-1
  detectedType?: DocumentType
  extractedData?: Record<string, unknown>
  issues?: string[]
  confidence: number // 0-1
}

export interface BlockchainProof {
  transactionHash: string
  blockNumber: number
  contentHash: string
  timestamp: Timestamp
  network: string
}

export interface DocumentUploadRequest {
  file: File
  type: DocumentType
  description?: string
}

export interface DocumentChecklistItem {
  type: DocumentType
  label: string
  description: string
  required: boolean
  example?: string
  uploaded: boolean
}
