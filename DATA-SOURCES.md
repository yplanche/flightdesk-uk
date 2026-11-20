# Data sources and maintenance

The application source contains the exact source URLs and manufacturer references used by each aircraft/battery profile. Do not assume its catalogue or rules remain current indefinitely. The packaged source preserves all the model mappings, manual/reference links, class options, wind/mass/temperature limits, battery guidance and decision logic of this snapshot; it does not download every linked manufacturer manual.

| Feature | Supplier / endpoint | What is included / still needed |
|---|---|---|
| Map rendering | Leaflet 1.9.4 | JS, CSS, five images and licence bundled under `dist/vendor/leaflet/` |
| Basemap | `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | Internet and compliance with attribution/tile usage policy; no offline tile archive |
| Postcodes | `https://api.postcodes.io/` | Public postcode lookup; postcode input goes to the provider |
| Weather | `https://api.open-meteo.com/v1/forecast` | Internet; public endpoint is subject to non-commercial/provider terms |
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


Version 1.0.0 removes user-paid weather connections and credentials. Open-Meteo public API eligibility and RainViewer eligibility still apply; an AGPL code licence does not grant service access rights. Commercial hosting/use needs a provider-terms review; use a compliant operator-hosted forecast backend or independent official sources if public API eligibility cannot be met. No user subscription controls are included.

## Rain references added in 1.2.0 (reviewed 19 November 2026)

- DJI Mavic 3 manual: https://dl.djicdn.com/downloads/DJI_Mavic_3/DJI_Mavic_3_User_Manual_v2.2_en.pdf
- Mavic 3 Enterprise product/FAQ: https://enterprise.dji.com/mavic-3-enterprise and https://enterprise.dji.com/mavic-3-enterprise/faq
- Mavic 3M: https://enterprise.dji.com/mavic-3-m
- Matrice 4E/T FAQ: https://enterprise.dji.com/matrice-4-series/faq (not applied to 4D/4TD)
- M300 RTK: https://enterprise.dji.com/matrice-300
- M350 RTK FAQ: https://enterprise.dji.com/matrice-350-rtk/faq

No rainfall probability is inferred from manufacturer hardware limits. IP ratings and 100 mm/24 hr references are not converted to mm/h. More restrictive payload/controller instructions may apply. Unmapped aircraft show an unverified reference and conservative dry-weather suggestion. This is a targeted source update, not an exhaustive current aircraft/manual audit.
