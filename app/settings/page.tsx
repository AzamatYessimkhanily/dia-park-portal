'use client'

import { AppShell } from '@/components/dashboard/AppShell'
import { SettingsContent } from '@/components/settings/SettingsContent'

export default function SettingsPage() {
  return (
    <AppShell activePath="/settings" breadcrumb="Настройки" contentPadding="">
      <SettingsContent />
    </AppShell>
  )
}
