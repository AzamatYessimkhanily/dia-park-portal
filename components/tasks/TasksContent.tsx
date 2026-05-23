'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  Plus, 
  LayoutList, 
  Kanban, 
  ChevronDown, 
  X,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react'

type Priority = 'critical' | 'high' | 'mid' | 'low'
type Status = 'new' | 'in_progress' | 'waiting' | 'done' | 'closed'
type Category = 'техника' | 'клининг' | 'охрана' | 'финансы' | 'общее' | 'ремонт'

interface Task {
  id: string
  priority: Priority
  category: Category
  description: string
  resident: string
  location: string
  assignee: { name: string; initials: string }
  dueDate: string
  dueStatus: 'overdue' | 'today' | 'upcoming'
  status: Status
  overdueTime?: string
}

const priorityColors: Record<Priority, string> = {
  critical: 'var(--priority-critical)',
  high: 'var(--priority-high)',
  mid: 'var(--priority-mid)',
  low: 'var(--priority-low)',
}

const priorityLabels: Record<Priority, string> = {
  critical: 'Аварийный',
  high: 'Высокий',
  mid: 'Средний',
  low: 'Низкий',
}

const statusConfig: Record<Status, { label: string; bg: string; color: string }> = {
  new: { label: 'Новая', bg: 'var(--status-info-bg)', color: 'var(--status-info-main)' },
  in_progress: { label: 'В работе', bg: 'var(--status-warning-bg)', color: 'var(--status-warning-main)' },
  waiting: { label: 'Ожидание', bg: 'var(--neutral-200)', color: 'var(--neutral-600)' },
  done: { label: 'Выполнено', bg: 'var(--status-success-bg)', color: 'var(--status-success-main)' },
  closed: { label: 'Закрыто', bg: 'var(--status-closed-bg)', color: 'var(--status-closed-main)' },
}

const categoryConfig: Record<Category, { bg: string; color: string }> = {
  техника: { bg: 'var(--status-info-bg)', color: 'var(--status-info-main)' },
  клининг: { bg: 'var(--dia-green-50)', color: 'var(--dia-green-700)' },
  охрана: { bg: '#FDF0E6', color: '#C2410C' },
  финансы: { bg: 'var(--status-warning-bg)', color: 'var(--status-warning-main)' },
  общее: { bg: 'var(--neutral-200)', color: 'var(--neutral-700)' },
  ремонт: { bg: '#F3E8FF', color: '#7C3AED' },
}

const tasks: Task[] = [
  { id: 'DP-1487', priority: 'critical', category: 'техника', description: 'Прорыв трубы на 8 этаже, затопление коридора', resident: 'ТОО Альянс-Trade', location: '8 этаж', assignee: { name: 'Тимур Б.', initials: 'ТБ' }, dueDate: '22.05', dueStatus: 'overdue', status: 'in_progress', overdueTime: '2ч 14м' },
  { id: 'DP-1486', priority: 'high', category: 'клининг', description: 'Срочная уборка переговорной после корпоратива', resident: 'AlemGroup', location: '12 этаж', assignee: { name: 'Гульнара К.', initials: 'ГК' }, dueDate: '22.05', dueStatus: 'today', status: 'new' },
  { id: 'DP-1485', priority: 'critical', category: 'охрана', description: 'Неисправность турникета на главном входе', resident: 'Общая зона', location: '1 этаж', assignee: { name: 'Серик М.', initials: 'СМ' }, dueDate: '22.05', dueStatus: 'overdue', status: 'in_progress', overdueTime: '45м' },
  { id: 'DP-1484', priority: 'mid', category: 'техника', description: 'Замена ламп освещения в паркинге B2', resident: 'Паркинг', location: 'B2', assignee: { name: 'Асхат Н.', initials: 'АН' }, dueDate: '23.05', dueStatus: 'upcoming', status: 'in_progress' },
  { id: 'DP-1483', priority: 'high', category: 'финансы', description: 'Просроченная оплата аренды за апрель', resident: 'ИП Касымов А.Б.', location: '5 этаж', assignee: { name: 'Динара Ж.', initials: 'ДЖ' }, dueDate: '22.05', dueStatus: 'overdue', status: 'waiting', overdueTime: '3д' },
  { id: 'DP-1482', priority: 'low', category: 'клининг', description: 'Плановая уборка холла 3 этажа', resident: 'Общая зона', location: '3 этаж', assignee: { name: 'Айгуль С.', initials: 'АС' }, dueDate: '24.05', dueStatus: 'upcoming', status: 'new' },
  { id: 'DP-1481', priority: 'mid', category: 'ремонт', description: 'Ремонт кондиционера в офисе 701', resident: 'ТОО KazTech Solutions', location: '7 этаж', assignee: { name: 'Тимур Б.', initials: 'ТБ' }, dueDate: '25.05', dueStatus: 'upcoming', status: 'new' },
  { id: 'DP-1480', priority: 'high', category: 'охрана', description: 'Оформление разовых пропусков для конференции', resident: 'AlemGroup', location: '12 этаж', assignee: { name: 'Серик М.', initials: 'СМ' }, dueDate: '22.05', dueStatus: 'today', status: 'in_progress' },
  { id: 'DP-1479', priority: 'low', category: 'общее', description: 'Обновление информационного стенда в лифтовом холле', resident: 'Общая зона', location: '1 этаж', assignee: { name: 'Марат О.', initials: 'МО' }, dueDate: '26.05', dueStatus: 'upcoming', status: 'new' },
  { id: 'DP-1478', priority: 'critical', category: 'техника', description: 'Отключение электричества в блоке C, этажи 9-11', resident: 'Блок C', location: '9-11 этажи', assignee: { name: 'Асхат Н.', initials: 'АН' }, dueDate: '22.05', dueStatus: 'overdue', status: 'in_progress', overdueTime: '1ч 30м' },
  { id: 'DP-1477', priority: 'mid', category: 'клининг', description: 'Мытье окон на фасаде здания (северная сторона)', resident: 'Общая зона', location: 'Фасад', assignee: { name: 'Гульнара К.', initials: 'ГК' }, dueDate: '27.05', dueStatus: 'upcoming', status: 'waiting' },
  { id: 'DP-1476', priority: 'high', category: 'финансы', description: 'Согласование счёта на коммунальные услуги май', resident: 'Все резиденты', location: 'Бухгалтерия', assignee: { name: 'Динара Ж.', initials: 'ДЖ' }, dueDate: '23.05', dueStatus: 'upcoming', status: 'in_progress' },
  { id: 'DP-1475', priority: 'low', category: 'техника', description: 'Профилактика системы вентиляции', resident: 'Общая зона', location: 'Тех. этаж', assignee: { name: 'Тимур Б.', initials: 'ТБ' }, dueDate: '28.05', dueStatus: 'upcoming', status: 'new' },
  { id: 'DP-1474', priority: 'mid', category: 'охрана', description: 'Проверка камер видеонаблюдения на парковке', resident: 'Паркинг', location: 'B1-B3', assignee: { name: 'Серик М.', initials: 'СМ' }, dueDate: '24.05', dueStatus: 'upcoming', status: 'new' },
  { id: 'DP-1473', priority: 'high', category: 'ремонт', description: 'Устранение протечки в санузле офиса 402', resident: 'ТОО СтройИнвест', location: '4 этаж', assignee: { name: 'Асхат Н.', initials: 'АН' }, dueDate: '22.05', dueStatus: 'today', status: 'in_progress' },
  { id: 'DP-1472', priority: 'low', category: 'общее', description: 'Замена табличек с нумерацией офисов 6 этаж', resident: 'Общая зона', location: '6 этаж', assignee: { name: 'Марат О.', initials: 'МО' }, dueDate: '29.05', dueStatus: 'upcoming', status: 'new' },
  { id: 'DP-1471', priority: 'mid', category: 'финансы', description: 'Подготовка актов сверки за Q1 2026', resident: 'Все резиденты', location: 'Бухгалтерия', assignee: { name: 'Динара Ж.', initials: 'ДЖ' }, dueDate: '30.05', dueStatus: 'upcoming', status: 'waiting' },
  { id: 'DP-1470', priority: 'high', category: 'техника', description: 'Ремонт лифта №3 (застревание между этажами)', resident: 'Общая зона', location: 'Лифтовая', assignee: { name: 'Тимур Б.', initials: 'ТБ' }, dueDate: '22.05', dueStatus: 'overdue', status: 'in_progress', overdueTime: '4ч 20м' },
]

const tabs = [
  { id: 'all', label: 'Все', count: 47 },
  { id: 'my', label: 'Мои', count: 12 },
  { id: 'overdue', label: 'Просроченные', count: 8, danger: true },
  { id: 'emergency', label: 'Аварийные', count: 3, pulse: true },
]

const filters = [
  { id: 'category', label: 'Категория' },
  { id: 'priority', label: 'Приоритет' },
  { id: 'status', label: 'Статус' },
  { id: 'assignee', label: 'Исполнитель' },
  { id: 'period', label: 'Период' },
]

export function TasksContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list')
  const [activeFilters, setActiveFilters] = useState<string[]>(['Высокий приоритет', 'Техника'])
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  
  const handleRowClick = (taskId: string) => {
    router.push(`/tasks/${taskId}`)
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 
            className="text-2xl font-semibold tracking-tight" 
            style={{ fontFamily: 'var(--font-display)', color: 'var(--neutral-900)' }}
          >
            Заявки и задачи
          </h1>
          <span 
            className="text-sm px-2 py-0.5 rounded"
            style={{ 
              fontFamily: 'var(--font-mono)', 
              color: 'var(--neutral-600)',
              background: 'var(--neutral-100)',
            }}
          >
            47 активных
          </span>
        </div>
        <button
          onClick={() => router.push('/tasks/new')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ 
            background: 'var(--dia-green-600)', 
            color: 'white',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--dia-green-700)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--dia-green-600)')}
        >
          <Plus size={16} strokeWidth={1.5} />
          Создать заявку
        </button>
      </div>

      {/* Toolbar */}
      <div 
        className="sticky top-16 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-3 border-b"
        style={{ background: 'var(--neutral-50)', borderColor: 'var(--neutral-200)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto -mx-2 px-2 pb-1 lg:pb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors shrink-0 whitespace-nowrap"
                style={{
                  background: activeTab === tab.id ? 'var(--neutral-0)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--neutral-900)' : 'var(--neutral-600)',
                  fontWeight: activeTab === tab.id ? 500 : 400,
                  boxShadow: activeTab === tab.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                {tab.label}
                {tab.pulse && (
                  <span className="relative flex h-2 w-2">
                    <span 
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: 'var(--status-danger-main)' }}
                    />
                    <span 
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: 'var(--status-danger-main)' }}
                    />
                  </span>
                )}
                <span 
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    background: tab.danger ? 'var(--status-danger-bg)' : 'var(--neutral-200)',
                    color: tab.danger ? 'var(--status-danger-main)' : 'var(--neutral-600)',
                  }}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search + Filters */}
          <div className="flex items-center gap-2 flex-1 justify-start lg:justify-center max-w-2xl overflow-x-auto -mx-2 px-2 pb-1 lg:pb-0">
            {/* Search */}
            <div
              className="flex items-center gap-2 px-3 h-8 rounded-lg flex-1 min-w-[140px] max-w-[200px] shrink-0"
              style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-0)' }}
            >
              <Search size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
              <input 
                type="text" 
                placeholder="Поиск..." 
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ color: 'var(--neutral-800)' }}
              />
            </div>

            {/* Filter dropdowns */}
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => {
                  // Add a sample filter chip when clicked
                  const sampleByFilter: Record<string, string> = {
                    category: 'Категория: Техника',
                    priority: 'Высокий приоритет',
                    status: 'В работе',
                    assignee: 'Мои задачи',
                    period: 'Сегодня',
                  }
                  const chip = sampleByFilter[filter.id] ?? filter.label
                  if (!activeFilters.includes(chip)) setActiveFilters([...activeFilters, chip])
                }}
                className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm transition-colors hover:bg-[var(--neutral-100)] shrink-0 whitespace-nowrap"
                style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-0)', color: 'var(--neutral-700)' }}
              >
                {filter.label}
                <ChevronDown size={12} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
              </button>
            ))}
          </div>

          {/* View toggle + Sort */}
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div 
              className="flex items-center rounded-lg p-0.5"
              style={{ background: 'var(--neutral-200)' }}
            >
              <button
                onClick={() => setViewMode('list')}
                className="flex items-center justify-center w-7 h-7 rounded-md transition-colors"
                style={{ 
                  background: viewMode === 'list' ? 'var(--neutral-0)' : 'transparent',
                  color: viewMode === 'list' ? 'var(--neutral-800)' : 'var(--neutral-500)',
                }}
              >
                <LayoutList size={14} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className="flex items-center justify-center w-7 h-7 rounded-md transition-colors"
                style={{ 
                  background: viewMode === 'kanban' ? 'var(--neutral-0)' : 'transparent',
                  color: viewMode === 'kanban' ? 'var(--neutral-800)' : 'var(--neutral-500)',
                }}
              >
                <Kanban size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Sort */}
            <button
              className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm transition-colors hover:bg-[var(--neutral-100)]"
              style={{ border: '1px solid var(--neutral-300)', background: 'var(--neutral-0)', color: 'var(--neutral-700)' }}
            >
              По сроку
              <ChevronDown size={12} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
            </button>
          </div>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs" style={{ color: 'var(--neutral-500)' }}>Фильтры:</span>
            {activeFilters.map(filter => (
              <span
                key={filter}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
                style={{ 
                  background: 'var(--dia-green-50)', 
                  color: 'var(--dia-green-700)',
                }}
              >
                {filter}
                <button 
                  onClick={() => removeFilter(filter)}
                  className="hover:bg-[var(--dia-green-100)] rounded-full p-0.5 transition-colors"
                >
                  <X size={10} strokeWidth={2} />
                </button>
              </span>
            ))}
            <button 
              onClick={() => setActiveFilters([])}
              className="text-xs hover:underline"
              style={{ color: 'var(--neutral-500)' }}
            >
              Сбросить все
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 -mx-6 overflow-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="sticky top-0 z-10">
            <tr style={{ background: 'var(--neutral-100)' }}>
              <th className="text-left text-[11px] font-medium uppercase tracking-wider px-6 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', width: '90px' }}>ID</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-wider px-3 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', width: '40px' }}></th>
              <th className="text-left text-[11px] font-medium uppercase tracking-wider px-3 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', width: '100px' }}>Категория</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-wider px-3 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>Описание</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-wider px-3 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', width: '160px' }}>Резидент</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-wider px-3 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', width: '130px' }}>Ответственный</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-wider px-3 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', width: '110px' }}>Срок</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-wider px-3 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', width: '100px' }}>Статус</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-wider px-3 py-2.5" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const status = statusConfig[task.status]
              const category = categoryConfig[task.category]
              const isHovered = hoveredRow === task.id
              const isOverdue = task.dueStatus === 'overdue'

              return (
                <tr
key={task.id}
  className="relative transition-colors cursor-pointer"
  style={{
  background: isHovered ? 'var(--neutral-50)' : 'var(--neutral-0)',
  borderBottom: '1px solid var(--neutral-200)',
  }}
  onClick={() => handleRowClick(task.id)}
  onMouseEnter={() => setHoveredRow(task.id)}
  onMouseLeave={() => setHoveredRow(null)}
  >
                  {/* Priority stripe */}
                  <td className="relative px-6 py-3">
                    <span 
                      className="absolute left-0 top-0 bottom-0 w-[3px]"
                      style={{ background: priorityColors[task.priority] }}
                    />
                    <span 
                      className="text-[13px]" 
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--neutral-700)' }}
                    >
                      {task.id}
                    </span>
                  </td>

                  {/* Priority dot */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5" title={priorityLabels[task.priority]}>
                      <span 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: priorityColors[task.priority] }}
                      />
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-3 py-3">
                    <span 
                      className="text-xs px-2 py-1 rounded capitalize"
                      style={{ background: category.bg, color: category.color }}
                    >
                      {task.category}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="px-3 py-3">
                    <span 
                      className="text-[13px] line-clamp-1"
                      style={{ color: 'var(--neutral-800)' }}
                    >
                      {task.description}
                    </span>
                  </td>

                  {/* Resident + Location */}
                  <td className="px-3 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] line-clamp-1" style={{ color: 'var(--neutral-800)' }}>
                        {task.resident}
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>
                        {task.location}
                      </span>
                    </div>
                  </td>

                  {/* Assignee */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white shrink-0"
                        style={{ background: 'var(--dia-green-600)' }}
                      >
                        {task.assignee.initials}
                      </span>
                      <span className="text-[13px]" style={{ color: 'var(--neutral-700)' }}>
                        {task.assignee.name}
                      </span>
                    </div>
                  </td>

                  {/* Due date */}
                  <td className="px-3 py-3">
                    {isOverdue ? (
                      <div className="flex items-center gap-1.5">
                        <AlertCircle size={12} strokeWidth={1.5} style={{ color: 'var(--status-danger-main)' }} />
                        <span 
                          className="text-[12px]"
                          style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-danger-main)' }}
                        >
                          -{task.overdueTime}
                        </span>
                      </div>
                    ) : (
                      <span 
                        className="text-[12px]"
                        style={{ 
                          fontFamily: 'var(--font-mono)', 
                          color: task.dueStatus === 'today' ? 'var(--status-warning-main)' : 'var(--neutral-600)',
                        }}
                      >
                        {task.dueDate}
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3">
                    <span 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ background: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 relative">
                    {isHovered ? (
                      <div className="flex items-center gap-1">
                        <button
                          className="text-xs px-2 py-1 rounded transition-colors hover:bg-[var(--dia-green-50)]"
                          style={{ color: 'var(--dia-green-700)' }}
                        >
                          Открыть
                        </button>
                      </div>
                    ) : (
                      <button className="p-1 rounded hover:bg-[var(--neutral-100)] transition-colors">
                        <MoreHorizontal size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-400)' }} />
                      </button>
                    )}
                    {/* Overdue indicator */}
                    {isOverdue && (
                      <span 
                        className="absolute right-0 top-0 bottom-0 w-[2px]"
                        style={{ background: 'var(--status-danger-main)' }}
                      />
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div 
        className="flex items-center justify-between py-4 border-t -mx-6 px-6"
        style={{ borderColor: 'var(--neutral-200)', background: 'var(--neutral-0)' }}
      >
        <span className="text-sm" style={{ color: 'var(--neutral-500)', fontFamily: 'var(--font-mono)' }}>
          Показано 18 из 247
        </span>
        <div className="flex items-center gap-1">
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--neutral-100)]"
            style={{ border: '1px solid var(--neutral-300)' }}
          >
            <ChevronLeft size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
          </button>
          {[1, 2, 3, '...', 14].map((page, i) => (
            <button 
              key={i}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors"
              style={{ 
                background: page === 1 ? 'var(--dia-green-600)' : 'transparent',
                color: page === 1 ? 'white' : 'var(--neutral-600)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {page}
            </button>
          ))}
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--neutral-100)]"
            style={{ border: '1px solid var(--neutral-300)' }}
          >
            <ChevronRight size={14} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
          </button>
        </div>
      </div>
    </div>
  )
}
