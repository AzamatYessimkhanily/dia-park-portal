"use client"

import { useState } from "react"
import {
  Building2,
  Phone,
  Mail,
  MessageSquare,
  Edit3,
  Plus,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  RefreshCw,
  User,
  MapPin,
  Ruler,
  Banknote
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"

const tabs = [
  { id: "overview", label: "Обзор" },
  { id: "contract", label: "Договор" },
  { id: "requests", label: "Заявки", count: 47 },
  { id: "payments", label: "Платежи" },
  { id: "history", label: "История" },
  { id: "documents", label: "Документы" },
]

const recentRequests = [
  { id: "DP-1521", title: "Замена лампы в коридоре", status: "done", date: "18.05" },
  { id: "DP-1498", title: "Не работает кондиционер", status: "progress", date: "15.05" },
  { id: "DP-1472", title: "Уборка после ремонта", status: "done", date: "12.05" },
  { id: "DP-1445", title: "Заявка на пропуск гостя", status: "done", date: "08.05" },
  { id: "DP-1401", title: "Протечка в санузле", status: "done", date: "02.05" },
]

const paymentHistory = [
  { month: "Дек", amount: 3230000, status: "paid" },
  { month: "Янв", amount: 3230000, status: "paid" },
  { month: "Фев", amount: 3230000, status: "paid" },
  { month: "Мар", amount: 3230000, status: "paid" },
  { month: "Апр", amount: 3230000, status: "paid" },
  { month: "Май", amount: 3230000, status: "paid" },
]

const adminNotes = [
  {
    author: "Айгуль Н.",
    date: "10.05.2025",
    text: "Обсудили возможность расширения на соседний офис 1411. Резидент заинтересован, ждёт КП."
  },
  {
    author: "Марат К.",
    date: "28.04.2025",
    text: "Просили усилить Wi-Fi в переговорной. Передал заявку в IT."
  },
  {
    author: "Айгуль Н.",
    date: "14.03.2025",
    text: "Подписан договор аренды на 36 месяцев. Контактное лицо — Сулейменов К.А."
  },
]

export function ResidentDetailContent() {
  const [activeTab, setActiveTab] = useState("overview")

  const statusColors: Record<string, string> = {
    paid: "var(--status-success)",
    late: "var(--status-warning)",
    overdue: "var(--status-danger)",
  }

  return (
    <div className="p-8 space-y-6">
      {/* Hero блок резидента */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-5">
            {/* Логотип-буквица */}
            <div className="w-20 h-20 rounded-xl bg-[var(--brand-600)] flex items-center justify-center flex-shrink-0">
              <span className="font-display text-3xl font-bold text-white">А</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
                ТОО Альянс-Trade
              </h1>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <span className="font-mono text-xs">ИНН 123456789012</span>
                <span className="text-[var(--border-default)]">·</span>
                <span className="font-mono text-xs">Договор №А-2024-0042</span>
                <span className="text-[var(--border-default)]">·</span>
                <span className="font-mono text-xs">Резидент с 14.03.2024</span>
              </div>
              <Badge className="bg-[var(--status-success-bg)] text-[var(--status-success)] border-0 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-success)] mr-1.5" />
                Активный арендатор
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]">
              <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
              Связаться
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]">
              <Plus className="w-4 h-4" strokeWidth={1.5} />
              Создать заявку
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]">
              <Edit3 className="w-4 h-4" strokeWidth={1.5} />
              Редактировать
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border-default)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-[var(--brand-600)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              {tab.label}
              {tab.count && (
                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--neutral-100)] text-[var(--text-tertiary)]">
                  {tab.count}
                </span>
              )}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-600)]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content - Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-5 gap-6">
          {/* Левая колонка - 3 из 5 */}
          <div className="col-span-3 space-y-6">
            {/* Помещение */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-xl p-5">
              <h3 className="font-display font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[var(--brand-600)]" strokeWidth={1.5} />
                Помещение
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-mono mb-0.5">Локация</div>
                      <div className="text-sm text-[var(--text-primary)]">Башня А, 14 этаж, оф. 1402-1410</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Ruler className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-mono mb-0.5">Площадь</div>
                      <div className="text-sm text-[var(--text-primary)]">
                        <span className="font-mono font-medium">380</span> м²
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-mono mb-0.5">Тип</div>
                      <div className="text-sm text-[var(--text-primary)]">Офисное помещение</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Banknote className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-mono mb-0.5">Ставка</div>
                      <div className="text-sm text-[var(--text-primary)]">
                        <span className="font-mono font-medium">8 500</span> ₸/м²/мес
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-[var(--neutral-50)] rounded-lg">
                    <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-mono mb-1">Сумма аренды</div>
                    <div className="font-display text-xl font-semibold text-[var(--text-primary)]">
                      <span className="font-mono">3 230 000</span> ₸
                      <span className="text-sm font-normal text-[var(--text-tertiary)]">/мес</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Контактное лицо */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-xl p-5">
              <h3 className="font-display font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-[var(--brand-600)]" strokeWidth={1.5} />
                Контактное лицо
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--neutral-100)] flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-medium text-[var(--text-secondary)]">СК</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[var(--text-primary)]">Сулейменов Канат Алибекович</div>
                  <div className="text-sm text-[var(--text-secondary)] mb-3">Управляющий партнёр</div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a href="tel:+77017234567" className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--brand-600)] transition-colors">
                      <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="font-mono">+7 701 723-45-67</span>
                    </a>
                    <a href="mailto:k.suleimenov@alyanstrade.kz" className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--brand-600)] transition-colors">
                      <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                      k.suleimenov@alyanstrade.kz
                    </a>
                  </div>
                </div>
                <Button size="sm" className="bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Написать
                </Button>
              </div>
            </div>

            {/* Последние заявки */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--brand-600)]" strokeWidth={1.5} />
                  Последние заявки
                </h3>
                <Button variant="ghost" size="sm" className="text-[var(--brand-600)] hover:bg-[var(--brand-50)] gap-1 h-7 px-2">
                  Все 47
                  <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Button>
              </div>
              <div className="space-y-2">
                {recentRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--hover-bg)] transition-colors cursor-pointer group"
                  >
                    <span className="font-mono text-xs text-[var(--brand-600)] w-16">{req.id}</span>
                    <span className="flex-1 text-sm text-[var(--text-primary)] truncate">{req.title}</span>
                    {req.status === "done" ? (
                      <CheckCircle2 className="w-4 h-4 text-[var(--status-success)]" strokeWidth={1.5} />
                    ) : (
                      <Clock className="w-4 h-4 text-[var(--status-warning)]" strokeWidth={1.5} />
                    )}
                    <span className="font-mono text-xs text-[var(--text-tertiary)]">{req.date}</span>
                    <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка - 2 из 5 */}
          <div className="col-span-2 space-y-6">
            {/* Финансовый статус */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-xl p-5">
              <h3 className="font-display font-semibold text-[var(--text-primary)] mb-4">Финансовый статус</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="var(--neutral-100)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="var(--status-success)"
                      strokeWidth="3"
                      strokeDasharray="97.4"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[var(--status-success)]" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-display font-semibold text-[var(--status-success)]">
                    Оплачено вовремя
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    <span className="font-mono">24/24</span> платежей за 2 года
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[var(--neutral-50)] rounded-lg">
                  <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-mono mb-1">Задолженность</div>
                  <div className="font-mono text-lg font-semibold text-[var(--status-success)]">0 ₸</div>
                </div>
                <div className="p-3 bg-[var(--neutral-50)] rounded-lg">
                  <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-mono mb-1">След. платёж</div>
                  <div className="text-sm text-[var(--text-primary)]">
                    <span className="font-mono font-medium">1 июня</span>
                    <span className="text-[var(--text-tertiary)]"> (12 дней)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* История платежей */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-xl p-5">
              <h3 className="font-display font-semibold text-[var(--text-primary)] mb-4">История платежей</h3>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paymentHistory} barCategoryGap="20%">
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "var(--text-tertiary)", fontFamily: "JetBrains Mono" }}
                    />
                    <YAxis hide />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-[var(--tooltip-bg)] text-[var(--tooltip-text)] px-2.5 py-1.5 rounded-lg text-xs shadow-lg">
                              <div className="font-mono">{(data.amount / 1000000).toFixed(2)} млн ₸</div>
                              <div className="text-[var(--text-tertiary)]">Оплачено в срок</div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {paymentHistory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={statusColors[entry.status]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Срок договора */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-xl p-5">
              <h3 className="font-display font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--brand-600)]" strokeWidth={1.5} />
                Срок договора
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[var(--text-secondary)]">Прогресс</span>
                    <span className="font-mono text-[var(--text-primary)]">14 / 36 мес</span>
                  </div>
                  <Progress value={39} className="h-2 bg-[var(--neutral-100)]" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Истекает</span>
                  <span className="font-mono text-[var(--text-primary)]">14 марта 2027</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[var(--text-secondary)]">Автопродление</span>
                  <Badge className="bg-[var(--status-success-bg)] text-[var(--status-success)] border-0 text-xs">
                    <RefreshCw className="w-3 h-3 mr-1" strokeWidth={1.5} />
                    Включено
                  </Badge>
                </div>
              </div>
            </div>

            {/* Заметки администрации */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-default)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-[var(--text-primary)]">Заметки администрации</h3>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-[var(--brand-600)] hover:bg-[var(--brand-50)]">
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Button>
              </div>
              <div className="space-y-3">
                {adminNotes.map((note, idx) => (
                  <div key={idx} className="p-3 bg-[var(--neutral-50)] rounded-lg">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{note.author}</span>
                      <span className="font-mono text-xs text-[var(--text-tertiary)]">{note.date}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== "overview" && (
        <div className="flex items-center justify-center h-64 bg-[var(--card-bg)] border border-[var(--border-default)] rounded-xl">
          <div className="text-center">
            <div className="text-[var(--text-tertiary)] mb-2">Раздел в разработке</div>
            <div className="text-sm text-[var(--text-tertiary)]">
              Содержимое вкладки «{tabs.find(t => t.id === activeTab)?.label}»
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
