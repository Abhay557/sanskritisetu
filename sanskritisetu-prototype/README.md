# SanskritiSetu — SIH 2026 Prototype (SIH26044)

Offline-first living heritage discovery, last-mile transit & ground-readiness engine.
Built from BRD `BRD-SIH2026-SS-01` + pitch deck. No Stitch — pure code.

## Run
```bash
cd sanskritisetu-prototype
npm install
npm run dev
```
Open http://localhost:5173

## What is demoable (maps 1:1 to BRD)
- **Radar (TCD BR-TCD-01/02/03):** date-window filter, 6 festivals with lunisolar notes, peak windows, search
- **Event + GRI (GRL BR-GRL-01):** A–D badges, cash/sanitation/health/road, transit lifeline, etiquette, homestay
- **Offline (ZGE BR-ZGE-01/02/03):** <60MB bundles, download simulation persisted in localStorage, on-device search + dialect box, dead-zone toggle
- **Transit · Cash · Permit (GRL-02/03 + EMB-03):** cash estimator (days × burn + craft), ILP/RAP checklist, printable checkpost slip (Print button → print CSS)
- **Market · Stay (EMB-01/02):** 4 artisans TRIFED/ODOP, 100% payout, masterclasses, NIDHI/SAATHI stays
- **SOS · Etiquette (TSR-01/02/03):** 40-char payload generator, 112 NERS routing mock, PHC directory, Dos/Don'ts
- **DTO Desk (ATW-01/02/03):** risk-scored queue, batch approve safe, spam quarantine, footfall heatmap + overload diversion

## Judges flow (3 min)
1. Traveler → Radar → open Bastar Madai → see GRI C + lunar shift
2. Transit tab → 3 days + ₹1500 craft = cash warning → Print slip
3. Header → Simulate dead-zone → Offline tab → bundles still work
4. SOS tab → SEND MOCK SOS → 40-char payload
5. Header → DTO Desk → Batch approve safe → heatmap Rann 91% divert

## Tech
Vite + React 18 + Tailwind v4. All mock DPI data in `src/data/mock.js`. Sovereign-ready: no external maps/payments; prints + SMS paths stubbed for FastAPI/PostGIS/Bhashini/112 integration.
