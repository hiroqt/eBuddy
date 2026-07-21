import React, { useState } from 'react'
import { ArrowLeft, User, Lock, Bell, LogOut } from 'lucide-react'
import Button from '../components/Button'

export default function Profile({ onBack }) {
  const [faceLiveness, setFaceLiveness] = useState(true)
  const [shareNotifications, setShareNotifications] = useState(true)
  const [linkExpiry, setLinkExpiry] = useState('5')

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
          Profile & Security
        </h2>
      </div>

      {/* Content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Identity summary */}
        <div className="bg-paper-dim border border-hairline rounded-2xl p-6 mb-8">
          <div className="w-16 h-16 rounded-full bg-seal-blue flex items-center justify-center mb-4">
            <User size={32} className="text-paper" />
          </div>
          <h3 className="font-display text-xl font-semibold text-ink mb-1">
            Juan Dela Cruz
          </h3>
          <p className="font-mono text-[13px] text-ink-soft">
            eGovPH ID: EGPH-2024-012345
          </p>
        </div>

        {/* Security settings */}
        <div className="mb-8">
          <h3 className="font-display text-lg font-semibold text-ink mb-4">
            Security Settings
          </h3>

          <div className="flex flex-col gap-3">
            <SettingRow
              icon={Lock}
              label="Face Liveness Lock"
              description="Require face verification for each sign in"
              value={faceLiveness}
              onChange={setFaceLiveness}
            />
            <SettingRow
              icon={Bell}
              label="Share Notifications"
              description="Get notified when documents are verified"
              value={shareNotifications}
              onChange={setShareNotifications}
            />
          </div>
        </div>

        {/* Link expiry */}
        <div className="mb-8">
          <h3 className="font-display text-lg font-semibold text-ink mb-3">
            Default Link Expiry
          </h3>
          <p className="font-sans text-sm text-ink-soft mb-4 leading-relaxed">
            Set how long shared QR codes remain active before automatically expiring
          </p>

          <select
            value={linkExpiry}
            onChange={(e) => setLinkExpiry(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-hairline bg-paper-dim font-sans text-[15px] text-ink cursor-pointer outline-none focus:border-seal-blue transition-colors duration-150"
          >
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        {/* Sign out */}
        <Button fullWidth variant="secondary" icon={LogOut}>
          Sign out
        </Button>
      </div>
    </div>
  )
}

function SettingRow({ icon: Icon, label, description, value, onChange }) {
  return (
    <div className="bg-paper-dim border border-hairline rounded-xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-[10px] bg-paper flex items-center justify-center shrink-0">
        <Icon size={20} className="text-seal-blue" />
      </div>

      <div className="flex-1">
        <div className="font-sans text-[15px] font-semibold text-ink mb-1">
          {label}
        </div>
        <div className="font-sans text-[13px] text-ink-soft">
          {description}
        </div>
      </div>

      <label className="relative w-12 h-7 shrink-0 cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="opacity-0 w-0 h-0"
        />
        <span
          className={`absolute inset-0 rounded-full transition-all duration-150 ${
            value ? 'bg-seal-blue' : 'bg-hairline'
          }`}
        >
          <span
            className={`absolute h-5 w-5 top-1 bg-paper rounded-full transition-all duration-150 ${
              value ? 'left-6' : 'left-1'
            }`}
          />
        </span>
      </label>
    </div>
  )
}
