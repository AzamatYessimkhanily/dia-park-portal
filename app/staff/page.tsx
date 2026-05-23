'use client'

import { AppShell } from '@/components/dashboard/AppShell'
import { StaffContent } from '@/components/staff/StaffContent'

export default function StaffPage() {
  return (
    <AppShell activePath="/staff" breadcrumb="Сотрудники" contentPadding="">
      <StaffContent />
    </AppShell>
  )
}
