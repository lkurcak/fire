"use client"

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12" />
      <path d="M8 10c0-2 2-2 4-2s4 0 4 2" />
      <path d="M8 14c0 2 2 2 4 2s4 0 4-2" />
      <path d="M9 9h6" />
      <path d="M9 15h6" />
    </svg>
  )
}
