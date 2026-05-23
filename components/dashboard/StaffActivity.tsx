'use client'

import { useRouter } from 'next/navigation'

const staff = [
  { name: 'Нурлан Дюсенов',     role: 'Тех. специалист', initials: 'НД', status: 'online',     tasks: 4 },
  { name: 'Бейбіт Жанабеков',   role: 'Тех. специалист', initials: 'БЖ', status: 'overloaded', tasks: 7 },
  { name: 'Динара Омарова',     role: 'Клининг-менеджер', initials: 'ДО', status: 'online',     tasks: 3 },
  { name: 'Ерлан Сейтқали',     role: 'Охрана',          initials: 'ЕС', status: 'online',     tasks: 2 },
  { name: 'Асем Кусаинова',     role: 'Администратор',   initials: 'АК', status: 'offline',    tasks: 1 },
]

const statusConfig = {
  online:     { color: '#3FBC7E', label: 'Онлайн' },
  offline:    { color: '#9AA39D', label: 'Офлайн' },
  overloaded: { color: '#E25822', label: 'Перегружен' },
}

const avatarColors = ['#15824F', '#1E6FE0', '#D89614', '#7C3AED', '#0891B2']

export function StaffActivity() {
  const router = useRouter()
  return (
    <div
      className="dia-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
          Активность персонала
        </h3>
        <button onClick={() => router.push('/staff')} className="text-[11px] hover:underline" style={{ color: 'var(--dia-green-600)' }}>все →</button>
      </div>

      <div className="flex flex-col gap-1">
        {staff.map((person, i) => {
          const sc = statusConfig[person.status as keyof typeof statusConfig]
          return (
            <div
              key={person.name}
              onClick={() => router.push('/staff')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--neutral-100)] transition-colors cursor-pointer"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white"
                  style={{ background: avatarColors[i % avatarColors.length] }}
                >
                  {person.initials}
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                  style={{ background: sc.color, borderColor: 'var(--neutral-0)' }}
                />
              </div>

              {/* Name + role */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: 'var(--neutral-800)' }}>
                  {person.name}
                </p>
                <p className="text-[11px] truncate" style={{ color: 'var(--neutral-500)' }}>
                  {person.role}
                </p>
              </div>

              {/* Tasks count */}
              <div className="text-right shrink-0">
                <span
                  className="text-[13px] font-semibold"
                  style={{
                    color: person.tasks >= 6 ? 'var(--status-danger-main)' : 'var(--neutral-700)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {person.tasks}
                </span>
                <p className="text-[10px]" style={{ color: 'var(--neutral-400)' }}>задач</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
