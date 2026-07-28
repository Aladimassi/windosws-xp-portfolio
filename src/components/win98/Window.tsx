import { useCallback, useRef, type ReactNode, type MouseEvent } from "react";
import { type AppId, useWindowManager } from "../../hooks/useWindowManager";
import { CloseIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from "./icons";

type WindowProps = {
  id: AppId;
  title: string;
  icon?: ReactNode;
  active: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  children: ReactNode;
  menuBar?: ReactNode;
  toolbar?: ReactNode;
  statusText?: string;
  statusPanels?: string[];
  noPadding?: boolean;
};

export function Window({
  id,
  title,
  icon,
  active,
  x,
  y,
  width,
  height,
  minimized,
  maximized,
  zIndex,
  children,
  menuBar,
  toolbar,
  statusText,
  statusPanels,
  noPadding,
}: WindowProps) {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
  } = useWindowManager();

  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(
    null,
  );

  const onTitleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (maximized) return;
      e.preventDefault();
      focusWindow(id);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: x,
        origY: y,
      };

      const onMove = (ev: globalThis.MouseEvent) => {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 60;
        moveWindow(
          id,
          Math.max(0, Math.min(maxX, dragRef.current.origX + dx)),
          Math.max(0, Math.min(maxY, dragRef.current.origY + dy)),
        );
      };

      const onUp = () => {
        dragRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [id, x, y, maximized, focusWindow, moveWindow],
  );

  if (minimized) return null;

  const panels = statusPanels ?? (statusText ? [statusText] : undefined);

  return (
    <div
      className={`w98-window w98-outset${maximized ? " maximized" : ""}${active ? " active" : ""}`}
      style={{
        left: maximized ? 0 : x,
        top: maximized ? 0 : y,
        width: maximized ? "100%" : width,
        height: maximized ? "calc(100% - 28px)" : height,
        zIndex,
      }}
      onMouseDown={() => focusWindow(id)}
    >
      <div
        className={`w98-titlebar ${active ? "active" : "inactive"}`}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={() => toggleMaximize(id)}
      >
        {icon && <span className="w98-titlebar-icon">{icon}</span>}
        <span className="w98-titlebar-text">{title}</span>
        <div className="w98-titlebar-controls">
          <button
            type="button"
            className="w98-btn w98-outset w98-titlebar-btn"
            aria-label="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
          >
            <MinimizeIcon />
          </button>
          <button
            type="button"
            className="w98-btn w98-outset w98-titlebar-btn"
            aria-label={maximized ? "Restore" : "Maximize"}
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(id);
            }}
          >
            {maximized ? <RestoreIcon /> : <MaximizeIcon />}
          </button>
          <button
            type="button"
            className="w98-btn w98-outset w98-titlebar-btn w98-titlebar-close"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {menuBar}
      {toolbar}

      <div className="w98-window-body">
        <div className={`w98-window-content${noPadding ? " w98-window-content--flush" : ""}`}>
          {children}
        </div>
        {panels && (
          <div className="w98-statusbar">
            {panels.map((panel, i) => (
              <div
                key={panel}
                className={`w98-statusbar-panel w98-inset${i === 0 ? " w98-statusbar-panel--main" : ""}`}
              >
                {panel}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
