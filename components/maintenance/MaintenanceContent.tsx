'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  Package,
  ChevronRight,
  Plus,
  Wind,
  Zap,
  Droplets,
  Flame,
  ArrowUpDown,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/dashboard/PageHeader'

const tasks = [
  { id: 'DP-1487', title: 'Прорыв трубы в туалете 8 этажа', priority: 'critical', status: 'in_progress', assignee: 'ТБ', assigneeName: 'Тимур Бекмамбетов', due: '2ч 14м', location: '8 этаж, сан.узел М' },
  { id: 'DP-1492', title: 'Не работает кондиционер', priority: 'high', status: 'new', assignee: 'АК', assigneeName: 'Арман Касымов', due: '4ч', location: '12 этаж, оф. 1203' },
  { id: 'DP-1488', title: 'Замена ламп в коридоре', priority: 'mid', status: 'in_progress', assignee: 'ТБ', assigneeName: 'Тимур Бекмамбетов', due: 'Сегодня', location: '5 этаж' },
  { id: 'DP-1480', title: 'Скрипит дверь на входе', priority: 'low', status: 'completed', assignee: 'АК', assigneeName: 'Арман Касымов', due: 'Выполнено', location: 'Главный вход' },
  { id: 'DP-1475', title: 'Проверка электрощитовой', priority: 'mid', status: 'scheduled', assignee: 'ТБ', assigneeName: 'Тимур Бекмамбетов', due: '25.05', location: 'Подвал B1' },
]

const scheduled = [
  { title: 'ТО кондиционеров 3 этаж', date: '24.05', type: 'maintenance' },
  { title: 'Проверка пожарной сигнализации', date: '26.05', type: 'inspection' },
  { title: 'Замена фильтров вентиляции', date: '28.05', type: 'maintenance' },
  { title: 'Осмотр лифтового оборудования', date: '01.06', type: 'inspection' },
]

const materials = [
  { name: 'Труба ПВХ 50мм', stock: 12, unit: 'м', status: 'ok' },
  { name: 'Муфта соединительная', stock: 4, unit: 'шт', status: 'low' },
  { name: 'Герметик сантехнический', stock: 2, unit: 'шт', status: 'critical' },
  { name: 'Лампа LED 12W', stock: 24, unit: 'шт', status: 'ok' },
  { name: 'Фильтр для кондиционера', stock: 6, unit: 'шт', status: 'ok' },
]

// Equipment health data
const equipment = [
  {
    id: 'hvac',
    icon: Wind,
    label: 'Кондиционирование',
    units: 12,
    ok: 9,
    warning: 2,
    critical: 1,
    lastCheck: '22.05, 08:00',
    note: 'Юнит 3-A требует диагностики',
  },
  {
    id: 'elec',
    icon: Zap,
    label: 'Электроснабжение',
    units: 4,
    ok: 4,
    warning: 0,
    critical: 0,
    lastCheck: '22.05, 07:30',
    note: 'Все щитовые в норме',
  },
  {
    id: 'lift',
    icon: ArrowUpDown,
    label: 'Лифтовое хозяйство',
    units: 3,
    ok: 2,
    warning: 1,
    critical: 0,
    lastCheck: '21.05, 18:00',
    note: 'Лифт №2 на плановом ТО',
  },
  {
    id: 'water',
    icon: Droplets,
    label: 'Водоснабжение',
    units: 6,
    ok: 6,
    warning: 0,
    critical: 0,
    lastCheck: '22.05, 06:45',
    note: 'Давление в норме',
  },
  {
    id: 'fire',
    icon: Flame,
    label: 'Пожарная безопасность',
    units: 28,
    ok: 27,
    warning: 1,
    critical: 0,
    lastCheck: '20.05, 10:00',
    note: 'Датчик B2-14 на замену',
  },
  {
    id: 'vent',
    icon: Activity,
    label: 'Вентиляция',
    units: 8,
    ok: 8,
    warning: 0,
    critical: 0,
    lastCheck: '22.05, 07:00',
    note: 'Все системы в норме',
  },
]

const priorityStyles: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: 'var(--priority-critical)', bg: 'var(--status-danger-bg)', label: 'Аварийный' },
  high: { color: 'var(--priority-high)', bg: '#FEF0EC', label: 'Высокий' },
  mid: { color: 'var(--priority-mid)', bg: 'var(--status-warning-bg)', label: 'Средний' },
  low: { color: 'var(--priority-low)', bg: 'var(--status-success-bg)', label: 'Низкий' },
}

const statusStyles: Record<string, { color: string; label: string }> = {
  new: { color: 'var(--status-info-main)', label: 'Новая' },
  in_progress: { color: 'var(--status-warning-main)', label: 'В работе' },
  completed: { color: 'var(--status-success-main)', label: 'Выполнено' },
  scheduled: { color: 'var(--neutral-500)', label: 'Запланировано' },
}

function EquipmentHealthGrid() {
  return (
    <div className="dia-card p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity size={16} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h2 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Состояние инженерных систем
          </h2>
        </div>
        <div className="flex items-center gap-3 text-[10px]" style={{ color: 'var(--neutral-500)' }}>
          {[
            { color: 'var(--status-success-main)', label: 'Норма' },
            { color: 'var(--status-warning-main)', label: 'Внимание' },
            { color: 'var(--status-danger-main)', label: 'Авария' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              {s.label}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {equipment.map((eq) => {
          const Icon = eq.icon
          const hasIssue = eq.critical > 0 || eq.warning > 0
          const statusColor = eq.critical > 0
            ? 'var(--status-danger-main)'
            : eq.warning > 0
              ? 'var(--status-warning-main)'
              : 'var(--status-success-main)'
          const statusBg = eq.critical > 0
            ? 'var(--status-danger-bg)'
            : eq.warning > 0
              ? 'var(--status-warning-bg)'
              : 'var(--status-success-bg)'
          const StatusIcon = eq.critical > 0 ? AlertTriangle : eq.warning > 0 ? Clock : CheckCircle2

          return (
            <div
              key={eq.id}
              className="rounded-xl p-4 cursor-pointer transition-all hover:shadow-md"
              style={{
                background: hasIssue ? statusBg : 'var(--neutral-50)',
                border: `1px solid ${hasIssue ? statusColor + '55' : 'var(--neutral-200)'}`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: statusColor + '18' }}
                >
                  <Icon size={16} strokeWidth={1.5} style={{ color: statusColor }} />
                </div>
                <StatusIcon size={14} strokeWidth={1.5} style={{ color: statusColor }} />
              </div>

              <p className="text-[13px] font-semibold mb-1" style={{ color: 'var(--neutral-900)' }}>
                {eq.label}
              </p>

              {/* Unit dots */}
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                {Array.from({ length: eq.ok }).map((_, i) => (
                  <span key={`ok-${i}`} className="w-2 h-2 rounded-full" style={{ background: 'var(--status-success-main)' }} />
                ))}
                {Array.from({ length: eq.warning }).map((_, i) => (
                  <span key={`warn-${i}`} className="w-2 h-2 rounded-full" style={{ background: 'var(--status-warning-main)' }} />
                ))}
                {Array.from({ length: eq.critical }).map((_, i) => (
                  <span key={`crit-${i}`} className="w-2 h-2 rounded-full" style={{ background: 'var(--status-danger-main)' }} />
                ))}
              </div>

              <p className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>
                {eq.note}
              </p>
              <p className="text-[10px] mt-1" style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-mono)' }}>
                Проверено: {eq.lastCheck}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function MaintenanceContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('tasks')

  const criticalCount = tasks.filter(t => t.priority === 'critical').length
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length

  return (
    <div className="px-4 py-5 md:px-8 md:py-7">
      <PageHeader
        eyebrow="Инженерные службы"
        title="Техническая служба"
        subtitle="Оперативные задачи, плановое ТО и склад расходных материалов."
        systemNote={`Смена · ${inProgressCount} в работе`}
        meta={[
          { value: tasks.length, label: 'всего задач' },
          { value: inProgressCount, label: 'в работе', tone: 'warning' },
          { value: criticalCount, label: 'аварийных', tone: criticalCount > 0 ? 'danger' : 'default' },
          { value: scheduled.length, label: 'плановых ТО' },
        ]}
        action={
          <Button style={{ background: 'var(--dia-green-600)', boxShadow: 'var(--shadow-brand)' }} className="text-white gap-2 h-10 px-4">
            <Plus size={16} strokeWidth={1.75} />
            Создать заявку
          </Button>
        }
      />

      {/* Equipment Health Grid */}
      <EquipmentHealthGrid />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList style={{ background: 'var(--neutral-100)' }}>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-white">Мои задачи</TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-white">Плановое ТО</TabsTrigger>
          <TabsTrigger value="materials" className="data-[state=active]:bg-white">Материалы</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks List */}
        <div className="col-span-1 lg:col-span-2">
          <div className="dia-card overflow-hidden">
            {tasks.map((task, idx) => {
              const priority = priorityStyles[task.priority]
              const status = statusStyles[task.status]
              const isOverdue = task.due.includes('ч') && task.priority === 'critical'
              return (
                <div
                  key={task.id}
                  onClick={() => router.push(`/tasks/${task.id}`)}
                  className="flex items-center gap-4 p-4 cursor-pointer transition-colors hover:bg-[var(--neutral-50)]"
                  style={{ borderBottom: idx < tasks.length - 1 ? '1px solid var(--neutral-200)' : 'none' }}
                >
                  <div className="w-1 h-12 rounded-full shrink-0" style={{ background: priority.color }} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>{task.id}</span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: priority.bg, color: priority.color }}>
                        {priority.label}
                      </span>
                    </div>
                    <div className="font-medium mt-1 truncate" style={{ color: 'var(--neutral-900)' }}>{task.title}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--neutral-500)' }}>{task.location}</div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Avatar className="w-7 h-7">
                      <AvatarFallback style={{ background: 'var(--dia-green-100)', color: 'var(--dia-green-700)', fontSize: 10 }}>
                        {task.assignee}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-right">
                      <div
                        className="text-xs font-medium"
                        style={{ color: isOverdue ? 'var(--status-danger-main)' : 'var(--neutral-600)', fontFamily: 'var(--font-mono)' }}
                      >
                        {task.due}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: status.color }}>{status.label}</div>
                    </div>
                  </div>

                  <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Scheduled Maintenance */}
          <div className="dia-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
              <h2 className="font-semibold" style={{ color: 'var(--neutral-900)' }}>Плановое ТО</h2>
            </div>
            <div className="space-y-3">
              {scheduled.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2" style={{ borderBottom: idx < scheduled.length - 1 ? '1px solid var(--neutral-100)' : 'none' }}>
                  <div>
                    <div className="text-sm" style={{ color: 'var(--neutral-700)' }}>{item.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--neutral-500)' }}>
                      {item.type === 'maintenance' ? 'Обслуживание' : 'Проверка'}
                    </div>
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-mono)' }}>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="dia-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Package size={16} strokeWidth={1.5} style={{ color: 'var(--status-warning-main)' }} />
              <h2 className="font-semibold" style={{ color: 'var(--neutral-900)' }}>Склад материалов</h2>
            </div>
            <div className="space-y-3">
              {materials.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        background: item.status === 'critical' ? 'var(--status-danger-main)'
                          : item.status === 'low' ? 'var(--status-warning-main)'
                          : 'var(--status-success-main)',
                      }}
                    />
                    <span className="text-sm" style={{ color: 'var(--neutral-700)' }}>{item.name}</span>
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: item.status === 'critical' ? 'var(--status-danger-main)' :
                             item.status === 'low' ? 'var(--status-warning-main)' : 'var(--neutral-600)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {item.stock} {item.unit}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4" style={{ borderColor: 'var(--neutral-300)' }}>
              Заказать материалы
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
