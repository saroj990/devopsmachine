import { Link } from 'react-router-dom'
import { allCourses, allLessonsForLevel, findLesson } from '../data/courses'
import { loadProgress, levelProgress } from '../lib/progress'
import { ProgressBar } from '../components/ProgressBar'
import type { Level } from '../types/course'

function LevelSection({ level }: { level: Level }) {
  const course = allCourses.find((c) => c.id === level)!
  const progress = loadProgress()
  const ids = allLessonsForLevel(level).map((l) => l.id)
  const pct = levelProgress(ids, progress.completedLessons)
  const current =
    progress.currentLessonId &&
    findLesson(progress.currentLessonId)?.lesson.level === level
      ? findLesson(progress.currentLessonId)?.lesson
      : null

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-white">
        Level {level === 'beginner' ? '1' : '2'} — {course.title}
      </h2>
      <div className="mt-4 max-w-md">
        <ProgressBar value={pct} label="Level progress" />
      </div>
      {current && (
        <Link
          to={`/${level}/${current.id}`}
          className="mt-4 inline-block rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
        >
          Continue: {current.title}
        </Link>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {course.modules.map((mod) => (
          <article
            key={mod.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5"
          >
            <h3 className="text-lg font-semibold text-white">{mod.title}</h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{mod.description}</p>
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              {mod.lessons.length} lessons · Quiz per lesson
            </p>
            <Link
              to={`/${level}/${mod.lessons[0].id}`}
              className="mt-4 inline-block text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Open module →
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export function CoursePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Your DevOps journey</h1>
      <p className="mt-2 text-[var(--color-muted)]">Pick up where you left off or start a new module.</p>
      <LevelSection level="beginner" />
      <LevelSection level="intermediate" />
    </div>
  )
}
