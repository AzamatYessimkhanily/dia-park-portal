import { AppShell } from '@/components/dashboard/AppShell'
import { AnalyticsContent } from '@/components/analytics/AnalyticsContent'

export const metadata = {
  title: 'ИИ-аналитика | DIA Park',
  description: 'Еженедельные отчёты, инсайты и рекомендации на основе данных портала',
}

export default function AnalyticsPage() {
  return (
    <AppShell
      activePath="/ai-analytics"
      breadcrumb={[{ label: 'ИИ-аналитика' }]}
      contentPadding=""
    >
      <AnalyticsContent />
    </AppShell>
  )
}
