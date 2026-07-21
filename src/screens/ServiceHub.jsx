import React, { useState } from 'react'
import { MessageSquare, FileText, Search, TrendingUp, User, Clock } from 'lucide-react'
import Button from '../components/Button'

const popularServices = [
  {
    id: 'business-permit-renewal',
    title: 'Business Permit Renewal',
    description: 'Renew your business permit for this year',
    icon: FileText,
    color: '#1F3A5F',
  },
  {
    id: 'identity-verification',
    title: 'Verify Identity',
    description: 'Confirm your identity with National ID',
    icon: User,
    color: '#9C7A34',
  },
  {
    id: 'track-application',
    title: 'Track Application',
    description: 'Check the status of your existing applications',
    icon: Clock,
    color: '#5B6472',
  },
]

const recentApplications = [
  {
    id: 'app_123',
    service: 'Business Permit Renewal',
    status: 'DOCUMENTS_PENDING',
    updatedAt: '2 hours ago',
  },
]

export default function ServiceHub({ onStartService, onNavigate }) {
  const [userInput, setUserInput] = useState('')

  const handleSubmitGoal = () => {
    if (userInput.trim()) {
      onStartService({ type: 'natural-language', input: userInput })
    }
  }

  const handleSelectService = (serviceId) => {
    onStartService({ type: 'direct', serviceId })
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FBFAF7' }}>
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #DAD5C9',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '24px',
                fontWeight: 600,
                color: '#1B2430',
                marginBottom: '4px',
              }}
            >
              Good morning, Juan
            </h1>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                color: '#5B6472',
              }}
            >
              How can I help you today?
            </p>
          </div>
          <button
            onClick={() => onNavigate('profile')}
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
            <User size={20} style={{ color: '#1B2430' }} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Natural language input */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <MessageSquare size={20} style={{ color: '#1F3A5F' }} />
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#1B2430',
              }}
            >
              Tell me what you need
            </h3>
          </div>

          <div
            style={{
              background: '#F2EFE7',
              border: '1px solid #DAD5C9',
              borderRadius: '16px',
              padding: '16px',
            }}
          >
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Example: I want to renew my business permit..."
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '0',
                border: 'none',
                background: 'transparent',
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '15px',
                color: '#1B2430',
                resize: 'none',
                outline: 'none',
              }}
            />
            <div style={{ marginTop: '12px' }}>
              <Button
                fullWidth
                onClick={handleSubmitGoal}
                disabled={!userInput.trim()}
                icon={Search}
              >
                Find the right service
              </Button>
            </div>
          </div>
        </div>

        {/* Resume recent applications */}
        {recentApplications.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#1B2430',
                marginBottom: '12px',
              }}
            >
              Continue where you left off
            </h3>
            {recentApplications.map((app) => (
              <div
                key={app.id}
                style={{
                  background: '#FEF7E6',
                  border: '1px solid #F5D485',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => onNavigate('tracking-timeline', { applicationId: app.id })}
              >
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1B2430',
                    marginBottom: '4px',
                  }}
                >
                  {app.service}
                </div>
                <div
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '13px',
                    color: '#9C7A34',
                    marginBottom: '4px',
                  }}
                >
                  Documents pending
                </div>
                <div
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '12px',
                    color: '#5B6472',
                  }}
                >
                  Last updated {app.updatedAt}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popular services */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <TrendingUp size={20} style={{ color: '#1F3A5F' }} />
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#1B2430',
              }}
            >
              Popular services
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {popularServices.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  style={{
                    background: '#F2EFE7',
                    border: '1px solid #DAD5C9',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: service.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={24} style={{ color: '#FBFAF7' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#1B2430',
                        marginBottom: '4px',
                      }}
                    >
                      {service.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: '13px',
                        color: '#5B6472',
                      }}
                    >
                      {service.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
