import { SettingsProvider } from "./hooks/useSettings";
import { WindowManagerProvider } from "./hooks/useWindowManager";
import { Win98Desktop } from "./components/win98/Desktop";
import "./index.css";
import "./styles/win98.css";

function App() {
  return (
    <SettingsProvider>
      <WindowManagerProvider>
        <Win98Desktop />
      </WindowManagerProvider>
    </SettingsProvider>
  );
}

export default App;
