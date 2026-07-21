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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FBFAF7' }}>
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #DAD5C9',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: '#F2EFE7',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={20} style={{ color: '#1B2430' }} />
        </button>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '20px',
            fontWeight: 600,
            color: '#1B2430',
          }}
        >
          Share Document
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {step === 'select-agency' && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1B2430',
                  marginBottom: '8px',
                }}
              >
                Select receiving agency
              </h3>
              <p
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '14px',
                  color: '#5B6472',
                }}
              >
                Choose where you want to send this document
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {agencies.map((agency) => (
                <button
                  key={agency}
                  onClick={() => setSelectedAgency(agency)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: `2px solid ${selectedAgency === agency ? '#1F3A5F' : '#DAD5C9'}`,
                    background: selectedAgency === agency ? '#F2EFE7' : '#FBFAF7',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '15px',
                    color: '#1B2430',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {agency}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'select-fields' && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1B2430',
                  marginBottom: '8px',
                }}
              >
                Choose what to share
              </h3>
              <p
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '14px',
                  color: '#5B6472',
                  lineHeight: 1.6,
                }}
              >
                Only the fields you check will be shared with {selectedAgency}. You can revoke
                access at any time.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {fieldOptions.map((field) => (
                <label
                  key={field.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    background: '#F2EFE7',
                    border: '1px solid #DAD5C9',
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFields[field.key] || false}
                    onChange={() => toggleField(field.key)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#1F3A5F',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: '15px',
                      color: '#1B2430',
                    }}
                  >
                    {field.label}
                  </span>
                </label>
              ))}
            </div>
          </>
        )}

        {step === 'qr-code' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  width: '240px',
                  height: '240px',
                  margin: '0 auto 24px',
                  background: '#F2EFE7',
                  border: '2px solid #DAD5C9',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <QrCode size={180} strokeWidth={1.5} style={{ color: '#1B2430' }} />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                }}
              >
                <Clock size={20} style={{ color: countdown < 60 ? '#A8322D' : '#5B6472' }} />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '18px',
                    fontWeight: 600,
                    color: countdown < 60 ? '#A8322D' : '#1B2430',
                  }}
                >
                  {formatTime(countdown)}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '14px',
                  color: '#5B6472',
                  marginBottom: '20px',
                }}
              >
                Have the agency scan this code to verify your document
              </p>

              <div
                style={{
                  background: '#F2EFE7',
                  border: '1px solid #DAD5C9',
                  borderRadius: '12px',
                  padding: '16px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#5B6472',
                    marginBottom: '8px',
                  }}
                >
                  Sharing with
                </div>
                <div
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '15px',
                    color: '#1B2430',
                    marginBottom: '12px',
                  }}
                >
                  {selectedAgency}
                </div>
                <div
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#5B6472',
                    marginBottom: '6px',
                  }}
                >
                  Fields shared
                </div>
                <div
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '13px',
                    color: '#1B2430',
                  }}
                >
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
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid #DAD5C9',
          }}
        >
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
