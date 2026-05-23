import { AppShell } from '@/components/dashboard/AppShell'
import { ResidentDetailContent } from '@/components/residents/ResidentDetailContent'

export const metadata = {
  title: 'ТОО Альянс-Trade — DIA Park',
  description: 'Карточка резидента',
}

export default function ResidentDetailPage() {
  return (
    <AppShell
      activePath="/residents"
      breadcrumb={[
        { label: 'Резиденты', href: '/residents' },
        { label: 'ТОО Альянс-Trade' },
      ]}
    >
      <ResidentDetailContent />
    </AppShell>
  )
}
