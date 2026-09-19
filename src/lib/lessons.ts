const contentModules = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function getLessonContent(contentPath: string): string | null {
  const key = `../content/${contentPath}`
  return contentModules[key] ?? null
}

export function stripFrontmatter(markdown: string): string {
  if (!markdown.startsWith('---')) return markdown
  const end = markdown.indexOf('---', 3)
  if (end === -1) return markdown
  return markdown.slice(end + 3).trimStart()
}
