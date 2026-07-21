import React, { useState } from 'react'
import { MessageSquare, FileText, Search, TrendingUp, User, Clock } from 'lucide-react'
import Button from '../components/Button'

const popularServices = [
  {
    id: 'business-permit-renewal',
    title: 'Business Permit Renewal',
    description: 'Renew your business permit for this year',
    icon: FileText,
    color: '#1F3A5F',
  },
  {
    id: 'identity-verification',
    title: 'Verify Identity',
    description: 'Confirm your identity with National ID',
    icon: User,
    color: '#9C7A34',
  },
  {
    id: 'track-application',
    title: 'Track Application',
    description: 'Check the status of your existing applications',
    icon: Clock,
    color: '#5B6472',
  },
]

const recentApplications = [
  {
    id: 'app_123',
    service: 'Business Permit Renewal',
    status: 'DOCUMENTS_PENDING',
    updatedAt: '2 hours ago',
  },
]

export default function ServiceHub({ onStartService, onNavigate }) {
  const [userInput, setUserInput] = useState('')

  const handleSubmitGoal = () => {
    if (userInput.trim()) {
      onStartService({ type: 'natural-language', input: userInput })
    }
  }

  const handleSelectService = (serviceId) => {
    onStartService({ type: 'direct', serviceId })
  }

  return (
    <div className="h-full flex flex-col bg-paper">
      {/* Header */}
      <div className="pl-[72px] pr-6 py-5 border-b border-hairline">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-1">
              Good morning, Juan
            </h1>
            <p className="font-sans text-sm text-ink-soft">
              How can I help you today?
            </p>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 rounded-[10px] bg-paper-dim border-none flex items-center justify-center cursor-pointer transition-all duration-150 hover:shadow-md"
          >
            <User size={20} className="text-ink" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Natural language input */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={20} className="text-seal-blue" />
            <h3 className="font-display text-lg font-semibold text-ink">
              Tell me what you need
            </h3>
          </div>

          <div className="bg-paper-dim border border-hairline rounded-2xl p-4">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Example: I want to renew my business permit..."
              className="w-full min-h-[80px] p-0 border-none bg-transparent font-sans text-[15px] text-ink resize-none outline-none placeholder:text-ink-soft/60"
            />
            <div className="mt-3">
              <Button
                fullWidth
                onClick={handleSubmitGoal}
                disabled={!userInput.trim()}
                icon={Search}
              >
                Find the right service
              </Button>
            </div>
          </div>
        </div>

        {/* Resume recent applications */}
        {recentApplications.length > 0 && (
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold text-ink mb-3">
              Continue where you left off
            </h3>
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="bg-amber-tint border border-amber-line rounded-xl p-4 cursor-pointer transition-all duration-150 hover:-translate-y-[1px] hover:shadow-md"
                onClick={() => onNavigate('tracking-timeline', { applicationId: app.id })}
              >
                <div className="font-display text-base font-semibold text-ink mb-1">
                  {app.service}
                </div>
                <div className="font-sans text-[13px] text-bronze mb-1">
                  Documents pending
                </div>
                <div className="font-sans text-xs text-ink-soft">
                  Last updated {app.updatedAt}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popular services */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={20} className="text-seal-blue" />
            <h3 className="font-display text-lg font-semibold text-ink">
              Popular services
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {popularServices.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  className="bg-paper-dim border border-hairline rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-150 hover:-translate-y-[1px] hover:shadow-md"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: service.color }}
                  >
                    <Icon size={24} className="text-paper" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-base font-semibold text-ink mb-1">
                      {service.title}
                    </div>
                    <div className="font-sans text-[13px] text-ink-soft">
                      {service.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
