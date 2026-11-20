# Flightdesk UK 1.6.1 functional review

The 1.6.0 weather layout looked up a relocated wind input while its containing section was detached. The resulting exception left required controls out of the document and cascaded into aircraft selection, snapshot generation, navigation and flight rendering. The layout now attaches the controls before querying or wiring them. The prior isolated tests did not reproduce the detached DOM lifecycle; a connected-DOM integration regression now covers it.

| Phase | Verification |
| --- | --- |
| Project and records | Browser: named incomplete briefing saves under a stable reference. Automated: new/resume/copy, immutable revisions, draft safeguards, import/export and conflicts. |
| Site and schedule | Automated: coordinates/geography, London time, DST, 30-minute shortcut, NOTAM window and immediate invalidation. |
| Crew | Automated: required IDs/expiry, optional fields, profiles, storage failure and backup validation. |
| Aircraft | Browser: Mavic 3M, Mavic 3T and M300 switch battery model, wind, temperatures, class and endurance defaults. Automated: catalogue mappings, unknown data, class/category boundaries and manufacturer references. |
| Battery | Browser: new set, inspection timestamp, serviceability, note acknowledgement, current charge, automatic duration and committed endurance edit. Automated: defaults, set-specific history, reserve conversion, voltage rejection/quarantine, fault persistence and confirmation dependencies. |
| Airspace | Automated: collection freshness/coverage vs active notice dates, empty collections, relevance filtering, failed refresh, independent review and before-flight changes. Supplier coverage is not guaranteed. |
| Weather | Repaired connected controls and initialization; automated: forecast interval, exceedances, observations, acknowledgements, radar failure/eligibility, map geography and completion distinct from suitability. |
| Final review | Automated: derived completion, missing/unsafe states, traffic-light recommendations, declaration preservation/reset and emergency equipment. |
| Flight | Browser: ground note, immediate take-off entry and Airborne state, advancing timer, airborne note, landing entry with actual times/duration, automatic JSON export. Pre-flight completion does not gate factual recording. |
| Post-flight | Browser: complete debrief saves under same reference. Automated: immutable revisions, draft recovery, corrections, backup identity and conflicting imports. |
| Reload and PWA | Browser: cached-version detection and update; latest-record selection retains the saved log after reload, while an explicit new flight remains separate. Automated: offline cache, updates, source identity and restore. |

Records are local pilot-entered evidence, not telemetry, independent compliance certification or a flight clearance. Live supplier data and device-specific behavior require operator checks. No real aircraft was operated during browser tests.
