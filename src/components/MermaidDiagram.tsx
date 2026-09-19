import mermaid from 'mermaid'
import { useEffect, useId, useState } from 'react'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'strict',
})

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, '')
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    mermaid
      .render(`mermaid-${id}`, chart.trim())
      .then(({ svg: rendered }) => {
        if (!cancelled) setSvg(rendered)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (error) {
    return (
      <pre className="rounded border border-[var(--color-border)] bg-[var(--color-panel)] p-4 text-sm text-[var(--color-warning)]">
        Diagram could not be rendered.
      </pre>
    )
  }

  return (
    <div
      className="my-6 flex justify-center overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] p-4"
      role="img"
      aria-label="Architecture diagram"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
