import React from 'react'
import { CheckCircle, FileText, ExternalLink, Home } from 'lucide-react'
import Button from '../components/Button'
import DrySealBadge from '../components/DrySealBadge'

export default function SubmissionConfirmation({ submissionData, onTrackApplication, onGoHome }) {
  const mockData = submissionData || {
    service: { name: 'Business Permit Renewal' },
    applicationId: 'app_123',
    referenceNumber: 'BPR-2024-07-012345',
    submittedAt: new Date().toISOString(),
    agency: 'Demo City Business Permits Office',
    blockchainHash: '0x7d9a8f3c2e1b5a6d4c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c',
    estimatedProcessingDays: 7,
  }

  const submittedDate = new Date(mockData.submittedAt)
  const estimatedCompletionDate = new Date(submittedDate)
  estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + mockData.estimatedProcessingDays)

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
          Application Submitted
        </h2>
      </div>

      {/* Content */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}
      >
        {/* Success icon */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '32px',
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
            }}
          >
            Successfully submitted!
          </h3>

          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '15px',
              color: '#5B6472',
              lineHeight: 1.6,
              maxWidth: '320px',
            }}
          >
            Your {mockData.service.name} application has been submitted to the {mockData.agency}.
          </p>
        </div>

        {/* Reference number */}
        <div
          style={{
            background: '#E8F4F8',
            border: '1px solid #B8DCE8',
            borderRadius: '16px',
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
            Reference Number
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '20px',
              fontWeight: 700,
              color: '#1F3A5F',
              marginBottom: '16px',
            }}
          >
            {mockData.referenceNumber}
          </div>
          <div
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '13px',
              color: '#5B6472',
            }}
          >
            Use this reference number to track your application or when contacting the agency.
          </div>
        </div>

        {/* Submission details */}
        <div
          style={{
            background: '#F2EFE7',
            border: '1px solid #DAD5C9',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <DetailRow label="Application ID" value={mockData.applicationId} mono />
          <DetailRow label="Submitted" value={submittedDate.toLocaleString('en-PH')} />
          <DetailRow
            label="Expected completion"
            value={estimatedCompletionDate.toLocaleDateString('en-PH', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          />
        </div>

        {/* Blockchain verification */}
        <div
          style={{
            background: '#F2EFE7',
            border: '1px solid #DAD5C9',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <DrySealBadge size={32} />
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '16px',
                fontWeight: 600,
                color: '#1B2430',
              }}
            >
              Secured on eGov Chain
            </div>
          </div>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '13px',
              color: '#5B6472',
              lineHeight: 1.6,
              marginBottom: '12px',
            }}
          >
            Your application submission has been anchored on the blockchain for tamper-proof
            verification.
          </p>
          <div
            style={{
              padding: '12px',
              background: '#FBFAF7',
              borderRadius: '8px',
              wordBreak: 'break-all',
            }}
          >
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                color: '#5B6472',
              }}
            >
              {mockData.blockchainHash}
            </div>
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
              Great work! I'll notify you through eMessage when there are updates. You can track
              your application status anytime from your dashboard.
            </p>
          </div>
        </div>

        {/* What's next */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '12px',
            }}
          >
            What happens next?
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <StepItem number="1" text="Agency reviews your application and documents" />
            <StepItem
              number="2"
              text="You'll receive a notification if additional documents are needed"
            />
            <StepItem number="3" text="Once approved, you'll receive your permit" />
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div
        style={{
          padding: '20px 24px',
          borderTop: '1px solid #DAD5C9',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Button fullWidth onClick={onTrackApplication} icon={FileText}>
          Track application
        </Button>
        <Button fullWidth variant="secondary" onClick={onGoHome} icon={Home}>
          Back to home
        </Button>
      </div>
    </div>
  )
}

function DetailRow({ label, value, mono = false }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: '12px',
          fontWeight: 600,
          color: '#5B6472',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: mono ? "'IBM Plex Mono', monospace" : "'Public Sans', sans-serif",
          fontSize: mono ? '14px' : '15px',
          color: '#1B2430',
        }}
      >
        {value}
      </div>
    </div>
  )
}

function StepItem({ number, text }) {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: '#1F3A5F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontFamily: "'Public Sans', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#FBFAF7',
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: '14px',
          color: '#1B2430',
          lineHeight: '28px',
        }}
      >
        {text}
      </div>
    </div>
  )
}
