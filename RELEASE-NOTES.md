# Flightdesk UK v1.1.0 — 19 November 2026

This compatible feature release makes pre-flight, flight and post-flight records explicit and linked by one stable flight identity. Prepared from the user's GitHub `main` commit `ae27d4ff6ee8db34bae14cd2d963213af3421242`; the repository and Cloudflare production were not modified remotely.

- Renames the ambiguous save action to **Save pre-flight briefing** across readiness/navigation controls, with an explanation of its scope.
- Adds a searchable Saved flights view with phase status, revision history, Resume, Create new from setup, complete-flight JSON and printable HTML exports.
- Keeps identity/time when resuming an unflown plan; uses a different identity for another flight. Named current plans are saved before switching. Unchanged briefing saves avoid duplicates.
- Prevents a second take-off or cancellation under an already executed flight identity. Legacy multiple-sortie histories remain readable and unchanged.
- Separates browser-local unfinished debrief recovery drafts from saved revisions; adds explicit Save/Discard/Cancel protection when switching away.
- Adds validated complete-flight imports and duplicate/conflict protection, retaining all-data backup and existing records.

Read **RECORDS-GUIDE.md** for the workflow and **UPLOAD-TO-GITHUB.md** for deployment. Existing planning/airspace/weather gates are retained. This release is not a CAA certification or a new audit of regulations/manufacturer limits.

## Compatibility and known limits

Existing browser keys and briefing schema remain readable; new fields/stores are additive. Records are linked by original IDs, never titles. Old histories are not rewritten. All-data backup remains essential, especially before updating or changing website address. Data is browser-local; no automatic multi-device synchronisation is introduced. Different same-ID histories are rejected on import rather than silently overwritten. See RECORDS-GUIDE.md for details.

This package contains source/build assets, not personal records. No remote upload, deployment, Git tag or account setting change was performed. Existing source/licensing notices and provider-service limits still apply.

# Patch 1.0.2 — 19 November 2026

This complete package includes the Cloudflare fingerprint correction from 1.0.1. Required source files and the airspace API are checked before building, so partial/mixed uploads produce an actionable error. Upload the full dist, scripts and worker folders along with root files. The app/data schema and flight-planning behaviour are otherwise retained.

# Flightdesk UK v1.0.0 — 18 November 2026

## What changed

- Reordered the field workflow: mission/site, crew/aircraft, weather/airspace, battery/controller, final briefing, flight recording and debrief. Persistent navigation reaches every phase.
- Fixed supported Open Category VLOS scope, with an adjacent FPV observer arrangement where relevant. Unsupported/BVLOS assessment remains outside readiness. A2 competence is asked only for A2. Final VLOS review stays explicit.
- Converted repeated crew, airspace, weather and battery final checkboxes to read-only summaries of their originating checks. Configuration changes invalidate relevant declarations; unrelated notes do not.
- Replaced the fixed NOTAM ±2-hour search with a site session, editable end (default assumption +2 hours) and ±30-minute planning buffers. Added before-each-flight change checking, source/generation/download distinction and explicit permission resolution. Independent official review can address unavailable supplementary feeds/layers while preserving their failed/stale status.
- Added a forecast-versus-limits table and on-site conditions assessment. Removed paid-weather API-key, subscription and bookmark controls. Forecast warnings remain purple; unacceptable/uncertain on-site conditions block an assessed launch.
- Added reusable aircraft/asset/payload/endurance setup profiles, optional individual pack IDs, matching configuration checks, controller review and documented battery verification when cell telemetry is unavailable. Reference voltages are never substituted for measured readings. Known faults cannot be cleared by changing verification method.
- Added pilot-entered take-off/landing, timestamp-based elapsed time, optional event log, already-airborne UNASSESSED recovery, cancellation/postponement and post-flight debrief revisions. No drone control, charge telemetry or continuous aviation surveillance is claimed.
- Added actual-time corrections preserving previous values, defect quarantine and documented return to service. No flight count is converted into a full battery charge cycle.
- Added recoverable planner drafts and exact-version app/build information. Flight events save immediately; debrief revisions save explicitly. PWA updates are deferred during an active flight.
- Removed silent 300-record truncation. JSON backups support up to 50 MB at the parser boundary, redact credential fields and preserve flight logs/maintenance history. Importing a different revision of an existing sortie ID aborts rather than discarding either history.
- Added AGPL-3.0-only, origin notices, a separate name/logo policy, changelog/version scripts and a matching source download for the running build.

## How to use the three phases

1. **Pre-flight:** select/reuse the setup, set the take-off time and session, inspect the site/aircraft/controller/batteries, obtain and review current official aviation information, assess forecast and actual local conditions, then complete final readiness. Save a briefing even if it is incomplete or NO-GO.
2. **Flight:** when the assessed workflow is complete, Record take-off saves the briefing first. The actual launch interval must fit reviewed forecast/airspace coverage. Alternatively record an already-airborne flight factually as UNASSESSED with an actual time and explanation. The latter does not approve or reconstruct the launch. Record landing separately from abort/return intention.
3. **Post-flight:** select the recorded sortie, record outcome/charge where known, choose Nothing to report or describe a defect/follow-up, then save the debrief revision. Export all-data JSON after the session. The flight/debrief HTML report can be printed as PDF.

## Data compatibility and migration

Existing profile and flight-snapshot storage keys/schema remain readable. Old records are not assigned invented historical app versions. New metadata is additive; separate stores hold sorties, maintenance events, drafts and operating profiles. This release keeps browser localStorage and handles quota/write failures visibly; it does not migrate data to an account or server.

Old weather-service settings are archived inertly; credentials are discarded/redacted. An imported historical GO is not a current GO. Repeated imports of identical IDs are idempotent. Different copies of the same sortie/maintenance ID require conflict resolution; keep both backups. Multiple imported active flights are rejected for explicit resolution.

The 50 MB file limit is not a promise that a browser can store 50 MB. Browser quotas are typically smaller. Preserve disk backups, especially before updating/deleting/moving address. Backups are unencrypted and contain private records. Local history is editable and is not a certified or cryptographically tamper-proof logbook.

## Scope, limitations and release review

- Baseline: independent source package dated 13 November 2026, base commit `d2dce74ac52f833311e50c8451aaeced49f3f01b`. Your current GitHub repository was not fetched or modified; reconcile later custom changes before upload.
- No production publication, Git tag or Cloudflare account change was performed. The package runs independently and includes its prebuilt Worker.
- This is planning/recording support, not CAA approval, airspace clearance or certification. Current CAA/manufacturer guidance, authorisations, permissions and actual conditions still need operator review.
- NOTAM Q-line circles, KML boundaries, altitude screening and unparsed activity schedules are supplementary. Unsupported schedules/geometry remain for manual review. Disappearance from a feed does not establish cancellation.
- The aircraft catalogue retains its source/review dates and unknown values. The release does not claim an exhaustive fresh audit of every DJI manual or make unavailable cell telemetry appear measured.
- Free weather/radar service access has independent eligibility/usage limits. The code licence permits commercial use; it does not grant commercial access to every data service.
- Copyright/brand ownership and contact remain identified as unconfirmed in COPYRIGHT.md and NAME-AND-LOGO-POLICY.md. Confirm authority to license, including applicable Imperial/contributor rights, before a public legal release. No registered trademark is claimed.
- Browser timers and local clocks are best effort. Missing times may be explicitly unknown; no aircraft state is detected. Active logging can continue offline, while no new assessed GO is issued offline.
- Planner drafts recover setup/observations as references, clearing live declarations/readings. Save debrief revisions explicitly: typing an unfinished debrief is not a durable debrief record.

See BUILD-VERIFICATION.txt for the completed test and browser checks and UPLOAD-TO-GITHUB.md for exact deployment steps.
