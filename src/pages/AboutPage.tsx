export function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-white">About this course</h1>
      <p className="mt-4 text-[var(--color-muted)]">
        This platform teaches DevOps through short lessons, diagrams, terminal examples, labs,
        intentional failures, and quizzes. Content is markdown-driven so new modules can be added
        without rewriting the application.
      </p>
      <p className="mt-4 text-[var(--color-muted)]">
        Deploy the static build to Vercel or Netlify. No account or backend is required for version
        one — progress stays on your device.
      </p>
    </div>
  )
}
