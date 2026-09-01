export default function DeleteConfirmation({ task, onConfirm, onCancel }) {
  if (!task) return null

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/35 px-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl w-full max-w-sm p-6 animate-[fadeInScale_0.15s_ease-out]">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h2 id="delete-confirm-title" className="text-base font-bold text-neutral-900 mb-1">
          Delete this task?
        </h2>
        <p className="text-sm text-neutral-500 mb-1">
          "{task.title}"
        </p>
        <p className="text-xs text-neutral-400 mb-5">
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-semibold text-neutral-700 border border-neutral-200 rounded-lg px-4 py-2 bg-white hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="text-sm font-semibold text-white bg-red-600 rounded-lg px-4 py-2 hover:bg-red-700 transition-colors"
          >
            Delete task
          </button>
        </div>
      </div>
    </div>
  )
}
