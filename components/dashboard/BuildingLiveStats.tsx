'use client'

import { useState, useEffect } from 'react'
import { Zap, Thermometer, Car, Droplets, Wifi, TrendingDown } from 'lucide-react'

const INITIAL = {
  energy: 284,
  temp: 22.4,
  parking: 68,
  water: 3.2,
}

function PulsingDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex rounded-full h-2 w-2"
        style={{ background: color }}
      />
    </span>
  )
}

function MicroBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'var(--neutral-200)' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color }}
      />
    </div>
  )
}

export function BuildingLiveStats() {
  const [vals, setVals] = useState(INITIAL)

  // Simulate live updates
  useEffect(() => {
    const id = setInterval(() => {
      setVals(prev => ({
        energy: +(prev.energy + (Math.random() - 0.5) * 4).toFixed(0),
        temp: +(prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
        parking: Math.min(120, Math.max(0, prev.parking + Math.round((Math.random() - 0.5) * 2))),
        water: +(prev.water + (Math.random() - 0.5) * 0.1).toFixed(1),
      }))
    }, 3500)
    return () => clearInterval(id)
  }, [])

  const metrics = [
    {
      icon: Zap,
      label: 'Электроэнергия',
      value: `${vals.energy}`,
      unit: 'кВт·ч',
      sub: 'сейчас',
      color: '#D89614',
      barValue: vals.energy,
      barMax: 400,
      dot: '#D89614',
    },
    {
      icon: Thermometer,
      label: 'Температура',
      value: `${vals.temp}`,
      unit: '°C',
      sub: 'среднее по зданию',
      color: '#1E6FE0',
      barValue: vals.temp,
      barMax: 30,
      dot: '#1E6FE0',
    },
    {
      icon: Car,
      label: 'Парковка',
      value: `${vals.parking}`,
      unit: '/ 120',
      sub: 'мест занято',
      color: '#15824F',
      barValue: vals.parking,
      barMax: 120,
      dot: vals.parking > 100 ? '#D7263D' : '#15824F',
    },
    {
      icon: Droplets,
      label: 'Водопотребление',
      value: `${vals.water}`,
      unit: 'м³/ч',
      sub: 'расход',
      color: '#3FBC7E',
      barValue: vals.water,
      barMax: 6,
      dot: '#3FBC7E',
    },
  ]

  return (
    <div className="dia-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wifi size={14} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h3
            className="text-[14px] font-semibold"
            style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}
          >
            Живые показатели здания
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <PulsingDot color="#15824F" />
          <span className="text-[10px] font-medium" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
            Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <div
              key={m.label}
              className="rounded-xl p-3.5 flex flex-col gap-2.5"
              style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: m.color + '18' }}
                >
                  <Icon size={14} strokeWidth={1.5} style={{ color: m.color }} />
                </div>
                <PulsingDot color={m.dot} />
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-[20px] font-bold leading-none"
                    style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-mono)' }}
                  >
                    {m.value}
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                    {m.unit}
                  </span>
                </div>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--neutral-500)' }}>
                  {m.label}
                </p>
              </div>

              <MicroBar value={m.barValue} max={m.barMax} color={m.dot} />
            </div>
          )
        })}
      </div>

      <div
        className="flex items-center gap-1.5 mt-3 pt-3"
        style={{ borderTop: '1px solid var(--neutral-100)' }}
      >
        <TrendingDown size={11} strokeWidth={1.5} style={{ color: 'var(--status-success-main)' }} />
        <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>
          Энергопотребление{' '}
          <span style={{ color: 'var(--status-success-main)', fontFamily: 'var(--font-mono)' }}>
            −7.4%
          </span>{' '}
          к прошлой неделе
        </span>
      </div>
    </div>
  )
}
