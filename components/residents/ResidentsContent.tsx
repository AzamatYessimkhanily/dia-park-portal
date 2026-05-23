'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Plus,
  Building2,
  Phone,
  Mail,
  ChevronRight,
  Filter,
  MoreHorizontal,
  MapPin,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PageHeader } from '@/components/dashboard/PageHeader'

const residents = [
  { id: 'alyanstrade', name: 'ТОО Альянс-Trade', contact: 'Бекболат Ермеков', phone: '+7 701 234 5678', email: 'b.ermekov@alyans.kz', space: '12 этаж, оф. 1201–1205', floors: [12], area: 380, rent: 3230000, status: 'active', paymentStatus: 'paid' },
  { id: 'datacom', name: 'ТОО DataCom', contact: 'Динара Омарова', phone: '+7 702 345 6789', email: 'd.omarova@datacom.kz', space: '12–13 этаж', floors: [12, 13], area: 220, rent: 1870000, status: 'active', paymentStatus: 'overdue' },
  { id: 'vertex', name: 'ТОО Vertex Group', contact: 'Асанов К.М.', phone: '+7 707 456 7890', email: 'asanov@vertex.kz', space: '10–11 этаж', floors: [10, 11], area: 540, rent: 4590000, status: 'active', paymentStatus: 'paid' },
  { id: 'kazfinance', name: 'АО KazFinance', contact: 'Сауле Нурланова', phone: '+7 700 567 8901', email: 's.nurlanova@kazfin.kz', space: '8–9 этаж', floors: [8, 9], area: 480, rent: 4080000, status: 'active', paymentStatus: 'partial' },
  { id: 'techhub', name: 'ТОО TechHub Almaty', contact: 'Арман Касымов', phone: '+7 705 678 9012', email: 'kasymov@techhub.kz', space: '3–4 этаж', floors: [3, 4], area: 620, rent: 5270000, status: 'active', paymentStatus: 'paid' },
  { id: 'neftservice', name: 'АО НефтьСервис', contact: 'Марат Жумабаев', phone: '+7 701 789 0123', email: 'm.zhumabaev@neft.kz', space: '5–6 этаж', floors: [5, 6], area: 460, rent: 3910000, status: 'active', paymentStatus: 'paid' },
  { id: 'logistik', name: 'ТОО Логистик Про', contact: 'Айдана Бекова', phone: '+7 702 890 1234', email: 'bekova@logistik.kz', space: '7 этаж', floors: [7], area: 280, rent: 2380000, status: 'active', paymentStatus: 'overdue' },
  { id: 'consulting', name: 'ИП Алиев Консалтинг', contact: 'Ерлан Алиев', phone: '+7 707 901 2345', email: 'aliev@consulting.kz', space: '2 этаж, оф. 203', floors: [2], area: 85, rent: 722500, status: 'active', paymentStatus: 'paid' },
]

const paymentStatusMap: Record<string, { label: string; color: string; bg: string }> = {
  paid: { label: 'Оплачено', color: 'var(--status-success-main)', bg: 'var(--status-success-bg)' },
  overdue: { label: 'Просрочено', color: 'var(--status-danger-main)', bg: 'var(--status-danger-bg)' },
  partial: { label: 'Частично', color: 'var(--status-warning-main)', bg: 'var(--status-warning-bg)' },
}

const residentColors = [
  '#15824F', '#1E6FE0', '#D89614', '#E25822',
  '#6C3FC5', '#3FBC7E', '#D7263D', '#0E7490',
]

// Build floor → resident lookup
function buildFloorMap() {
  const map: Record<number, typeof residents[0] | null> = {}
  for (let f = 1; f <= 14; f++) map[f] = null
  residents.forEach(r => r.floors.forEach(f => { map[f] = r }))
  return map
}

function FloorOccupancyMap() {
  const floorMap = buildFloorMap()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="dia-card p-5 mb-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={15} strokeWidth={1.5} style={{ color: 'var(--dia-green-600)' }} />
          <h2 className="font-semibold text-[14px]" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Схема занятости · Башня А
          </h2>
        </div>
        <div className="flex items-center gap-3 text-[11px]" style={{ color: 'var(--neutral-500)' }}>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: 'var(--dia-green-500)' }} />
            Арендовано
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: 'var(--neutral-200)' }} />
            Свободно
          </span>
        </div>
      </div>

      <div className="flex gap-1.5 flex-col">
        {Array.from({ length: 14 }, (_, i) => 14 - i).map((floorNum) => {
          const resident = floorMap[floorNum]
          const resIdx = resident ? residents.indexOf(resident) : -1
          const color = resIdx >= 0 ? residentColors[resIdx % residentColors.length] : null
          const payment = resident ? paymentStatusMap[resident.paymentStatus] : null
          const isHovered = hovered === floorNum

          return (
            <div
              key={floorNum}
              className="flex items-center gap-3 group cursor-pointer"
              onMouseEnter={() => setHovered(floorNum)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Floor label */}
              <span
                className="text-[10px] w-6 text-right shrink-0 select-none"
                style={{ color: 'var(--neutral-400)', fontFamily: 'var(--font-mono)' }}
              >
                {floorNum}
              </span>

              {/* Bar */}
              <div
                className="flex-1 h-7 rounded-lg flex items-center px-3 transition-all duration-150"
                style={{
                  background: color ? color + (isHovered ? 'ee' : '22') : 'var(--neutral-100)',
                  border: `1px solid ${color ? color + (isHovered ? 'ff' : '44') : 'var(--neutral-200)'}`,
                  boxShadow: isHovered && color ? `0 0 0 2px ${color}22` : 'none',
                }}
              >
                {resident ? (
                  <div className="flex items-center justify-between w-full">
                    <span
                      className="text-[12px] font-medium truncate"
                      style={{ color: isHovered ? color! : 'var(--neutral-700)' }}
                    >
                      {resident.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                        style={{ background: payment!.bg, color: payment!.color }}
                      >
                        {payment!.label}
                      </span>
                      <span className="text-[10px]" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
                        {resident.area} м²
                      </span>
                    </div>
                  </div>
                ) : (
                  floorNum === 1 ? (
                    <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Лобби · Ресепшн · Охрана</span>
                  ) : floorNum === 14 ? (
                    <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Технический этаж</span>
                  ) : (
                    <span className="text-[11px]" style={{ color: 'var(--neutral-400)' }}>Свободно</span>
                  )
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid var(--neutral-100)' }}>
        <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>
          Занято <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--neutral-700)' }}>10</span> из 14 этажей
        </span>
        <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>
          Площадь: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--dia-green-600)' }}>3 065 м²</span>
        </span>
      </div>
    </div>
  )
}

export function ResidentsContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResidents = residents.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.contact.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalArea = residents.reduce((sum, r) => sum + r.area, 0)
  const totalRent = residents.reduce((sum, r) => sum + r.rent, 0)
  const overdueCount = residents.filter(r => r.paymentStatus === 'overdue').length

  return (
    <div className="px-4 py-5 md:px-8 md:py-7">
      <PageHeader
        eyebrow="Арендаторы · Башня А"
        title="Резиденты"
        subtitle="Компании, арендующие площади объекта — контакты, договора и платёжная дисциплина."
        systemNote="Обновлено сегодня"
        meta={[
          { value: residents.length, label: 'компаний' },
          { value: `${totalArea.toLocaleString('ru-RU')} м²`, label: 'занято' },
          { value: `${(totalRent / 1000000).toFixed(1)} млн ₸`, label: 'в месяц', tone: 'brand' },
          { value: overdueCount, label: 'с просрочкой', tone: overdueCount > 0 ? 'danger' : 'default' },
        ]}
        action={
          <Button style={{ background: 'var(--dia-green-600)', boxShadow: 'var(--shadow-brand)' }} className="text-white gap-2 h-10 px-4">
            <Plus size={16} strokeWidth={1.75} />
            Добавить резидента
          </Button>
        }
      />

      {/* Floor Map */}
      <FloorOccupancyMap />

      {/* Search & Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neutral-400)' }} />
          <Input
            placeholder="Поиск по названию или контакту..."
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-300)' }}
          />
        </div>
        <Button variant="outline" className="gap-2 h-10" style={{ borderColor: 'var(--neutral-300)' }}>
          <Filter size={14} strokeWidth={1.5} />
          Фильтры
        </Button>
      </div>

      {/* Residents List */}
      <div className="dia-card overflow-hidden">
        <div className="divide-y" style={{ borderColor: 'var(--neutral-200)' }}>
          {filteredResidents.map((resident) => {
            const status = paymentStatusMap[resident.paymentStatus]
            const color = residentColors[residents.indexOf(resident) % residentColors.length]
            return (
              <div
                key={resident.id}
                onClick={() => router.push(`/residents/${resident.id}`)}
                className="flex items-center gap-4 p-4 cursor-pointer transition-colors hover:bg-[var(--neutral-50)]"
              >
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarFallback style={{ background: color + '22', color: color, fontSize: 14, fontWeight: 600 }}>
                    {resident.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate" style={{ color: 'var(--neutral-900)' }}>{resident.name}</span>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm" style={{ color: 'var(--neutral-500)' }}>
                    <span className="flex items-center gap-1">
                      <Building2 size={12} strokeWidth={1.5} />
                      {resident.space}
                    </span>
                    <span>·</span>
                    <span>{resident.area} м²</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-semibold" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-mono)' }}>
                    {(resident.rent / 1000).toLocaleString('ru-RU')} тыс. ₸
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--neutral-500)' }}>в месяц</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a href={`tel:${resident.phone}`} onClick={e => e.stopPropagation()} className="p-2 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                    <Phone size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                  </a>
                  <a href={`mailto:${resident.email}`} onClick={e => e.stopPropagation()} className="p-2 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                    <Mail size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                  </a>
                  <button onClick={e => e.stopPropagation()} className="p-2 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                    <MoreHorizontal size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
                  </button>
                </div>

                <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
