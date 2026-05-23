'use client'

import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'

const tasks = [
  {
    id: 'DP-1487',
    priority: 'critical',
    category: 'Техника',
    description: 'Не работает кондиционер на 3 этаже, оф. 304',
    assignee: 'Б. Жанабеков',
    initials: 'БЖ',
    dueLabel: 'просрочено 2ч 14м',
    overdue: true,
    status: 'Срочно',
    statusType: 'danger',
  },
  {
    id: 'DP-1481',
    priority: 'high',
    category: 'Охрана',
    description: 'Не открывается турникет на центральном входе',
    assignee: 'Е. Сейтқали',
    initials: 'ЕС',
    dueLabel: 'через 45 мин',
    overdue: false,
    status: 'В работе',
    statusType: 'warning',
  },
  {
    id: 'DP-1476',
    priority: 'high',
    category: 'Техника',
    description: 'Протечка трубы в серверной, этаж 5',
    assignee: 'Н. Дюсенов',
    initials: 'НД',
    dueLabel: 'просрочено 47м',
    overdue: true,
    status: 'Срочно',
    statusType: 'danger',
  },
  {
    id: 'DP-1469',
    priority: 'mid',
    category: 'Клининг',
    description: 'Жалоба на состояние туалетов, корпус Б, этаж 2',
    assignee: 'Д. Омарова',
    initials: 'ДО',
    dueLabel: 'через 2ч 10м',
    overdue: false,
    status: 'Новая',
    statusType: 'info',
  },
  {
    id: 'DP-1463',
    priority: 'mid',
    category: 'Техника',
    description: 'Замена лампочек в коридоре 7 этажа',
    assignee: 'Б. Жанабеков',
    initials: 'БЖ',
    dueLabel: 'через 3ч 30м',
    overdue: false,
    status: 'В работе',
    statusType: 'warning',
  },
  {
    id: 'DP-1455',
    priority: 'low',
    category: 'Охрана',
    description: 'Зарегистрировать нового сотрудника арендатора «Halyk Bank»',
    assignee: 'А. Кусаинов',
    initials: 'АК',
    dueLabel: 'завтра 09:00',
    overdue: false,
    status: 'Новая',
    statusType: 'info',
  },
]

const priorityColors: Record<string, string> = {
  critical: '#B3001E',
  high:     '#E25822',
  mid:      '#D89614',
  low:      '#3FBC7E',
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Техника': { bg: 'var(--status-info-bg)',    text: 'var(--status-info-main)' },
  'Клининг': { bg: 'var(--status-closed-bg)',  text: 'var(--status-closed-main)' },
  'Охрана':  { bg: 'var(--status-warning-bg)', text: 'var(--status-warning-main)' },
}

const statusStyle: Record<string, { bg: string; text: string }> = {
  danger:  { bg: 'var(--status-danger-bg)',  text: 'var(--status-danger-main)' },
  warning: { bg: 'var(--status-warning-bg)', text: 'var(--status-warning-main)' },
  info:    { bg: 'var(--status-info-bg)',     text: 'var(--status-info-main)' },
  success: { bg: 'var(--status-success-bg)', text: 'var(--status-success-main)' },
}

export function UrgentTasks() {
  const router = useRouter()
  return (
    <div
      className="dia-card overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: 'var(--neutral-200)' }}
      >
        <div className="flex items-center gap-2.5">
          <h3 className="text-[14px] font-semibold" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Срочные задачи
          </h3>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: 'var(--status-danger-bg)',
              color: 'var(--status-danger-main)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            6
          </span>
        </div>
        <button onClick={() => router.push('/tasks')} className="text-[12px] font-medium hover:underline" style={{ color: 'var(--dia-green-600)' }}>
          Все заявки →
        </button>
      </div>

      {/* Task list */}
      <div className="flex flex-col">
        {tasks.map((task, idx) => {
          const catStyle = categoryColors[task.category] ?? { bg: 'var(--neutral-100)', text: 'var(--neutral-600)' }
          const stStyle = statusStyle[task.statusType] ?? statusStyle.info
          return (
            <div
              key={task.id}
              onClick={() => router.push(`/tasks/${task.id}`)}
              className="relative flex items-center gap-3 px-5 py-3.5 hover:bg-[var(--neutral-100)] transition-colors group cursor-pointer"
              style={{
                borderTop: idx === 0 ? 'none' : '1px solid var(--neutral-100)',
              }}
            >
              {/* Priority stripe */}
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-sm"
                style={{ background: priorityColors[task.priority] }}
              />

              {/* ID */}
              <span
                className="text-[11px] shrink-0 w-[58px]"
                style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}
              >
                {task.id}
              </span>

              {/* Category tag */}
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                style={{ background: catStyle.bg, color: catStyle.text }}
              >
                {task.category}
              </span>

              {/* Description */}
              <span
                className="text-[13px] flex-1 truncate"
                style={{ color: 'var(--neutral-800)' }}
              >
                {task.description}
              </span>

              {/* Assignee */}
              <div className="flex items-center gap-1.5 shrink-0 hidden xl:flex">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                  style={{ background: 'var(--dia-green-600)' }}
                >
                  {task.initials}
                </div>
                <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>
                  {task.assignee}
                </span>
              </div>

              {/* Due time */}
              <span
                className="text-[11px] shrink-0 w-[108px] text-right"
                style={{
                  color: task.overdue ? 'var(--status-danger-main)' : 'var(--neutral-500)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {task.dueLabel}
              </span>

              {/* Status pill */}
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0"
                style={{ background: stStyle.bg, color: stStyle.text }}
              >
                {task.status}
              </span>

              {/* Overflow menu */}
              <button
                className="shrink-0 w-6 h-6 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--neutral-400)' }}
              >
                <MoreHorizontal size={14} strokeWidth={1.5} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
