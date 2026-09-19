import type { CourseLevel } from '../types/course'

export const beginnerCourse: CourseLevel = {
  id: 'beginner',
  title: 'Beginner',
  description:
    'Fundamental Linux, networking, Git, scripting, and the DevOps mindset.',
  modules: [
    {
      id: '01-devops',
      number: 1,
      title: 'What is DevOps?',
      level: 'beginner',
      description: 'Culture, lifecycle, CI/CD, and the role of a DevOps engineer.',
      lessons: [
        {
          id: 'devops-intro',
          title: 'Introduction to DevOps',
          level: 'beginner',
          module: 1,
          moduleTitle: 'What is DevOps?',
          order: 1,
          duration: 25,
          prerequisites: [],
          contentPath: 'beginner/01-devops/intro.md',
        },
        {
          id: 'devops-lifecycle',
          title: 'Lifecycle, CI/CD & Automation',
          level: 'beginner',
          module: 1,
          moduleTitle: 'What is DevOps?',
          order: 2,
          duration: 30,
          prerequisites: ['devops-intro'],
          contentPath: 'beginner/01-devops/lifecycle.md',
        },
      ],
    },
    {
      id: '02-linux',
      number: 2,
      title: 'Linux Fundamentals',
      level: 'beginner',
      description: 'Navigate the filesystem and manage files from the terminal.',
      lessons: [
        {
          id: 'linux-filesystem',
          title: 'Filesystem & Navigation',
          level: 'beginner',
          module: 2,
          moduleTitle: 'Linux Fundamentals',
          order: 1,
          duration: 35,
          prerequisites: ['devops-lifecycle'],
          contentPath: 'beginner/02-linux/filesystem.md',
        },
        {
          id: 'linux-permissions',
          title: 'Permissions, Users & sudo',
          level: 'beginner',
          module: 2,
          moduleTitle: 'Linux Fundamentals',
          order: 2,
          duration: 30,
          prerequisites: ['linux-filesystem'],
          contentPath: 'beginner/02-linux/permissions.md',
        },
      ],
    },
    {
      id: '03-processes',
      number: 3,
      title: 'Processes & Services',
      level: 'beginner',
      description: 'Processes, systemd, and reading service logs.',
      lessons: [
        {
          id: 'linux-processes',
          title: 'Processes & Monitoring',
          level: 'beginner',
          module: 3,
          moduleTitle: 'Processes & Services',
          order: 1,
          duration: 30,
          prerequisites: ['linux-permissions'],
          contentPath: 'beginner/03-processes/processes.md',
        },
        {
          id: 'linux-systemd',
          title: 'systemd & Logs',
          level: 'beginner',
          module: 3,
          moduleTitle: 'Processes & Services',
          order: 2,
          duration: 25,
          prerequisites: ['linux-processes'],
          contentPath: 'beginner/03-processes/systemd.md',
        },
      ],
    },
    {
      id: '04-networking',
      number: 4,
      title: 'Networking Fundamentals',
      level: 'beginner',
      description: 'IPs, DNS, ports, HTTP, and basic diagnostics.',
      lessons: [
        {
          id: 'networking-basics',
          title: 'IPs, DNS & Ports',
          level: 'beginner',
          module: 4,
          moduleTitle: 'Networking Fundamentals',
          order: 1,
          duration: 35,
          prerequisites: ['linux-systemd'],
          contentPath: 'beginner/04-networking/basics.md',
        },
        {
          id: 'networking-tools',
          title: 'curl, ping & ss',
          level: 'beginner',
          module: 4,
          moduleTitle: 'Networking Fundamentals',
          order: 2,
          duration: 25,
          prerequisites: ['networking-basics'],
          contentPath: 'beginner/04-networking/tools.md',
        },
      ],
    },
    {
      id: '05-ssh',
      number: 5,
      title: 'SSH',
      level: 'beginner',
      description: 'Secure remote access with keys and configuration.',
      lessons: [
        {
          id: 'ssh-fundamentals',
          title: 'SSH Keys & Remote Access',
          level: 'beginner',
          module: 5,
          moduleTitle: 'SSH',
          order: 1,
          duration: 30,
          prerequisites: ['networking-tools'],
          contentPath: 'beginner/05-ssh/fundamentals.md',
        },
      ],
    },
    {
      id: '06-git',
      number: 6,
      title: 'Git Fundamentals',
      level: 'beginner',
      description: 'Version control workflows every DevOps engineer uses daily.',
      lessons: [
        {
          id: 'git-basics',
          title: 'Repositories, Commits & Branches',
          level: 'beginner',
          module: 6,
          moduleTitle: 'Git Fundamentals',
          order: 1,
          duration: 35,
          prerequisites: ['ssh-fundamentals'],
          contentPath: 'beginner/06-git/basics.md',
        },
        {
          id: 'git-workflow',
          title: 'Remotes, Merge & .gitignore',
          level: 'beginner',
          module: 6,
          moduleTitle: 'Git Fundamentals',
          order: 2,
          duration: 30,
          prerequisites: ['git-basics'],
          contentPath: 'beginner/06-git/workflow.md',
        },
      ],
    },
    {
      id: '07-shell',
      number: 7,
      title: 'Shell Scripting',
      level: 'beginner',
      description: 'Automate repetitive tasks with Bash.',
      lessons: [
        {
          id: 'shell-scripting',
          title: 'Variables, Loops & Scripts',
          level: 'beginner',
          module: 7,
          moduleTitle: 'Shell Scripting',
          order: 1,
          duration: 35,
          prerequisites: ['git-workflow'],
          contentPath: 'beginner/07-shell/scripting.md',
        },
      ],
    },
    {
      id: '08-environment',
      number: 8,
      title: 'Environment Variables',
      level: 'beginner',
      description: 'Configuration, secrets, and safe handling of .env files.',
      lessons: [
        {
          id: 'env-variables',
          title: 'Config, Secrets & .env',
          level: 'beginner',
          module: 8,
          moduleTitle: 'Environment Variables',
          order: 1,
          duration: 25,
          prerequisites: ['shell-scripting'],
          contentPath: 'beginner/08-environment/variables.md',
        },
        {
          id: 'beginner-capstone',
          title: 'Capstone: Simple Linux Web Server',
          level: 'beginner',
          module: 8,
          moduleTitle: 'Environment Variables',
          order: 2,
          duration: 60,
          prerequisites: ['env-variables'],
          contentPath: 'beginner/08-environment/capstone.md',
        },
      ],
    },
  ],
}

export function allBeginnerLessons() {
  return beginnerCourse.modules.flatMap((m) => m.lessons)
}

export function findLesson(lessonId: string) {
  for (const mod of beginnerCourse.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId)
    if (lesson) return { module: mod, lesson }
  }
  return null
}

export function getNextLessonId(lessonId: string): string | null {
  const lessons = allBeginnerLessons()
  const idx = lessons.findIndex((l) => l.id === lessonId)
  if (idx === -1 || idx === lessons.length - 1) return null
  return lessons[idx + 1].id
}

export function getPrevLessonId(lessonId: string): string | null {
  const lessons = allBeginnerLessons()
  const idx = lessons.findIndex((l) => l.id === lessonId)
  if (idx <= 0) return null
  return lessons[idx - 1].id
}
