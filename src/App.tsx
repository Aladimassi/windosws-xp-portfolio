import { SettingsProvider } from "./hooks/useSettings";
import { WindowManagerProvider } from "./hooks/useWindowManager";
import { RecruiterView } from "./components/recruiter/RecruiterView";
import { Win98Desktop } from "./components/win98/Desktop";
import "./index.css";
import "./styles/win98.css";

type Mode = "desktop" | "recruiter";

/**
 * /recruteur or ?mode=recruteur → classic one-page view.
 * ?mode=desktop → Windows 98 desktop, even on a phone.
 * Otherwise: the Windows 98 desktop, on every screen size.
 */
function pickMode(): Mode {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const path = window.location.pathname.replace(/\/+$/, "");
  if (mode === "recruteur" || mode === "recruiter" || mode === "simple" || path === "/recruteur") {
    return "recruiter";
  }
  if (mode === "desktop") return "desktop";
  return "desktop";
}

function App() {
  if (pickMode() === "recruiter") {
    document.title = "Ala Dimassi — Élève ingénieur IA & Data";
    document.documentElement.classList.add("recruiter-mode");
    return <RecruiterView />;
  }

  return (
    <SettingsProvider>
      <WindowManagerProvider>
        <Win98Desktop />
      </WindowManagerProvider>
    </SettingsProvider>
  );
}

export default App;
