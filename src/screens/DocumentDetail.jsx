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
    <div className="h-full flex flex-col bg-paper">
      {/* Header */}
      <div className="px-6 py-5 border-b border-hairline flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-[10px] bg-paper-dim border-none flex items-center justify-center cursor-pointer transition-all duration-150 hover:shadow-md"
        >
          <ArrowLeft size={20} className="text-ink" />
        </button>
        <h2 className="font-display text-xl font-semibold text-ink">
          Document Details
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Document header */}
        <div className="bg-paper-dim border border-hairline rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-[22px] font-semibold text-ink">
              {document.type}
            </h3>
            {document.status === 'verified' && <DrySealBadge size={48} />}
          </div>
          <p className="font-sans text-sm text-ink-soft">
            {document.agency}
          </p>
        </div>

        {/* Key-value details */}
        <div className="flex flex-col gap-5 mb-8">
          <DetailRow label="Document Number" value={document.documentNumber} mono />
          <DetailRow label="Date Issued" value={document.dateIssued} />
          <DetailRow
            label="Verification Status"
            value={document.status === 'verified' ? 'Verified on eGov Chain' : 'Pending verification'}
            statusColor={document.status === 'verified' ? 'text-bronze' : 'text-ink-soft'}
          />
          {document.blockchainHash && (
            <div>
              <div className="font-sans text-[13px] font-semibold text-ink-soft mb-2 uppercase tracking-wide">
                Blockchain Hash
              </div>
              <div className="bg-paper-dim border border-hairline rounded-[10px] px-4 py-3 flex items-center gap-3">
                <div className="font-mono text-[11px] text-ink break-all flex-1">
                  {document.blockchainHash}
                </div>
                <button
                  onClick={copyHash}
                  className="bg-transparent border-none cursor-pointer p-1 shrink-0"
                >
                  {copied ? (
                    <Check size={18} className="text-bronze" />
                  ) : (
                    <Copy size={18} className="text-ink" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Verification history link */}
        {document.status === 'verified' && (
          <button className="w-full bg-transparent border-none p-4 font-sans text-[15px] font-semibold text-seal-blue text-center cursor-pointer hover:underline">
            View verification history
          </button>
        )}
      </div>

      {/* Fixed bottom action */}
      <div className="px-6 py-5 border-t border-hairline">
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
      <div className="font-sans text-[13px] font-semibold text-ink-soft mb-1.5 uppercase tracking-wide">
        {label}
      </div>
      <div className={`${mono ? 'font-mono text-sm' : 'font-sans text-base'} ${statusColor || 'text-ink'} ${statusColor ? 'font-semibold' : ''}`}>
        {value}
      </div>
    </div>
  )
}
