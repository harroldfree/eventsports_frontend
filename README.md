# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# EVENTSPORTS

### Routes pour lancer le projet en local

Clone du project

```bash
git clone https://github.com/harroldfree/eventsports_frontend.git
```



Aller dans le dossier du project

```bash
cd EVENTSPORT
```
  


Installer les dépendances

```bash
npm install
```
  


Pour lancer le serveur 

```bash
npm run dev
```
  


NB : On a eu des difficultés avec les CORS, pour y remedier on a eu a ajouter dans le fichier vite.config.js 
 server:{
    proxy:{
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }

  c'est pour cela que non routes commencent par "api"