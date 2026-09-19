import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { AboutPage } from './pages/AboutPage'
import { CoursePage } from './pages/CoursePage'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'
import { ProgressPage } from './pages/ProgressPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AppLayout />}>
          <Route path="/course" element={<CoursePage />} />
          <Route path="/beginner" element={<Navigate to="/beginner/devops-intro" replace />} />
          <Route path="/beginner/:lessonId" element={<LessonPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
