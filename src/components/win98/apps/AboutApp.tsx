import { profile } from "../../../data/profile";
import { UserIcon } from "../icons";

export function AboutApp() {
  return (
    <div className="w98-sysprops">
      <div className="w98-sysprops-tabs">
        <button type="button" className="w98-tab w98-tab--active">
          General
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
            <UserIcon size={48} />
          </div>
          <div className="w98-sysprops-info">
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">Registered to:</span>
              <strong>{profile.name}</strong>
            </div>
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">Organization:</span>
              <span>ESPRIT — Computer Science</span>
            </div>
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">Role:</span>
              <span>{profile.title}</span>
            </div>
            <div className="w98-sysprops-row">
              <span className="w98-sysprops-label">Location:</span>
              <span>{profile.location}</span>
            </div>
            <p className="w98-sysprops-desc">
              Étudiant en ingénierie informatique passionné par l&apos;IA, le machine
              learning et le full-stack. Stages chez Pixelium (A2A agent commerce) et
              Talan Tunisie (RAG, LLMs).
            </p>
          </div>
        </div>

        <fieldset className="w98-fieldset w98-sysprops-specs">
          <legend>System</legend>
          <div className="w98-spec-grid">
            <div className="w98-spec-item">
              <span>CPU:</span> Python · Java · TypeScript
            </div>
            <div className="w98-spec-item">
              <span>RAM:</span> React · FastAPI · LangChain
            </div>
            <div className="w98-spec-item">
              <span>GPU:</span> XGBoost · Gemini · RAG
            </div>
            <div className="w98-spec-item">
              <span>OS:</span> Microsoft Windows 98
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
