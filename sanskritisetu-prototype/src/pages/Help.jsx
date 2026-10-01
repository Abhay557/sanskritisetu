import { Phone, Siren } from '@phosphor-icons/react'

const FAQS = [
  { q: 'Is my location tracked?', a: 'No. Location stays on the device until you press SOS. The mock SOS in this build only queues a message — on a handset it fires through the SMS manager over 2G with no data needed.' },
  { q: 'Do I need a permit?', a: 'Each ground file lists its permit (ILP, RAP, border pass, or checkpost registration) with the issuing link. Confirm every detail with the issuing office before travel — permit links in the demo are stubs.' },
  { q: 'How much cash should I carry?', a: 'Use Transit → Cash estimator: daily burn × days + craft buffer. Withdraw at the last ATM listed — UPI stops working beyond that point in most circuits.' },
  { q: 'The data looks wrong. Who do I tell?', a: 'Tourist data comes from district websites via the National Portal of India. For discrepancies contact the relevant district administration, or file feedback through the linked district site.' },
]

export default function Help() {
  return (
    <div>
      <div className="mb-6 max-w-2xl">
        <div className="tnum text-sm font-bold text-stone-500">Help</div>
        <h1 className="font-display mt-1 text-3xl leading-tight text-stone-900 md:text-4xl">Help &amp; emergency</h1>
        <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-stone-600">
          SOS first, questions second. Everything a first-time Yatri needs on one page.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <a href="#/safety" className="flex items-start gap-3 rounded-2xl border-2 border-red-800/60 bg-white p-5 transition-colors hover:bg-red-50">
          <Siren size={22} className="mt-0.5 shrink-0 text-red-800" aria-hidden="true" />
          <span>
            <span className="block font-bold text-red-900">Emergency? Open the SOS panel</span>
            <span className="mt-1 block text-sm text-stone-600">40-character SMS over 2G into the 112 gateway. Nearest PHC listed per circuit.</span>
          </span>
        </a>
        <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-5">
          <Phone size={22} className="mt-0.5 shrink-0 text-stone-700" aria-hidden="true" />
          <span>
            <span className="block font-bold text-stone-900">Helplines: 112 (emergency) · 1363 (tourist)</span>
            <span className="mt-1 block text-sm text-stone-600">Tourist helpline 1800-11-1363 (toll-free). Confirm numbers with the district site before relying on them.</span>
          </span>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-bold text-stone-900">Frequently asked</h2>
      <div className="mt-3 space-y-2">
        {FAQS.map((f) => (
          <details key={f.q} className="rounded-2xl border border-stone-200 bg-white px-4 py-3">
            <summary className="cursor-pointer font-bold text-stone-900">{f.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
