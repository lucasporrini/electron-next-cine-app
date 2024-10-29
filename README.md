# 🎬 cine-app-electron

**cine-app-electron** est une application de bureau basée sur Electron et Next.js, offrant une expérience interactive de gestion de contenus cinématographiques. Le projet inclut une mise à jour automatique, un système de gestion des logs, des extensions de développement, et une gestion des paramètres utilisateurs.

## 📝 Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Contribuer](#contribuer)

## Fonctionnalités

- **Mise à jour automatique** : Gérée par `electron-updater`.
- **Logs** : Enregistrement et gestion des logs pour débogage et analyse.
- **Extensions de développement** : Installation des outils de développement Redux.
- **Gestion des paramètres utilisateurs** : Stockés localement via `electron-store`.
- **Communication IPC** : Intègre un canal IPC avec une gestion des événements personnalisée.

## Prérequis

- **Node.js** (v20 ou supérieur)
- **Yarn** (gestionnaire de paquets)
- **Electron** (installez-le globalement avec `yarn add -g electron` si nécessaire)

## Installation

1. Clonez le dépôt GitHub.
   ```bash
   git clone https://github.com/username/cine-app-electron.git
   cd cine-app-electron
   ```
