import React, { useState } from 'react'
import { ArrowLeft, CheckCircle, AlertCircle, Edit2, FileText } from 'lucide-react'
import Button from '../components/Button'

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
          Review & Confirm
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Service summary */}
        <div
          style={{
            background: '#E8F4F8',
            border: '1px solid #B8DCE8',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '8px',
            }}
          >
            {mockData.service.name}
          </h3>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: '#5B6472',
            }}
          >
            {mockData.service.agency}
          </p>
        </div>

        {/* Personal information */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#1B2430',
              }}
            >
              Personal Information
            </h3>
            <button
              onClick={() => onEdit('personal-info')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'none',
                border: '1px solid #DAD5C9',
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#1F3A5F',
                cursor: 'pointer',
              }}
            >
              <Edit2 size={14} />
              Edit
            </button>
          </div>
          <div
            style={{
              background: '#F2EFE7',
              border: '1px solid #DAD5C9',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <DetailRow label="Full Name" value={mockData.personalInfo.fullName} />
            <DetailRow label="Business Name" value={mockData.personalInfo.businessName} />
            <DetailRow label="Business Address" value={mockData.personalInfo.businessAddress} />
            <DetailRow label="Contact Number" value={mockData.personalInfo.contactNumber} />
          </div>
        </div>

        {/* Answers summary */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#1B2430',
              }}
            >
              Your Answers
            </h3>
            <button
              onClick={() => onEdit('questions')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'none',
                border: '1px solid #DAD5C9',
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#1F3A5F',
                cursor: 'pointer',
              }}
            >
              <Edit2 size={14} />
              Edit
            </button>
          </div>
          <div
            style={{
              background: '#F2EFE7',
              border: '1px solid #DAD5C9',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
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
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#1B2430',
              }}
            >
              Uploaded Documents
            </h3>
            <button
              onClick={() => onEdit('documents')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'none',
                border: '1px solid #DAD5C9',
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#1F3A5F',
                cursor: 'pointer',
              }}
            >
              <Edit2 size={14} />
              Edit
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mockData.documents.map((doc, index) => (
              <div
                key={index}
                style={{
                  background: '#F2EFE7',
                  border: '1px solid #DAD5C9',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <FileText size={20} style={{ color: '#1F3A5F', flexShrink: 0 }} />
                <div
                  style={{
                    flex: 1,
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '14px',
                    color: '#1B2430',
                  }}
                >
                  {doc.name}
                </div>
                <CheckCircle size={18} style={{ color: '#9C7A34', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Fee estimate */}
        <div
          style={{
            background: '#FEF7E6',
            border: '1px solid #F5D485',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '13px',
                  color: '#5B6472',
                  marginBottom: '4px',
                }}
              >
                Estimated total fee
              </div>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#1B2430',
                }}
              >
                ₱{mockData.estimatedFee.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Consent */}
        <div
          style={{
            background: '#F2EFE7',
            border: '1px solid #DAD5C9',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <AlertCircle size={20} style={{ color: '#1F3A5F', flexShrink: 0 }} />
            <div
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                color: '#1B2430',
              }}
            >
              Ready to submit
            </div>
          </div>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: '#5B6472',
              lineHeight: 1.6,
              marginBottom: '16px',
            }}
          >
            I will send your completed {mockData.service.name} application and {mockData.documents.length} attached
            documents to the {mockData.service.agency}.
          </p>
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '14px',
              color: '#5B6472',
              lineHeight: 1.6,
              marginBottom: '16px',
            }}
          >
            Payment of ₱{mockData.estimatedFee.toLocaleString()} will be processed in the next step.
          </p>

          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                marginTop: '2px',
                cursor: 'pointer',
                accentColor: '#1F3A5F',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                color: '#1B2430',
                lineHeight: 1.6,
              }}
            >
              I confirm that the information above is accurate and I authorize the submission of this
              application with my attached documents to the {mockData.service.agency}.
            </span>
          </label>
        </div>
      </div>

      {/* Bottom action */}
      <div
        style={{
          padding: '20px 24px',
          borderTop: '1px solid #DAD5C9',
        }}
      >
        <Button fullWidth onClick={handleConfirm} disabled={!consentGiven}>
          Confirm and continue to payment
        </Button>
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: '12px',
          fontWeight: 600,
          color: '#5B6472',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: '15px',
          color: '#1B2430',
        }}
      >
        {value}
      </div>
    </div>
  )
}
