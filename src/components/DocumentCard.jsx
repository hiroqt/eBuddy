import React from 'react'
import {
  FileText,
  CreditCard,
  Heart,
  Car,
  Vote,
  Receipt,
  Clock,
  AlertCircle,
} from 'lucide-react'
import DrySealBadge from './DrySealBadge'

const iconMap = {
  'Birth Certificate': FileText,
  'SSS UMID': CreditCard,
  'PhilHealth ID': Heart,
  "Driver's License": Car,
  "Voter's Certification": Vote,
  'TIN ID': Receipt,
}

export default function DocumentCard({ document, onClick }) {
  const Icon = iconMap[document.type] || FileText
  const isExpiring = document.daysUntilExpiry && document.daysUntilExpiry <= 30
  const isPending = document.status === 'pending'

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        background: '#F2EFE7',
        border: '1px solid #DAD5C9',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        textAlign: 'left',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(27, 36, 48, 0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: '#FBFAF7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={24} strokeWidth={2} style={{ color: '#1F3A5F' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '16px',
            fontWeight: 600,
            color: '#1B2430',
            marginBottom: '4px',
          }}
        >
          {document.type}
        </div>
        <div
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: '13px',
            color: '#5B6472',
          }}
        >
          {document.agency}
        </div>
        {isExpiring && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '6px',
              color: '#A8322D',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            <Clock size={12} />
            Expires in {document.daysUntilExpiry} days
          </div>
        )}
      </div>

      {!isPending && <DrySealBadge size={40} />}
      {isPending && (
        <div
          style={{
            padding: '8px 12px',
            background: '#FBFAF7',
            borderRadius: '8px',
            fontFamily: "'Public Sans', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            color: '#5B6472',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <AlertCircle size={14} />
          Pending
        </div>
      )}
    </button>
  )
}
