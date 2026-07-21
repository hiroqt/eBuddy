import React from 'react'
import { Shield } from 'lucide-react'
import Button from '../components/Button'

export default function SignIn({ onNext }) {
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
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: '#1F3A5F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <Shield size={40} strokeWidth={2} style={{ color: '#FBFAF7' }} />
        </div>

        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '32px',
            fontWeight: 700,
            color: '#1B2430',
            marginBottom: '12px',
          }}
        >
          DocuPH
        </h1>

        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: '16px',
            color: '#5B6472',
            lineHeight: 1.5,
            maxWidth: '280px',
            margin: '0 auto',
          }}
        >
          Your unified document wallet for Philippine government records
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '320px' }}>
        <Button fullWidth onClick={onNext} icon={Shield}>
          Sign in with eGovPH
        </Button>

        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: '13px',
            color: '#5B6472',
            textAlign: 'center',
            marginTop: '24px',
            lineHeight: 1.6,
          }}
        >
          By signing in, you agree to authenticate using Face Liveness for security. No biometric
          data is stored.
        </p>
      </div>
    </div>
  )
}
