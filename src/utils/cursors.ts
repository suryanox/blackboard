export const createChalkCursor = (): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
      <defs>
        <linearGradient id="chalkBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#e8e8e8"/>
          <stop offset="30%" style="stop-color:#ffffff"/>
          <stop offset="70%" style="stop-color:#f5f5f5"/>
          <stop offset="100%" style="stop-color:#d0d0d0"/>
        </linearGradient>
        <filter id="chalkTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
      <g transform="rotate(-30, 16, 40)">
        <rect x="12" y="8" width="8" height="32" rx="1" fill="url(#chalkBody)" filter="url(#chalkTexture)"/>
        <ellipse cx="16" cy="40" rx="4" ry="2" fill="#f0f0f0"/>
        <rect x="12" y="8" width="8" height="4" rx="1" fill="#e0e0e0" opacity="0.5"/>
      </g>
    </svg>
  `;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 4 44, crosshair`;
};

export const createDusterCursor = (): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 48 32">
      <defs>
        <linearGradient id="woodHandle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#a0522d"/>
          <stop offset="50%" style="stop-color:#8b4513"/>
          <stop offset="100%" style="stop-color:#654321"/>
        </linearGradient>
        <linearGradient id="feltPad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#d3d3d3"/>
          <stop offset="100%" style="stop-color:#a9a9a9"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="14" rx="2" fill="url(#woodHandle)"/>
      <rect x="4" y="3" width="40" height="3" rx="1" fill="#b8860b" opacity="0.3"/>
      <rect x="6" y="18" width="36" height="10" rx="1" fill="url(#feltPad)"/>
      <line x1="10" y1="20" x2="10" y2="26" stroke="#c0c0c0" stroke-width="1"/>
      <line x1="14" y1="20" x2="14" y2="26" stroke="#c0c0c0" stroke-width="1"/>
      <line x1="18" y1="20" x2="18" y2="26" stroke="#c0c0c0" stroke-width="1"/>
      <line x1="22" y1="20" x2="22" y2="26" stroke="#c0c0c0" stroke-width="1"/>
      <line x1="26" y1="20" x2="26" y2="26" stroke="#c0c0c0" stroke-width="1"/>
      <line x1="30" y1="20" x2="30" y2="26" stroke="#c0c0c0" stroke-width="1"/>
      <line x1="34" y1="20" x2="34" y2="26" stroke="#c0c0c0" stroke-width="1"/>
      <line x1="38" y1="20" x2="38" y2="26" stroke="#c0c0c0" stroke-width="1"/>
    </svg>
  `;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 24 28, grab`;
};
