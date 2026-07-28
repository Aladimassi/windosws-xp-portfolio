import { profile } from "../../../data/profile";

export function ContactApp() {
  const mailto = `mailto:${profile.email}?subject=Hello%20${encodeURIComponent(profile.name)}`;

  return (
    <div className="w98-mail">
      <fieldset className="w98-fieldset">
        <legend>New Message</legend>
        <form
          className="w98-contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
        >
          <label>
            To:
            <input type="text" readOnly value={`${profile.name} <${profile.email}>`} className="w98-inset" />
          </label>
          <label>
            Subject:
            <input type="text" defaultValue="Collaboration / Opportunity" className="w98-inset" />
          </label>
          <label>
            Message:
            <textarea
              className="w98-inset"
              defaultValue="Hi Ala, I'd like to get in touch about..."
            />
          </label>
          <div className="w98-mail-actions">
            <button type="submit" className="w98-btn w98-outset w98-btn--primary">
              Send
            </button>
            <button type="button" className="w98-btn w98-outset">
              Attach...
            </button>
          </div>
        </form>
      </fieldset>

      <fieldset className="w98-fieldset w98-mail-links">
        <legend>Address Book</legend>
        <div className="w98-contact-links">
          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="w98-link-row">
            <span className="w98-link-icon">🏠</span>
            Portfolio — ala-dimassi-win98.vercel.app
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="w98-link-row">
            <span className="w98-link-icon">🌐</span>
            GitHub — Aladimassi
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="w98-link-row">
            <span className="w98-link-icon">💼</span>
            LinkedIn — Ala Dimassi
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="w98-link-row">
            <span className="w98-link-icon">📞</span>
            {profile.phone}
          </a>
          <a href={profile.cvUrl} download={profile.cvFileName} className="w98-link-row">
            <span className="w98-link-icon">📄</span>
            Download CV
          </a>
        </div>
      </fieldset>
    </div>
  );
}
