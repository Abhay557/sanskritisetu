import { GOV_TOTAL, GOV_STATES, GOV_SOURCE } from '../data/govTourism.js'

export default function About() {
  return (
    <div>
      <div className="mb-6 max-w-2xl">
        <div className="tnum text-sm font-bold text-stone-500">About</div>
        <h1 className="font-display mt-1 text-3xl leading-tight text-stone-900 md:text-4xl">About SanskritiSetu</h1>
        <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-stone-600">
          An offline-first living-heritage field system: festival ground files for travellers,
          a 2-minute review desk for district officers, and a marketplace where artisans keep
          the full payout. Built for SIH 2026 from BRD-SIH2026-SS-01.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="tnum font-display text-3xl text-stone-900">{GOV_TOTAL.toLocaleString('en-IN')}</div>
          <div className="mt-1 text-sm font-semibold text-stone-600">tourist places across {GOV_STATES.length} states / UTs</div>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Scraped 2026-10-01 from <a href={GOV_SOURCE} target="_blank" rel="noreferrer" className="u-link font-semibold text-stone-900">india.gov.in</a>.
            Content owned by respective Ministries, Departments and district administrations.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="tnum font-display text-3xl text-stone-900">6</div>
          <div className="mt-1 text-sm font-semibold text-stone-600">festival ground files with lunar calendars</div>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Hornbill, Bastar Madai, Hemis Tsechu, Ziro Haat, Rann Utsav, Monpa Losar —
            each with cash truth, transit lifelines, permits and etiquette. Sample data for the demo.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <div className="tnum font-display text-3xl text-stone-900">2 min</div>
          <div className="mt-1 text-sm font-semibold text-stone-600">weekly DTO review target</div>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Risk screening (spam, geo-mismatch, duplicates) keeps the officer queue near two minutes.
            Over-capacity circuits redirect footfall to satellites.
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-bold text-stone-900">Leadership</h2>
      <div className="mt-3 flex flex-wrap items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4">
        <img src="/assets/gov/pm-modi-official.jpg" alt="Official photograph of Prime Minister Narendra Modi" width="96" height="96" loading="lazy" className="h-16 w-16 rounded-lg object-cover" />
        <div>
          <div className="text-sm font-bold text-stone-900">Prime Minister of India</div>
          <p className="mt-0.5 max-w-[60ch] text-sm text-stone-600">
            Official photograph, Prime Minister&apos;s Office. Source:{' '}
            <a href="https://www.pmindia.gov.in" target="_blank" rel="noreferrer" className="u-link font-semibold text-stone-800">pmindia.gov.in</a>.
            Full attribution in <span className="font-semibold">public/assets/gov/ATTRIBUTION.md</span>.
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-bold text-stone-900">Stack &amp; standards</h2>
      <p className="tnum mt-2 max-w-[65ch] text-sm leading-relaxed text-stone-600">
        FastAPI, PostGIS, Skyfield, MapLibre, SQLite-VSS, ExecuTorch, Bhashini, 112 NERS, NIDHI 2.0, Bhuvan.
        Maps on this site use OpenStreetMap tiles (© OpenStreetMap contributors) with a Bhuvan deep-link.
        Interface follows GIGW-style chrome: bilingual labels, visible focus, 44px targets, lazy images.
      </p>
    </div>
  )
}
