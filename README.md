# Pavan Kalyan Portfolio

A dependency-free, responsive portfolio website for **Boddana Pavan Kalyan**. The project is designed to open directly in VS Code and run locally with Node.js.

The hero includes a downloadable resume at `public/resume.pdf`, and the visual theme uses red and blue accents with a developer/AI orbit graphic instead of a code box.

## Run locally in VS Code

1. Extract the ZIP and open the extracted `pavankalyan` folder in VS Code.
2. Open the integrated terminal in the project folder.
3. Confirm Node.js 18+ is installed:

   ```bash
   node --version
   ```

4. Start the local server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000).

No `npm install` step is required because the site uses only built-in Node.js modules and browser APIs.

## Editing resume content

Most editable resume content is centralized in `src/app.js` inside the `resumeData` object. Update project URLs and social profile URLs there or in the relevant button markup when they become available. The current project and social controls are honest placeholders because no real URLs were supplied.

## Project files

- `index.html` — semantic page structure and SEO metadata.
- `src/styles.css` — responsive visual system, components, and motion.
- `src/app.js` — resume data, rendered cards, navigation, reveal effects, and form feedback.
- `server.mjs` — small Node.js static server.
- `public/manus-routes.json` — single-page route manifest.
- `public/favicon.svg` — PK monogram favicon.
- `public/resume.pdf` — downloadable resume generated from the supplied resume details.
- `plan.md` — design and implementation decisions.
