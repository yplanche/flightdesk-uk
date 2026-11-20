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
