# Changelog

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
