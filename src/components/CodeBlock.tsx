import { Check, Copy, Terminal } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps {
  children: string
  language?: string
  title?: string
}

export function CodeBlock({ children, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const text = children.trim()

  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isShell = !language || language === 'bash' || language === 'sh' || language === 'shell'

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-muted)]">
        <span className="flex items-center gap-2">
          {isShell ? <Terminal className="h-3.5 w-3.5" aria-hidden /> : null}
          {title ?? (isShell ? 'Terminal' : language ?? 'code')}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1 rounded px-2 py-1 hover:bg-[var(--color-panel)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[var(--color-success)]" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-slate-200">
        <code>{isShell ? `$ ${text.replace(/^\$ /gm, '')}` : text}</code>
      </pre>
    </div>
  )
}
