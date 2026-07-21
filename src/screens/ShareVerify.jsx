import React, { useState, useEffect } from 'react'
import { ArrowLeft, QrCode, Clock, XCircle } from 'lucide-react'
import Button from '../components/Button'

const agencies = [
  'Philippine Statistics Authority',
  'Social Security System',
  'Department of Health',
  'Department of Transportation',
  'Commission on Elections',
  'Bureau of Internal Revenue',
]

const fieldOptions = [
  { key: 'name', label: 'Full Name' },
  { key: 'documentNumber', label: 'Document Number' },
  { key: 'dateIssued', label: 'Date Issued' },
  { key: 'address', label: 'Address' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
]

export default function ShareVerify({ document, onBack, onComplete }) {
  const [step, setStep] = useState('select-agency')
  const [selectedAgency, setSelectedAgency] = useState('')
  const [selectedFields, setSelectedFields] = useState({})
  const [countdown, setCountdown] = useState(300) // 5 minutes

  useEffect(() => {
    if (step === 'qr-code' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, countdown])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleField = (key) => {
    setSelectedFields((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleGenerate = () => {
    setStep('qr-code')
  }

  const handleRevoke = () => {
    onComplete()
  }

  if (!document) return null

  return (
    <div className="h-full flex flex-col bg-paper">
      {/* Header */}
      <div className="px-6 py-5 border-b border-hairline flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-[10px] bg-paper-dim border-none flex items-center justify-center cursor-pointer transition-all duration-150 hover:shadow-md"
        >
          <ArrowLeft size={20} className="text-ink" />
        </button>
        <h2 className="font-display text-xl font-semibold text-ink">
          Share Document
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {step === 'select-agency' && (
          <>
            <div className="mb-6">
              <h3 className="font-display text-lg font-semibold text-ink mb-2">
                Select receiving agency
              </h3>
              <p className="font-sans text-sm text-ink-soft">
                Choose where you want to send this document
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {agencies.map((agency) => (
                <button
                  key={agency}
                  onClick={() => setSelectedAgency(agency)}
                  className={`p-4 rounded-xl border-2 text-left cursor-pointer font-sans text-[15px] text-ink transition-all duration-150 ${
                    selectedAgency === agency
                      ? 'border-seal-blue bg-paper-dim'
                      : 'border-hairline bg-paper'
                  }`}
                >
                  {agency}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'select-fields' && (
          <>
            <div className="mb-6">
              <h3 className="font-display text-lg font-semibold text-ink mb-2">
                Choose what to share
              </h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                Only the fields you check will be shared with {selectedAgency}. You can revoke
                access at any time.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {fieldOptions.map((field) => (
                <label
                  key={field.key}
                  className="flex items-center gap-3 p-4 bg-paper-dim border border-hairline rounded-xl cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFields[field.key] || false}
                    onChange={() => toggleField(field.key)}
                    className="w-5 h-5 cursor-pointer accent-seal-blue"
                  />
                  <span className="font-sans text-[15px] text-ink">
                    {field.label}
                  </span>
                </label>
              ))}
            </div>
          </>
        )}

        {step === 'qr-code' && (
          <>
            <div className="text-center mb-8">
              <div className="w-60 h-60 mx-auto mb-6 bg-paper-dim border-2 border-hairline rounded-2xl flex items-center justify-center">
                <QrCode size={180} strokeWidth={1.5} className="text-ink" />
              </div>

              <div className="flex items-center justify-center gap-2 mb-3">
                <Clock size={20} className={countdown < 60 ? 'text-dry-seal-red' : 'text-ink-soft'} />
                <span className={`font-mono text-lg font-semibold ${countdown < 60 ? 'text-dry-seal-red' : 'text-ink'}`}>
                  {formatTime(countdown)}
                </span>
              </div>

              <p className="font-sans text-sm text-ink-soft mb-5">
                Have the agency scan this code to verify your document
              </p>

              <div className="bg-paper-dim border border-hairline rounded-xl p-4 text-left">
                <div className="font-sans text-[13px] font-semibold text-ink-soft mb-2 uppercase tracking-wide">
                  Sharing with
                </div>
                <div className="font-sans text-[15px] text-ink mb-3">
                  {selectedAgency}
                </div>
                <div className="font-sans text-[13px] font-semibold text-ink-soft mb-1.5 uppercase tracking-wide">
                  Fields shared
                </div>
                <div className="font-sans text-[13px] text-ink leading-relaxed">
                  {Object.keys(selectedFields)
                    .filter((key) => selectedFields[key])
                    .map((key) => fieldOptions.find((f) => f.key === key)?.label)
                    .join(', ')}
                </div>
              </div>
            </div>

            <Button fullWidth variant="danger" onClick={handleRevoke} icon={XCircle}>
              Revoke access
            </Button>
          </>
        )}
      </div>

      {/* Bottom actions */}
      {step !== 'qr-code' && (
        <div className="px-6 py-5 border-t border-hairline">
          <Button
            fullWidth
            onClick={() => {
              if (step === 'select-agency') setStep('select-fields')
              else if (step === 'select-fields') handleGenerate()
            }}
            disabled={
              (step === 'select-agency' && !selectedAgency) ||
              (step === 'select-fields' && Object.values(selectedFields).every((v) => !v))
            }
          >
            {step === 'select-agency' && 'Continue'}
            {step === 'select-fields' && 'Generate secure QR code'}
          </Button>
        </div>
      )}
    </div>
  )
}
