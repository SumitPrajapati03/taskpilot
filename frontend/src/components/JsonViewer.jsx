import { useState } from 'react'

// Minimal syntax highlighting — colors keys, strings, numbers, booleans
function colorize(json) {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'text-blue-600'          // number
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'text-neutral-900 font-medium' : 'text-emerald-700'
        } else if (/true|false/.test(match)) {
          cls = 'text-amber-600'
        } else if (/null/.test(match)) {
          cls = 'text-neutral-400'
        }
        return `<span class="${cls}">${match}</span>`
      }
    )
}

export default function JsonViewer({ tasks, onExport }) {
  const [collapsed, setCollapsed] = useState(false)
  const [copied, setCopied] = useState(false)

  const json = JSON.stringify(tasks, null, 2)

  function handleCopy() {
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleDownload() {
    if (onExport) { onExport(); return }
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tasks.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 shrink-0">
        <button
          onClick={() => setCollapsed((v) => !v)}
          aria-expanded={!collapsed}
          className="flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${collapsed ? '' : 'rotate-90'}`}
            fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span>JSON</span>
          <span className="text-xs font-medium text-neutral-400">
            {tasks.length} tasks
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="text-xs font-semibold text-neutral-700 border border-neutral-200 rounded-lg px-2.5 py-1.5 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="text-xs font-semibold text-white rounded-lg px-2.5 py-1.5 transition-colors flex items-center gap-1"
            style={{ backgroundColor: 'var(--color-accent)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-4.5L12 16.5m0 0l4.5-4.5M12 16.5V3" />
            </svg>
            Download
          </button>
        </div>
      </div>

      {!collapsed && (
        <pre
          className="flex-1 overflow-auto p-4 text-xs font-mono leading-relaxed bg-neutral-50 text-neutral-900 scroll-thin"
          dangerouslySetInnerHTML={{ __html: colorize(json) }}
        />
      )}

      {collapsed && (
        <div className="flex-1 flex items-center justify-center text-xs text-neutral-400 font-medium py-6">
          Click to expand JSON output
        </div>
      )}
    </div>
  )
}
