'use client'

import { useState } from 'react'
import { 
  Sparkles,
  CheckCircle2,
  Clock,
  Camera,
  User,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { PageHeader } from '@/components/dashboard/PageHeader'

const zones = [
  { id: 1, name: 'Холл 1 этажа', status: 'completed', time: '08:30', assignee: 'ДО', progress: 100 },
  { id: 2, name: 'Санузлы 1-5 этажи', status: 'in_progress', time: '10:00', assignee: 'АМ', progress: 60 },
  { id: 3, name: 'Коридоры 6-10 этажи', status: 'pending', time: '11:30', assignee: 'ДО', progress: 0 },
  { id: 4, name: 'Санузлы 6-10 этажи', status: 'pending', time: '13:00', assignee: 'АМ', progress: 0 },
  { id: 5, name: 'Холл 14 этажа', status: 'pending', time: '14:00', assignee: 'ДО', progress: 0 },
  { id: 6, name: 'Паркинг B1', status: 'pending', time: '15:30', assignee: 'СТ', progress: 0 },
]

const checklist = [
  { id: 1, text: 'Полы вымыты', checked: true },
  { id: 2, text: 'Мусор вынесен', checked: true },
  { id: 3, text: 'Зеркала протёрты', checked: true },
  { id: 4, text: 'Расходники пополнены', checked: false },
  { id: 5, text: 'Дезинфекция поверхностей', checked: false },
  { id: 6, text: 'Фото прикреплено', checked: false },
]

const complaints = [
  { id: 1, text: 'Грязно в переговорной 12.03', from: 'ТОО DataCom', time: '09:45', status: 'new' },
  { id: 2, text: 'Не убрано после мероприятия', from: 'АО KazFinance', time: 'Вчера', status: 'resolved' },
]

const staff = [
  { name: 'Динара Омарова', initials: 'ДО', status: 'active', tasks: 4, completed: 2 },
  { name: 'Алия Мухамедова', initials: 'АМ', status: 'active', tasks: 3, completed: 1 },
  { name: 'Серик Токаев', initials: 'СТ', status: 'break', tasks: 2, completed: 0 },
]

const statusStyles: Record<string, { color: string; bg: string; label: string }> = {
  completed: { color: 'var(--status-success-main)', bg: 'var(--status-success-bg)', label: 'Выполнено' },
  in_progress: { color: 'var(--status-warning-main)', bg: 'var(--status-warning-bg)', label: 'В процессе' },
  pending: { color: 'var(--neutral-500)', bg: 'var(--neutral-100)', label: 'Ожидает' },
}

export function CleaningContent() {
  const [activeTab, setActiveTab] = useState('schedule')
  const [checklistState, setChecklistState] = useState(checklist)

  const completedZones = zones.filter(z => z.status === 'completed').length
  const totalProgress = Math.round((zones.reduce((sum, z) => sum + z.progress, 0) / (zones.length * 100)) * 100)

  return (
    <div className="px-4 py-5 md:px-8 md:py-7">
      <PageHeader
        eyebrow="Эксплуатация · Башня А"
        title="Клининг"
        subtitle="Управление графиком уборки, чек-листами и жалобами резидентов."
        systemNote={`Смена · ${new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })}`}
        meta={[
          { value: `${completedZones}/${zones.length}`, label: 'зон выполнено', tone: 'brand' },
          { value: `${totalProgress}%`, label: 'общий прогресс' },
          { value: complaints.filter(c => c.status === 'new').length, label: 'новых жалоб', tone: complaints.filter(c => c.status === 'new').length ? 'danger' : 'default' },
          { value: staff.filter(s => s.status === 'active').length, label: 'на смене' },
        ]}
        action={
          <Button style={{ background: 'var(--dia-green-600)', boxShadow: 'var(--shadow-brand)' }} className="text-white gap-2 h-10 px-4">
            <Plus size={16} strokeWidth={1.75} />
            Срочная уборка
          </Button>
        }
      />

      {/* Progress Bar */}
      <div className="mb-6 p-5 dia-card flex items-center gap-5">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--neutral-700)' }}>Прогресс рабочего дня</span>
            <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--dia-green-600)', fontFamily: 'var(--font-mono)' }}>{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList style={{ background: 'var(--neutral-100)' }}>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-white">График уборки</TabsTrigger>
          <TabsTrigger value="complaints" className="data-[state=active]:bg-white gap-1.5">
            Жалобы
            {complaints.filter(c => c.status === 'new').length > 0 && (
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--status-danger-main)' }} />
            )}
          </TabsTrigger>
          <TabsTrigger value="staff" className="data-[state=active]:bg-white">Сотрудники</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zones List */}
        <div className="col-span-1 lg:col-span-2">
          <div className="dia-card overflow-hidden">
            {zones.map((zone, idx) => {
              const status = statusStyles[zone.status]
              return (
                <div
                  key={zone.id}
                  className="flex items-center gap-4 p-4 cursor-pointer transition-colors hover:bg-[var(--neutral-50)]"
                  style={{ borderBottom: idx < zones.length - 1 ? '1px solid var(--neutral-200)' : 'none' }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: status.bg }}
                  >
                    {zone.status === 'completed' ? (
                      <CheckCircle2 size={18} strokeWidth={1.5} style={{ color: status.color }} />
                    ) : zone.status === 'in_progress' ? (
                      <Sparkles size={18} strokeWidth={1.5} style={{ color: status.color }} />
                    ) : (
                      <Clock size={18} strokeWidth={1.5} style={{ color: status.color }} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium" style={{ color: 'var(--neutral-900)' }}>{zone.name}</div>
                    <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'var(--neutral-500)' }}>
                      <span className="flex items-center gap-1">
                        <Clock size={12} strokeWidth={1.5} />
                        {zone.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} strokeWidth={1.5} />
                        {zone.assignee}
                      </span>
                    </div>
                  </div>

                  <div className="w-24 shrink-0">
                    {zone.status !== 'pending' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]" style={{ color: 'var(--neutral-500)' }}>
                          <span>{status.label}</span>
                          <span style={{ fontFamily: 'var(--font-mono)' }}>{zone.progress}%</span>
                        </div>
                        <Progress value={zone.progress} className="h-1.5" />
                      </div>
                    )}
                    {zone.status === 'pending' && (
                      <span className="text-xs" style={{ color: 'var(--neutral-500)' }}>Ожидает</span>
                    )}
                  </div>

                  <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Active Checklist */}
          <div className="dia-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold" style={{ color: 'var(--neutral-900)' }}>Чек-лист: Санузлы 1-5</h2>
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--status-warning-bg)', color: 'var(--status-warning-main)' }}>
                В процессе
              </span>
            </div>
            <div className="space-y-3">
              {checklistState.map((item) => (
                <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                  <Checkbox 
                    checked={item.checked}
                    onCheckedChange={(checked) => {
                      setChecklistState(prev => prev.map(i => i.id === item.id ? { ...i, checked: !!checked } : i))
                    }}
                  />
                  <span 
                    className="text-sm"
                    style={{ 
                      color: item.checked ? 'var(--neutral-500)' : 'var(--neutral-700)',
                      textDecoration: item.checked ? 'line-through' : 'none'
                    }}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
              <Button variant="outline" size="sm" className="w-full gap-2" style={{ borderColor: 'var(--neutral-300)' }}>
                <Camera size={14} strokeWidth={1.5} />
                Добавить фото
              </Button>
            </div>
          </div>

          {/* Staff Status */}
          <div className="dia-card p-5">
            <h2 className="font-semibold mb-4" style={{ color: 'var(--neutral-900)' }}>Сотрудники на смене</h2>
            <div className="space-y-3">
              {staff.map((person, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback style={{ background: 'var(--dia-green-100)', color: 'var(--dia-green-700)', fontSize: 10 }}>
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span 
                      className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                      style={{ background: person.status === 'active' ? 'var(--status-success-main)' : 'var(--status-warning-main)' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: 'var(--neutral-800)' }}>{person.name}</div>
                    <div className="text-xs" style={{ color: 'var(--neutral-500)' }}>
                      {person.completed}/{person.tasks} задач
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
