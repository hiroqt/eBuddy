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
          Upload Documents
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Mascot helper */}
        <div
          style={{
            background: '#FEF7E6',
            border: '1px solid #F5D485',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#9C7A34',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontFamily: "'Fraunces', serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#FBFAF7',
            }}
          >
            e
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                color: '#1B2430',
                lineHeight: 1.6,
              }}
            >
              I'll review each document to make sure it's readable. Take clear photos in good
              lighting and ensure all pages are included.
            </p>
          </div>
        </div>

        {/* Document checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {documents.map((doc) => (
            <div
              key={doc.id}
              style={{
                background: '#F2EFE7',
                border: '1px solid #DAD5C9',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {/* Status icon */}
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
                  {doc.status === 'readable' && (
                    <CheckCircle size={20} style={{ color: '#9C7A34' }} />
                  )}
                  {doc.status === 'unclear' && <AlertCircle size={20} style={{ color: '#A8322D' }} />}
                  {!doc.status && <FileText size={20} style={{ color: '#5B6472' }} />}
                </div>

                {/* Document info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#1B2430',
                      }}
                    >
                      {doc.name}
                    </div>
                    {doc.required && (
                      <div
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: '#A8322D',
                          color: '#FBFAF7',
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        Required
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontSize: '13px',
                      color: '#5B6472',
                      marginBottom: doc.status ? '8px' : 0,
                    }}
                  >
                    {doc.description}
                  </div>

                  {doc.status === 'readable' && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: '#E8F4E8',
                        border: '1px solid #B8DCB8',
                        borderRadius: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: '13px',
                          color: '#1B2430',
                        }}
                      >
                        {doc.fileName}
                      </div>
                      <button
                        onClick={() => handleRemove(doc.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                      >
                        <X size={16} style={{ color: '#5B6472' }} />
                      </button>
                    </div>
                  )}

                  {doc.status === 'unclear' && (
                    <div
                      style={{
                        padding: '8px 12px',
                        background: '#FEE8E6',
                        border: '1px solid #F5B8B8',
                        borderRadius: '8px',
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: '13px',
                        color: '#A8322D',
                      }}
                    >
                      This document appears unclear. Please upload a clearer image.
                    </div>
                  )}

                  {!doc.status && (
                    <label
                      style={{
                        display: 'inline-block',
                        marginTop: '8px',
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            handleFileSelect(doc.id, file)
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          background: '#1F3A5F',
                          color: '#FBFAF7',
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
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
          <div
            style={{
              marginTop: '24px',
              background: '#E8F4F8',
              border: '1px solid #B8DCE8',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Loader size={20} style={{ color: '#1F3A5F', animation: 'spin 1s linear infinite' }} />
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                color: '#1B2430',
              }}
            >
              Uploading and reviewing document...
            </div>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div
        style={{
          padding: '20px 24px',
          borderTop: '1px solid #DAD5C9',
        }}
      >
        <Button fullWidth onClick={handleContinue} disabled={!allRequiredUploaded || uploading}>
          Continue to review
        </Button>
      </div>
    </div>
  )
}
