import React, { useState } from 'react'
import { CheckCircle, AlertCircle, Edit2, FileText } from 'lucide-react'
import Button from '../components/Button'
import ScreenHeader from '../components/ScreenHeader'

export default function ApplicationReview({ applicationData, onConfirm, onEdit, onBack }) {
  const [consentGiven, setConsentGiven] = useState(false)

  const mockData = applicationData || {
    service: {
      name: 'Business Permit Renewal',
      agency: 'Demo City Business Permits Office',
      jurisdiction: 'Demo City',
    },
    personalInfo: {
      fullName: 'Juan Dela Cruz',
      businessName: 'Juan\'s Sari-Sari Store',
      businessAddress: '123 Sampaguita St., Brgy. San Roque, Demo City',
      contactNumber: '+63 912 345 6789',
    },
    answers: {
      businessNameChanged: false,
      premisesType: 'rented',
      numberOfEmployees: 3,
    },
    documents: [
      { name: 'Previous Business Permit', status: 'verified' },
      { name: 'Barangay Clearance', status: 'verified' },
      { name: 'Lease Contract', status: 'verified' },
    ],
    estimatedFee: 1300,
  }

  const handleConfirm = () => {
    if (consentGiven) {
      onConfirm(mockData)
    }
  }

  return (
    <div className="h-full flex flex-col bg-paper">
      <ScreenHeader title="Review & Confirm" onBack={onBack} />

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Service summary */}
        <div className="bg-sky-tint border border-sky-line rounded-2xl p-5 mb-6">
          <h3 className="font-display text-lg font-semibold text-ink mb-2">
            {mockData.service.name}
          </h3>
          <p className="font-sans text-sm text-ink-soft">
            {mockData.service.agency}
          </p>
        </div>

        {/* Personal information */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display text-lg font-semibold text-ink">
              Personal Information
            </h3>
            <button
              onClick={() => onEdit('personal-info')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent border border-hairline font-sans text-[13px] font-semibold text-seal-blue cursor-pointer transition-colors duration-150 hover:bg-paper-dim"
            >
              <Edit2 size={14} />
              Edit
            </button>
          </div>
          <div className="bg-paper-dim border border-hairline rounded-xl p-4">
            <DetailRow label="Full Name" value={mockData.personalInfo.fullName} />
            <DetailRow label="Business Name" value={mockData.personalInfo.businessName} />
            <DetailRow label="Business Address" value={mockData.personalInfo.businessAddress} />
            <DetailRow label="Contact Number" value={mockData.personalInfo.contactNumber} />
          </div>
        </div>

        {/* Answers summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display text-lg font-semibold text-ink">
              Your Answers
            </h3>
            <button
              onClick={() => onEdit('questions')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent border border-hairline font-sans text-[13px] font-semibold text-seal-blue cursor-pointer transition-colors duration-150 hover:bg-paper-dim"
            >
              <Edit2 size={14} />
              Edit
            </button>
          </div>
          <div className="bg-paper-dim border border-hairline rounded-xl p-4">
            <DetailRow
              label="Business name changed?"
              value={mockData.answers.businessNameChanged ? 'Yes' : 'No'}
            />
            <DetailRow
              label="Property type"
              value={mockData.answers.premisesType === 'owned' ? 'I own the property' : 'I rent the property'}
            />
            <DetailRow label="Number of employees" value={mockData.answers.numberOfEmployees} />
          </div>
        </div>

        {/* Documents */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display text-lg font-semibold text-ink">
              Uploaded Documents
            </h3>
            <button
              onClick={() => onEdit('documents')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent border border-hairline font-sans text-[13px] font-semibold text-seal-blue cursor-pointer transition-colors duration-150 hover:bg-paper-dim"
            >
              <Edit2 size={14} />
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {mockData.documents.map((doc, index) => (
              <div
                key={index}
                className="bg-paper-dim border border-hairline rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <FileText size={20} className="text-seal-blue shrink-0" />
                <div className="flex-1 font-sans text-sm text-ink">
                  {doc.name}
                </div>
                <CheckCircle size={18} className="text-bronze shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Fee estimate */}
        <div className="bg-amber-tint border border-amber-line rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-sans text-[13px] text-ink-soft mb-1">
                Estimated total fee
              </div>
              <div className="font-display text-[28px] font-bold text-ink">
                ₱{mockData.estimatedFee.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Consent */}
        <div className="bg-paper-dim border border-hairline rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle size={20} className="text-seal-blue shrink-0" />
            <div className="font-sans text-[15px] font-semibold text-ink">
              Ready to submit
            </div>
          </div>
          <p className="font-sans text-sm text-ink-soft leading-relaxed mb-4">
            I will send your completed {mockData.service.name} application and {mockData.documents.length} attached
            documents to the {mockData.service.agency}.
          </p>
          <p className="font-sans text-sm text-ink-soft leading-relaxed mb-4">
            Payment of ₱{mockData.estimatedFee.toLocaleString()} will be processed in the next step.
          </p>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="w-5 h-5 mt-0.5 cursor-pointer accent-seal-blue shrink-0"
            />
            <span className="font-sans text-sm text-ink leading-relaxed">
              I confirm that the information above is accurate and I authorize the submission of this
              application with my attached documents to the {mockData.service.agency}.
            </span>
          </label>
        </div>
      </div>

      {/* Bottom action */}
      <div className="px-6 py-5 border-t border-hairline">
        <Button fullWidth onClick={handleConfirm} disabled={!consentGiven}>
          Confirm and continue to payment
        </Button>
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="font-sans text-xs font-semibold text-ink-soft mb-1 uppercase tracking-wide">
        {label}
      </div>
      <div className="font-sans text-[15px] text-ink">
        {value}
      </div>
    </div>
  )
}
