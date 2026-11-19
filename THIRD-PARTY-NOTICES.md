# Third-party notices

- **Leaflet 1.9.4**: bundled unmodified JS/CSS/images, with its BSD 2-Clause licence in `third-party/LEAFLET-LICENSE.txt`. Exact download URLs and SHA-256 digests are in SOURCE-INFO.json. Source: https://github.com/Leaflet/Leaflet/tree/v1.9.4 .
- **fflate 0.8.2**: bundled ZIP decoder in `worker/fflate.mjs`; MIT licence in `worker/FFLATE-LICENSE.txt` and `third-party/FFLATE-LICENSE.txt`. Also embedded in the generated Worker.
- **OpenStreetMap**: map attribution is preserved. Tile service use has separate provider policies; no map tiles are redistributed in this archive.
- **Open-Meteo**: forecast attribution and CC BY 4.0 reference remain in the app. API usage eligibility/service arrangements must be checked separately.
- **RainViewer**: imagery attribution, palette reference and eligibility declaration remain in the app. No radar imagery is redistributed in this archive.
- **NATS**: source attribution and visualisation limitations remain in the app and proxy metadata. No live NATS dataset/NOTAM collection is included in the archive. Provider terms govern retrieval/use.
- **DJI and CAA**: manufacturer and regulatory references are preserved as links and catalogue notes; these organisations do not endorse this app. Linked PDFs/manuals are not redistributed here.

First-party application code is designated AGPL-3.0-only by the project owner, subject to confirmation of ownership/authority described in COPYRIGHT.md. The bundled permissive Leaflet (BSD-2-Clause) and fflate (MIT) components retain their original notices and are compatible with inclusion in an AGPL-covered combined distribution. External data, service terms and artwork are not relicensed by that designation. Third-party components retain their own licences, and service usage is subject to each provider's terms.
