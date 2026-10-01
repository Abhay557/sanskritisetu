import { useEffect, useState } from 'react'

/* Tiny hash router: #/explore, #/festival/:id, #/place/:alias ... */
export function parseHash() {
  const h = (window.location.hash || '').replace(/^#/, '') || '/'
  const parts = h.split('/').filter(Boolean)
  if (parts.length === 0) return { name: 'home' }
  const [first, second] = parts
  if (first === 'festival' && second) return { name: 'festival', param: decodeURIComponent(second) }
  if (first === 'place' && second) return { name: 'place', param: decodeURIComponent(second) }
  const known = ['explore', 'directory', 'market', 'plan', 'offline', 'safety', 'about', 'help']
  if (known.includes(first) && parts.length === 1) return { name: first }
  return { name: 'notfound' }
}

export function useRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

/* Tab ids used inside App vs public route segments */
export const TAB_TO_ROUTE = {
  home: '', radar: 'explore', directory: 'directory', event: 'festival',
  place: 'place', market: 'market', transit: 'plan', offline: 'offline',
  sos: 'safety', about: 'about', help: 'help',
}

export function tabHref(tab, param) {
  const seg = TAB_TO_ROUTE[tab] ?? tab
  return param ? `#/${seg}/${encodeURIComponent(param)}` : (seg ? `#/${seg}` : '#/')
}
