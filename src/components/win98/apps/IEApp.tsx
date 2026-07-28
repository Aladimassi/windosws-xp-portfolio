import { useState } from "react";
import { profile } from "../../../data/profile";
import { isFrameBlocked, normalizeUrl, openExternal } from "../../../lib/ieBrowser";
import { GitHubIEView } from "./ie/GitHubIEView";
import { GoogleIEView, isGoogleUrl } from "./ie/GoogleIEView";
import { LinkedInIEView } from "./ie/LinkedInIEView";

const PRESETS = [
  { label: "Google", url: "https://www.google.com" },
  { label: "GitHub", url: profile.github },
  { label: "LinkedIn", url: profile.linkedin },
  { label: "ESPRIT", url: "https://esprit.tn" },
];

function GenericBlockedFallback({ url }: { url: string }) {
  return (
    <div className="w98-ie-page">
      <div className="w98-ie-page-banner w98-ie-page-banner--warn">
        <span>
          <strong>Internet Explorer</strong> cannot display this page in a frame (X-Frame-Options / CSP).
        </span>
        <button type="button" className="w98-btn w98-outset w98-ie-page-open" onClick={() => openExternal(url)}>
          Open in browser ↗
        </button>
      </div>
      <div className="w98-ie-fallback">
        <div className="w98-ie-error-icon" aria-hidden>⚠</div>
        <h2 className="w98-ie-error-title">The webpage cannot be displayed</h2>
        <p className="w98-ie-error-text">
          Many secure websites (GitHub, LinkedIn, banks, social networks) forbid iframe embedding to prevent
          clickjacking. There is no client-side workaround — the site must be opened in a full browser tab.
        </p>
        <p className="w98-ie-error-hint">{normalizeUrl(url)}</p>
        <button type="button" className="w98-btn w98-outset w98-ie-open-btn" onClick={() => openExternal(url)}>
          Open in browser →
        </button>
      </div>
    </div>
  );
}

function IEBody({ url }: { url: string }) {
  const host = normalizeUrl(url).replace(/^https?:\/\//, "").split("/")[0]?.toLowerCase() ?? "";

  if (host.includes("github.com")) return <GitHubIEView url={url} />;
  if (host.includes("linkedin.com")) return <LinkedInIEView url={url} />;
  if (isGoogleUrl(url)) return <GoogleIEView url={url} />;
  if (isFrameBlocked(url)) return <GenericBlockedFallback url={url} />;

  return (
    <iframe
      title="Internet Explorer"
      src={normalizeUrl(url)}
      className="w98-ie-frame w98-inset"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

export function IEApp() {
  const [url, setUrl] = useState<string>(profile.github);
  const [current, setCurrent] = useState<string>(profile.github);

  const go = (u: string) => {
    const full = normalizeUrl(u);
    setCurrent(full);
    setUrl(full);
  };

  return (
    <div className="w98-ie">
      <div className="w98-ie-toolbar w98-outset">
        <button type="button" className="w98-btn w98-outset w98-toolbar-btn" onClick={() => go(current)} title="Refresh">
          ↻
        </button>
        <button type="button" className="w98-btn w98-outset w98-toolbar-btn" onClick={() => go(profile.github)} title="Home">
          🏠
        </button>
        <button type="button" className="w98-btn w98-outset w98-toolbar-btn" onClick={() => openExternal(current)} title="Open in browser">
          ↗
        </button>
        <span className="w98-ie-label">Address</span>
        <input
          className="w98-ie-url w98-inset"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && go(url)}
        />
        <button type="button" className="w98-btn w98-outset" onClick={() => go(url)}>
          Go
        </button>
      </div>
      <div className="w98-ie-links">
        {PRESETS.map((p) => (
          <button key={p.url} type="button" className="w98-btn w98-outset" onClick={() => go(p.url)}>
            {p.label}
          </button>
        ))}
      </div>
      <IEBody url={current} key={current} />
    </div>
  );
}
