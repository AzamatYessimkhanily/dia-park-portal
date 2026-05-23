'use client'

import { AppShell } from '@/components/dashboard/AppShell'
import { DocumentsContent } from '@/components/documents/DocumentsContent'

export default function DocumentsPage() {
  return (
    <AppShell activePath="/documents" breadcrumb="Документы" contentPadding="">
      <DocumentsContent />
    </AppShell>
  )
}
