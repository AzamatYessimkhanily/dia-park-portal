'use client'

import { AppShell } from '@/components/dashboard/AppShell'
import { CleaningContent } from '@/components/cleaning/CleaningContent'

export default function CleaningPage() {
  return (
    <AppShell activePath="/cleaning" breadcrumb="Клининг" contentPadding="">
      <CleaningContent />
    </AppShell>
  )
}
