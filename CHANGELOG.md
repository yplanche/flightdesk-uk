# Changelog

## 1.4.1 — 2026-11-20

Match Night field width to Purpose; explicit Airborne/Not airborne status and second-resolution elapsed/frozen-duration clock; record landing times/duration in log; visible action feedback and disabled styling; allow post-flight event notes on the selected record; validate actual take-off/event/landing handlers.

## 1.4.0 — 2026-11-20

Always-visible flight activity table and event entry; per-flight record inventory, linked briefing preview and complete JSON/readable HTML exports; automatic landing-download option; explained emergency recovery with safe append-only recovery merge.

## 1.3.2 — 2026-11-20

Reorder Weather: preset limits; forecasts with maps/charts/radar; observations; decisions. Move the overall weather acknowledgement to the end, with the local assessment and risk acknowledgement immediately before it. Preserve existing event handlers and review validation.

## 1.3.1 — 2026-11-20

Explain collection generation age separately from time coverage and notice effective dates; distinguish no matches from uncertain/unlocated and failed searches; make final airspace acknowledgement clickable and independent of operational suitability. Recorded official manual review resolves supplier gaps without clearing unresolved permissions.

## 1.3.0 — 2026-11-20

Separate completed reviews from suitability; traffic-light recommendation wording; source-linked final statuses without circular VLOS dependency; visible weather/radar reviews; relevant-interval forecast identity; exact inspection timestamps/history and unsaved battery feedback. Existing local records/backups retained. See RELEASE-NOTES.md.

## 1.2.0 — 2026-11-19

Make blocked record actions explicit with local recovery choices and result feedback; separate matching Forecast/Observations layouts, add observed precipitation validation, move rain/probability thresholds into Weather with sourced aircraft references, reorder aircraft/battery/airspace/weather, and default automatic NOTAM screening to 3 km. Existing record schemas/history retained.

## 1.1.0 — 2026-11-19

Stable per-flight record management across pre-flight, flight and post-flight; explicit save/resume/new-flight controls; grouped revision history and complete-flight exports/imports; recoverable debrief drafts and guarded switching; duplicate-save and repeated-take-off protection. Existing history is preserved. See RECORDS-GUIDE.md and RELEASE-NOTES.md.

## 1.0.2 — 2026-11-19

Supply a complete consistent release and validate required source files and airspace exports before building, so partial/mixed uploads produce actionable errors. Includes the 1.0.1 Cloudflare fingerprint fix. No flight-record schema changes.

## 1.0.1 — 2026-11-19

Fix Cloudflare build failure caused by enforcing a local source seal during ordinary builds. Ordinary builds retain exact fingerprinted identity and source downloads; explicit release sealing remains strict. No flight-record schema changes.

## 1.0.0 — 18 November 2026

First explicitly versioned release based on the independent 13 November 2026 source package. Adds flight-phase workflow, source/licence notices, deterministic version metadata and updated planning features. See IMPLEMENTATION-REPORT.md for implemented scope, tests and limitations. This version number is not a safety/compliance certification.

Existing browser data is preserved; legacy records without app-version metadata remain “not recorded”. Schema versions are independent of application versions. Confirm legal ownership before a final public licence/brand claim.

## Version policy

MAJOR.MINOR.PATCH: breaking supported interface/data compatibility; backward-compatible features; backward-compatible fixes. Increment once for each changed public release. Identical artifact redeployment keeps its version. Preview identifiers use SemVer prerelease syntax. Ordinary builds do not increment versions.


The all-phase functionality, session-based NOTAM review, on-site weather assessment, documented unavailable-telemetry battery review, resilient drafts/backups and flight/debrief evidence are described in RELEASE-NOTES.md. See UPLOAD-TO-GITHUB.md for the existing Cloudflare/GitHub deployment.
