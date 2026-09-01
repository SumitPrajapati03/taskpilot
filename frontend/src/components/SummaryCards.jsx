const ICON_PATHS = {
  total: 'M9 12h6m-6 4h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z',
  high: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z',
  medium: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  low: 'M4.5 12.75l6 6 9-13.5',
  pending: 'M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
  inProgress: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
  done: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

const CARD_CONFIGS = [
  { key: 'total',      label: 'Total',        icon: 'total',      iconColor: 'text-neutral-500', iconBg: 'bg-neutral-100' },
  { key: 'high',       label: 'High',         icon: 'high',       iconColor: 'text-red-600',     iconBg: 'bg-red-50' },
  { key: 'medium',     label: 'Medium',       icon: 'medium',     iconColor: 'text-amber-600',   iconBg: 'bg-amber-50' },
  { key: 'low',        label: 'Low',          icon: 'low',        iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
  { key: 'pending',    label: 'Pending',      icon: 'pending',    iconColor: 'text-neutral-500', iconBg: 'bg-neutral-100' },
  { key: 'inProgress', label: 'In Progress',  icon: 'inProgress', iconColor: 'text-blue-600',    iconBg: 'bg-blue-50' },
  { key: 'done',       label: 'Done',         icon: 'done',       iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
]

function StatCard({ label, value, icon, iconColor, iconBg }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-150 p-3.5 flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
        <svg className={`w-4 h-4 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[icon]} />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-xl font-bold text-neutral-900 leading-none">{value}</p>
        <p className="text-[11px] font-medium text-neutral-500 mt-1 truncate">{label}</p>
      </div>
    </div>
  )
}

export default function SummaryCards({ tasks }) {
  const stats = {
    total:      tasks.length,
    high:       tasks.filter((t) => t.priority === 'High').length,
    medium:     tasks.filter((t) => t.priority === 'Medium').length,
    low:        tasks.filter((t) => t.priority === 'Low').length,
    pending:    tasks.filter((t) => t.status === 'Pending').length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    done:       tasks.filter((t) => t.status === 'Done').length,
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
      {CARD_CONFIGS.map((cfg) => (
        <StatCard key={cfg.key} label={cfg.label} value={stats[cfg.key]} icon={cfg.icon} iconColor={cfg.iconColor} iconBg={cfg.iconBg} />
      ))}
    </div>
  )
}
