/** Pixel-style icons for the Win98 desktop */

type IconProps = { size?: number; className?: string };

export function WinLogo({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden>
      <rect x="1" y="1" width="6" height="6" fill="#ff0000" />
      <rect x="9" y="1" width="6" height="6" fill="#00a651" />
      <rect x="1" y="9" width="6" height="6" fill="#0078d7" />
      <rect x="9" y="9" width="6" height="6" fill="#ffcc00" />
      <rect x="1" y="1" width="6" height="6" fill="none" stroke="#000" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function ComputerIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="3" y="5" width="26" height="17" rx="1" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <rect x="5" y="7" width="22" height="13" fill="#008080" />
      <rect x="7" y="9" width="8" height="6" fill="#000080" opacity="0.5" />
      <rect x="11" y="21" width="10" height="2" fill="#808080" />
      <rect x="7" y="23" width="18" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <rect x="8" y="24" width="16" height="1" fill="#fff" opacity="0.5" />
    </svg>
  );
}

export function FolderIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M2 10h11l2 3h15v14H2V10z" fill="#ffcc00" stroke="#000" strokeWidth="1" />
      <path d="M2 13h28v11H2V13z" fill="#ffff00" />
      <path d="M2 10h11l2 3H2V10z" fill="#ffe566" />
      <rect x="4" y="16" width="10" height="1" fill="#cc9900" opacity="0.4" />
    </svg>
  );
}

export function FolderClosedIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden>
      <path d="M1 5h6l1 2h7v7H1V5z" fill="#ffcc00" stroke="#000" strokeWidth="0.75" />
      <path d="M1 7h14v7H1V7z" fill="#ffff00" />
    </svg>
  );
}

export function NotepadIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="6" y="2" width="20" height="28" fill="#fff" stroke="#000" strokeWidth="1" />
      <rect x="8" y="4" width="16" height="2" fill="#0000ff" />
      <line x1="10" y1="10" x2="22" y2="10" stroke="#808080" strokeWidth="1" />
      <line x1="10" y1="14" x2="22" y2="14" stroke="#808080" strokeWidth="1" />
      <line x1="10" y1="18" x2="22" y2="18" stroke="#808080" strokeWidth="1" />
      <line x1="10" y1="22" x2="18" y2="22" stroke="#808080" strokeWidth="1" />
      <rect x="6" y="2" width="3" height="28" fill="#c0c0c0" opacity="0.3" />
    </svg>
  );
}

export function ControlPanelIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="3" y="3" width="26" height="26" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <circle cx="16" cy="16" r="7" fill="none" stroke="#000080" strokeWidth="2" />
      <rect x="14" y="5" width="4" height="5" fill="#808080" stroke="#000" strokeWidth="0.5" />
      <rect x="14" y="22" width="4" height="5" fill="#808080" stroke="#000" strokeWidth="0.5" />
      <rect x="5" y="14" width="5" height="4" fill="#808080" stroke="#000" strokeWidth="0.5" />
      <rect x="22" y="14" width="5" height="4" fill="#808080" stroke="#000" strokeWidth="0.5" />
      <circle cx="16" cy="16" r="2" fill="#000080" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="3" y="10" width="26" height="18" fill="#804000" stroke="#000" strokeWidth="1" />
      <rect x="3" y="10" width="26" height="4" fill="#a0522d" />
      <rect x="11" y="6" width="10" height="6" fill="none" stroke="#000" strokeWidth="1" />
      <rect x="14" y="17" width="4" height="5" fill="#ffd700" stroke="#000" strokeWidth="0.75" />
      <rect x="5" y="14" width="22" height="1" fill="#fff" opacity="0.2" />
    </svg>
  );
}

export function MailIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="3" y="8" width="26" height="18" fill="#fff" stroke="#000" strokeWidth="1" />
      <path d="M3 8l13 11L29 8" fill="none" stroke="#000" strokeWidth="1" />
      <path d="M3 26l10-9M29 26l-10-9" fill="none" stroke="#808080" strokeWidth="0.75" />
      <rect x="5" y="10" width="22" height="2" fill="#0000ff" opacity="0.15" />
    </svg>
  );
}

export function RecycleIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="9" y="3" width="14" height="3" rx="1" fill="#808080" stroke="#000" strokeWidth="0.75" />
      <path d="M7 8h18l-2 21H9L7 8z" fill="#008000" stroke="#000" strokeWidth="1" />
      <path d="M7 8h18" stroke="#004000" strokeWidth="1" />
      <line x1="12" y1="12" x2="11" y2="26" stroke="#004000" strokeWidth="1.5" />
      <line x1="16" y1="12" x2="16" y2="26" stroke="#004000" strokeWidth="1.5" />
      <line x1="20" y1="12" x2="21" y2="26" stroke="#004000" strokeWidth="1.5" />
      <ellipse cx="16" cy="8" rx="8" ry="1" fill="#fff" opacity="0.25" />
    </svg>
  );
}

export function InfoIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="14" fill="#fff" stroke="#000" strokeWidth="1" />
      <circle cx="16" cy="16" r="12" fill="none" stroke="#000080" strokeWidth="1" opacity="0.3" />
      <rect x="14" y="8" width="4" height="12" fill="#000080" />
      <rect x="14" y="22" width="4" height="4" fill="#000080" />
    </svg>
  );
}

export function DocumentIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M7 2h13l7 7v21H7V2z" fill="#fff" stroke="#000" strokeWidth="1" />
      <path d="M20 2v7h7" fill="#e8e8e8" stroke="#000" strokeWidth="0.75" />
      <line x1="11" y1="14" x2="25" y2="14" stroke="#000080" strokeWidth="1" />
      <line x1="11" y1="18" x2="25" y2="18" stroke="#808080" strokeWidth="0.75" />
      <line x1="11" y1="22" x2="22" y2="22" stroke="#808080" strokeWidth="0.75" />
    </svg>
  );
}

export function MinesweeperIcon({ size = 32, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="2" y="2" width="28" height="28" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      {[
        [5, 5], [13, 5], [21, 5],
        [5, 13], [13, 13], [21, 13],
        [5, 21], [13, 21], [21, 21],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#bdbdbd" stroke="#808080" strokeWidth="0.5" />
      ))}
      <circle cx="16" cy="14" r="4" fill="#ffcc00" stroke="#000" strokeWidth="0.75" />
      <circle cx="14" cy="13" r="0.8" fill="#000" />
      <circle cx="18" cy="13" r="0.8" fill="#000" />
      <path d="M13 16 Q16 18 19 16" fill="none" stroke="#000" strokeWidth="0.75" />
    </svg>
  );
}

export function FileIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden>
      <rect x="3" y="1" width="10" height="14" fill="#fff" stroke="#000" strokeWidth="1" />
      <line x1="5" y1="5" x2="11" y2="5" stroke="#000" strokeWidth="0.5" />
      <line x1="5" y1="8" x2="11" y2="8" stroke="#000" strokeWidth="0.5" />
    </svg>
  );
}

export function DriveIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden>
      <rect x="1" y="4" width="14" height="9" fill="#c0c0c0" stroke="#000" strokeWidth="0.75" />
      <rect x="2" y="5" width="12" height="2" fill="#808080" />
      <rect x="6" y="9" width="4" height="2" fill="#404040" />
    </svg>
  );
}

export function MinimizeIcon({ className }: { className?: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className={className} aria-hidden>
      <rect x="1" y="6" width="6" height="1" fill="#000" />
    </svg>
  );
}

export function MaximizeIcon({ className }: { className?: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className={className} aria-hidden>
      <rect x="1" y="1" width="6" height="6" fill="none" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

export function RestoreIcon({ className }: { className?: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className={className} aria-hidden>
      <rect x="2" y="0" width="5" height="5" fill="none" stroke="#000" strokeWidth="1" />
      <rect x="0" y="2" width="5" height="5" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className={className} aria-hidden>
      <path d="M1 1l6 6M7 1L1 7" stroke="#000" strokeWidth="1.5" />
    </svg>
  );
}

export function BackIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden>
      <path d="M10 3L5 8l5 5" fill="none" stroke="#000" strokeWidth="1.5" />
    </svg>
  );
}

export function ForwardIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden>
      <path d="M6 3l5 5-5 5" fill="none" stroke="#808080" strokeWidth="1.5" />
    </svg>
  );
}

export function UpIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden>
      <path d="M8 4v8M4 8l4-4 4 4" fill="none" stroke="#000" strokeWidth="1.25" />
    </svg>
  );
}

export function UserIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="4" y="6" width="40" height="32" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <rect x="8" y="10" width="32" height="22" fill="#008080" />
      <circle cx="24" cy="18" r="5" fill="#ffd4a3" />
      <ellipse cx="24" cy="32" rx="8" ry="5" fill="#000080" />
    </svg>
  );
}
