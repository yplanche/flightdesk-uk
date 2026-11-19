# Cloudflare build fix — Flightdesk UK 1.0.1

The previous release-fingerprint check stopped ordinary builds when the uploaded source differed from the packaged source. The log identifies a fingerprint mismatch, not which file changed. Missing optional dotfiles, line-ending changes or intentional edits can cause it.

## Install this patch

1. Extract Flightdesk-UK-v1.0.1-Cloudflare-build-fix.zip.
2. Open your existing flightdesk-uk GitHub repository at its root.
3. Choose Add file > Upload files. Upload the contents of this patch at repository root, retaining the scripts subfolder. Replace matching files. Do not nest the enclosing extracted folder inside the repository.
4. Commit the changes. Your connected Cloudflare build should start; check its build log. If it does not start automatically, retry the deployment for that latest commit in Cloudflare.

Files supplied:
- scripts/release-metadata.py: ordinary builds warn on an old seal mismatch and generate an exact fingerprinted build/source archive.
- scripts/seal-release.py: explicit release sealing still rejects reusing a sealed version for changed source.
- package.json: app version 1.0.1.
- RELEASE.json and CHANGELOG.md: patch release metadata.
- test-cloudflare-rebuild.cjs: regression test reproducing optional-file and line-ending differences.
- This instruction file.

No Cloudflare configuration changes are needed. Keep:
Build command: python3 scripts/manage.py build && python3 scripts/manage.py test
Deploy command: npx wrangler@4 deploy

Keep all other app files. Do not delete the repository or RELEASE-IDENTITIES.json. The patch changes no flight-record schema, browser data, account settings, DNS or nameservers. The generated Worker and app source download are rebuilt automatically by the build command; this small patch intentionally contains no prebuilt Worker.

Before applying a PWA update, save your briefing/debrief and back up records. The updated app should show v1.0.1 after a successful deployment and safe reload. No production deployment has been performed by this patch preparation.
