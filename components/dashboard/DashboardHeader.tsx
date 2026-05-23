'use client'

import { Plus } from 'lucide-react'

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <h1
          className="text-[28px] md:text-[34px] font-bold leading-tight tracking-[-0.02em] text-balance"
          style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}
        >
          Добро пожаловать, Айгерим
        </h1>
        <p className="text-[14px] mt-1" style={{ color: 'var(--neutral-500)' }}>
          Обзор объекта Dia Park на сегодня
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <div
          className="flex items-center rounded-lg p-0.5"
          style={{ background: 'var(--neutral-200)' }}
        >
          {['Сегодня', 'Неделя', 'Месяц'].map((label, i) => (
            <button
              key={label}
              className="px-3.5 py-1.5 rounded-md text-[12px] font-medium transition-all"
              style={
                i === 0
                  ? {
                      background: 'var(--neutral-0)',
                      color: 'var(--neutral-900)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                    }
                  : { background: 'transparent', color: 'var(--neutral-500)' }
              }
            >
              {label}
            </button>
          ))}
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all active:scale-[0.98]"
          style={{
            background: 'var(--dia-green-600)',
            color: 'white',
            boxShadow: 'var(--shadow-brand)',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--dia-green-700)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--dia-green-600)')}
        >
          <Plus size={15} strokeWidth={2} />
          Создать заявку
        </button>
      </div>
    </div>
  )
}
