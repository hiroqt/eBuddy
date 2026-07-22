import { ReactNode } from 'react'
import { ArrowLeft, LucideIcon } from 'lucide-react'
import { cn } from '@/shared/utils'

export interface ScreenHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  action?: {
    icon: LucideIcon
    label: string
    onClick: () => void
  }
  children?: ReactNode
  className?: string
}

export const ScreenHeader = ({
  title,
  subtitle,
  onBack,
  action,
  children,
  className,
}: ScreenHeaderProps) => {
  const ActionIcon = action?.icon

  return (
    <div className={cn('px-6 py-5 border-b border-hairline bg-paper', className)}>
      <div className="flex items-center gap-3 mb-3">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-10 h-10 rounded-xl bg-paper-dim border-none flex items-center justify-center cursor-pointer transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-seal-blue"
          >
            <ArrowLeft size={20} className="text-ink" />
          </button>
        )}

        <div className="flex-1">
          <h1 className="font-display text-xl md:text-2xl font-semibold text-ink">{title}</h1>
          {subtitle && (
            <p className="font-sans text-sm md:text-base text-ink-soft mt-1">{subtitle}</p>
          )}
        </div>

        {action && ActionIcon && (
          <button
            onClick={action.onClick}
            aria-label={action.label}
            className="px-3 py-2 rounded-lg bg-paper-dim border-none flex items-center gap-1.5 cursor-pointer font-sans text-sm font-semibold text-ink transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-seal-blue"
          >
            <ActionIcon size={16} />
            <span className="hidden sm:inline">{action.label}</span>
          </button>
        )}
      </div>

      {children}
    </div>
  )
}

export default ScreenHeader
