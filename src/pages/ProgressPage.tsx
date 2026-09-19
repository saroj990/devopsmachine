import { allBeginnerLessons } from '../data/beginnerCourse'
import { ProgressBar } from '../components/ProgressBar'
import { levelProgress, loadProgress } from '../lib/progress'

export function ProgressPage() {
  const progress = loadProgress()
  const lessons = allBeginnerLessons()
  const pct = levelProgress(lessons.map((l) => l.id), progress.completedLessons)
  const scores = Object.values(progress.quizScores)
  const avgQuiz =
    scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-white">Progress</h1>
      <p className="mt-2 text-[var(--color-muted)]">Stored locally in your browser.</p>
      <div className="mt-8 space-y-6">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
          <p className="font-medium text-white">Beginner</p>
          <ProgressBar value={pct} label="Lessons completed" />
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {progress.completedLessons.length} of {lessons.length} lessons
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5">
          <p className="font-medium text-white">Quiz average</p>
          <p className="mt-2 text-2xl font-bold text-white">{avgQuiz}%</p>
        </div>
      </div>
    </div>
  )
}
