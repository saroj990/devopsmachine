import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { allBeginnerLessons, beginnerCourse } from '../data/beginnerCourse'
import { ProgressBar } from '../components/ProgressBar'
import { levelProgress, loadProgress } from '../lib/progress'

export function HomePage() {
  const progress = loadProgress()
  const lessonIds = allBeginnerLessons().map((l) => l.id)
  const beginnerPct = levelProgress(lessonIds, progress.completedLessons)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
        From zero to production
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Learn DevOps by building real systems
      </h1>
      <p className="mt-4 text-lg text-[var(--color-muted)]">
        Short lessons, hands-on labs, failure scenarios, and quizzes — structured for beginners
        first.
      </p>
      <Link
        to="/beginner/devops-intro"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Start beginner course
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
          <p className="text-sm font-medium text-white">Beginner</p>
          <ProgressBar value={beginnerPct} label="Progress" />
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 opacity-60">
          <p className="text-sm font-medium text-white">Intermediate</p>
          <ProgressBar value={0} label="Coming soon" />
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 opacity-60">
          <p className="text-sm font-medium text-white">Expert</p>
          <ProgressBar value={0} label="Coming soon" />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">How you learn</h2>
        <ol className="mt-4 grid gap-2 text-sm text-[var(--color-muted)] sm:grid-cols-2">
          {['Learn', 'Understand', 'Practice', 'Break', 'Fix', 'Quiz', 'Progress'].map((step, i) => (
            <li key={step} className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent-muted)] text-xs text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Beginner modules</h2>
        <ul className="mt-4 space-y-3">
          {beginnerCourse.modules.map((m) => (
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
