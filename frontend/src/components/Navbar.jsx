function SparkleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 text-white"
               style={{ backgroundColor: 'var(--color-accent)' }}>
            <SparkleIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-[15px] sm:text-base font-bold text-neutral-900 tracking-tight leading-none">
              TaskPilot
            </h1>
            <p className="hidden sm:block text-xs text-neutral-500 font-medium mt-1 truncate">
              Turn meeting notes into actionable tasks
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 pl-2 pr-2.5 sm:pl-2.5 sm:pr-3 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-[11px] sm:text-xs font-semibold text-neutral-700 shrink-0">
          <span className="relative w-1.5 h-1.5 shrink-0">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
            <span className="relative block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="hidden xs:inline sm:inline">AI Ready</span>
        </span>
      </div>
    </header>
  )
}
