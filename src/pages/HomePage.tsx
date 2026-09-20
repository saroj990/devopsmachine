import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allCourses, allLessonsForLevel } from '../data/courses'
import { ProgressBar } from '../components/ProgressBar'
import { levelProgress, loadProgress } from '../lib/progress'

export function HomePage() {
  const progress = loadProgress()
  const beginnerPct = levelProgress(
    allLessonsForLevel('beginner').map((l) => l.id),
    progress.completedLessons,
  )
  const intermediatePct = levelProgress(
    allLessonsForLevel('intermediate').map((l) => l.id),
    progress.completedLessons,
  )

  const beginner = allCourses.find((c) => c.id === 'beginner')!
  const intermediate = allCourses.find((c) => c.id === 'intermediate')!

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
        From zero to production
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Learn DevOps by building real systems
      </h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        Short lessons, hands-on labs, failure scenarios, and quizzes — from Linux basics to
        containers and CI/CD.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/beginner/devops-intro"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 font-medium text-white hover:opacity-90"
        >
          Start beginner
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          to="/intermediate/docker-fundamentals"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium text-white hover:bg-[var(--color-panel)]"
        >
          Start intermediate
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
          <p className="text-sm font-medium text-white">Beginner</p>
          <ProgressBar value={beginnerPct} label="Progress" />
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
          <p className="text-sm font-medium text-white">Intermediate</p>
          <ProgressBar value={intermediatePct} label="Progress" />
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 opacity-60">
          <p className="text-sm font-medium text-white">Expert</p>
          <ProgressBar value={0} label="Coming soon" />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Intermediate modules</h2>
        <ul className="mt-4 space-y-3">
          {intermediate.modules.map((m) => (
            <li
              key={m.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-3"
            >
              <p className="font-medium text-slate-200">
                {String(m.number).padStart(2, '0')} — {m.title}
              </p>
              <p className="text-sm text-[var(--color-muted)]">{m.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Beginner modules</h2>
        <ul className="mt-4 space-y-3">
          {beginner.modules.map((m) => (
            <li
              key={m.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-3"
            >
              <p className="font-medium text-slate-200">
                {String(m.number).padStart(2, '0')} — {m.title}
              </p>
              <p className="text-sm text-[var(--color-muted)]">{m.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
