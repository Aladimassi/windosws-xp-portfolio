import { profile } from "../../../data/profile";
import { type AppId, useWindowManager } from "../../../hooks/useWindowManager";
import { ComputerIcon, FolderIcon } from "../icons";

type Node = { name: string; appId?: AppId; url?: string; icon?: "pc" | "folder" };

const NODES: Node[] = [
  { name: "ESPRIT (School)", url: "https://esprit.tn", icon: "pc" },
  { name: "Pixelium", appId: "experience", icon: "folder" },
  { name: "Talan Tunisie", appId: "experience", icon: "folder" },
  { name: "GitHub — Aladimassi", url: profile.github, icon: "pc" },
  { name: "LinkedIn", url: profile.linkedin, icon: "pc" },
  { name: "Whole Network", appId: "ie", icon: "folder" },
];

export function NetworkApp() {
  const { openWindow } = useWindowManager();

  const open = (n: Node) => {
    if (n.url) window.open(n.url, "_blank", "noopener");
    else if (n.appId) openWindow(n.appId);
  };

  return (
    <div className="w98-network">
      <p className="w98-network-hint">Computers near you on the network:</p>
      <div className="w98-network-grid">
        {NODES.map((n) => (
          <button key={n.name} type="button" className="w98-network-item" onDoubleClick={() => open(n)}>
            {n.icon === "pc" ? <ComputerIcon size={32} /> : <FolderIcon size={32} />}
            <span>{n.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
