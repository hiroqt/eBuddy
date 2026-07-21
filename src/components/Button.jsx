import React from 'react'

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconOnly = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px] gap-1.5',
    md: 'px-6 py-3.5 text-base min-h-[48px] gap-2',
    lg: 'px-8 py-4 text-base min-h-[56px] gap-2',
  }
  const iconOnlySize = { sm: 'w-9 h-9', md: 'w-11 h-11', lg: 'w-14 h-14' }

  const variants = {
    primary: 'bg-seal-blue text-paper',
    secondary: 'bg-paper-dim text-ink border border-hairline',
    danger: 'bg-dry-seal-red text-paper',
    ghost: 'bg-transparent text-seal-blue hover:bg-paper-dim',
  }

  const base = `inline-flex items-center justify-center rounded-xl font-sans font-semibold transition-all duration-150 ${
    disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 active:shadow-none'
  }`

  const sizeClass = iconOnly ? `${iconOnlySize[size]} rounded-xl` : sizes[size]

  return (
    <button
      className={`${base} ${sizeClass} ${variants[variant]} ${fullWidth && !iconOnly ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : 20} strokeWidth={2.5} />}
      {!iconOnly && children}
    </button>
  )
}
