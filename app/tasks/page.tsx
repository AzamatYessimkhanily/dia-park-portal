import { AppShell } from '@/components/dashboard/AppShell'
import { TasksContent } from '@/components/tasks/TasksContent'

export default function TasksPage() {
  return (
    <AppShell
      activePath="/tasks"
      breadcrumb={[{ label: 'Главная' }, { label: 'Заявки и задачи' }]}
      contentPadding="p-6"
      fillHeight
    >
      <TasksContent />
    </AppShell>
  )
}
