# Data sources and maintenance

The application source contains the exact source URLs and manufacturer references used by each aircraft/battery profile. Do not assume its catalogue or rules remain current indefinitely. The packaged source preserves all the model mappings, manual/reference links, class options, wind/mass/temperature limits, battery guidance and decision logic of this snapshot; it does not download every linked manufacturer manual.

| Feature | Supplier / endpoint | What is included / still needed |
|---|---|---|
| Map rendering | Leaflet 1.9.4 | JS, CSS, five images and licence bundled under `dist/vendor/leaflet/` |
| Basemap | `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | Internet and compliance with attribution/tile usage policy; no offline tile archive |
| Postcodes | `https://api.postcodes.io/` | Public postcode lookup; postcode input goes to the provider |
| Weather | `https://api.open-meteo.com/v1/forecast` | Internet; public endpoint is subject to non-commercial/provider terms |
| Optional paid weather | `https://customer-api.open-meteo.com/v1/forecast` | User supplies their own API entitlement/key for that session; none included |
| Radar metadata | `https://api.rainviewer.com/public/weather-maps.json` | Eligibility declaration and internet; recent observations, not a flight-time forecast |
| Radar imagery | `https://tilecache.rainviewer.com/` | Metadata-selected paths, coverage mask and attribution; subject to provider terms |
| UK airspace | `https://nats-uk.ead-it.com/cms-nats/opencms/en/Publications/digital-datasets/` | Server downloads current UAS/AIP ZIP/KMZ/KML, extracts and screens; no packaged live dataset |
| UK NOTAM collection | `https://pibs.nats.co.uk/operational/pibs/PIB.xml` | Server fetches supplementary full PIB; issue time/window checks and independent official briefing required |
| Labelled NOTAM fallback | `https://raw.githubusercontent.com/Jonty/uk-notam-archive/main/data/PIB.xml` | Independent archive fallback; must not be treated as a new authoritative briefing |
| Official briefing | `https://nats-uk.ead-it.com/` | Pilot obtains current authoritative briefing and permissions independently |
| Rules / aircraft manuals | URLs in `dist/rules.js`, `dist/aircraft.js`, `dist/equipment.js`, `dist/app.js` | Linked authoritative/manufacturer material; dated presets need ongoing verification |

The core PWA cache is an explicit allowlist. It deliberately excludes live aviation/weather feeds, auth routes and map/radar tiles. Errors and missing/stale data remain visible. Manual NOTAM acknowledgement does not replace the separate declaration and reference for an actual current official briefing.

Server airspace feeds have an in-memory cache; NOTAM responses are fetched on demand and are not made into an offline clearance cache. Schemas, filenames, API limits and access terms can change. If a supplier changes, update the relevant parser/endpoints and test conservatively before using the results.

Local mission/profile/battery storage is in the visitor's browser, not a shared server database. Independent public hosting does not itself provide accounts, synchronisation or credential verification. Precisely located requests go to weather/map providers as described in the app. Avoid putting keys or personal data into source code or public repositories.
