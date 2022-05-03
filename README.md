# Readme LIFPROJET

![kiwi_full_logo.png](public/readme/kiwi_full_logo.png)

![record kiwi.gif](public/readme/record_kiwi.gif)

# KIWI APP

---

KIWI : L’oiseau qui monte le son.

Application qui a pour vocation de regrouper différents services de musiques sur un seul site avec des services personnalisés.

En effet, n’est-il pas frustrant d’être amené à écouter une version alternative de la musique que l’on voulait à l’origine car cette dernière n’est pas présente sur Spotify ? D’autre part, devoir ouvrir son navigateur et aller sur Youtube pour chercher cette musique est un processus répétitif et peu plaisant.

## Développé avec

---

[React](https://reactjs.org/)

[NextJS](https://nextjs.org/)

[Prisma](https://www.prisma.io/)

[Postgresql](https://www.postgresql.org/)

[NextAuth](https://next-auth.js.org/)

[TailwindCSS](https://tailwindcss.com/)

## Prise-en-main

---

### Pré-requis

---

[Node](https://nodejs.org/en/)

`node -v`

[npm](https://www.npmjs.com/get-npm)
`npm -v`

veillez à ce que votre version soit supérieur à 16.X

## Installation

---

Lors du lancement de l’application cette dernière sera lancé sur le port 3000 ([localhost:3000/](http://localhost:3000/))

### Lancer l’application en local

---

```bash
# Installation des dépendances.
npm i
# Lancement de l'application avec nextJS
npm run dev
```

### Variables d’environnement `.env`

---
(le fichier .env a été transmis à monsieur RICO et CAZABET)

Placer le fichier .env à la racine du projet puis y mettre le contenu suivant :
```bash
NEXTAUTH_URL=http://localhost:3000/api/auth

# Liens DATABASE.

DATABASE_URL=XXXXXXX

SHADOW_DATABASE_URL=XXXXXX
# Spotify Cred.

SPOTIFY_CLIENT_ID=XXXXX
SPOTIFY_CLIENT_SECRET=XXXXXXX

# Google Cred.

GOOGLE_CLIENT_ID=XXXXXXXXX
GOOGLE_CLIENT_SECRET=XXXXXXX

GOOGLE_API_KEY_DEV=XXXXXXXX

# Clé secrête pour que NextAuth encrypt les données. 

SECRET=
# JWT_SECRET=

# GIPHY

GIPHY_API=XXXXXXXX
```

### Liens pour créer les différentes applications qui vous donneront ces variables :

---

[Spotify](https://developer.spotify.com/dashboard/)

[Google](https://console.cloud.google.com/projectcreate)

[Giphy](https://developers.giphy.com/dashboard/?create=true)

### Mettre en place une base de données

---

Si vous souhaitez mettre en place une base de donnée à distance vous pouvez utiliser la plateforme Heroku qui offre ce type de service.

Il vous faudra pour cela créer une application et lui ajouter 2 Base de données, une qui servira de BDD principale et une autre de Shadow.

# Contributeurs

---

[CECILLON Enzo](https://github.com/ECecillo/) et son [site](https://ececillo.com)

[BERNOT Camille](https://github.com/RhesusP)

[FIETIER Loris](https://forge.univ-lyon1.fr/p1805561)
