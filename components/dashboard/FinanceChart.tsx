'use client'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

// 30 days data — income/expense in thousands
const data = [
  { day: '23.04', income: 580, expense: 180 },
  { day: '25.04', income: 620, expense: 155 },
  { day: '27.04', income: 540, expense: 210 },
  { day: '29.04', income: 700, expense: 175 },
  { day: '01.05', income: 690, expense: 190 },
  { day: '03.05', income: 720, expense: 160 },
  { day: '05.05', income: 650, expense: 200 },
  { day: '07.05', income: 760, expense: 170 },
  { day: '09.05', income: 680, expense: 195 },
  { day: '11.05', income: 740, expense: 185 },
  { day: '13.05', income: 800, expense: 165 },
  { day: '15.05', income: 780, expense: 220 },
  { day: '17.05', income: 810, expense: 175 },
  { day: '19.05', income: 790, expense: 160 },
  { day: '22.05', income: 850, expense: 190 },
]

function formatK(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}M`
  return `${v}K`
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg px-3 py-2.5 text-[12px] shadow-lg"
      style={{
        background: 'var(--neutral-900)',
        border: '1px solid var(--neutral-700)',
        color: 'var(--neutral-100)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <p className="mb-1 opacity-60 text-[10px]">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: p.name === 'income' ? '#15824F' : '#D7263D' }}
          />
          <span>{p.name === 'income' ? 'Доход' : 'Расход'}:</span>
          <span className="font-semibold">{(p.value * 1000).toLocaleString('ru')} ₸</span>
        </div>
      ))}
    </div>
  )
}

export function FinanceChart() {
  return (
    <div
      className="dia-card p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-[14px] font-semibold" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
          Финансовая динамика
        </h3>
        <span className="text-[11px]" style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-mono)' }}>
          последние 30 дней
        </span>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.06em]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Доход</p>
          <p className="text-[14px] font-semibold" style={{ color: 'var(--status-success-main)', fontFamily: 'var(--font-mono)' }}>11 060 000 ₸</p>
        </div>
        <div className="w-px h-8" style={{ background: 'var(--neutral-200)' }} />
        <div>
          <p className="text-[10px] uppercase tracking-[0.06em]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Расход</p>
          <p className="text-[14px] font-semibold" style={{ color: 'var(--status-danger-main)', fontFamily: 'var(--font-mono)' }}>2 760 000 ₸</p>
        </div>
        <div className="w-px h-8" style={{ background: 'var(--neutral-200)' }} />
        <div>
          <p className="text-[10px] uppercase tracking-[0.06em]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Прибыль</p>
          <p className="text-[14px] font-semibold" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-mono)' }}>8 300 000 ₸</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#15824F" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#15824F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#D7263D" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#D7263D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal
              vertical={false}
              stroke="var(--neutral-200)"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: 'var(--neutral-400)', fontFamily: 'var(--font-mono)' }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              tickFormatter={formatK}
              tick={{ fontSize: 10, fill: 'var(--neutral-400)', fontFamily: 'var(--font-mono)' }}
              tickLine={false}
              axisLine={false}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#15824F"
              strokeWidth={1.5}
              fill="url(#incomeGrad)"
              dot={false}
              activeDot={{ r: 3, fill: '#15824F', strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#D7263D"
              strokeWidth={1.5}
              fill="url(#expenseGrad)"
              dot={false}
              activeDot={{ r: 3, fill: '#D7263D', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-[2px] rounded-full inline-block" style={{ background: '#15824F' }} />
          <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Доходы</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-[2px] rounded-full inline-block" style={{ background: '#D7263D' }} />
          <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Расходы</span>
        </div>
      </div>
    </div>
  )
}
