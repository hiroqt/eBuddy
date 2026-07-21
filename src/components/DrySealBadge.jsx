import React from 'react'
import { Check } from 'lucide-react'

// The signature dry seal badge — concentric bronze rings with centered check
export default function DrySealBadge({ size = 40 }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className="rounded-full bg-bronze flex items-center justify-center relative shrink-0"
    >
      <div className="absolute inset-1 rounded-full border-2 border-paper/40" />
      <div className="absolute inset-2 rounded-full border-[1.5px] border-paper/30" />
      <Check
        size={size * 0.45}
        strokeWidth={3}
        className="text-paper relative z-10"
      />
    </div>
  )
}
