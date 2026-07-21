import React, { useState } from 'react'
import { CreditCard, Smartphone, Building, CheckCircle, Loader } from 'lucide-react'
import Button from '../components/Button'
import ScreenHeader from '../components/ScreenHeader'

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
      <div className="h-full flex flex-col bg-paper">
        <ScreenHeader title="Payment Successful" />

        {/* Success content */}
        <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-green-tint flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-bronze" />
          </div>

          <h3 className="font-display text-2xl font-semibold text-ink mb-2 text-center">
            Payment confirmed
          </h3>

          <p className="font-sans text-base text-ink-soft text-center mb-8">
            ₱{mockData.totalFee.toLocaleString()} paid successfully
          </p>

          <div className="w-full bg-paper-dim border border-hairline rounded-xl p-4">
            <DetailRow label="Transaction Reference" value="EGPAY-2024-A3F9E2" mono />
            <DetailRow label="Payment Method" value={paymentMethods.find(m => m.id === selectedMethod)?.name || 'Card'} />
            <DetailRow label="Date & Time" value={new Date().toLocaleString('en-PH')} />
          </div>
        </div>

        {/* Continue button */}
        <div className="px-6 py-5 border-t border-hairline">
          <Button fullWidth onClick={handleContinue}>
            Continue to submission
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-paper">
      <ScreenHeader title="Payment" onBack={onBack} backDisabled={processing} />

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Amount summary */}
        <div className="bg-amber-tint border border-amber-line rounded-2xl p-5 mb-6">
          <div className="font-sans text-[13px] text-ink-soft mb-2">
            Total amount to pay
          </div>
          <div className="font-display text-4xl font-bold text-ink mb-4">
            ₱{mockData.totalFee.toLocaleString()}
          </div>

          <div className="border-t border-amber-line pt-3">
            {mockData.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between mb-2 last:mb-0">
                <span className="font-sans text-sm text-ink-soft">
                  {item.item}
                </span>
                <span className="font-sans text-sm font-semibold text-ink">
                  ₱{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold text-ink mb-3">
            Select payment method
          </h3>

          <div className="flex flex-col gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={processing}
                  className={`p-4 rounded-xl border-2 flex items-center gap-4 text-left transition-all duration-150 ${
                    processing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
                  } ${
                    selectedMethod === method.id
                      ? 'bg-paper-dim border-seal-blue'
                      : 'bg-paper border-hairline hover:border-ink-soft/40'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-paper flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-seal-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-base font-semibold text-ink mb-1">
                      {method.name}
                    </div>
                    <div className="font-sans text-[13px] text-ink-soft">
                      {method.description}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Security notice */}
        <div className="bg-paper-dim border border-hairline rounded-xl p-4">
          <p className="font-sans text-[13px] text-ink-soft leading-relaxed">
            All payments are securely processed through eGov Pay. Your payment information is never
            stored by this application.
          </p>
        </div>

        {/* Processing state */}
        {processing && (
          <div className="mt-6 bg-sky-tint border border-sky-line rounded-xl p-4 flex items-center gap-3">
            <Loader size={20} className="text-seal-blue animate-spin" />
            <div className="font-sans text-sm text-ink">
              Processing your payment...
            </div>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-6 py-5 border-t border-hairline">
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
