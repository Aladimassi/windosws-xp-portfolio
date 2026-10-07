import { profile } from "../../../data/profile";

export function ContactApp() {
  return (
    <div className="w98-mail">
      <fieldset className="w98-fieldset">
        <legend>Nouveau message</legend>
        <form
          className="w98-contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent(String(data.get("subject") ?? ""));
            const body = encodeURIComponent(String(data.get("message") ?? ""));
            window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
          }}
        >
          <label>
            À :
            <input type="text" readOnly value={`${profile.name} <${profile.email}>`} className="w98-inset" />
          </label>
          <label>
            Objet :
            <input name="subject" type="text" defaultValue="PFE Data & IA" className="w98-inset" />
          </label>
          <label>
            Message :
            <textarea
              name="message"
              className="w98-inset"
              defaultValue="Bonjour Ala, je vous contacte au sujet de..."
            />
          </label>
          <div className="w98-mail-actions">
            <button type="submit" className="w98-btn w98-outset w98-btn--primary">
              Envoyer
            </button>
            <a href={profile.cvUrl} download={profile.cvFileName} className="w98-btn w98-outset">
              Télécharger le CV
            </a>
          </div>
        </form>
      </fieldset>

      <fieldset className="w98-fieldset w98-mail-links">
        <legend>Carnet d'adresses</legend>
        <div className="w98-contact-links">
          <a href={`mailto:${profile.email}`} className="w98-link-row">
            <span className="w98-link-icon">✉️</span>
            {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="w98-link-row">
            <span className="w98-link-icon">📞</span>
            {profile.phone}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="w98-link-row">
            <span className="w98-link-icon">💼</span>
            LinkedIn — Ala Dimassi
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="w98-link-row">
            <span className="w98-link-icon">🌐</span>
            GitHub — Aladimassi
          </a>
        </div>
      </fieldset>
    </div>
  );
}
