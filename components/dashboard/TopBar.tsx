'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Sun, Moon, Search, Menu, ClipboardList, Users, Wrench, DollarSign, FileText, Building2 } from 'lucide-react'

interface TopBarProps {
  breadcrumb?: string | { label: string; href?: string }[]
  /** Opens the mobile sidebar drawer. Hidden on desktop. */
  onMenu?: () => void
}

// ─── Command-palette content ───────────────────────────────
const commandActions = [
  { icon: ClipboardList, label: 'Создать заявку',         hint: 'Tasks · Новая',     href: '/tasks/new' },
  { icon: Users,         label: 'Найти резидента',        hint: 'Residents',          href: '/residents' },
  { icon: Wrench,        label: 'Создать заявку техслужбе',hint: 'Maintenance',       href: '/tasks/new' },
  { icon: DollarSign,    label: 'Финансы за месяц',       hint: 'Finance',            href: '/finance' },
  { icon: FileText,      label: 'Документы и договоры',   hint: 'Documents',          href: '/documents' },
  { icon: Building2,     label: 'Карточка объекта · Башня А', hint: 'Settings',       href: '/settings' },
]

const recentSearches = [
  { label: 'DP-1487 · Прорыв трубы 8 этаж',  href: '/tasks/DP-1487' },
  { label: 'ТОО Альянс-Trade',               href: '/residents/alyanstrade' },
  { label: 'Просроченные платежи',           href: '/finance' },
]

export function TopBar({ breadcrumb = 'Дашборд', onMenu }: TopBarProps) {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('diapark-theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('diapark-theme', next ? 'dark' : 'light')
      return next
    })
  }

  // ⌘K / Ctrl+K opens command palette · Esc closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey
      if (isMod && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        setPaletteOpen(o => !o)
      } else if (e.key === 'Escape' && paletteOpen) {
        setPaletteOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [paletteOpen])

  // Auto-focus when palette opens
  useEffect(() => {
    if (paletteOpen) {
      // small delay so the input is mounted
      setTimeout(() => inputRef.current?.focus(), 10)
    } else {
      setQuery('')
    }
  }, [paletteOpen])

  const filteredActions = query
    ? commandActions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
    : commandActions
  const filteredRecent = query
    ? recentSearches.filter(r => r.label.toLowerCase().includes(query.toLowerCase()))
    : recentSearches

  // Normalize breadcrumb
  const breadcrumbItems = typeof breadcrumb === 'string'
    ? [{ label: 'Главная', href: '/' }, { label: breadcrumb }]
    : breadcrumb

  // We show the last item only on mobile (no room for full crumb chain)
  const lastCrumb = breadcrumbItems[breadcrumbItems.length - 1]

  return (
    <>
      <header
        className="fixed top-0 left-0 lg:left-[260px] right-0 h-16 flex items-center justify-between gap-3 px-3 md:px-6 z-30 border-b"
        style={{
          background: 'var(--neutral-0)',
          borderColor: 'var(--neutral-200)',
        }}
      >
        {/* Mobile hamburger */}
        <button
          onClick={onMenu}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--neutral-100)] -ml-1"
          aria-label="Открыть меню"
        >
          <Menu size={18} strokeWidth={1.5} style={{ color: 'var(--neutral-700)' }} />
        </button>

        {/* Breadcrumb — desktop shows chain, mobile shows last label only */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 min-w-0">
          {breadcrumbItems.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && <span className="text-[13px]" style={{ color: 'var(--neutral-400)' }}>/</span>}
              {item.href ? (
                <button
                  onClick={() => router.push(item.href!)}
                  className="text-[13px] hover:underline truncate"
                  style={{ color: 'var(--neutral-500)' }}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className="text-[13px] truncate"
                  style={{
                    color: i === breadcrumbItems.length - 1 ? 'var(--neutral-800)' : 'var(--neutral-500)',
                    fontWeight: i === breadcrumbItems.length - 1 ? 500 : 400,
                  }}
                >
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </div>

        <div className="lg:hidden text-[14px] font-medium truncate flex-1 min-w-0" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
          {lastCrumb?.label}
        </div>

        {/* Search bar — full on desktop, icon-only on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2.5 px-3.5 h-9 rounded-lg w-full cursor-pointer transition-colors hover:border-[var(--neutral-400)]"
            style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-50)' }}
          >
            <Search size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)', flexShrink: 0 }} />
            <span className="text-[13px] flex-1 text-left truncate" style={{ color: 'var(--neutral-400)' }}>
              Найти заявку, резидента, сотрудника...
            </span>
            <div
              className="hidden md:flex items-center gap-0.5 shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono"
              style={{ background: 'var(--neutral-200)', color: 'var(--neutral-500)' }}
            >
              ⌘K
            </div>
          </button>
        </div>

        {/* Mobile search button (icon only) */}
        <button
          onClick={() => setPaletteOpen(true)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--neutral-100)]"
          aria-label="Поиск"
        >
          <Search size={18} strokeWidth={1.5} style={{ color: 'var(--neutral-600)' }} />
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <span className="text-[12px] hidden xl:block tabular-nums" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
            Пятница, 22 мая 2026
          </span>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--neutral-100)]"
            aria-label="Переключить тему"
          >
            {isDark ? (
              <Moon size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
            ) : (
              <Sun size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
            )}
          </button>
          <button
            onClick={() => router.push('/notifications')}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--neutral-100)]"
            aria-label="Уведомления"
          >
            <Bell size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-600)' }} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
              style={{ background: 'var(--status-danger-main)', borderColor: 'var(--neutral-0)' }}
            />
          </button>
        </div>
      </header>

      {/* ─── Command palette ──────────────────────────────────── */}
      {paletteOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4"
          onClick={() => setPaletteOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-2xl overflow-hidden"
            style={{
              background: 'var(--neutral-0)',
              border: '1px solid var(--neutral-200)',
              boxShadow: '0 24px 60px -12px rgba(15,25,20,0.30), 0 8px 16px -8px rgba(15,25,20,0.16)',
            }}
          >
            <div className="flex items-center gap-3 px-4 h-14 border-b" style={{ borderColor: 'var(--neutral-200)' }}>
              <Search size={18} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Что вы ищете?"
                className="flex-1 bg-transparent text-[15px] outline-none"
                style={{ color: 'var(--neutral-900)' }}
              />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--neutral-200)', color: 'var(--neutral-500)' }}>esc</span>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {filteredActions.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-1.5 text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                    Быстрые действия
                  </div>
                  {filteredActions.map((a, i) => {
                    const Icon = a.icon
                    return (
                      <button
                        key={i}
                        onClick={() => { setPaletteOpen(false); router.push(a.href) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[var(--neutral-50)]"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--dia-green-50)' }}>
                          <Icon size={14} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
                        </div>
                        <span className="text-[14px] flex-1 truncate" style={{ color: 'var(--neutral-800)' }}>{a.label}</span>
                        <span className="text-[10px] font-mono uppercase tracking-wider hidden sm:inline" style={{ color: 'var(--neutral-500)' }}>{a.hint}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {filteredRecent.length > 0 && (
                <div className="py-2 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
                  <div className="px-4 py-1.5 text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                    Недавние
                  </div>
                  {filteredRecent.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => { setPaletteOpen(false); router.push(r.href) }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-[var(--neutral-50)]"
                    >
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[14px]" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>↻</span>
                      <span className="text-[14px] truncate" style={{ color: 'var(--neutral-700)' }}>{r.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {filteredActions.length === 0 && filteredRecent.length === 0 && (
                <div className="px-6 py-10 text-center text-sm" style={{ color: 'var(--neutral-500)' }}>
                  Ничего не найдено по запросу «{query}»
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t text-[11px]" style={{ borderColor: 'var(--neutral-200)', background: 'var(--neutral-50)', color: 'var(--neutral-500)' }}>
              <div className="flex items-center gap-3 font-mono">
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded" style={{ background: 'var(--neutral-200)' }}>↑↓</kbd> навигация</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded" style={{ background: 'var(--neutral-200)' }}>↵</kbd> открыть</span>
              </div>
              <span>DIA Park · Поиск</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
