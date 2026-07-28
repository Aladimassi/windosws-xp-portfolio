/** Helpers for Internet Explorer — sites that block iframes need alternate rendering. */

export function normalizeUrl(u: string) {
  return u.startsWith("http") ? u : `https://${u}`;
}

export function getHost(url: string) {
  try {
    return new URL(normalizeUrl(url)).hostname.toLowerCase();
  } catch {
    return "";
  }
}

const FRAME_BLOCKED_HOSTS = new Set([
  "github.com",
  "www.github.com",
  "linkedin.com",
  "www.linkedin.com",
  "m.linkedin.com",
]);

export function isFrameBlocked(url: string) {
  const host = getHost(url);
  if (!host) return true;
  return FRAME_BLOCKED_HOSTS.has(host) || host.endsWith(".github.com") || host.endsWith(".linkedin.com");
}

export function openExternal(url: string) {
  window.open(normalizeUrl(url), "_blank", "noopener,noreferrer");
}

export type GitHubPath = { username: string; repo?: string };

export function parseGitHubUrl(url: string): GitHubPath | null {
  try {
    const { pathname } = new URL(normalizeUrl(url));
    const parts = pathname.split("/").filter(Boolean);
    if (!parts.length) return null;
    const username = parts[0]!;
    if (parts.length >= 2 && !["orgs", "settings", "marketplace", "explore", "topics"].includes(username)) {
      return { username, repo: parts[1] };
    }
    return { username };
  } catch {
    return null;
  }
}

export function linkedInVanity(url: string) {
  try {
    const parts = new URL(normalizeUrl(url)).pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("in");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]!;
    return parts[parts.length - 1] ?? "";
  } catch {
    return "";
  }
}
