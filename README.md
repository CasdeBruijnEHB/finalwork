# Finalwork

For the Final Work of my Multimedia & Creative Technologies study at the Erasmushogeschool Brussels, I created Pieces Of Me. Pieces Of Me, or POM, is a website with which you can generate a 3D environment based on your favorite music. The user has to connect with their Spotify account first, afterwards POM will take your musical habits and create a personalized room based on your favorite tracks, artists, genres and era of music.

### Methodology

The website is build with a Nextjs frontend a and a backend that is set up with an express server that connects you to Spotify. The application uses ThreeJS & React Three Fiber to display 3D meshes that will be personalized according to the music. The backend creates a connection with Spotify and sends the necessary data to the frontend. Next to that there also are endpoints available to scrape images on Google with the Google Search API, to generate images with the OpenAI API and to get the dominant color out of an image with the colorthief.

## Technology

A short summary on the different tools used:
General

- Lerna
- Husky
- Tailwind
  Frontend
- NextJS
- ThreeJS / React Three Fiber / React Three Drei
- P5.JS
  Backend
- Express
- Spotify API
- Google Search Query API
- OpenAI API
- Colorthief

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Running](#running)
- [Sources](#sources)

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Spotify Premium account

## Installing

Install all packages with Node Package Manager:

```sh
   npm i
```

## Running

Follow these steps to run the project:

2.  Frontend: Navigate to the /frontend directory:

```sh
  cd /finalwork
```

- Install dependencies

```sh
   npm install
```

- Start the frontend solely

```sh
   npm run dev
```

3. Backend: In a new terminal window/tab, navigate to the /backend directory:

```sh
   cd /app
```

- Rename .env.example to .env.local and configure the environment variables, especially Spotify API credentials.
- Install backend dependencies:

```sh
   npm install
```

- Start the node server

```sh
   node app.js
```

4. Lerna: run the front- and backend together with Lerna
   - Go back to the root folder
   ```sh
   cd ..
   ```
   - Run lerna
   ```sh
   npx lerna run dev
   ```

## Sources

Several sources were consulted to create this project.
• husky | husky. (z.d.). https://typicode.github.io/husky/
• Getting Started | Lerna. (z.d.). https://lerna.js.org/docs/getting-started
• Authorization Code Flow | Spotify for Developers. (z.d.). https://developer.spotify.com/documentation/web-api/tutorials/code-flow
• Express routing. (z.d.). https://expressjs.com/en/guide/routing.html
• Rawat, R. (z.d.). Sessions vs Tokens: How to authenticate in Node.js. https://rrawat.com/blog/sessions-vs-tokens-authentication
• npm: node-fetch. (z.d.). npm. https://www.npmjs.com/package/node-fetch
• A Brief Timeline of Interior Design Movements | http://Supermodern.Bauhaus2Yourhouse.com. (2017, 29 december). https://supermodern.bauhaus2yourhouse.com/a-brief-timeline-of-interior-design-movements/
• Metcalf, H. (2021). 10 of the biggest interior trends of the 2010s. Goodhomes Magazine. https://www.goodhomesmagazine.com/inspiration/interior-trends-last-decade/
• Photographer Adrienne Salinger’s series of teenage bedrooms from the 90s. (2016, 12 april). https://www.itsnicethat.com/articles/adrienne-salinger-teenage-bedrooms-90s-120416
• Three.js – JavaScript 3D library. (z.d.). https://threejs.org/
• React Three Fiber Documentation. (z.d.). React Three Fiber Documentation. https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
• Pmndrs. (z.d.). GitHub - pmndrs/drei: useful helpers for react-three-fiber. GitHub. https://github.com/pmndrs/drei
• Pmndrs. (z.d.-b). GitHub - pmndrs/gltfjsx: Turns GLTFs into JSX components. GitHub. https://github.com/pmndrs/gltfjsx/tree/master
• Mashkin, D. (2022). 2023 Graphic Design Trends That Will Bring the ’70s Back in a Big Way — Artcoast Studio. Artcoast Studio. https://artcoastdesign.com/blog/2023-graphic-design-trends-that-will-bring-the-70s-back-in-a-big-way
• React Three Fiber - Importing Scenes With Actions From Blender - CodeSandbox. (2021, 3 maart). CodeSandbox. https://codesandbox.io/s/importing-scenes-with-actions-from-blender-s77fw?file=/src/Kick.js:297-359
• npm: colorthief. (z.d.). npm. https://www.npmjs.com/package/colorthief
• Counting the occurrences / frequency of array elements. (z.d.). Stack Overflow. https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
• Overview. (z.d.). Google for Developers. https://developers.google.com/custom-search/docs/overview
• Ganesh, M., & Ganesh, M. (2023, 27 april). Google custom search JSON API explained. Expertrec custom search engine. https://blog.expertrec.com/google-custom-search-json-api-simplified/
• 3d interface website presentation mockup isolated Free PSD. (2022, 4 februari). Freepik. https://www.freepik.com/free-psd/3d-interface-website-presentation-mockup-isolated_23126632.htm#query=desktop%20mockup&position=39&from_view=keyword&track=ais
• 3d interface website presentation mockup isolated Free PSD. (2022b, februari 4). Freepik. https://www.freepik.com/free-psd/3d-interface-website-presentation-mockup-isolated_23126615.htm#query=desktop%20mockup&position=5&from_view=keyword&track=ais
