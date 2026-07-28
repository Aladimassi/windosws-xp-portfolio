import { type ReactNode, useEffect, useState } from "react";
import { openExternal, parseGitHubUrl, type GitHubPath } from "../../../../lib/ieBrowser";

type GhUser = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
  location: string | null;
  blog: string | null;
};

type GhRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

type GhRepoDetail = GhRepo & {
  owner: { login: string };
  forks_count: number;
  topics: string[];
  default_branch: string;
};

function IEPageShell({
  url,
  site,
  children,
}: {
  url: string;
  site: string;
  children: ReactNode;
}) {
  return (
    <div className="w98-ie-page">
      <div className="w98-ie-page-banner">
        <span>
          <strong>{site}</strong> cannot load in a frame (X-Frame-Options). Showing a live-compatible view instead.
        </span>
        <button type="button" className="w98-btn w98-outset w98-ie-page-open" onClick={() => openExternal(url)}>
          Open real site ↗
        </button>
      </div>
      {children}
    </div>
  );
}

function RepoView({ path, url }: { path: GitHubPath; url: string }) {
  const [repo, setRepo] = useState<GhRepoDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/repos/${path.username}/${path.repo}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: GhRepoDetail) => setRepo(d))
      .catch(() => setRepo(null))
      .finally(() => setLoading(false));
  }, [path.username, path.repo]);

  return (
    <IEPageShell url={url} site="GitHub">
      <div className="w98-ie-gh">
        {loading && <p className="w98-ie-gh-loading">Loading repository…</p>}
        {!loading && repo && (
          <>
            <header className="w98-ie-gh-header">
              <h1>{repo.owner.login} / <strong>{repo.name}</strong></h1>
              {repo.description && <p>{repo.description}</p>}
              <div className="w98-ie-gh-meta">
                {repo.language && <span>{repo.language}</span>}
                <span>★ {repo.stargazers_count}</span>
                <span>⑂ {repo.forks_count}</span>
              </div>
            </header>
            {repo.topics.length > 0 && (
              <div className="w98-ie-gh-topics">
                {repo.topics.map((t) => (
                  <span key={t} className="w98-ie-gh-topic">{t}</span>
                ))}
              </div>
            )}
            <div className="w98-ie-gh-actions">
              <button type="button" className="w98-btn w98-outset" onClick={() => openExternal(repo.html_url)}>
                View on GitHub
              </button>
              <button type="button" className="w98-btn w98-outset" onClick={() => openExternal(`${repo.html_url}/blob/${repo.default_branch}/README.md`)}>
                README
              </button>
            </div>
          </>
        )}
        {!loading && !repo && (
          <p className="w98-ie-gh-error">Repository not found or API rate limit reached.</p>
        )}
      </div>
    </IEPageShell>
  );
}

function ProfileView({ path, url }: { path: GitHubPath; url: string }) {
  const [user, setUser] = useState<GhUser | null>(null);
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    Promise.all([
      fetch(`https://api.github.com/users/${path.username}`).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch(`https://api.github.com/users/${path.username}/repos?sort=updated&per_page=12`).then((r) =>
        r.ok ? r.json() : Promise.reject(),
      ),
    ])
      .then(([u, r]) => {
        setUser(u as GhUser);
        setRepos(r as GhRepo[]);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [path.username]);

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${path.username}&show_icons=true&theme=default&hide_border=true`;
  const streakUrl = `https://github-readme-streak-stats.demolab.com/?user=${path.username}&hide_border=true`;

  return (
    <IEPageShell url={url} site="GitHub">
      <div className="w98-ie-gh">
        {loading && <p className="w98-ie-gh-loading">Loading GitHub profile…</p>}
        {error && (
          <p className="w98-ie-gh-error">
            Could not reach GitHub API. Use &quot;Open real site&quot; above.
          </p>
        )}
        {!loading && user && (
          <>
            <div className="w98-ie-gh-profile">
              <img src={user.avatar_url} alt="" className="w98-ie-gh-avatar" />
              <div>
                <h1>{user.name ?? user.login}</h1>
                <p className="w98-ie-gh-handle">@{user.login}</p>
                {user.bio && <p className="w98-ie-gh-bio">{user.bio}</p>}
                <div className="w98-ie-gh-meta">
                  {user.location && <span>{user.location}</span>}
                  <span><strong>{user.public_repos}</strong> repos</span>
                  <span><strong>{user.followers}</strong> followers</span>
                  <span><strong>{user.following}</strong> following</span>
                </div>
              </div>
            </div>

            <div className="w98-ie-gh-cards">
              <img src={statsUrl} alt="GitHub stats" className="w98-ie-gh-stat-card" loading="lazy" />
              <img src={streakUrl} alt="GitHub streak" className="w98-ie-gh-stat-card" loading="lazy" />
            </div>

            <h2 className="w98-ie-gh-section">Popular repositories</h2>
            <ul className="w98-ie-gh-repos">
              {repos.map((r) => (
                <li key={r.name} className="w98-ie-gh-repo w98-inset">
                  <button type="button" className="w98-ie-gh-repo-link" onClick={() => openExternal(r.html_url)}>
                    {r.name}
                  </button>
                  {r.description && <p>{r.description}</p>}
                  <div className="w98-ie-gh-meta">
                    {r.language && <span>{r.language}</span>}
                    <span>★ {r.stargazers_count}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </IEPageShell>
  );
}

export function GitHubIEView({ url }: { url: string }) {
  const path = parseGitHubUrl(url);
  if (!path) {
    return (
      <IEPageShell url={url} site="GitHub">
        <p className="w98-ie-gh-error">Invalid GitHub URL.</p>
      </IEPageShell>
    );
  }
  if (path.repo) return <RepoView path={path} url={url} />;
  return <ProfileView path={path} url={url} />;
}
