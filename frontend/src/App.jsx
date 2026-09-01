import { useState, useCallback, useRef } from 'react'
import Navbar from './components/Navbar'
import InputSection from './components/InputSection'
import UploadArea from './components/UploadArea'
import GenerateButton from './components/GenerateButton'
import ProcessingTimeline from './components/ProcessingTimeline'
import SummaryCards from './components/SummaryCards'
import FilterBar from './components/FilterBar'
import TaskTable from './components/TaskTable'
import TaskEditModal from './components/TaskEditModal'
import JsonViewer from './components/JsonViewer'
import { useTaskGeneration } from './hooks/useTaskGeneration'
import { useTasks } from './hooks/useTasks'

export default function App() {
  // ── Input state ──────────────────────────────────────────────
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)

  // ── Workflow state ───────────────────────────────────────────
  const [showModal, setShowModal] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [crudError, setCrudError] = useState(null)

  // Ref to scroll results into view after generation
  const resultsRef = useRef(null)
  const submittedSourceTextRef = useRef('')

  // ── Task CRUD + filter hook ──────────────────────────────────
  const {
    tasks,
    filters,
    setFilters,
    updateTask,
    deleteTask,
    setCurrentTasks,
    reloadTasks,
    reloadTasksForSourceText,
    exportJson,
    fetchError,
  } = useTasks()

  // ── Generation hook ──────────────────────────────────────────
  const onCompleted = useCallback((newTasks) => {
    if (newTasks && newTasks.length > 0) {
      // Show only the tasks produced by this generation run
      setCurrentTasks(newTasks)
    } else if (submittedSourceTextRef.current) {
      // Fallback for completions that do not carry task payloads: reload only
      // the rows that belong to the submitted source text.
      reloadTasksForSourceText(submittedSourceTextRef.current)
    } else {
      // already_processed or empty result — reload from DB
      reloadTasks()
    }
    setShowModal(false)
    setHasGenerated(true)
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }, [reloadTasks, reloadTasksForSourceText, setCurrentTasks])

  const onError = useCallback(() => {
    setShowModal(false)
  }, [])

  const { stages, isGenerating, generateError, generate } = useTaskGeneration({
    onCompleted,
    onError,
  })

  // ── Input handlers ───────────────────────────────────────────
  function handleTextChange(value) {
    setText(value)
    if (value) setFile(null)
  }

  function handleFileSelect(selectedFile) {
    setFile(selectedFile)
    setText('')
  }

  // ── Generate ─────────────────────────────────────────────────
  function handleGenerate() {
    submittedSourceTextRef.current = text.trim()
    setShowModal(true)
    setHasGenerated(false)
    generate({ text, file })
  }

  // ── CRUD handlers ────────────────────────────────────────────
  async function handleEditSave(updatedTask) {
    setCrudError(null)
    try {
      await updateTask(updatedTask.id, {
        title: updatedTask.title,
        description: updatedTask.description,
        owner: updatedTask.owner,
        due_date: updatedTask.due_date,
        priority: updatedTask.priority,
        status: updatedTask.status,
      })
      setEditingTask(null)
    } catch (err) {
      setCrudError(err.message)
    }
  }

  async function handleDelete(taskId) {
    setCrudError(null)
    try {
      await deleteTask(taskId)
    } catch (err) {
      setCrudError(err.message)
    }
  }

  const hasInput = text.trim().length > 0 || file !== null
  const activeError = generateError || fetchError || crudError

  return (
    <div className="min-h-screen bg-[var(--color-bg)] font-sans text-neutral-900">
      <Navbar />

      {/* Processing modal — rendered at root level, always centered */}
      <ProcessingTimeline stages={stages} visible={showModal} />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-7">

        {/* ── Error Banner ──────────────────────────────────── */}
        {activeError && (
          <div className="flex items-start justify-between gap-4 bg-red-50 border border-red-100 rounded-2xl px-4 sm:px-5 py-3.5">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✕</span>
              <div>
                <p className="text-sm font-semibold text-red-700">Something went wrong</p>
                <p className="text-xs text-red-600 mt-0.5">{activeError}</p>
              </div>
            </div>
            <button
              onClick={() => setCrudError(null)}
              className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Hero / Generate section ─────────────────────────── */}
        <section className="space-y-4 sm:space-y-5">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Turn meeting notes into actionable tasks
            </h2>
            <p className="text-sm text-neutral-500 font-medium mt-1.5">
              Paste your notes or upload a meeting file and let AI organize the work for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            <InputSection value={text} onChange={handleTextChange} />
            <UploadArea
              file={file}
              onFileSelect={handleFileSelect}
              onClear={() => setFile(null)}
            />
          </div>

          {(text || file) && (
            <p className="text-xs text-neutral-400 font-medium">
              {file
                ? 'File selected — text input is cleared.'
                : 'Text entered — file upload is cleared.'}
            </p>
          )}

          <GenerateButton
            hasInput={hasInput}
            isLoading={isGenerating}
            onGenerate={handleGenerate}
          />
        </section>

        {/* ── Empty state ────────────────────────────────────── */}
        {!hasGenerated && (
          <section className="py-14 sm:py-16 text-center">
            <div className="inline-flex flex-col items-center gap-3 max-w-xs">
              <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center">
                <svg className="w-6 h-6" style={{ color: 'var(--color-accent)' }} viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" fill="currentColor" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-neutral-700">No tasks yet</p>
              <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                Add meeting notes or upload a file to generate actionable tasks with AI.
              </p>
            </div>
          </section>
        )}

        {/* ── Results ───────────────────────────────────────── */}
        {hasGenerated && (
          <div ref={resultsRef} className="space-y-5 sm:space-y-6">

            {/* Summary Cards */}
            <section className="space-y-3">
              <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Summary</h2>
              <SummaryCards tasks={tasks} />
            </section>

            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={() => setFilters({ owner: '', priority: '', status: '' })}
            />

            {/* Task Table + JSON side by side */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  Your Tasks
                  <span className="ml-2 text-xs font-medium text-neutral-400 normal-case">
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                  </span>
                </h2>
              </div>

              {/* Side-by-side: table ~65% / JSON ~35% on large screens, stacked below */}
              <div className="flex flex-col xl:flex-row gap-4 items-start">

                {/* Task Table — 65% */}
                <div className="w-full xl:w-[65%] min-w-0">
                  <TaskTable
                    tasks={tasks}
                    onEdit={setEditingTask}
                    onDelete={handleDelete}
                  />
                </div>

                {/* JSON Viewer — 35%, fixed height matching table */}
                <div className="w-full xl:w-[35%] xl:sticky xl:top-20" style={{ height: '560px' }}>
                  <JsonViewer tasks={tasks} onExport={exportJson} />
                </div>

              </div>
            </section>

          </div>
        )}
      </main>

      {/* Edit Modal */}
      <TaskEditModal
        task={editingTask}
        onSave={handleEditSave}
        onClose={() => setEditingTask(null)}
      />
    </div>
  )
}
