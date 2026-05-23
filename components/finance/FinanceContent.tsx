"use client"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  Download,
  FileSpreadsheet,
  ChevronDown,
  AlertCircle,
  Sparkles,
  Send,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Brush,
  ComposedChart,
  Bar,
} from "recharts"

// KPI Data
const kpiData = [
  {
    label: "Доход за месяц",
    value: "24 800 000",
    delta: "+12.3%",
    deltaLabel: "к апрелю",
    positive: true,
    sparkline: [18, 22, 19, 24, 21, 26, 23, 28, 25, 24, 27, 24.8],
  },
  {
    label: "Расход за месяц",
    value: "7 350 000",
    delta: "+8.1%",
    deltaLabel: "к апрелю",
    positive: false,
    sparkline: [5.8, 6.2, 5.9, 6.5, 6.8, 7.1, 6.9, 7.2, 7.0, 7.1, 7.3, 7.35],
  },
  {
    label: "Чистая прибыль",
    value: "17 450 000",
    delta: "+14.1%",
    deltaLabel: "к апрелю",
    positive: true,
    highlight: true,
    sparkline: [12, 14, 13, 16, 15, 18, 16, 19, 17, 17.5, 17.2, 17.45],
  },
  {
    label: "Задолженность",
    value: "1 920 000",
    delta: "3 контрагента",
    deltaLabel: "",
    positive: null,
    warning: true,
    hasAction: true,
  },
]

// Daily finance data for May
const dailyData = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1
  const baseRent = 650000 + Math.random() * 150000
  const services = 80000 + Math.random() * 40000
  const expenses = -(180000 + Math.random() * 80000)
  return {
    day: `${day}`,
    date: `${day} мая`,
    rent: Math.round(baseRent),
    services: Math.round(services),
    expenses: Math.round(expenses),
    total: Math.round(baseRent + services + expenses),
  }
})

// Debtors data
const debtors = [
  { name: "ТОО \"КазТрансСервис\"", amount: 840000, days: 47, critical: true },
  { name: "ИП Сериков А.М.", amount: 320000, days: 38, critical: true },
  { name: "ТОО \"Алматы Фудс\"", amount: 290000, days: 28, critical: false },
  { name: "ТОО \"Бизнес Центр\"", amount: 250000, days: 15, critical: false },
  { name: "ИП Касымова Г.Е.", amount: 220000, days: 8, critical: false },
]

// Expense structure
const expenseStructure = [
  { name: "ФОТ", value: 2800000, color: "#15824F" },
  { name: "Коммунальные", value: 1650000, color: "#1E6FE0" },
  { name: "Охрана", value: 1200000, color: "#D89614" },
  { name: "Клининг", value: 850000, color: "#3FBC7E" },
  { name: "Техника", value: 550000, color: "#E25822" },
  { name: "Прочее", value: 300000, color: "#6C7570" },
]

// Expected payments
const expectedPayments = [
  { company: "ТОО \"Меридиан\"", amount: 1250000, date: "24 мая", status: "confirmed" },
  { company: "ТОО \"АльфаТрейд\"", amount: 890000, date: "25 мая", status: "confirmed" },
  { company: "ИП Нурланов К.", amount: 420000, date: "26 мая", status: "probable" },
  { company: "ТОО \"ТехноПарк\"", amount: 1100000, date: "27 мая", status: "confirmed" },
  { company: "ТОО \"Стройинвест\"", amount: 650000, date: "28 мая", status: "probable" },
  { company: "ИП Ахметов Б.Т.", amount: 380000, date: "29 мая", status: "pending" },
  { company: "ТОО \"Логистик Плюс\"", amount: 720000, date: "30 мая", status: "probable" },
  { company: "ТОО \"Астана Групп\"", amount: 950000, date: "31 мая", status: "pending" },
]

// Forecast data
const forecastData = [
  { day: "22", value: 18.2 },
  { day: "23", value: 17.8 },
  { day: "24", value: 19.0 },
  { day: "25", value: 18.5 },
  { day: "26", value: 16.2 },
  { day: "27", value: 14.8 },
  { day: "28", value: 12.4 },
  { day: "29", value: 13.6 },
  { day: "30", value: 15.2 },
  { day: "31", value: 17.1 },
  { day: "1 июн", value: 19.8 },
  { day: "2", value: 21.2 },
  { day: "3", value: 20.5 },
  { day: "4", value: 22.1 },
]

function formatMoney(value: number): string {
  return value.toLocaleString("ru-RU").replace(/,/g, " ")
}

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 60
      const y = 20 - ((v - min) / range) * 16
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width="60" height="24" className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#15824F" : "#D7263D"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  positive,
  highlight,
  warning,
  hasAction,
  sparkline,
}: {
  label: string
  value: string
  delta: string
  deltaLabel: string
  positive: boolean | null
  highlight?: boolean
  warning?: boolean
  hasAction?: boolean
  sparkline?: number[]
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        highlight
          ? "bg-[var(--status-success-bg)] border-[var(--dia-green-200)]"
          : warning
            ? "bg-[var(--status-warning-bg)] border-[var(--status-warning-main)]"
            : "bg-[var(--neutral-0)] border-[var(--neutral-300)]"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-[var(--neutral-600)]">{label}</span>
        {sparkline && <MiniSparkline data={sparkline} positive={positive !== false} />}
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span
          className={`font-mono text-2xl font-semibold tracking-tight ${
            warning ? "text-[var(--status-warning-main)]" : positive === false ? "text-[var(--status-danger-main)]" : "text-[var(--neutral-900)]"
          }`}
        >
          {value}
        </span>
        <span className="font-mono text-lg text-[var(--neutral-600)]">₸</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {positive !== null && (
            positive ? (
              <TrendingUp className="w-3.5 h-3.5 text-[var(--dia-green-600)]" strokeWidth={1.5} />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-[var(--status-danger-main)]" strokeWidth={1.5} />
            )
          )}
          {warning && <AlertCircle className="w-3.5 h-3.5 text-[var(--status-warning-main)]" strokeWidth={1.5} />}
          <span
            className={`text-sm font-medium ${
              positive === true
                ? "text-[var(--dia-green-600)]"
                : positive === false
                  ? "text-[var(--status-danger-main)]"
                  : "text-[var(--status-warning-main)]"
            }`}
          >
            {delta}
          </span>
          {deltaLabel && <span className="text-sm text-[var(--neutral-600)]">{deltaLabel}</span>}
        </div>
        {hasAction && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-[var(--status-warning-main)] hover:text-[var(--status-warning-main)] hover:bg-[var(--status-warning-bg)]"
          >
            Подробнее
            <ArrowRight className="w-3 h-3 ml-1" strokeWidth={1.5} />
          </Button>
        )}
      </div>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null
  return (
    <div className="bg-[var(--neutral-900)] text-white rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs text-[var(--neutral-500)] mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-[var(--neutral-500)]">{p.name}:</span>
          <span className="font-mono font-medium">
            {formatMoney(Math.abs(p.value))} ₸
          </span>
        </div>
      ))}
    </div>
  )
}

function PieTooltip({ active, payload }: any) {
  if (!active || !payload?.[0]) return null
  const data = payload[0].payload
  const total = expenseStructure.reduce((sum, e) => sum + e.value, 0)
  const percent = ((data.value / total) * 100).toFixed(1)
  return (
    <div className="bg-[var(--neutral-900)] text-white rounded-lg px-4 py-3 shadow-xl">
      <p className="text-sm font-medium mb-1">{data.name}</p>
      <p className="font-mono text-lg">{formatMoney(data.value)} ₸</p>
      <p className="text-xs text-[var(--neutral-500)]">{percent}% от расходов</p>
    </div>
  )
}

export function FinanceContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("Май 2026")
  const totalExpenses = expenseStructure.reduce((sum, e) => sum + e.value, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-2xl font-semibold text-[var(--neutral-900)] tracking-tight">
            Финансы
          </h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 px-3 border-[var(--neutral-300)] bg-white hover:bg-[var(--neutral-100)]"
                >
                  <Calendar className="w-4 h-4 mr-2 text-[var(--neutral-600)]" strokeWidth={1.5} />
                  <span className="font-mono text-sm">{selectedPeriod}</span>
                  <ChevronDown className="w-4 h-4 ml-2 text-[var(--neutral-600)]" strokeWidth={1.5} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-[var(--neutral-0)] border-[var(--neutral-300)]">
                <DropdownMenuItem onClick={() => setSelectedPeriod("Май 2026")}>
                  Май 2026
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("Апрель 2026")}>
                  Апрель 2026
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("Март 2026")}>
                  Март 2026
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-[var(--neutral-600)]">vs Апрель</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 px-3 border-[var(--neutral-300)] bg-white hover:bg-[var(--neutral-100)]"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2 text-[var(--neutral-600)]" strokeWidth={1.5} />
            <span className="text-sm">Экспорт в Excel</span>
          </Button>
          <Button
            variant="outline"
            className="h-9 px-3 border-[var(--neutral-300)] bg-white hover:bg-[var(--neutral-100)]"
          >
            <Download className="w-4 h-4 mr-2 text-[var(--neutral-600)]" strokeWidth={1.5} />
            <span className="text-sm">Экспорт в PDF</span>
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <KpiCard key={i} {...kpi} />
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl border border-[var(--neutral-300)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-[var(--neutral-900)]">
            Движение средств за {selectedPeriod.toLowerCase()}
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--dia-green-600)]" />
              <span className="text-[var(--neutral-600)]">Аренда</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--dia-green-400)]" />
              <span className="text-[var(--neutral-600)]">Доп. услуги</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--status-danger-main)]" />
              <span className="text-[var(--neutral-600)]">Расходы</span>
            </div>
          </div>
        </div>
        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDF0EE" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6C7570", fontSize: 11, fontFamily: "JetBrains Mono" }}
                interval={2}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6C7570", fontSize: 11, fontFamily: "JetBrains Mono" }}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="rent"
                name="Аренда"
                stackId="1"
                stroke="#15824F"
                fill="#15824F"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="services"
                name="Доп. услуги"
                stackId="1"
                stroke="#3FBC7E"
                fill="#3FBC7E"
                fillOpacity={0.6}
              />
              <Bar
                dataKey="expenses"
                name="Расходы"
                fill="#D7263D"
                fillOpacity={0.7}
                radius={[2, 2, 0, 0]}
              />
              <Brush
                dataKey="day"
                height={24}
                stroke="#DFE3E1"
                fill="#FAFBFA"
                tickFormatter={() => ""}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left Column - 3/5 */}
        <div className="col-span-3 space-y-6">
          {/* Debtors Table */}
          <div className="bg-white rounded-xl border border-[var(--neutral-300)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-[var(--neutral-900)]">
                Дебиторская задолженность
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-[var(--dia-green-600)] hover:text-[var(--dia-green-700)] hover:bg-[var(--dia-green-50)]"
              >
                Все должники
                <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.5} />
              </Button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--neutral-200)]">
                  <th className="text-left text-xs font-medium text-[var(--neutral-600)] uppercase tracking-wider pb-3">
                    Резидент
                  </th>
                  <th className="text-right text-xs font-medium text-[var(--neutral-600)] uppercase tracking-wider pb-3">
                    Сумма
                  </th>
                  <th className="text-right text-xs font-medium text-[var(--neutral-600)] uppercase tracking-wider pb-3">
                    Просрочка
                  </th>
                  <th className="text-right text-xs font-medium text-[var(--neutral-600)] uppercase tracking-wider pb-3">
                    Действие
                  </th>
                </tr>
              </thead>
              <tbody>
                {debtors.map((debtor, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[var(--neutral-200)] last:border-0 ${
                      debtor.critical ? "bg-[var(--status-danger-bg)]/30" : ""
                    }`}
                  >
                    <td className="py-3 text-sm text-[var(--neutral-900)]">{debtor.name}</td>
                    <td className="py-3 text-right">
                      <span className="font-mono text-sm font-medium text-[var(--neutral-900)]">
                        {formatMoney(debtor.amount)} ₸
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`font-mono text-sm ${
                          debtor.critical ? "text-[var(--status-danger-main)] font-medium" : "text-[var(--neutral-600)]"
                        }`}
                      >
                        {debtor.days} дн.
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-[var(--dia-green-600)] hover:text-[var(--dia-green-700)] hover:bg-[var(--dia-green-50)]"
                      >
                        <Send className="w-3 h-3 mr-1" strokeWidth={1.5} />
                        Напомнить
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Expense Structure */}
          <div className="bg-white rounded-xl border border-[var(--neutral-300)] p-6">
            <h2 className="font-display text-lg font-semibold text-[var(--neutral-900)] mb-4">
              Структура расходов
            </h2>
            <div className="flex items-center gap-8">
              <div className="w-[200px] h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseStructure}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      dataKey="value"
                      strokeWidth={2}
                      stroke="#fff"
                    >
                      {expenseStructure.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {expenseStructure.map((expense, i) => {
                  const percent = ((expense.value / totalExpenses) * 100).toFixed(1)
                  return (
                    <div key={i} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: expense.color }}
                        />
                        <span className="text-sm text-[var(--neutral-900)]">{expense.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-[var(--neutral-600)]">{percent}%</span>
                        <span className="font-mono text-sm font-medium text-[var(--neutral-900)] w-28 text-right">
                          {formatMoney(expense.value)} ₸
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 2/5 */}
        <div className="col-span-2 space-y-6">
          {/* Expected Payments */}
          <div className="bg-white rounded-xl border border-[var(--neutral-300)] p-6">
            <h2 className="font-display text-lg font-semibold text-[var(--neutral-900)] mb-4">
              Ожидаемые поступления
            </h2>
            <div className="space-y-2">
              {expectedPayments.map((payment, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-[var(--neutral-200)] last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        payment.status === "confirmed"
                          ? "bg-[var(--dia-green-600)]"
                          : payment.status === "probable"
                            ? "bg-[var(--status-warning-main)]"
                            : "bg-[var(--neutral-600)]"
                      }`}
                    />
                    <span className="text-sm text-[var(--neutral-900)] truncate max-w-[160px]">
                      {payment.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-medium text-[var(--neutral-900)]">
                      {formatMoney(payment.amount)} ₸
                    </span>
                    <span className="font-mono text-xs text-[var(--neutral-600)] w-14 text-right">
                      {payment.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--neutral-300)] flex items-center justify-between">
              <span className="text-sm text-[var(--neutral-600)]">Итого ожидается</span>
              <span className="font-mono text-base font-semibold text-[var(--dia-green-600)]">
                {formatMoney(expectedPayments.reduce((s, p) => s + p.amount, 0))} ₸
              </span>
            </div>
          </div>

          {/* AI Forecast */}
          <div className="bg-gradient-to-br from-[#1A2B1F] to-[#15824F]/90 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[var(--dia-green-400)]" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-white/90">ИИ-прогноз кассового разрыва</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              Прогноз на ближайшие 2 недели:{" "}
              <span className="text-[var(--dia-green-400)] font-medium">риск кассового разрыва отсутствует</span>.
              Минимальный остаток ожидается 28 мая —{" "}
              <span className="font-mono font-medium text-white">12.4M ₸</span>
            </p>
            <div className="h-[100px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3FBC7E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3FBC7E" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "JetBrains Mono" }}
                    interval={2}
                  />
                  <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3FBC7E"
                    strokeWidth={2}
                    fill="url(#forecastGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-white/50">Минимум: 12.4M ₸</span>
              <span className="text-white/50">Прогноз до 4 июня</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
