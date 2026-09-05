# Cantcol

Cantcol is a lightweight, browser-based Romanian cash receipts and payments journal. It provides a printable A4-style register with controls for editing rows and saving the register locally in the browser.

## Features

- Romanian journal layout for cash receipts and payments
- Add and remove journal rows
- Edit the most recently added row
- Save and load register data with the browser's `localStorage`
- Static HTML, CSS, and JavaScript with no build step or runtime dependencies
- GitHub Pages deployment through GitHub Actions

## Running locally

This is a static site, so it can be opened directly in a browser:

```text
index.html
```

For a local development server, use any static file server. For example, with Python:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Using the register

1. Select **Add** to append a blank journal row.
2. Select **Edit** to enter or update the last row.
3. Select **Save** to store the current register data in this browser.
4. Select **Load** to restore the saved data.
5. Select **Remove** to delete the last journal row.

Saved data is kept under the `db` key in the browser's local storage. It is local to the browser and device; clearing site data or switching browsers will remove or hide the saved register.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Register markup and controls |
| `style.css` | A4-style layout and table presentation |
| `script.js` | Row editing and local storage behavior |
| `.github/workflows/jekyll-gh-pages.yml` | GitHub Pages build and deployment workflow |

## Deployment

The repository includes a GitHub Actions workflow that builds and deploys the site to GitHub Pages when changes are pushed to `main` or `extend`. To enable deployment, configure the repository's Pages source to **GitHub Actions** under **Settings → Pages**.
