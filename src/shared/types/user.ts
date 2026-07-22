import { UserId, Timestamp } from './common'

export interface User {
  id: UserId
  email: string
  firstName: string
  lastName: string
  fullName: string
  phoneNumber?: string
  dateOfBirth?: string
  nationalId?: string
  isVerified: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface UserProfile extends User {
  address?: UserAddress
  emergencyContact?: EmergencyContact
  preferences?: UserPreferences
}

export interface UserAddress {
  street: string
  barangay: string
  city: string
  province: string
  zipCode: string
  country: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phoneNumber: string
}

export interface UserPreferences {
  language: 'en' | 'fil'
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  accessibility: {
    fontSize: 'small' | 'medium' | 'large'
    highContrast: boolean
    screenReader: boolean
  }
}

export interface AuthSession {
  userId: UserId
  token: string
  expiresAt: Timestamp
  issuedAt: Timestamp
}

export interface VerificationStatus {
  nationalIdVerified: boolean
  faceLivenessVerified: boolean
  phoneVerified: boolean
  emailVerified: boolean
  lastVerifiedAt?: Timestamp
}
