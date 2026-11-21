# Flightdesk UK — complete independent package

Release **1.4.1 · 20 November 2026**. Includes pre-flight briefing, session-based NOTAM review, manual in-flight recording, post-flight debriefs, reusable setup profiles, recoverable drafts, safer backups and AGPL/version notices. Start with **UPLOAD-TO-GITHUB.md** for your existing GitHub/Cloudflare deployment; **START-HERE.md** covers independent local use.

This package can run without ChatGPT or the original Flightdesk website. It includes editable frontend source, the aviation-data proxy, prebuilt combined server, manufacturer catalogue and source links, PWA icons/manifest/service worker, tests, build tools and independent deployment configuration. Node.js runs the application without installing any npm packages. Python is used to rebuild and run the complete test suite. 

Version 1.4.1 separates completion from suitability, clarifies final-review controls, keeps weather/radar reviews visible and adds timestamped battery inspections. NOTAM screening starts at 3 km. Battery follows aircraft; weather immediately precedes final review.

## Flight records

See **RECORDS-GUIDE.md**. Save pre-flight briefing retains a plan under its stable flight reference; Resume continues it later. Flight events save immediately and post-flight debriefs have a separate save action. Saved flights groups all phases and exports one complete flight.

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
2. Open **Download all app data** beside Print / save PDF.
3. On your independent installation, use **Import flight records / app backup** to import that JSON.
4. For just a past mission's setup, use **Load setup from an earlier saved mission or file → Upload saved mission · JSON**. Select the imported record and choose Prefill new mission.

Changing hostname, port, browser or device changes the storage origin. Backups are essential; there is no automatic cross-device synchronisation. Keep JSON backups private because they can contain IDs and coordinates.

## What remains dependent on outside services

Independent means you control the code and hosting. It does not make live aviation/weather services permanent or freeze CAA rules/manufacturer manuals. The map library and ZIP decoder are bundled; basemap tiles, weather/radar, postcode lookups and aviation feeds still need internet and their providers. **DATA-SOURCES.md** lists endpoints, attribution and update responsibilities.

The PWA caches the application shell, not live weather/NOTAM feeds. Offline mode cannot issue a new assessed GO. An already-started manual timer and local flight log continue offline. The app is planning support, not CAA approval or flight clearance. Manufacturer values and class/rule guidance need ongoing review.

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

## Version, source and licence

First-party application code: **AGPL-3.0-only**, subject to the ownership confirmation described in [COPYRIGHT.md](COPYRIGHT.md). This release does not assert a verified exclusive copyright holder. See [LICENSE](LICENSE), [NAME-AND-LOGO-POLICY.md](NAME-AND-LOGO-POLICY.md) and [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). Anyone may use the code commercially; applicable distribution and modified-network-service source/notice obligations remain.

The footer displays the actual loaded app version; About shows its build/source fingerprint and source download. `package.json` is the single application-version authority. Run `python3 scripts/release.py patch` (or `minor` / `major`) once when preparing a changed release; edit the resulting changelog entry, then build and test. Builds do not bump versions. Tag the verified release as `vX.Y.Z` only when ready; no tag is created automatically.

The build generates a version-specific corresponding-source ZIP under `dist/releases/` and serves it with the app. Keep it available for the users of that deployed version; retain old release archives in subsequent deployments while older clients may remain installed. Modified/self-hosted deployments must rebuild and publish their own matching source archive. No repository URL is guessed. Versioned source fingerprints distinguish modified builds even before a new semantic version is assigned.

After final tests, run `python3 scripts/seal-release.py` to bind this app version to its source fingerprint. Include RELEASE-IDENTITIES.json in the upload. Intentional published changes should increment the app version. Ordinary builds warn rather than fail when the source differs from a local seal, and receive their own fingerprint/source archive. Explicit release sealing remains strict; rebuilds of the same source are allowed. Keep the original ZIP and source archives, and preserve earlier archive URLs while old installed clients remain in use.


Version 1.5.0: Flight recording works independently of pre-flight readiness, including offline. Import a saved briefing using the normal import control, then select its reference in Flight shown. Log event works before take-off, airborne and after landing. Ground events, take-off, landing and debrief share one reference. Current setup without a saved briefing is explicitly identified as setup only. Recording remains UNASSESSED and never changes the pre-flight recommendation.


Version 1.6.0: Aircraft temperature limits share a row before manufacturer wind; Open Category VLOS scope follows manual notes. Weather shows the manufacturer wind beside the editable operator wind, initially set to the manufacturer value. Battery selection supplies editable 20% landing reserve, 2min contingency and a manufacturer-derived full-charge-to-reserve suggestion, or the matching saved battery settings. Charge and time planning precede cell checks. Current controller charge is never inferred from a stored charge. Valid flight-time edits (on leaving an input), or battery-readiness confirmation, save set-specific settings with provenance/history; changing reserve proportionally rescales the reference time as a linear estimate. These defaults never confirm health or readiness automatically.


Version 1.6.1 fixes the weather startup exception that prevented relocated wind controls from being attached and broke aircraft prefilling, navigation and flight recording. The flight log displays take-off immediately and retains ground notes, airborne events, landing times/duration and debrief under one reference. Reload opens the latest recorded activity when there is no saved current plan; the current new setup remains selectable. Update the complete package, including root tests/scripts and metadata, not just dist. After deployment, use Apply update & reload when offered and confirm v1.6.1 in the footer.


Version 1.7.0: Take-off charge starts at an editable 100% planning default. Check/change it using the controller; battery confirmation includes that check, and saved flight snapshots distinguish the default from operator-entered charge. Weather planning inputs are aligned with a separate manufacturer reference above. Saving a debrief attaches it to the chosen flight/log and appends a dated timeline event. Choose Current flight / setup to reuse its matching log or create a debrief-only log if none exists. No flight times are inferred. Current-setup debrief edits are autosaved as a recovery draft before a log exists. Download again after saving later revisions to update the disk copy.
