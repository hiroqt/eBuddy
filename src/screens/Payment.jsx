import React, { useState } from 'react'
import { ArrowLeft, CreditCard, Smartphone, Building, CheckCircle, Loader } from 'lucide-react'
import Button from '../components/Button'

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, JCB',
  },
  {
    id: 'gcash',
    name: 'GCash',
    icon: Smartphone,
    description: 'Pay using your GCash wallet',
  },
  {
    id: 'bank',
    name: 'Online Banking',
    icon: Building,
    description: 'BDO, BPI, UnionBank, and more',
  },
]

export default function Payment({ applicationData, onSuccess, onBack }) {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const mockData = applicationData || {
    service: { name: 'Business Permit Renewal' },
    applicationId: 'app_123',
    totalFee: 1300,
    breakdown: [
      { item: 'Business permit fee', amount: 1000 },
      { item: 'Barangay clearance fee', amount: 200 },
      { item: 'Processing fee', amount: 100 },
    ],
  }

  const handlePay = () => {
    setProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      setPaymentConfirmed(true)
    }, 3000)
  }

  const handleContinue = () => {
    onSuccess({
      paymentId: 'pay_' + Date.now(),
      transactionRef: 'EGPAY-2024-' + Math.random().toString(36).substring(7).toUpperCase(),
      amount: mockData.totalFee,
      paidAt: new Date().toISOString(),
    })
  }

  if (paymentConfirmed) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FBFAF7' }}>
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #DAD5C9',
          }}
        >
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
              fontWeight: 600,
              color: '#1B2430',
            }}
          >
            Payment Successful
          </h2>
        </div>

        {/* Success content */}
        <div
          className="no-scrollbar"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#E8F4E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            <CheckCircle size={48} style={{ color: '#9C7A34' }} />
          </div>

          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '24px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            Payment confirmed
          </h3>

          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '16px',
              color: '#5B6472',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            ₱{mockData.totalFee.toLocaleString()} paid successfully
          </p>

          <div
            style={{
              width: '100%',
              background: '#F2EFE7',
              border: '1px solid #DAD5C9',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <DetailRow label="Transaction Reference" value="EGPAY-2024-A3F9E2" mono />
            <DetailRow label="Payment Method" value={paymentMethods.find(m => m.id === selectedMethod)?.name || 'Card'} />
            <DetailRow label="Date & Time" value={new Date().toLocaleString('en-PH')} />
          </div>
        </div>

        {/* Continue button */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid #DAD5C9',
          }}
        >
          <Button fullWidth onClick={handleContinue}>
            Continue to submission
          </Button>
        </div>
      </div>
    )
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
          disabled={processing}
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
          Payment
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Amount summary */}
        <div
          style={{
            background: '#FEF7E6',
            border: '1px solid #F5D485',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '13px',
              color: '#5B6472',
              marginBottom: '8px',
            }}
          >
            Total amount to pay
          </div>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '36px',
              fontWeight: 700,
              color: '#1B2430',
              marginBottom: '16px',
            }}
          >
            ₱{mockData.totalFee.toLocaleString()}
          </div>

          <div
            style={{
              borderTop: '1px solid #F5D485',
              paddingTop: '12px',
            }}
          >
            {mockData.breakdown.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '14px',
                    color: '#5B6472',
                  }}
                >
                  {item.item}
                </span>
                <span
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#1B2430',
                  }}
                >
                  ₱{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '18px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '12px',
            }}
          >
            Select payment method
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={processing}
                  style={{
                    background: selectedMethod === method.id ? '#F2EFE7' : '#FBFAF7',
                    border: `2px solid ${selectedMethod === method.id ? '#1F3A5F' : '#DAD5C9'}`,
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: processing ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                    opacity: processing ? 0.6 : 1,
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
                    <Icon size={24} style={{ color: '#1F3A5F' }} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#1B2430',
                        marginBottom: '4px',
                      }}
                    >
                      {method.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: '13px',
                        color: '#5B6472',
                      }}
                    >
                      {method.description}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Security notice */}
        <div
          style={{
            background: '#F2EFE7',
            border: '1px solid #DAD5C9',
            borderRadius: '12px',
            padding: '16px',
          }}
        >
          <p
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '13px',
              color: '#5B6472',
              lineHeight: 1.6,
            }}
          >
            All payments are securely processed through eGov Pay. Your payment information is never
            stored by this application.
          </p>
        </div>

        {/* Processing state */}
        {processing && (
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
              Processing your payment...
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
        <Button
          fullWidth
          onClick={handlePay}
          disabled={!selectedMethod || processing}
          icon={processing ? Loader : CreditCard}
        >
          {processing ? 'Processing...' : `Pay ₱${mockData.totalFee.toLocaleString()}`}
        </Button>
      </div>
    </div>
  )
}

function DetailRow({ label, value, mono = false }) {
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
          fontFamily: mono ? "'IBM Plex Mono', monospace" : "'Public Sans', sans-serif",
          fontSize: mono ? '14px' : '15px',
          color: '#1B2430',
        }}
      >
        {value}
      </div>
    </div>
  )
}
