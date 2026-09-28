import React, { useMemo, useState, useEffect } from 'react'
import {
  MagnifyingGlass, MapPin, CalendarBlank, DownloadSimple, WifiX, WifiHigh,
  ArrowRight, ArrowUp, Check, X, Warning, WarningCircle, Info, SealCheck,
  Bank, Drop, FirstAid, RoadHorizon, Bus, FileText, Printer, Storefront,
  HouseLine, Siren, Phone, Clock, Users, ListChecks, Translate, HardDrive,
  Wallet, Globe, CheckCircle,
} from '@phosphor-icons/react'
import { FESTIVALS, BUNDLES, ARTISANS, PHCS, DTO_QUEUE, griMeta, riskLabel, inr } from './data/mock.js'

const ACCENT = '#a63a22'

const TABS = [
  { id: 'radar', hi: 'खोज', en: 'Radar', icon: MagnifyingGlass },
  { id: 'event', hi: 'मेला', en: 'Ground file', icon: MapPin },
  { id: 'offline', hi: 'ऑफ़लाइन', en: 'Bundles', icon: DownloadSimple },
  { id: 'transit', hi: 'यात्रा', en: 'Transit', icon: Bus },
  { id: 'market', hi: 'बाज़ार', en: 'Market', icon: Storefront },
  { id: 'sos', hi: 'रक्षा', en: 'SOS', icon: Siren },
]

function Icon({ C, size = 16, className = '' }) {
  return <C size={size} className={`shrink-0 ${className}`} aria-hidden="true" />
}

/* Small square metadata tag */
function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-700">
      {children}
    </span>
  )
}

function GradeChip({ grade }) {
  const g = griMeta(grade)
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-2 py-0.5 text-xs font-bold text-stone-800">
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: g.dot }} />
      {g.label}
    </span>
  )
}

function RiskChip({ risk }) {
  const r = riskLabel(risk)
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-2 py-0.5 text-xs font-bold text-stone-800">
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: r.dot }} />
      {r.label} {risk}
    </span>
  )
}

/* Numbered section heading: index, title, lede */
function SectionHead({ index, title, lede }) {
  return (
    <div className="mb-6 max-w-2xl">
      <div className="tnum text-sm font-bold text-stone-500">{index}</div>
      <h2 className="font-display mt-1 text-3xl leading-tight text-stone-900 md:text-4xl">{title}</h2>
      <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-stone-600">{lede}</p>
    </div>
  )
}

function EmptyState({ icon, title, body }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-300 px-6 py-10 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-stone-100 text-stone-600">
        <Icon C={icon} size={20} />
      </span>
      <div className="mt-3 font-bold text-stone-900">{title}</div>
      <p className="mt-1 max-w-[45ch] text-sm text-stone-600">{body}</p>
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState('traveler')
  const [tab, setTab] = useState('radar')
  const [offline, setOffline] = useState(false)
  const [dateWin, setDateWin] = useState('30')
  const [query, setQuery] = useState('')
  const [selId, setSelId] = useState('bastar-madai')
  const sel = useMemo(() => FESTIVALS.find((f) => f.id === selId), [selId])

  const [downloaded, setDownloaded] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ss-bundles') || '["bastar"]')
    } catch {
      return ['bastar']
    }
  })
  useEffect(() => {
    localStorage.setItem('ss-bundles', JSON.stringify(downloaded))
  }, [downloaded])

  const [days, setDays] = useState(3)
  const [craftBuf, setCraftBuf] = useState(1500)
  const cashNeed = useMemo(() => sel.cash.perDay * days + craftBuf, [sel, days, craftBuf])

  const [lat, setLat] = useState('19.2315')
  const [lon, setLon] = useState('81.9675')
  const [batt, setBatt] = useState('62')
  const [sosSent, setSosSent] = useState(false)
  const sosPayload = useMemo(() => {
    const s = `SOS${lat.slice(0, 5)}${lon.slice(0, 5)}B${batt}`.replace(/[^A-Z0-9.]/g, '').slice(0, 40)
    return s.padEnd(40, '*')
  }, [lat, lon, batt])

  const [checks, setChecks] = useState([false, false, false, false])
  const toggleCheck = (i) => setChecks((c) => c.map((v, k) => (k === i ? !v : v)))

  const [queue, setQueue] = useState(DTO_QUEUE)
  const [dtoMsg, setDtoMsg] = useState('')
  const approveAll = () => {
    const ok = queue.filter((q) => q.risk < 50).map((q) => q.id)
    setQueue((q) => q.filter((x) => x.risk >= 50))
    setDtoMsg(`Approved ${ok.length} files (${ok.join(', ')}). Review time 1 min 42 sec, inside the 2 min target.`)
  }

  const filtered = useMemo(() => {
    const list = FESTIVALS.filter(
      (f) => query === '' || `${f.name} ${f.state} ${f.hindi}`.toLowerCase().includes(query.toLowerCase()),
    )
    return [...list].sort((a, b) => a.start.localeCompare(b.start))
  }, [query])

  return (
    <div id="top" className="min-h-screen bg-white text-stone-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      {/* Utility bar */}
      <div className="no-print bg-stone-900 text-stone-100">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2 text-xs">
          <span className="font-semibold tracking-wide">SIH26044</span>
          <span className="text-stone-400">Field prototype v1.0</span>
          <span className="ml-auto flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Icon C={offline ? WifiX : WifiHigh} size={15} />
              {offline ? 'On device' : 'Live sync'}
            </span>
            <button
              type="button"
              onClick={() => setOffline((o) => !o)}
              className="rounded-lg border border-stone-600 px-2.5 py-1 font-bold transition-colors hover:bg-stone-700 active:scale-[0.98]"
            >
              {offline ? 'Reconnect' : 'Simulate dead zone'}
            </button>
            <span className="inline-flex rounded-lg border border-stone-600 p-0.5 font-bold" role="group" aria-label="View">
              <button
                type="button"
                onClick={() => setRole('traveler')}
                aria-pressed={role === 'traveler'}
                className={`rounded-md px-2.5 py-1 transition-colors active:scale-[0.98] ${
                  role === 'traveler' ? 'bg-stone-100 text-stone-900' : 'text-stone-300 hover:text-white'
                }`}
              >
                Yatri
              </button>
              <button
                type="button"
                onClick={() => setRole('dto')}
                aria-pressed={role === 'dto'}
                className={`rounded-md px-2.5 py-1 transition-colors active:scale-[0.98] ${
                  role === 'dto' ? 'bg-stone-100 text-stone-900' : 'text-stone-300 hover:text-white'
                }`}
              >
                DTO desk
              </button>
            </span>
          </span>
        </div>
      </div>

      {/* Masthead */}
      <header className="no-print sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end gap-x-6 gap-y-2 px-4 pb-2 pt-4">
          <div>
            <div className="font-display text-2xl leading-none text-stone-900">
              संस्कृति<span style={{ color: ACCENT }}>Setu</span>
            </div>
            <div className="mt-1 text-[11px] font-bold tracking-[0.22em] text-stone-500">LIVING HERITAGE FIELD SYSTEM</div>
          </div>
          <nav aria-label="Primary" className="ml-auto flex gap-1 overflow-x-auto">
            {role === 'traveler' ? (
              TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold transition-colors active:scale-[0.98] ${
                    tab === t.id ? 'text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                  style={tab === t.id ? { background: ACCENT } : undefined}
                >
                  <Icon C={t.icon} size={16} />
                  {t.hi} <span className="font-semibold opacity-80">{t.en}</span>
                </button>
              ))
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2 text-sm font-bold text-stone-800">
                <Icon C={ListChecks} size={16} /> Review queue
              </span>
            )}
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        {role === 'dto' ? (
          <DtoView queue={queue} setQueue={setQueue} dtoMsg={dtoMsg} approveAll={approveAll} />
        ) : (
          <>
            {tab === 'radar' && (
              <RadarView
                query={query} setQuery={setQuery} dateWin={dateWin} setDateWin={setDateWin}
                filtered={filtered} selId={selId} setSelId={setSelId} setTab={setTab} offline={offline}
              />
            )}
            {tab === 'event' && <EventView sel={sel} setSelId={setSelId} />}
            {tab === 'offline' && <OfflineView downloaded={downloaded} setDownloaded={setDownloaded} offline={offline} />}
            {tab === 'transit' && (
              <TransitView
                sel={sel} days={days} setDays={setDays} craftBuf={craftBuf} setCraftBuf={setCraftBuf}
                cashNeed={cashNeed} checks={checks} toggleCheck={toggleCheck}
              />
            )}
            {tab === 'market' && <MarketView />}
            {tab === 'sos' && (
              <SosView
                lat={lat} setLat={setLat} lon={lon} setLon={setLon} batt={batt} setBatt={setBatt}
                sosPayload={sosPayload} sel={sel} sosSent={sosSent} setSosSent={setSosSent}
              />
            )}
          </>
        )}

        <footer className="mt-16 border-t border-stone-200 pt-6">
          <div className="flex flex-wrap items-start gap-6">
            <div>
              <div className="font-display text-lg text-stone-900">
                संस्कृति<span style={{ color: ACCENT }}>Setu</span>
              </div>
              <p className="mt-1 max-w-[45ch] text-sm text-stone-600">
                Guest is god. Built for the SIH demo from BRD-SIH2026-SS-01. Sample data only.
              </p>
            </div>
            <div className="ml-auto flex flex-col gap-2 text-sm font-semibold">
              <a href="#top" className="u-link inline-flex w-fit items-center gap-1 text-stone-700">
                <Icon C={ArrowUp} size={14} /> Back to top
              </a>
              <details className="text-stone-600">
                <summary className="u-link w-fit cursor-pointer text-stone-700">Demo privacy note</summary>
                <p className="mt-1 max-w-[45ch] text-sm font-normal">
                  Location stays on the device until you press SOS. Nothing leaves the browser in this build.
                </p>
              </details>
              <details className="text-stone-600">
                <summary className="u-link w-fit cursor-pointer text-stone-700">Demo terms note</summary>
                <p className="mt-1 max-w-[45ch] text-sm font-normal">
                  Permit links and payouts are stubs. Confirm every detail with the issuing office before travel.
                </p>
              </details>
            </div>
          </div>
          <p className="tnum mt-6 text-xs text-stone-500">
            Stack: FastAPI, PostGIS, Skyfield, MapLibre, SQLite-VSS, ExecuTorch, Bhashini, 112 NERS, NIDHI 2.0, Bhuvan.
          </p>
        </footer>
      </main>
    </div>
  )
}

/* ---------------- 01 RADAR ---------------- */
function RadarView({ query, setQuery, dateWin, setDateWin, filtered, selId, setSelId, setTab, offline }) {
  const active = FESTIVALS.find((f) => f.id === selId) || filtered[0]
  return (
    <div>
      <SectionHead
        index="01"
        title="Cultural radar, 365 days"
        lede="Pick a travel window and see living festivals across 28 states and 8 union territories. Lunar dates reconcile on their own, so officers never type them by hand."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <label htmlFor="radar-q" className="text-sm font-bold text-stone-800">
            Search festivals, states, crafts
          </label>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
              <Icon C={MagnifyingGlass} size={17} />
            </span>
            <input
              id="radar-q" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Try Bastar, sumo, Losar"
              className="w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder:text-stone-400"
            />
          </div>
          <div className="mt-4 text-sm font-bold text-stone-800">Travel window</div>
          <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label="Travel window">
            {['7', '15', '30'].map((d) => (
              <button
                key={d} type="button" onClick={() => setDateWin(d)} aria-pressed={dateWin === d}
                className={`tnum rounded-lg border px-3 py-2 text-sm font-bold transition-colors active:scale-[0.98] ${
                  dateWin === d ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 hover:border-stone-500'
                }`}
              >
                {d} days
              </button>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm text-stone-600">
            <Icon C={offline ? WifiX : Globe} size={16} className="mt-0.5" />
            {offline
              ? 'Offline. Search runs on the device index with answers under 250 ms.'
              : 'Online. Search runs on PostGIS with a Redis cache.'}
          </p>
          <p className="tnum mt-2 text-sm text-stone-600">
            Window: {dateWin} days. 2,500 fairs indexed.
          </p>
        </div>

        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <EmptyState
              icon={MagnifyingGlass} title="No festivals match that search"
              body="Clear the search box or widen the travel window to see the full calendar again."
            />
          ) : (
            <ol className="divide-y divide-stone-200 border-y border-stone-200">
              {filtered.map((f, i) => {
                const isActive = f.id === active.id
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => { setSelId(f.id); setTab('event') }}
                      className={`group grid w-full grid-cols-[auto_1fr_auto] items-start gap-4 px-2 py-4 text-left transition-colors hover:bg-stone-50 active:scale-[0.995] ${
                        isActive ? 'bg-stone-50' : ''
                      }`}
                      style={isActive ? { boxShadow: `inset 3px 0 0 ${ACCENT}` } : undefined}
                    >
                      <span
                        className="font-display grid h-12 w-12 place-items-center rounded-2xl text-lg text-white"
                        style={{ background: isActive ? ACCENT : '#44403c' }}
                      >
                        {f.code}
                      </span>
                      <span>
                        <span className="tnum block text-xs font-bold text-stone-500">
                          {String(i + 1).padStart(2, '0')} / {f.start} to {f.end}
                        </span>
                        <span className="font-display mt-0.5 block text-xl leading-snug text-stone-900">
                          {f.name} <span className="text-base text-stone-500">{f.hindi}</span>
                        </span>
                        <span className="mt-1 block text-sm text-stone-600">{f.state}. {f.lunarNote}.</span>
                        <span className="mt-2 flex flex-wrap gap-1.5">
                          <GradeChip grade={f.gri} />
                          <Tag>ATM {f.cash.atmKm} km</Tag>
                          <Tag>Load {f.load}%</Tag>
                        </span>
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 text-sm font-bold" style={{ color: ACCENT }}>
                        Open <Icon C={ArrowRight} size={15} />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          )}

          {!offline && filtered[0] && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-700/40 bg-amber-50 px-4 py-3">
              <Icon C={Warning} size={18} className="mt-0.5 text-amber-800" />
              <p className="text-sm leading-relaxed text-amber-950">
                Dead zone ahead. {filtered[0].name} needs about {inr(filtered[0].cash.perDay)} per day in cash.
                The last working ATM sits {filtered[0].cash.atmKm} km before entry. Download the bundle first.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------------- 02 GROUND FILE ---------------- */
function EventView({ sel, setSelId }) {
  const g = griMeta(sel.gri)
  const factors = [
    { icon: Wallet, name: 'Cash', value: `Nearest ATM ${sel.cash.atmKm} km away. Budget about ${inr(sel.cash.perDay)} per day.` },
    { icon: Drop, name: 'Sanitation', value: sel.sanitation + '.' },
    { icon: FirstAid, name: 'Health', value: sel.health + '.' },
    { icon: RoadHorizon, name: 'Road', value: sel.road + '.' },
  ]
  return (
    <div>
      <SectionHead
        index="02"
        title={sel.name}
        lede={`${sel.state}. ${sel.calendar}. Peak ritual: ${sel.peak}.`}
      />
      <div className="no-print mb-5 flex gap-2 overflow-x-auto" role="group" aria-label="Choose festival">
        {FESTIVALS.map((f) => (
          <button
            key={f.id} type="button" onClick={() => setSelId(f.id)} aria-pressed={f.id === sel.id}
            className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm font-bold transition-colors active:scale-[0.98] ${
              f.id === sel.id ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 hover:border-stone-500'
            }`}
          >
            {f.code} {f.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <GradeChip grade={sel.gri} />
        <span className="text-sm font-semibold text-stone-600">{g.note}.</span>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-stone-900">Ground readiness</h3>
          <dl className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
            {factors.map((f) => (
              <div key={f.name} className="grid grid-cols-[28px_110px_1fr] items-start gap-3 py-3">
                <span className="mt-0.5 text-stone-500"><Icon C={f.icon} size={18} /></span>
                <dt className="text-sm font-bold text-stone-900">{f.name}</dt>
                <dd className="text-sm leading-relaxed text-stone-600">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 text-lg font-bold text-stone-900">Ritual window</h3>
          <p className="tnum mt-2 text-sm leading-relaxed text-stone-600">
            {sel.start} to {sel.end}. {sel.peak}.
          </p>

          <h3 className="mt-8 text-lg font-bold text-stone-900">Permit</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            {sel.permit.type}.
            {sel.permit.link && (
              <> File online at <span className="font-bold text-stone-900">{sel.permit.link}</span>.</>
            )}
          </p>
        </div>

        <aside>
          <h3 className="text-lg font-bold text-stone-900">Transit lifeline</h3>
          <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-left text-xs uppercase tracking-wide text-stone-600">
                  <th scope="col" className="px-3 py-2 font-bold">Hub</th>
                  <th scope="col" className="px-3 py-2 font-bold">Fare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {sel.transit.map((t) => (
                  <tr key={t.hub}>
                    <td className="px-3 py-2.5">
                      <div className="font-bold text-stone-900">{t.hub}</div>
                      <div className="tnum text-xs text-stone-600">{t.window}, {t.terrain}</div>
                    </td>
                    <td className="tnum whitespace-nowrap px-3 py-2.5 align-top font-bold">{t.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 text-lg font-bold text-stone-900">Stay</h3>
          <div className="mt-3 rounded-2xl border border-stone-200 p-4">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <Icon C={HouseLine} size={17} /> {sel.homestays[0].name}
            </div>
            <p className="tnum mt-1 text-sm text-stone-600">
              {inr(sel.homestays[0].tariff)} per night. {sel.homestays[0].badge}.
            </p>
          </div>

          <h3 className="mt-8 text-lg font-bold text-stone-900">Local etiquette</h3>
          <ol className="mt-3 space-y-2">
            {sel.etiquette.map((e, i) => (
              <li key={e} className="flex gap-3 text-sm leading-relaxed text-stone-600">
                <span className="tnum font-bold text-stone-400">{String(i + 1).padStart(2, '0')}</span> {e}.
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  )
}

/* ---------------- 03 BUNDLES ---------------- */
function OfflineView({ downloaded, setDownloaded, offline }) {
  const toggle = (id) => setDownloaded((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
  const total = BUNDLES.filter((b) => downloaded.includes(b.id)).reduce((a, b) => a + b.size, 0)
  const phrases = [
    { en: 'Where does the shared jeep leave?', hi: 'साझा जीप कहाँ से चलती है?', note: 'Hindi pack, on device' },
    { en: 'Is this drinking water clean?', hi: 'Gondi pack queues with the bundle', note: 'Downloads with Bastar' },
    { en: 'No photos inside, please.', hi: 'Ladakhi pack queues with the bundle', note: 'Downloads with Leh' },
  ]
  return (
    <div>
      <SectionHead
        index="03"
        title="Offline bundles"
        lede="Each district packs maps, search and language into one signed file under 60 MB. Once cached, every core screen works with zero bars."
      />
      <div className="rounded-2xl border border-stone-200 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-stone-900 text-white">
            <Icon C={HardDrive} size={19} />
          </span>
          <div>
            <div className="tnum text-lg font-bold text-stone-900">{total} MB cached <span className="font-semibold text-stone-500">/ base app 35 MB</span></div>
            <div className="text-sm text-stone-600">{offline ? 'Running on device now.' : 'Syncs when you are back online.'}</div>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-valuenow={total} aria-valuemin={0} aria-valuemax={200} aria-label="Cached megabytes">
          <div className="h-full rounded-full" style={{ width: `${Math.min(100, total / 2)}%`, background: ACCENT }} />
        </div>
      </div>

      <ul className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
        {BUNDLES.map((b) => {
          const on = downloaded.includes(b.id)
          return (
            <li key={b.id} className="grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="font-bold text-stone-900">{b.district}</div>
                <div className="tnum mt-0.5 text-sm text-stone-600">{b.size} MB. {b.version}. {b.contents}.</div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <Tag>Search under 250 ms</Tag>
                  <Tag>GPS under 3% per hour</Tag>
                  {on && <Tag><Icon C={Check} size={13} /> Cached</Tag>}
                </div>
              </div>
              <button
                type="button" onClick={() => toggle(b.id)}
                className={`tnum inline-flex w-fit items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition-colors active:scale-[0.98] ${
                  on ? 'border border-stone-300 hover:border-stone-500' : 'text-white'
                }`}
                style={on ? undefined : { background: ACCENT }}
              >
                <Icon C={on ? X : DownloadSimple} size={15} /> {on ? 'Remove' : 'Download'}
              </button>
            </li>
          )
        })}
      </ul>

      <h3 className="mt-10 flex items-center gap-2 text-lg font-bold text-stone-900">
        <Icon C={Translate} size={18} /> Phrasebook on device
      </h3>
      <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-100 text-left text-xs uppercase tracking-wide text-stone-600">
              <th scope="col" className="px-4 py-2 font-bold">English</th>
              <th scope="col" className="px-4 py-2 font-bold">Local line</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {phrases.map((p) => (
              <tr key={p.en}>
                <td className="px-4 py-3 text-stone-900">{p.en}</td>
                <td className="px-4 py-3 text-stone-600">{p.hi}. <span className="text-stone-500">{p.note}.</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------------- 04 TRANSIT ---------------- */
function TransitView({ sel, days, setDays, craftBuf, setCraftBuf, cashNeed, checks, toggleCheck }) {
  const steps = [
    'Two ID copies, Aadhaar or passport',
    'Two passport photos',
    `Homestay booking ref, ${sel.homestays[0].name}`,
    sel.permit.link ? `Online form at ${sel.permit.link}` : 'Register in person at the checkpost',
  ]
  return (
    <div>
      <SectionHead
        index="04"
        title="Transit, cash and permits"
        lede={`Execution kit for ${sel.name}. Work out the cash you must carry, catch the informal jeeps, and print the slip the checkpost expects.`}
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <Icon C={Wallet} size={18} /> Cash estimator
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            Daily burn of {inr(sel.cash.perDay)} times days on ground, plus a craft buffer.
          </p>
          <div className="mt-4">
            <label htmlFor="est-days" className="tnum text-sm font-bold text-stone-800">Days: {days}</label>
            <input
              id="est-days" type="range" min="1" max="10" value={days}
              onChange={(e) => setDays(Number(e.target.value))} className="mt-1 w-full accent-[#a63a22]"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="est-craft" className="text-sm font-bold text-stone-800">Craft buffer</label>
            <select
              id="est-craft" value={craftBuf} onChange={(e) => setCraftBuf(Number(e.target.value))}
              className="tnum mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            >
              {[0, 500, 1500, 3000, 5000, 8000].map((v) => (
                <option key={v} value={v}>{inr(v)}</option>
              ))}
            </select>
          </div>
          <div className="mt-4 rounded-2xl bg-stone-900 p-5 text-white">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-300">Carry in cash</div>
            <div className="tnum font-display mt-1 text-4xl">{inr(cashNeed)}</div>
            <p className="mt-2 text-sm leading-relaxed text-stone-300">
              Withdraw at the last ATM, {sel.cash.atmKm} km before {sel.district}. UPI stops working beyond that point.
            </p>
          </div>

          <h3 className="mt-8 flex items-center gap-2 text-lg font-bold text-stone-900">
            <Icon C={Bus} size={18} /> Jeeps and shuttles
          </h3>
          <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-left text-xs uppercase tracking-wide text-stone-600">
                  <th scope="col" className="px-4 py-2 font-bold">Hub</th>
                  <th scope="col" className="px-4 py-2 font-bold">Departure</th>
                  <th scope="col" className="px-4 py-2 font-bold">Fare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {sel.transit.map((t) => (
                  <tr key={t.hub}>
                    <td className="px-4 py-3 font-bold text-stone-900">{t.hub}<div className="text-xs font-semibold text-stone-500">{t.terrain}</div></td>
                    <td className="tnum px-4 py-3 text-stone-600">{t.window}</td>
                    <td className="tnum whitespace-nowrap px-4 py-3 font-bold">{t.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <Icon C={FileText} size={18} /> Permit checklist
          </h3>
          <p className="mt-1 text-sm text-stone-600">{sel.permit.type}.</p>
          <ul className="mt-4 space-y-2">
            {steps.map((s, i) => (
              <li key={s}>
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-stone-200 px-4 py-3 transition-colors hover:border-stone-400">
                  <input
                    type="checkbox" checked={checks[i]} onChange={() => toggleCheck(i)}
                    className="mt-1 h-4 w-4 accent-[#a63a22]"
                  />
                  <span className={`text-sm leading-relaxed ${checks[i] ? 'text-stone-400 line-through' : 'text-stone-800'}`}>{s}</span>
                </label>
              </li>
            ))}
          </ul>
          <button
            type="button" onClick={() => window.print()}
            className="no-print mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-colors hover:brightness-110 active:scale-[0.98]"
            style={{ background: ACCENT }}
          >
            <Icon C={Printer} size={16} /> Print checkpost slip
          </button>
          <div className="print-only mt-4 border-2 border-stone-900 p-4 text-sm leading-relaxed">
            <div className="font-bold">SANSKRITISETU CHECKPOST SLIP</div>
            <div>Destination: {sel.name}, {sel.district}. Dates: {sel.start} to {sel.end}.</div>
            <div>Permit: {sel.permit.type}. Stay: {sel.homestays[0].name}.</div>
            <div>Traveller: ___________ ID: ___________ Vehicle: ___________</div>
            <div>Signature: ___________ Date: ___________</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- 05 MARKET ---------------- */
function MarketView() {
  const stays = FESTIVALS.slice(0, 3).flatMap((f) => f.homestays.map((h) => ({ ...h, near: f.name })))
  return (
    <div>
      <SectionHead
        index="05"
        title="Marketplace and stays"
        lede="Artisans keep the full payout on every sale. Homestays carry state verification badges, and the platform takes 5 to 8 percent only on prebooked stays."
      />
      <ol className="divide-y divide-stone-200 border-y border-stone-200">
        {ARTISANS.map((a, i) => (
          <li key={a.name} className="grid gap-2 py-5 md:grid-cols-[48px_1.4fr_1fr] md:gap-6">
            <span className="tnum font-display text-2xl text-stone-300">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-bold text-stone-900">{a.name}</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-stone-900 px-2 py-0.5 text-xs font-bold text-white">
                  <Icon C={SealCheck} size={13} /> {a.tag}
                </span>
              </div>
              <div className="mt-0.5 text-sm text-stone-600">{a.craft}, {a.place}.</div>
              <div className="mt-1 text-sm text-stone-600">{a.masterclass}.</div>
            </div>
            <div className="md:text-right">
              <div className="tnum text-base font-bold text-stone-900">{a.price}</div>
              <div className="mt-0.5 text-sm text-stone-600">{a.payout}.</div>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="mt-10 text-lg font-bold text-stone-900">Verified homestays</h3>
      <ul className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
        {stays.map((h) => (
          <li key={h.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
            <span className="inline-flex items-center gap-1.5 font-bold text-stone-900">
              <Icon C={HouseLine} size={16} /> {h.name}
            </span>
            <span className="tnum text-sm text-stone-600">{inr(h.tariff)} per night</span>
            <span className="text-sm font-semibold text-stone-600">{h.badge}</span>
            <span className="ml-auto text-sm text-stone-500">Near {h.near}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------- 06 SOS ---------------- */
function SosView({ lat, setLat, lon, setLon, batt, setBatt, sosPayload, sel, sosSent, setSosSent }) {
  return (
    <div>
      <SectionHead
        index="06"
        title="SOS and conduct"
        lede="One press compresses position, time and battery into a 40 character SMS that rides 2G into the 112 gateway. Your location never leaves the phone until then."
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-red-800/60 p-5">
          <h3 className="flex items-center gap-2 text-lg font-bold text-red-900">
            <Icon C={Siren} size={18} /> Emergency trigger
          </h3>
          <p className="mt-1 text-sm text-stone-600">Works on 2G with no data pack.</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="sos-lat" className="text-sm font-bold text-stone-800">Latitude</label>
              <input id="sos-lat" value={lat} onChange={(e) => { setLat(e.target.value); setSosSent(false) }} inputMode="decimal" className="tnum mt-1 w-full rounded-lg border border-stone-300 px-2.5 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="sos-lon" className="text-sm font-bold text-stone-800">Longitude</label>
              <input id="sos-lon" value={lon} onChange={(e) => { setLon(e.target.value); setSosSent(false) }} inputMode="decimal" className="tnum mt-1 w-full rounded-lg border border-stone-300 px-2.5 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="sos-batt" className="text-sm font-bold text-stone-800">Battery %</label>
              <input id="sos-batt" value={batt} onChange={(e) => { setBatt(e.target.value); setSosSent(false) }} inputMode="numeric" className="tnum mt-1 w-full rounded-lg border border-stone-300 px-2.5 py-2 text-sm" />
            </div>
          </div>
          <div className="tnum mt-4 break-all rounded-lg bg-stone-900 p-3 text-xs leading-relaxed text-emerald-200">
            {sosPayload} <span className="text-stone-400">({sosPayload.length} chars)</span>
          </div>
          <p className="mt-2 text-sm text-stone-600">
            Route: phone to 112 gateway to {sel.district} checkpost and district dispatch.
          </p>
          <button
            type="button" onClick={() => setSosSent(true)}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-900 active:scale-[0.98]"
          >
            <Icon C={Phone} size={16} /> Send mock SOS
          </button>
          {sosSent && (
            <p className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900" role="status">
              <Icon C={Check} size={16} className="mt-0.5" />
              Queued to 112 in this demo. On a handset it fires through the SMS manager with no data needed.
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-stone-900">Nearest care, {sel.district}</h3>
          <ul className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
            {PHCS.map((p) => (
              <li key={p.name} className="flex flex-wrap items-baseline gap-x-3 py-2.5 text-sm">
                <span className="font-bold text-stone-900">{p.name}</span>
                <span className="tnum text-stone-600">{p.dist}</span>
                <span className="tnum ml-auto text-stone-500">{p.hrs}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-lg font-bold text-stone-900">Conduct at {sel.name}</h3>
          <ol className="mt-3 space-y-2">
            {sel.etiquette.map((e, i) => (
              <li key={e} className="flex gap-3 text-sm leading-relaxed text-stone-600">
                <span className="tnum font-bold text-stone-400">{String(i + 1).padStart(2, '0')}</span> {e}.
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

/* ---------------- DTO ---------------- */
function DtoView({ queue, setQueue, dtoMsg, approveAll }) {
  const safe = queue.filter((q) => q.risk < 50).length
  const hot = FESTIVALS.filter((f) => f.load > 80).length
  const decide = (id) => setQueue((q) => q.filter((x) => x.id !== id))
  return (
    <div>
      <SectionHead
        index="Desk"
        title="District review desk"
        lede="Software screens every submission for duplicates, bad coordinates and abuse. Officers only confirm the clean pile, which keeps the weekly workload near two minutes."
      />
      {dtoMsg && (
        <p className="mb-5 flex items-start gap-2 rounded-2xl border border-emerald-700/40 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-950" role="status">
          <Icon C={CheckCircle} size={17} className="mt-0.5" /> {dtoMsg}
        </p>
      )}

      <div className="grid gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 sm:grid-cols-3">
        {[
          { icon: ListChecks, k: 'Open files', v: String(queue.length) },
          { icon: Clock, k: 'Weekly review target', v: '2 min' },
          { icon: WarningCircle, k: 'Circuits over capacity', v: String(hot) },
        ].map((s) => (
          <div key={s.k} className="bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-500">
              <Icon C={s.icon} size={16} /> {s.k}
            </div>
            <div className="tnum font-display mt-1 text-3xl text-stone-900">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-stone-900">Screened queue ({queue.length})</h3>
            <button
              type="button" onClick={approveAll} disabled={safe === 0}
              className="no-print tnum ml-auto inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: ACCENT }}
            >
              <Icon C={Check} size={15} /> Approve all clear ({safe})
            </button>
          </div>
          {queue.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                icon={CheckCircle} title="Queue is clear"
                body="Every submission passed screening or found its reviewer. New items from ambassadors land here."
              />
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
              {queue.map((q) => (
                <li key={q.id} className="grid gap-2 py-3.5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <div className="font-bold text-stone-900">{q.title}</div>
                    <div className="tnum mt-0.5 text-xs text-stone-500">{q.id} {q.by}</div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <RiskChip risk={q.risk} />
                      {q.flags.map((f) => <Tag key={f}>{f}</Tag>)}
                    </div>
                  </div>
                  <div className="no-print flex gap-2">
                    {q.risk < 50 ? (
                      <>
                        <button type="button" onClick={() => decide(q.id)} className="rounded-lg bg-emerald-700 px-3.5 py-1.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 active:scale-[0.98]">Approve</button>
                        <button type="button" onClick={() => decide(q.id)} className="rounded-lg border border-stone-300 px-3.5 py-1.5 text-sm font-bold transition-colors hover:border-stone-500 active:scale-[0.98]">Reject</button>
                      </>
                    ) : (
                      <button type="button" onClick={() => decide(q.id)} className="rounded-lg bg-red-800 px-3.5 py-1.5 text-sm font-bold text-white transition-colors hover:bg-red-900 active:scale-[0.98]">Quarantine</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside>
          <h3 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <Icon C={Users} size={18} /> Footfall intent
          </h3>
          <ul className="mt-4 space-y-3">
            {FESTIVALS.map((f) => (
              <li key={f.id}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-bold text-stone-800">{f.district}</span>
                  <span className={`tnum font-bold ${f.load > 80 ? 'text-red-800' : 'text-stone-600'}`}>
                    {f.load}%{f.load > 80 ? ', over cap' : ''}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-valuenow={f.load} aria-valuemin={0} aria-valuemax={100} aria-label={`${f.district} load`}>
                  <div className="h-full rounded-full" style={{ width: `${f.load}%`, background: f.load > 80 ? '#b91c1c' : '#44403c' }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-stone-100 p-3 text-sm leading-relaxed text-stone-700">
            <Icon C={Info} size={16} className="mt-0.5" />
            Rann runs at 91 percent, so the desk promotes the Hodka satellite and Ziro at 38 percent instead.
          </p>
          <p className="tnum mt-3 flex items-center gap-2 text-xs text-stone-500">
            <Icon C={CalendarBlank} size={14} /> Season: Nov 2026 to Mar 2027
          </p>
          <p className="mt-1 flex items-center gap-2 text-xs text-stone-500">
            <Icon C={Bank} size={14} /> Nodal desk: Bastar, all states replicate
          </p>
        </aside>
      </div>
    </div>
  )
}
