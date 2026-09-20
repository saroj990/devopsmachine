import type { CourseLevel, Level } from '../types/course'
import { beginnerCourse } from './beginnerCourse'
import { intermediateCourse } from './intermediateCourse'

export const allCourses: CourseLevel[] = [beginnerCourse, intermediateCourse]

export function getCourse(level: Level): CourseLevel | undefined {
  return allCourses.find((c) => c.id === level)
}

export function allLessonsForLevel(level: Level) {
  const course = getCourse(level)
  return course ? course.modules.flatMap((m) => m.lessons) : []
}

export function findLesson(lessonId: string) {
  for (const course of allCourses) {
    for (const mod of course.modules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId)
      if (lesson) return { course, module: mod, lesson }
    }
  }
  return null
}

export function getNextLessonId(lessonId: string): string | null {
  const found = findLesson(lessonId)
  if (!found) return null
  const lessons = allLessonsForLevel(found.lesson.level)
  const idx = lessons.findIndex((l) => l.id === lessonId)
  if (idx === -1 || idx === lessons.length - 1) return null
  return lessons[idx + 1].id
}

export function getPrevLessonId(lessonId: string): string | null {
  const found = findLesson(lessonId)
  if (!found) return null
  const lessons = allLessonsForLevel(found.lesson.level)
  const idx = lessons.findIndex((l) => l.id === lessonId)
  if (idx <= 0) return null
  return lessons[idx - 1].id
}
