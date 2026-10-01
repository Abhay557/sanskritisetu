import { ArrowRight, DownloadSimple, ListChecks, Storefront } from '@phosphor-icons/react'
import { GOV_PLACES, GOV_TOTAL, GOV_STATES } from '../../data/govTourism.js'
import { JaaliBand, RangoliHr, PaisleyMark, DiyaRow, TempleFrieze } from '../motifs.jsx'

const ACCENT = '#a63a22'

export default function LandingView({ setTab }) {
  const featured = GOV_PLACES.slice(0, 6)
  return (
    <div>
      {/* Hero */}
      <section className="overflow-hidden rounded-2xl border border-[#e3d3ae]" style={{ background: '#f7ecd9' }}>
        <div className="grid gap-6 p-6 md:grid-cols-5 md:p-10">
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 text-sm font-bold text-stone-700">
              <PaisleyMark size={28} />
              <span lang="hi">अतिथि देवो भवः</span>
              <span className="font-semibold text-stone-500">· Guest is god</span>
            </div>
            <h1 className="font-display mt-3 text-4xl leading-[1.05] text-stone-900 md:text-6xl">
              Living heritage, from the district to your hands
            </h1>
            <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-stone-700">
              <span className="tnum font-bold text-stone-900">{GOV_TOTAL.toLocaleString('en-IN')}</span> tourist places
              from the National Portal of India, six festival ground files with cash, transit and permits,
              and bundles that work with zero bars.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button" onClick={() => setTab('radar')}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors hover:brightness-110 active:scale-[0.98]"
                style={{ background: ACCENT }}
              >
                Explore the directory <ArrowRight size={15} aria-hidden="true" />
              </button>
              <button
                type="button" onClick={() => setTab('event')}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-stone-400 bg-white/70 px-5 py-2.5 text-sm font-bold text-stone-900 transition-colors hover:border-stone-600 active:scale-[0.98]"
              >
                Open a ground file
              </button>
              <button
                type="button" onClick={() => setTab('offline')}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-bold text-stone-800 transition-colors hover:bg-white/70 active:scale-[0.98]"
              >
                <DownloadSimple size={16} aria-hidden="true" /> Works offline
              </button>
            </div>
            <dl className="tnum mt-6 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [GOV_TOTAL.toLocaleString('en-IN'), 'gov places'],
                [String(GOV_STATES.length), 'states / UTs'],
                ['6', 'ground files'],
                ['2 min', 'DTO review'],
              ].map(([v, k]) => (
                <div key={k} className="rounded-lg bg-white/70 px-3 py-2">
                  <dt className="order-2 mt-0.5 block text-xs font-semibold text-stone-600">{k}</dt>
                  <dd className="font-display text-2xl text-stone-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="md:col-span-2">
            <JaaliBand className="h-40 md:h-full md:min-h-[320px]" />
            <DiyaRow className="mt-3 justify-start" />
          </div>
        </div>
        <TempleFrieze className="block h-16 w-full md:h-20" />
      </section>

      <RangoliHr className="mt-8" />

      {/* Featured places */}
      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-baseline gap-x-4">
          <h2 className="font-display text-3xl text-stone-900">This week on the directory</h2>
          <button type="button" onClick={() => setTab('directory')} className="u-link ml-auto text-sm font-bold" style={{ color: ACCENT }}>
            Browse all {GOV_TOTAL.toLocaleString('en-IN')} →
          </button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <div className="aspect-[16/10] bg-stone-100">
                {p.image ? (
                  <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="p-4">
                <div className="font-serif-in text-lg leading-snug text-stone-900">{p.title}</div>
                <div className="mt-0.5 text-sm text-stone-600">{p.district}{p.district && p.state ? ', ' : ''}{p.state}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="mt-10">
        <h2 className="font-display text-3xl text-stone-900">Built for three hands</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl p-5 text-white" style={{ background: ACCENT }}>
            <div className="tnum text-sm font-bold opacity-80">01 · Yatri</div>
            <div className="font-display mt-1 text-2xl">Travel with cash truth</div>
            <p className="mt-2 text-sm leading-relaxed opacity-90">Ground files carry ATM distance, jeep windows and permits. Bundles keep maps and phrasebooks on-device.</p>
          </li>
          <li className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="tnum flex items-center gap-1.5 text-sm font-bold text-stone-500"><ListChecks size={15} aria-hidden="true" /> 02 · DTO desk</div>
            <div className="font-display mt-1 text-2xl text-stone-900">Clear the queue in 2 minutes</div>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">Software screens spam and bad coordinates. Officers confirm only the clean pile.</p>
          </li>
          <li className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="tnum flex items-center gap-1.5 text-sm font-bold text-stone-500"><Storefront size={15} aria-hidden="true" /> 03 · Artisan</div>
            <div className="font-display mt-1 text-2xl text-stone-900">Keep the full payout</div>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">TRIFED and ODOP badges, masterclass rates, haat pickup lines — no platform cut on craft.</p>
          </li>
        </ol>
      </section>
    </div>
  )
}
