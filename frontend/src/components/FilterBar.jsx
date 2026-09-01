const PRIORITIES = ['', 'High', 'Medium', 'Low']
const STATUSES = ['', 'Pending', 'In Progress', 'Done']

const fieldBase =
  'border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-shadow'

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1 w-full sm:w-auto">
      <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldBase} sm:min-w-[140px]`}
      >
        <option value="">All</option>
        {options.filter(Boolean).map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

export default function FilterBar({ filters, onFilterChange, onClearFilters }) {
  const hasActive = filters.owner || filters.priority || filters.status

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-end gap-3 sm:gap-4">
      <FilterSelect
        label="Priority"
        value={filters.priority}
        options={PRIORITIES}
        onChange={(v) => onFilterChange({ ...filters, priority: v })}
      />
      <FilterSelect
        label="Status"
        value={filters.status}
        options={STATUSES}
        onChange={(v) => onFilterChange({ ...filters, status: v })}
      />

      <div className="flex flex-col gap-1 w-full sm:w-auto sm:flex-1 sm:min-w-[180px]">
        <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">Owner</label>
        <input
          type="text"
          value={filters.owner}
          onChange={(e) => onFilterChange({ ...filters, owner: e.target.value })}
          placeholder="Filter by owner…"
          className={`${fieldBase} w-full`}
        />
      </div>

      {hasActive && (
        <button
          onClick={onClearFilters}
          className="w-full sm:w-auto text-xs font-semibold text-neutral-600 border border-neutral-200 rounded-lg px-3.5 py-2 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors shrink-0"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
