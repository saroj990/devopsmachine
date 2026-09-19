import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'

export function AppLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-[var(--color-muted)] hover:bg-[var(--color-panel)] lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Toggle course menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/" className="text-lg font-bold tracking-tight text-white">
              DevOps Learning
            </Link>
          </div>
          <nav className="flex gap-4 text-sm" aria-label="Main">
            <Link to="/course" className="text-[var(--color-muted)] hover:text-white">
              Course
            </Link>
            <Link to="/progress" className="text-[var(--color-muted)] hover:text-white">
              Progress
            </Link>
            <Link to="/about" className="text-[var(--color-muted)] hover:text-white">
              About
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-0 px-4 py-6 lg:gap-8">
        <aside
          className={`${
            open ? 'block' : 'hidden'
          } mb-6 w-full shrink-0 lg:mb-0 lg:block lg:w-64`}
        >
          <Sidebar />
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
