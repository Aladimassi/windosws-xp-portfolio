import { useBsod } from "../../../hooks/useBsod";
import { CmdApp as CmdBase } from "./CmdApp";

export function CmdApp() {
  const { triggerBsod } = useBsod();
  return <CmdBase onBsod={triggerBsod} />;
}
