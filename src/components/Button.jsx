import React from 'react'

export default function Button({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  icon: Icon,
  disabled = false,
  className = '',
}) {
  const baseClasses = "flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-sans text-base font-semibold transition-all duration-150 min-h-[52px]"
  const widthClass = fullWidth ? "w-full" : "w-auto"
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0 active:shadow-none"

  const variantClasses = {
    primary: "bg-seal-blue text-paper",
    secondary: "bg-paper-dim text-ink",
    danger: "bg-dry-seal-red text-paper",
  }

  return (
    <button
      className={`${baseClasses} ${widthClass} ${disabledClass} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={20} strokeWidth={2.5} />}
      {children}
    </button>
  )
}
