'use client'

import { useState } from 'react'
import { 
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  MessageSquare,
  ClipboardList,
  DollarSign,
  Shield,
  Clock,
  Check,
  Trash2,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/dashboard/PageHeader'

const notifications = [
  { id: 1, type: 'urgent', icon: AlertTriangle, title: 'Аварийная заявка DP-1487', message: 'Прорыв трубы в туалете 8 этажа. Требуется немедленное реагирование.', time: '5 мин назад', read: false, category: 'tasks' },
  { id: 2, type: 'task', icon: ClipboardList, title: 'Назначена новая задача', message: 'Вам назначена задача DP-1492: Не работает кондиционер (12 этаж)', time: '15 мин назад', read: false, category: 'tasks' },
  { id: 3, type: 'message', icon: MessageSquare, title: 'Новое сообщение в чате', message: 'Тимур Бекмамбетов: На месте. Труба лопнула на стыке — нужна замена...', time: '32 мин назад', read: false, category: 'messages' },
  { id: 4, type: 'finance', icon: DollarSign, title: 'Просроченная оплата', message: 'ТОО DataCom: задолженность 1 870 000 ₸, просрочка 12 дней', time: '1 час назад', read: true, category: 'finance' },
  { id: 5, type: 'info', icon: Info, title: 'Еженедельный отчёт готов', message: 'ИИ-аналитика сформировала отчёт за неделю 15–22 мая', time: '2 часа назад', read: true, category: 'reports' },
  { id: 6, type: 'security', icon: Shield, title: 'Инцидент безопасности', message: 'Зафиксирована попытка прохода без пропуска (главный вход)', time: '3 часа назад', read: true, category: 'security' },
  { id: 7, type: 'task', icon: CheckCircle2, title: 'Задача выполнена', message: 'DP-1480: Скрипит дверь на входе — закрыта Арманом Касымовым', time: '4 часа назад', read: true, category: 'tasks' },
  { id: 8, type: 'info', icon: Clock, title: 'Напоминание о смене', message: 'Начало вашей смены через 30 минут (20:00)', time: 'Вчера, 19:30', read: true, category: 'shifts' },
  { id: 9, type: 'finance', icon: DollarSign, title: 'Платёж получен', message: 'ТОО Альянс-Trade: оплата 3 230 000 ₸ за май зачислена', time: 'Вчера, 14:22', read: true, category: 'finance' },
  { id: 10, type: 'info', icon: Info, title: 'Договор истекает', message: 'Договор с ТОО DataCom истекает через 30 дней (01.03.2026)', time: 'Вчера, 09:00', read: true, category: 'documents' },
]

const typeStyles: Record<string, { bg: string; color: string }> = {
  urgent: { bg: 'var(--status-danger-bg)', color: 'var(--status-danger-main)' },
  task: { bg: 'var(--dia-green-50)', color: 'var(--dia-green-600)' },
  message: { bg: 'var(--status-info-bg)', color: 'var(--status-info-main)' },
  finance: { bg: 'var(--status-warning-bg)', color: 'var(--status-warning-main)' },
  info: { bg: 'var(--neutral-100)', color: 'var(--neutral-600)' },
  security: { bg: '#FEF0EC', color: 'var(--priority-high)' },
}

export function NotificationsContent() {
  const [activeTab, setActiveTab] = useState('all')
  const [notificationsList, setNotificationsList] = useState(notifications)

  const unreadCount = notificationsList.filter(n => !n.read).length

  const filteredNotifications = notificationsList.filter(n => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !n.read
    return n.category === activeTab
  })

  const markAllRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotificationsList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="px-4 py-5 md:px-8 md:py-7 max-w-5xl">
      <PageHeader
        eyebrow="Лента событий"
        title="Уведомления"
        subtitle="Аварии, финансы, коммуникация, отчёты — всё важное из инструментов портала в одном потоке."
        systemNote="Реальное время"
        meta={[
          { value: notificationsList.length, label: 'всего' },
          { value: unreadCount, label: 'непрочитанных', tone: unreadCount > 0 ? 'brand' : 'default' },
          { value: notificationsList.filter(n => n.type === 'urgent').length, label: 'срочных', tone: 'danger' },
        ]}
        action={
          <>
            <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2 h-9" style={{ borderColor: 'var(--neutral-300)' }}>
              <Check size={14} strokeWidth={1.75} />
              Прочитать все
            </Button>
            <Button variant="outline" size="sm" className="gap-2 h-9" style={{ borderColor: 'var(--neutral-300)' }}>
              <Settings size={14} strokeWidth={1.75} />
              Настроить
            </Button>
          </>
        }
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList style={{ background: 'var(--neutral-100)' }}>
          <TabsTrigger value="all" className="data-[state=active]:bg-white">Все</TabsTrigger>
          <TabsTrigger value="unread" className="data-[state=active]:bg-white gap-1.5">
            Непрочитанные
            {unreadCount > 0 && (
              <span 
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                style={{ background: 'var(--status-danger-main)', color: 'white', fontFamily: 'var(--font-mono)' }}
              >
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-white">Задачи</TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-white">Сообщения</TabsTrigger>
          <TabsTrigger value="finance" className="data-[state=active]:bg-white">Финансы</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Notifications List */}
      <div className="dia-card overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell size={32} strokeWidth={1} style={{ color: 'var(--neutral-300)' }} className="mx-auto mb-3" />
            <p className="text-sm" style={{ color: 'var(--neutral-500)' }}>Нет уведомлений</p>
          </div>
        ) : (
          filteredNotifications.map((notification, idx) => {
            const style = typeStyles[notification.type]
            const Icon = notification.icon
            return (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className="flex items-start gap-4 p-4 cursor-pointer transition-colors hover:bg-[var(--neutral-50)]"
                style={{ 
                  borderBottom: idx < filteredNotifications.length - 1 ? '1px solid var(--neutral-200)' : 'none',
                  background: notification.read ? 'transparent' : 'var(--dia-green-50)'
                }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: style.bg }}
                >
                  <Icon size={18} strokeWidth={1.5} style={{ color: style.color }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span 
                      className="font-medium text-sm"
                      style={{ color: 'var(--neutral-900)' }}
                    >
                      {notification.title}
                    </span>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--dia-green-600)' }} />
                    )}
                  </div>
                  <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--neutral-600)' }}>
                    {notification.message}
                  </p>
                  <span className="text-xs mt-2 block" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                    {notification.time}
                  </span>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation() }}
                  className="p-2 rounded-lg hover:bg-[var(--neutral-100)] transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
