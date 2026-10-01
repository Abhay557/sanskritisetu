/* Government of India chrome: emblem, bilingual title, tricolor strip (M1/M5) */

export default function GovBar() {
  return (
    <div className="no-print">
      <div className="flex h-1" aria-hidden="true">
        <div className="flex-1" style={{ background: '#FF9933' }} />
        <div className="flex-1 bg-white" />
        <div className="flex-1" style={{ background: '#138808' }} />
      </div>
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-1.5 text-xs">
          <img src="/assets/gov/emblem-india.svg" alt="State Emblem of India" width="18" height="29" className="h-7 w-auto" />
          <span className="font-bold text-stone-900">
            <span lang="hi">भारत सरकार</span> <span className="font-semibold text-stone-500">|</span> Government of India
          </span>
          <img src="/assets/gov/flag-india.svg" alt="Flag of India" width="20" height="13" className="h-3.5 w-auto rounded-[2px]" />
          <span className="ml-auto flex flex-wrap items-center gap-x-3 gap-y-1 font-semibold">
            <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="u-link text-stone-700">National Portal india.gov.in</a>
            <a href="https://www.pmindia.gov.in" target="_blank" rel="noreferrer" className="u-link text-stone-700">PM India pmindia.gov.in</a>
          </span>
        </div>
      </div>
    </div>
  )
}
