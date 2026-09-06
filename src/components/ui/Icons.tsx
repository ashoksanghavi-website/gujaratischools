type P = { className?: string; size?: number };

const s = (size = 20) => ({ width: size, height: size, viewBox: "0 0 24 24" });

export const IconSearch = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconClose = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);

export const IconMenu = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);

export const IconArrow = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconDownload = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconExternal = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M14 4h6v6M20 4l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconDoc = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14 2v4h4M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const IconVideo = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
  </svg>
);

export const IconLink = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconFacebook = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.5-1.46H17V3.96c-.28-.04-1.23-.12-2.35-.12-2.32 0-3.9 1.42-3.9 4.02V10H8v3h2.75v8h2.75z" />
  </svg>
);

export const IconTwitter = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.2 3h3.3l-7.2 8.2L22.7 21h-6.6l-5.2-6.8L4.9 21H1.6l7.7-8.8L1.6 3h6.8l4.7 6.2L18.2 3zm-1.2 16h1.8L7.1 4.9H5.2L17 19z" />
  </svg>
);

export const IconYoutube = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="currentColor" aria-hidden="true">
    <path d="M23 12s0-3.2-.4-4.7c-.23-.83-.9-1.5-1.74-1.72C19.32 5.2 12 5.2 12 5.2s-7.32 0-8.86.38c-.83.22-1.5.9-1.73 1.72C1 8.8 1 12 1 12s0 3.2.41 4.7c.23.83.9 1.5 1.73 1.72C4.68 18.8 12 18.8 12 18.8s7.32 0 8.86-.38c.83-.22 1.5-.9 1.74-1.72C23 15.2 23 12 23 12zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);

export const IconFilter = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);

export const IconChevron = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconHome = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M4 10.5L12 4l8 6.5V19a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);

export const IconLibrary = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M5 4h5v16H5zM14 4h5v16h-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M5 9h5M14 9h5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export const IconNews = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M7 9h6M7 13h10M7 16h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconMail = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconPhone = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M5 4h3.5l1.8 4.2-2.1 1.5a12 12 0 006.1 6.1l1.5-2.1L20 15.5V19a1 1 0 01-1.1 1A15.5 15.5 0 014 5.1 1 1 0 015 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);

export const IconCheck = ({ className, size }: P) => (
  <svg {...s(size)} className={className} fill="none" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
