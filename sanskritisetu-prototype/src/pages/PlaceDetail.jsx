import { useMemo } from 'react'
import { ArrowLeft, ArrowRight, MapPin } from '@phosphor-icons/react'
import { GOV_PLACES } from '../data/govTourism.js'
import NotFound from './NotFound.jsx'

const ACCENT = '#a63a22'

export default function PlaceDetail({ alias }) {
  const place = useMemo(() => GOV_PLACES.find((p) => p.alias === alias), [alias])
  const nearby = useMemo(() => {
    if (!place) return []
    return GOV_PLACES.filter((p) => p.district === place.district && p.alias !== place.alias).slice(0, 6)
  }, [place])

  if (!place) return <NotFound />

  return (
    <div>
      <nav aria-label="Breadcrumb" className="no-print mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-stone-600">
        <a href="#/" className="u-link">Home</a>
        <span aria-hidden="true">/</span>
        <a href="#/directory" className="u-link">Directory</a>
        <span aria-hidden="true">/</span>
        <span className="text-stone-900">{place.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
            {place.image ? (
              <img src={place.image} alt={`${place.title} — district photograph`} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            ) : (
              <div className="grid aspect-[16/10] w-full place-items-center text-stone-400">
                <MapPin size={40} aria-hidden="true" />
              </div>
            )}
          </div>
          <h1 className="font-display mt-4 text-3xl leading-tight text-stone-900 md:text-4xl">{place.title}</h1>
          <p className="mt-1 text-base text-stone-600">{place.district}{place.district && place.state ? ', ' : ''}{place.state}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(place.categories || []).length === 0
              ? <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-700">Gov listed</span>
              : place.categories.map((c) => (
                <span key={c} className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-700">{c}</span>
              ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={place.details} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-bold text-white" style={{ background: ACCENT }}>
              View on India.gov.in <ArrowRight size={15} aria-hidden="true" />
            </a>
            {place.url && (
              <a href={place.url} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-bold">
                District site <ArrowRight size={15} aria-hidden="true" />
              </a>
            )}
            <a
              href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${place.title}, ${place.district}, ${place.state}`)}`}
              target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center rounded-lg px-4 py-2.5 text-sm font-bold text-stone-700 u-link"
            >
              Find on map
            </a>
          </div>
          <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-stone-600">
            Listed via the National Portal of India from the district website. Verify timings, entry rules
            and reachability with the district administration before travel — directory entries carry no
            ground-readiness grade. For a graded file, see the festival ground files.
          </p>
        </div>

        <aside className="lg:col-span-2">
          <h2 className="text-lg font-bold text-stone-900">Nearby in {place.district}</h2>
          {nearby.length === 0 ? (
            <p className="mt-2 text-sm text-stone-600">No other directory entries in this district yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-stone-200 border-y border-stone-200">
              {nearby.map((n) => (
                <li key={n.id} className="py-3">
                  <a href={`#/place/${n.alias}`} className="group block">
                    <span className="font-bold text-stone-900 group-hover:underline">{n.title}</span>
                    <span className="mt-0.5 block text-sm text-stone-600">{(n.categories || []).join(', ') || 'Gov listed'}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <a href="#/directory" className="u-link mt-4 inline-flex items-center gap-1 text-sm font-bold text-stone-700">
            <ArrowLeft size={14} aria-hidden="true" /> Back to directory
          </a>
        </aside>
      </div>
    </div>
  )
}
