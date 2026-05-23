import { DashboardHeader }   from '@/components/dashboard/DashboardHeader'
import { KpiRow }             from '@/components/dashboard/KpiRow'
import { AiInsights }         from '@/components/dashboard/AiInsights'
import { UrgentTasks }        from '@/components/dashboard/UrgentTasks'
import { FinanceChart }       from '@/components/dashboard/FinanceChart'
import { BuildingStatus }     from '@/components/dashboard/BuildingStatus'
import { StaffActivity }      from '@/components/dashboard/StaffActivity'
import { EventsTimeline }     from '@/components/dashboard/EventsTimeline'
import { BuildingLiveStats }  from '@/components/dashboard/BuildingLiveStats'
import { AppShell }           from '@/components/dashboard/AppShell'

export default function DashboardPage() {
  return (
    <AppShell activePath="/" breadcrumb="Дашборд" contentPadding="px-4 py-5 md:px-6 md:py-6">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-5">
        <DashboardHeader />
        <KpiRow />
        <AiInsights />

        <div className="grid gap-5 grid-cols-1 lg:[grid-template-columns:1fr_380px]">
          <div className="flex flex-col gap-5 min-w-0">
            <UrgentTasks />
            <FinanceChart />
          </div>
          <div className="flex flex-col gap-5 min-w-0">
            <BuildingLiveStats />
            <BuildingStatus />
            <StaffActivity />
            <EventsTimeline />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
