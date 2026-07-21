import React from 'react'
import { ArrowLeft, CheckCircle, Circle, Clock, AlertCircle, FileText, MessageSquare } from 'lucide-react'
import Button from '../components/Button'

const timelineEvents = [
  {
    id: 1,
    status: 'completed',
    title: 'Application submitted',
    description: 'Your application was received by the agency',
    timestamp: '2024-07-22, 10:15 AM',
  },
  {
    id: 2,
    status: 'completed',
    title: 'Payment confirmed',
    description: '₱1,300 payment processed successfully',
    timestamp: '2024-07-22, 10:14 AM',
  },
  {
    id: 3,
    status: 'completed',
    title: 'Documents verified',
    description: 'All required documents have been validated',
    timestamp: '2024-07-22, 10:12 AM',
  },
  {
    id: 4,
    status: 'current',
    title: 'Under review',
    description: 'Agency is reviewing your application',
    timestamp: 'In progress',
  },
  {
    id: 5,
    status: 'pending',
    title: 'Approval decision',
    description: 'Final approval or additional requirements',
    timestamp: 'Pending',
  },
  {
    id: 6,
    status: 'pending',
    title: 'Ready for release',
    description: 'Your permit will be ready for download',
    timestamp: 'Pending',
  },
]

export default function TrackingTimeline({ applicationId, onFileConcern, onBack }) {
  const mockData = {
    referenceNumber: 'BPR-2024-07-012345',
    service: 'Business Permit Renewal',
    agency: 'Demo City Business Permits Office',
    currentStatus: 'Under Review',
    submittedDate: '2024-07-22',
    estimatedCompletionDate: '2024-07-29',
    daysRemaining: 7,
  }

  const currentEvent = timelineEvents.find((e) => e.status === 'current')

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
          Track Application
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Application summary */}
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
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '14px',
              fontWeight: 700,
              color: '#1F3A5F',
              marginBottom: '12px',
            }}
          >
            {mockData.referenceNumber}
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
            {mockData.service}
          </h3>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: '#5B6472',
              marginBottom: '16px',
            }}
          >
            {mockData.agency}
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#1F3A5F',
              color: '#FBFAF7',
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <Clock size={16} />
            {mockData.currentStatus}
          </div>
        </div>

        {/* Estimated completion */}
        <div
          style={{
            background: '#FEF7E6',
            border: '1px solid #F5D485',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Clock size={20} style={{ color: '#9C7A34', flexShrink: 0 }} />
          <div>
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: '#1B2430',
                marginBottom: '4px',
              }}
            >
              Expected completion
            </div>
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '13px',
                color: '#5B6472',
              }}
            >
              {new Date(mockData.estimatedCompletionDate).toLocaleDateString('en-PH', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              ({mockData.daysRemaining} days remaining)
            </div>
          </div>
        </div>

        {/* Timeline */}
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
            Application Timeline
          </h3>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: '19px',
                top: '20px',
                bottom: '20px',
                width: '2px',
                background: '#DAD5C9',
              }}
            />

            {/* Timeline events */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {timelineEvents.map((event, index) => (
                <div key={event.id} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  {/* Status icon */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background:
                        event.status === 'completed'
                          ? '#E8F4E8'
                          : event.status === 'current'
                            ? '#E8F4F8'
                            : '#F2EFE7',
                      border: `2px solid ${
                        event.status === 'completed'
                          ? '#9C7A34'
                          : event.status === 'current'
                            ? '#1F3A5F'
                            : '#DAD5C9'
                      }`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  >
                    {event.status === 'completed' && (
                      <CheckCircle size={20} style={{ color: '#9C7A34' }} />
                    )}
                    {event.status === 'current' && (
                      <Circle size={16} style={{ color: '#1F3A5F' }} fill="#1F3A5F" />
                    )}
                    {event.status === 'pending' && <Circle size={16} style={{ color: '#DAD5C9' }} />}
                  </div>

                  {/* Event details */}
                  <div style={{ flex: 1, paddingBottom: '8px' }}>
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: '16px',
                        fontWeight: 600,
                        color:
                          event.status === 'pending' ? '#5B6472' : '#1B2430',
                        marginBottom: '4px',
                      }}
                    >
                      {event.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: '14px',
                        color: '#5B6472',
                        marginBottom: '6px',
                        lineHeight: 1.5,
                      }}
                    >
                      {event.description}
                    </div>
                    <div
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '12px',
                        color: '#5B6472',
                      }}
                    >
                      {event.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional info notice */}
        <div
          style={{
            background: '#F2EFE7',
            border: '1px solid #DAD5C9',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <FileText size={20} style={{ color: '#1F3A5F', flexShrink: 0, marginTop: '2px' }} />
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
                Updates via eMessage
              </div>
              <div
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '13px',
                  color: '#5B6472',
                  lineHeight: 1.6,
                }}
              >
                You'll receive notifications through SMS and email when the agency updates your
                application status or requests additional documents.
              </div>
            </div>
          </div>
        </div>

        {/* File concern option */}
        <div
          style={{
            background: '#FEF7E6',
            border: '1px solid #F5D485',
            borderRadius: '12px',
            padding: '16px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <AlertCircle size={20} style={{ color: '#9C7A34', flexShrink: 0, marginTop: '2px' }} />
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
                Something not right?
              </div>
              <div
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '13px',
                  color: '#5B6472',
                  lineHeight: 1.6,
                }}
              >
                If your application is delayed or you notice an issue, you can file a concern
                through eReport.
              </div>
            </div>
          </div>
          <Button fullWidth variant="secondary" onClick={onFileConcern} icon={MessageSquare}>
            File a concern
          </Button>
        </div>
      </div>
    </div>
  )
}
