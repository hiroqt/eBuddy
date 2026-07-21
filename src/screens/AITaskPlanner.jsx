import React from 'react'
import { CheckCircle, Circle, ArrowLeft, AlertCircle } from 'lucide-react'
import Button from '../components/Button'

const workflowSteps = [
  {
    id: 'identify-service',
    label: 'Service identified',
    status: 'completed',
  },
  {
    id: 'verify-identity',
    label: 'Verify your identity',
    status: 'current',
    description: 'We need to confirm your identity using National ID eVerify and Face Liveness',
  },
  {
    id: 'collect-answers',
    label: 'Answer a few questions',
    status: 'pending',
  },
  {
    id: 'collect-documents',
    label: 'Upload required documents',
    status: 'pending',
  },
  {
    id: 'review',
    label: 'Review your application',
    status: 'pending',
  },
  {
    id: 'payment',
    label: 'Pay official fees',
    status: 'pending',
  },
  {
    id: 'submission',
    label: 'Submit application',
    status: 'pending',
  },
  {
    id: 'tracking',
    label: 'Track progress',
    status: 'pending',
  },
]

export default function AITaskPlanner({ service, onAccept, onCancel }) {
  const currentStep = workflowSteps.find((s) => s.status === 'current')

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
          onClick={onCancel}
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
          Your Action Plan
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Service summary */}
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
              fontSize: '13px',
              fontWeight: 600,
              color: '#1F3A5F',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Service
          </div>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '8px',
            }}
          >
            {service?.name || 'Business Permit Renewal'}
          </h3>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: '#5B6472',
              marginBottom: '12px',
            }}
          >
            {service?.jurisdiction || 'Demo City'} • {service?.agency || 'Business Permits Office'}
          </p>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#1F3A5F',
              color: '#FBFAF7',
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Verified Workflow v{service?.version || '1.0.0'}
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
              I found the service you need. Let me guide you through each step. I'll only ask for
              information that's required, and you'll review everything before submission.
            </p>
          </div>
        </div>

        {/* Workflow steps */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '16px',
            }}
          >
            Here's what we'll do
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {workflowSteps.map((step, index) => {
              const isCompleted = step.status === 'completed'
              const isCurrent = step.status === 'current'
              const isPending = step.status === 'pending'

              return (
                <div key={step.id}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px',
                      background: isCurrent ? '#F2EFE7' : 'transparent',
                      borderRadius: '12px',
                      border: isCurrent ? '2px solid #1F3A5F' : '2px solid transparent',
                    }}
                  >
                    <div style={{ paddingTop: '2px', flexShrink: 0 }}>
                      {isCompleted && <CheckCircle size={20} style={{ color: '#9C7A34' }} />}
                      {isCurrent && (
                        <Circle
                          size={20}
                          style={{ color: '#1F3A5F' }}
                          strokeWidth={3}
                          fill="#1F3A5F"
                        />
                      )}
                      {isPending && <Circle size={20} style={{ color: '#DAD5C9' }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: '15px',
                          fontWeight: isCurrent ? 600 : 400,
                          color: isCompleted || isCurrent ? '#1B2430' : '#5B6472',
                          marginBottom: step.description ? '4px' : 0,
                        }}
                      >
                        {step.label}
                      </div>
                      {step.description && (
                        <div
                          style={{
                            fontFamily: "'Public Sans', sans-serif",
                            fontSize: '13px',
                            color: '#5B6472',
                            lineHeight: 1.5,
                          }}
                        >
                          {step.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Important notice */}
        <div
          style={{
            background: '#F2EFE7',
            border: '1px solid #DAD5C9',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <AlertCircle size={20} style={{ color: '#5B6472', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: '#1B2430',
                marginBottom: '6px',
              }}
            >
              You're in control
            </div>
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '13px',
                color: '#5B6472',
                lineHeight: 1.6,
              }}
            >
              I will ask for your explicit permission before sharing data, making payments, or
              submitting your application. You can stop or save a draft at any time.
            </div>
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
        <Button fullWidth onClick={onAccept}>
          Let's start
        </Button>
        <Button fullWidth variant="secondary" onClick={onCancel}>
          Choose a different service
        </Button>
      </div>
    </div>
  )
}
