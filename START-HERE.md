# Flightdesk UK 1.2.0 — complete upload

For your current GitHub/Cloudflare installation, read UPLOAD-TO-GITHUB.md. This package includes explicit linked flight records and the complete matching application source. Read RECORDS-GUIDE.md before use.

Extract the ZIP. GitHub web uploads accept at most 100 files at a time: upload the complete dist folder first, then upload scripts, worker, third-party and the loose root files as a second batch, all at repository root. Wait for the build of the final commit. Do not select only the loose files at the top level. Do not upload just the ZIP. Before committing, check that GitHub lists dist/airspace-core.js and dist/lifecycle.js among the uploaded paths.

For a more reliable folder update, use GitHub Desktop: clone your repository, copy the extracted package contents into its local folder (replace matching files; keep .git and any existing .github configuration), review the changes, commit and push.

The build command remains python3 scripts/manage.py build && python3 scripts/manage.py test.
The deploy command remains npx wrangler@4 deploy.

The new source consistency check will explain missing files or incompatible airspace exports before building. Keep tests enabled.

## Independent local use

**To run the complete app now:** install Node.js 22+ from https://nodejs.org/, open a terminal in this folder, run `node scripts/preview-airspace-worker.mjs`, then open http://127.0.0.1:4173/.

**To keep your old records:** export **Download all app data** from the original app and restore that JSON in this installation. Personal records are not included in the source package.

**To install on your phone or share a stable address:** follow DEPLOYMENT.md to host the server on HTTPS under your own account. Then use the browser's Install / Add to Home Screen option.

**To change the app:** edit `dist/` or `worker/`, then run `python3 scripts/manage.py build` and `python3 scripts/manage.py test` (Windows: `py -3`).

README.md explains the folder structure. DATA-SOURCES.md explains which services still need internet. This is an independent source snapshot, not a guarantee of flight clearance or future data-service availability.

Optional launchers: `start-windows.bat` on Windows, `start-macos.command` on macOS, or `./start-linux.sh` on Linux. Your OS may require you to explicitly allow scripts; the terminal command above works without these launchers. Open the local address printed by the server and leave the terminal running.

The ZIP is application code, not your personal records. On the original app, save your mission and select **Download all app data**. Keep that JSON beside this ZIP and restore it with **Import flight records / app backup** on the new installation. The JSON includes flights, crew profiles, battery inventory, removed batteries, replacement history and saved settings. HTML/PDF reports cannot restore data.
