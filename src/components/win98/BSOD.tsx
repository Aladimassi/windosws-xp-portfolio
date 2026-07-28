import { profile } from "../../data/profile";

type BSODProps = {
  onDismiss: () => void;
};

export function BSOD({ onDismiss }: BSODProps) {
  return (
    <div className="w98-bsod" onClick={onDismiss} role="alert">
      <p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.</p>
      <p>The current application will be terminated.</p>
      <br />
      <p>* Press any key to continue (just kidding — click anywhere)</p>
      <p>* Contact portfolio admin: {profile.email}</p>
      <br />
      <p>Click to return to Windows 98...</p>
    </div>
  );
}
