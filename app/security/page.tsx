import { Metadata } from 'next'
import { AppShell } from '@/components/dashboard/AppShell'
import { SecurityContent } from '@/components/security/SecurityContent'

export const metadata: Metadata = {
  title: 'Охрана и безопасность | DIA Park',
  description: 'Панель охраны и безопасности DIA Park',
}

export default function SecurityPage() {
  return (
    <AppShell
      activePath="/security"
      breadcrumb={[
        { label: 'DIA Park', href: '/' },
        { label: 'Охрана и безопасность' },
      ]}
      contentPadding=""
    >
      <SecurityContent />
    </AppShell>
  )
}
