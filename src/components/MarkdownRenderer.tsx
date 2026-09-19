import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from './CodeBlock'
import { MermaidDiagram } from './MermaidDiagram'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="lesson-prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-white">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-10 text-xl font-semibold text-white first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-6 text-lg font-medium text-slate-200">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-[var(--color-muted)]">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-1 pl-6 text-[var(--color-muted)]">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-1 pl-6 text-[var(--color-muted)]">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-slate-200">{children}</strong>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[var(--color-accent)] underline-offset-2 hover:underline"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-[var(--color-accent)] bg-[var(--color-accent-muted)]/30 py-2 pl-4 text-slate-300">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className ?? '')
            const lang = match?.[1]
            const text = String(children).replace(/\n$/, '')
            if (lang === 'mermaid') {
              return <MermaidDiagram chart={text} />
            }
            const inline = !className
            if (inline) {
              return (
                <code
                  className="rounded bg-[var(--color-panel)] px-1.5 py-0.5 text-sm text-emerald-300"
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return <CodeBlock language={lang}>{text}</CodeBlock>
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
