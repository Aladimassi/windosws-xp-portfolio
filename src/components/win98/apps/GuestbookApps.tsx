import { profile } from "../../../data/profile";

export function CvViewerApp() {
  return (
    <iframe
      title="CV Ala Dimassi"
      src={profile.cvUrl}
      className="w98-cv-frame w98-inset"
    />
  );
}

export function GuestbookApp() {
  const mailto = `mailto:${profile.email}?subject=Portfolio%20Guestbook&body=Hi%20Ala%2C%20`;

  return (
    <div className="w98-guestbook">
      <p>Sign my guestbook — your message opens in your email client.</p>
      <fieldset className="w98-fieldset">
        <legend>Leave a message</legend>
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
            <input name="name" required className="w98-inset" placeholder="Your name" />
          </label>
          <label>
            Message:
            <textarea name="message" required className="w98-inset" placeholder="Great portfolio!" rows={5} />
          </label>
          <button type="submit" className="w98-btn w98-outset w98-btn--primary">
            Sign Guestbook
          </button>
        </form>
      </fieldset>
    </div>
  );
}
