export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-10 text-center">
      <div className="tnum text-sm font-bold text-stone-500">404</div>
      <h1 className="font-display mt-1 text-4xl text-stone-900">This trail has no markers</h1>
      <p className="mt-2 text-base text-stone-600">The page address is wrong or the place file moved. Head back to mapped ground.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <a href="#/" className="min-h-[44px] inline-flex items-center rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-bold text-white">Home</a>
        <a href="#/explore" className="min-h-[44px] inline-flex items-center rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-bold">Explore festivals</a>
        <a href="#/directory" className="min-h-[44px] inline-flex items-center rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-bold">Tourist directory</a>
      </div>
    </div>
  )
}
