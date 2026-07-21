import React, { useState } from 'react'
import {
  Menu,
  X,
  Home,
  LogIn,
  Camera,
  Wallet,
  FileText,
  MessageSquare,
  ClipboardList,
  Upload,
  CheckSquare,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Share2,
  Activity,
} from 'lucide-react'

const navigationGroups = [
  {
    title: 'Authentication',
    items: [
      { id: 'signin', label: 'Sign In', icon: LogIn },
      { id: 'face-liveness', label: 'Face Liveness', icon: Camera },
    ],
  },
  {
    title: 'Service Flow',
    items: [
      { id: 'service-hub', label: 'Service Hub', icon: Home },
      { id: 'ai-task-planner', label: 'AI Task Planner', icon: ClipboardList },
      { id: 'guided-questions', label: 'Guided Questions', icon: MessageSquare },
      { id: 'document-assistant', label: 'Document Assistant', icon: Upload },
      { id: 'application-review', label: 'Application Review', icon: CheckSquare },
      { id: 'payment', label: 'Payment', icon: CreditCard },
      { id: 'submission-confirmation', label: 'Submission', icon: CheckCircle },
      { id: 'tracking-timeline', label: 'Tracking Timeline', icon: Clock },
      { id: 'report-concern', label: 'Report Concern', icon: AlertTriangle },
    ],
  },
  {
    title: 'Wallet & Documents',
    items: [
      { id: 'wallet', label: 'Wallet', icon: Wallet },
      { id: 'document-detail', label: 'Document Detail', icon: FileText },
      { id: 'share-verify', label: 'Share & Verify', icon: Share2 },
    ],
  },
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'activity-log', label: 'Activity Log', icon: Activity },
    ],
  },
]

export default function Sidebar({ currentScreen, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)
  const handleNavigate = (screenId) => {
    onNavigate(screenId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Toggle Button - Absolute position inside PWA */}
      <button
        onClick={toggleSidebar}
        style={{ left: isOpen ? '280px' : '20px' }}
        className="absolute top-5 z-[1002] w-11 h-11 rounded-full bg-seal-blue border-none flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-[left] duration-300 ease-in-out hover:scale-105"
      >
        {isOpen ? (
          <X size={20} className="text-paper" />
        ) : (
          <Menu size={20} className="text-paper" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/50 z-[1000] animate-[fadeIn_0.3s_ease]"
        />
      )}

      {/* Sidebar */}
      <div
        style={{ left: isOpen ? '0' : '-280px' }}
        className={`absolute top-0 bottom-0 w-[280px] bg-ink z-[1001] transition-[left] duration-300 ease-in-out flex flex-col ${
          isOpen ? 'shadow-[4px_0_12px_rgba(0,0,0,0.2)]' : ''
        }`}
      >
        {/* Header */}
        <div className="px-4 py-5 border-b border-paper/10">
          <h2 className="font-display text-xl font-bold text-paper mb-1">
            DocuPH
          </h2>
          <p className="font-sans text-xs text-paper/60">
            eGov Service Agent
          </p>
        </div>

        {/* Navigation */}
        <div className="no-scrollbar flex-1 overflow-y-auto py-3">
          {navigationGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-5">
              <div className="px-4 pb-1.5 font-sans text-[10px] font-bold text-paper/40 uppercase tracking-wide">
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = currentScreen === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full px-4 py-2.5 flex items-center gap-2.5 border-none cursor-pointer text-left transition-all duration-150 ${
                      isActive
                        ? 'bg-paper/10 border-l-[3px] border-l-bronze'
                        : 'bg-transparent border-l-[3px] border-l-transparent hover:bg-paper/5'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`shrink-0 ${isActive ? 'text-bronze' : 'text-paper/60'}`}
                    />
                    <span
                      className={`font-sans text-[13px] ${
                        isActive ? 'font-semibold text-paper' : 'font-normal text-paper/80'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-paper/10">
          <div className="p-2.5 bg-bronze/10 border border-bronze/20 rounded-lg">
            <div className="font-sans text-[11px] font-semibold text-bronze mb-1">
              Demo Mode
            </div>
            <div className="font-sans text-[10px] text-paper/60 leading-relaxed">
              Screen navigation helper
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
