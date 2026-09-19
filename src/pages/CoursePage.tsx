import { Link } from 'react-router-dom'
import { allBeginnerLessons, beginnerCourse } from '../data/beginnerCourse'
import { loadProgress, levelProgress } from '../lib/progress'
import { ProgressBar } from '../components/ProgressBar'

export function CoursePage() {
  const progress = loadProgress()
  const ids = allBeginnerLessons().map((l) => l.id)
  const pct = levelProgress(ids, progress.completedLessons)
  const current =
    progress.currentLessonId &&
    allBeginnerLessons().find((l) => l.id === progress.currentLessonId)

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Your DevOps journey</h1>
      <p className="mt-2 text-[var(--color-muted)]">Level 1 — Beginner</p>
      <div className="mt-6 max-w-md">
        <ProgressBar value={pct} label="Level progress" />
      </div>
      {current && (
        <Link
          to={`/beginner/${current.id}`}
          className="mt-6 inline-block rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
        >
          Continue: {current.title}
        </Link>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {beginnerCourse.modules.map((mod) => (
          <article
            key={mod.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5"
          >
            <h2 className="text-lg font-semibold text-white">{mod.title}</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{mod.description}</p>
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              {mod.lessons.length} lessons · Quiz per lesson
            </p>
            <Link
              to={`/beginner/${mod.lessons[0].id}`}
              className="mt-4 inline-block text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Open module →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
