import { useState, useEffect } from 'react'
import { Camera, CheckCircle, AlertCircle } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_LIVENESS_API_BASE_URL || 'https://hackathon-face-liveness-api.e.gov.ph'
const API_KEY = import.meta.env.VITE_LIVENESS_API_KEY || ''

// Use proxy in development to avoid CORS/Private Network Access issues
const isDevelopment = import.meta.env.DEV
const API_ENDPOINT = isDevelopment ? '/api' : API_BASE_URL

export default function FaceLiveness({ onNext }) {
  const [scanning, setScanning] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(null)
  const [sessionToken, setSessionToken] = useState(null)
  const [livenessUrl, setLivenessUrl] = useState(null)

  // Check if returning from callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const status = urlParams.get('liveness_status')
    
    if (token && status) {
      setSessionToken(token)
      // User returned from verification, check the result
      checkVerificationResult(token)
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  // Function to check verification result
  const checkVerificationResult = async (token) => {
    setScanning(true)
    
    try {
      const response = await fetch(`${API_ENDPOINT}/v1/liveness/result/${token}`, {
        method: 'GET',
        headers: {
          'x-api-key': API_KEY,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to get verification result: ${response.status}`)
      }

      const result = await response.json()

      if (result.status === 'SUCCEEDED' && result.confidence_score >= 95.0) {
        setScanning(false)
        setVerified(true)
        
        // Proceed to next step after delay
        setTimeout(() => {
          onNext({ 
            verified: true, 
            confidenceScore: result.confidence_score,
            referenceImageUrl: result.reference_image_url 
          })
        }, 1500)
      } else {
        setScanning(false)
        setError(
          result.confidence_score < 95.0
            ? 'Verification failed: Low confidence score. Please try again in better lighting.'
            : 'Verification failed. Please try again.'
        )
      }
    } catch (err) {
      console.error('Failed to verify liveness result:', err)
      setScanning(false)
      setError('Failed to verify result. Please try again.')
    }
  }

  // Initialize liveness session
  useEffect(() => {
    // Skip if we're handling a callback
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('token')) return

    const initializeSession = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/v1/liveness/session`, {
          method: 'POST',
          headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'redirect',
            callback_url: window.location.origin,
            delay: 3000,
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to create session: ${response.status}`)
        }

        const data = await response.json()
        setSessionToken(data.token)
        setLivenessUrl(data.url)
      } catch (err) {
        console.error('Failed to initialize liveness session:', err)
        setError('Failed to initialize verification. Please try again.')
      }
    }

    initializeSession()
  }, [])

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        background: '#FBFAF7',
      }}
    >
      {/* Liveness redirect */}
      {livenessUrl && !verified && !error && (
        <div style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <div
            style={{
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              border: '4px solid #1F3A5F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              background: '#F2EFE7',
              margin: '0 auto 32px',
            }}
          >
            <Camera size={80} strokeWidth={1.5} style={{ color: '#5B6472' }} />
          </div>
          <button
            onClick={() => window.location.href = livenessUrl}
            style={{
              padding: '16px 48px',
              background: '#1F3A5F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Start Face Verification
          </button>
        </div>
      )}

      {/* Status display */}
      {!livenessUrl && !error && (
        <div
          style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            border: '4px solid #DAD5C9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            background: '#F2EFE7',
          }}
        >
          <Camera size={80} strokeWidth={1.5} style={{ color: '#5B6472' }} />
        </div>
      )}

      {scanning && (
        <div
          style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            border: '4px solid #1F3A5F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            position: 'relative',
            background: '#F2EFE7',
          }}
        >
          <Camera size={80} strokeWidth={1.5} style={{ color: '#5B6472' }} />
          <div
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: '4px solid transparent',
              borderTopColor: '#1F3A5F',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}

      {verified && (
        <div
          style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            border: '4px solid #9C7A34',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            background: '#F2EFE7',
          }}
        >
          <CheckCircle size={80} strokeWidth={2} style={{ color: '#9C7A34' }} />
        </div>
      )}

      {error && (
        <div
          style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            border: '4px solid #C23030',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            background: '#F2EFE7',
          }}
        >
          <AlertCircle size={80} strokeWidth={2} style={{ color: '#C23030' }} />
        </div>
      )}

      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: '24px',
          fontWeight: 600,
          color: '#1B2430',
          marginBottom: '12px',
          textAlign: 'center',
        }}
      >
        {!livenessUrl && !scanning && !verified && !error && 'Initializing verification'}
        {livenessUrl && !scanning && !verified && !error && 'Verify your identity'}
        {scanning && 'Verifying your identity'}
        {verified && 'Identity confirmed'}
        {error && 'Verification failed'}
      </h2>

      <p
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: '15px',
          color: error ? '#C23030' : '#5B6472',
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '380px',
        }}
      >
        {!livenessUrl && !error && 'Setting up face liveness verification...'}
        {livenessUrl && !scanning && !verified && !error &&
          'Position your face in the camera and follow the instructions. Nothing is stored - this happens every time you sign in.'}
        {scanning && 'Analyzing verification data...'}
        {verified && 'Welcome back. Taking you to your wallet now.'}
        {error && error}
      </p>

      {error && (
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '24px',
            padding: '12px 32px',
            background: '#1F3A5F',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontFamily: "'Public Sans', sans-serif",
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
