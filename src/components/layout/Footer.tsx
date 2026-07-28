import { profile } from "../../data/profile";

/** Pied de page minimal */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 sm:flex-row sm:justify-center">
        <p className="text-sm text-[var(--color-muted)]">
          © {year} {profile.name}. Built with React + Vite + Tailwind.
        </p>
      </div>
    </footer>
  );
}
