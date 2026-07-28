import { InfoIcon } from "./icons";

type ShutdownDialogProps = {
  onClose: () => void;
  onRestart: () => void;
};

export function ShutdownDialog({ onClose, onRestart }: ShutdownDialogProps) {
  return (
    <div className="w98-dialog-overlay" role="dialog" aria-modal aria-labelledby="shutdown-title">
      <div className="w98-dialog w98-outset">
        <div className="w98-titlebar active">
          <span className="w98-titlebar-text" id="shutdown-title">
            Shut Down Windows 98
          </span>
        </div>
        <div className="w98-dialog-body">
          <InfoIcon size={32} className="w98-dialog-icon" />
          <div className="w98-dialog-text">
            <p style={{ margin: "0 0 8px", fontWeight: "bold" }}>
              It is now safe to turn off your computer.
            </p>
            <p style={{ margin: "0 0 6px" }}>
              Log off <strong>Ala Dimassi</strong> or shut down the computer?
            </p>
            <p style={{ margin: 0, fontSize: 10, color: "#404040" }}>
              (Windows 98 portfolio — nothing actually shuts down.)
            </p>
          </div>
        </div>
        <div className="w98-dialog-buttons">
          <button type="button" className="w98-btn w98-outset" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="w98-btn w98-outset"
            onClick={() => window.open("https://github.com/Aladimassi", "_blank", "noopener")}
          >
            Visit GitHub
          </button>
          <button type="button" className="w98-btn w98-outset w98-btn--primary" onClick={onRestart}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
