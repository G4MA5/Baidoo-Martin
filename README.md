# Portfolio — Martin Baidoo (React + Vite)

Portfolio professionnel de **Martin Baidoo – Développeur Full-stack & Data**, entièrement converti en application moderne **React** avec **Vite**, respectant fidèlement à 100% le design, les textes, les animations et la structure d'origine.

---

## 📁 Architecture du Projet

Tous les composants React sont organisés de manière propre et modulaire dans le dossier `src/components/` :

```text
portfolio/
├── index.html                   # Entête HTML, Google Fonts & configuration
├── package.json                 # Dépendances (React, Three.js, Vite)
├── vite.config.js               # Configuration Vite
├── src/
│   ├── main.jsx                 # Point d'entrée de l'application React
│   ├── App.jsx                  # Assemblage des sections et layout principal
│   ├── portfolio.css            # Styles originaux, variables CSS, typographie et animations
│   ├── assets/                  # Images, portraits et captures des projets
│   │   ├── logo-gama.png        # Logo Gama Labs avec fond transparent
│   │   ├── martin-hero.webp     # Portrait principal (moitié humain, moitié code)
│   │   ├── profil1.jpeg         # Photo 1 carrousel À propos
│   │   ├── profil2.jpeg         # Photo 2 carrousel À propos
│   │   ├── profil3.jpeg         # Photo 3 carrousel À propos
│   │   ├── baidoo-martin.jpeg   # Photo 4 carrousel À propos
│   │   ├── martin-about-2.webp  # Photo 5 carrousel À propos (avatar tech)
│   │   ├── team-ahoussi-armel.jpeg     # Ahoussi Serge Armel
│   │   ├── team-assale-yao.jpeg        # Assalé Yao Eliakim (dev yao)
│   │   ├── team-dakaud-uriel.jpeg      # Dakaud Uriel Jean-Bedel (le sys)
│   │   ├── team-deroux-caleb.jpeg      # Deroux Desailly Caleb
│   │   ├── team-graourou-divine.jpeg   # Graourou Grace Olivier Divine
│   │   ├── project-metro-1.png         # Metro — Écran 1
│   │   ├── project-metro-2.png         # Metro — Écran 2
│   │   ├── project-metro-3.png         # Metro — Écran 3
│   │   ├── project-metro-4.png         # Metro — Écran 4
│   │   ├── project-metro-5.png         # Metro — Écran 5
│   │   ├── project-upb-students.png    # UPB Student’s
│   │   ├── project-clinique-life.png   # Clinique Life
│   │   ├── project-eagle-vision.png    # Eagle Vision
│   │   ├── project-iot.png             # IoT collecte de données
│   │   ├── project-serious-game.png    # Serious game
│   │   ├── project-genie-upb.png       # Site Concours Génie UPB
│   │   ├── project-upb-bibliotheque.png# Bibliothèque numérique UPB
│   │   └── certif-*.png / .jpeg        # Les 8 scans de certifications
│   ├── hooks/
│   │   └── useScrollReveal.js   # Hook d'animation au défilement (IntersectionObserver)
│   └── components/              # 📦 Tous les composants React
│       ├── SvgIcons.jsx         # Sprite vectoriel complet des icônes tech & réseaux
│       ├── ProgressBar.jsx      # Barre de progression de scroll en haut de page
│       ├── Navbar.jsx           # Barre de navigation flottante avec détection de section active
│       ├── ToastDetail.jsx      # Conteneur d'alertes / toasts
│       ├── HeroHeader.jsx       # En-tête Hero, effet machine à écrire, badge circulaire rotatif, portraits Gama Labs & liens
│       ├── ProfilSection.jsx    # Section Profil, compteurs animés, éditeur de code & terminal interactif
│       ├── AproposSection.jsx   # Section À propos, carrousel 3D empilé avec profil1, profil2, profil3, baidoo-martin, martin-about-2
│       ├── ApprocheSection.jsx  # Section Approche (Construire, Analyser, Automatiser, Connecter)
│       ├── CompetencesSection.jsx # Compétences tech, catégories, étapes de projet & bandeau défilant
│       ├── ProjetsSection.jsx   # Projets sélectionnés avec captures réelles
│       ├── MetroGallery.jsx     # Galerie interactive animée pour l'application Metro (5 écrans)
│       ├── Fox3D.jsx            # Modèle 3D Three.js interactif (renard animé qui suit le curseur)
│       ├── ParcoursSection.jsx  # Parcours chronologique (Master 1 en cours, MIAGE Très Bien), mascotte parlante (vocal + texte)
│       ├── GamaSection.jsx      # Studio Gama Labs (logo sans fond centré, nom Gama_labs stylisé, photos & rôles des 5 collaborateurs)
│       ├── CertifsSection.jsx   # 8 certifications avec scans réels et modal zoom Lightbox
│       └── ContactSection.jsx   # Section de contact, formulaire interactif, réseaux sociaux (GitHub, LinkedIn, TikTok, WhatsApp)
```

---

## 🚀 Lancement du Projet

```bash
cd "C:\Users\baido\OneDrive\Bureau\portfolio"
npm run dev
```
Ouvrez ensuite le lien local `http://localhost:5173/` dans votre navigateur.
