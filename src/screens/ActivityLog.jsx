import React from 'react'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

const mockActivities = [
  {
    id: 1,
    document: 'Birth Certificate',
    agency: 'Department of Health',
    timestamp: '2024-07-20, 2:34 PM',
    status: 'verified',
  },
  {
    id: 2,
    document: 'SSS UMID',
    agency: 'Social Security System',
    timestamp: '2024-07-18, 10:15 AM',
    status: 'verified',
  },
  {
    id: 3,
    document: "Driver's License",
    agency: 'Land Transportation Office',
    timestamp: '2024-07-15, 4:22 PM',
    status: 'verified',
  },
  {
    id: 4,
    document: 'PhilHealth ID',
    agency: 'Philippine Health Insurance Corporation',
    timestamp: '2024-07-10, 9:03 AM',
    status: 'revoked',
  },
]

export default function ActivityLog({ onBack }) {
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
          Activity Log
        </h2>
      </div>

      {/* Activity list */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        <p className="font-sans text-sm text-ink-soft mb-5">
          Every share and verification is recorded here for transparency and audit.
        </p>

        <div className="flex flex-col gap-3">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-paper-dim border border-hairline rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-paper flex items-center justify-center shrink-0">
                  {activity.status === 'verified' && (
                    <CheckCircle size={20} className="text-bronze" />
                  )}
                  {activity.status === 'revoked' && (
                    <XCircle size={20} className="text-dry-seal-red" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-display text-base font-semibold text-ink mb-1">
                    {activity.document}
                  </div>
                  <div className="font-sans text-sm text-ink-soft mb-2">
                    {activity.agency}
                  </div>
                  <div className="font-mono text-xs text-ink-soft">
                    {activity.timestamp}
                  </div>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-md font-sans text-xs font-semibold text-paper capitalize ${
                    activity.status === 'verified' ? 'bg-bronze' : 'bg-dry-seal-red'
                  }`}
                >
                  {activity.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
