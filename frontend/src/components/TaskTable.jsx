import { useMemo, useState } from 'react'
import DeleteConfirmation from './DeleteConfirmation'

const PRIORITY_BADGE = {
  High:   'bg-red-50 text-red-700',
  Medium: 'bg-amber-50 text-amber-700',
  Low:    'bg-emerald-50 text-emerald-700',
}

const STATUS_BADGE = {
  Pending:       'bg-neutral-100 text-neutral-600',
  'In Progress': 'bg-blue-50 text-blue-700',
  Done:          'bg-emerald-50 text-emerald-700',
}

const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 }
const STATUS_ORDER = { Pending: 0, 'In Progress': 1, Done: 2 }

const SORT_OPTIONS = [
  { value: 'none',     label: 'Default' },
  { value: 'due_date',  label: 'Due date' },
  { value: 'priority',  label: 'Priority' },
  { value: 'owner',     label: 'Owner' },
  { value: 'status',    label: 'Status' },
]

function sortTasks(tasks, sortBy) {
  if (sortBy === 'none') return tasks
  const copy = [...tasks]
  copy.sort((a, b) => {
    if (sortBy === 'priority') return (PRIORITY_ORDER[a.priority] ?? 99) - (PRIORITY_ORDER[b.priority] ?? 99)
    if (sortBy === 'status') return (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99)
    if (sortBy === 'owner') return (a.owner || '').localeCompare(b.owner || '')
    if (sortBy === 'due_date') return (a.due_date || '').localeCompare(b.due_date || '')
    return 0
  })
  return copy
}

function Badge({ value, map }) {
  const cls = map[value] || 'bg-neutral-100 text-neutral-600'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap ${cls}`}>
      {value}
    </span>
  )
}

function OwnerAvatar({ owner }) {
  if (!owner || owner === 'Unassigned') {
    return <span className="text-neutral-400 text-sm">—</span>
  }
  const initials = owner.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
           style={{ backgroundColor: 'var(--color-accent)' }}>
        {initials}
      </div>
      <span className="text-sm text-neutral-700 font-medium truncate">{owner}</span>
    </div>
  )
}

function SortControl({ sortBy, setSortBy }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="task-sort" className="text-xs font-medium text-neutral-400 hidden sm:inline">Sort by</label>
      <select
        id="task-sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="text-xs font-semibold text-neutral-700 border border-neutral-200 rounded-lg pl-2.5 pr-7 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-12 text-center">
      <p className="text-sm font-semibold text-neutral-400">No tasks match the current filters.</p>
    </div>
  )
}

function ActionButtons({ task, onEdit, onRequestDelete }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onEdit(task)}
        className="text-xs font-semibold text-neutral-700 border border-neutral-200 rounded-lg px-2.5 py-1.5 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
      >
        Edit
      </button>
      <button
        onClick={() => onRequestDelete(task)}
        className="text-xs font-semibold text-red-600 border border-red-100 rounded-lg px-2.5 py-1.5 bg-white hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </div>
  )
}

/* Mobile task card — each task becomes a self-contained card instead of a squeezed table row */
function TaskCard({ task, onEdit, onRequestDelete }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-4 space-y-3">
      <div>
        <p className="text-sm font-semibold text-neutral-900 leading-snug" title={task.description || undefined}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">{task.description}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <OwnerAvatar owner={task.owner} />
        <Badge value={task.priority} map={PRIORITY_BADGE} />
        <Badge value={task.status} map={STATUS_BADGE} />
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
        <span className="text-xs text-neutral-500 font-medium">
          Due {task.due_date || '—'}
        </span>
        <ActionButtons task={task} onEdit={onEdit} onRequestDelete={onRequestDelete} />
      </div>
    </div>
  )
}

export default function TaskTable({ tasks, onEdit, onDelete }) {
  const [sortBy, setSortBy] = useState('none')
  const [pendingDelete, setPendingDelete] = useState(null)

  const sortedTasks = useMemo(() => sortTasks(tasks, sortBy), [tasks, sortBy])

  function handleConfirmDelete() {
    if (pendingDelete) onDelete(pendingDelete.id)
    setPendingDelete(null)
  }

  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      <div className="flex items-center justify-end mb-2.5">
        <SortControl sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {/* Desktop / tablet — table */}
      <div className="hidden md:block bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-auto max-h-[560px] scroll-thin">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-neutral-200 bg-neutral-50">
                {['Task', 'Owner', 'Priority', 'Status', 'Due Date', ''].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left text-[11px] font-semibold text-neutral-500 uppercase tracking-wide whitespace-nowrap ${h === 'Task' ? 'w-[32%]' : ''}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task, i) => (
                <tr
                  key={task.id ?? i}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70 transition-colors"
                >
                  <td className="px-4 py-3.5 font-medium text-neutral-900 max-w-[320px]">
                    <p className="truncate leading-snug" title={task.title}>{task.title}</p>
                    {task.description && (
                      <p className="text-xs text-neutral-400 truncate mt-0.5 font-normal" title={task.description}>
                        {task.description}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <OwnerAvatar owner={task.owner} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <Badge value={task.priority} map={PRIORITY_BADGE} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <Badge value={task.status} map={STATUS_BADGE} />
                  </td>
                  <td className="px-4 py-3.5 text-neutral-500 whitespace-nowrap text-xs font-medium">
                    {task.due_date || '—'}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <ActionButtons task={task} onEdit={onEdit} onRequestDelete={setPendingDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile — card list */}
      <div className="md:hidden space-y-3">
        {sortedTasks.map((task, i) => (
          <TaskCard key={task.id ?? i} task={task} onEdit={onEdit} onRequestDelete={setPendingDelete} />
        ))}
      </div>

      <DeleteConfirmation
        task={pendingDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  )
}
