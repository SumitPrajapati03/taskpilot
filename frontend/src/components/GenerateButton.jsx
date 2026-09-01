function SparkleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" fill="currentColor" />
    </svg>
  )
}

export default function GenerateButton({ hasInput, isLoading, onGenerate }) {
  const disabled = !hasInput || isLoading

  return (
    <button
      onClick={onGenerate}
      disabled={disabled}
      aria-busy={isLoading}
      className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-150
        ${disabled
          ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
          : 'text-white shadow-sm hover:shadow-md active:scale-[0.99]'
        }`}
      style={disabled ? undefined : { backgroundColor: 'var(--color-accent)' }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)' }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.backgroundColor = 'var(--color-accent)' }}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Generating tasks…
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <SparkleIcon className="w-4 h-4" />
          Generate Tasks with AI
        </span>
      )}
    </button>
  )
}
