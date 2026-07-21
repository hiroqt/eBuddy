import React, { useState } from 'react'
import { ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, X, Loader } from 'lucide-react'
import Button from '../components/Button'

const requiredDocuments = [
  {
    id: 'previousPermit',
    name: 'Previous Business Permit',
    description: 'Your most recent business permit',
    required: true,
    status: null,
  },
  {
    id: 'barangayClearance',
    name: 'Barangay Clearance',
    description: 'Valid barangay clearance for this year',
    required: true,
    status: null,
  },
  {
    id: 'leaseContract',
    name: 'Lease Contract',
    description: 'Required because you rent the business location',
    required: true,
    requiredWhen: 'premisesType === rented',
    status: null,
  },
  {
    id: 'bir2303',
    name: 'BIR Form 2303',
    description: 'Certificate of Registration',
    required: false,
    status: null,
  },
]

export default function DocumentAssistant({ applicationId, onComplete, onBack }) {
  const [documents, setDocuments] = useState(requiredDocuments)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = (docId, file) => {
    setUploading(true)
    // Simulate upload and AI review
    setTimeout(() => {
      setDocuments(
        documents.map((doc) =>
          doc.id === docId
            ? {
                ...doc,
                status: 'readable',
                fileName: file.name,
                uploadedAt: new Date().toISOString(),
              }
            : doc,
        ),
      )
      setUploading(false)
      setSelectedDoc(null)
    }, 2000)
  }

  const handleRemove = (docId) => {
    setDocuments(
      documents.map((doc) => (doc.id === docId ? { ...doc, status: null, fileName: null } : doc)),
    )
  }

  const allRequiredUploaded = documents
    .filter((d) => d.required)
    .every((d) => d.status === 'readable')

  const handleContinue = () => {
    onComplete({ documents: documents.filter((d) => d.status === 'readable') })
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
          Upload Documents
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Mascot helper */}
        <div className="bg-[#FEF7E6] border border-[#F5D485] rounded-2xl p-4 mb-6 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-bronze flex items-center justify-center shrink-0 font-display text-2xl font-bold text-paper">
            e
          </div>
          <div>
            <p className="font-sans text-sm text-ink leading-relaxed">
              I'll review each document to make sure it's readable. Take clear photos in good
              lighting and ensure all pages are included.
            </p>
          </div>
        </div>

        {/* Document checklist */}
        <div className="flex flex-col gap-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-paper-dim border border-hairline rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                {/* Status icon */}
                <div className="w-10 h-10 rounded-[10px] bg-paper flex items-center justify-center shrink-0">
                  {doc.status === 'readable' && (
                    <CheckCircle size={20} className="text-bronze" />
                  )}
                  {doc.status === 'unclear' && <AlertCircle size={20} className="text-dry-seal-red" />}
                  {!doc.status && <FileText size={20} className="text-ink-soft" />}
                </div>

                {/* Document info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-display text-base font-semibold text-ink">
                      {doc.name}
                    </div>
                    {doc.required && (
                      <div className="px-2 py-0.5 rounded bg-dry-seal-red text-paper font-sans text-[11px] font-semibold">
                        Required
                      </div>
                    )}
                  </div>
                  <div className={`font-sans text-[13px] text-ink-soft ${doc.status ? 'mb-2' : ''}`}>
                    {doc.description}
                  </div>

                  {doc.status === 'readable' && (
                    <div className="flex items-center justify-between px-3 py-2 bg-[#E8F4E8] border border-[#B8DCB8] rounded-lg">
                      <div className="font-sans text-[13px] text-ink">
                        {doc.fileName}
                      </div>
                      <button
                        onClick={() => handleRemove(doc.id)}
                        className="bg-transparent border-none cursor-pointer p-1"
                      >
                        <X size={16} className="text-ink-soft" />
                      </button>
                    </div>
                  )}

                  {doc.status === 'unclear' && (
                    <div className="px-3 py-2 bg-[#FEE8E6] border border-[#F5B8B8] rounded-lg font-sans text-[13px] text-dry-seal-red">
                      This document appears unclear. Please upload a clearer image.
                    </div>
                  )}

                  {!doc.status && (
                    <label className="inline-block mt-2">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            handleFileSelect(doc.id, file)
                          }
                        }}
                        className="hidden"
                      />
                      <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-seal-blue text-paper font-sans text-sm font-semibold cursor-pointer transition-all duration-150 hover:shadow-md">
                        <Upload size={16} />
                        Upload
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload progress */}
        {uploading && (
          <div className="mt-6 bg-paper-dim border border-hairline rounded-xl p-4 flex items-center gap-3">
            <Loader size={20} className="text-seal-blue animate-spin" />
            <div className="font-sans text-sm text-ink">
              Uploading and reviewing document...
            </div>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-6 py-5 border-t border-hairline">
        <Button fullWidth onClick={handleContinue} disabled={!allRequiredUploaded || uploading}>
          Continue to review
        </Button>
      </div>
    </div>
  )
}
