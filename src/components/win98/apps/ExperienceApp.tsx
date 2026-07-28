import { experiences } from "../../../data/experience";

export function ExperienceApp() {
  return (
    <div className="w98-work-history">
      {experiences.map((exp, i) => (
        <article key={exp.company} className="w98-exp-card w98-outset">
          <div className="w98-exp-header">
            <span className="w98-exp-num">{i + 1}</span>
            <div>
              <h3>{exp.role}</h3>
              <div className="w98-exp-company">{exp.company}</div>
            </div>
          </div>
          <div className="w98-exp-meta">
            📅 {exp.period} &nbsp;·&nbsp; 📍 {exp.location}
          </div>
          <p className="w98-exp-desc">{exp.description}</p>
          <ul className="w98-exp-list">
            {exp.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="w98-skill-tags">
            {exp.technologies.map((t) => (
              <span key={t} className="w98-tag w98-inset">
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
