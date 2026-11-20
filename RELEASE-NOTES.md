# Flightdesk UK v1.4.1 — 20 November 2026

Night operation planned now occupies the same grid width as Purpose. Flight status is an explicit Airborne/Not airborne label with a separate HH:MM:SS clock. A saved take-off starts the clock; saved landing stops it and retains the final duration. Landing events capture take-off, landing and elapsed seconds automatically, displayed in the event table and complete exports.

Take-off validation now responds beside the controls instead of appearing as an inert, dark disabled button. Assessed take-off still requires applicable readiness, conditions and coverage; a rejected action clearly says Take-off NOT recorded and does not start a timer or create an event. Duplicate/active-flight actions and storage failures remain guarded. Disabled actions are visibly grey.

Log event appends immediately to the airborne flight, or the selected recorded flight after landing; after-flight entries are explicitly labelled. Choosing an event type/typing alone does not save an event. Pre-flight checkboxes remain briefing evidence, not flight activity events.

Regression checks execute the actual assessed take-off/event/landing handlers, tick the clock, verify persisted duration and frozen landing time, append a post-flight note, and reject missing-review/storage-failure paths without phantom flights. Existing records remain compatible; historical landing durations can be derived for display without rewriting old events.

No remote GitHub write or production deployment.

# Flightdesk UK v1.4.0 — 20 November 2026

Flight now shows a live event table, explicit flight reference selector, and event entry without nested disclosures. Recording take-off, events, abort intention and landing saves immediately in browser storage and updates the table. The active flight remains visible until closed. Flight recording remains manual, with assessed-launch gates unchanged.

The Records and downloads panel shows saved briefing revisions, event count and saved debrief revisions for that flight. It provides complete-flight JSON (linked briefing + log + saved post-flight revisions), a readable HTML report with an event table, an embedded briefing preview and navigation to that flight’s debrief. JSON downloads are dated copies and do not update earlier disk files. A visible option defaults to requesting a complete JSON download at landing; browser download permissions still apply.

The emergency recovery importer is under an explained Advanced recovery disclosure. It accepts Flightdesk unsaved event-log recovery JSON, not DJI telemetry or normal backup files. Normal imports remain at the top of the app. Recovery can now safely extend an existing saved sortie’s append-only event/debrief history while rejecting conflicting histories and multiple active flights. On write failure the saved log remains untouched and the unsaved recovery download is offered; normal complete downloads are blocked to prevent omission of the pending action.

Historical source archives now deploy through the included Cloudflare static-assets binding instead of being embedded in Worker JavaScript, keeping the Worker small as release history grows. Existing source-download URLs are retained; local preview supports the same archive route. Upload the matching wrangler.toml with this release; the usual deploy command uploads those assets automatically.

No storage schema migration, remote GitHub write or production deployment. Existing records and earlier workflow changes retained.

# Flightdesk UK v1.3.2 — 20 November 2026

Weather now follows the review sequence: preset aircraft/planning limits; forecast values and supporting charts/maps; recent radar; observations; decisions and final acknowledgement. Operator wind and visibility inputs move into the initial planning-limits panel, alongside precipitation thresholds. Manufacturer wind/temperature references appear there as text; their configuration remains editable in Aircraft.

The required local assessment and forecast-risk acknowledgement are in the final Decisions panel. The overall weather-review checkbox is the last control in Weather. Existing inputs, recorded-value bindings, declaration dependencies and weather suitability rules are retained. No record migration, production deployment or remote GitHub write was performed.

# Flightdesk UK v1.3.1 — 20 November 2026

- NOTAM outcomes explicitly distinguish pending/not loaded, retrieval failed, independent archive, old collection, incomplete/unknown time coverage, current local matches, uncertain locations and no relevant matches. Generation time, declared coverage and requested window are shown separately.
- Older notices remain included when active in the screening window. Zero local matches never establish a clear result when the collection is unusable or unlocated notices remain.
- The final Airspace considered row is now a genuine clickable declaration. Its source review can complete through the current automated collection plus official briefing record, or a recorded independent official briefing when data is stale/unavailable. The app does not require a successful supplier refresh for the independent route.
- Review completion and resolved restrictions are separate. An assessed unresolved restriction can be recorded, but continues to block go/take-off. Changing the permissions answer does not erase the independent NOTAM review; changes to site, session, aircraft, radius or height still invalidate applicable reviews.
- Corrected an old help reference to a fixed ±2-hour window: the displayed operating-session screening interval is the actual review scope.

Compatible with existing records/backups; historical snapshots retained. No remote deployment performed. No new regulatory or manufacturer audit. Download all app data before updating.

# Flightdesk UK v1.3.0 — 20 November 2026

Prepared from GitHub main `dbc6ad1e2f4cf3ae6cd98dc9a786ec0ae36e731c`. No remote repository or production deployment was changed.

- Required answers/reviews control completion colour. A completed review can identify unsuitable conditions: its green completion badge is separate from the orange/red operational risk badge. Weather no longer uses text matching against global blockers to decide whether its section is complete.
- Recommendations now read “go” (green), “fly with caution” (orange) and “conditions unsuitable” (red). Internal historical status codes remain compatible.
- Calculated final-review rows are status text with source links. Actual declarations remain clickable. VLOS summary no longer depends circularly on the following final declaration.
- Forecast source, interval, values and required acknowledgements are visible together; radar always has a visible panel. On-site observations and assessment follow in a matching layout. Critical reviews are not nested in disclosures.
- Forecast review is retained for identical values over the reviewed flight interval. Pending refresh temporarily blocks current weather completion; changed relevant values or a failed refresh require renewed review. Unrelated forecast hours do not reset the declaration.
- Today · inspected now records the actual instant plus London date/time. Selected saved batteries update immediately; a new/changed battery editor must be saved. Inspection history is retained in backups without clearing faults/quarantine. Legacy date-only inspections retain unknown time.
- Unsaved battery editor changes are identified explicitly; save the record or cancel edits before proceeding. Take-off recording has a local explanation when unavailable.

Existing browser data and backup schemas remain compatible. Download all data before updating. Newly added timestamps are optional for older records; saved historical briefings are not rewritten. No paid weather subscriptions were added.

This is a workflow/software update, not a new regulatory/manufacturer audit or CAA certification. Forecast, radar and airspace providers may be unavailable; the app must display those failures and retain the independent briefing route.

# Flightdesk UK v1.2.0 — 19 November 2026

Reassessed against the user's GitHub main at `b6951b076620665ecb7da988ef55961a9d1592f6` (v1.1.0 upload). No remote repository or production deployment was modified.

- Fixed apparently inactive new-flight actions: pending recovery was only explained elsewhere. Recovery choices and clear result/blocker messages now appear in the record manager. Successful actions reveal the changed editor; existing saved histories remain intact.
- Added explicit feedback for reusable-setup apply/remove actions when nothing is selected.
- Reordered preparation: project, site/time, crew, aircraft, battery, airspace, weather, final review, flight, post-flight.
- Separated visible Forecast and Observations sections with matching wind, gust, precipitation, temperature and visibility cards. Observation inputs are no longer hidden in a nested disclosure. Unknown readings stay blank; observed exceedances block assessed take-off. Creating a new flight clears observations; resuming same-flight references requires fresh confirmation.
- Moved precipitation rate/probability planning thresholds from Aircraft to Weather. Added sourced rain guidance for Mavic 3, Mavic 3 Enterprise/M3M, Matrice 4E/T, M300 and M350 configurations where verified. Known no-rain guidance cannot be raised by an operator threshold. Other models remain explicitly unverified with a conservative 0 mm/h suggestion.
- Manufacturer IP/daily rainfall statements remain source references; no unsupported hourly conversion is performed. Probability stays an operator planning choice and is not prefilled as a manufacturer tolerance.
- NOTAM/mission search radius starts at 3000 m (3 km). Typing changes invalidate earlier review immediately and debounce map/list recalculation; no refresh-button press is required for radius screening. Full-collection feeds retain their true freshness/coverage status and official briefing requirements.

The all-data backup and existing local records remain compatible. Keep disk backups before updating. Browser-local stores do not synchronise between devices. Read RECORDS-GUIDE.md and UPLOAD-TO-GITHUB.md.

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


Version 1.5.0: Flight recording works independently of pre-flight readiness, including offline. Import a saved briefing using the normal import control, then select its reference in Flight shown. Log event works before take-off, airborne and after landing. Ground events, take-off, landing and debrief share one reference. Current setup without a saved briefing is explicitly identified as setup only. Recording remains UNASSESSED and never changes the pre-flight recommendation.


Version 1.6.0: Aircraft temperature limits share a row before manufacturer wind; Open Category VLOS scope follows manual notes. Weather shows the manufacturer wind beside the editable operator wind, initially set to the manufacturer value. Battery selection supplies editable 20% landing reserve, 2min contingency and a manufacturer-derived full-charge-to-reserve suggestion, or the matching saved battery settings. Charge and time planning precede cell checks. Current controller charge is never inferred from a stored charge. Valid flight-time edits (on leaving an input), or battery-readiness confirmation, save set-specific settings with provenance/history; changing reserve proportionally rescales the reference time as a linear estimate. These defaults never confirm health or readiness automatically.
