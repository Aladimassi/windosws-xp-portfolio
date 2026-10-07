import { profile } from "../../../data/profile";

export function CvViewerApp() {
  return (
    <div className="w98-cv-viewer">
      <div className="w98-cv-toolbar w98-outset">
        <a href={profile.cvUrl} download={profile.cvFileName} className="w98-btn w98-outset w98-btn--primary">
          Télécharger le CV (PDF)
        </a>
        <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="w98-btn w98-outset">
          Ouvrir dans un onglet
        </a>
      </div>
      <iframe title="CV Ala Dimassi" src={profile.cvUrl} className="w98-cv-frame w98-inset" />
    </div>
  );
}

export function GuestbookApp() {
  const mailto = `mailto:${profile.email}?subject=Portfolio%20Guestbook&body=Hi%20Ala%2C%20`;

  return (
    <div className="w98-guestbook">
      <p>Laissez un mot : votre message s'ouvre dans votre messagerie.</p>
      <fieldset className="w98-fieldset">
        <legend>Laisser un message</legend>
        <form
          className="w98-contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = fd.get("name") as string;
            const msg = fd.get("message") as string;
            window.location.href = `${mailto}${encodeURIComponent(`I'm ${name}.\n\n${msg}`)}`;
          }}
        >
          <label>
            Name:
            <input name="name" required className="w98-inset" placeholder="Votre nom" />
          </label>
          <label>
            Message:
            <textarea name="message" required className="w98-inset" placeholder="Super portfolio !" rows={5} />
          </label>
          <button type="submit" className="w98-btn w98-outset w98-btn--primary">
            Signer le livre d'or
          </button>
        </form>
      </fieldset>
    </div>
  );
}
