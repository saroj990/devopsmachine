interface ProgressBarProps {
  value: number
  label?: string
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-xs text-[var(--color-muted)]">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        className="h-2 overflow-hidden rounded-full bg-[var(--color-border)]"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
