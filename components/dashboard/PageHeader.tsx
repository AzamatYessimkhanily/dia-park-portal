'use client'

import { ReactNode } from 'react'

export type MetaTone = 'default' | 'success' | 'warning' | 'danger' | 'brand'

export interface PageHeaderMeta {
  /** Big number / value */
  value: string | number
  /** Caption shown next to (or below) the value */
  label: string
  tone?: MetaTone
}

interface PageHeaderProps {
  /** Small caps label above title (e.g. "Объект · Башня А"). Optional. */
  eyebrow?: string
  /** Main page title. */
  title: string
  /** One-line subtitle. */
  subtitle?: string
  /** Inline metrics shown under the subtitle — first 1-2 are emphasised. */
  meta?: PageHeaderMeta[]
  /** Right-hand cluster: action buttons, view-toggles, etc. */
  action?: ReactNode
  /** "System chip" shown at the right edge (e.g. "synced 14:32 · obj.A"). Decoration. */
  systemNote?: string
  /** Bottom horizontal rule under the header. Default: true. */
  divider?: boolean
}

const toneToColor: Record<MetaTone, string> = {
  default: 'var(--neutral-900)',
  success: 'var(--status-success-main)',
  warning: 'var(--status-warning-main)',
  danger:  'var(--status-danger-main)',
  brand:   'var(--dia-green-600)',
}

/**
 * Canonical page header used by every authenticated section.
 * Renders title + subtitle on the left, metrics inline below, action cluster on the right,
 * and an optional system chip in the top-right corner for context (last-sync, object code).
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  meta,
  action,
  systemNote,
  divider = true,
}: PageHeaderProps) {
  return (
    <header
      className={`flex flex-col gap-5 ${divider ? 'pb-5 mb-6' : 'mb-2'}`}
      style={divider ? { borderBottom: '1px solid var(--neutral-200)' } : undefined}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="min-w-0 flex-1">
          {eyebrow && (
            <div className="dia-eyebrow mb-2.5">{eyebrow}</div>
          )}
          <h1 className="dia-display-1 text-balance">{title}</h1>
          {subtitle && (
            <p
              className="text-[14px] mt-2 leading-relaxed max-w-2xl"
              style={{ color: 'var(--neutral-600)' }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-start gap-3 md:gap-4 md:shrink-0">
          {systemNote && (
            <span className="dia-system-chip">
              <span className="dia-system-chip-dot" />
              {systemNote}
            </span>
          )}
          {action && (
            <div className="flex flex-wrap items-center gap-2">{action}</div>
          )}
        </div>
      </div>

      {meta && meta.length > 0 && (
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-stretch gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-3">
          {meta.map((m, i) => (
            <div
              key={i}
              className={`flex items-baseline gap-2.5 sm:gap-2.5 ${i > 0 ? 'sm:pl-8' : ''}`}
              style={i > 0 ? { borderLeft: '0' } : undefined}
            >
              <span
                className="text-[22px] font-semibold tabular-nums leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: toneToColor[m.tone ?? 'default'],
                  letterSpacing: '-0.015em',
                }}
              >
                {m.value}
              </span>
              <span
                className="text-[11px] sm:text-[12px] uppercase tracking-wider truncate"
                style={{ color: 'var(--neutral-500)', letterSpacing: '0.08em' }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
