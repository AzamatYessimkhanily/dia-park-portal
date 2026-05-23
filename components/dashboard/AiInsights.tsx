'use client'

import { Sparkles, CheckCheck, ExternalLink, Plus } from 'lucide-react'

export function AiInsights() {
  return (
    <div
      className="relative rounded-xl p-5 overflow-hidden flex items-stretch gap-6"
      style={{
        background: 'var(--ai-bg)',
        border: '1px solid rgba(63,188,126,0.18)',
        boxShadow: '0 0 0 1px rgba(63,188,126,0.08), 0 4px 24px rgba(10,46,31,0.4)',
      }}
    >
      {/* Left content */}
      <div className="flex-1 flex flex-col justify-between gap-3 z-10">
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(63,188,126,0.12)', border: '1px solid rgba(63,188,126,0.2)' }}
          >
            <Sparkles size={12} strokeWidth={1.5} style={{ color: '#3FBC7E' }} />
            <span
              className="text-[12px] font-semibold"
              style={{ color: '#3FBC7E', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
            >
              ИИ-аналитика
            </span>
          </div>
          <span
            className="text-[10px] font-medium tracking-[0.06em] uppercase"
            style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-mono)' }}
          >
            Обновлено 14:32
          </span>
        </div>

        <p
          className="text-[14px] leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.82)' }}
        >
          За последнюю неделю расходы на техническое обслуживание выросли на{' '}
          <span className="text-white font-semibold">18%</span>. Основная причина — повторяющиеся заявки
          по системе кондиционирования на{' '}
          <span className="text-white font-semibold">3 этаже</span>. Рекомендуется провести плановую диагностику.
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.75)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          >
            <ExternalLink size={11} strokeWidth={1.5} />
            Подробнее
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
            style={{
              background: 'rgba(21,130,79,0.35)',
              border: '1px solid rgba(63,188,126,0.25)',
              color: '#72D4A6',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(21,130,79,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(21,130,79,0.35)')}
          >
            <Plus size={11} strokeWidth={1.5} />
            Создать задачу диагностики
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            <CheckCheck size={11} strokeWidth={1.5} />
            Отметить как прочитано
          </button>
        </div>
      </div>

      {/* AI Orb */}
      <div className="shrink-0 flex items-center justify-center w-24">
        <div
          className="relative w-20 h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle at 38% 38%, #3FBC7E 0%, #15824F 40%, #0A2E1F 80%, #063320 100%)',
            boxShadow:
              '0 0 32px rgba(63,188,126,0.3), 0 0 64px rgba(21,130,79,0.15), inset 0 0 20px rgba(0,0,0,0.4)',
          }}
        >
          {/* Inner glow rings */}
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12) 0%, transparent 60%)',
            }}
          />
          <div
            className="absolute -inset-1 rounded-full opacity-30"
            style={{
              border: '1px solid rgba(63,188,126,0.4)',
              animation: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}
