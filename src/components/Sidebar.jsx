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

// Primary destinations — the everyday product nav a real user needs.
const primaryNav = [
  { id: 'service-hub', label: 'Home', icon: Home },
  { id: 'wallet', label: 'My Wallet', icon: Wallet },
  { id: 'tracking-timeline', label: 'Track Applications', icon: Clock },
  { id: 'profile', label: 'Profile & Security', icon: User },
  { id: 'activity-log', label: 'Activity', icon: Activity },
]

// Secondary — full screen list kept for demo/dev navigation, tucked away.
const allScreens = [
  { id: 'signin', label: 'Sign In', icon: LogIn },
  { id: 'face-liveness', label: 'Face Liveness', icon: Camera },
  { id: 'ai-task-planner', label: 'AI Task Planner', icon: ClipboardList },
  { id: 'guided-questions', label: 'Guided Questions', icon: MessageSquare },
  { id: 'document-assistant', label: 'Document Assistant', icon: Upload },
  { id: 'application-review', label: 'Application Review', icon: CheckSquare },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'submission-confirmation', label: 'Submission', icon: CheckCircle },
  { id: 'report-concern', label: 'Report Concern', icon: AlertTriangle },
  { id: 'document-detail', label: 'Document Detail', icon: FileText },
  { id: 'share-verify', label: 'Share & Verify', icon: Share2 },
]

export default function Sidebar({ currentScreen, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)
  const handleNavigate = (screenId) => {
    onNavigate(screenId)
    setIsOpen(false)
  }

  const renderItem = (item) => {
    const Icon = item.icon
    const isActive = currentScreen === item.id
    return (
      <button
        key={item.id}
        onClick={() => handleNavigate(item.id)}
        aria-current={isActive ? 'page' : undefined}
        className={`w-full px-4 py-2.5 flex items-center gap-2.5 border-none cursor-pointer text-left transition-all duration-150 ${
          isActive
            ? 'bg-paper/10 border-l-[3px] border-l-bronze'
            : 'bg-transparent border-l-[3px] border-l-transparent hover:bg-paper/5'
        }`}
      >
        <Icon size={18} className={`shrink-0 ${isActive ? 'text-bronze' : 'text-paper/60'}`} />
        <span className={`font-sans text-[13px] ${isActive ? 'font-semibold text-paper' : 'font-normal text-paper/80'}`}>
          {item.label}
        </span>
      </button>
    )
  }

  return (
    <>
      {/* Toggle Button - Absolute position inside PWA */}
      <button
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
          <h2 className="font-display text-xl font-bold text-paper mb-0.5">DocuPH</h2>
          <p className="font-sans text-xs text-paper/60">Unified Document Wallet</p>
        </div>

        {/* Navigation */}
        <div className="no-scrollbar flex-1 overflow-y-auto py-3">
          <div className="mb-4">{primaryNav.map(renderItem)}</div>

          {/* Collapsible: all screens (demo/dev) */}
          <div className="px-4 mb-1">
            <button
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
              className="w-full flex items-center justify-between py-1.5 bg-transparent border-none cursor-pointer"
            >
              <span className="font-sans text-[10px] font-bold text-paper/40 uppercase tracking-wide">All screens</span>
              <span className="font-sans text-[10px] text-paper/40">{showAll ? '▲' : '▼'}</span>
            </button>
          </div>
          {showAll && allScreens.map(renderItem)}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-paper/10">
          <div className="p-2.5 bg-bronze/10 border border-bronze/20 rounded-lg">
            <div className="font-sans text-[11px] font-semibold text-bronze mb-0.5">Demo Mode</div>
            <div className="font-sans text-[10px] text-paper/60 leading-relaxed">Screen navigation helper</div>
          </div>
        </div>
      </div>
    </>
  )
}
