import { useState } from "react";
import { normalizeUrl, openExternal } from "../../../../lib/ieBrowser";

function extractQuery(url: string) {
  try {
    const u = new URL(normalizeUrl(url));
    if (u.hostname.includes("google.")) return u.searchParams.get("q") ?? "";
  } catch {
    /* ignore */
  }
  return "";
}

export function isGoogleUrl(url: string) {
  const host = normalizeUrl(url).replace(/^https?:\/\//, "").split("/")[0]?.toLowerCase() ?? "";
  return host === "google.com" || host.endsWith(".google.com") || host.startsWith("google.");
}

export function GoogleIEView({ url }: { url: string }) {
  const [query, setQuery] = useState(() => extractQuery(url));

  const searchUrl = (q: string) =>
    `https://www.google.com/search?q=${encodeURIComponent(q.trim())}`;

  const search = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    openExternal(searchUrl(trimmed));
  };

  return (
    <div className="w98-ie-page">
      <div className="w98-ie-page-banner">
        <span>
          <strong>Google</strong> blocks embedding in iframes. Search here — results open in your browser.
        </span>
        <button type="button" className="w98-btn w98-outset w98-ie-page-open" onClick={() => openExternal("https://www.google.com")}>
          Open Google ↗
        </button>
      </div>

      <div className="w98-ie-google">
        <div className="w98-ie-google-logo" aria-hidden>
          <span className="w98-ie-google-g w98-ie-google-g--b">G</span>
          <span className="w98-ie-google-g w98-ie-google-g--r">o</span>
          <span className="w98-ie-google-g w98-ie-google-g--y">o</span>
          <span className="w98-ie-google-g w98-ie-google-g--b">g</span>
          <span className="w98-ie-google-g w98-ie-google-g--g">l</span>
          <span className="w98-ie-google-g w98-ie-google-g--r">e</span>
        </div>

        <form
          className="w98-ie-google-form"
          onSubmit={(e) => {
            e.preventDefault();
            search(query);
          }}
        >
          <input
            className="w98-ie-google-input w98-inset"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the web..."
            autoFocus
          />
          <div className="w98-ie-google-btns">
            <button type="submit" className="w98-btn w98-outset">
              Google Search
            </button>
            <button type="button" className="w98-btn w98-outset" onClick={() => search("Ala Dimassi portfolio developer")}>
              I&apos;m Feeling Lucky
            </button>
          </div>
        </form>

        <p className="w98-ie-google-hint">
          Tip: major sites (Google, YouTube, Facebook…) cannot load inside Internet Explorer windows — use ↗ to open them.
        </p>
      </div>
    </div>
  );
}
