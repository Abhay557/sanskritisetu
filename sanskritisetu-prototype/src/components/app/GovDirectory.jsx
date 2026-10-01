import React, { useEffect, useMemo, useState } from 'react'
import { ArrowRight, MagnifyingGlass, MapPin } from '@phosphor-icons/react'
import { GOV_PLACES, GOV_STATES, GOV_CATEGORIES, GOV_TOTAL, GOV_SOURCE } from '../../data/govTourism.js'

const ACCENT = '#a63a22'

function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-700">
      {children}
    </span>
  )
}

function EmptyState({ icon: C, title, body }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-300 px-6 py-10 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-stone-100 text-stone-600">
        <C size={20} aria-hidden="true" />
      </span>
      <div className="mt-3 font-bold text-stone-900">{title}</div>
      <p className="mt-1 max-w-[45ch] text-sm text-stone-600">{body}</p>
    </div>
  )
}

/* Standalone government directory. Reused on the Explore page and /directory. */
export default function GovDirectory({ initialQuery = '', indexLabel = '01B', title = 'Government tourist directory' }) {
  const [q, setQ] = useState(initialQuery)
  const [govState, setGovState] = useState('')
  const [govCat, setGovCat] = useState('')
  const [govVisible, setGovVisible] = useState(24)

  useEffect(() => { setQ(initialQuery) }, [initialQuery])
  useEffect(() => { setGovVisible(24) }, [q, govState, govCat])

  const govFiltered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return GOV_PLACES.filter((p) => {
      if (govState && p.state !== govState) return false
      if (govCat && !(p.categories || []).includes(govCat)) return false
      if (!needle) return true
      return `${p.title} ${p.state} ${p.district} ${(p.categories || []).join(' ')}`.toLowerCase().includes(needle)
    })
  }, [q, govState, govCat])

  return (
    <div>
      <div className="mb-6 max-w-2xl">
        <div className="tnum text-sm font-bold text-stone-500">{indexLabel}</div>
        <h2 className="font-display mt-1 text-3xl leading-tight text-stone-900 md:text-4xl">{title}</h2>
        <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-stone-600">
          <span className="tnum font-bold text-stone-900">{govFiltered.length.toLocaleString('en-IN')}</span> of{' '}
          <span className="tnum font-bold text-stone-900">{GOV_TOTAL.toLocaleString('en-IN')}</span> places from{' '}
          <a href={GOV_SOURCE} target="_blank" rel="noreferrer" className="u-link font-semibold text-stone-900">india.gov.in/explore-india/travel-and-tourism</a>.
          Sourced from district websites. Images load lazily so the page stays fast.
        </p>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <div className="relative md:col-span-1">
          <label htmlFor="gov-q" className="sr-only">Search government places</label>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            <MagnifyingGlass size={16} aria-hidden="true" />
          </span>
          <input
            id="gov-q" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Try fort, Kerala, Religious"
            className="w-full rounded-lg border border-stone-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder:text-stone-400"
          />
        </div>
        <div>
          <label htmlFor="gov-state" className="sr-only">Filter by state</label>
          <select
            id="gov-state" value={govState} onChange={(e) => setGovState(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="">All {GOV_STATES.length} states / UTs</option>
            {GOV_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="gov-cat" className="sr-only">Filter by category</label>
          <select
            id="gov-cat" value={govCat} onChange={(e) => setGovCat(e.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm"
          >
            <option value="">All categories</option>
            {GOV_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {govFiltered.length === 0 ? (
        <EmptyState
          icon={MagnifyingGlass} title="No government places match"
          body="Clear the search or reset the state and category filters to browse the full directory again."
        />
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {govFiltered.slice(0, govVisible).map((p) => (
              <li key={p.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                <div className="aspect-[16/10] bg-stone-100">
                  {p.image ? (
                    <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-stone-400">
                      <MapPin size={28} aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="font-display text-lg leading-snug text-stone-900">{p.title}</div>
                  <div className="mt-0.5 text-sm text-stone-600">{p.district}{p.district && p.state ? ', ' : ''}{p.state}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(p.categories || []).length === 0 ? <Tag>Gov listed</Tag> : p.categories.map((c) => <Tag key={c}>{c}</Tag>)}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm font-bold">
                    {p.alias && (
                      <a href={`#/place/${p.alias}`} className="u-link inline-flex items-center gap-1" style={{ color: ACCENT }}>
                        Open file <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    )}
                    <a href={p.details} target="_blank" rel="noreferrer" className="u-link inline-flex items-center gap-1 text-stone-700">
                      India.gov.in <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="tnum text-sm text-stone-600">
              Showing {Math.min(govVisible, govFiltered.length).toLocaleString('en-IN')} of {govFiltered.length.toLocaleString('en-IN')}
            </p>
            {govVisible < govFiltered.length && (
              <button
                type="button"
                onClick={() => setGovVisible((v) => v + 24)}
                className="min-h-[44px] rounded-lg bg-stone-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-stone-700 active:scale-[0.98]"
              >
                Show 24 more
              </button>
            )}
            {(govState || govCat || q) && (
              <button
                type="button"
                onClick={() => { setGovState(''); setGovCat(''); setQ('') }}
                className="min-h-[44px] rounded-lg border border-stone-300 px-4 py-2 text-sm font-bold transition-colors hover:border-stone-500 active:scale-[0.98]"
              >
                Reset filters
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
