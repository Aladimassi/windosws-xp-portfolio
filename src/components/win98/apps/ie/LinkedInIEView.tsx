import { useEffect, useRef } from "react";
import { profile } from "../../../../data/profile";
import { experiences } from "../../../../data/experience";
import { linkedInVanity, openExternal } from "../../../../lib/ieBrowser";

const BADGE_SCRIPT = "https://platform.linkedin.com/badges/js/profile.js";

function loadLinkedInBadge(container: HTMLElement, vanity: string) {
  container.innerHTML = "";
  const badge = document.createElement("div");
  badge.className = "badge-base LI-profile-badge";
  badge.setAttribute("data-locale", "en_US");
  badge.setAttribute("data-size", "medium");
  badge.setAttribute("data-theme", "light");
  badge.setAttribute("data-type", "VERTICAL");
  badge.setAttribute("data-vanity", vanity);
  badge.setAttribute("data-version", "v1");
  container.appendChild(badge);

  if (!document.querySelector(`script[src="${BADGE_SCRIPT}"]`)) {
    const script = document.createElement("script");
    script.src = BADGE_SCRIPT;
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  } else {
    const w = window as unknown as { IN?: { parse?: () => void } };
    w.IN?.parse?.();
  }
}

export function LinkedInIEView({ url }: { url: string }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const vanity = linkedInVanity(url) || linkedInVanity(profile.linkedin);

  useEffect(() => {
    if (badgeRef.current && vanity) loadLinkedInBadge(badgeRef.current, vanity);
  }, [vanity, url]);

  return (
    <div className="w98-ie-page">
      <div className="w98-ie-page-banner">
        <span>
          <strong>LinkedIn</strong> blocks iframes. Using LinkedIn&apos;s official badge + portfolio data.
        </span>
        <button type="button" className="w98-btn w98-outset w98-ie-page-open" onClick={() => openExternal(url)}>
          Open real site ↗
        </button>
      </div>

      <div className="w98-ie-li">
        <header className="w98-ie-li-cover w98-inset">
          <div className="w98-ie-li-profile">
            <img src={profile.avatar} alt="" className="w98-ie-li-avatar" />
            <div>
              <h1>{profile.name}</h1>
              <p>{profile.title}</p>
              <p className="w98-ie-li-loc">{profile.location} · {profile.school}</p>
            </div>
          </div>
        </header>

        <div className="w98-ie-li-body">
          <section className="w98-ie-li-section w98-inset">
            <h2>About</h2>
            <p>{profile.tagline}</p>
          </section>

          <section className="w98-ie-li-section w98-inset">
            <h2>Experience</h2>
            <ul className="w98-ie-li-jobs">
              {experiences.map((e) => (
                <li key={e.company}>
                  <strong>{e.role}</strong>
                  <span>{e.company} · {e.period}</span>
                  <p>{e.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="w98-ie-li-section w98-inset">
            <h2>Official LinkedIn badge</h2>
            <div ref={badgeRef} className="w98-ie-li-badge" />
            <p className="w98-ie-li-badge-hint">
              Badge loaded from LinkedIn&apos;s embed script — the same method recommended on linkedin.com.
            </p>
          </section>

          <div className="w98-ie-li-actions">
            <button type="button" className="w98-btn w98-outset" onClick={() => openExternal(profile.linkedin)}>
              Connect on LinkedIn
            </button>
            <button type="button" className="w98-btn w98-outset" onClick={() => openExternal(`mailto:${profile.email}`)}>
              Message via email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
