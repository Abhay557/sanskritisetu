/* Indian-culture SVG illustration set: jaali, paisley, diya, rangoli.
   Offline-first (no remote images), stone/sindoor/marigold/peacock palette. */

export function JaaliBand({ className = '' }) {
  return <div aria-hidden="true" className={`jaali-band rounded-2xl border border-[#e3d3ae] ${className}`} />
}

export function RangoliHr({ className = '' }) {
  return <div aria-hidden="true" className={`rangoli-hr rounded-full ${className}`} />
}

export function PaisleyMark({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path
        d="M30 4C18 4 8 14 8 26c0 9 7 16 15 16 7 0 12-5 12-11 0-5-4-8-8-8-3 0-5 2-5 5 0 1 .5 2 1 2.6C15 30 10 25 10 25c3-8 10-13 18-13 9 0 14 7 14 15 0 10-8 17-16 17C14 44 4 36 4 26 4 12 16 2 30 4z"
        fill="#a63a22"
      />
      <circle cx="30" cy="26" r="3.5" fill="#e9a319" />
      <circle cx="14" cy="34" r="2" fill="#0e6b6b" />
    </svg>
  )
}

export function DiyaRow({ count = 5, className = '' }) {
  return (
    <div aria-hidden="true" className={`flex items-end gap-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="34" height="40" viewBox="0 0 34 40" fill="none" style={{ opacity: 0.9 }}>
          <ellipse cx="17" cy="8" rx="3" ry="5" fill="#e9a319" />
          <ellipse cx="17" cy="10" rx="1.4" ry="2.6" fill="#a63a22" />
          <path d="M4 20h26c0 8-6 14-13 14S4 28 4 20z" fill="#7e2c18" />
          <path d="M4 20h26c0 3-6 5-13 5S4 23 4 20z" fill="#e9a319" />
        </svg>
      ))}
    </div>
  )
}

export function TempleFrieze({ className = '' }) {
  return (
    <svg viewBox="0 0 600 90" fill="none" aria-hidden="true" className={className} preserveAspectRatio="xMidYMax meet">
      <g fill="#1c1917" opacity="0.82">
        <path d="M40 90V52l14-8v-8l10-6v-8l8-10 8 10v8l10 6v8l14 8v38z" />
        <path d="M140 90V60l10-6v-22l8-12 8 12v22l10 6v30z" />
        <path d="M200 90V58l12-7v-9l9-5v-7l7-9 7 9v7l9 5v9l12 7v32z" opacity="0.7" />
        <rect x="280" y="66" width="40" height="24" />
        <path d="M280 66l20-14 20 14z" />
        <path d="M340 90V60l10-6v-22l8-12 8 12v22l10 6v30z" opacity="0.7" />
        <path d="M410 90V52l14-8v-8l10-6v-8l8-10 8 10v8l10 6v8l14 8v38z" />
        <path d="M510 90V60l10-6v-22l8-12 8 12v22l10 6v30z" opacity="0.7" />
      </g>
      <rect x="0" y="86" width="600" height="4" fill="#a63a22" />
    </svg>
  )
}
