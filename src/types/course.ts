export type Level = 'beginner' | 'intermediate' | 'expert'

export interface Question {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface Quiz {
  lessonId: string
  questions: Question[]
}

export interface LessonMeta {
  id: string
  title: string
  level: Level
  module: number
  moduleTitle: string
  order: number
  duration: number
  prerequisites: string[]
  contentPath: string
}

export interface ModuleMeta {
  id: string
  number: number
  title: string
  level: Level
  description: string
  lessons: LessonMeta[]
}

export interface CourseLevel {
  id: Level
  title: string
  description: string
  modules: ModuleMeta[]
}

export interface ProgressState {
  completedLessons: string[]
  quizScores: Record<string, number>
  currentLessonId: string | null
  labsCompleted: string[]
}
