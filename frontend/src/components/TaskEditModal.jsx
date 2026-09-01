import { useState, useEffect } from 'react'

const PRIORITIES = ['High', 'Medium', 'Low']
const STATUSES = ['Pending', 'In Progress', 'Done']

const inputCls =
  'w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium bg-neutral-50 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent focus:bg-white transition-colors'

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

export default function TaskEditModal({ task, onSave, onClose }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    owner: '',
    due_date: '',
    priority: 'Medium',
    status: 'Pending',
  })
  const [titleError, setTitleError] = useState('')

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        owner: task.owner || '',
        due_date: task.due_date || '',
        priority: task.priority || 'Medium',
        status: task.status || 'Pending',
      })
      setTitleError('')
    }
  }, [task])

  if (!task) return null

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'title' && value.trim()) setTitleError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setTitleError('Title is required.')
      return
    }
    onSave({ ...task, ...form })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/35 px-4 py-8 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl w-full max-w-lg my-auto animate-[fadeInScale_0.15s_ease-out]">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 id="edit-task-title" className="text-base font-bold text-neutral-900">Edit task</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <Field label="Title" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className={inputCls}
              aria-invalid={!!titleError}
            />
            {titleError && <p className="text-xs text-red-600 font-medium mt-1">{titleError}</p>}
          </Field>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Owner">
              <input
                type="text"
                value={form.owner}
                onChange={(e) => set('owner', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Due date">
              <input
                type="text"
                value={form.due_date}
                onChange={(e) => set('due_date', e.target.value)}
                placeholder="e.g. 2025-12-31"
                className={inputCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Priority">
              <select
                value={form.priority}
                onChange={(e) => set('priority', e.target.value)}
                className={inputCls}
              >
                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                className={inputCls}
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-neutral-700 border border-neutral-200 rounded-lg px-4 py-2 bg-white hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm font-semibold text-white rounded-lg px-4 py-2 transition-colors"
              style={{ backgroundColor: 'var(--color-accent)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
