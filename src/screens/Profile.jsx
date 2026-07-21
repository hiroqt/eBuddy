import React, { useState } from 'react'
import { ArrowLeft, User, Lock, Bell, Clock, LogOut } from 'lucide-react'
import Button from '../components/Button'

export default function Profile({ onBack }) {
  const [faceLiveness, setFaceLiveness] = useState(true)
  const [shareNotifications, setShareNotifications] = useState(true)
  const [linkExpiry, setLinkExpiry] = useState('5')

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
          Profile & Security
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Identity summary */}
        <div
          style={{
            background: '#F2EFE7',
            border: '1px solid #DAD5C9',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#1F3A5F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <User size={32} style={{ color: '#FBFAF7' }} />
          </div>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '4px',
            }}
          >
            Juan Dela Cruz
          </h3>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '13px',
              color: '#5B6472',
            }}
          >
            eGovPH ID: EGPH-2024-012345
          </p>
        </div>

        {/* Security settings */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '16px',
            }}
          >
            Security Settings
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SettingRow
              icon={Lock}
              label="Face Liveness Lock"
              description="Require face verification for each sign in"
              value={faceLiveness}
              onChange={setFaceLiveness}
            />
            <SettingRow
              icon={Bell}
              label="Share Notifications"
              description="Get notified when documents are verified"
              value={shareNotifications}
              onChange={setShareNotifications}
            />
          </div>
        </div>

        {/* Link expiry */}
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
            Default Link Expiry
          </h3>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: '#5B6472',
              marginBottom: '16px',
              lineHeight: 1.6,
            }}
          >
            Set how long shared QR codes remain active before automatically expiring
          </p>

          <select
            value={linkExpiry}
            onChange={(e) => setLinkExpiry(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1px solid #DAD5C9',
              background: '#F2EFE7',
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '15px',
              color: '#1B2430',
              cursor: 'pointer',
            }}
          >
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        {/* Sign out */}
        <Button fullWidth variant="secondary" icon={LogOut}>
          Sign out
        </Button>
      </div>
    </div>
  )
}

function SettingRow({ icon: Icon, label, description, value, onChange }) {
  return (
    <div
      style={{
        background: '#F2EFE7',
        border: '1px solid #DAD5C9',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: '#FBFAF7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={20} style={{ color: '#1F3A5F' }} />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: '15px',
            fontWeight: 600,
            color: '#1B2430',
            marginBottom: '4px',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: '13px',
            color: '#5B6472',
          }}
        >
          {description}
        </div>
      </div>

      <label
        style={{
          position: 'relative',
          width: '48px',
          height: '28px',
          flexShrink: 0,
        }}
      >
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
        <span
          style={{
            position: 'absolute',
            cursor: 'pointer',
            inset: 0,
            background: value ? '#1F3A5F' : '#DAD5C9',
            borderRadius: '14px',
            transition: 'all 0.15s ease',
          }}
        >
          <span
            style={{
              position: 'absolute',
              height: '20px',
              width: '20px',
              left: value ? '24px' : '4px',
              top: '4px',
              background: '#FBFAF7',
              borderRadius: '50%',
              transition: 'all 0.15s ease',
            }}
          />
        </span>
      </label>
    </div>
  )
}
