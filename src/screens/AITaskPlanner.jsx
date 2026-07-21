import React from 'react'
import { CheckCircle, Circle, AlertCircle } from 'lucide-react'
import Button from '../components/Button'
import ScreenHeader from '../components/ScreenHeader'

const workflowSteps = [
  {
    id: 'identify-service',
    label: 'Service identified',
    status: 'completed',
  },
  {
    id: 'verify-identity',
    label: 'Verify your identity',
    status: 'current',
    description: 'We need to confirm your identity using National ID eVerify and Face Liveness',
  },
  {
    id: 'collect-answers',
    label: 'Answer a few questions',
    status: 'pending',
  },
  {
    id: 'collect-documents',
    label: 'Upload required documents',
    status: 'pending',
  },
  {
    id: 'review',
    label: 'Review your application',
    status: 'pending',
  },
  {
    id: 'payment',
    label: 'Pay official fees',
    status: 'pending',
  },
  {
    id: 'submission',
    label: 'Submit application',
    status: 'pending',
  },
  {
    id: 'tracking',
    label: 'Track progress',
    status: 'pending',
  },
]

export default function AITaskPlanner({ service, onAccept, onCancel }) {
  return (
    <div className="h-full flex flex-col bg-paper">
      <ScreenHeader title="Your Action Plan" onBack={onCancel} />

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Service summary */}
        <div className="bg-paper-dim border border-hairline rounded-2xl p-5 mb-6">
          <div className="font-sans text-[13px] font-semibold text-seal-blue mb-2 uppercase tracking-wide">
            Service
          </div>
          <h3 className="font-display text-xl font-semibold text-ink mb-2">
            {service?.name || 'Business Permit Renewal'}
          </h3>
          <p className="font-sans text-sm text-ink-soft mb-3">
            {service?.jurisdiction || 'Demo City'} • {service?.agency || 'Business Permits Office'}
          </p>
          <div className="inline-block px-3 py-1.5 rounded-md bg-seal-blue text-paper font-sans text-xs font-semibold">
            Verified Workflow v{service?.version || '1.0.0'}
          </div>
        </div>

        {/* Mascot message */}
        <div className="bg-amber-tint border border-amber-line rounded-2xl p-4 mb-6 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-bronze flex items-center justify-center shrink-0 font-display text-2xl font-bold text-paper">
            e
          </div>
          <div>
            <p className="font-sans text-sm text-ink leading-relaxed">
              I found the service you need. Let me guide you through each step. I'll only ask for
              information that's required, and you'll review everything before submission.
            </p>
          </div>
        </div>

        {/* Workflow steps */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold text-ink mb-4">
            Here's what we'll do
          </h3>

          <div className="flex flex-col gap-2">
            {workflowSteps.map((step, index) => {
              const isCompleted = step.status === 'completed'
              const isCurrent = step.status === 'current'
              const isPending = step.status === 'pending'

              return (
                <div key={step.id}>
                  <div
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-150 ${
                      isCurrent
                        ? 'bg-paper-dim border-2 border-seal-blue'
                        : 'border-2 border-transparent'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      {isCompleted && <CheckCircle size={20} className="text-bronze" />}
                      {isCurrent && (
                        <Circle
                          size={20}
                          className="text-seal-blue"
                          strokeWidth={3}
                          fill="#1F3A5F"
                        />
                      )}
                      {isPending && <Circle size={20} className="text-hairline" />}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-sans text-[15px] ${
                          isCurrent ? 'font-semibold' : 'font-normal'
                        } ${isCompleted || isCurrent ? 'text-ink' : 'text-ink-soft'} ${
                          step.description ? 'mb-1' : ''
                        }`}
                      >
                        {step.label}
                      </div>
                      {step.description && (
                        <div className="font-sans text-[13px] text-ink-soft leading-normal">
                          {step.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Important notice */}
        <div className="bg-paper-dim border border-hairline rounded-xl p-4 flex gap-3">
          <AlertCircle size={20} className="text-ink-soft shrink-0 mt-0.5" />
          <div>
            <div className="font-sans text-sm font-semibold text-ink mb-1.5">
              You're in control
            </div>
            <div className="font-sans text-[13px] text-ink-soft leading-relaxed">
              I will ask for your explicit permission before sharing data, making payments, or
              submitting your application. You can stop or save a draft at any time.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-6 py-5 border-t border-hairline flex flex-col gap-3">
        <Button fullWidth onClick={onAccept}>
          Let's start
        </Button>
        <Button fullWidth variant="secondary" onClick={onCancel}>
          Choose a different service
        </Button>
      </div>
    </div>
  )
}
