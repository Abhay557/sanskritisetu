# SanskritiSetu — Government Design System (DESIGN_GOV)

Source of truth for the `/gov-grade` loop. Every iteration scores M1–M8 before and after, fixes the lowest scorer, rebuilds.

## Target users (score M6 against these)
1. **Yatri** — Hindi-first, low-end Android, 2G/offline, low literacy. Needs: bilingual labels, icons + text, offline bundles, cash/ATM truth, big touch targets.
2. **DTO officer** — district desk, weekly review target 2 min. Needs: screened queue, risk chips, approve-all-clear, footfall load bars.
3. **Artisan/host** — payout clarity. Needs: full-payout line, TRIFED/ODOP/NIDHI badges, masterclass price.

## Tokens (locked)
- Accent: sindoor `#a63a22` (single accent, saturation <80%). Neutrals: stone only.
- Heritage ground: paper `#fff9f0`, sandstone `#f7ecd9`, marigold `#e9a319` (highlights), peacock `#0e6b6b` (secondary info only).
- Gov navy for official chrome only: `#1a3a6b` (header text/links on white). Tricolor strip: `#FF9933` / `#FFFFFF` / `#138808` (decorative 3px bar, never as text).
- Shapes: panels `rounded-2xl`, controls `rounded-lg`, tags `rounded-md`. No other radii.
- Type: display `Yatra One` → fallback `Rozha One` (both Devanagari-capable, Indian foundries); body `Baloo 2` → `Mukta`. T numerals `tnum`. Max 65ch body. `text-wrap: balance` on display.
- Motifs: `src/components/motifs.jsx` (jaali band, rangoli hr, paisley, diya row, temple frieze) + `.jaali-band` CSS. No remote illustration URLs.
- Maps: `src/components/app/MapPanel.jsx` — OpenStreetMap embed iframe (zero-dep) + Bhuvan link; offline fallback note; coords live in `src/data/mock.js` per festival.

## Metrics (0–10 each, fix lowest first)
- **M1 Gov chrome**: emblem + `भारत सरकार | Government of India` + tricolor strip + links to india.gov.in/pmindia.gov.in present. 10 = all present, alt text correct.
- **M2 Bilingual**: nav + primary actions carry HI + EN. 10 = 100% of tabs/buttons bilingual, `lang="hi"` on Hindi strings.
- **M3 Accessibility**: skip link, focus-visible, contrast ≥4.5, targets ≥44px, every meaningful img has alt, no `window.alert`. 10 = checklist clean.
- **M4 Performance**: `npm run build` passes; gov images local; directory imgs lazy + sized. 10 = pass, no new >500KB chunk beyond govTourism bundle.
- **M5 Trust**: every gov claim has source link; footer shows data source (district websites via NPI), asset attribution, last-updated date. 10 = all present.
- **M6 User fit**: Yatri sees offline/cash/transit in ≤2 taps; DTO sees queue + 2-min target; payouts show badges. 10 = all three true.
- **M7 Visual system**: one accent, stone only, shape rule kept, no AI-gradient/purple-blue, no centered-everything. 10 = clean.
- **M8 No-slop**: no lorem, no `#` links, no fake numbers, real counts (4,003). 10 = clean.

## Skills per step (use as lenses, not rewrites)
- `impeccable/critique` → score M7/M8. `impeccable/audit` → M3/M4. `redesign-existing-projects` audit → M7 gaps. `minimalist-ui` → gov restraint (flat, editorial, no gradients).
- Stack stays: React + Tailwind v4 + Vite. No new deps without checking `package.json`.

## Asset sources (see `public/assets/gov/ATTRIBUTION.md`)
- Emblem SVG: Govt of India work via legislative.gov.in, PD-India (Wikimedia mirror). Motto `सत्यमेव जयते`.
- Flag SVG: Flag of India, 3:2, public-domain construction.
- PM photograph: "Official Photograph of Prime Minister Narendra Modi", pmindia.gov.in image gallery, © PMO/NIC. Hotlink-free local copy for prototype; caption + link back.
