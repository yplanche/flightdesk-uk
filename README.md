# Flightdesk UK — complete independent package

Snapshot: **13 November 2026**, latest release including browser-storage guidance, complete backup/restore, backup-gated data deletion, GO/WARNING/NO-GO weather screening, battery completion fixes, persistent navigation, weather maps and NOTAM/manual-briefing checks. Start with **START-HERE.md**.

This package can run without ChatGPT or the original Flightdesk website. It includes editable frontend source, the aviation-data proxy, prebuilt combined server, manufacturer catalogue and source links, PWA icons/manifest/service worker, tests, build tools and independent deployment configuration. Node.js runs the application without installing any npm packages. Python is used to rebuild and run the complete test suite.

## Quick start on your laptop

1. Extract the whole ZIP to a normal folder.
2. Install **Node.js 22 or newer** from https://nodejs.org/ if needed.
3. Open a terminal in the extracted folder and run:

```sh
node scripts/preview-airspace-worker.mjs
```

4. Open **http://127.0.0.1:4173/**. Keep the terminal open. Stop it with Ctrl+C.

The ready-built server includes the static app and `/api/airspace` and `/api/notams`. Do **not** double-click `index.html` or use a plain static file server for the complete app: that omits the proxy endpoints. No API key is required by the default endpoints, but provider availability and permitted usage still apply.

## Rebuild, verify and edit

Install Python **3.10 or newer** from https://www.python.org/. No Python packages are required.

macOS/Linux:

```sh
python3 scripts/manage.py build
python3 scripts/manage.py test
python3 scripts/manage.py start
```

Windows:

```powershell
py -3 scripts/manage.py build
py -3 scripts/manage.py test
py -3 scripts/manage.py start
```

Edit frontend files in `dist/` (except the generated `dist/server/` folder). Edit backend source in `worker/index.mjs`. `build` updates the offline-cache release and regenerates `dist/server/index.js`, embedding all application assets and the bundled ZIP decoder. Rebuild after every source change. `test` executes all `test-*.cjs` files with Node.js. `start` uses the prebuilt server and does not rebuild it.

## Put it on a phone or share with friends

Host the server over HTTPS using your own account; see **DEPLOYMENT.md** for Cloudflare Workers and a conventional Node.js server. Share your new URL. Each person installs the PWA through their browser. A phone's `localhost` is the phone itself, not your laptop. Plain HTTP on a laptop's LAN address is not a dependable PWA installation route.

The package does not provision a hosting account, domain, TLS certificate or access-control service. Independent deployments have no inherited ChatGPT login: configure access controls with your host if you need a private site.

## Preserve your saved data before moving

The source ZIP contains **no personal flight records, pilot/operator IDs, battery inventory or unsaved form**. These live in browser-local storage on the original address.

1. In the current app, save important missions.
2. Open **Download all flight records** beside Print / save PDF.
3. On your independent installation, use **Upload past flight records** to import that JSON.
4. For just a past mission's setup, use **Load setup from an earlier saved mission or file → Upload saved mission · JSON**. Select the imported record and choose Prefill new mission.

Changing hostname, port, browser or device changes the storage origin. Backups are essential; there is no automatic cross-device synchronisation. Keep JSON backups private because they can contain IDs and coordinates.

## What remains dependent on outside services

Independent means you control the code and hosting. It does not make live aviation/weather services permanent or freeze CAA rules/manufacturer manuals. The map library and ZIP decoder are bundled; basemap tiles, weather/radar, postcode lookups and aviation feeds still need internet and their providers. **DATA-SOURCES.md** lists endpoints, attribution and update responsibilities.

The PWA caches the application shell, not live weather/NOTAM feeds. Offline use remains NO-GO. The app is planning support, not CAA approval or flight clearance. Manufacturer values and class/rule guidance need ongoing review.

## Folder guide

- `dist/`: editable browser app, catalogue, icons, local Leaflet assets and service worker.
- `dist/server/index.js`: generated, ready-to-run Worker-style server with assets embedded.
- `worker/`: proxy source and bundled fflate decoder/licence.
- `scripts/`: build, test and Node server tools.
- `test-*.cjs`: regression tests.
- `wrangler.toml`: independent Cloudflare Worker configuration.
- `Dockerfile`, `.dockerignore`: optional conventional container deployment.
- `SOURCE-INFO.json`: base source commit and vendored asset provenance.
- `THIRD-PARTY-NOTICES.md`, `third-party/`: third-party attribution/licences.
- `FILES.sha256`: checksums for the package contents.

No hosting credentials or original Site project configuration are included. Git history is not required to rebuild; you can initialise your own repository from this folder.
