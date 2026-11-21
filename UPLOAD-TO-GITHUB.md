# Update your existing GitHub and Cloudflare installation

This is Flightdesk UK **v1.4.1**, based on your GitHub main commit `dbc6ad1e2f4cf3ae6cd98dc9a786ec0ae36e731c`. It includes the linked record workflow described in RECORDS-GUIDE.md. Preserve any newer customisations before replacing matching files.

## 1. Back up your data

On your existing Flightdesk address, save important briefings and select **Download all app data**. Verify the JSON file is on disk. Keep this separately from the source ZIP. This package contains no browser records.

## 2. Extract and inspect

Extract `Flightdesk-UK-v1.4.1-complete.zip`. Its top level contains everything to upload. Read `RELEASE-NOTES.md`, `COPYRIGHT.md` and `NAME-AND-LOGO-POLICY.md`.

The user has selected AGPL-3.0-only for first-party code. The copyright/brand rights holder and contact have not been independently established. Complete that review before a public legal release; the notices do not invent ownership or imply Imperial approval. Editing notices changes the source fingerprint, so make those edits before building your reviewed release; use the release version command if changing an already sealed release.

## 3. Upload to the repository root

Open your existing **flightdesk-uk** repository, choose **Add file → Upload files**, and upload the **extracted contents** to the root of the repository. Do not upload the enclosing folder as an extra nesting level, and do not upload only `dist/index.html` or only the ZIP.

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

Commit the changes with a message such as `Release Flightdesk UK v1.4.1`.

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

Open your existing Worker URL. About/footer should display **Flightdesk UK v1.4.1**. Compare its build ID with `dist/version.json`. Verify the source download opens, postcode/GPS selection works, map/forecast failures are explained honestly, and the independent official airspace review route remains available.

An installed PWA may still show the previous running version. Open online and use **Apply update & reload** when no flight is recorded airborne. The update action is deferred during an active flight. Recover the saved draft setup if desired; live checks and readings require review. Saved records at the same origin are retained. A different hostname/browser/device requires a JSON import.

The existing ENDIAN-LAB button can continue linking to the same Worker URL. There is no need to change Squarespace nameservers.

## Future code releases

Run `python3 scripts/release.py patch` for fixes, `minor` for compatible functionality or `major` for breaking compatibility. Review `CHANGELOG.md`, then build, test and seal. Keep old published source downloads under `dist/releases/` while older installed clients may still refer to them. See README for the commands.

This ZIP has not been uploaded to your GitHub repository or deployed to your Cloudflare account by this task.

## Build-failure correction retained from 1.0.1

The original 1.0.0 local-release seal was too strict for normal uploads and builds. Missing optional files, line-ending changes or real edits can change a source fingerprint. Ordinary builds now warn and generate their own exact matching build/source archive instead of stopping. Explicit release sealing still rejects reusing a sealed version for changed source. No Cloudflare setting needs to change.

Check the Cloudflare deployment is building the **latest final commit**, not retrying an older failed commit. The build log must show App version: **1.4.1-…**.

## Complete source upload required

If a test reports that londonDateTime is not a function, the repository has the new test but an older airspace-core module. Replace the entire dist folder, plus scripts, worker and matching root files from this complete package. The build now checks source consistency before generating a Worker. SOURCE-MANIFEST.json is required and should sit beside package.json. Optional .gitignore/.dockerignore omissions do not trigger this consistency check.

## Browser uploads: use two batches

GitHub allows at most 100 files per web upload. This complete project exceeds that count. Do not try to send all files in one web upload.

At repository root, use Add file > Upload files:
1. First drag the entire extracted dist folder into the upload area. Commit it. Confirm paths begin dist/ (not an enclosing ZIP folder).
2. Start another upload at repository root. Drag scripts, worker and third-party, plus all loose root files from the extracted package. Commit them.
3. Wait for the build of the SECOND/latest commit. A build triggered by the first, incomplete batch may fail; do not troubleshoot that intermediate commit.

Alternatively, GitHub Desktop can copy/review/commit/push the entire update in one commit. Preserve .git and existing .github configuration. GitHub official guidance: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

Before the final commit, verify dist/airspace-core.js contains function londonDateTime and exports londonDateTime in its api object. Also verify SOURCE-MANIFEST.json sits beside package.json at root.

## v1.4.1 source archive hosting

Upload the included wrangler.toml and complete dist/releases folder. Historical source archives are retained but deployed as static assets, keeping them out of the Worker code-size limit. The usual npx wrangler@4 deploy command uploads them automatically; no dashboard binding or paid storage setup is required.


Version 1.5.0: Flight recording works independently of pre-flight readiness, including offline. Import a saved briefing using the normal import control, then select its reference in Flight shown. Log event works before take-off, airborne and after landing. Ground events, take-off, landing and debrief share one reference. Current setup without a saved briefing is explicitly identified as setup only. Recording remains UNASSESSED and never changes the pre-flight recommendation.


Version 1.6.0: Aircraft temperature limits share a row before manufacturer wind; Open Category VLOS scope follows manual notes. Weather shows the manufacturer wind beside the editable operator wind, initially set to the manufacturer value. Battery selection supplies editable 20% landing reserve, 2min contingency and a manufacturer-derived full-charge-to-reserve suggestion, or the matching saved battery settings. Charge and time planning precede cell checks. Current controller charge is never inferred from a stored charge. Valid flight-time edits (on leaving an input), or battery-readiness confirmation, save set-specific settings with provenance/history; changing reserve proportionally rescales the reference time as a linear estimate. These defaults never confirm health or readiness automatically.


Version 1.6.1 fixes the weather startup exception that prevented relocated wind controls from being attached and broke aircraft prefilling, navigation and flight recording. The flight log displays take-off immediately and retains ground notes, airborne events, landing times/duration and debrief under one reference. Reload opens the latest recorded activity when there is no saved current plan; the current new setup remains selectable. Update the complete package, including root tests/scripts and metadata, not just dist. After deployment, use Apply update & reload when offered and confirm v1.6.1 in the footer.


Version 1.7.0: Take-off charge starts at an editable 100% planning default. Check/change it using the controller; battery confirmation includes that check, and saved flight snapshots distinguish the default from operator-entered charge. Weather planning inputs are aligned with a separate manufacturer reference above. Saving a debrief attaches it to the chosen flight/log and appends a dated timeline event. Choose Current flight / setup to reuse its matching log or create a debrief-only log if none exists. No flight times are inferred. Current-setup debrief edits are autosaved as a recovery draft before a log exists. Download again after saving later revisions to update the disk copy.
