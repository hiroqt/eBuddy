import React, { useState } from 'react'
import { ArrowLeft, Copy, Check, Share2 } from 'lucide-react'
import DrySealBadge from '../components/DrySealBadge'
import Button from '../components/Button'

export default function DocumentDetail({ document, onBack, onShare }) {
  const [copied, setCopied] = useState(false)

  if (!document) return null

  const copyHash = () => {
    navigator.clipboard.writeText(document.blockchainHash || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          Document Details
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Document header */}
        <div
          style={{
            background: '#F2EFE7',
            border: '1px solid #DAD5C9',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '22px',
                fontWeight: 600,
                color: '#1B2430',
              }}
            >
              {document.type}
            </h3>
            {document.status === 'verified' && <DrySealBadge size={48} />}
          </div>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: '#5B6472',
            }}
          >
            {document.agency}
          </p>
        </div>

        {/* Key-value details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          <DetailRow label="Document Number" value={document.documentNumber} mono />
          <DetailRow label="Date Issued" value={document.dateIssued} />
          <DetailRow
            label="Verification Status"
            value={document.status === 'verified' ? 'Verified on eGov Chain' : 'Pending verification'}
            statusColor={document.status === 'verified' ? '#9C7A34' : '#5B6472'}
          />
          {document.blockchainHash && (
            <div>
              <div
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#5B6472',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Blockchain Hash
              </div>
              <div
                style={{
                  background: '#F2EFE7',
                  border: '1px solid #DAD5C9',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px',
                    color: '#1B2430',
                    wordBreak: 'break-all',
                    flex: 1,
                  }}
                >
                  {document.blockchainHash}
                </div>
                <button
                  onClick={copyHash}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    flexShrink: 0,
                  }}
                >
                  {copied ? (
                    <Check size={18} style={{ color: '#9C7A34' }} />
                  ) : (
                    <Copy size={18} style={{ color: '#1B2430' }} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Verification history link */}
        {document.status === 'verified' && (
          <button
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: '16px',
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '15px',
              fontWeight: 600,
              color: '#1F3A5F',
              textAlign: 'center',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            View verification history
          </button>
        )}
      </div>

      {/* Fixed bottom action */}
      <div
        style={{
          padding: '20px 24px',
          borderTop: '1px solid #DAD5C9',
        }}
      >
        <Button
          fullWidth
          onClick={() => onShare(document)}
          icon={Share2}
          disabled={document.status !== 'verified'}
        >
          Share securely
        </Button>
      </div>
    </div>
  )
}

function DetailRow({ label, value, mono = false, statusColor = null }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: '13px',
          fontWeight: 600,
          color: '#5B6472',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: mono ? "'IBM Plex Mono', monospace" : "'Public Sans', sans-serif",
          fontSize: mono ? '14px' : '16px',
          color: statusColor || '#1B2430',
          fontWeight: statusColor ? 600 : 400,
        }}
      >
        {value}
      </div>
    </div>
  )
}
