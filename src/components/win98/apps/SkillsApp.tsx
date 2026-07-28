import { skillCategories } from "../../../data/skills";
import { ControlPanelIcon } from "../icons";

const CATEGORY_ICONS = ["💻", "🎨", "⚙️", "🧠", "🔧"];

export function SkillsApp() {
  return (
    <div className="w98-cpanel">
      <p className="w98-cpanel-intro">
        Pick an applet to view or configure a portfolio setting.
      </p>
      <div className="w98-cpanel-grid">
        {skillCategories.map((cat, i) => (
          <div key={cat.title} className="w98-cpanel-applet w98-outset">
            <div className="w98-cpanel-applet-icon">
              {i === 0 ? <ControlPanelIcon size={32} /> : <span className="w98-cpanel-emoji">{CATEGORY_ICONS[i] ?? "📦"}</span>}
            </div>
            <div className="w98-cpanel-applet-body">
              <h3>{cat.title}</h3>
              <div className="w98-skill-tags">
                {cat.skills.map((skill) => (
                  <span key={skill.name} className="w98-tag w98-inset">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
