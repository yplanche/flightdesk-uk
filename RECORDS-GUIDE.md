# Flight records — v1.2.0

## Prepare today, fly tomorrow

If a previous browser draft is waiting, the record manager displays Recover previous draft and Start fresh. Make that explicit choice before switching to another flight. A blocked action now explains the next step beside the controls.

1. Enter a project title, mission title and planned date/time. Select **Save pre-flight briefing** at any stage, including an incomplete NO-GO plan.
2. Tomorrow, open **1 · Flight record & project → Saved flights**, select that flight and press **Resume this planned flight**. Its reference and planned date/time stay the same. Renew current readings, weather, aviation information and live declarations before take-off. Recovering a browser draft also retains its original flight identity.
3. **Record take-off** saves and links the launch briefing automatically. Take-off, events and landing save immediately in this browser.
4. Open the same flight in **Post-flight debrief**, enter the outcome and select **Save post-flight debrief**. This appends a revision without overwriting the original briefing or events.
5. Use **Download all app data** after fieldwork and verify the JSON is on disk.

A stable full flight ID links all phases. Project/mission names are labels, not database keys. Changing a title does not create another flight. The shorter FD reference is for display; full IDs perform all linking.

## Which action should I use?

| Action | Result |
|---|---|
| Save pre-flight briefing | Saves only the current pre-flight plan as a dated revision. Unchanged saves do not add a duplicate. |
| Resume this planned flight | Continues the same unflown flight; keeps identity and planned time, renews live checks. |
| Create new flight using this setup | Creates a different identity, copies reusable setup and resets live checks/readings. The current named plan is saved first. |
| Create blank flight | Creates a different identity with a blank setup; earlier saved records stay intact. |
| Open flight / post-flight debrief | Opens the selected recorded flight without replacing the separately identified pre-flight editor. |
| Save post-flight debrief | Saves the selected flight's debrief as a new revision. No need to re-save pre-flight. |
| Download this complete flight · JSON | Exports the selected flight's briefing revisions, flight events, debrief revisions and any unfinished debrief recovery draft. Can be imported. |
| Download this complete flight · HTML/PDF | Readable evidence report for that flight. Open HTML and print to PDF; use JSON for restoration. |
| Download all app data | Backs up all flights, crew, battery inventory/history, settings and recovery drafts. |
| Import flight records / app backup | Restores a complete-flight JSON or all-data backup through validated merging. |

You may prepare other flights while an earlier debrief remains incomplete. If you have edited the debrief, switching work prompts **Save and continue / Discard changes and continue / Cancel**. Unfinished debrief edits have a separate browser recovery draft and are visibly distinguished from saved revisions. Only one flight can be recorded airborne. A flight identity with a recorded take-off or outcome cannot be used for another take-off: create a new flight.

## Recovery, compatibility and limits

Data remains in this browser at this exact website address; no account/cloud synchronisation is added. Clearing browser data, changing devices or changing hostname requires your disk backup. Downloads are unencrypted and may contain precise locations, crew IDs and other private records; review before sharing.

Existing records are grouped using their existing mission/flight and launch-briefing IDs. Nothing is grouped by title and no old history is silently rewritten. Legacy records containing several sorties under one identity retain every sortie. Select the exact sortie in Post-flight. Older records missing mission IDs receive a derived display grouping only.

Identical imports are duplicate-safe. Conflicting copies of the same immutable briefing, sortie or debrief-draft ID are rejected rather than silently replacing either history. This is not bidirectional multi-device synchronisation: keep both backup files and resolve the conflict deliberately. Single-flight downloads do not include the complete shared battery/maintenance inventory; use all-data backup for recovery of the whole app.

Browser recovery drafts are best effort and storage writes can fail visibly. Save named briefing/debrief revisions and keep disk backups. An exported historical GO is not a current clearance. The records are pilot-entered and locally editable, not certified or tamper-proof evidence.
