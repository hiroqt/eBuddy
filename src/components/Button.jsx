import React from 'react'

export default function Button({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  icon: Icon,
  disabled = false,
}) {
  const baseStyle = {
    padding: '16px 24px',
    borderRadius: '12px',
    fontFamily: "'Public Sans', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
    minHeight: '52px',
  }

  const variants = {
    primary: {
      background: '#1F3A5F',
      color: '#FBFAF7',
    },
    secondary: {
      background: '#F2EFE7',
      color: '#1B2430',
    },
    danger: {
      background: '#A8322D',
      color: '#FBFAF7',
    },
  }

  return (
    <button
      style={{ ...baseStyle, ...variants[variant] }}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(27, 36, 48, 0.12)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      {Icon && <Icon size={20} strokeWidth={2.5} />}
      {children}
    </button>
  )
}
