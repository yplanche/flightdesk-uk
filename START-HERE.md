# Start here

**To run the complete app now:** install Node.js 22+ from https://nodejs.org/, open a terminal in this folder, run `node scripts/preview-airspace-worker.mjs`, then open http://127.0.0.1:4173/.

**To keep your old records:** export **Download all flight records** from the original app and restore that JSON in this installation. Personal records are not included in the source package.

**To install on your phone or share a stable address:** follow DEPLOYMENT.md to host the server on HTTPS under your own account. Then use the browser's Install / Add to Home Screen option.

**To change the app:** edit `dist/` or `worker/`, then run `python3 scripts/manage.py build` and `python3 scripts/manage.py test` (Windows: `py -3`).

README.md explains the folder structure. DATA-SOURCES.md explains which services still need internet. This is an independent source snapshot, not a guarantee of flight clearance or future data-service availability.

Optional launchers: `start-windows.bat` on Windows, `start-macos.command` on macOS, or `./start-linux.sh` on Linux. Your OS may require you to explicitly allow scripts; the terminal command above works without these launchers. Open the local address printed by the server and leave the terminal running.

The ZIP is application code, not your personal records. On the original app, save your mission and select **Download all flight records**. Keep that JSON beside this ZIP and restore it with **Upload past flight records** on the new installation. The JSON includes flights, crew profiles, battery inventory, removed batteries, replacement history and saved settings. HTML/PDF reports cannot restore data.
