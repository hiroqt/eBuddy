import { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/shared/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'amber' | 'sky' | 'green' | 'red'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  clickable?: boolean
  children: ReactNode
}

export const Card = ({
  variant = 'default',
  padding = 'md',
  clickable = false,
  className,
  children,
  ...props
}: CardProps) => {
  const baseStyles = 'rounded-xl transition-all duration-150'

  const variantStyles = {
    default: 'bg-paper-dim border border-hairline',
    outlined: 'bg-transparent border border-hairline',
    elevated: 'bg-paper shadow-md',
    amber: 'bg-amber-tint border border-amber-line',
    sky: 'bg-sky-tint border border-sky-line',
    green: 'bg-green-tint border border-green-line',
    red: 'bg-red-tint border border-red-line',
  }

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  const clickableStyles = clickable
    ? 'cursor-pointer hover:-translate-y-[1px] hover:shadow-md active:translate-y-0'
    : ''

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        clickableStyles,
        className
      )}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
