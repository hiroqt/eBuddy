import React from 'react'
import { Shield } from 'lucide-react'
import Button from '../components/Button'

export default function SignIn({ onNext }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-10 bg-paper">
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-2xl bg-seal-blue flex items-center justify-center mx-auto mb-6">
          <Shield size={40} strokeWidth={2} className="text-paper" />
        </div>

        <h1 className="font-display text-[32px] font-bold text-ink mb-3">
          DocuPH
        </h1>

        <p className="font-sans text-base text-ink-soft leading-relaxed max-w-[280px] mx-auto">
          Your unified document wallet for Philippine government records
        </p>
      </div>

      <div className="w-full max-w-[320px]">
        <Button fullWidth onClick={onNext} icon={Shield}>
          Sign in with eGovPH
        </Button>

        <p className="font-sans text-[13px] text-ink-soft text-center mt-6 leading-relaxed">
          By signing in, you agree to authenticate using Face Liveness for security. No biometric
          data is stored.
        </p>
      </div>
    </div>
  )
}
