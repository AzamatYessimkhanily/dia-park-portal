'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from 'recharts'

// Sparkline data — 30 days occupancy
const sparklineData = [
  { v: 80 }, { v: 81 }, { v: 79 }, { v: 82 }, { v: 83 }, { v: 84 },
  { v: 83 }, { v: 85 }, { v: 84 }, { v: 83 }, { v: 85 }, { v: 86 },
  { v: 85 }, { v: 84 }, { v: 86 }, { v: 85 }, { v: 86 }, { v: 85 },
  { v: 86 }, { v: 85 }, { v: 86 }, { v: 87 }, { v: 86 }, { v: 87 },
  { v: 86 }, { v: 87 }, { v: 87 }, { v: 88 }, { v: 87 }, { v: 87 },
]

// Priority breakdown bar data for open tickets
const priorityData = [
  { label: 'Low',  count: 14, color: '#3FBC7E' },
  { label: 'Mid',  count: 18, color: '#D89614' },
  { label: 'High', count: 11, color: '#E25822' },
  { label: 'Crit', count: 4,  color: '#B3001E' },
]

function MonoNum({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={{ fontFamily: 'var(--font-mono)', ...style }}>
      {children}
    </span>
  )
}

export function KpiRow() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:2fr_1fr_1fr_1fr]">

      {/* Card 1 — Загрузка объекта (2x width on desktop, full row on mobile) */}
      <div
        className="dia-card p-5 flex flex-col justify-between min-h-[156px] sm:col-span-2 lg:col-span-1"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
              Загрузка объекта
            </p>
            <div className="flex items-end gap-3 mt-1.5">
              <MonoNum
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '56px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: 'var(--neutral-900)',
                }}
              >
                87.4%
              </MonoNum>
              <div className="flex items-center gap-1 mb-2">
                <TrendingUp size={13} strokeWidth={2} style={{ color: 'var(--status-success-main)' }} />
                <MonoNum className="text-[12px] font-medium" style={{ color: 'var(--status-success-main)', fontFamily: 'var(--font-mono)' }}>
                  +4.2%
                </MonoNum>
              </div>
            </div>
          </div>
        </div>

        {/* Sparkline */}
        <div className="h-10 mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"   stopColor="#15824F" stopOpacity={0.25} />
                  <stop offset="95%"  stopColor="#15824F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#15824F"
                strokeWidth={1.5}
                fill="url(#sparkGrad)"
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
              <Tooltip
                content={() => null}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="text-[11px] mt-1" style={{ color: 'var(--neutral-500)' }}>
          из 142 помещений занято{' '}
          <MonoNum style={{ color: 'var(--neutral-700)', fontFamily: 'var(--font-mono)' }}>124</MonoNum>
        </p>
      </div>

      {/* Card 2 — Открытых заявок */}
      <div
        className="dia-card p-5 flex flex-col justify-between min-h-[156px]"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
          Открытых заявок
        </p>
        <MonoNum
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'var(--neutral-900)',
            display: 'block',
            marginTop: '6px',
          }}
        >
          47
        </MonoNum>

        {/* Priority micro-bar */}
        <div className="mt-auto">
          <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden mt-3">
            {priorityData.map(p => (
              <div
                key={p.label}
                style={{ background: p.color, flex: p.count }}
                title={`${p.label}: ${p.count}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {priorityData.map(p => (
              <div key={p.label} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                <MonoNum className="text-[10px]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                  {p.count}
                </MonoNum>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3 — Просрочено */}
      <div
        className="p-5 flex flex-col justify-between min-h-[156px] rounded-[14px] border"
        style={{ background: 'var(--status-danger-bg)', borderColor: '#F5B8BF' }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--status-danger-main)', fontFamily: 'var(--font-mono)', opacity: 0.8 }}>
          Просрочено
        </p>
        <MonoNum
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'var(--status-danger-main)',
            display: 'block',
            marginTop: '6px',
          }}
        >
          8
        </MonoNum>
        <div className="flex items-center gap-1 mt-auto">
          <TrendingUp size={12} strokeWidth={2} style={{ color: 'var(--status-danger-main)' }} />
          <MonoNum className="text-[11px]" style={{ color: 'var(--status-danger-main)', fontFamily: 'var(--font-mono)' }}>
            +3 за сегодня
          </MonoNum>
        </div>
      </div>

      {/* Card 4 — Финансы за неделю */}
      <div
        className="dia-card p-5 flex flex-col justify-between min-h-[156px]"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
          Финансы за неделю
        </p>

        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Приход</span>
            <MonoNum className="text-[13px] font-semibold" style={{ color: 'var(--status-success-main)', fontFamily: 'var(--font-mono)' }}>
              4 800 000 ₸
            </MonoNum>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Расход</span>
            <MonoNum className="text-[13px]" style={{ color: 'var(--neutral-600)', fontFamily: 'var(--font-mono)' }}>
              1 350 000 ₸
            </MonoNum>
          </div>
          <div
            className="h-px mt-1"
            style={{ background: 'var(--neutral-200)' }}
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold" style={{ color: 'var(--neutral-700)' }}>Прибыль</span>
            <MonoNum className="text-[14px] font-bold" style={{ color: 'var(--status-success-main)', fontFamily: 'var(--font-mono)' }}>
              3 450 000 ₸
            </MonoNum>
          </div>
        </div>
      </div>
    </div>
  )
}
