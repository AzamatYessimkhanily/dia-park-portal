"use client"

import { useState } from "react"
import {
  ChevronRight,
  Edit3,
  UserPlus,
  XCircle,
  Paperclip,
  Send,
  ChevronDown,
  Clock,
  MapPin,
  Building2,
  Calendar,
  User,
  Tag,
  AlertTriangle,
  CheckCircle2,
  Circle,
  ArrowRight,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const checklistItems = [
  { id: 1, text: "Перекрыт стояк горячей воды", done: true, time: "14:35" },
  { id: 2, text: "Откачана вода с пола", done: true, time: "14:52" },
  { id: 3, text: "Заменена прокладка крана", done: false, time: null },
  { id: 4, text: "Проверена герметичность", done: false, time: null },
  { id: 5, text: "Убрано помещение", done: false, time: null },
  { id: 6, text: "Фото после ремонта приложено", done: false, time: null },
]

const materials = [
  { name: 'Прокладка резиновая 1/2"', qty: "2 шт", price: 800 },
  { name: "Лента ФУМ", qty: "1 моток", price: 350 },
]

const comments = [
  {
    id: 1,
    author: "Тимур Бекмамбетов",
    initials: "ТБ",
    time: "14:38",
    text: "Прибыл на место. Перекрываю стояк, ситуация серьёзная — вода уже в коридоре.",
  },
  {
    id: 2,
    author: "Айгуль Сериккызы",
    initials: "АС",
    time: "14:45",
    text: "Тимур, клининг уже в пути. Нужно будет осушить помещение после ремонта.",
  },
  {
    id: 3,
    author: "Тимур Бекмамбетов",
    initials: "ТБ",
    time: "15:10",
    text: "Вода откачана, начинаю замену прокладки. Резьба в хорошем состоянии.",
  },
]

const historyItems = [
  { time: "14:32", text: "Заявка создана", user: "Система" },
  { time: "14:33", text: "Назначен Тимур Б.", user: "Диспетчер" },
  { time: "14:35", text: "Статус → В работе", user: "Тимур Б." },
  { time: "14:52", text: "Чек-лист: 2 пункта", user: "Тимур Б." },
  { time: "15:10", text: "Добавлены материалы", user: "Тимур Б." },
]

const photos = [
  { name: "до_ремонта_1.jpg", color: "bg-sky-100" },
  { name: "до_ремонта_2.jpg", color: "bg-sky-50" },
  { name: "труба_крупно.jpg", color: "bg-amber-50" },
  { name: "стояк_перекрыт.jpg", color: "bg-emerald-50" },
  { name: "пол_затоплен.jpg", color: "bg-red-50" },
  { name: "инструменты.jpg", color: "bg-neutral-100" },
]

export function TaskDetailContent() {
  const [checklist, setChecklist] = useState(checklistItems)
  const [newComment, setNewComment] = useState("")

  const toggleCheck = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  const completedCount = checklist.filter((i) => i.done).length
  const totalCount = checklist.length

  return (
    <div className="min-h-screen bg-[var(--neutral-25)]">
      {/* Header */}
      <div className="bg-[var(--neutral-0)] border-b border-[var(--neutral-200)]">
        <div className="px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--neutral-500)] mb-4">
            <Link href="/tasks" className="hover:text-[var(--neutral-700)] transition-colors">
              Заявки
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-mono text-[var(--neutral-900)]">DP-1487</span>
          </nav>

          {/* Title Row */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-2xl font-semibold text-[var(--neutral-900)] tracking-tight">
                DP-1487
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--status-warning-bg)] text-[var(--status-warning)]">
                В работе
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-[var(--status-danger-bg)] text-[var(--status-danger)]">
                <span className="w-2 h-2 rounded-full bg-[var(--status-danger)]" />
                Аварийный
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit3 className="w-4 h-4" strokeWidth={1.5} />
                Изменить
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <UserPlus className="w-4 h-4" strokeWidth={1.5} />
                Назначить
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-[var(--status-danger)] hover:text-[var(--status-danger)] hover:bg-[var(--status-danger-bg)]">
                <XCircle className="w-4 h-4" strokeWidth={1.5} />
                Закрыть
              </Button>
            </div>
          </div>

          {/* H1 Title */}
          <h1 className="font-display text-xl font-semibold text-[var(--neutral-900)] mb-2 tracking-tight">
            Прорыв трубы в туалетной комнате на 8 этаже
          </h1>

          {/* Meta Row */}
          <div className="flex items-center gap-4 text-sm text-[var(--neutral-500)] font-mono">
            <span>создано 22 мая 14:32</span>
            <span className="w-1 h-1 rounded-full bg-[var(--neutral-300)]" />
            <span>резидент ТОО Альянс-Trade</span>
            <span className="w-1 h-1 rounded-full bg-[var(--neutral-300)]" />
            <span>ответственный Тимур Бекмамбетов</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-10 gap-6">
          {/* Left Column (7/10) */}
          <div className="col-span-7 space-y-6">
            {/* Описание */}
            <section className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] p-6">
              <h2 className="font-display font-semibold text-[var(--neutral-900)] mb-3">
                Описание
              </h2>
              <p className="text-[var(--neutral-700)] leading-relaxed">
                При обходе обнаружен прорыв горячей воды под раковиной в туалетной комнате 
                8 этажа (офис 814). Вода поступает в помещение, требуется немедленный 
                аварийный ремонт. Пол частично затоплен, вода начала просачиваться в коридор. 
                Арендатор офиса 814 (ТОО Альянс-Trade) уведомлён, сотрудники временно 
                перемещены в переговорную.
              </p>
            </section>

            {/* Фото и файлы */}
            <section className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] p-6">
              <h2 className="font-display font-semibold text-[var(--neutral-900)] mb-4">
                Фото и файлы
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className={`${photo.color} rounded-lg aspect-[4/3] flex items-end p-3 cursor-pointer hover:ring-2 hover:ring-[var(--brand-500)] transition-all`}
                  >
                    <span className="font-mono text-xs text-[var(--neutral-600)] bg-[var(--neutral-0)]/80 px-2 py-1 rounded">
                      {photo.name}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-4 gap-2">
                <Plus className="w-4 h-4" strokeWidth={1.5} />
                Добавить файл
              </Button>
            </section>

            {/* Чек-лист выполнения */}
            <section className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-[var(--neutral-900)]">
                  Чек-лист выполнения
                </h2>
                <span className="font-mono text-sm text-[var(--neutral-500)]">
                  {completedCount} / {totalCount}
                </span>
              </div>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <Checkbox
                      checked={item.done}
                      onCheckedChange={() => toggleCheck(item.id)}
                      className="data-[state=checked]:bg-[var(--brand-600)] data-[state=checked]:border-[var(--brand-600)]"
                    />
                    <span
                      className={`flex-1 ${
                        item.done
                          ? "text-[var(--neutral-500)] line-through"
                          : "text-[var(--neutral-800)]"
                      }`}
                    >
                      {item.text}
                    </span>
                    {item.time && (
                      <span className="font-mono text-xs text-[var(--neutral-400)]">
                        {item.time}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </section>

            {/* Использованные материалы */}
            <section className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] p-6">
              <h2 className="font-display font-semibold text-[var(--neutral-900)] mb-4">
                Использованные материалы
              </h2>
              <div className="space-y-2">
                {materials.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-[var(--neutral-100)] last:border-0"
                  >
                    <span className="text-[var(--neutral-700)]">{m.name}</span>
                    <div className="flex items-center gap-6">
                      <span className="text-[var(--neutral-500)]">{m.qty}</span>
                      <span className="font-mono text-[var(--neutral-900)] w-20 text-right">
                        {m.price.toLocaleString("ru-RU")} ₸
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-[var(--neutral-200)]">
                <span className="font-medium text-[var(--neutral-700)]">Итого</span>
                <span className="font-mono font-semibold text-[var(--neutral-900)]">
                  {materials.reduce((sum, m) => sum + m.price, 0).toLocaleString("ru-RU")} ₸
                </span>
              </div>
            </section>

            {/* Комментарии */}
            <section className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] p-6">
              <h2 className="font-display font-semibold text-[var(--neutral-900)] mb-4">
                Комментарии
              </h2>
              <div className="space-y-4 mb-6">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className="bg-[var(--neutral-100)] text-[var(--neutral-600)] text-xs font-medium">
                        {c.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-[var(--neutral-900)]">
                          {c.author}
                        </span>
                        <span className="font-mono text-xs text-[var(--neutral-400)]">
                          {c.time}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--neutral-700)] leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className="bg-[var(--brand-50)] text-[var(--brand-700)] text-xs font-medium">
                    АК
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Написать комментарий..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Paperclip className="w-4 h-4" strokeWidth={1.5} />
                      Прикрепи��ь фото
                    </Button>
                    <Button size="sm" className="gap-2 bg-[var(--brand-600)] hover:bg-[var(--brand-700)]">
                      <Send className="w-4 h-4" strokeWidth={1.5} />
                      Отправить
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (3/10) */}
          <div className="col-span-3 space-y-6">
            {/* Статус */}
            <div className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] p-5">
              <h3 className="font-mono text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-4">
                Статус
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[var(--status-warning-bg)] text-[var(--status-warning)]">
                  В работе
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-[var(--neutral-600)]">Прогресс</span>
                  <span className="font-mono text-[var(--neutral-500)]">
                    Этап {completedCount} из {totalCount}
                  </span>
                </div>
                <Progress
                  value={(completedCount / totalCount) * 100}
                  className="h-2 bg-[var(--neutral-100)]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Изменить статус
                    <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem>Новая</DropdownMenuItem>
                  <DropdownMenuItem>В работе</DropdownMenuItem>
                  <DropdownMenuItem>На проверке</DropdownMenuItem>
                  <DropdownMenuItem>Выполнено</DropdownMenuItem>
                  <DropdownMenuItem>Закрыта</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Параметры */}
            <div className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] p-5">
              <h3 className="font-mono text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-4">
                Параметры
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="font-mono text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">
                    Категория
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[var(--neutral-400)]" strokeWidth={1.5} />
                    <span className="text-sm text-[var(--neutral-800)]">
                      Техника · Сантехника
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">
                    Приоритет
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[var(--status-danger)]" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-[var(--status-danger)]">
                      Аварийный
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">
                    Локация
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--neutral-400)]" strokeWidth={1.5} />
                    <span className="text-sm text-[var(--neutral-800)]">
                      Башня А · 8 этаж · туалет 814
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">
                    Резидент
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[var(--neutral-400)]" strokeWidth={1.5} />
                    <span className="text-sm text-[var(--neutral-800)]">
                      ТОО Альянс-Trade
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">
                    Срок
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--status-danger)]" strokeWidth={1.5} />
                    <span className="text-sm text-[var(--neutral-800)]">
                      22 мая, 16:00
                    </span>
                    <span className="font-mono text-xs text-[var(--status-danger)] font-medium">
                      просрочено 2ч 14м
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">
                    Создано
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--neutral-400)]" strokeWidth={1.5} />
                    <span className="text-sm font-mono text-[var(--neutral-600)]">
                      22 мая, 14:32
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">
                    Назначено
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-[var(--brand-50)] text-[var(--brand-700)] text-xs">
                        ТБ
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[var(--neutral-800)]">
                      Тимур Б.
                    </span>
                    <button className="text-xs text-[var(--brand-600)] hover:underline ml-auto">
                      Переназначить
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* История изменений */}
            <div className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] p-5">
              <h3 className="font-mono text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-4">
                История изменений
              </h3>
              <div className="space-y-3">
                {historyItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-[var(--neutral-300)] mt-1.5" />
                      {idx < historyItems.length - 1 && (
                        <div className="w-px flex-1 bg-[var(--neutral-200)] mt-1" />
                      )}
                    </div>
                    <div className="pb-3">
                      <div className="font-mono text-xs text-[var(--neutral-400)] mb-0.5">
                        {item.time}
                      </div>
                      <div className="text-sm text-[var(--neutral-700)]">
                        {item.text}
                      </div>
                      <div className="text-xs text-[var(--neutral-400)]">
                        {item.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
