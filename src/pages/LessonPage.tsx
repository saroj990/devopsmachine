import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { ProgressBar } from '../components/ProgressBar'
import { QuizPanel } from '../components/QuizPanel'
import {
  allBeginnerLessons,
  findLesson,
  getNextLessonId,
  getPrevLessonId,
} from '../data/beginnerCourse'
import { getQuiz } from '../data/quizzes'
import { getLessonContent, stripFrontmatter } from '../lib/lessons'
import { levelProgress, loadProgress, markLessonComplete } from '../lib/progress'

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const [progress, setProgress] = useState(loadProgress())

  const found = lessonId ? findLesson(lessonId) : null
  const quiz = lessonId ? getQuiz(lessonId) : undefined
  const raw = found ? getLessonContent(found.lesson.contentPath) : null
  const content = raw ? stripFrontmatter(raw) : null

  useEffect(() => {
    if (lessonId) setProgress(loadProgress())
  }, [lessonId])

  if (!found || !content) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white">Lesson not found</h1>
        <Link to="/course" className="mt-4 text-[var(--color-accent)]">Back to course</Link>
      </div>
    )
  }

  const { lesson, module } = found
  const lessonIds = allBeginnerLessons().map((l) => l.id)
  const pct = levelProgress(lessonIds, progress.completedLessons)
  const prev = getPrevLessonId(lesson.id)
  const next = getNextLessonId(lesson.id)
  const done = progress.completedLessons.includes(lesson.id)

  return (
    <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
      <div>
        <p className="text-sm text-[var(--color-muted)]">
          Module {module.number} · {lesson.moduleTitle} · ~{lesson.duration} min
        </p>
        <MarkdownRenderer content={content} />
        {quiz && (
          <QuizPanel
            quiz={quiz}
            onComplete={() => {
              markLessonComplete(lesson.id)
              setProgress(loadProgress())
            }}
          />
        )}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
          {prev ? (
            <Link
              to={`/beginner/${prev}`}
              className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Link>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => {
              markLessonComplete(lesson.id)
              setProgress(loadProgress())
            }}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm hover:bg-[var(--color-panel)]"
          >
            {done ? 'Marked complete' : 'Mark lesson complete'}
          </button>
          {next ? (
            <Link
              to={`/beginner/${next}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link to="/course" className="text-sm text-[var(--color-accent)]">
              Back to dashboard
            </Link>
          )}
        </div>
      </div>
      <aside className="mt-8 lg:mt-0">
        <div className="sticky top-24 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
          <p className="text-sm font-medium text-white">Beginner track</p>
          <ProgressBar value={pct} label="Overall" />
          {progress.quizScores[lesson.id] !== undefined && (
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              Quiz score: {progress.quizScores[lesson.id]}%
            </p>
          )}
        </div>
      </aside>
    </div>
  )
}
