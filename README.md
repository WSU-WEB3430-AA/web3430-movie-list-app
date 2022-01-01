# A fullstack MERN-based web project
A web application for creating and managing movie lists

## Instructions
After you clone or download this repository from GitHub, run the following to install required NPM packages. You only need to do this once.

```bash
npm install
```

To run the application, open two terminals. Under the first terminal, compile the front-end components in a development mode into the `public/` folder using the command:

```bash
npm run deploy
```

Under the second terminal, start the local development server using the command:

```bash
npm run server
```

Visit http://localhost:8080/ in your browser (Chrome and/or Firefox are recommended) to view your site. With the development server running, any change you make is compiled and seen automatically in the browser.

**NOTE**: To compile the front-end components in a production mode, use the command:

```bash
NODE_ENV=production npm run deploy
```