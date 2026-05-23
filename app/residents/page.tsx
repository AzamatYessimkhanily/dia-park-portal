'use client'

import { AppShell } from '@/components/dashboard/AppShell'
import { ResidentsContent } from '@/components/residents/ResidentsContent'

export default function ResidentsPage() {
  return (
    <AppShell activePath="/residents" breadcrumb="Резиденты" contentPadding="">
      <ResidentsContent />
    </AppShell>
  )
}
