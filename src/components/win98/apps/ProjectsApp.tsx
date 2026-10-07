import { useState } from "react";
import { academicProjects, featuredProjects, projects, type Project } from "../../../data/projects";
import { projectImageUrl } from "../../../lib/projectImages";
import { FolderClosedIcon, FolderIcon } from "../icons";
import { Toolbar } from "../Toolbar";
import { PixeliumDiagram } from "../../recruiter/PixeliumDiagram";

export function ProjectsApp() {
  const [selectedId, setSelectedId] = useState<string | null>(
    projects.find((p) => p.featured)?.id ?? projects[0]?.id ?? null,
  );

  const selected = projects.find((p) => p.id === selectedId);
  const selectedIndex = projects.findIndex((p) => p.id === selectedId);

  const goBack = () => {
    if (selectedIndex > 0) setSelectedId(projects[selectedIndex - 1]!.id);
  };

  const goForward = () => {
    if (selectedIndex < projects.length - 1) setSelectedId(projects[selectedIndex + 1]!.id);
  };

  return (
    <div className="w98-explorer-app">
      <Toolbar
        address={`C:\\Projects\\${selected ? (selected.title.split("—")[0]?.trim() ?? selected.title) : ""}`}
        buttons={[
          { label: "Back", icon: <span className="w98-tb-icon">◀</span>, disabled: selectedIndex <= 0, onClick: goBack },
          { label: "Forward", icon: <span className="w98-tb-icon w98-tb-icon--muted">▶</span>, disabled: selectedIndex >= projects.length - 1, onClick: goForward },
          { label: "Up", icon: <span className="w98-tb-icon">▲</span>, onClick: () => setSelectedId(null) },
        ]}
      />

      <div className="w98-explorer">
        <div className="w98-explorer-tree w98-inset">
          <div className="w98-tree-header">Dossiers</div>
          {([["Projets phares", featuredProjects], ["Projets académiques", academicProjects]] as [string, Project[]][]).map(([label, list]) => (
            <div key={label}>
              <div className="w98-tree-item w98-tree-item--root">
                <FolderClosedIcon size={14} />
                {label}
              </div>
              {list.map((p) => (
                <div
                  key={p.id}
                  className={`w98-tree-item${selectedId === p.id ? " selected" : ""}`}
                  style={{ paddingLeft: 22 }}
                  onClick={() => setSelectedId(p.id)}
                  onDoubleClick={() => window.open(p.github, "_blank", "noopener")}
                >
                  <FolderClosedIcon size={14} />
                  {p.title.split("—")[0]?.trim() ?? p.title}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="w98-explorer-splitter" aria-hidden />

        <div className="w98-explorer-content w98-inset">
          {selected ? (
            <div className="w98-project-detail">
              <img
                src={projectImageUrl(selected.github)}
                alt=""
                className="w98-project-screenshot w98-inset"
                loading="lazy"
              />
              <div className="w98-project-header">
                <FolderIcon size={32} />
                <div>
                  <h2 className="w98-project-title">{selected.title}</h2>
                  {selected.featured && <span className="w98-badge">Projet phare</span>}
                </div>
              </div>
              <p className="w98-project-desc">{selected.description}</p>
              {selected.metrics && selected.metrics.length > 0 && (
                <ul className="w98-exp-list" style={{ margin: "6px 0 10px" }}>
                  {selected.metrics.map((m) => (
                    <li key={m}><strong>{m}</strong></li>
                  ))}
                </ul>
              )}
              {selected.id === "pixelium" && (
                <div className="w98-inset" style={{ background: "#fff", padding: 8, margin: "6px 0 10px" }}>
                  <PixeliumDiagram />
                </div>
              )}
              <div className="w98-project-stack">
                {selected.stack.map((tech) => (
                  <span key={tech} className="w98-tag w98-outset">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="w98-project-actions">
                <button
                  type="button"
                  className="w98-btn w98-outset w98-btn--primary"
                  onClick={() => window.open(selected.github, "_blank", "noopener")}
                >
                  Voir sur GitHub
                </button>
                {selected.demo && (
                  <button
                    type="button"
                    className="w98-btn w98-outset"
                    onClick={() => window.open(selected.demo, "_blank", "noopener")}
                  >
                    Démo en ligne
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="w98-icon-view">
              {projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="w98-icon-view-item"
                  onClick={() => setSelectedId(p.id)}
                  onDoubleClick={() => window.open(p.github, "_blank", "noopener")}
                >
                  <FolderIcon size={32} />
                  <span>{p.title.split("—")[0]?.trim() ?? p.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
