import { useState } from 'react'
import type { Quiz } from '../types/course'
import { setQuizScore } from '../lib/progress'

interface QuizPanelProps {
  quiz: Quiz
  onComplete?: (score: number) => void
}

export function QuizPanel({ quiz, onComplete }: QuizPanelProps) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const q = quiz.questions[index]

  function submit() {
    if (selected === null) return
    if (selected === q.answer) setCorrectCount((c) => c + 1)
    setRevealed(true)
  }

  function goNext() {
    const isLast = index === quiz.questions.length - 1
    if (isLast) {
      const score = Math.round((correctCount / quiz.questions.length) * 100)
      setFinalScore(score)
      setFinished(true)
      setQuizScore(quiz.lessonId, score)
      onComplete?.(score)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setRevealed(false)
  }

  function reset() {
    setIndex(0)
    setSelected(null)
    setRevealed(false)
    setCorrectCount(0)
    setFinished(false)
    setFinalScore(0)
  }

  if (finished) {
    return (
      <section
        className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
        aria-live="polite"
      >
        <h2 className="text-lg font-semibold text-white">Quiz complete</h2>
        <p className="mt-2 text-[var(--color-muted)]">
          Score: <span className="font-semibold text-white">{finalScore}%</span> ({correctCount}{' '}
          of {quiz.questions.length} correct)
        </p>
        <button
          type="button"
          className="mt-4 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          onClick={reset}
        >
          Retry quiz
        </button>
      </section>
    )
  }

  return (
    <section className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
      <div className="mb-4 flex items-center justify-between text-sm text-[var(--color-muted)]">
        <h2 className="text-lg font-semibold text-white">Quick quiz</h2>
        <span>
          Question {index + 1} of {quiz.questions.length}
        </span>
      </div>
      <p className="mb-4 text-slate-200">{q.question}</p>
      <ul className="space-y-2">
        {q.options.map((opt, i) => {
          let ring = 'border-[var(--color-border)]'
          if (revealed) {
            if (i === q.answer) ring = 'border-[var(--color-success)] bg-emerald-950/40'
            else if (i === selected) ring = 'border-red-500 bg-red-950/30'
          } else if (i === selected) {
            ring = 'border-[var(--color-accent)] bg-[var(--color-accent-muted)]/40'
          }
          return (
            <li key={opt}>
              <button
                type="button"
                disabled={revealed}
                onClick={() => setSelected(i)}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${ring} hover:border-[var(--color-accent)] disabled:cursor-default`}
              >
                {opt}
              </button>
            </li>
          )
        })}
      </ul>
      {revealed && (
        <p className="mt-4 text-sm text-slate-300">
          <strong className="text-white">Explanation:</strong> {q.explanation}
        </p>
      )}
      <div className="mt-6 flex gap-3">
        {!revealed ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={submit}
            className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Check answer
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
          >
            {index === quiz.questions.length - 1 ? 'Finish' : 'Next question'}
          </button>
        )}
      </div>
    </section>
  )
}
