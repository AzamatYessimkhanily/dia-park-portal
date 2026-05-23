'use client'

import { useState } from 'react'
import {
  Search,
  Plus,
  Phone,
  Mail,
  AlertCircle,
  ChevronRight,
  MoreHorizontal,
  Wrench,
  Sparkles,
  Shield,
  BriefcaseBusiness,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { PageHeader } from '@/components/dashboard/PageHeader'

const staff = [
  { id: 1, name: 'Айгерим Сулейменова', initials: 'АС', role: 'Управляющий', department: 'Администрация', phone: '+7 700 123 4567', email: 'a.suleimenova@diapark.kz', status: 'online', tasks: { total: 12, completed: 10, overdue: 0 }, rating: 98 },
  { id: 2, name: 'Тимур Бекмамбетов', initials: 'ТБ', role: 'Старший техник', department: 'Техническая служба', phone: '+7 701 234 5678', email: 't.bekmambetov@diapark.kz', status: 'online', tasks: { total: 8, completed: 5, overdue: 1 }, rating: 92 },
  { id: 3, name: 'Динара Омарова', initials: 'ДО', role: 'Менеджер клининга', department: 'Клининг', phone: '+7 702 345 6789', email: 'd.omarova@diapark.kz', status: 'online', tasks: { total: 15, completed: 14, overdue: 0 }, rating: 96 },
  { id: 4, name: 'Канат Абдрахманов', initials: 'КА', role: 'Начальник охраны', department: 'Охрана', phone: '+7 707 456 7890', email: 'k.abdrakhmanov@diapark.kz', status: 'offline', tasks: { total: 6, completed: 6, overdue: 0 }, rating: 100 },
  { id: 5, name: 'Марат Алиев', initials: 'МА', role: 'Администратор', department: 'Администрация', phone: '+7 700 567 8901', email: 'm.aliev@diapark.kz', status: 'online', tasks: { total: 20, completed: 17, overdue: 2 }, rating: 85 },
  { id: 6, name: 'Арман Касымов', initials: 'АК', role: 'Техник', department: 'Техническая служба', phone: '+7 705 678 9012', email: 'a.kasymov@diapark.kz', status: 'online', tasks: { total: 10, completed: 8, overdue: 1 }, rating: 88 },
  { id: 7, name: 'Бауыржан Алиев', initials: 'БА', role: 'Охранник', department: 'Охрана', phone: '+7 701 789 0123', email: 'b.aliev@diapark.kz', status: 'offline', tasks: { total: 5, completed: 5, overdue: 0 }, rating: 95 },
  { id: 8, name: 'Ерлан Токаев', initials: 'ЕТ', role: 'Охранник', department: 'Охрана', phone: '+7 702 890 1234', email: 'e.tokaev@diapark.kz', status: 'online', tasks: { total: 4, completed: 4, overdue: 0 }, rating: 94 },
]

const departments = ['Все', 'Администрация', 'Техническая служба', 'Клининг', 'Охрана']

const deptConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  'Администрация': { color: '#1E6FE0', bg: '#E1ECFC', icon: BriefcaseBusiness },
  'Техническая служба': { color: '#D89614', bg: '#FDF5DC', icon: Wrench },
  'Клининг': { color: '#15824F', bg: '#DEF5E8', icon: Sparkles },
  'Охрана': { color: '#6C7570', bg: '#EDF0EE', icon: Shield },
}

function DepartmentStats() {
  const deptNames = Object.keys(deptConfig)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {deptNames.map((dept) => {
        const members = staff.filter(s => s.department === dept)
        const online = members.filter(s => s.status === 'online').length
        const avgRating = Math.round(members.reduce((s, m) => s + m.rating, 0) / members.length)
        const overdue = members.reduce((s, m) => s + m.tasks.overdue, 0)
        const cfg = deptConfig[dept]
        const Icon = cfg.icon

        return (
          <div
            key={dept}
            className="rounded-xl p-4"
            style={{ background: cfg.bg, border: `1px solid ${cfg.color}33` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: cfg.color + '22' }}
              >
                <Icon size={16} strokeWidth={1.5} style={{ color: cfg.color }} />
              </div>
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: '#fff', color: online > 0 ? '#15824F' : '#6C7570' }}
              >
                {online} онлайн
              </span>
            </div>
            <p className="text-[13px] font-semibold mb-1" style={{ color: 'var(--neutral-900)' }}>
              {dept}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold leading-none" style={{ color: cfg.color, fontFamily: 'var(--font-mono)' }}>
                {members.length}
              </span>
              <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>чел.</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>
                Рейтинг: <span style={{ color: cfg.color, fontFamily: 'var(--font-mono)' }}>{avgRating}%</span>
              </span>
              {overdue > 0 && (
                <span className="text-[10px] font-medium" style={{ color: 'var(--status-danger-main)' }}>
                  {overdue} просроч.
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function StaffContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDepartment, setActiveDepartment] = useState('Все')

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase())
      || s.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = activeDepartment === 'Все' || s.department === activeDepartment
    return matchesSearch && matchesDepartment
  })

  const onlineCount = staff.filter(s => s.status === 'online').length
  const overdueCount = staff.reduce((sum, s) => sum + s.tasks.overdue, 0)

  return (
    <div className="px-4 py-5 md:px-8 md:py-7">
      <PageHeader
        eyebrow="HR · Операционный блок"
        title="Сотрудники"
        subtitle="Службы эксплуатации, охраны и клининга — рабочая нагрузка, рейтинг и контакты."
        systemNote={`Онлайн · ${onlineCount}`}
        meta={[
          { value: staff.length, label: 'в штате' },
          { value: onlineCount, label: 'сейчас на смене', tone: 'brand' },
          { value: `${Math.round(staff.reduce((sum, s) => sum + s.rating, 0) / staff.length)}%`, label: 'средний рейтинг' },
          { value: overdueCount, label: 'просрочено задач', tone: overdueCount > 0 ? 'danger' : 'default' },
        ]}
        action={
          <Button style={{ background: 'var(--dia-green-600)', boxShadow: 'var(--shadow-brand)' }} className="text-white gap-2 h-10 px-4">
            <Plus size={16} strokeWidth={1.75} />
            Добавить сотрудника
          </Button>
        }
      />

      {/* Department Stats */}
      <DepartmentStats />

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neutral-400)' }} />
          <Input
            placeholder="Поиск по имени или должности..."
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-300)' }}
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'var(--neutral-100)' }}>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDepartment(dept)}
              className="px-3 py-1.5 rounded-md text-sm transition-colors"
              style={{
                background: activeDepartment === dept ? 'white' : 'transparent',
                color: activeDepartment === dept ? 'var(--neutral-900)' : 'var(--neutral-600)',
                fontWeight: activeDepartment === dept ? 500 : 400,
              }}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Staff List */}
      <div className="dia-card overflow-hidden">
        <div className="divide-y" style={{ borderColor: 'var(--neutral-200)' }}>
          {filteredStaff.map((person) => {
            const cfg = deptConfig[person.department]
            return (
              <div
                key={person.id}
                className="flex items-center gap-4 p-4 cursor-pointer transition-colors hover:bg-[var(--neutral-50)]"
              >
                <div className="relative">
                  <Avatar className="w-11 h-11">
                    <AvatarFallback style={{ background: cfg.bg, color: cfg.color, fontSize: 13, fontWeight: 600 }}>
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                    style={{ background: person.status === 'online' ? 'var(--status-success-main)' : 'var(--neutral-400)' }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium" style={{ color: 'var(--neutral-900)' }}>{person.name}</span>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {person.department}
                    </span>
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: 'var(--neutral-500)' }}>{person.role}</div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  {/* Tasks Progress */}
                  <div className="w-32">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span style={{ color: 'var(--neutral-500)' }}>Задачи</span>
                      <span style={{ color: 'var(--neutral-700)', fontFamily: 'var(--font-mono)' }}>
                        {person.tasks.completed}/{person.tasks.total}
                      </span>
                    </div>
                    <Progress value={(person.tasks.completed / person.tasks.total) * 100} className="h-1.5" />
                    {person.tasks.overdue > 0 && (
                      <div className="text-[10px] mt-1 flex items-center gap-1" style={{ color: 'var(--status-danger-main)' }}>
                        <AlertCircle size={10} strokeWidth={1.5} />
                        {person.tasks.overdue} просрочено
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="text-center w-16">
                    <div
                      className="text-lg font-semibold"
                      style={{
                        color: person.rating >= 95 ? 'var(--status-success-main)' :
                               person.rating >= 85 ? 'var(--neutral-700)' : 'var(--status-warning-main)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {person.rating}%
                    </div>
                    <div className="text-[10px]" style={{ color: 'var(--neutral-500)' }}>рейтинг</div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <a href={`tel:${person.phone}`} className="p-2 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                      <Phone size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                    </a>
                    <a href={`mailto:${person.email}`} className="p-2 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                      <Mail size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                    </a>
                    <button className="p-2 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                      <MoreHorizontal size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                    </button>
                  </div>
                </div>

                <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
