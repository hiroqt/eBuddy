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
    <div className="h-full flex flex-col bg-paper">
      {/* Header */}
      <div className="px-6 py-5 border-b border-hairline">
        <h2 className="font-display text-xl font-semibold text-ink">
          Application Submitted
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Success icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-tint flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-bronze" />
          </div>

          <h3 className="font-display text-2xl font-semibold text-ink mb-3">
            Successfully submitted!
          </h3>

          <p className="font-sans text-[15px] text-ink-soft leading-relaxed max-w-[320px]">
            Your {mockData.service.name} application has been submitted to the {mockData.agency}.
          </p>
        </div>

        {/* Reference number */}
        <div className="bg-sky-tint border border-sky-line rounded-2xl p-5 mb-6">
          <div className="font-sans text-xs font-semibold text-ink-soft mb-2 uppercase tracking-wide">
            Reference Number
          </div>
          <div className="font-mono text-xl font-bold text-seal-blue mb-4">
            {mockData.referenceNumber}
          </div>
          <div className="font-sans text-[13px] text-ink-soft">
            Use this reference number to track your application or when contacting the agency.
          </div>
        </div>

        {/* Submission details */}
        <div className="bg-paper-dim border border-hairline rounded-xl p-4 mb-6">
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
        <div className="bg-paper-dim border border-hairline rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <DrySealBadge size={32} />
            <div className="font-display text-base font-semibold text-ink">
              Secured on eGov Chain
            </div>
          </div>
          <p className="font-sans text-[13px] text-ink-soft leading-relaxed mb-3">
            Your application submission has been anchored on the blockchain for tamper-proof
            verification.
          </p>
          <div className="p-3 bg-paper rounded-lg break-all">
            <div className="font-mono text-[11px] text-ink-soft">
              {mockData.blockchainHash}
            </div>
          </div>
        </div>

        {/* Mascot message */}
        <div className="bg-amber-tint border border-amber-line rounded-2xl p-4 mb-6 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-bronze flex items-center justify-center shrink-0 font-display text-2xl font-bold text-paper">
            e
          </div>
          <div>
            <p className="font-sans text-sm text-ink leading-relaxed">
              Great work! I'll notify you through eMessage when there are updates. You can track
              your application status anytime from your dashboard.
            </p>
          </div>
        </div>

        {/* What's next */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold text-ink mb-3">
            What happens next?
          </h3>
          <div className="flex flex-col gap-3">
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
      <div className="px-6 py-5 border-t border-hairline flex flex-col gap-3">
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
    <div className="mb-3 last:mb-0">
      <div className="font-sans text-xs font-semibold text-ink-soft mb-1 uppercase tracking-wide">
        {label}
      </div>
      <div className={`${mono ? 'font-mono text-sm' : 'font-sans text-[15px]'} text-ink`}>
        {value}
      </div>
    </div>
  )
}

function StepItem({ number, text }) {
  return (
    <div className="flex gap-3">
      <div className="w-7 h-7 rounded-full bg-seal-blue flex items-center justify-center shrink-0 font-sans text-sm font-bold text-paper">
        {number}
      </div>
      <div className="font-sans text-sm text-ink leading-[28px]">
        {text}
      </div>
    </div>
  )
}
