import { AppShell } from '@/components/dashboard/AppShell'
import { FinanceContent } from '@/components/finance/FinanceContent'

export const metadata = {
  title: 'Финансы | DIA Park',
  description: 'Финансовый дашборд объекта',
}

export default function FinancePage() {
  return (
    <AppShell
      activePath="/finance"
      breadcrumb={[
        { label: 'DIA Park', href: '/' },
        { label: 'Финансы' },
      ]}
    >
      <FinanceContent />
    </AppShell>
  )
}
