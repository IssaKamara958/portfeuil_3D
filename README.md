# Portefeuille 3D Interactif d'Issa Kamara

![Build Status](https://img.shields.io/github/actions/workflow/status/IssaKamara958/portfeuil_3D/main.yml?branch=main) 
[![npm version](https://img.shields.io/npm/v/vite.svg)](https://www.npmjs.com/package/vite) 
[![Licence](https://img.shields.io/github/license/IssaKamara958/portfeuil_3D)](LICENSE)

Ce projet est un portefeuille web innovant et immersif conçu pour présenter le parcours, les compétences et les projets d'Issa Kamara, un développeur web passionné avec un bagage unique. Le site se distingue par son expérience utilisateur en 3D et son assistant avatar interactif, offrant une navigation personnalisée et engageante.

## 🚀 Fonctionnalités Clés

- **Avatar Assistant IA :** Un guide virtuel intelligent qui accueille les visiteurs, personnalise leur parcours et répond à leurs questions. L'assistant adapte ses réponses selon que le visiteur est un recruteur ou un simple curieux, offrant une expérience sur mesure.
- **Interface 3D immersive :** Le portefeuille utilise des éléments 3D pour créer un environnement visuellement captivant qui met en valeur les projets et les compétences d'Issa de manière dynamique.
- **Navigation intuitive par sections :**
  - **Accueil :** Présentation générale du portfolio par l'avatar.
  - **Projets :** Catalogue des réalisations d'Issa, allant du e-commerce à la santé numérique.
  - **Compétences :** Mise en lumière de ses compétences techniques et créatives, enrichies par son parcours artistique.
  - **À propos :** Récit de son parcours atypique : artiste peintre, entrepreneur et maintenant développeur web.
  - **Contact :** Un formulaire pour faciliter la prise de contact et les collaborations.
- **Design entièrement responsive :** Le site est optimisé pour une expérience fluide sur tous les appareils, du mobile au bureau.

## 🛠️ Technologies Utilisées

- **Frontend :**
  - **React :** Bibliothèque JavaScript pour la construction d'interfaces utilisateur.
  - **TypeScript :** Pour un code plus sûr et plus robuste.
  - **Vite :** Outil de build nouvelle génération pour un développement rapide.
  - **Tailwind CSS :** Framework CSS pour un design rapide et personnalisé.
- **3D :**
  - **Three.js / React Three Fiber :** Pour la création et l'animation des scènes 3D.
- **UI :**
  - **Shadcn UI :** Collection de composants d'interface utilisateur réutilisables.

## 📁 Structure du Projet

```
/src
|-- /assets         # Fichiers statiques (images, etc.)
|-- /components     # Composants React
|   |-- /3d         # Composants spécifiques à la scène 3D
|   |-- /ui         # Composants d'interface (boutons, cartes, etc.)
|-- /hooks          # Hooks React personnalisés
|-- /lib            # Modules et utilitaires (Supabase, etc.)
|-- /pages          # Pages principales de l'application
|-- App.tsx         # Composant racine de l'application
|-- main.tsx        # Point d'entrée de l'application
```

## ⚙️ Installation et Lancement

Pour explorer ce projet en local, suivez ces étapes :

1. **Clonez le dépôt :**
   ```bash
   git clone https://github.com/IssaKamara958/portfeuil_3D.git
   ```
2. **Installez les dépendances :**
   ```bash
   cd portfeuil_3D
   npm install
   ```
3. **Lancez le serveur de développement :**
   ```bash
   npm run dev
   ```
4. **Ouvrez votre navigateur :**
   Rendez-vous à l'adresse `http://localhost:5173` pour découvrir le portfolio.

## 🚀 Déploiement

Le projet est configuré pour un déploiement simple sur Firebase Hosting.

1. **Créez une version de production :**
   ```bash
   npm run build
   ```
   Cette commande génère un dossier `dist` contenant les fichiers statiques optimisés.

2. **Déployez sur Firebase :**
   Assurez-vous d'avoir Firebase CLI installé et d'être connecté à votre compte.
   ```bash
   firebase deploy --only hosting
   ```

## 👤 À Propos d'Issa Kamara

Artiste, entrepreneur et développeur, Issa Kamara apporte une perspective unique à chaque projet. Sa décennie en tant qu'artiste peintre et son expérience dans l'entrepreneuriat ont aiguisé sa créativité et sa capacité à résoudre des problèmes, des qualités qu'il met aujourd'hui au service du développement web pour créer des expériences digitales révolutionnaires.
