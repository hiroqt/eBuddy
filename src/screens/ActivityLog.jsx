import React from 'react'
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'

const mockActivities = [
  {
    id: 1,
    document: 'Birth Certificate',
    agency: 'Department of Health',
    timestamp: '2024-07-20, 2:34 PM',
    status: 'verified',
  },
  {
    id: 2,
    document: 'SSS UMID',
    agency: 'Social Security System',
    timestamp: '2024-07-18, 10:15 AM',
    status: 'verified',
  },
  {
    id: 3,
    document: "Driver's License",
    agency: 'Land Transportation Office',
    timestamp: '2024-07-15, 4:22 PM',
    status: 'verified',
  },
  {
    id: 4,
    document: 'PhilHealth ID',
    agency: 'Philippine Health Insurance Corporation',
    timestamp: '2024-07-10, 9:03 AM',
    status: 'revoked',
  },
]

export default function ActivityLog({ onBack }) {
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
          Activity Log
        </h2>
      </div>

      {/* Activity list */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <p
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: '14px',
            color: '#5B6472',
            marginBottom: '20px',
          }}
        >
          Every share and verification is recorded here for transparency and audit.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              style={{
                background: '#F2EFE7',
                border: '1px solid #DAD5C9',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#FBFAF7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {activity.status === 'verified' && (
                    <CheckCircle size={20} style={{ color: '#9C7A34' }} />
                  )}
                  {activity.status === 'revoked' && (
                    <XCircle size={20} style={{ color: '#A8322D' }} />
                  )}
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
                    {activity.document}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: '14px',
                      color: '#5B6472',
                      marginBottom: '8px',
                    }}
                  >
                    {activity.agency}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '12px',
                      color: '#5B6472',
                    }}
                  >
                    {activity.timestamp}
                  </div>
                </div>

                <div
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: activity.status === 'verified' ? '#9C7A34' : '#A8322D',
                    color: '#FBFAF7',
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {activity.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
