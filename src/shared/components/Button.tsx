import { ButtonHTMLAttributes, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold transition-all duration-150 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-seal-blue focus:ring-offset-2'

  const variantStyles = {
    primary: 'bg-seal-blue text-paper hover:bg-seal-blue/90 active:bg-seal-blue/80',
    secondary: 'bg-bronze text-paper hover:bg-bronze/90 active:bg-bronze/80',
    outline:
      'bg-transparent border-2 border-hairline text-ink hover:border-seal-blue hover:text-seal-blue',
    ghost: 'bg-transparent text-ink hover:bg-paper-dim',
    danger: 'bg-dry-seal-red text-paper hover:bg-dry-seal-red/90 active:bg-dry-seal-red/80',
  }

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  }

  const widthStyles = fullWidth ? 'w-full' : ''

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {Icon && iconPosition === 'left' && !isLoading && <Icon size={20} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && !isLoading && <Icon size={20} />}
    </button>
  )
}

export default Button
