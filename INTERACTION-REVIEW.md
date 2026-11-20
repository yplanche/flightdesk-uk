# v1.4.1 flight status/action review — 20 November 2026

Actual assessed take-off button handlers are exercised in a deterministic VM using the real lifecycle transition/commit code, with valid/blocked/failing-save fixtures. Browser QA checks compact night field, visible rejection feedback, timer status and live log workflow using explicitly synthetic records; no real flight is performed. Earlier evidence below describes its named releases.

# v1.4.0 flight activity and files review — 20 November 2026

Flight log rendering uses saved data and keeps the active flight visible. Rows include take-off, event notes, landing and corrections, linked by stable flight identity to briefing/debrief revisions. Complete JSON and readable HTML are dated disk copies; browser autosave remains separate. Recovery is explicitly limited to unsaved Flightdesk log files. Desktop Chrome QA used an explicitly synthetic UNASSESSED recovery take-off, then an event and landing. All three rows appeared immediately; landing downloaded complete JSON. The downloaded JSON was validated for matching briefing/flight identity and all events; the HTML event table was checked. Reload plus draft recovery retained all rows. No actual flight was performed, and assessed launch gates were not bypassed. Historical interaction notes below apply to their named releases.

# v1.3.2 weather layout review — 20 November 2026

Layout-only revision: initial limits, forecast/chart/map/radar information, observations, then decisions. Existing field IDs and handlers retained. Required local assessment and forecast-risk acknowledgement precede the overall weather declaration, which is the final Weather control. Earlier verification notes below describe historical layouts, superseded by this release.

# v1.3.1 focused interaction verification — 20 November 2026

Browser QA used the existing explicitly synthetic local test flight. No real flight or official clearance was recorded. Existing records were retained.

Verified: incomplete supplier coverage displays collection generation, declared window, requested window and retained candidate count; independent official review checkbox remains checked when permissions are subsequently answered and briefing notes edited; source airspace declaration completes the Airspace section; final check1 is an enabled genuine checkbox; checking a later declaration preserves it; final outstanding list no longer reports airspace incomplete after these reviews.

Automated tests cover all source/result states, older active notices, valid empty results, unlocated notices, stale/partial/both coverage, official manual review with unavailable sources, missing reference, and completed-but-unresolved restriction assessments. Unresolved restrictions still block go. Note editing no longer rebuilds/repositions the NOTAM list on blur.

No production deployment or GitHub write performed. The original v1.3.0 verification notes follow as historical evidence, with that version’s calculated airspace row superseded by this release’s explicit final checkbox.

# v1.3.0 interaction verification — 20 November 2026

All browser inputs used for this review were explicitly synthetic QA data; no flight was launched or represented as operationally approved. Existing browser records were retained. No production deployment or repository write was performed.

Verified in Chrome against the managed preview:
- Recovery setup restores the same flight reference with live checks renewed.
- Save pre-flight briefing in the final review saves a dated revision and gives local feedback.
- Create new flight from current setup produces a different visible reference and resets live reviews.
- Genuine final declarations can be checked and remain checked after later declarations/save. Derived rows have no visible checkbox and link to their source section. VLOS summary can complete before the final declaration.
- Completed battery checks turn the section green. Cell measurement and battery confirmation remain checked while navigating/reviewing unrelated sections.
- Today records actual UTC and London time. New records stage inspection until saved; an existing selected record updates immediately. Cancel edits restores saved fields. Unsaved selected-battery edits appear as a blocker.
- Weather completes independently of unresolved crew/airspace sections. Recorded unacceptable actual conditions leave completion green, expose a red risk badge and block suitability. Acknowledged forecast exceedance shows an orange caution badge.
- Identical successful forecast refresh retains its acknowledgement. A changed relevant operator wind limit resets the forecast/on-site review. Pending/failed forecast freshness remains a blocker.
- Radar has a persistent visible panel, outside nested map disclosures, with eligibility/no-data state. Provider success/failure/offline/current/retained-frame states are also covered by a DOM harness; live provider imagery availability is not guaranteed.
- Safe PWA update loaded the new build and preserved local records.

Automated coverage additionally exercises lifecycle/backup/import conflicts, launch guards, recoverable drafts, invalid data, missing source files, NOTAM processing and stale/manual paths, cell faults/quarantine, inspection DST/midnight/legacy history, source offer/version consistency and reproducible rebuilds.

Limits: no physical drone/remote-control integration or real flight was tested. Desktop Chrome was directly exercised; physical iPhone/Android installation and other browser engines were not. The interface reports dependencies and data/provider failures, but those tests do not certify flight legality or actual conditions. Flight-record historical codes remain unchanged for compatibility; new displays use the traffic-light recommendation wording.


Version 1.5.0: Flight recording works independently of pre-flight readiness, including offline. Import a saved briefing using the normal import control, then select its reference in Flight shown. Log event works before take-off, airborne and after landing. Ground events, take-off, landing and debrief share one reference. Current setup without a saved briefing is explicitly identified as setup only. Recording remains UNASSESSED and never changes the pre-flight recommendation.


Version 1.6.0: Aircraft temperature limits share a row before manufacturer wind; Open Category VLOS scope follows manual notes. Weather shows the manufacturer wind beside the editable operator wind, initially set to the manufacturer value. Battery selection supplies editable 20% landing reserve, 2min contingency and a manufacturer-derived full-charge-to-reserve suggestion, or the matching saved battery settings. Charge and time planning precede cell checks. Current controller charge is never inferred from a stored charge. Valid flight-time edits (on leaving an input), or battery-readiness confirmation, save set-specific settings with provenance/history; changing reserve proportionally rescales the reference time as a linear estimate. These defaults never confirm health or readiness automatically.
