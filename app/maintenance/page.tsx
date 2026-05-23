'use client'

import { AppShell } from '@/components/dashboard/AppShell'
import { MaintenanceContent } from '@/components/maintenance/MaintenanceContent'

export default function MaintenancePage() {
  return (
    <AppShell activePath="/maintenance" breadcrumb="Техническая служба" contentPadding="">
      <MaintenanceContent />
    </AppShell>
  )
}
