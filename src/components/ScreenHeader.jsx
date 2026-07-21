import React from 'react'
import { ArrowLeft } from 'lucide-react'

/**
 * Standardized screen header: optional back button, title, optional right-side action(s).
 * Replaces the ad-hoc header + raw back-button markup repeated across screens.
 */
export default function ScreenHeader({ title, onBack, backDisabled = false, right, subtitle }) {
  return (
    <div className="px-6 py-5 border-b border-hairline flex items-center gap-3">
      {onBack && (
        <button
          onClick={onBack}
          disabled={backDisabled}
          aria-label="Go back"
          className="w-10 h-10 rounded-[10px] bg-paper-dim border-none flex items-center justify-center cursor-pointer transition-all duration-150 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none shrink-0"
        >
          <ArrowLeft size={20} className="text-ink" />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h2 className="font-display text-xl font-semibold text-ink truncate">{title}</h2>
        {subtitle && <p className="font-sans text-[13px] text-ink-soft mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}
