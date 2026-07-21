import { useState, useEffect } from 'react'
import { Camera, CheckCircle, AlertCircle, ScanFace } from 'lucide-react'

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
        }, 2000)
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
    <div className="h-full flex flex-col items-center justify-center px-10 bg-paper">
      
      <div className="relative mb-10 w-full max-w-[280px] aspect-square flex items-center justify-center">
        {/* Liveness redirect */}
        {livenessUrl && !verified && !error && !scanning && (
          <>
            <div className="absolute inset-0 rounded-full bg-seal-blue/5 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75" />
            <div className="absolute inset-4 rounded-full bg-seal-blue/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s] opacity-75" />
            <div className="w-56 h-56 rounded-full flex items-center justify-center border-[6px] border-seal-blue bg-paper-dim relative z-10 shadow-[0_12px_40px_rgba(31,58,95,0.15)] transition-transform duration-300 hover:scale-105">
              <ScanFace size={72} strokeWidth={1.5} className="text-seal-blue" />
            </div>
          </>
        )}

        {/* Status display (Initializing) */}
        {!livenessUrl && !error && !scanning && !verified && (
          <div className="w-56 h-56 rounded-full flex items-center justify-center border-4 border-hairline bg-paper-dim shadow-inner">
            <Camera size={72} strokeWidth={1.5} className="text-ink-soft/40" />
          </div>
        )}

        {/* Scanning state */}
        {scanning && (
          <div className="w-56 h-56 rounded-full flex items-center justify-center border-[6px] border-seal-blue/30 bg-paper-dim relative overflow-hidden shadow-[0_0_50px_rgba(31,58,95,0.25)]">
            <ScanFace size={72} strokeWidth={1.5} className="text-seal-blue/60" />
            
            {/* Holographic scanner laser */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-seal-blue shadow-[0_0_20px_4px_rgba(31,58,95,0.6)] animate-[scan_2s_ease-in-out_infinite]" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-seal-blue/0 to-seal-blue/20 animate-[scanGradient_2s_ease-in-out_infinite]" />
            
            {/* Rotating outer ring */}
            <div className="absolute -inset-[6px] rounded-full border-[6px] border-transparent border-t-seal-blue border-r-seal-blue animate-[spin_1.5s_linear_infinite]" />
          </div>
        )}

        {/* Verified state */}
        {verified && (
          <div className="w-56 h-56 rounded-full flex items-center justify-center border-[6px] border-bronze bg-[#FEF7E6] shadow-[0_0_40px_rgba(156,122,52,0.3)] animate-[bounceIn_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)] relative">
            <div className="absolute inset-0 rounded-full animate-[ping_1.5s_ease-out] bg-bronze/20 opacity-0" />
            <CheckCircle size={80} strokeWidth={2} className="text-bronze animate-[popIn_0.4s_ease-out_0.2s_both]" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="w-56 h-56 rounded-full flex items-center justify-center border-[6px] border-dry-seal-red bg-[#FEE8E6] shadow-[0_0_40px_rgba(168,50,45,0.2)] animate-[shake_0.5s_ease-in-out]">
            <AlertCircle size={80} strokeWidth={2} className="text-dry-seal-red" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center w-full max-w-[400px]">
        <h2 className="font-display text-[26px] font-semibold text-ink mb-3 text-center transition-colors duration-300">
          {!livenessUrl && !scanning && !verified && !error && 'Initializing...'}
          {livenessUrl && !scanning && !verified && !error && 'Face Verification'}
          {scanning && 'Analyzing face map'}
          {verified && 'Identity Confirmed'}
          {error && 'Verification Failed'}
        </h2>

        <p className={`font-sans text-[15px] text-center leading-relaxed transition-all duration-300 ${error ? 'text-dry-seal-red font-medium' : 'text-ink-soft'} ${verified ? 'text-ink font-medium' : ''}`}>
          {!livenessUrl && !error && 'Securely connecting to verification servers...'}
          {livenessUrl && !scanning && !verified && !error &&
            'Position your face within the frame and follow the instructions. This ensures you are a real person.'}
          {scanning && 'Matching securely with your National ID records...'}
          {verified && 'Welcome back! Taking you securely to your wallet.'}
          {error && error}
        </p>

        {livenessUrl && !verified && !error && !scanning && (
          <button
            onClick={() => window.location.href = livenessUrl}
            className="mt-8 w-full py-4 bg-seal-blue text-paper border-none rounded-xl font-sans text-base font-semibold cursor-pointer shadow-[0_8px_20px_rgba(31,58,95,0.2)] hover:shadow-[0_12px_24px_rgba(31,58,95,0.3)] hover:-translate-y-1 transition-all duration-300"
          >
            Start Verification
          </button>
        )}

        {error && (
          <button
            onClick={() => window.location.reload()}
            className="mt-8 w-full py-4 bg-seal-blue text-paper border-none rounded-xl font-sans text-base font-semibold cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Try Again
          </button>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-20px); opacity: 0; }
          15%, 85% { opacity: 1; }
          50% { transform: translateY(220px); opacity: 1; }
        }
        @keyframes scanGradient {
          0%, 100% { transform: translateY(-120px); opacity: 0; }
          15%, 85% { opacity: 1; }
          50% { transform: translateY(120px); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  )
}
