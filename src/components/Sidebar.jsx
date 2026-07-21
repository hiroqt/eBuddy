import React, { useState } from 'react'
import {
  Menu,
  X,
  Home,
  LogIn,
  Camera,
  Wallet,
  FileText,
  MessageSquare,
  ClipboardList,
  Upload,
  CheckSquare,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Share2,
  Activity,
} from 'lucide-react'

const navigationGroups = [
  {
    title: 'Authentication',
    items: [
      { id: 'signin', label: 'Sign In', icon: LogIn },
      { id: 'face-liveness', label: 'Face Liveness', icon: Camera },
    ],
  },
  {
    title: 'Service Flow',
    items: [
      { id: 'service-hub', label: 'Service Hub', icon: Home },
      { id: 'ai-task-planner', label: 'AI Task Planner', icon: ClipboardList },
      { id: 'guided-questions', label: 'Guided Questions', icon: MessageSquare },
      { id: 'document-assistant', label: 'Document Assistant', icon: Upload },
      { id: 'application-review', label: 'Application Review', icon: CheckSquare },
      { id: 'payment', label: 'Payment', icon: CreditCard },
      { id: 'submission-confirmation', label: 'Submission', icon: CheckCircle },
      { id: 'tracking-timeline', label: 'Tracking Timeline', icon: Clock },
      { id: 'report-concern', label: 'Report Concern', icon: AlertTriangle },
    ],
  },
  {
    title: 'Wallet & Documents',
    items: [
      { id: 'wallet', label: 'Wallet', icon: Wallet },
      { id: 'document-detail', label: 'Document Detail', icon: FileText },
      { id: 'share-verify', label: 'Share & Verify', icon: Share2 },
    ],
  },
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'activity-log', label: 'Activity Log', icon: Activity },
    ],
  },
]

export default function Sidebar({ currentScreen, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigate = (screenId) => {
    onNavigate(screenId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Toggle Button - Absolute position inside PWA */}
      <button
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          top: '20px',
          left: isOpen ? '280px' : '20px',
          zIndex: 1002,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#1F3A5F',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'left 0.3s ease',
        }}
      >
        {isOpen ? (
          <X size={20} style={{ color: '#FBFAF7' }} />
        ) : (
          <Menu size={20} style={{ color: '#FBFAF7' }} />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: 'absolute',
          left: isOpen ? '0' : '-280px',
          top: 0,
          bottom: 0,
          width: '280px',
          background: '#1B2430',
          zIndex: 1001,
          transition: 'left 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isOpen ? '4px 0 12px rgba(0, 0, 0, 0.2)' : 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 16px',
            borderBottom: '1px solid rgba(251, 250, 247, 0.1)',
          }}
        >
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#FBFAF7',
              marginBottom: '4px',
            }}
          >
            DocuPH
          </h2>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '12px',
              color: 'rgba(251, 250, 247, 0.6)',
            }}
          >
            eGov Service Agent
          </p>
        </div>

        {/* Navigation */}
        <div
          className="no-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 0',
          }}
        >
          {navigationGroups.map((group, groupIndex) => (
            <div key={groupIndex} style={{ marginBottom: '20px' }}>
              <div
                style={{
                  padding: '0 16px 6px',
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'rgba(251, 250, 247, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = currentScreen === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: isActive ? 'rgba(251, 250, 247, 0.1)' : 'transparent',
                      border: 'none',
                      borderLeft: isActive ? '3px solid #9C7A34' : '3px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(251, 250, 247, 0.05)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: isActive ? '#9C7A34' : 'rgba(251, 250, 247, 0.6)',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: '13px',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#FBFAF7' : 'rgba(251, 250, 247, 0.8)',
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(251, 250, 247, 0.1)',
          }}
        >
          <div
            style={{
              padding: '10px',
              background: 'rgba(156, 122, 52, 0.1)',
              border: '1px solid rgba(156, 122, 52, 0.2)',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                color: '#9C7A34',
                marginBottom: '3px',
              }}
            >
              Demo Mode
            </div>
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '10px',
                color: 'rgba(251, 250, 247, 0.6)',
                lineHeight: 1.4,
              }}
            >
              Screen navigation helper
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
