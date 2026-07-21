import React from 'react'
import {
  FileText,
  CreditCard,
  Heart,
  Car,
  Vote,
  Receipt,
  Clock,
  AlertCircle,
} from 'lucide-react'
import DrySealBadge from './DrySealBadge'

const iconMap = {
  'Birth Certificate': FileText,
  'SSS UMID': CreditCard,
  'PhilHealth ID': Heart,
  "Driver's License": Car,
  "Voter's Certification": Vote,
  'TIN ID': Receipt,
}

export default function DocumentCard({ document, onClick }) {
  const Icon = iconMap[document.type] || FileText
  const isExpiring = document.daysUntilExpiry && document.daysUntilExpiry <= 30
  const isPending = document.status === 'pending'

  return (
    <button
      onClick={onClick}
      className="w-full bg-paper-dim border border-hairline rounded-2xl p-5 flex items-center gap-4 cursor-pointer text-left transition-all duration-150 hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(27,36,48,0.08)]"
    >
      <div className="w-12 h-12 rounded-xl bg-paper flex items-center justify-center shrink-0">
        <Icon size={24} strokeWidth={2} className="text-seal-blue" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-display text-base font-semibold text-ink mb-1 truncate">
          {document.type}
        </div>
        <div className="font-sans text-[13px] text-ink-soft truncate">
          {document.agency}
        </div>
        {isExpiring && (
          <div className="flex items-center gap-1 mt-1.5 text-dry-seal-red font-sans text-xs font-medium">
            <Clock size={12} />
            Expires in {document.daysUntilExpiry} days
          </div>
        )}
      </div>

      {!isPending && <DrySealBadge size={40} />}
      {isPending && (
        <div className="px-3 py-2 bg-paper rounded-lg font-sans text-xs font-semibold text-ink-soft flex items-center gap-1 shrink-0">
          <AlertCircle size={14} />
          Pending
        </div>
      )}
    </button>
  )
}
