import React, { useState } from 'react'

/* OpenStreetMap loader: zero-dependency iframe embed (mapnik tiles),
   Bhuvan link for the official ISRO view, offline fallback note. */
export default function MapPanel({ place }) {
  const [loaded, setLoaded] = useState(false)
  if (!place || !place.coords) return null
  const { lat, lon } = place.coords
  const d = 0.6
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d}%2C${lon + d}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lon}`
  return (
    <div>
      <h3 className="text-lg font-bold text-stone-900">District map</h3>
      <p className="tnum mt-1 text-sm text-stone-600">
        {lat.toFixed(4)}, {lon.toFixed(4)} — {place.district}. Tiles: © OpenStreetMap contributors.
      </p>
      <div className="osm-frame relative mt-3 aspect-[16/10] w-full">
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-stone-600">
            Loading OpenStreetMap… (needs network; bundles work offline without this panel)
          </div>
        )}
        <iframe
          title={`OpenStreetMap around ${place.district}`}
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-sm font-bold">
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=9/${lat}/${lon}`}
          target="_blank" rel="noreferrer" className="u-link text-stone-800"
        >
          Open in OpenStreetMap
        </a>
        <a
          href="https://bhuvan.nrsc.gov.in/home/index.php"
          target="_blank" rel="noreferrer" className="u-link text-stone-800"
        >
          Open in Bhuvan (ISRO)
        </a>
      </div>
    </div>
  )
}
