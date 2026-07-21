import React from 'react'
import { CheckCircle, Circle, Clock, AlertCircle, FileText, MessageSquare } from 'lucide-react'
import Button from '../components/Button'
import ScreenHeader from '../components/ScreenHeader'

const timelineEvents = [
  {
    id: 1,
    status: 'completed',
    title: 'Application submitted',
    description: 'Your application was received by the agency',
    timestamp: '2024-07-22, 10:15 AM',
  },
  {
    id: 2,
    status: 'completed',
    title: 'Payment confirmed',
    description: '₱1,300 payment processed successfully',
    timestamp: '2024-07-22, 10:14 AM',
  },
  {
    id: 3,
    status: 'completed',
    title: 'Documents verified',
    description: 'All required documents have been validated',
    timestamp: '2024-07-22, 10:12 AM',
  },
  {
    id: 4,
    status: 'current',
    title: 'Under review',
    description: 'Agency is reviewing your application',
    timestamp: 'In progress',
  },
  {
    id: 5,
    status: 'pending',
    title: 'Approval decision',
    description: 'Final approval or additional requirements',
    timestamp: 'Pending',
  },
  {
    id: 6,
    status: 'pending',
    title: 'Ready for release',
    description: 'Your permit will be ready for download',
    timestamp: 'Pending',
  },
]

export default function TrackingTimeline({ applicationId, onFileConcern, onBack }) {
  const mockData = {
    referenceNumber: 'BPR-2024-07-012345',
    service: 'Business Permit Renewal',
    agency: 'Demo City Business Permits Office',
    currentStatus: 'Under Review',
    submittedDate: '2024-07-22',
    estimatedCompletionDate: '2024-07-29',
    daysRemaining: 7,
  }

  return (
    <div className="h-full flex flex-col bg-paper">
      <ScreenHeader title="Track Application" onBack={onBack} />

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Application summary */}
        <div className="bg-sky-tint border border-sky-line rounded-2xl p-5 mb-6">
          <div className="font-mono text-sm font-bold text-seal-blue mb-3">
            {mockData.referenceNumber}
          </div>
          <h3 className="font-display text-xl font-semibold text-ink mb-2">
            {mockData.service}
          </h3>
          <p className="font-sans text-sm text-ink-soft mb-4">
            {mockData.agency}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-seal-blue text-paper font-sans text-[13px] font-semibold">
            <Clock size={16} />
            {mockData.currentStatus}
          </div>
        </div>

        {/* Estimated completion */}
        <div className="bg-amber-tint border border-amber-line rounded-xl p-4 mb-6 flex items-center gap-3">
          <Clock size={20} className="text-bronze shrink-0" />
          <div>
            <div className="font-sans text-sm font-semibold text-ink mb-1">
              Expected completion
            </div>
            <div className="font-sans text-[13px] text-ink-soft">
              {new Date(mockData.estimatedCompletionDate).toLocaleDateString('en-PH', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              ({mockData.daysRemaining} days remaining)
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold text-ink mb-4">
            Application Timeline
          </h3>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-hairline" />

            {/* Timeline events */}
            <div className="flex flex-col gap-5">
              {timelineEvents.map((event) => (
                <div key={event.id} className="flex gap-4 relative">
                  {/* Status icon */}
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                      event.status === 'completed'
                        ? 'bg-green-tint border-bronze'
                        : event.status === 'current'
                          ? 'bg-sky-tint border-seal-blue'
                          : 'bg-paper-dim border-hairline'
                    }`}
                  >
                    {event.status === 'completed' && <CheckCircle size={20} className="text-bronze" />}
                    {event.status === 'current' && <Circle size={16} className="text-seal-blue" fill="#1F3A5F" />}
                    {event.status === 'pending' && <Circle size={16} className="text-hairline" />}
                  </div>

                  {/* Event details */}
                  <div className="flex-1 pb-2">
                    <div
                      className={`font-display text-base font-semibold mb-1 ${
                        event.status === 'pending' ? 'text-ink-soft' : 'text-ink'
                      }`}
                    >
                      {event.title}
                    </div>
                    <div className="font-sans text-sm text-ink-soft mb-1.5 leading-relaxed">
                      {event.description}
                    </div>
                    <div className="font-mono text-xs text-ink-soft">
                      {event.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional info notice */}
        <div className="bg-paper-dim border border-hairline rounded-xl p-4 mb-4">
          <div className="flex gap-3">
            <FileText size={20} className="text-seal-blue shrink-0 mt-0.5" />
            <div>
              <div className="font-sans text-sm font-semibold text-ink mb-1.5">
                Updates via eMessage
              </div>
              <div className="font-sans text-[13px] text-ink-soft leading-relaxed">
                You'll receive notifications through SMS and email when the agency updates your
                application status or requests additional documents.
              </div>
            </div>
          </div>
        </div>

        {/* File concern option */}
        <div className="bg-amber-tint border border-amber-line rounded-xl p-4">
          <div className="flex gap-3 mb-3">
            <AlertCircle size={20} className="text-bronze shrink-0 mt-0.5" />
            <div>
              <div className="font-sans text-sm font-semibold text-ink mb-1.5">
                Something not right?
              </div>
              <div className="font-sans text-[13px] text-ink-soft leading-relaxed">
                If your application is delayed or you notice an issue, you can file a concern
                through eReport.
              </div>
            </div>
          </div>
          <Button fullWidth variant="secondary" onClick={onFileConcern} icon={MessageSquare}>
            File a concern
          </Button>
        </div>
      </div>
    </div>
  )
}
