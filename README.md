# Ala Dimassi — Portfolio

Portfolio web professionnel pour **Ala Dimassi**, étudiant en Computer Science Engineering à ESPRIT (Tunisie).

Stack : **React + Vite + Tailwind CSS v4 + Framer Motion**

## Fonctionnalités

- Design moderne inspiré Vercel/Linear (dark mode par défaut + toggle light)
- Sections : Hero, About, Skills, Projects, Experience, Contact
- 15 projets réels issus du [GitHub d'Aladimassi](https://github.com/Aladimassi)
- Animations au scroll (framer-motion)
- 100 % responsive mobile-first
- Prêt pour déploiement Vercel

## Prérequis

- [Node.js](https://nodejs.org/) 18+ (recommandé : 20+)
- npm

## Lancer en local

```bash
# 1. Cloner le repo (ou naviguer dans le dossier)
cd portfolio

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173) dans ton navigateur.

## Scripts disponibles

| Commande           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Serveur de dev Vite                  |
| `npm run build`    | Build de production (`dist/`)        |
| `npm run preview`  | Prévisualiser le build localement    |
| `npm run lint`     | Linter (oxlint)                      |

## Personnalisation

Modifie les fichiers dans `src/data/` :

| Fichier         | Contenu                                      |
| --------------- | -------------------------------------------- |
| `profile.ts`    | Nom, liens, email, CV — **remplace les [TODO]** |
| `projects.ts`   | Projets GitHub                               |
| `skills.ts`     | Compétences par catégorie                    |
| `experience.ts` | Stages (Pixelium, Talan)                     |

Placeholders déjà remplis dans `src/data/profile.ts` (email, LinkedIn, CV).

## Déploiement sur Vercel

### Option A — Via l'interface Vercel (recommandé)

1. Push le projet sur un repo GitHub (voir section ci-dessous)
2. Va sur [vercel.com](https://vercel.com) → **Add New Project**
3. Importe ton repo GitHub
4. Vercel détecte automatiquement Vite :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
5. Clique **Deploy**

Le fichier `vercel.json` gère déjà le routing SPA.

### Option B — Via CLI

```bash
npm i -g vercel
vercel
```

## Push sur un nouveau repo GitHub

```bash
# Initialiser git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial portfolio — React + Vite + Tailwind"

# Créer un repo sur GitHub (via l'interface ou gh CLI)
# Exemple avec gh :
gh repo create portfolio --public --source=. --push

# Ou manuellement :
git remote add origin https://github.com/Aladimassi/portfolio.git
git branch -M main
git push -u origin main
```

## Structure du projet

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, About, Skills, Projects, Experience, Contact
│   └── ui/           # Button, Badge, ProjectCard, ScrollReveal, etc.
├── data/             # Données statiques (profile, projects, skills, experience)
├── hooks/            # useTheme (dark/light toggle)
├── lib/              # Utilitaires (cn)
├── assets/
├── App.tsx
├── main.tsx
└── index.css
```

## Licence

Projet personnel — libre d'utilisation et de modification.
