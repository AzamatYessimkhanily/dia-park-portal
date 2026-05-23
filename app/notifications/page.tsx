'use client'

import { AppShell } from '@/components/dashboard/AppShell'
import { NotificationsContent } from '@/components/notifications/NotificationsContent'

export default function NotificationsPage() {
  return (
    <AppShell activePath="/notifications" breadcrumb="Уведомления" contentPadding="">
      <NotificationsContent />
    </AppShell>
  )
}
