# Utiliser l'image officielle de Node.js
FROM node:20

# Définir le répertoire de travail
WORKDIR /frontend/app

# Copier les fichiers de l'application et installer les dépendances
COPY package*.json ./
RUN yarn

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
RUN yarn build

# Exposer le port par défaut de Next.js
EXPOSE 3000

# Commande de démarrage
CMD ["yarn", "start"]