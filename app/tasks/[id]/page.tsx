import { AppShell } from '@/components/dashboard/AppShell'
import { TaskDetailContent } from '@/components/tasks/TaskDetailContent'

export const metadata = {
  title: 'DP-1487 — Заявка | DIA Park',
  description: 'Детали заявки DP-1487',
}

export default function TaskDetailPage() {
  return (
    <AppShell
      activePath="/tasks"
      breadcrumb={[
        { label: 'Заявки', href: '/tasks' },
        { label: 'DP-1487' },
      ]}
      contentPadding=""
    >
      <TaskDetailContent />
    </AppShell>
  )
}
