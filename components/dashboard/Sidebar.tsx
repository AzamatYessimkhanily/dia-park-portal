'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  CalendarClock,
  Wrench,
  Sparkles as SparklesBrush,
  Shield,
  Users,
  DollarSign,
  Bot,
  UserCheck,
  FileText,
  Bell,
  Settings,
  ChevronDown,
  Building2,
  Check,
  X,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Дашборд', href: '/' },
  { icon: ClipboardList,   label: 'Заявки и задачи', href: '/tasks', badge: '12', badgeType: 'count' },
  { icon: MessageSquare,   label: 'Коммуникация', href: '/communication', badge: '•',  badgeType: 'dot' },
  { icon: CalendarClock,   label: 'Смены и журнал', href: '/shifts' },
  { icon: Wrench,          label: 'Техническая служба', href: '/maintenance' },
  { icon: SparklesBrush,   label: 'Клининг', href: '/cleaning' },
  { icon: Shield,          label: 'Охрана', href: '/security' },
  { icon: Users,           label: 'Резиденты', href: '/residents' },
  { icon: DollarSign,      label: 'Финансы', href: '/finance' },
  { icon: Bot,             label: 'ИИ-аналитика', href: '/ai-analytics', badge: 'AI', badgeType: 'ai' },
  { icon: UserCheck,       label: 'Сотрудники', href: '/staff' },
  { icon: FileText,        label: 'Документы', href: '/documents' },
  { icon: Bell,            label: 'Уведомления', href: '/notifications' },
  { icon: Settings,        label: 'Настройки', href: '/settings' },
]

// Available objects under DIA Holding portfolio
const objects = [
  { id: 'tower-a', name: 'Башня А', address: 'пр. Аль-Фараби 77/7', code: 'obj.A', active: true },
  { id: 'tower-b', name: 'Башня Б', address: 'пр. Аль-Фараби 77/8', code: 'obj.B', active: false },
  { id: 'plaza',   name: 'Plaza Mall', address: 'ул. Достык 105', code: 'obj.P',  active: false },
]

interface SidebarProps {
  activePath?: string
  /** True if the mobile drawer should be visible. Desktop ignores this prop. */
  mobileOpen?: boolean
  /** Called when the mobile drawer wants to close (overlay tap, nav-link tap, Esc). */
  onClose?: () => void
}

export function Sidebar({ activePath = '/', mobileOpen = false, onClose }: SidebarProps) {
  const [objectMenuOpen, setObjectMenuOpen] = useState(false)
  const [selectedObject, setSelectedObject] = useState(objects[0])
  const switcherRef = useRef<HTMLDivElement | null>(null)

  // Close object dropdown on outside click + Esc closes drawer
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setObjectMenuOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (objectMenuOpen) setObjectMenuOpen(false)
        else if (mobileOpen) onClose?.()
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [objectMenuOpen, mobileOpen, onClose])

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed left-0 top-0 h-screen w-[280px] lg:w-[260px] flex flex-col border-r z-50
                    transition-transform duration-200 ease-out
                    lg:translate-x-0
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          background: 'var(--neutral-0)',
          borderColor: 'var(--neutral-200)',
        }}
      >
        {/* Logo + close button (mobile) */}
        <div className="flex items-center gap-3 px-5 h-16 border-b shrink-0" style={{ borderColor: 'var(--neutral-200)' }}>
          <img
            src="/dia-holding.png"
            alt="DIA Holding"
            className="w-9 h-9 rounded-md shrink-0 object-cover"
            style={{ boxShadow: '0 1px 2px rgba(15,102,64,0.12)' }}
          />
          <div className="flex flex-col leading-none flex-1 min-w-0">
            <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
              DIA Park
            </span>
            <span className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--neutral-500)' }}>Корпоративный портал</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 -mr-2 flex items-center justify-center rounded-lg hover:bg-[var(--neutral-100)]"
            aria-label="Закрыть меню"
          >
            <X size={18} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
          </button>
        </div>

        {/* Object selector — real dropdown */}
        <div className="px-3 pt-3 pb-2 shrink-0 relative" ref={switcherRef}>
          <button
            onClick={() => setObjectMenuOpen(o => !o)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-colors hover:bg-[var(--neutral-100)]"
            style={{ border: '1px solid var(--neutral-300)' }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Building2 size={14} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)', flexShrink: 0 }} />
              <span className="text-xs font-medium truncate" style={{ color: 'var(--neutral-800)' }}>
                DIA Holding · {selectedObject.name}
              </span>
            </div>
            <ChevronDown
              size={12}
              strokeWidth={1.5}
              style={{
                color: 'var(--neutral-500)',
                flexShrink: 0,
                transform: objectMenuOpen ? 'rotate(180deg)' : undefined,
                transition: 'transform .15s',
              }}
            />
          </button>

          {objectMenuOpen && (
            <div
              className="absolute left-3 right-3 top-full mt-1 rounded-lg overflow-hidden z-10"
              style={{
                background: 'var(--neutral-0)',
                border: '1px solid var(--neutral-200)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div className="px-3 py-2 text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--neutral-200)' }}>
                Объекты портфеля
              </div>
              {objects.map(obj => {
                const isSelected = obj.id === selectedObject.id
                return (
                  <button
                    key={obj.id}
                    onClick={() => { setSelectedObject(obj); setObjectMenuOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-[var(--neutral-50)]"
                    style={{ background: isSelected ? 'var(--dia-green-50)' : 'transparent' }}
                  >
                    <div className="w-6 h-6 rounded-md flex items-center justify-center font-display text-[10px] font-bold text-white shrink-0" style={{ background: isSelected ? 'var(--dia-green-600)' : 'var(--neutral-400)' }}>
                      {obj.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-medium truncate" style={{ color: 'var(--neutral-900)' }}>{obj.name}</span>
                        {!obj.active && <span className="text-[9px] uppercase px-1 py-0.5 rounded font-mono" style={{ background: 'var(--neutral-100)', color: 'var(--neutral-500)' }}>скоро</span>}
                      </div>
                      <div className="text-[10px] truncate mt-0.5" style={{ color: 'var(--neutral-500)' }}>{obj.address}</div>
                    </div>
                    {isSelected && <Check size={14} strokeWidth={2} style={{ color: 'var(--dia-green-600)' }} />}
                  </button>
                )
              })}
              <div className="px-3 py-2 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
                <button className="text-[12px] font-medium" style={{ color: 'var(--dia-green-600)' }}>
                  + Подключить объект
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-1">
          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.href === activePath
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="group relative flex items-center gap-3 px-3 py-2 rounded-lg text-left w-full transition-colors"
                  style={{
                    background: isActive ? 'var(--dia-green-50)' : 'transparent',
                    color: isActive ? 'var(--dia-green-700)' : 'var(--neutral-600)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = 'var(--neutral-100)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                  }}
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                      style={{ background: 'var(--dia-green-600)' }}
                    />
                  )}
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    style={{ color: isActive ? 'var(--dia-green-600)' : 'var(--neutral-500)', flexShrink: 0 }}
                  />
                  <span
                    className="text-[13px] flex-1 truncate"
                    style={{
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--dia-green-700)' : 'var(--neutral-700)',
                    }}
                  >
                    {item.label}
                  </span>
                  {item.badge && item.badgeType === 'count' && (
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center tabular-nums"
                      style={{ background: 'var(--status-danger-bg)', color: 'var(--status-danger-main)', fontFamily: 'var(--font-mono)' }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.badge && item.badgeType === 'dot' && (
                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--status-info-main)' }} />
                  )}
                  {item.badge && item.badgeType === 'ai' && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: 'var(--dia-green-600)', color: 'white', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}
                    >
                      AI
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Profile */}
        <div
          className="shrink-0 px-3 pb-4 pt-3 border-t"
          style={{ borderColor: 'var(--neutral-200)' }}
        >
          <Link
            href="/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[var(--neutral-100)] transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
              style={{ background: 'var(--dia-green-600)' }}
            >
              АС
            </div>
            <div className="flex flex-col leading-none min-w-0">
              <span className="text-[13px] font-medium truncate" style={{ color: 'var(--neutral-800)' }}>Айгерим Сулейменова</span>
              <span className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--neutral-500)' }}>Управляющий</span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  )
}
