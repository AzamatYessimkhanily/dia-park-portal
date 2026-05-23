'use client'

import { ReactNode, useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface AppShellProps {
  /** Active sidebar path — pass the route this page sits at (e.g. '/tasks'). */
  activePath?: string
  /** Breadcrumb shown in TopBar. String = single label appended to 'Главная'. */
  breadcrumb?: string | { label: string; href?: string }[]
  /** Content padding inside <main>. Default is 'p-6'; pass '' to opt out (e.g. for full-height pages like chat). */
  contentPadding?: string
  /** Force <main> to fill the viewport height (useful for chat / kanban that need internal scroll). */
  fillHeight?: boolean
  children: ReactNode
}

/**
 * Standard authenticated app shell:
 *  - desktop (≥1024px): fixed 260px sidebar + 64px topbar, content offset accordingly
 *  - mobile (<1024px): sidebar collapses to a slide-in drawer toggled by the hamburger in TopBar
 *
 * Every authenticated page should render through this — DO NOT re-implement the shell per page.
 */
export function AppShell({
  activePath,
  breadcrumb,
  contentPadding = 'p-4 md:p-6',
  fillHeight = false,
  children,
}: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Close the drawer whenever the viewport grows back to desktop so the
  // "open" state doesn't visually leak into desktop view.
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileNavOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    if (mobileNavOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [mobileNavOpen])

  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      <Sidebar
        activePath={activePath}
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <TopBar
        breadcrumb={breadcrumb}
        onMenu={() => setMobileNavOpen(true)}
      />
      <main
        className={`pt-16 lg:ml-[260px] ${fillHeight ? 'h-screen flex flex-col' : ''}`}
      >
        <div className={`${contentPadding} ${fillHeight ? 'flex-1 min-h-0 flex flex-col' : ''}`}>
          {children}
        </div>
      </main>
    </div>
  )
}
