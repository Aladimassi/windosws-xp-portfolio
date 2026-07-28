import { useRef, type ReactNode } from "react";

type DesktopIconProps = {
  label: string;
  icon: ReactNode;
  selected: boolean;
  x?: number;
  y?: number;
  onSelect: () => void;
  onOpen: () => void;
  onContextMenu: (x: number, y: number) => void;
  onDragEnd?: (x: number, y: number) => void;
};

export function DesktopIcon({
  label,
  icon,
  selected,
  x,
  y,
  onSelect,
  onOpen,
  onContextMenu,
  onDragEnd,
}: DesktopIconProps) {
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number; moved: boolean } | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const positioned = x !== undefined && y !== undefined;

  const clearLongPress = () => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  };

  return (
    <div
      className={`w98-icon${selected ? " selected" : ""}${positioned ? " w98-icon--draggable" : ""}`}
      style={positioned ? { position: "absolute", left: x, top: y } : undefined}
      onClick={(e) => {
        e.stopPropagation();
        if (!dragRef.current?.moved) onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect();
        onContextMenu(e.clientX, e.clientY);
      }}
      onPointerDown={(e) => {
        if (e.button === 2) return;
        posRef.current = { x: e.clientX, y: e.clientY };
        dragRef.current = { startX: e.clientX, startY: e.clientY, origX: x ?? 0, origY: y ?? 0, moved: false };

        clearLongPress();
        longPressRef.current = setTimeout(() => {
          onContextMenu(posRef.current.x, posRef.current.y);
        }, 550);

        if (positioned && onDragEnd) {
          const onMove = (ev: PointerEvent) => {
            if (!dragRef.current) return;
            const dx = ev.clientX - dragRef.current.startX;
            const dy = ev.clientY - dragRef.current.startY;
            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
              dragRef.current.moved = true;
              clearLongPress();
            }
          };
          const onUp = (ev: PointerEvent) => {
            if (dragRef.current?.moved && onDragEnd) {
              const dx = ev.clientX - dragRef.current.startX;
              const dy = ev.clientY - dragRef.current.startY;
              onDragEnd(
                Math.max(0, dragRef.current.origX + dx),
                Math.max(0, dragRef.current.origY + dy),
              );
            }
            dragRef.current = null;
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
          };
          window.addEventListener("pointermove", onMove);
          window.addEventListener("pointerup", onUp);
        }
      }}
      onPointerMove={(e) => {
        const dx = Math.abs(e.clientX - posRef.current.x);
        const dy = Math.abs(e.clientY - posRef.current.y);
        if (dx > 8 || dy > 8) clearLongPress();
      }}
      onPointerUp={clearLongPress}
      onPointerLeave={clearLongPress}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen();
      }}
    >
      {icon}
      <span className="w98-icon-label">{label}</span>
    </div>
  );
}
