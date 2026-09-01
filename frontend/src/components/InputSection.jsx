const MAX_DISPLAY_HINT = 'Paste meeting notes, a project brief, an email thread, or any unstructured text'

export default function InputSection({ value, onChange }) {
  return (
    <div className="h-full flex flex-col bg-white border border-neutral-200 rounded-2xl shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-2.5">
        <label htmlFor="meeting-notes" className="text-sm font-semibold text-neutral-900">
          Paste meeting notes
        </label>
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs font-medium text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      <textarea
        id="meeting-notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your meeting notes here…"
        rows={8}
        aria-label="Meeting notes"
        className="w-full flex-1 min-h-[160px] resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent focus:bg-white transition-colors"
      />
      <p className="mt-2 text-xs text-neutral-400 font-medium">
        {value.length > 0
          ? `${value.length.toLocaleString()} characters · AI will extract tasks automatically`
          : MAX_DISPLAY_HINT}
      </p>
    </div>
  )
}
