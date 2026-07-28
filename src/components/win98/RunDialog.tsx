import { InfoIcon } from "./icons";

type RunDialogProps = {
  onClose: () => void;
  onRun: (command: string) => void;
};

export function RunDialog({ onClose, onRun }: RunDialogProps) {
  return (
    <div className="w98-dialog-overlay" role="dialog" aria-modal aria-labelledby="run-title">
      <div className="w98-dialog w98-outset">
        <div className="w98-titlebar active">
          <span className="w98-titlebar-text" id="run-title">
            Run
          </span>
        </div>
        <div className="w98-dialog-body">
          <InfoIcon size={32} className="w98-dialog-icon" />
          <div className="w98-dialog-text w98-run-dialog">
            <p style={{ margin: "0 0 8px" }}>
              Type the name of a program, folder, document, or Internet resource, and Windows will
              open it for you.
            </p>
            <label className="w98-run-label">
              Open:
              <input
                type="text"
                className="w98-inset w98-run-input"
                defaultValue="portfolio"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onRun((e.target as HTMLInputElement).value);
                  }
                }}
              />
            </label>
            <p className="w98-run-hint">Try: about, projects, minesweeper, github</p>
          </div>
        </div>
        <div className="w98-dialog-buttons">
          <button
            type="button"
            className="w98-btn w98-outset w98-btn--primary"
            onClick={() => {
              const input = document.querySelector<HTMLInputElement>(".w98-run-input");
              onRun(input?.value ?? "");
            }}
          >
            OK
          </button>
          <button type="button" className="w98-btn w98-outset" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
