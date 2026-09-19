import type { ProgressState } from '../types/course'

const STORAGE_KEY = 'devops-learning-progress'

const defaultState: ProgressState = {
  completedLessons: [],
  quizScores: {},
  currentLessonId: null,
  labsCompleted: [],
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState }
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return { ...defaultState }
  }
}

export function saveProgress(state: ProgressState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function markLessonComplete(lessonId: string): ProgressState {
  const state = loadProgress()
  if (!state.completedLessons.includes(lessonId)) {
    state.completedLessons.push(lessonId)
  }
  state.currentLessonId = lessonId
  saveProgress(state)
  return state
}

export function setQuizScore(lessonId: string, score: number): ProgressState {
  const state = loadProgress()
  state.quizScores[lessonId] = score
  saveProgress(state)
  return state
}

export function levelProgress(
  lessonIds: string[],
  completed: string[],
): number {
  if (lessonIds.length === 0) return 0
  const done = lessonIds.filter((id) => completed.includes(id)).length
  return Math.round((done / lessonIds.length) * 100)
}
