# Install and transfer Flightdesk

For a complete independent app, start with START-HERE.md, README.md and DEPLOYMENT.md. Serve the combined server, not just the static folder: airspace and NOTAM retrieval require its API routes.

Once your independent HTTPS address is online, open it in your browser and wait for “Offline app ready”. Install through the browser's Install / Add to Home Screen action. iPhone/iPad: Safari → Share → Add to Home Screen. Android: Chrome → Install app / Add to Home screen. Desktop: Chrome/Edge address-bar install action or browser menu; supported Safari versions offer Add to Dock. Availability varies by browser/platform.

For local laptop use, run `node scripts/preview-airspace-worker.mjs` and open http://127.0.0.1:4173/. Localhost belongs to that computer. For installation on a separate phone, deploy on HTTPS rather than using that localhost link.

Save missions and export **Download all flight records** on the old address before changing host/browser/device. Restore the JSON on the new origin with **Upload past flight records**. A single mission JSON can instead be uploaded through the saved-setup controls. Saved data does not automatically synchronise between origins or devices.

The app shell can be cached offline. Fresh weather, postcode lookups, basemap/radar and aviation feeds need internet. Offline mode remains NO-GO. Save the live form before applying an app update: the reload clears unsaved draft entries; saved snapshots and inventory remain in browser storage, which should still be backed up.
