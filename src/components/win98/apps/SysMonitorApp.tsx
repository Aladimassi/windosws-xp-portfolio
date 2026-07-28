import { useEffect, useState } from "react";
import { profile } from "../../../data/profile";
import { projects } from "../../../data/projects";

type GhUser = { public_repos: number; followers: number; following: number; created_at: string };

export function SysMonitorApp() {
  const [user, setUser] = useState<GhUser | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/Aladimassi")
      .then((r) => r.json())
      .then((d) => setUser(d))
      .catch(() => setError(true));
  }, []);

  return (
    <div className="w98-sysmon">
      <fieldset className="w98-fieldset">
        <legend>GitHub — Live Stats</legend>
        {error && <p>Could not reach GitHub API.</p>}
        {user && (
          <div className="w98-sysmon-grid">
            <div><span>Public repos</span><strong>{user.public_repos}</strong></div>
            <div><span>Followers</span><strong>{user.followers}</strong></div>
            <div><span>Following</span><strong>{user.following}</strong></div>
            <div><span>Member since</span><strong>{new Date(user.created_at).getFullYear()}</strong></div>
          </div>
        )}
      </fieldset>
      <fieldset className="w98-fieldset">
        <legend>Portfolio</legend>
        <div className="w98-sysmon-grid">
          <div><span>Projects listed</span><strong>{projects.length}</strong></div>
          <div><span>CPU load</span><strong>{Math.floor(Math.random() * 30 + 5)}%</strong></div>
          <div><span>RAM</span><strong>React + Vite</strong></div>
          <div><span>User</span><strong>{profile.name}</strong></div>
        </div>
      </fieldset>
    </div>
  );
}
