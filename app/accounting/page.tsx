import { AppShell } from '@/components/dashboard/AppShell'
import { AccountingContent } from '@/components/accounting/AccountingContent'

export default function AccountingPage() {
  return (
    <AppShell activePath="/accounting" breadcrumb="Главная / Бухгалтерия" contentPadding="">
      <AccountingContent />
    </AppShell>
  )
}
