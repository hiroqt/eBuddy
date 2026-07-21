import React from 'react'
import { Check } from 'lucide-react'

// The signature dry seal badge — concentric bronze rings with centered check
export default function DrySealBadge({ size = 40 }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: '#9C7A34',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '4px',
          borderRadius: '50%',
          border: '2px solid rgba(251, 250, 247, 0.4)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '8px',
          borderRadius: '50%',
          border: '1.5px solid rgba(251, 250, 247, 0.3)',
        }}
      />
      <Check
        size={size * 0.45}
        strokeWidth={3}
        style={{ color: '#FBFAF7', position: 'relative', zIndex: 1 }}
      />
    </div>
  )
}
