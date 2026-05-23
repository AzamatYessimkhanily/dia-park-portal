'use client'

import { AppShell } from '@/components/dashboard/AppShell'
import { NewTaskContent } from '@/components/tasks/NewTaskContent'

export default function NewTaskPage() {
  return (
    <AppShell
      activePath="/tasks"
      breadcrumb={[
        { label: 'Заявки', href: '/tasks' },
        { label: 'Новая заявка' },
      ]}
      contentPadding=""
    >
      <NewTaskContent />
    </AppShell>
  )
}
