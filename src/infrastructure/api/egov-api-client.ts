import { BaseApiClient } from './base-client'
import { AsyncResult } from '@/shared/types'

const EGOV_API_BASE_URL = import.meta.env.VITE_EGOV_API_BASE_URL
const EGOV_ACCESS_CODE = import.meta.env.VITE_EGOV_ACCESS_CODE
const isDevelopment = import.meta.env.DEV
const API_ENDPOINT = isDevelopment ? '/egov-api' : EGOV_API_BASE_URL

// Token storage keys
const TOKEN_KEY = 'egov_token'
const TOKEN_EXPIRY_KEY = 'egov_token_expiry'
const CREDITS_TOTAL_KEY = 'egov_credits_total'
const CREDITS_REMAINING_KEY = 'egov_credits_remaining'

interface TokenResponse {
  access_token: string
  expires_in_seconds: number
  credits_total: number
  credits_remaining: number
}

interface CreditsResponse {
  credits_total: number
  credits_remaining: number
}

interface AIAssistantRequest {
  prompt: string
  category?: string
}

interface AIAssistantResponse {
  data?: string
  response?: string
  message?: string
}

interface TranslatorRequest {
  prompt: string
  source_lang: string
  target_lang: string
}

interface TranslatorResponse {
  data?: string
  translation?: string
  message?: string
}

class EgovApiClient extends BaseApiClient {
  constructor() {
    super(API_ENDPOINT)
  }

  /**
   * Generate an access token using the access code
   * Token expires after 8 hours (28800 seconds)
   */
  async generateAccessToken(): AsyncResult<TokenResponse> {
    const result = await this.post<TokenResponse>('/api/v1/egov/integration/token', {
      access_code: EGOV_ACCESS_CODE,
    })

    if (result.success) {
      this.storeToken(result.data)
    }

    return result
  }

  /**
   * Get the current access token, generating a new one if expired
   */
  async getAccessToken(): Promise<string> {
    const token = localStorage.getItem(TOKEN_KEY)
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)

    // Check if token exists and is not expired (with 5 minute buffer)
    if (token && expiry && Date.now() < parseInt(expiry) - 300000) {
      return token
    }

    // Token expired or doesn't exist, generate new one
    const result = await this.generateAccessToken()
    if (!result.success) {
      throw result.error
    }

    return result.data.access_token
  }

  /**
   * Get current token credits
   */
  async getTokenCredits(): AsyncResult<CreditsResponse> {
    const token = await this.getAccessToken()

    const result = await this.get<CreditsResponse>('/api/v1/egov/integration/credits', {
      Authorization: `Bearer ${token}`,
    })

    if (result.success) {
      if (result.data.credits_remaining !== undefined) {
        localStorage.setItem(CREDITS_REMAINING_KEY, result.data.credits_remaining.toString())
      }
    }

    return result
  }

  /**
   * Call the AI Assistant API
   */
  async callAIAssistant(prompt: string, category: string = 'PH'): AsyncResult<string> {
    const token = await this.getAccessToken()

    const result = await this.post<AIAssistantResponse>(
      '/api/v1/egov/integration/ai_assistant/generate',
      { prompt, category },
      { Authorization: `Bearer ${token}` }
    )

    if (result.success) {
      const response = result.data.data || result.data.response || result.data.message || ''
      return { success: true, data: response }
    }

    // If unauthorized, try refreshing token once
    if (result.error.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      const newToken = await this.getAccessToken()

      const retryResult = await this.post<AIAssistantResponse>(
        '/api/v1/egov/integration/ai_assistant/generate',
        { prompt, category },
        { Authorization: `Bearer ${newToken}` }
      )

      if (retryResult.success) {
        const response =
          retryResult.data.data || retryResult.data.response || retryResult.data.message || ''
        return { success: true, data: response }
      }

      return retryResult
    }

    return result
  }

  /**
   * Translate text from one language to another
   */
  async translateText(
    text: string,
    sourceLang: string,
    targetLang: string
  ): AsyncResult<string> {
    const token = await this.getAccessToken()

    const result = await this.post<TranslatorResponse>(
      '/api/v1/egov/integration/translator/generate',
      { prompt: text, source_lang: sourceLang, target_lang: targetLang },
      { Authorization: `Bearer ${token}` }
    )

    if (result.success) {
      const translation =
        result.data.data || result.data.translation || result.data.message || ''
      return { success: true, data: translation }
    }

    return result
  }

  /**
   * Store token and its metadata in localStorage
   */
  private storeToken(tokenData: TokenResponse): void {
    const expiryTime = Date.now() + tokenData.expires_in_seconds * 1000
    localStorage.setItem(TOKEN_KEY, tokenData.access_token)
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
    localStorage.setItem(CREDITS_TOTAL_KEY, tokenData.credits_total.toString())
    localStorage.setItem(CREDITS_REMAINING_KEY, tokenData.credits_remaining.toString())
  }
}

// Export singleton instance
export const egovApiClient = new EgovApiClient()

// Export types
export type { TokenResponse, CreditsResponse, AIAssistantRequest, TranslatorRequest }
