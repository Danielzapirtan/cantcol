# Copilot instructions for Cantcol

## Project overview

Cantcol is a dependency-free static web application for a Romanian cash receipts
and payments journal. There is no package manager, bundler, framework, backend,
or runtime service:

- `index.html` is the document structure, table headings, controls, and the
  initial two table rows (column-number guide and report row).
- `style.css` provides the A4-sized document layout and table presentation.
- `script.js` is the application logic. It queries the existing DOM, appends
  or removes journal rows, toggles editing on the last row, and serializes
  table-cell text to browser `localStorage`.
- `.github/workflows/jekyll-gh-pages.yml` publishes the repository root to
  GitHub Pages on pushes to `main` or `extend`, or on manual dispatch. The
  workflow uses Jekyll only as the Pages packaging step; this is not a Jekyll
  application.

The browser is the source of truth for runtime state. The storage key currently
used by the implementation is `ccdb`; saved data is an array of table-cell
strings, including the fixed guide and report rows. Keep persistence changes
compatible with this shape or provide an explicit migration.

## Running and validating locally

There are no automated tests, lint scripts, or build commands in this
repository. Open `index.html` directly for a quick check, or serve the root
directory to exercise it in a browser:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>. For a focused manual check, verify the changed
behavior in this browser session: add a row, edit the last row, save, reload
the page, load, and remove a row as applicable. Browser devtools can inspect
the `ccdb` local-storage entry. There is no single-test command because no test
runner or test files are configured.

When Playwright MCP is available, use it against the local static server for
focused UI checks: confirm the controls update the table, edit mode only
targets the last record, and save/load round-trips the `ccdb` data. Do not
assume a Playwright dependency belongs in this repository.

## Implementation conventions

- Keep the application framework-free and use the existing DOM/event-listener
  approach. Controls are located by their existing classes and the journal body
  by `#tbody`.
- Journal records are eight `<td>` cells wide. New records must preserve that
  width and remain after the fixed guide row and before the report row.
- Editing is intentionally limited to the last row. The edit toggle replaces
  each cell's text with a text input and restores the cell text when toggled
  off; preserve the remove-button and edit-button state changes when changing
  this flow.
- `save` serializes all `tbody` cell text in DOM order. `load` reconstructs
  only user records and relies on the fixed rows already present in the HTML.
  Guard storage and malformed-data changes explicitly rather than silently
  inventing a different state.
- User-visible status messages go through `log()`, which writes to `.donsole`.
  Keep messages consistent with the existing button-action logging.
- The UI text and journal headings are Romanian-oriented, while button labels
  and status messages are currently English. Preserve the existing language
  choices unless a localization change is intentional.
- Keep visual changes in `style.css` and structural/content changes in
  `index.html`; avoid introducing generated assets or dependencies for small
  behavior or styling changes.

## Deployment

Changes pushed to `main` or `extend` can trigger the Pages workflow. The
repository must have GitHub Pages configured to use **GitHub Actions** under
**Settings → Pages**. The workflow is the deployment verification path; no
local Jekyll installation is required.
