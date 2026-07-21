// eGov API Utilities
// Handles authentication and API calls to the eGov Hackathon API

const EGOV_API_BASE_URL = import.meta.env.VITE_EGOV_API_BASE_URL
const EGOV_ACCESS_CODE = import.meta.env.VITE_EGOV_ACCESS_CODE
const isDevelopment = import.meta.env.DEV
const API_ENDPOINT = isDevelopment ? '/egov-api' : EGOV_API_BASE_URL

/**
 * Generate an access token using the access code
 * This token expires after 8 hours (28800 seconds)
 * @returns {Promise<Object>} Token data including access_token, expires_in_seconds, and credits info
 */
export async function generateAccessToken() {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/v1/egov/integration/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_code: EGOV_ACCESS_CODE,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate token: ${response.status}`)
    }

    const data = await response.json()
    
    // Store token in localStorage with expiry time
    const expiryTime = Date.now() + (data.expires_in_seconds * 1000)
    localStorage.setItem('egov_token', data.access_token)
    localStorage.setItem('egov_token_expiry', expiryTime.toString())
    localStorage.setItem('egov_credits_total', data.credits_total.toString())
    localStorage.setItem('egov_credits_remaining', data.credits_remaining.toString())
    
    return data
  } catch (error) {
    console.error('Error generating access token:', error)
    throw error
  }
}

/**
 * Get the current access token, generating a new one if expired
 * @returns {Promise<string>} Valid access token
 */
export async function getAccessToken() {
  const token = localStorage.getItem('egov_token')
  const expiry = localStorage.getItem('egov_token_expiry')
  
  // Check if token exists and is not expired (with 5 minute buffer)
  if (token && expiry && Date.now() < parseInt(expiry) - 300000) {
    return token
  }
  
  // Token expired or doesn't exist, generate new one
  const tokenData = await generateAccessToken()
  return tokenData.access_token
}

/**
 * Get current token credits
 * @returns {Promise<Object>} Credits information
 */
export async function getTokenCredits() {
  try {
    const token = await getAccessToken()
    
    const response = await fetch(`${API_ENDPOINT}/api/v1/egov/integration/credits`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get credits: ${response.status}`)
    }

    const data = await response.json()
    
    // Update localStorage
    if (data.credits_remaining !== undefined) {
      localStorage.setItem('egov_credits_remaining', data.credits_remaining.toString())
    }
    
    return data
  } catch (error) {
    console.error('Error getting token credits:', error)
    throw error
  }
}

/**
 * Call the AI Assistant API
 * @param {string} prompt - User's question
 * @param {string} category - Category code (default: "PH")
 * @returns {Promise<string>} AI response
 */
export async function callAIAssistant(prompt, category = 'PH') {
  try {
    const token = await getAccessToken()
    
    const response = await fetch(`${API_ENDPOINT}/api/v1/egov/integration/ai_assistant/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        prompt,
        category,
      }),
    })

    if (!response.ok) {
      // If unauthorized, try refreshing token once
      if (response.status === 401) {
        localStorage.removeItem('egov_token')
        const newToken = await getAccessToken()
        
        const retryResponse = await fetch(`${API_ENDPOINT}/api/v1/egov/integration/ai_assistant/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
          },
          body: JSON.stringify({
            prompt,
            category,
          }),
        })
        
        if (!retryResponse.ok) {
          throw new Error(`AI Assistant API error: ${retryResponse.status}`)
        }
        
        const retryData = await retryResponse.json()
        return retryData.data || retryData.response || retryData.message
      }
      
      throw new Error(`AI Assistant API error: ${response.status}`)
    }

    const data = await response.json()
    return data.data || data.response || data.message
  } catch (error) {
    console.error('Error calling AI Assistant:', error)
    throw error
  }
}

/**
 * Translate text from one language to another
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code (e.g., "en")
 * @param {string} targetLang - Target language code (e.g., "fil")
 * @returns {Promise<string>} Translated text
 */
export async function translateText(text, sourceLang, targetLang) {
  try {
    const token = await getAccessToken()
    
    const response = await fetch(`${API_ENDPOINT}/api/v1/egov/integration/translator/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        prompt: text,
        source_lang: sourceLang,
        target_lang: targetLang,
      }),
    })

    if (!response.ok) {
      throw new Error(`Translator API error: ${response.status}`)
    }

    const data = await response.json()
    return data.data || data.translation || data.message
  } catch (error) {
    console.error('Error translating text:', error)
    throw error
  }
}
