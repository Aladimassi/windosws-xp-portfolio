import { type ReactNode } from "react";

type ToolbarButton = {
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

type ToolbarProps = {
  buttons: ToolbarButton[];
  address?: string;
};

export function Toolbar({ buttons, address }: ToolbarProps) {
  return (
    <div className="w98-toolbar-wrap">
      <div className="w98-toolbar">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            className="w98-btn w98-outset w98-toolbar-btn"
            disabled={btn.disabled}
            onClick={btn.onClick}
            title={btn.label}
          >
            {btn.icon ?? btn.label}
          </button>
        ))}
      </div>
      {address && (
        <div className="w98-address-bar">
          <span className="w98-address-label">Address</span>
          <div className="w98-address-field w98-inset">{address}</div>
        </div>
      )}
    </div>
  );
}
