import React, { useState } from 'react'
import { ArrowLeft, AlertTriangle, CheckCircle, Loader } from 'lucide-react'
import Button from '../components/Button'

const concernCategories = [
  { value: 'delayed', label: 'Processing is delayed' },
  { value: 'missing-docs', label: 'Documents not acknowledged' },
  { value: 'incorrect-info', label: 'Incorrect information in application' },
  { value: 'payment-issue', label: 'Payment not reflected' },
  { value: 'no-response', label: 'No response from agency' },
  { value: 'other', label: 'Other concern' },
]

export default function ReportConcern({ applicationData, onSubmitted, onBack }) {
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reportCaseNumber, setReportCaseNumber] = useState('')

  const mockData = applicationData || {
    referenceNumber: 'BPR-2024-07-012345',
    service: 'Business Permit Renewal',
    agency: 'Demo City Business Permits Office',
    submittedDate: '2024-07-22',
  }

  const handleSubmit = () => {
    setSubmitting(true)
    // Simulate eReport submission
    setTimeout(() => {
      const caseNumber = 'ERPT-' + Date.now().toString().substring(-6)
      setReportCaseNumber(caseNumber)
      setSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  const canSubmit = category && description.trim().length >= 20 && (contactEmail || contactPhone)

  if (submitted) {
    return (
      <div className="h-full flex flex-col bg-paper">
        {/* Header */}
        <div className="px-6 py-5 border-b border-hairline">
          <h2 className="font-display text-xl font-semibold text-ink">
            Concern Filed
          </h2>
        </div>

        {/* Success content */}
        <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#E8F4E8] flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-bronze" />
          </div>

          <h3 className="font-display text-2xl font-semibold text-ink mb-3 text-center">
            Report submitted
          </h3>

          <p className="font-sans text-[15px] text-ink-soft text-center mb-8 leading-relaxed">
            Your concern has been filed through eReport and will be reviewed by the appropriate
            office.
          </p>

          <div className="w-full bg-[#E8F4F8] border border-[#B8DCE8] rounded-xl p-5 mb-6">
            <div className="font-sans text-xs font-semibold text-ink-soft mb-2 uppercase tracking-wide">
              Report Case Number
            </div>
            <div className="font-mono text-xl font-bold text-seal-blue mb-3">
              {reportCaseNumber}
            </div>
            <div className="font-sans text-[13px] text-ink-soft leading-relaxed">
              Use this case number to track your report. You'll receive updates through eMessage.
            </div>
          </div>

          <div className="w-full bg-[#FEF7E6] border border-[#F5D485] rounded-xl p-4 flex gap-3">
            <div className="w-10 h-10 rounded-full bg-bronze flex items-center justify-center shrink-0 font-display text-2xl font-bold text-paper">
              e
            </div>
            <div>
              <p className="font-sans text-sm text-ink leading-relaxed">
                The concerned office will review your report and respond within 3-5 business days.
                You'll receive notifications through eMessage.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom action */}
        <div className="px-6 py-5 border-t border-hairline">
          <Button fullWidth onClick={() => onSubmitted(reportCaseNumber)}>
            Done
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-paper">
      {/* Header */}
      <div className="px-6 py-5 border-b border-hairline flex items-center gap-3">
        <button
          onClick={onBack}
          disabled={submitting}
          className="w-10 h-10 rounded-[10px] bg-paper-dim border-none flex items-center justify-center cursor-pointer transition-all duration-150 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          <ArrowLeft size={20} className="text-ink" />
        </button>
        <h2 className="font-display text-xl font-semibold text-ink">
          File a Concern
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Application reference */}
        <div className="bg-[#E8F4F8] border border-[#B8DCE8] rounded-xl p-4 mb-6">
          <div className="font-sans text-xs font-semibold text-ink-soft mb-1.5 uppercase tracking-wide">
            Related Application
          </div>
          <div className="font-mono text-sm font-bold text-seal-blue mb-2">
            {mockData.referenceNumber}
          </div>
          <div className="font-sans text-sm text-ink">
            {mockData.service}
          </div>
          <div className="font-sans text-[13px] text-ink-soft">
            {mockData.agency}
          </div>
        </div>

        {/* Mascot message */}
        <div className="bg-[#FEF7E6] border border-[#F5D485] rounded-2xl p-4 mb-6 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-bronze flex items-center justify-center shrink-0 font-display text-2xl font-bold text-paper">
            e
          </div>
          <div>
            <p className="font-sans text-sm text-ink leading-relaxed">
              I'll prepare your concern report and submit it through eReport. The agency will be
              notified and you'll receive updates on your case.
            </p>
          </div>
        </div>

        {/* Category selection */}
        <div className="mb-6">
          <label className="block font-display text-base font-semibold text-ink mb-3">
            What is your concern about?
          </label>
          <div className="flex flex-col gap-2">
            {concernCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                disabled={submitting}
                className={`p-3.5 rounded-xl border-2 text-left font-sans text-[15px] text-ink transition-all duration-150 ${
                  submitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'
                } ${
                  category === cat.value
                    ? 'border-seal-blue bg-paper-dim'
                    : 'border-hairline bg-paper'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-display text-base font-semibold text-ink mb-3">
            Please describe your concern
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide as much detail as possible..."
            disabled={submitting}
            className={`w-full min-h-[120px] p-3.5 rounded-xl border-2 border-hairline bg-paper font-sans text-[15px] text-ink resize-y outline-none focus:border-seal-blue transition-colors duration-150 placeholder:text-ink-soft/60 ${
              submitting ? 'opacity-60' : ''
            }`}
          />
          <div className={`font-sans text-[13px] mt-1.5 ${description.length < 20 ? 'text-dry-seal-red' : 'text-ink-soft'}`}>
            {description.length} / 20 characters minimum
          </div>
        </div>

        {/* Contact information */}
        <div className="mb-6">
          <h3 className="font-display text-base font-semibold text-ink mb-3">
            Contact information for follow-up
          </h3>

          <div className="flex flex-col gap-3">
            <div>
              <label className="block font-sans text-[13px] font-semibold text-ink-soft mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="your.email@example.com"
                disabled={submitting}
                className={`w-full p-3.5 rounded-xl border-2 border-hairline bg-paper font-sans text-[15px] text-ink outline-none focus:border-seal-blue transition-colors duration-150 placeholder:text-ink-soft/60 ${
                  submitting ? 'opacity-60' : ''
                }`}
              />
            </div>

            <div>
              <label className="block font-sans text-[13px] font-semibold text-ink-soft mb-1.5">
                Mobile number
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+63 912 345 6789"
                disabled={submitting}
                className={`w-full p-3.5 rounded-xl border-2 border-hairline bg-paper font-sans text-[15px] text-ink outline-none focus:border-seal-blue transition-colors duration-150 placeholder:text-ink-soft/60 ${
                  submitting ? 'opacity-60' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Processing state */}
        {submitting && (
          <div className="bg-[#E8F4F8] border border-[#B8DCE8] rounded-xl p-4 flex items-center gap-3">
            <Loader size={20} className="text-seal-blue animate-spin" />
            <div className="font-sans text-sm text-ink">
              Submitting your concern through eReport...
            </div>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-6 py-5 border-t border-hairline">
        <Button
          fullWidth
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          icon={submitting ? Loader : AlertTriangle}
        >
          {submitting ? 'Submitting...' : 'Submit concern'}
        </Button>
      </div>
    </div>
  )
}
