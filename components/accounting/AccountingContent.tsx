'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  Check,
  X,
  MessageCircle,
  FileText,
  Paperclip,
  Sparkles,
  Wallet,
  CreditCard,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Download,
  Send,
  Receipt,
  Banknote,
  Briefcase,
  ChevronRight,
  ChevronDown,
  Eye,
  Filter,
  FileSpreadsheet,
  Users as UsersIcon,
  ArrowDownToLine,
  ArrowUpFromLine,
  Landmark,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/dashboard/PageHeader'

// ── DATA ─────────────────────────────────────────────────────────────────────

type ApprovalTask = {
  id: string
  type: 'expense' | 'invoice' | 'act' | 'payment' | 'salary'
  title: string
  counterparty: string
  amount: number
  date: string
  due: string
  category: string
  initiator: { name: string; initials: string }
  priority: 'urgent' | 'normal'
  doc: string
  comments: number
}

const approvalTasks: ApprovalTask[] = [
  {
    id: 'ACC-2487',
    type: 'expense',
    title: 'Подтвердить операционные расходы за май',
    counterparty: 'АлматыЭнерго · договор № 14/2025',
    amount: 1_650_000,
    date: '23.05.2026',
    due: 'до 26.05',
    category: 'Коммунальные',
    initiator: { name: 'Айгерим Сулейменова', initials: 'АС' },
    priority: 'urgent',
    doc: 'счёт-фактура № 4421',
    comments: 3,
  },
  {
    id: 'ACC-2491',
    type: 'invoice',
    title: 'Счёт от поставщика — ремонт лифта №2',
    counterparty: 'ТОО KazLift Service',
    amount: 480_000,
    date: '24.05.2026',
    due: 'до 28.05',
    category: 'Техника',
    initiator: { name: 'Тимур Бекмамбетов', initials: 'ТБ' },
    priority: 'normal',
    doc: 'счёт № 217',
    comments: 1,
  },
  {
    id: 'ACC-2490',
    type: 'act',
    title: 'Акт выполненных работ — клининг 2 нед.',
    counterparty: 'ТОО CleanPro Almaty',
    amount: 425_000,
    date: '22.05.2026',
    due: 'до 25.05',
    category: 'Клининг',
    initiator: { name: 'Динара Омарова', initials: 'ДО' },
    priority: 'urgent',
    doc: 'акт № КП-148',
    comments: 0,
  },
  {
    id: 'ACC-2488',
    type: 'salary',
    title: 'Ведомость зарплат — аванс за май',
    counterparty: '14 сотрудников',
    amount: 3_280_000,
    date: '25.05.2026',
    due: 'до 27.05',
    category: 'ФОТ',
    initiator: { name: 'Марат Алиев', initials: 'МА' },
    priority: 'urgent',
    doc: 'ведомость № 05/26-А',
    comments: 2,
  },
  {
    id: 'ACC-2486',
    type: 'payment',
    title: 'Платёж за охрану — ежемесячный',
    counterparty: 'ТОО SecuryGuard KZ',
    amount: 1_200_000,
    date: '24.05.2026',
    due: 'до 30.05',
    category: 'Охрана',
    initiator: { name: 'Канат Абдрахманов', initials: 'КА' },
    priority: 'normal',
    doc: 'договор № SG-2024-08',
    comments: 0,
  },
  {
    id: 'ACC-2485',
    type: 'invoice',
    title: 'Закупка расходных материалов',
    counterparty: 'ИП Сериков А.М.',
    amount: 184_000,
    date: '23.05.2026',
    due: 'до 26.05',
    category: 'Материалы',
    initiator: { name: 'Тимур Бекмамбетов', initials: 'ТБ' },
    priority: 'normal',
    doc: 'счёт № 1102',
    comments: 0,
  },
  {
    id: 'ACC-2484',
    type: 'expense',
    title: 'Интернет и связь — Казахтелеком',
    counterparty: 'АО Казахтелеком',
    amount: 92_400,
    date: '23.05.2026',
    due: 'до 29.05',
    category: 'Связь',
    initiator: { name: 'Айгерим Сулейменова', initials: 'АС' },
    priority: 'normal',
    doc: 'счёт № 2026/05-887',
    comments: 0,
  },
]

const typeMeta: Record<ApprovalTask['type'], { label: string; color: string; bg: string; icon: React.ElementType }> = {
  expense:  { label: 'Расход',     color: '#D89614', bg: '#FDF5DC', icon: ArrowUpFromLine },
  invoice:  { label: 'Счёт',       color: '#1E6FE0', bg: '#E1ECFC', icon: Receipt },
  act:      { label: 'Акт',        color: '#15824F', bg: '#DEF5E8', icon: FileText },
  payment:  { label: 'Платёж',     color: '#6C3FC5', bg: '#EFE7FB', icon: Send },
  salary:   { label: 'ФОТ',        color: '#0E7490', bg: '#DBF1F6', icon: Briefcase },
}

const bankAccounts = [
  { name: 'Halyk Bank · Текущий',   number: 'KZ•••8412', currency: 'KZT', balance: 18_420_000, change: 2.1, primary: true },
  { name: 'Halyk Bank · Валютный',  number: 'KZ•••2207', currency: 'USD', balance: 42_180,   change: -0.4, primary: false },
  { name: 'Касса · наличные',       number: 'Башня А',   currency: 'KZT', balance: 286_000,  change: 0,    primary: false },
]

const taxCalendar = [
  { code: 'НДС', name: 'Декларация по НДС (ф. 300.00)',     deadline: '15.06.2026', progress: 65, status: 'in_progress' },
  { code: 'КПН', name: 'Авансовые платежи КПН',             deadline: '25.05.2026', progress: 100, status: 'ready' },
  { code: 'ИПН', name: 'ИПН + соц. отчисления (ф. 200.00)', deadline: '15.06.2026', progress: 40, status: 'in_progress' },
  { code: 'СН',  name: 'Социальный налог',                   deadline: '25.06.2026', progress: 15, status: 'todo' },
  { code: 'ОПВ', name: 'Обязательные пенс. взносы',         deadline: '15.06.2026', progress: 80, status: 'in_progress' },
]

const budgetVsActual = [
  { item: 'ФОТ',                   plan: 3_000_000, fact: 2_800_000, color: '#15824F' },
  { item: 'Коммунальные платежи',  plan: 1_600_000, fact: 1_650_000, color: '#1E6FE0' },
  { item: 'Охрана',                plan: 1_200_000, fact: 1_200_000, color: '#D89614' },
  { item: 'Клининг',               plan: 800_000,   fact: 867_000,   color: '#3FBC7E' },
  { item: 'Тех. обслуживание',     plan: 600_000,   fact: 740_000,   color: '#E25822' },
  { item: 'Канцелярия / прочее',   plan: 300_000,   fact: 210_000,   color: '#6C7570' },
]

const recentTransactions = [
  { id: 1, dir: 'in',  date: '24.05', counter: 'ТОО Альянс-Trade',  desc: 'Аренда · май',           amount: 3_230_000, status: 'done' },
  { id: 2, dir: 'out', date: '24.05', counter: 'АО Казахтелеком',   desc: 'Связь и интернет',       amount: 92_400,    status: 'done' },
  { id: 3, dir: 'in',  date: '23.05', counter: 'ТОО Vertex Group',  desc: 'Аренда · май',           amount: 4_590_000, status: 'done' },
  { id: 4, dir: 'out', date: '23.05', counter: 'АлматыЭнерго',      desc: 'Электроэнергия · апр.',  amount: 1_650_000, status: 'pending' },
  { id: 5, dir: 'in',  date: '22.05', counter: 'ТОО TechHub',       desc: 'Аренда · май',           amount: 5_270_000, status: 'done' },
  { id: 6, dir: 'out', date: '22.05', counter: 'ТОО CleanPro',      desc: 'Клининг · 2 нед',        amount: 425_000,   status: 'done' },
  { id: 7, dir: 'in',  date: '21.05', counter: 'АО НефтьСервис',    desc: 'Аренда · май',           amount: 3_910_000, status: 'done' },
  { id: 8, dir: 'out', date: '21.05', counter: 'ТОО SecuryGuard',   desc: 'Охрана · май',           amount: 1_200_000, status: 'pending' },
]

const residentBalances = [
  { name: 'ТОО Альянс-Trade',  balance: 0,         status: 'paid'    },
  { name: 'ТОО DataCom',       balance: -560_000,  status: 'overdue' },
  { name: 'ТОО Vertex Group',  balance: 0,         status: 'paid'    },
  { name: 'АО KazFinance',     balance: -1_220_000, status: 'partial' },
  { name: 'ТОО TechHub',       balance: 0,         status: 'paid'    },
  { name: 'ТОО Логистик Про',  balance: -380_000,  status: 'overdue' },
]

const payroll = {
  nextPayment: '27.05.2026',
  total: 3_280_000,
  employees: 14,
  taxes: 492_000,
  net: 2_788_000,
}

// ── UTILS ────────────────────────────────────────────────────────────────────

function fmt(v: number) {
  return v.toLocaleString('ru-RU').replace(/,/g, ' ')
}

// ── SECTIONS ─────────────────────────────────────────────────────────────────

function AccountingAiInsight() {
  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden flex flex-col md:flex-row md:items-stretch gap-5 mb-6"
      style={{
        background: 'var(--ai-bg)',
        border: '1px solid rgba(63,188,126,0.18)',
        boxShadow: '0 0 0 1px rgba(63,188,126,0.08), 0 4px 24px rgba(10,46,31,0.4)',
      }}
    >
      <div className="flex-1 flex flex-col justify-between gap-3 z-10 min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(63,188,126,0.12)', border: '1px solid rgba(63,188,126,0.2)' }}
          >
            <Sparkles size={12} strokeWidth={1.5} style={{ color: '#3FBC7E' }} />
            <span className="text-[12px] font-semibold" style={{ color: '#3FBC7E', fontFamily: 'var(--font-display)' }}>
              ИИ-аудит расходов
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-[0.06em] uppercase" style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-mono)' }}>
            обновлено сегодня 09:42
          </span>
        </div>

        <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
          Расходы по статье <span className="text-white font-semibold">«Тех. обслуживание»</span> превысили месячный бюджет
          на <span className="text-white font-semibold">+23.3%</span> ({fmt(140_000)} ₸). Рекомендуется запросить детализацию у Тимура Б.
          и согласовать корректировку лимита.
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
            style={{ background: 'rgba(21,130,79,0.35)', border: '1px solid rgba(63,188,126,0.25)', color: '#72D4A6' }}
          >
            <Plus size={11} strokeWidth={1.5} />
            Создать задачу детализации
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)' }}
          >
            <FileText size={11} strokeWidth={1.5} />
            Смотреть детализацию
          </button>
        </div>
      </div>

      <div className="md:shrink-0 grid grid-cols-3 md:flex md:flex-col gap-3 md:w-[200px]">
        {[
          { label: 'Превышение', value: '+140К', color: '#F87171' },
          { label: 'Экономия ФОТ', value: '−200К', color: '#3FBC7E' },
          { label: 'Расхождения', value: '3 шт.', color: '#FBBF24' },
        ].map(m => (
          <div
            key={m.label}
            className="rounded-lg px-3 py-2.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>{m.label}</p>
            <p className="text-[16px] font-bold mt-1" style={{ color: m.color, fontFamily: 'var(--font-mono)' }}>{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ApprovalQueueStats() {
  const urgent = approvalTasks.filter(t => t.priority === 'urgent').length
  const total = approvalTasks.reduce((s, t) => s + t.amount, 0)
  const cards = [
    { label: 'К подтверждению', value: approvalTasks.length, hint: 'операций', tone: 'default' },
    { label: 'Срочно сегодня', value: urgent, hint: 'просрочат сроки', tone: 'danger' },
    { label: 'Сумма в очереди', value: `${(total / 1_000_000).toFixed(2)} млн`, hint: '₸', tone: 'brand' },
    { label: 'Согласовано за май', value: 42, hint: 'операций', tone: 'success' },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl p-4"
          style={{
            background: c.tone === 'danger' ? 'var(--status-danger-bg)'
              : c.tone === 'brand' ? 'var(--dia-green-50)'
              : c.tone === 'success' ? 'var(--status-success-bg)'
              : 'var(--neutral-0)',
            border: '1px solid ' + (c.tone === 'danger' ? '#F5B8BF'
              : c.tone === 'brand' ? 'var(--dia-green-200)'
              : c.tone === 'success' ? 'var(--status-success-main)33'
              : 'var(--neutral-200)'),
          }}
        >
          <p
            className="text-[10px] font-medium uppercase tracking-[0.08em]"
            style={{
              color: c.tone === 'danger' ? 'var(--status-danger-main)'
                : c.tone === 'brand' ? 'var(--dia-green-700)'
                : c.tone === 'success' ? 'var(--status-success-main)'
                : 'var(--neutral-500)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {c.label}
          </p>
          <p
            className="text-[28px] font-bold leading-none mt-2"
            style={{
              color: c.tone === 'danger' ? 'var(--status-danger-main)'
                : c.tone === 'brand' ? 'var(--dia-green-700)'
                : c.tone === 'success' ? 'var(--status-success-main)'
                : 'var(--neutral-900)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {c.value}
          </p>
          <p className="text-[11px] mt-1.5" style={{ color: 'var(--neutral-500)' }}>{c.hint}</p>
        </div>
      ))}
    </div>
  )
}

function ApprovalTasksList() {
  const [expanded, setExpanded] = useState<string | null>(approvalTasks[0].id)
  const [tab, setTab] = useState('all')

  const filtered = tab === 'urgent'
    ? approvalTasks.filter(t => t.priority === 'urgent')
    : tab === 'all' ? approvalTasks
    : approvalTasks.filter(t => t.type === tab)

  return (
    <div className="dia-card overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between flex-wrap gap-3" style={{ borderBottom: '1px solid var(--neutral-200)' }}>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h2 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Задачи на подтверждение бухгалтером
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList style={{ background: 'var(--neutral-100)' }}>
              <TabsTrigger value="all" className="data-[state=active]:bg-white text-[12px]">Все</TabsTrigger>
              <TabsTrigger value="urgent" className="data-[state=active]:bg-white text-[12px]">Срочно</TabsTrigger>
              <TabsTrigger value="expense" className="data-[state=active]:bg-white text-[12px]">Расходы</TabsTrigger>
              <TabsTrigger value="invoice" className="data-[state=active]:bg-white text-[12px]">Счета</TabsTrigger>
              <TabsTrigger value="salary" className="data-[state=active]:bg-white text-[12px]">ФОТ</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div>
        {filtered.map((task, idx) => {
          const meta = typeMeta[task.type]
          const Icon = meta.icon
          const isOpen = expanded === task.id
          return (
            <div
              key={task.id}
              style={{ borderBottom: idx < filtered.length - 1 ? '1px solid var(--neutral-100)' : 'none' }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : task.id)}
                className="w-full flex items-center gap-3 md:gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-[var(--neutral-50)] text-left"
              >
                {/* Type icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: meta.bg }}
                >
                  <Icon size={15} strokeWidth={1.5} style={{ color: meta.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-[10px] font-medium" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                      {task.id}
                    </span>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                      style={{ background: meta.bg, color: meta.color }}
                    >
                      {meta.label}
                    </span>
                    {task.priority === 'urgent' && (
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1"
                        style={{ background: 'var(--status-danger-bg)', color: 'var(--status-danger-main)' }}
                      >
                        <span className="relative flex h-1.5 w-1.5">
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ background: 'var(--status-danger-main)' }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-1.5 w-1.5"
                            style={{ background: 'var(--status-danger-main)' }}
                          />
                        </span>
                        Срочно
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-[14px] truncate" style={{ color: 'var(--neutral-900)' }}>
                    {task.title}
                  </p>
                  <p className="text-[12px] mt-0.5 truncate" style={{ color: 'var(--neutral-500)' }}>
                    {task.counterparty} · {task.doc}
                  </p>
                </div>

                <div className="hidden md:flex flex-col items-end shrink-0">
                  <span className="text-[14px] font-semibold" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-mono)' }}>
                    {fmt(task.amount)} ₸
                  </span>
                  <span
                    className="text-[11px] mt-0.5"
                    style={{ color: task.priority === 'urgent' ? 'var(--status-danger-main)' : 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}
                  >
                    {task.due}
                  </span>
                </div>

                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  style={{
                    color: 'var(--neutral-400)',
                    transform: isOpen ? 'rotate(180deg)' : undefined,
                    transition: 'transform .15s',
                    flexShrink: 0,
                  }}
                />
              </button>

              {/* Expanded details */}
              {isOpen && (
                <div className="px-5 pb-5" style={{ background: 'var(--neutral-50)' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-5 pt-2">
                    <div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Сумма</p>
                          <p className="text-[16px] font-semibold mt-1" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-mono)' }}>
                            {fmt(task.amount)} ₸
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Дата</p>
                          <p className="text-[14px] mt-1" style={{ color: 'var(--neutral-700)', fontFamily: 'var(--font-mono)' }}>{task.date}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Статья</p>
                          <p className="text-[14px] mt-1" style={{ color: 'var(--neutral-700)' }}>{task.category}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Срок</p>
                          <p className="text-[14px] mt-1" style={{ color: task.priority === 'urgent' ? 'var(--status-danger-main)' : 'var(--neutral-700)', fontFamily: 'var(--font-mono)' }}>
                            {task.due}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--neutral-0)', border: '1px solid var(--neutral-200)' }}>
                          <Paperclip size={12} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                          <span className="text-[12px]" style={{ color: 'var(--neutral-700)' }}>{task.doc}.pdf</span>
                          <button>
                            <Eye size={12} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--neutral-0)', border: '1px solid var(--neutral-200)' }}>
                          <MessageCircle size={12} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                          <span className="text-[12px]" style={{ color: 'var(--neutral-700)' }}>{task.comments} комментариев</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[12px]" style={{ color: 'var(--neutral-500)' }}>
                        <span>Инициатор:</span>
                        <Avatar className="w-5 h-5">
                          <AvatarFallback style={{ background: 'var(--dia-green-100)', color: 'var(--dia-green-700)', fontSize: 9 }}>
                            {task.initiator.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span style={{ color: 'var(--neutral-700)' }}>{task.initiator.name}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        className="w-full gap-2 h-10 text-white"
                        style={{ background: 'var(--dia-green-600)', boxShadow: 'var(--shadow-brand)' }}
                      >
                        <Check size={15} strokeWidth={2} />
                        Подтвердить и провести
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full gap-2 h-9"
                        style={{ borderColor: 'var(--neutral-300)' }}
                      >
                        <MessageCircle size={14} strokeWidth={1.5} />
                        Запросить детали
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full gap-2 h-9"
                        style={{ borderColor: '#F5B8BF', color: 'var(--status-danger-main)' }}
                      >
                        <X size={14} strokeWidth={1.5} />
                        Отклонить
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'var(--neutral-50)' }}>
        <span className="text-[12px]" style={{ color: 'var(--neutral-500)' }}>
          Показано {filtered.length} из {approvalTasks.length}
        </span>
        <Button variant="ghost" size="sm" className="h-8 text-[12px]" style={{ color: 'var(--dia-green-600)' }}>
          Показать архив
          <ChevronRight size={12} strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  )
}

function BankAccounts() {
  const total = bankAccounts.reduce((s, a) => s + (a.currency === 'KZT' ? a.balance : a.balance * 470), 0)
  return (
    <div className="dia-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Landmark size={15} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h3 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Остатки по счетам
          </h3>
        </div>
        <button className="text-[11px]" style={{ color: 'var(--dia-green-600)' }}>Обновить</button>
      </div>

      <div className="rounded-xl p-4 mb-3" style={{ background: 'var(--dia-green-50)', border: '1px solid var(--dia-green-200)' }}>
        <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--dia-green-700)', fontFamily: 'var(--font-mono)' }}>Всего на счетах</p>
        <p className="text-[24px] font-bold mt-1.5" style={{ color: 'var(--dia-green-700)', fontFamily: 'var(--font-display)' }}>
          {fmt(Math.round(total))} ₸
        </p>
        <p className="text-[11px] mt-1" style={{ color: 'var(--dia-green-700)', opacity: 0.7 }}>в эквиваленте на 24.05.2026</p>
      </div>

      <div className="space-y-2">
        {bankAccounts.map((acc) => (
          <div
            key={acc.number}
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: acc.primary ? 'var(--dia-green-100)' : 'var(--neutral-100)' }}
            >
              {acc.currency === 'KZT' ? (
                <Banknote size={14} strokeWidth={1.5} style={{ color: acc.primary ? 'var(--dia-green-700)' : 'var(--neutral-600)' }} />
              ) : (
                <Wallet size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-600)' }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium truncate" style={{ color: 'var(--neutral-900)' }}>{acc.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>{acc.number}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[13px] font-semibold" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-mono)' }}>
                {fmt(acc.balance)} {acc.currency === 'KZT' ? '₸' : '$'}
              </p>
              {acc.change !== 0 && (
                <p
                  className="text-[10px] flex items-center justify-end gap-0.5 mt-0.5"
                  style={{ color: acc.change > 0 ? 'var(--status-success-main)' : 'var(--status-danger-main)', fontFamily: 'var(--font-mono)' }}
                >
                  {acc.change > 0 ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {acc.change > 0 ? '+' : ''}{acc.change}%
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="h-9 text-[12px] gap-1.5" style={{ borderColor: 'var(--neutral-300)' }}>
          <ArrowDownToLine size={12} strokeWidth={1.5} />
          Выписка
        </Button>
        <Button size="sm" className="h-9 text-[12px] gap-1.5 text-white" style={{ background: 'var(--dia-green-600)' }}>
          <Send size={12} strokeWidth={1.5} />
          Платёжка
        </Button>
      </div>
    </div>
  )
}

function TaxCalendar() {
  const statusMap: Record<string, { label: string; color: string; bg: string }> = {
    ready: { label: 'Готов', color: 'var(--status-success-main)', bg: 'var(--status-success-bg)' },
    in_progress: { label: 'В работе', color: 'var(--status-warning-main)', bg: 'var(--status-warning-bg)' },
    todo: { label: 'К работе', color: 'var(--neutral-600)', bg: 'var(--neutral-100)' },
  }
  return (
    <div className="dia-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={15} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h3 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Налоговый календарь
          </h3>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--status-danger-bg)', color: 'var(--status-danger-main)', fontFamily: 'var(--font-mono)' }}>
          КПН · 25.05
        </span>
      </div>

      <div className="space-y-3">
        {taxCalendar.map((t) => {
          const s = statusMap[t.status]
          return (
            <div key={t.code} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
                    style={{ background: 'var(--neutral-900)', color: 'white', fontFamily: 'var(--font-mono)' }}
                  >
                    {t.code}
                  </span>
                  <span className="text-[12px] truncate" style={{ color: 'var(--neutral-800)' }}>{t.name}</span>
                </div>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ml-2"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={t.progress} className="h-1.5 flex-1" />
                <span className="text-[10px] w-9 text-right" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>{t.progress}%</span>
                <span className="text-[10px] w-16 text-right" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>{t.deadline}</span>
              </div>
            </div>
          )
        })}
      </div>

      <Button variant="outline" size="sm" className="w-full mt-4 h-9 text-[12px] gap-1.5" style={{ borderColor: 'var(--neutral-300)' }}>
        <Download size={12} strokeWidth={1.5} />
        Сформировать пакет отчётов
      </Button>
    </div>
  )
}

function BudgetVsActual() {
  return (
    <div className="dia-card p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Wallet size={15} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h3 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Бюджет vs Факт · Май 2026
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[10px]" style={{ color: 'var(--neutral-500)' }}>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: 'var(--neutral-200)' }} />
            План
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: 'var(--dia-green-500)' }} />
            Факт
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {budgetVsActual.map((b) => {
          const pct = Math.round((b.fact / b.plan) * 100)
          const isOver = b.fact > b.plan
          const barColor = isOver ? 'var(--status-danger-main)' : pct > 90 ? 'var(--status-warning-main)' : 'var(--status-success-main)'
          return (
            <div key={b.item}>
              <div className="flex items-center justify-between text-[12px] mb-1.5">
                <span style={{ color: 'var(--neutral-700)' }}>{b.item}</span>
                <div className="flex items-center gap-3" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--neutral-900)' }}>{fmt(b.fact)} ₸</span>
                  <span style={{ color: 'var(--neutral-400)' }}>/ {fmt(b.plan)} ₸</span>
                  <span className="font-semibold w-12 text-right" style={{ color: barColor }}>{pct}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden relative" style={{ background: 'var(--neutral-200)' }}>
                <div
                  className="absolute inset-y-0 left-0 transition-all"
                  style={{ width: `${Math.min(pct, 100)}%`, background: barColor }}
                />
                {isOver && (
                  <div
                    className="absolute inset-y-0 transition-all"
                    style={{
                      left: '100%',
                      width: `${pct - 100}%`,
                      background: 'var(--status-danger-main)',
                      opacity: 0.4,
                      transform: 'translateX(-100%)',
                    }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5 pt-4" style={{ borderTop: '1px solid var(--neutral-100)' }}>
        <div>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>План</p>
          <p className="text-[16px] font-semibold mt-1" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-mono)' }}>
            {fmt(budgetVsActual.reduce((s, b) => s + b.plan, 0))} ₸
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Факт</p>
          <p className="text-[16px] font-semibold mt-1" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-mono)' }}>
            {fmt(budgetVsActual.reduce((s, b) => s + b.fact, 0))} ₸
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Отклонение</p>
          <p className="text-[16px] font-semibold mt-1" style={{ color: 'var(--status-warning-main)', fontFamily: 'var(--font-mono)' }}>
            +{fmt(budgetVsActual.reduce((s, b) => s + b.fact, 0) - budgetVsActual.reduce((s, b) => s + b.plan, 0))} ₸
          </p>
        </div>
      </div>
    </div>
  )
}

function PayrollWidget() {
  return (
    <div className="dia-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase size={15} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h3 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Следующая выплата ФОТ
          </h3>
        </div>
      </div>

      <div className="rounded-xl p-4 mb-3" style={{ background: 'var(--neutral-900)', color: 'white' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-wider opacity-60" style={{ fontFamily: 'var(--font-mono)' }}>Аванс · май</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,180,0,0.15)', color: '#FBBF24', fontFamily: 'var(--font-mono)' }}>
            Через 2 дня
          </span>
        </div>
        <p className="text-[26px] font-bold leading-none mt-2" style={{ fontFamily: 'var(--font-display)' }}>
          {fmt(payroll.total)} ₸
        </p>
        <p className="text-[11px] mt-1.5 opacity-60" style={{ fontFamily: 'var(--font-mono)' }}>
          {payroll.employees} сотрудников · к выплате {payroll.nextPayment}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg p-3" style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>К выдаче</p>
          <p className="text-[13px] font-semibold mt-1" style={{ color: 'var(--status-success-main)', fontFamily: 'var(--font-mono)' }}>
            {fmt(payroll.net)} ₸
          </p>
        </div>
        <div className="rounded-lg p-3" style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}>
          <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Налоги</p>
          <p className="text-[13px] font-semibold mt-1" style={{ color: 'var(--neutral-700)', fontFamily: 'var(--font-mono)' }}>
            {fmt(payroll.taxes)} ₸
          </p>
        </div>
      </div>

      <Button className="w-full gap-2 h-9 text-white text-[12px]" style={{ background: 'var(--dia-green-600)' }}>
        <FileSpreadsheet size={13} strokeWidth={1.5} />
        Сформировать ведомость
      </Button>
    </div>
  )
}

function ResidentBalances() {
  const statusStyle: Record<string, { color: string; bg: string; label: string }> = {
    paid:    { color: 'var(--status-success-main)', bg: 'var(--status-success-bg)', label: 'Сверено' },
    overdue: { color: 'var(--status-danger-main)',  bg: 'var(--status-danger-bg)',  label: 'Долг' },
    partial: { color: 'var(--status-warning-main)', bg: 'var(--status-warning-bg)', label: 'Частично' },
  }
  return (
    <div className="dia-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UsersIcon size={15} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h3 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Взаиморасчёты с резидентами
          </h3>
        </div>
        <button className="text-[11px]" style={{ color: 'var(--dia-green-600)' }}>Все →</button>
      </div>

      <div className="space-y-1.5">
        {residentBalances.map((r) => {
          const s = statusStyle[r.status]
          return (
            <div
              key={r.name}
              className="flex items-center justify-between p-2.5 rounded-lg transition-colors hover:bg-[var(--neutral-50)] cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: s.color }}
                />
                <span className="text-[12px] truncate" style={{ color: 'var(--neutral-800)' }}>{r.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-[12px] font-semibold"
                  style={{
                    color: r.balance < 0 ? 'var(--status-danger-main)' : 'var(--status-success-main)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {r.balance === 0 ? '✓' : fmt(r.balance) + ' ₸'}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <Button variant="outline" size="sm" className="w-full mt-4 h-9 text-[12px] gap-1.5" style={{ borderColor: 'var(--neutral-300)' }}>
        <Send size={12} strokeWidth={1.5} />
        Рассылка актов сверки
      </Button>
    </div>
  )
}

function RecentTransactions() {
  return (
    <div className="dia-card overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between flex-wrap gap-3" style={{ borderBottom: '1px solid var(--neutral-200)' }}>
        <div className="flex items-center gap-2">
          <CreditCard size={15} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h3 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Последние операции
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={12} strokeWidth={1.5} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--neutral-400)' }} />
            <Input placeholder="Поиск..." className="pl-7 h-8 w-40 text-[12px]" style={{ borderColor: 'var(--neutral-300)' }} />
          </div>
          <Button variant="outline" size="sm" className="h-8 text-[12px] gap-1.5" style={{ borderColor: 'var(--neutral-300)' }}>
            <Filter size={12} strokeWidth={1.5} />
            Фильтры
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: 'var(--neutral-50)' }}>
              <th className="text-left text-[10px] font-medium uppercase tracking-wider px-5 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Дата</th>
              <th className="text-left text-[10px] font-medium uppercase tracking-wider px-5 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Контрагент</th>
              <th className="text-left text-[10px] font-medium uppercase tracking-wider px-5 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Назначение</th>
              <th className="text-right text-[10px] font-medium uppercase tracking-wider px-5 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Сумма</th>
              <th className="text-right text-[10px] font-medium uppercase tracking-wider px-5 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>Статус</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((t, idx) => (
              <tr
                key={t.id}
                className="transition-colors hover:bg-[var(--neutral-50)] cursor-pointer"
                style={{ borderTop: idx > 0 ? '1px solid var(--neutral-100)' : 'none' }}
              >
                <td className="px-5 py-3 text-[12px]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>{t.date}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: t.dir === 'in' ? 'var(--status-success-bg)' : 'var(--status-warning-bg)' }}
                    >
                      {t.dir === 'in'
                        ? <ArrowDownToLine size={12} strokeWidth={1.5} style={{ color: 'var(--status-success-main)' }} />
                        : <ArrowUpFromLine size={12} strokeWidth={1.5} style={{ color: 'var(--status-warning-main)' }} />}
                    </div>
                    <span className="text-[13px] font-medium" style={{ color: 'var(--neutral-800)' }}>{t.counter}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[12px]" style={{ color: 'var(--neutral-500)' }}>{t.desc}</td>
                <td className="px-5 py-3 text-right text-[13px] font-semibold" style={{ color: t.dir === 'in' ? 'var(--status-success-main)' : 'var(--neutral-900)', fontFamily: 'var(--font-mono)' }}>
                  {t.dir === 'in' ? '+' : '−'}{fmt(t.amount)} ₸
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: t.status === 'done' ? 'var(--status-success-bg)' : 'var(--status-warning-bg)',
                      color: t.status === 'done' ? 'var(--status-success-main)' : 'var(--status-warning-main)',
                    }}
                  >
                    {t.status === 'done' ? 'Проведено' : 'В ожидании'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export function AccountingContent() {
  const totalToApprove = approvalTasks.reduce((s, t) => s + t.amount, 0)
  const urgentCount = approvalTasks.filter(t => t.priority === 'urgent').length

  return (
    <div className="px-4 py-5 md:px-8 md:py-7">
      <PageHeader
        eyebrow="Финансовый контур · Башня А"
        title="Бухгалтерия"
        subtitle="Подтверждение операций, налоговый календарь, контроль бюджета и взаиморасчётов."
        systemNote={`Период · май 2026`}
        meta={[
          { value: approvalTasks.length, label: 'к подтверждению', tone: urgentCount > 0 ? 'danger' : 'default' },
          { value: `${(totalToApprove / 1_000_000).toFixed(2)} млн ₸`, label: 'сумма очереди', tone: 'brand' },
          { value: '18.4 млн ₸', label: 'на счетах' },
          { value: '5', label: 'отчётов в работе', tone: 'warning' },
        ]}
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 h-10 px-3" style={{ borderColor: 'var(--neutral-300)' }}>
              <Download size={14} strokeWidth={1.5} />
              Выгрузка 1С
            </Button>
            <Button style={{ background: 'var(--dia-green-600)', boxShadow: 'var(--shadow-brand)' }} className="text-white gap-2 h-10 px-4">
              <Plus size={16} strokeWidth={1.75} />
              Создать операцию
            </Button>
          </div>
        }
      />

      {/* AI Insight banner */}
      <AccountingAiInsight />

      {/* Top KPI cards */}
      <ApprovalQueueStats />

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 mb-6">
        <div className="space-y-6 min-w-0">
          <ApprovalTasksList />
          <BudgetVsActual />
          <RecentTransactions />
        </div>
        <div className="space-y-6 min-w-0">
          <BankAccounts />
          <TaxCalendar />
          <PayrollWidget />
          <ResidentBalances />
        </div>
      </div>

      {/* Footer quick actions */}
      <div className="dia-card p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={15} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
            <h3 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
              Быстрые действия бухгалтера
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: Receipt,         label: 'Выставить счёт',     color: '#1E6FE0' },
            { icon: FileText,        label: 'Акт сверки',         color: '#15824F' },
            { icon: ArrowDownToLine, label: 'Импорт выписки',     color: '#D89614' },
            { icon: Briefcase,       label: 'Расчёт ФОТ',         color: '#0E7490' },
            { icon: AlertTriangle,   label: 'Напоминание о долге',color: '#D7263D' },
            { icon: Building2,       label: 'Закрыть период',     color: '#6C3FC5' },
          ].map((a) => {
            const Icon = a.icon
            return (
              <button
                key={a.label}
                className="rounded-xl p-3 flex flex-col items-start gap-2 transition-all hover:shadow-md text-left"
                style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: a.color + '18' }}>
                  <Icon size={16} strokeWidth={1.5} style={{ color: a.color }} />
                </div>
                <span className="text-[12px] font-medium" style={{ color: 'var(--neutral-800)' }}>{a.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
