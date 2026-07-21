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

  const circleBase = "w-60 h-60 rounded-full flex items-center justify-center mb-8 mx-auto"

  return (
    <div className="h-full flex flex-col items-center justify-center px-10 bg-paper">
      {/* Liveness redirect */}
      {livenessUrl && !verified && !error && (
        <div className="w-full max-w-[500px] text-center">
          <div className={`${circleBase} border-4 border-seal-blue bg-paper-dim`}>
            <Camera size={80} strokeWidth={1.5} className="text-ink-soft" />
          </div>
          <button
            onClick={() => window.location.href = livenessUrl}
            className="px-12 py-4 bg-seal-blue text-white border-none rounded-lg font-sans text-base font-medium cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-150"
          >
            Start Face Verification
          </button>
        </div>
      )}

      {/* Status display */}
      {!livenessUrl && !error && (
        <div className={`${circleBase} border-4 border-hairline bg-paper-dim`}>
          <Camera size={80} strokeWidth={1.5} className="text-ink-soft" />
        </div>
      )}

      {scanning && (
        <div className={`${circleBase} border-4 border-seal-blue bg-paper-dim relative`}>
          <Camera size={80} strokeWidth={1.5} className="text-ink-soft" />
          <div className="absolute -inset-1 rounded-full border-4 border-transparent border-t-seal-blue animate-spin" />
        </div>
      )}

      {verified && (
        <div className={`${circleBase} border-4 border-bronze bg-paper-dim`}>
          <CheckCircle size={80} strokeWidth={2} className="text-bronze" />
        </div>
      )}

      {error && (
        <div className={`${circleBase} border-4 border-dry-seal-red bg-paper-dim`}>
          <AlertCircle size={80} strokeWidth={2} className="text-dry-seal-red" />
        </div>
      )}

      <h2 className="font-display text-2xl font-semibold text-ink mb-3 text-center">
        {!livenessUrl && !scanning && !verified && !error && 'Initializing verification'}
        {livenessUrl && !scanning && !verified && !error && 'Verify your identity'}
        {scanning && 'Verifying your identity'}
        {verified && 'Identity confirmed'}
        {error && 'Verification failed'}
      </h2>

      <p className={`font-sans text-[15px] text-center leading-relaxed max-w-[380px] ${error ? 'text-dry-seal-red' : 'text-ink-soft'}`}>
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
          className="mt-6 px-8 py-3 bg-seal-blue text-white border-none rounded-lg font-sans text-[15px] font-medium cursor-pointer transition-all duration-150 hover:shadow-md"
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
