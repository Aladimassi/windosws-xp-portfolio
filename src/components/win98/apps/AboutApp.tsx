import { profile } from "../../../data/profile";

export function AboutApp() {
  return (
    <div className="w98-sysprops">
      <div className="w98-sysprops-tabs">
        <button type="button" className="w98-tab w98-tab--active">
          Général
        </button>
        <button type="button" className="w98-tab" disabled>
          Device Manager
        </button>
        <button type="button" className="w98-tab" disabled>
          Performance
        </button>
      </div>

      <div className="w98-sysprops-body w98-inset">
        <div className="w98-sysprops-main">
          <div className="w98-sysprops-pc">
            <img
              src={profile.avatar}
              alt={profile.name}
              width={64}
              height={64}
              className="w98-inset"
              style={{ objectFit: "cover", width: 64, height: 64 }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div className="w98-sysprops-info">
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">Nom :</span>
              <strong>{profile.name}</strong>
            </div>
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">École :</span>
              <span>ESPRIT — Cycle ingénieur</span>
            </div>
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">Profil :</span>
              <span>{profile.title}</span>
            </div>
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">Lieu :</span>
              <span>{profile.location}</span>
            </div>
            <p className="w98-sysprops-desc">{profile.tagline}</p>
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">Recherche :</span>
              <strong>{profile.target}</strong>
            </div>
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">Langues :</span>
              <span>{profile.languages}</span>
            </div>
          </div>
        </div>

        <fieldset className="w98-fieldset w98-sysprops-specs">
          <legend>Compétences clés</legend>
          <div className="w98-spec-grid">
            <div className="w98-spec-item">
              <span>IA :</span> LLM · RAG · multi-agents
            </div>
            <div className="w98-spec-item">
              <span>ML :</span> XGBoost · scikit-learn · MLflow
            </div>
            <div className="w98-spec-item">
              <span>Data :</span> Power BI · Talend · SQL
            </div>
            <div className="w98-spec-item">
              <span>Cloud :</span> Azure · Docker
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
