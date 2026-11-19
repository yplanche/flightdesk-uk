# Update your existing GitHub and Cloudflare installation

This is Flightdesk UK **v1.0.0**, prepared from the independent 13 November 2026 source snapshot (base commit `d2dce74ac52f833311e50c8451aaeced49f3f01b`). It was not fetched from your current GitHub HEAD. Preserve a copy of your current repository first, especially any deployment customisations you added afterwards.

## 1. Back up your data

On your existing Flightdesk address, save important briefings and select **Download all flight records**. Verify the JSON file is on disk. Keep this separately from the source ZIP. This package contains no browser records.

## 2. Extract and inspect

Extract `Flightdesk-UK-v1.0.0-GitHub-Cloudflare.zip`. The folder `flightdesk-uk-v1.0.0` contains everything to upload. Read `RELEASE-NOTES.md`, `COPYRIGHT.md` and `NAME-AND-LOGO-POLICY.md`.

The user has selected AGPL-3.0-only for first-party code. The copyright/brand rights holder and contact have not been independently established. Complete that review before a public legal release; the notices do not invent ownership or imply Imperial approval. Editing notices changes the source fingerprint, so make those edits before building your reviewed release; use the release version command if changing an already sealed release.

## 3. Upload to the repository root

Open your existing **flightdesk-uk** repository, choose **Add file → Upload files**, and upload the **contents inside** `flightdesk-uk-v1.0.0` to the root of the repository. Do not upload the enclosing folder as an extra nesting level, and do not upload only `dist/index.html` or only the ZIP.

At repository root you should see:

```
package.json
wrangler.toml
LICENSE
COPYRIGHT.md
NAME-AND-LOGO-POLICY.md
RELEASE.json
RELEASE-IDENTITIES.json
README.md
dist/
worker/
scripts/
third-party/
test-*.cjs
```

Replace matching files with the supplied versions. Keep existing GitHub repository settings, `.git` history, `.github` workflows and Cloudflare account settings. This package does not contain credentials or require DNS/nameserver changes. Do not overwrite unrelated custom files without reviewing them. GitHub Desktop or Git is easier than the web uploader if the browser rejects the file count.

`dist/` includes the editable browser app, generated server, exact-version source download, offline assets and legal notices. Upload it completely. `.gitignore` and `.dockerignore` are useful but their absence does not prevent this deployment; do not upload secrets or personal backups.

Commit the changes with a message such as `Release Flightdesk UK v1.0.0`.

## 4. Check your existing Cloudflare Worker build

Use your already-connected GitHub repository and production branch. Keep the Worker name **flightdesk-uk** and leave the root directory empty/default, unless your existing repository is intentionally structured differently.

| Setting | Value |
|---|---|
| Build command | `python3 scripts/manage.py build && python3 scripts/manage.py test` |
| Deploy command | `npx wrangler@4 deploy` |
| Worker entry point | `dist/server/index.js` (already in `wrangler.toml`) |
| Node version | 22 or newer |
| Python | 3.10 or newer |

No frontend dependency installation is necessary; Wrangler itself is downloaded by `npx` when needed. Use the existing optional preview configuration if working; no extra preview command is required to deploy the production Worker. Saving the GitHub commit should trigger the connected Cloudflare build, if that integration is enabled. Check the deployment log rather than assuming it ran.

The package is already built. The Cloudflare build regenerates the server and version/source metadata automatically. Ordinary builds do not increment the app version or contact an AI service. Do not deploy as GitHub Pages alone: the NOTAM/airspace server routes need the Worker.

## 5. Verify the deployed result

Open your existing Worker URL. About/footer should display **Flightdesk UK v1.0.0**. Compare its build ID with `dist/version.json`. Verify the source download opens, postcode/GPS selection works, map/forecast failures are explained honestly, and the independent official airspace review route remains available.

An installed PWA may still show the previous running version. Open online and use **Apply update & reload** when no flight is recorded airborne. The update action is deferred during an active flight. Recover the saved draft setup if desired; live checks and readings require review. Saved records at the same origin are retained. A different hostname/browser/device requires a JSON import.

The existing ENDIAN-LAB button can continue linking to the same Worker URL. There is no need to change Squarespace nameservers.

## Future code releases

Run `python3 scripts/release.py patch` for fixes, `minor` for compatible functionality or `major` for breaking compatibility. Review `CHANGELOG.md`, then build, test and seal. Keep old published source downloads under `dist/releases/` while older installed clients may still refer to them. See README for the commands.

This ZIP has not been uploaded to your GitHub repository or deployed to your Cloudflare account by this task.
