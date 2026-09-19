import { CheckCircle2, Circle } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { beginnerCourse } from '../data/beginnerCourse'
import { loadProgress } from '../lib/progress'

export function Sidebar() {
  const progress = loadProgress()

  return (
    <nav className="flex flex-col gap-6" aria-label="Course navigation">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          Beginner
        </p>
        <ul className="space-y-4">
          {beginnerCourse.modules.map((mod) => (
            <li key={mod.id}>
              <p className="mb-1 text-sm font-medium text-slate-200">
                {String(mod.number).padStart(2, '0')} {mod.title}
              </p>
              <ul className="space-y-0.5 border-l border-[var(--color-border)] pl-3">
                {mod.lessons.map((lesson) => {
                  const done = progress.completedLessons.includes(lesson.id)
                  return (
                    <li key={lesson.id}>
                      <NavLink
                        to={`/beginner/${lesson.id}`}
                        className={({ isActive }) =>
                          `flex items-start gap-2 rounded px-2 py-1.5 text-sm transition-colors ${
                            isActive
                              ? 'bg-[var(--color-accent-muted)] text-white'
                              : 'text-[var(--color-muted)] hover:text-white'
                          }`
                        }
                      >
                        {done ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 opacity-40" aria-hidden />
                        )}
                        <span>{lesson.title}</span>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-[var(--color-muted)]">
        Intermediate and Expert tracks are coming soon.
      </p>
    </nav>
  )
}
