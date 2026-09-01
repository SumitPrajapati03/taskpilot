import { useRef, useState } from 'react'

const ACCEPTED = ['.txt', '.pdf', '.docx']
const ACCEPTED_MIME = [
  'text/plain',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

function isValidFile(file) {
  const ext = '.' + file.name.split('.').pop().toLowerCase()
  return ACCEPTED.includes(ext) || ACCEPTED_MIME.includes(file.type)
}

function fileSizeLabel(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileTypeIcon({ ext }) {
  return (
    <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-500 shrink-0">
      {ext}
    </div>
  )
}

export default function UploadArea({ file, onFileSelect, onClear }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [rejected, setRejected] = useState(false)

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return
    if (isValidFile(dropped)) {
      setRejected(false)
      onFileSelect(dropped)
    } else {
      setRejected(true)
    }
  }

  function handleChange(e) {
    const selected = e.target.files[0]
    if (selected) {
      setRejected(false)
      onFileSelect(selected)
    }
    e.target.value = ''
  }

  return (
    <div className="h-full flex flex-col bg-white border border-neutral-200 rounded-2xl shadow-sm p-4 sm:p-5">
      <label className="block text-sm font-semibold text-neutral-900 mb-2.5">
        Upload meeting file
      </label>

      {file ? (
        <div className="flex-1 flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <FileTypeIcon ext={file.name.split('.').pop().toUpperCase()} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900 leading-tight truncate">{file.name}</p>
              <p className="text-xs text-neutral-400 font-medium mt-0.5">
                {fileSizeLabel(file.size)}
              </p>
            </div>
          </div>
          <button
            onClick={onClear}
            className="text-xs font-semibold text-neutral-600 border border-neutral-200 rounded-lg px-3 py-1.5 bg-white hover:bg-neutral-100 hover:border-neutral-300 transition-colors shrink-0"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          aria-label="Upload meeting file"
          className={`flex-1 min-h-[160px] cursor-pointer rounded-xl border-2 border-dashed transition-colors px-6 py-8 flex flex-col items-center justify-center text-center
            ${dragging
              ? 'border-[var(--color-accent)] bg-indigo-50/50'
              : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-neutral-100'
            }`}
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-neutral-900">
            Drag &amp; drop your file here
          </p>
          <p className="text-xs text-neutral-400 font-medium mt-1">
            or <span className="text-[var(--color-accent)] font-semibold">click to browse</span> · Supports .txt, .pdf, .docx
          </p>
        </div>
      )}

      {rejected && (
        <p className="mt-2 text-xs font-medium text-red-600">
          Unsupported file type — please upload a TXT, PDF, or DOCX file.
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
