import { useState } from "react";
import { profile } from "../../data/profile";

const DISPLAY_URL = profile.website.replace(/^https?:\/\//, "");

export function SiteLinkBar() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.website);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", profile.website);
    }
  };

  const open = () => {
    window.open(profile.website, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w98-site-link w98-outset" role="complementary" aria-label="Portfolio link">
      <span className="w98-site-link-label">Ala Dimassi — Portfolio</span>
      <button type="button" className="w98-site-link-url" onClick={open} title="Open in new tab">
        {DISPLAY_URL}
      </button>
      <button type="button" className="w98-btn w98-outset w98-site-link-btn" onClick={copy}>
        {copied ? "Copied!" : "Copy link"}
      </button>
      <button type="button" className="w98-btn w98-outset w98-site-link-btn" onClick={open}>
        Open ↗
      </button>
    </div>
  );
}
