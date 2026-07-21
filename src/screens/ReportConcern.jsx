import React, { useState } from 'react'
import { ArrowLeft, AlertTriangle, CheckCircle, Loader } from 'lucide-react'
import Button from '../components/Button'

const concernCategories = [
  { value: 'delayed', label: 'Processing is delayed' },
  { value: 'missing-docs', label: 'Documents not acknowledged' },
  { value: 'incorrect-info', label: 'Incorrect information in application' },
  { value: 'payment-issue', label: 'Payment not reflected' },
  { value: 'no-response', label: 'No response from agency' },
  { value: 'other', label: 'Other concern' },
]

export default function ReportConcern({ applicationData, onSubmitted, onBack }) {
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reportCaseNumber, setReportCaseNumber] = useState('')

  const mockData = applicationData || {
    referenceNumber: 'BPR-2024-07-012345',
    service: 'Business Permit Renewal',
    agency: 'Demo City Business Permits Office',
    submittedDate: '2024-07-22',
  }

  const handleSubmit = () => {
    setSubmitting(true)
    // Simulate eReport submission
    setTimeout(() => {
      const caseNumber = 'ERPT-' + Date.now().toString().substring(-6)
      setReportCaseNumber(caseNumber)
      setSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  const canSubmit = category && description.trim().length >= 20 && (contactEmail || contactPhone)

  if (submitted) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FBFAF7' }}>
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #DAD5C9',
          }}
        >
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
              fontWeight: 600,
              color: '#1B2430',
            }}
          >
            Concern Filed
          </h2>
        </div>

        {/* Success content */}
        <div
          className="no-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#E8F4E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            <CheckCircle size={48} style={{ color: '#9C7A34' }} />
          </div>

          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '24px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
            Report submitted
          </h3>

          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '15px',
              color: '#5B6472',
              textAlign: 'center',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Your concern has been filed through eReport and will be reviewed by the appropriate
            office.
          </p>

          <div
            style={{
              width: '100%',
              background: '#E8F4F8',
              border: '1px solid #B8DCE8',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                color: '#5B6472',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Report Case Number
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '20px',
                fontWeight: 700,
                color: '#1F3A5F',
                marginBottom: '12px',
              }}
            >
              {reportCaseNumber}
            </div>
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '13px',
                color: '#5B6472',
                lineHeight: 1.6,
              }}
            >
              Use this case number to track your report. You'll receive updates through eMessage.
            </div>
          </div>

          <div
            style={{
              width: '100%',
              background: '#FEF7E6',
              border: '1px solid #F5D485',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#9C7A34',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: "'Fraunces', serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#FBFAF7',
                }}
              >
                e
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '14px',
                    color: '#1B2430',
                    lineHeight: 1.6,
                  }}
                >
                  The concerned office will review your report and respond within 3-5 business days.
                  You'll receive notifications through eMessage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom action */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid #DAD5C9',
          }}
        >
          <Button fullWidth onClick={() => onSubmitted(reportCaseNumber)}>
            Done
          </Button>
        </div>
      </div>
    )
  }

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
          disabled={submitting}
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
          File a Concern
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Application reference */}
        <div
          style={{
            background: '#E8F4F8',
            border: '1px solid #B8DCE8',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              color: '#5B6472',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Related Application
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '14px',
              fontWeight: 700,
              color: '#1F3A5F',
              marginBottom: '8px',
            }}
          >
            {mockData.referenceNumber}
          </div>
          <div
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: '#1B2430',
            }}
          >
            {mockData.service}
          </div>
          <div
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '13px',
              color: '#5B6472',
            }}
          >
            {mockData.agency}
          </div>
        </div>

        {/* Mascot message */}
        <div
          style={{
            background: '#FEF7E6',
            border: '1px solid #F5D485',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#9C7A34',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontFamily: "'Fraunces', serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#FBFAF7',
            }}
          >
            e
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                color: '#1B2430',
                lineHeight: 1.6,
              }}
            >
              I'll prepare your concern report and submit it through eReport. The agency will be
              notified and you'll receive updates on your case.
            </p>
          </div>
        </div>

        {/* Category selection */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontFamily: "'Fraunces', serif",
              fontSize: '16px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '12px',
            }}
          >
            What is your concern about?
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {concernCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                disabled={submitting}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: `2px solid ${category === cat.value ? '#1F3A5F' : '#DAD5C9'}`,
                  background: category === cat.value ? '#F2EFE7' : '#FBFAF7',
                  textAlign: 'left',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '15px',
                  color: '#1B2430',
                  transition: 'all 0.15s ease',
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontFamily: "'Fraunces', serif",
              fontSize: '16px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '12px',
            }}
          >
            Please describe your concern
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide as much detail as possible..."
            disabled={submitting}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '2px solid #DAD5C9',
              background: '#FBFAF7',
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '15px',
              color: '#1B2430',
              resize: 'vertical',
              outline: 'none',
              opacity: submitting ? 0.6 : 1,
            }}
          />
          <div
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '13px',
              color: description.length < 20 ? '#A8322D' : '#5B6472',
              marginTop: '6px',
            }}
          >
            {description.length} / 20 characters minimum
          </div>
        </div>

        {/* Contact information */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '16px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '12px',
            }}
          >
            Contact information for follow-up
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#5B6472',
                  marginBottom: '6px',
                }}
              >
                Email address
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="your.email@example.com"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #DAD5C9',
                  background: '#FBFAF7',
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '15px',
                  color: '#1B2430',
                  opacity: submitting ? 0.6 : 1,
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#5B6472',
                  marginBottom: '6px',
                }}
              >
                Mobile number
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+63 912 345 6789"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #DAD5C9',
                  background: '#FBFAF7',
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '15px',
                  color: '#1B2430',
                  opacity: submitting ? 0.6 : 1,
                }}
              />
            </div>
          </div>
        </div>

        {/* Processing state */}
        {submitting && (
          <div
            style={{
              background: '#E8F4F8',
              border: '1px solid #B8DCE8',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Loader size={20} style={{ color: '#1F3A5F', animation: 'spin 1s linear infinite' }} />
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                color: '#1B2430',
              }}
            >
              Submitting your concern through eReport...
            </div>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div
        style={{
          padding: '20px 24px',
          borderTop: '1px solid #DAD5C9',
        }}
      >
        <Button
          fullWidth
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          icon={submitting ? Loader : AlertTriangle}
        >
          {submitting ? 'Submitting...' : 'Submit concern'}
        </Button>
      </div>
    </div>
  )
}
