import { AppShell } from '@/components/dashboard/AppShell'
import { CommunicationContent } from '@/components/communication/CommunicationContent'

export default function CommunicationPage() {
  return (
    <AppShell
      activePath="/communication"
      breadcrumb={[
        { label: 'DIA Park', href: '/' },
        { label: 'Коммуникация' },
      ]}
      contentPadding=""
      fillHeight
    >
      <CommunicationContent />
    </AppShell>
  )
}
