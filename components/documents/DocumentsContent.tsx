'use client'

import { useState } from 'react'
import { 
  Search,
  Plus,
  FileText,
  Download,
  Eye,
  MoreHorizontal,
  Calendar,
  Clock,
  AlertCircle,
  X,
  Share2,
  Printer,
  Pencil,
  Trash2,
  FileSignature,
  Building2,
  History,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/dashboard/PageHeader'

type DocStatus = 'active' | 'expiring'
type DocType   = 'contract' | 'act' | 'invoice' | 'instruction' | 'regulation' | 'checklist' | 'template'

interface Doc {
  id: number
  name: string
  type: DocType
  category: string
  date: string
  expires: string | null
  size: string
  status: DocStatus
  /** Optional details shown in the side panel. */
  counterparty?: string
  signedBy?: string
  preview?: string
  pages?: number
  history?: { date: string; event: string }[]
}

const documents: Doc[] = [
  { id: 1, name: 'Договор аренды — ТОО Альянс-Trade', type: 'contract', category: 'Договоры', date: '15.01.2024', expires: '15.01.2027', size: '2.4 MB', status: 'active',
    counterparty: 'ТОО Альянс-Trade', signedBy: 'Бекболат Ермеков', pages: 18,
    preview: 'Договор аренды нежилого помещения, заключённый между ТОО «DIA Holding» (Арендодатель) и ТОО «Альянс-Trade» (Арендатор) от 15 января 2024 года. Предмет: офисные помещения 1201–1205 общей площадью 380 м² на 12 этаже бизнес-центра DIA Park. Срок: 36 месяцев. Сумма ежемесячной аренды: 3 230 000 ₸.',
    history: [
      { date: '15.01.2024', event: 'Договор подписан обеими сторонами' },
      { date: '20.01.2024', event: 'Загружен в портал, разнесён в бухгалтерию' },
      { date: '15.05.2026', event: 'Сформирован акт сверки за апрель' },
    ],
  },
  { id: 2, name: 'Договор аренды — ТОО DataCom', type: 'contract', category: 'Договоры', date: '01.03.2024', expires: '01.03.2026', size: '1.8 MB', status: 'expiring',
    counterparty: 'ТОО DataCom', signedBy: 'Динара Омарова', pages: 14,
    preview: 'Договор аренды офисных помещений 1206–1208 (220 м²) на 12 этаже. Срок действия истекает 01.03.2026 — требуется пролонгация или подписание нового договора в ближайшие 30 дней.',
    history: [{ date: '01.03.2024', event: 'Подписан' }, { date: '22.05.2026', event: 'Системное напоминание: до окончания 30 дней' }],
  },
  { id: 3, name: 'Акт выполненных работ №147', type: 'act', category: 'Акты', date: '20.05.2026', expires: null, size: '156 KB', status: 'active',
    counterparty: 'ТОО Сервис-Климат', pages: 2,
    preview: 'Акт выполненных работ по техническому обслуживанию системы кондиционирования за период 01.05.2026 — 20.05.2026. Объём работ: профилактика 24 внутренних блоков, замена фильтров, заправка фреона. Сумма: 580 000 ₸ без НДС.',
  },
  { id: 4, name: 'Счёт на оплату №2026-0542', type: 'invoice', category: 'Счета', date: '18.05.2026', expires: '25.05.2026', size: '89 KB', status: 'active',
    counterparty: 'АО Алматинские электрические сети', pages: 1,
    preview: 'Счёт за электроэнергию за апрель 2026 года. Потреблено 87 540 кВт⋅ч. Сумма к оплате: 4 286 000 ₸.',
  },
  { id: 5, name: 'Инструкция по пожарной безопасности', type: 'instruction', category: 'Инструкции', date: '10.01.2026', expires: '10.01.2027', size: '4.2 MB', status: 'active',
    pages: 36,
    preview: 'Внутренний регламент эвакуации и поведения сотрудников в случае возгорания. Утверждён директором DIA Holding 10.01.2026.',
  },
  { id: 6, name: 'Регламент работы охраны', type: 'regulation', category: 'Регламенты', date: '05.02.2026', expires: null, size: '1.1 MB', status: 'active',
    pages: 12,
    preview: 'Регламент посменной работы службы охраны: пост на главном входе, мобильный обход территории, контроль пропускной системы.',
  },
  { id: 7, name: 'Чек-лист уборки санузлов', type: 'checklist', category: 'Чек-листы', date: '12.03.2026', expires: null, size: '234 KB', status: 'active',
    pages: 2,
    preview: 'Чек-лист ежедневной уборки санитарных узлов. 11 пунктов контроля, требуется фотоотчёт по каждой зоне.',
  },
  { id: 8, name: 'Договор на обслуживание лифтов', type: 'contract', category: 'Договоры', date: '01.06.2025', expires: '01.06.2026', size: '3.1 MB', status: 'expiring',
    counterparty: 'ТОО Otis Kazakhstan', signedBy: 'Аскар Мухамедов', pages: 22,
    preview: 'Сервисное обслуживание 6 лифтов производства Otis. Ежемесячная плановая профилактика + аварийный выезд в течение 2 часов.',
    history: [{ date: '01.06.2025', event: 'Подписан' }],
  },
  { id: 9, name: 'Правила внутреннего распорядка', type: 'regulation', category: 'Регламенты', date: '01.01.2026', expires: null, size: '890 KB', status: 'active',
    pages: 8,
  },
  { id: 10, name: 'Шаблон заявления на пропуск', type: 'template', category: 'Шаблоны', date: '15.04.2026', expires: null, size: '45 KB', status: 'active',
    pages: 1,
  },
]

const categories = ['Все', 'Договоры', 'Акты', 'Счета', 'Инструкции', 'Регламенты', 'Чек-листы', 'Шаблоны']

const typeIcons: Record<DocType, { bg: string; color: string }> = {
  contract:    { bg: 'var(--status-info-bg)',    color: 'var(--status-info-main)' },
  act:         { bg: 'var(--dia-green-50)',      color: 'var(--dia-green-600)' },
  invoice:     { bg: 'var(--status-warning-bg)', color: 'var(--status-warning-main)' },
  instruction: { bg: '#FEF0EC',                  color: 'var(--priority-high)' },
  regulation:  { bg: 'var(--neutral-100)',       color: 'var(--neutral-600)' },
  checklist:   { bg: 'var(--dia-green-50)',      color: 'var(--dia-green-600)' },
  template:    { bg: 'var(--neutral-100)',       color: 'var(--neutral-600)' },
}

export function DocumentsContent() {
  const [activeCategory, setActiveCategory] = useState('Все')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null)

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'Все' || doc.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const expiringCount = documents.filter(d => d.status === 'expiring').length

  return (
    <div className="px-4 py-5 md:px-8 md:py-7">
      <PageHeader
        eyebrow="Документооборот"
        title="Документы"
        subtitle="Договоры, акты, регламенты и шаблоны — единая база с автоматическим контролем сроков."
        systemNote="Архив · obj.A"
        meta={[
          { value: documents.length, label: 'всего' },
          { value: documents.filter(d => d.type === 'contract').length, label: 'договоров' },
          { value: expiringCount, label: 'истекают', tone: expiringCount > 0 ? 'warning' : 'default' },
          { value: documents.filter(d => d.type === 'invoice').length, label: 'счетов и актов' },
        ]}
        action={
          <Button style={{ background: 'var(--dia-green-600)', boxShadow: 'var(--shadow-brand)' }} className="text-white gap-2 h-10 px-4">
            <Plus size={16} strokeWidth={1.75} />
            Загрузить документ
          </Button>
        }
      />

      {/* Warning for expiring */}
      {expiringCount > 0 && (
        <div 
          className="mb-6 p-4 rounded-xl border flex items-start gap-3"
          style={{ background: 'var(--status-warning-bg)', borderColor: 'var(--status-warning-main)' }}
        >
          <AlertCircle size={20} strokeWidth={1.5} style={{ color: 'var(--status-warning-main)', flexShrink: 0, marginTop: 2 }} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm" style={{ color: 'var(--status-warning-main)' }}>
              {expiringCount} {expiringCount === 1 ? 'документ истекает' : 'документа истекают'} в ближайшие 30 дней
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--neutral-600)' }}>
              Рекомендуется обновить договоры заранее
            </div>
          </div>
          <button
            onClick={() => setActiveCategory('Договоры')}
            className="shrink-0 text-xs font-medium px-3 h-8 rounded-lg whitespace-nowrap"
            style={{ background: 'var(--status-warning-main)', color: '#fff' }}
          >
            Показать
          </button>
        </div>
      )}

      {/* Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neutral-400)' }} />
          <Input 
            placeholder="Поиск документов..." 
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-300)' }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          const count = cat === 'Все' ? documents.length : documents.filter(d => d.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-sm transition-colors border flex items-center gap-2"
              style={{
                background: isActive ? 'var(--dia-green-600)' : 'var(--neutral-0)',
                color: isActive ? 'white' : 'var(--neutral-600)',
                borderColor: isActive ? 'var(--dia-green-600)' : 'var(--neutral-300)',
                fontWeight: isActive ? 500 : 400,
              }}
            >
              {cat}
              <span className="text-[10px] font-mono tabular-nums opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {filteredDocs.length === 0 ? (
        <div className="dia-card p-12 text-center">
          <FileText size={36} strokeWidth={1} style={{ color: 'var(--neutral-300)' }} className="mx-auto mb-3" />
          <p className="text-sm" style={{ color: 'var(--neutral-500)' }}>
            Ничего не найдено по запросу <span className="font-medium">«{searchQuery}»</span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => {
            const typeStyle = typeIcons[doc.type]
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="dia-card dia-card-hover p-4 cursor-pointer"
                style={{ borderColor: doc.status === 'expiring' ? 'var(--status-warning-main)' : undefined }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: typeStyle.bg }}
                  >
                    <FileText size={18} strokeWidth={1.5} style={{ color: typeStyle.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate" style={{ color: 'var(--neutral-900)' }}>{doc.name}</div>
                    <div className="flex items-center gap-2 mt-1 text-xs tabular-nums" style={{ color: 'var(--neutral-500)' }}>
                      <span>{doc.category}</span>
                      <span>·</span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{doc.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={e => e.stopPropagation()}
                    className="p-1.5 rounded-lg hover:bg-[var(--neutral-100)] transition-colors shrink-0"
                  >
                    <MoreHorizontal size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
                  <div className="flex items-center gap-3 text-xs tabular-nums" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} strokeWidth={1.5} />
                      {doc.date}
                    </span>
                    {doc.expires && (
                      <span 
                        className="flex items-center gap-1"
                        style={{ color: doc.status === 'expiring' ? 'var(--status-warning-main)' : 'var(--neutral-500)' }}
                      >
                        <Clock size={12} strokeWidth={1.5} />
                        до {doc.expires}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={e => { e.stopPropagation(); setSelectedDoc(doc) }} className="p-1.5 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                      <Eye size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                    </button>
                    <button onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                      <Download size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Detail side panel — fully interactive */}
      {selectedDoc && (
        <DocDetailPanel doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  )
}

// ─── Detail side-panel ─────────────────────────────────────
function DocDetailPanel({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  const typeStyle = typeIcons[doc.type]
  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/40 z-40"
      />
      {/* panel */}
      <aside
        role="dialog"
        aria-label="Документ"
        className="fixed top-0 right-0 bottom-0 w-full sm:w-[520px] z-50 flex flex-col"
        style={{ background: 'var(--neutral-0)', boxShadow: '-12px 0 32px -8px rgba(0,0,0,0.15)' }}
      >
        {/* header */}
        <div className="flex items-center justify-between gap-3 px-5 h-16 border-b shrink-0" style={{ borderColor: 'var(--neutral-200)' }}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: typeStyle.bg }}>
              <FileText size={18} strokeWidth={1.5} style={{ color: typeStyle.color }} />
            </div>
            <div className="min-w-0">
              <div className="text-[15px] font-semibold truncate" style={{ color: 'var(--neutral-900)' }}>{doc.name}</div>
              <div className="text-[11px] mt-0.5 tabular-nums" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                {doc.category} · {doc.size}{doc.pages ? ` · ${doc.pages} стр.` : ''}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--neutral-100)] shrink-0"
            aria-label="Закрыть"
          >
            <X size={18} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto">
          {/* PDF placeholder */}
          <div
            className="m-5 rounded-lg flex flex-col items-center justify-center text-center"
            style={{
              background: 'var(--neutral-100)',
              border: '1px solid var(--neutral-200)',
              minHeight: 220,
            }}
          >
            <FileText size={36} strokeWidth={1} style={{ color: 'var(--neutral-400)' }} />
            <div className="text-sm mt-3" style={{ color: 'var(--neutral-600)' }}>Превью PDF</div>
            <div className="text-xs mt-1 tabular-nums" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
              {doc.size}{doc.pages ? ` · ${doc.pages} стр.` : ''}
            </div>
            <button
              className="mt-4 inline-flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium"
              style={{ background: 'var(--neutral-0)', border: '1px solid var(--neutral-300)', color: 'var(--neutral-800)' }}
            >
              <Eye size={14} strokeWidth={1.5} />
              Открыть в просмотрщике
            </button>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-2 px-5 mb-6">
            {[
              { icon: Download,      label: 'Скачать' },
              { icon: Share2,        label: 'Поделиться' },
              { icon: Printer,       label: 'Печать' },
              { icon: FileSignature, label: 'Подписать' },
            ].map(({ icon: Icon, label }, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg transition-colors hover:bg-[var(--neutral-50)]"
                style={{ border: '1px solid var(--neutral-200)' }}
              >
                <Icon size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-600)' }} />
                <span className="text-[11px]" style={{ color: 'var(--neutral-700)' }}>{label}</span>
              </button>
            ))}
          </div>

          {/* Metadata */}
          <div className="px-5 mb-6">
            <div className="dia-eyebrow mb-3">Свойства</div>
            <dl className="space-y-2 text-sm">
              {doc.counterparty && (
                <div className="flex items-start gap-3">
                  <Building2 size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)', marginTop: 2 }} />
                  <dt className="w-32 shrink-0" style={{ color: 'var(--neutral-500)' }}>Контрагент</dt>
                  <dd className="flex-1" style={{ color: 'var(--neutral-800)' }}>{doc.counterparty}</dd>
                </div>
              )}
              {doc.signedBy && (
                <div className="flex items-start gap-3">
                  <FileSignature size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)', marginTop: 2 }} />
                  <dt className="w-32 shrink-0" style={{ color: 'var(--neutral-500)' }}>Подписант</dt>
                  <dd className="flex-1" style={{ color: 'var(--neutral-800)' }}>{doc.signedBy}</dd>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Calendar size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)', marginTop: 2 }} />
                <dt className="w-32 shrink-0" style={{ color: 'var(--neutral-500)' }}>Дата документа</dt>
                <dd className="flex-1 tabular-nums" style={{ color: 'var(--neutral-800)', fontFamily: 'var(--font-mono)' }}>{doc.date}</dd>
              </div>
              {doc.expires && (
                <div className="flex items-start gap-3">
                  <Clock size={14} strokeWidth={1.5} style={{ color: doc.status === 'expiring' ? 'var(--status-warning-main)' : 'var(--neutral-500)', marginTop: 2 }} />
                  <dt className="w-32 shrink-0" style={{ color: 'var(--neutral-500)' }}>Действует до</dt>
                  <dd className="flex-1 tabular-nums" style={{ color: doc.status === 'expiring' ? 'var(--status-warning-main)' : 'var(--neutral-800)', fontFamily: 'var(--font-mono)', fontWeight: doc.status === 'expiring' ? 600 : 400 }}>
                    {doc.expires}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Preview text */}
          {doc.preview && (
            <div className="px-5 mb-6">
              <div className="dia-eyebrow mb-3">Описание</div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
                {doc.preview}
              </p>
            </div>
          )}

          {/* History */}
          {doc.history && doc.history.length > 0 && (
            <div className="px-5 mb-6">
              <div className="dia-eyebrow mb-3 flex items-center gap-2">
                <History size={11} strokeWidth={1.5} />
                История
              </div>
              <ol className="space-y-3">
                {doc.history.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--dia-green-500)' }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm" style={{ color: 'var(--neutral-800)' }}>{h.event}</div>
                      <div className="text-[11px] mt-0.5 tabular-nums" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>{h.date}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t flex items-center gap-2" style={{ borderColor: 'var(--neutral-200)' }}>
          <Button variant="outline" className="gap-2 flex-1" style={{ borderColor: 'var(--neutral-300)' }}>
            <Pencil size={14} strokeWidth={1.5} />
            Редактировать
          </Button>
          <Button variant="ghost" className="gap-2" style={{ color: 'var(--status-danger-main)' }}>
            <Trash2 size={14} strokeWidth={1.5} />
            Удалить
          </Button>
        </div>
      </aside>
    </>
  )
}
