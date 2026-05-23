'use client'

import { useRouter } from 'next/navigation'

const events = [
  {
    time:  '14:47',
    type:  'Заявка',
    typeColor: 'var(--status-danger-main)',
    typeBg:    'var(--status-danger-bg)',
    text: 'Создана аварийная заявка DP-1487 по кондиционеру, 3 этаж',
  },
  {
    time:  '14:32',
    type:  'ИИ',
    typeColor: 'var(--dia-green-600)',
    typeBg:    'var(--dia-green-50)',
    text: 'ИИ сформировал еженедельный отчёт по техническим расходам',
  },
  {
    time:  '13:15',
    type:  'Охрана',
    typeColor: 'var(--status-warning-main)',
    typeBg:    'var(--status-warning-bg)',
    text: 'Зарегистрирован гость: Серік Ахметов, ООО «Казмунайгаз»',
  },
  {
    time:  '12:00',
    type:  'Смена',
    typeColor: 'var(--status-info-main)',
    typeBg:    'var(--status-info-bg)',
    text: 'Сдача смены: Касымов А. → Жанабеков Б. Передано 3 открытых задачи',
  },
  {
    time:  '10:44',
    type:  'Финансы',
    typeColor: 'var(--status-success-main)',
    typeBg:    'var(--status-success-bg)',
    text: 'Получена оплата от Halyk Bank: 1 200 000 ₸ (аренда май)',
  },
  {
    time:  '09:03',
    type:  'Клининг',
    typeColor: 'var(--status-closed-main)',
    typeBg:    'var(--status-closed-bg)',
    text: 'Выполнен чек-лист утренней уборки, зоны 1–7. Фото загружены',
  },
]

export function EventsTimeline() {
  const router = useRouter()
  return (
    <div
      className="dia-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
          Последние события
        </h3>
        <button onClick={() => router.push('/shifts')} className="text-[12px] font-medium hover:underline" style={{ color: 'var(--dia-green-600)' }}>
          Весь журнал →
        </button>
      </div>

      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div
          className="absolute left-[46px] top-2 bottom-2 w-px"
          style={{ background: 'var(--neutral-200)' }}
        />

        {events.map((event, i) => (
          <div key={i} className="flex items-start gap-3 py-2.5">
            {/* Time */}
            <span
              className="text-[10px] pt-0.5 w-10 text-right shrink-0"
              style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-mono)' }}
            >
              {event.time}
            </span>

            {/* Dot */}
            <div className="relative z-10 mt-1 shrink-0">
              <span
                className="w-2.5 h-2.5 rounded-full border-2 block"
                style={{
                  background: event.typeColor,
                  borderColor: 'var(--neutral-0)',
                  boxShadow: `0 0 0 1px ${event.typeColor}40`,
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <span
                className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full mb-1"
                style={{ background: event.typeBg, color: event.typeColor }}
              >
                {event.type}
              </span>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
                {event.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
