'use client'

import { AppShell } from '@/components/dashboard/AppShell'
import { ShiftsContent } from '@/components/shifts/ShiftsContent'

export default function ShiftsPage() {
  return (
    <AppShell activePath="/shifts" breadcrumb="Смены и журнал" contentPadding="">
      <ShiftsContent />
    </AppShell>
  )
}
