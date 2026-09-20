import { allCourses, allLessonsForLevel } from '../data/courses'
import { ProgressBar } from '../components/ProgressBar'
import { levelProgress, loadProgress } from '../lib/progress'
import type { Level } from '../types/course'

function quizAverageForLevel(level: Level, scores: Record<string, number>) {
  const ids = allLessonsForLevel(level).map((l) => l.id)
  const levelScores = ids.map((id) => scores[id]).filter((s) => s !== undefined)
  if (levelScores.length === 0) return 0
  return Math.round(levelScores.reduce((a, b) => a + b, 0) / levelScores.length)
}

export function ProgressPage() {
  const progress = loadProgress()

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-white">Progress</h1>
      <p className="mt-2 text-[var(--color-muted)]">Stored locally in your browser.</p>
      <div className="mt-8 space-y-6">
        {allCourses.map((course) => {
          const lessons = allLessonsForLevel(course.id)
          const completed = lessons.filter((l) => progress.completedLessons.includes(l.id)).length
          const pct = levelProgress(lessons.map((l) => l.id), progress.completedLessons)
          const avg = quizAverageForLevel(course.id, progress.quizScores)
          return (
            <div
              key={course.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5"
            >
              <p className="font-medium text-white">{course.title}</p>
              <ProgressBar value={pct} label="Lessons completed" />
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {completed} of {lessons.length} lessons · Quiz avg {avg}%
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
