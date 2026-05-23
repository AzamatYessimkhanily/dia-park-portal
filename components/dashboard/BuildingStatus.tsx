'use client'

import { useState } from 'react'

const floors = [
  { floor: 14, green: 8, yellow: 0, red: 0, total: 8 },
  { floor: 13, green: 7, yellow: 1, red: 0, total: 8 },
  { floor: 12, green: 6, yellow: 2, red: 0, total: 8 },
  { floor: 11, green: 7, yellow: 0, red: 1, total: 8 },
  { floor: 10, green: 5, yellow: 2, red: 1, total: 8 },
  { floor:  9, green: 8, yellow: 0, red: 0, total: 8 },
  { floor:  8, green: 6, yellow: 1, red: 1, total: 8 },
  { floor:  7, green: 7, yellow: 1, red: 0, total: 8 },
  { floor:  6, green: 4, yellow: 3, red: 1, total: 8 },
  { floor:  5, green: 5, yellow: 2, red: 1, total: 8 },
  { floor:  4, green: 8, yellow: 0, red: 0, total: 8 },
  { floor:  3, green: 3, yellow: 2, red: 3, total: 8 },
  { floor:  2, green: 6, yellow: 2, red: 0, total: 8 },
  { floor:  1, green: 7, yellow: 1, red: 0, total: 8 },
]

function getStatusText(green: number, yellow: number, red: number) {
  const parts = []
  if (green > 0) parts.push(`${green} в норме`)
  if (yellow > 0) parts.push(`${yellow} требует внимания`)
  if (red > 0) parts.push(`${red} аварийных`)
  return parts.join(', ')
}

export function BuildingStatus() {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)

  return (
    <div
      className="dia-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
          Состояние объекта
        </h3>
        <div className="flex items-center gap-3">
          {[
            { color: 'var(--status-success-main)', label: 'Норма' },
            { color: 'var(--status-warning-main)', label: 'Внимание' },
            { color: 'var(--status-danger-main)',  label: 'Авария' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span className="text-[10px]" style={{ color: 'var(--neutral-500)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {floors.map(f => {
          const isHovered = hoveredFloor === f.floor
          return (
            <div
              key={f.floor}
              className="relative flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setHoveredFloor(f.floor)}
              onMouseLeave={() => setHoveredFloor(null)}
            >
              {/* Floor label */}
              <span
                className="text-[10px] w-[26px] text-right shrink-0"
                style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-mono)' }}
              >
                {f.floor}
              </span>

              {/* Bar */}
              <div
                className="flex-1 h-4 rounded-md overflow-hidden flex transition-all"
                style={{
                  outline: isHovered ? '1px solid var(--neutral-400)' : 'none',
                }}
              >
                {f.green > 0 && (
                  <div
                    style={{ flex: f.green, background: isHovered ? '#15824F' : 'var(--dia-green-400)', opacity: isHovered ? 1 : 0.75 }}
                  />
                )}
                {f.yellow > 0 && (
                  <div
                    style={{ flex: f.yellow, background: isHovered ? '#D89614' : 'var(--status-warning-main)', opacity: isHovered ? 1 : 0.75 }}
                  />
                )}
                {f.red > 0 && (
                  <div
                    style={{ flex: f.red, background: 'var(--status-danger-main)' }}
                  />
                )}
              </div>

              {/* Tooltip */}
              {isHovered && (
                <div
                  className="absolute left-10 -top-7 z-20 px-2.5 py-1.5 rounded-lg shadow-lg text-[11px] whitespace-nowrap pointer-events-none"
                  style={{
                    background: 'var(--neutral-900)',
                    color: 'var(--neutral-100)',
                    fontFamily: 'var(--font-mono)',
                    border: '1px solid var(--neutral-700)',
                  }}
                >
                  <span className="font-semibold mr-1.5">{f.floor} этаж</span>
                  {getStatusText(f.green, f.yellow, f.red)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div
        className="flex items-center justify-between mt-3 pt-3 border-t"
        style={{ borderColor: 'var(--neutral-100)' }}
      >
        <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Башня А · 14 этажей</span>
        <span className="text-[11px] font-semibold" style={{ color: 'var(--status-danger-main)', fontFamily: 'var(--font-mono)' }}>
          5 аварийных
        </span>
      </div>
    </div>
  )
}
