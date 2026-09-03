// Blueprint-style vector illustrations of the two facilities. Rendered
// instead of stock photography so the visual language stays consistent
// with the coding / schematic aesthetic requested for the whole site.

export function PickleballIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 320" className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="320" fill="#0f1420" />
      {[...Array(13)].map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="320" stroke="#1c2436" strokeWidth="1" />
      ))}
      {[...Array(9)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 40} x2="480" y2={i * 40} stroke="#1c2436" strokeWidth="1" />
      ))}
      <rect x="60" y="40" width="360" height="240" rx="4" fill="none" stroke="#2e6bff" strokeWidth="2.5" />
      <line x1="240" y1="40" x2="240" y2="280" stroke="#2e6bff" strokeWidth="2" />
      <line x1="60" y1="112" x2="420" y2="112" stroke="#2e6bff" strokeWidth="2" />
      <line x1="60" y1="208" x2="420" y2="208" stroke="#2e6bff" strokeWidth="2" />
      <line x1="60" y1="160" x2="420" y2="160" stroke="#5b8cff" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" />
      <circle cx="150" cy="185" r="4" fill="#5b8cff" />
      <circle cx="330" cy="135" r="4" fill="#5b8cff" />
      <text x="60" y="304" fill="#4c76d6" fontSize="13" fontFamily="ui-monospace, monospace" letterSpacing="1">
        // PICKLEBALL_COURT.SCHEMATIC
      </text>
    </svg>
  );
}

export function FutsalIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 320" className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="320" fill="#0f1420" />
      {[...Array(13)].map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="320" stroke="#1c2436" strokeWidth="1" />
      ))}
      {[...Array(9)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 40} x2="480" y2={i * 40} stroke="#1c2436" strokeWidth="1" />
      ))}
      <rect x="40" y="50" width="400" height="220" rx="4" fill="none" stroke="#2e6bff" strokeWidth="2.5" />
      <line x1="240" y1="50" x2="240" y2="270" stroke="#2e6bff" strokeWidth="2" />
      <circle cx="240" cy="160" r="34" fill="none" stroke="#2e6bff" strokeWidth="2" />
      <circle cx="240" cy="160" r="2.5" fill="#5b8cff" />
      <rect x="40" y="120" width="26" height="80" fill="none" stroke="#5b8cff" strokeWidth="2" />
      <rect x="414" y="120" width="26" height="80" fill="none" stroke="#5b8cff" strokeWidth="2" />
      <path d="M40 160 A18 18 0 0 1 58 160" fill="none" stroke="#5b8cff" strokeWidth="1.5" opacity="0.8" />
      <path d="M440 160 A18 18 0 0 0 422 160" fill="none" stroke="#5b8cff" strokeWidth="1.5" opacity="0.8" />
      <text x="40" y="300" fill="#4c76d6" fontSize="13" fontFamily="ui-monospace, monospace" letterSpacing="1">
        // FUTSAL_COURT.SCHEMATIC
      </text>
    </svg>
  );
}

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 520" className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="520" fill="#0c111c" />
      {[...Array(17)].map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="520" stroke="#1a2133" strokeWidth="1" />
      ))}
      {[...Array(14)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 40} x2="640" y2={i * 40} stroke="#1a2133" strokeWidth="1" />
      ))}
      <rect x="60" y="90" width="520" height="220" rx="4" fill="none" stroke="#2e6bff" strokeWidth="2.5" />
      <line x1="320" y1="90" x2="320" y2="310" stroke="#2e6bff" strokeWidth="2" />
      <line x1="60" y1="145" x2="580" y2="145" stroke="#2e6bff" strokeWidth="1.5" />
      <line x1="60" y1="255" x2="580" y2="255" stroke="#2e6bff" strokeWidth="1.5" />
      <line x1="60" y1="200" x2="580" y2="200" stroke="#5b8cff" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.7" />

      <rect x="90" y="360" width="180" height="110" rx="4" fill="none" stroke="#5b8cff" strokeWidth="2" />
      <circle cx="180" cy="415" r="26" fill="none" stroke="#5b8cff" strokeWidth="1.5" />

      <rect x="370" y="360" width="180" height="110" rx="4" fill="none" stroke="#5b8cff" strokeWidth="2" opacity="0.9" />
      <line x1="460" y1="360" x2="460" y2="470" stroke="#5b8cff" strokeWidth="1.5" opacity="0.9" />

      <text x="60" y="60" fill="#5b8cff" fontSize="16" fontFamily="ui-monospace, monospace" letterSpacing="2">
        LAKSAMANA
      </text>
      <text x="60" y="80" fill="#8fa8e8" fontSize="12" fontFamily="ui-monospace, monospace" letterSpacing="4">
        SPORT PARK
      </text>
      <text x="60" y="500" fill="#3a5aa8" fontSize="12" fontFamily="ui-monospace, monospace" letterSpacing="1">
        // INDOOR_FACILITY.RENDER — PICKLEBALL / FUTSAL
      </text>
    </svg>
  );
}
