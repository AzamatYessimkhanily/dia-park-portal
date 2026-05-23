'use client'

import { useState } from 'react'
import { 
  User,
  Shield,
  Bell,
  Building2,
  Users,
  Settings,
  ChevronRight,
  Plus,
  Mail,
  Search,
  MoreHorizontal,
  Database,
  Webhook,
  Lock,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PageHeader } from '@/components/dashboard/PageHeader'

const roles = [
  { id: 1, name: 'Руководство', users: 2, permissions: ['all'], color: 'var(--dia-green-600)' },
  { id: 2, name: 'Администратор объекта', users: 3, permissions: ['tasks', 'shifts', 'communication', 'residents'], color: 'var(--status-info-main)' },
  { id: 3, name: 'Техническая служба', users: 4, permissions: ['tasks', 'maintenance', 'shifts'], color: 'var(--status-warning-main)' },
  { id: 4, name: 'Клининг', users: 5, permissions: ['tasks', 'cleaning', 'shifts'], color: 'var(--dia-green-600)' },
  { id: 5, name: 'Охрана', users: 6, permissions: ['security', 'shifts'], color: 'var(--neutral-600)' },
  { id: 6, name: 'Финансовый отдел', users: 2, permissions: ['finance', 'residents', 'documents'], color: 'var(--priority-high)' },
]

const notificationSettings = [
  { id: 'new_task', label: 'Новая заявка', email: true, push: true, telegram: false },
  { id: 'task_assigned', label: 'Назначена задача', email: true, push: true, telegram: true },
  { id: 'task_overdue', label: 'Задача просрочена', email: true, push: true, telegram: true },
  { id: 'emergency', label: 'Аварийная ситуация', email: true, push: true, telegram: true },
  { id: 'incident', label: 'Новый инцидент', email: false, push: true, telegram: false },
  { id: 'payment', label: 'Платёж получен', email: true, push: false, telegram: false },
  { id: 'debt', label: 'Новая задолженность', email: true, push: true, telegram: false },
  { id: 'report', label: 'Еженедельный отчёт', email: true, push: false, telegram: false },
]

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState(notificationSettings)

  const toggleNotification = (id: string, channel: 'email' | 'push' | 'telegram') => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, [channel]: !n[channel] } : n
    ))
  }

  return (
    <div className="px-4 py-5 md:px-8 md:py-7">
      <PageHeader
        eyebrow="Администрирование"
        title="Настройки"
        subtitle="Профиль, роли, доступы и правила уведомлений для всех служб объекта."
        systemNote="v1.0 · obj.A"
        divider={true}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation — horizontal scroll on mobile, vertical on desktop */}
        <div className="lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-4 lg:mx-0 px-4 lg:px-0 pb-2 lg:pb-0">
            {[
              { id: 'profile', label: 'Профиль', icon: User },
              { id: 'roles', label: 'Роли и доступы', icon: Shield },
              { id: 'notifications', label: 'Уведомления', icon: Bell },
              { id: 'object', label: 'Настройки объекта', icon: Building2 },
              { id: 'users', label: 'Пользователи', icon: Users },
              { id: 'system', label: 'Система', icon: Settings },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="flex items-center gap-2 lg:gap-3 px-3 py-2.5 rounded-lg text-left transition-colors shrink-0 lg:w-full whitespace-nowrap"
                  style={{
                    background: activeTab === item.id ? 'var(--dia-green-50)' : 'transparent',
                    color: activeTab === item.id ? 'var(--dia-green-700)' : 'var(--neutral-600)',
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} style={{ color: activeTab === item.id ? 'var(--dia-green-600)' : 'var(--neutral-500)' }} />
                  <span className="text-sm" style={{ fontWeight: activeTab === item.id ? 500 : 400 }}>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="dia-card p-6">
              <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--neutral-900)' }}>Профиль</h2>
              
              <div className="flex items-center gap-4 mb-8">
                <Avatar className="w-20 h-20">
                  <AvatarFallback style={{ background: 'var(--dia-green-100)', color: 'var(--dia-green-700)', fontSize: 24, fontWeight: 600 }}>
                    АС
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-medium" style={{ color: 'var(--neutral-900)' }}>Айгерим Сулейменова</div>
                  <div className="text-sm" style={{ color: 'var(--neutral-500)' }}>Управляющий · Руководство</div>
                  <Button variant="outline" size="sm" className="mt-2" style={{ borderColor: 'var(--neutral-300)' }}>
                    Изменить фото
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label style={{ color: 'var(--neutral-700)' }}>Имя</Label>
                  <Input defaultValue="Айгерим" style={{ borderColor: 'var(--neutral-300)' }} />
                </div>
                <div className="space-y-2">
                  <Label style={{ color: 'var(--neutral-700)' }}>Фамилия</Label>
                  <Input defaultValue="Сулейменова" style={{ borderColor: 'var(--neutral-300)' }} />
                </div>
                <div className="space-y-2">
                  <Label style={{ color: 'var(--neutral-700)' }}>Email</Label>
                  <Input defaultValue="a.suleimenova@diapark.kz" style={{ borderColor: 'var(--neutral-300)' }} />
                </div>
                <div className="space-y-2">
                  <Label style={{ color: 'var(--neutral-700)' }}>Телефон</Label>
                  <Input defaultValue="+7 700 123 4567" style={{ borderColor: 'var(--neutral-300)' }} />
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
                <Button style={{ background: 'var(--dia-green-600)' }} className="text-white">
                  Сохранить изменения
                </Button>
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="dia-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--neutral-900)' }}>Роли и доступы</h2>
                <Button style={{ background: 'var(--dia-green-600)' }} className="text-white gap-2" size="sm">
                  + Создать роль
                </Button>
              </div>

              <div className="space-y-3">
                {roles.map((role) => (
                  <div 
                    key={role.id}
                    className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-[var(--neutral-50)] transition-colors"
                    style={{ borderColor: 'var(--neutral-200)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: role.color }}
                      />
                      <div>
                        <div className="font-medium" style={{ color: 'var(--neutral-900)' }}>{role.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--neutral-500)' }}>
                          {role.users} пользователей · {role.permissions.includes('all') ? 'Полный доступ' : `${role.permissions.length} разделов`}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="dia-card p-6">
              <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--neutral-900)' }}>Настройки уведомлений</h2>

              <div className="space-y-1">
                {/* Header */}
                <div className="flex items-center gap-4 px-4 py-2 text-xs font-medium" style={{ color: 'var(--neutral-500)' }}>
                  <div className="flex-1">Событие</div>
                  <div className="w-16 text-center">Email</div>
                  <div className="w-16 text-center">Push</div>
                  <div className="w-16 text-center">Telegram</div>
                </div>

                {notifications.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-[var(--neutral-50)] transition-colors"
                  >
                    <div className="flex-1 text-sm" style={{ color: 'var(--neutral-700)' }}>{item.label}</div>
                    <div className="w-16 flex justify-center">
                      <Switch 
                        checked={item.email}
                        onCheckedChange={() => toggleNotification(item.id, 'email')}
                      />
                    </div>
                    <div className="w-16 flex justify-center">
                      <Switch 
                        checked={item.push}
                        onCheckedChange={() => toggleNotification(item.id, 'push')}
                      />
                    </div>
                    <div className="w-16 flex justify-center">
                      <Switch 
                        checked={item.telegram}
                        onCheckedChange={() => toggleNotification(item.id, 'telegram')}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
                <Button style={{ background: 'var(--dia-green-600)' }} className="text-white">
                  Сохранить настройки
                </Button>
              </div>
            </div>
          )}

          {/* Object tab — real content */}
          {activeTab === 'object' && (
            <div className="space-y-4">
              <div className="dia-card p-6">
                <h2 className="dia-display-3 mb-5">Карточка объекта</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>Название объекта</Label>
                    <Input defaultValue="DIA Park · Башня А" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>Код объекта</Label>
                    <Input defaultValue="obj.A" className="font-mono" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>Адрес</Label>
                    <Input defaultValue="г. Алматы, пр. Аль-Фараби, 77/7" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>Класс БЦ</Label>
                    <Input defaultValue="A+" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>Этажность</Label>
                    <Input defaultValue="14 + 3 подземных" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>Общая площадь</Label>
                    <Input defaultValue="18 400 м²" className="font-mono tabular-nums" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>Помещений</Label>
                    <Input defaultValue="142" className="font-mono tabular-nums" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                </div>
              </div>

              <div className="dia-card p-6">
                <h2 className="dia-display-3 mb-5">Контакты</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>Управляющая компания</Label>
                    <Input defaultValue="ТОО DIA Holding" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>БИН</Label>
                    <Input defaultValue="171140012345" className="font-mono tabular-nums" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>Телефон ресепшн</Label>
                    <Input defaultValue="+7 727 350 00 00" className="font-mono tabular-nums" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: 'var(--neutral-700)' }}>E-mail</Label>
                    <Input defaultValue="info@diapark.kz" style={{ borderColor: 'var(--neutral-300)' }} />
                  </div>
                </div>
              </div>

              <div className="dia-card p-6">
                <h2 className="dia-display-3 mb-5">Рабочие часы</h2>
                <div className="space-y-3">
                  {[
                    { day: 'Понедельник', hours: '08:00 — 22:00' },
                    { day: 'Вторник', hours: '08:00 — 22:00' },
                    { day: 'Среда', hours: '08:00 — 22:00' },
                    { day: 'Четверг', hours: '08:00 — 22:00' },
                    { day: 'Пятница', hours: '08:00 — 22:00' },
                    { day: 'Суббота', hours: '10:00 — 18:00' },
                    { day: 'Воскресенье', hours: 'Закрыто', closed: true },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center justify-between py-2" style={{ borderTop: i > 0 ? '1px solid var(--neutral-200)' : 'none' }}>
                      <span className="text-sm" style={{ color: 'var(--neutral-700)' }}>{d.day}</span>
                      <span className="text-sm font-mono tabular-nums" style={{ color: d.closed ? 'var(--status-danger-main)' : 'var(--neutral-800)' }}>{d.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" style={{ borderColor: 'var(--neutral-300)' }}>Отменить</Button>
                <Button style={{ background: 'var(--dia-green-600)', boxShadow: 'var(--shadow-brand)' }} className="text-white">
                  Сохранить
                </Button>
              </div>
            </div>
          )}

          {/* Users tab */}
          {activeTab === 'users' && <UsersPanel />}

          {/* System tab */}
          {activeTab === 'system' && <SystemPanel />}
        </div>
      </div>
    </div>
  )
}

// ─── Users panel ───────────────────────────────────
const portalUsers = [
  { name: 'Айгерим Сулейменова', role: 'Управляющий', email: 'a.suleimenova@diapark.kz', status: 'active', last: 'сейчас',         initials: 'АС' },
  { name: 'Марат Алиев',         role: 'Администратор', email: 'm.aliev@diapark.kz',       status: 'active', last: '12 мин назад',  initials: 'МА' },
  { name: 'Тимур Бекмамбетов',   role: 'Тех. служба',   email: 't.bekmambetov@diapark.kz', status: 'active', last: '34 мин назад',  initials: 'ТБ' },
  { name: 'Динара Омарова',      role: 'Клининг',       email: 'd.omarova@diapark.kz',     status: 'active', last: '2 часа назад',  initials: 'ДО' },
  { name: 'Канат Абдрахманов',   role: 'Охрана',        email: 'k.abdrakhmanov@diapark.kz',status: 'inactive', last: 'вчера, 19:42',initials: 'КА' },
  { name: 'Арман Касымов',       role: 'Тех. служба',   email: 'a.kasymov@diapark.kz',     status: 'active', last: '1 час назад',   initials: 'АК' },
  { name: 'Ерлан Токаев',        role: 'Охрана',        email: 'e.tokaev@diapark.kz',      status: 'pending', last: 'не входил',     initials: 'ЕТ' },
]

function UsersPanel() {
  const [search, setSearch] = useState('')
  const list = portalUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="space-y-4">
      <div className="dia-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="dia-display-3">Пользователи портала</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--neutral-500)' }}>
              {portalUsers.length} аккаунтов · {portalUsers.filter(u=>u.status==='active').length} активных
            </p>
          </div>
          <Button style={{ background: 'var(--dia-green-600)', boxShadow: 'var(--shadow-brand)' }} className="text-white gap-2 h-10 px-4 shrink-0">
            <Plus size={16} strokeWidth={1.75} />
            Пригласить
          </Button>
        </div>

        <div className="relative mb-4">
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neutral-400)' }} />
          <Input
            placeholder="Поиск по имени, роли или e-mail..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-10"
            style={{ background: 'var(--neutral-50)', borderColor: 'var(--neutral-300)' }}
          />
        </div>

        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--neutral-200)' }}>
          {list.map((u, i) => (
            <div
              key={u.email}
              className="flex items-center gap-3 p-3 hover:bg-[var(--neutral-50)] transition-colors"
              style={{ borderBottom: i < list.length - 1 ? '1px solid var(--neutral-200)' : 'none' }}
            >
              <Avatar className="w-9 h-9 shrink-0">
                <AvatarFallback style={{ background: 'var(--dia-green-100)', color: 'var(--dia-green-700)', fontSize: 11, fontWeight: 600 }}>
                  {u.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate" style={{ color: 'var(--neutral-900)' }}>{u.name}</span>
                  {u.status === 'pending' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase" style={{ background: 'var(--status-warning-bg)', color: 'var(--status-warning-main)' }}>
                      ожидает
                    </span>
                  )}
                  {u.status === 'inactive' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>
                      неактивен
                    </span>
                  )}
                </div>
                <div className="text-[12px] mt-0.5 truncate" style={{ color: 'var(--neutral-500)' }}>{u.email}</div>
              </div>
              <span className="hidden sm:inline text-[11px] px-2 py-0.5 rounded-full shrink-0" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-600)' }}>
                {u.role}
              </span>
              <span className="hidden md:inline text-[11px] tabular-nums shrink-0 w-28 text-right" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                {u.last}
              </span>
              <button className="p-2 rounded-lg hover:bg-[var(--neutral-100)] shrink-0">
                <MoreHorizontal size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="dia-card p-5">
        <h2 className="dia-display-3 mb-1">Приглашение по e-mail</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--neutral-500)' }}>Отправьте ссылку для регистрации новому сотруднику. Ссылка действительна 7 дней.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Mail size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neutral-400)' }} />
            <Input placeholder="name@diapark.kz" className="pl-9 h-10" style={{ borderColor: 'var(--neutral-300)' }} />
          </div>
          <Button style={{ background: 'var(--dia-green-600)' }} className="text-white h-10 px-5 shrink-0">
            Отправить
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── System panel ───────────────────────────────────
function SystemPanel() {
  return (
    <div className="space-y-4">
      <div className="dia-card p-6">
        <h2 className="dia-display-3 mb-5 flex items-center gap-2">
          <Globe size={16} strokeWidth={1.75} style={{ color: 'var(--dia-green-600)' }} />
          Региональные настройки
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label style={{ color: 'var(--neutral-700)' }}>Язык интерфейса</Label>
            <select className="w-full h-10 px-3 rounded-md text-sm" style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-0)', color: 'var(--neutral-900)' }}>
              <option>Русский</option>
              <option>Қазақша</option>
              <option>English</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label style={{ color: 'var(--neutral-700)' }}>Часовой пояс</Label>
            <select className="w-full h-10 px-3 rounded-md text-sm" style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-0)', color: 'var(--neutral-900)' }}>
              <option>UTC+5 · Алматы</option>
              <option>UTC+4 · Атырау</option>
              <option>UTC+3 · Москва</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label style={{ color: 'var(--neutral-700)' }}>Валюта</Label>
            <select className="w-full h-10 px-3 rounded-md text-sm" style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-0)', color: 'var(--neutral-900)' }}>
              <option>₸ Казахстанский тенге</option>
              <option>$ Доллар США</option>
              <option>€ Евро</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label style={{ color: 'var(--neutral-700)' }}>Формат даты</Label>
            <select className="w-full h-10 px-3 rounded-md text-sm font-mono tabular-nums" style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-0)', color: 'var(--neutral-900)' }}>
              <option>23.05.2026</option>
              <option>2026-05-23</option>
              <option>23 мая 2026</option>
            </select>
          </div>
        </div>
      </div>

      <div className="dia-card p-6">
        <h2 className="dia-display-3 mb-5 flex items-center gap-2">
          <Lock size={16} strokeWidth={1.75} style={{ color: 'var(--status-warning-main)' }} />
          Безопасность
        </h2>
        <div className="space-y-4">
          {[
            { label: 'Двухфакторная аутентификация (2FA)', sub: 'Подтверждение через SMS или приложение-аутентификатор', on: true },
            { label: 'Автоматический выход',                sub: 'Завершать сессию после 60 минут бездействия',           on: true },
            { label: 'Журнал входов',                       sub: 'Сохранять историю входов в портал на 90 дней',         on: true },
            { label: 'Ограничение по IP',                   sub: 'Разрешить вход только из офисной сети',                on: false },
          ].map((it, i) => (
            <div key={i} className="flex items-start justify-between gap-4 py-2" style={{ borderTop: i > 0 ? '1px solid var(--neutral-200)' : 'none' }}>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium" style={{ color: 'var(--neutral-900)' }}>{it.label}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--neutral-500)' }}>{it.sub}</div>
              </div>
              <Switch defaultChecked={it.on} />
            </div>
          ))}
        </div>
      </div>

      <div className="dia-card p-6">
        <h2 className="dia-display-3 mb-5 flex items-center gap-2">
          <Webhook size={16} strokeWidth={1.75} style={{ color: 'var(--status-info-main)' }} />
          Интеграции
        </h2>
        <div className="space-y-3">
          {[
            { name: '1С: Бухгалтерия',         sub: 'Синхронизация платежей и контрагентов', connected: true,  status: 'Синхронизировано · 14:32' },
            { name: 'Telegram-бот уведомлений', sub: 'Отправка push-сообщений сотрудникам',   connected: true,  status: '4 канала подключены' },
            { name: 'СКУД Башня А',            sub: 'Турникеты, шлагбаум, пропускной режим', connected: true,  status: 'Активно' },
            { name: 'Видеонаблюдение',          sub: '24 камеры, запись на 30 дней',          connected: true,  status: 'Все камеры онлайн' },
            { name: 'Эквайринг Kaspi Pay',      sub: 'Приём платежей по аренде картами',      connected: false, status: 'Не подключено' },
            { name: 'Google Workspace',         sub: 'Календари, файлы, корпоративная почта', connected: false, status: 'Не подключено' },
          ].map((it, i) => (
            <div key={i} className="flex items-center justify-between gap-4 p-3 rounded-lg" style={{ background: 'var(--neutral-50)' }}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: it.connected ? 'var(--dia-green-100)' : 'var(--neutral-200)', color: it.connected ? 'var(--dia-green-700)' : 'var(--neutral-500)' }}>
                  <Webhook size={16} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium" style={{ color: 'var(--neutral-900)' }}>{it.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--neutral-500)' }}>{it.sub}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] hidden md:inline tabular-nums" style={{ color: it.connected ? 'var(--dia-green-600)' : 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                  {it.status}
                </span>
                <Button variant={it.connected ? 'outline' : 'default'} size="sm" className={it.connected ? '' : 'text-white'} style={it.connected ? { borderColor: 'var(--neutral-300)' } : { background: 'var(--dia-green-600)' }}>
                  {it.connected ? 'Настроить' : 'Подключить'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dia-card p-6">
        <h2 className="dia-display-3 mb-5 flex items-center gap-2">
          <Database size={16} strokeWidth={1.75} style={{ color: 'var(--neutral-600)' }} />
          Данные и резервные копии
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-lg" style={{ background: 'var(--neutral-50)' }}>
            <div className="dia-eyebrow mb-1.5">База портала</div>
            <div className="text-[22px] font-semibold tabular-nums" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>1.4 GB</div>
            <div className="text-xs mt-1" style={{ color: 'var(--neutral-500)' }}>из 50 GB</div>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'var(--neutral-50)' }}>
            <div className="dia-eyebrow mb-1.5">Файлы и фото</div>
            <div className="text-[22px] font-semibold tabular-nums" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>8.7 GB</div>
            <div className="text-xs mt-1" style={{ color: 'var(--neutral-500)' }}>2 847 файлов</div>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'var(--neutral-50)' }}>
            <div className="dia-eyebrow mb-1.5">Последний бэкап</div>
            <div className="text-[22px] font-semibold tabular-nums" style={{ color: 'var(--dia-green-600)', fontFamily: 'var(--font-display)' }}>02:30</div>
            <div className="text-xs mt-1" style={{ color: 'var(--neutral-500)' }}>сегодня, 23.05</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" className="gap-2" style={{ borderColor: 'var(--neutral-300)' }}>
            Создать бэкап вручную
          </Button>
          <Button variant="ghost" className="gap-2" style={{ color: 'var(--neutral-700)' }}>
            Скачать экспорт данных
          </Button>
        </div>
      </div>
    </div>
  )
}
