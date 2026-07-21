import { FileText, Mail, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { profile } from "../../data/profile";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

/** Section contact avec liens sociaux et formulaire mailto */
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact depuis portfolio — ${form.name}`);
    const body = encodeURIComponent(
      `Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Contact"
          title="Travaillons ensemble"
          description="Intéressé par mon profil ? N'hésite pas à me contacter pour un stage ou une opportunité."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-4">
              <ContactLink
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <ContactLink
                icon={<Phone className="h-5 w-5" />}
                label="Téléphone"
                value={profile.phone}
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
              />
              <ContactLink
                icon={<GithubIcon className="h-5 w-5" />}
                label="GitHub"
                value="Aladimassi"
                href={profile.github}
              />
              <ContactLink
                icon={<LinkedinIcon className="h-5 w-5" />}
                label="LinkedIn"
                value="ala-dimassi"
                href={profile.linkedin}
              />
              <ContactLink
                icon={<FileText className="h-5 w-5" />}
                label="CV"
                value="Télécharger le PDF"
                href={profile.cvUrl}
                download={profile.cvFileName}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Nom
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500/50"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500/50"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500/50"
                  placeholder="Votre message..."
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4" />
                Envoyer
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  icon,
  label,
  value,
  href,
  download,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  download?: string;
}) {
  return (
    <motion.a
      href={href}
      download={download}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noopener noreferrer"}
      className="block"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-[var(--color-muted)] uppercase">
            {label}
          </p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </div>
    </motion.a>
  );
}
