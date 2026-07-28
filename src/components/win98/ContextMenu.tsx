import { useEffect, useRef, type ReactNode } from "react";

export type ContextMenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  separator?: boolean;
  bold?: boolean;
  children?: ContextMenuItem[];
  onClick?: () => void;
};

type ContextMenuProps = {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
};

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    let left = x;
    let top = y;

    if (left + rect.width > window.innerWidth - 4) {
      left = window.innerWidth - rect.width - 4;
    }
    if (top + rect.height > window.innerHeight - 32) {
      top = window.innerHeight - rect.height - 32;
    }

    el.style.left = `${Math.max(4, left)}px`;
    el.style.top = `${Math.max(4, top)}px`;
  }, [x, y]);

  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const activate = (item: ContextMenuItem) => {
    if (item.disabled || item.children) return;
    item.onClick?.();
    onClose();
  };

  const renderItem = (item: ContextMenuItem) => {
    if (item.separator) {
      return <div key={item.id} className="w98-ctx-separator" />;
    }

    if (item.children) {
      return (
        <div key={item.id} className="w98-ctx-flyout">
          <div
            className={`w98-ctx-item${item.disabled ? " w98-ctx-item--disabled" : ""}${item.bold ? " w98-ctx-item--bold" : ""}`}
          >
            {item.icon && <span className="w98-ctx-icon">{item.icon}</span>}
            <span>{item.label}</span>
            <span className="w98-ctx-arrow">▶</span>
          </div>
          <div className="w98-ctx-submenu w98-outset">
            {item.children.map(renderItem)}
          </div>
        </div>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        className={`w98-ctx-item${item.disabled ? " w98-ctx-item--disabled" : ""}${item.bold ? " w98-ctx-item--bold" : ""}`}
        disabled={item.disabled}
        onClick={() => activate(item)}
      >
        {item.icon && <span className="w98-ctx-icon">{item.icon}</span>}
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <div
      ref={ref}
      className="w98-context-menu w98-outset"
      style={{ left: x, top: y }}
      role="menu"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map(renderItem)}
    </div>
  );
}
