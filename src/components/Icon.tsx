// Thin-stroke line icons matching dvo's hairline UI.
const paths: Record<string, React.ReactNode> = {
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
  vip: <><circle cx="12" cy="7" r="4" /><path d="M4 21c0-4 3-6.5 6.5-7" /><path d="m16.5 14 1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.3 1.3.4-2.6-1.9-1.8 2.7-.4z" /></>,
  users: <><circle cx="12" cy="7" r="3" /><circle cx="5" cy="10" r="2.2" /><circle cx="19" cy="10" r="2.2" /><path d="M6.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M1.5 20c0-2.5 1.5-4.3 3.5-4.6M22.5 20c0-2.5-1.5-4.3-3.5-4.6" /></>,
  building: <><rect x="4" y="3" width="10" height="18" /><path d="M14 9h6v12H2M7 7h1M10 7h1M7 11h1M10 11h1M7 15h1M10 15h1M17 13h1M17 17h1" /></>,
  pin: <><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
  doc: <><path d="M6 2h9l5 5v15H6z" /><path d="M14 2v6h6M9 13h8M9 17h8" /></>,
  office: <><rect x="5" y="3" width="14" height="18" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M10 21v-5h4v5M3 21h18" /></>,
  wand: <><path d="m4 20 11-11 2 2L6 22z" /><path d="M15 3v2M20 8h-2M18.5 4.5 17 6M11 5l1 1.5M19 12l-1.5-1" /></>,
  diamond: <><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  tools: <><path d="M14.7 6.3a4 4 0 0 0 5 5L11 20a2 2 0 0 1-3-3z" /><path d="m3 3 6 6M3 3l2 0 0 2" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></>,
  shield: <><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  star: <path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  coin: <><circle cx="12" cy="12" r="9" /><path d="M15 9c-.5-1-1.6-1.5-3-1.5-1.8 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2-1.5 0-2.6-.6-3.1-1.6M12 6v1.5M12 16.5V18" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></>,
  factory: <><path d="M2 21V10l6 4V10l6 4V6h8v15z" /><path d="M6 17h2M11 17h2M16 17h2" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M5 5l14 14M19 5 5 19" />,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></>,
  download: <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />,
  youtube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></>,
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8z" />,
};

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
