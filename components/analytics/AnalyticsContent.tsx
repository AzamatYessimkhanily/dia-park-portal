"use client"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  Send,
  ChevronRight,
  Clock,
  MessageSquare,
  ArrowUpRight,
  Users,
  Zap,
  Building2,
  Wrench,
  Droplets,
  Wind,
  ShieldAlert,
  Trash2,
  Lightbulb,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
} from "recharts"

// Forecast data
const forecastData = [
  { week: "Нед 18", income: 4200000, expenses: 1800000, forecast: null, forecastLow: null, forecastHigh: null },
  { week: "Нед 19", income: 4350000, expenses: 1950000, forecast: null, forecastLow: null, forecastHigh: null },
  { week: "Нед 20", income: 4100000, expenses: 2100000, forecast: null, forecastLow: null, forecastHigh: null },
  { week: "Нед 21", income: 4500000, expenses: 1750000, forecast: null, forecastLow: null, forecastHigh: null },
  { week: "Нед 22", income: 4280000, expenses: 1920000, forecast: 4280000, forecastLow: 4100000, forecastHigh: 4460000 },
  { week: "Нед 23", income: null, expenses: null, forecast: 4450000, forecastLow: 4150000, forecastHigh: 4750000 },
  { week: "Нед 24", income: null, expenses: null, forecast: 4620000, forecastLow: 4200000, forecastHigh: 5040000 },
  { week: "Нед 25", income: null, expenses: null, forecast: 4580000, forecastLow: 4080000, forecastHigh: 5080000 },
]

// Problem categories data
const problemsData = [
  { category: "Кондиционирование", count: 34, priority: "high", trend: "+12" },
  { category: "Электрика", count: 28, priority: "critical", trend: "+5" },
  { category: "Сантехника", count: 24, priority: "mid", trend: "-3" },
  { category: "Уборка помещений", count: 19, priority: "low", trend: "+2" },
  { category: "Охрана/доступ", count: 15, priority: "mid", trend: "0" },
  { category: "Лифты", count: 12, priority: "high", trend: "+8" },
  { category: "Парковка", count: 9, priority: "low", trend: "-1" },
  { category: "Интернет/связь", count: 7, priority: "mid", trend: "+3" },
]

const priorityColors: Record<string, string> = {
  low: "#3FBC7E",
  mid: "#D89614",
  high: "#E25822",
  critical: "#B3001E",
}

// Staff workload data
const staffData = [
  { name: "Асхат Нурланов", role: "Техник", tasks: 18, load: 95, avatar: "АН" },
  { name: "Бауыржан Сериков", role: "Техник", tasks: 16, load: 88, avatar: "БС" },
  { name: "Гульнара Омарова", role: "Клининг", tasks: 12, load: 65, avatar: "ГО" },
  { name: "Дамир Касымов", role: "Охрана", tasks: 8, load: 52, avatar: "ДК" },
  { name: "Ержан Алиев", role: "Администратор", tasks: 14, load: 72, avatar: "ЕА" },
]

// Chat history
const chatHistory = [
  { question: "Какие расходы выросли за май?", time: "вчера, 16:42" },
  { question: "Покажи топ должников", time: "20 мая, 11:15" },
  { question: "Сравни загрузку техников за квартал", time: "18 мая, 09:33" },
]

const suggestionChips = [
  "Какие расходы выросли за месяц?",
  "Кто чаще просрочивает оплату?",
  "Какие заявки повторяются?",
  "Прогноз доходов на июнь",
]

export function AnalyticsContent() {
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A2E1F 0%, #136A41 50%, #15824F 100%)",
        }}
      >
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative brand mark */}
        <img
          src="/dia-holding.png"
          alt=""
          aria-hidden="true"
          className="absolute -right-8 -top-8 w-[280px] h-[280px] select-none pointer-events-none"
          style={{ opacity: 0.08, filter: 'brightness(2) saturate(0.5)' }}
        />
        
        <div className="relative px-8 py-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <h1 className="font-display text-3xl font-semibold text-white tracking-tight">
                  ИИ-аналитика
                </h1>
              </div>
              <p className="text-white/60 text-base">
                Еженедельные отчёты, инсайты и рекомендации на основе данных портала
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Обновлено 22 мая 14:32</span>
              </div>
              <div className="font-mono text-xs text-white/30">
                Анализ 2 847 событий
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 border border-white/10">
            <div className="flex items-center gap-3 px-4 py-3">
              <Sparkles className="w-5 h-5 text-white/50" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Спросите у ИИ..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-base"
              />
              <Button 
                size="sm" 
                className="bg-white text-primary hover:bg-white/90 rounded-lg px-4"
              >
                <Send className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Отправить
              </Button>
            </div>
            <div className="flex items-center gap-2 px-4 pb-3 flex-wrap">
              {suggestionChips.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => setInputValue(chip)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        {/* Insights Section */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Lightbulb className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Главные инсайты недели
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Insight Card 1 - Large/Accent */}
            <div className="col-span-1 bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-5 border-b border-border bg-danger/5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-danger" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] font-medium text-danger tracking-widest uppercase">
                    Рост расходов
                  </span>
                </div>
                <div className="font-display text-4xl font-bold text-danger mb-2">
                  +18%
                </div>
                <h3 className="font-medium text-foreground mb-1">
                  Расходы на техобслуживание
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Основная причина — повторяющиеся заявки по системе кондиционирования на 3 этаже
                </p>
              </div>
              <div className="p-4 bg-card flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-warning" strokeWidth={1.5} />
                  <span>Рекомендация: плановая диагностика</span>
                </div>
                <Button size="sm" variant="outline" className="text-xs h-8">
                  Создать задачу
                </Button>
              </div>
            </div>

            {/* Insight Card 2 */}
            <div className="col-span-1 bg-card rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-success" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[10px] font-medium text-success tracking-widest uppercase">
                  Время ответа
                </span>
              </div>
              <div className="font-display text-4xl font-bold text-success mb-2">
                −24%
              </div>
              <h3 className="font-medium text-foreground mb-1">
                Среднее время реакции
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Тех. служба стала отвечать на 2.3 часа быстрее по сравнению с прошлой неделей
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Среднее: 1ч 42м → 1ч 18м</span>
                </div>
              </div>
            </div>

            {/* Insight Card 3 */}
            <div className="col-span-1 bg-card rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[10px] font-medium text-warning tracking-widest uppercase">
                  Риск просрочки
                </span>
              </div>
              <div className="font-display text-4xl font-bold text-warning mb-2">
                920 000 ₸
              </div>
              <h3 className="font-medium text-foreground mb-3">
                3 арендатора с риском просрочки
              </h3>
              <div className="space-y-2">
                {[
                  { name: "ТОО «КазТрейд»", amount: "450 000" },
                  { name: "ИП Алиева Д.М.", amount: "280 000" },
                  { name: "ТОО «СтройМастер»", amount: "190 000" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-mono text-foreground">{item.amount} ₸</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Problems & Staff Row */}
        <div className="grid grid-cols-5 gap-6">
          {/* Recurring Problems Chart */}
          <div className="col-span-3 bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Повторяющиеся проблемы
                </h2>
              </div>
              <span className="text-sm text-muted-foreground">За последние 30 дней</span>
            </div>

            <div className="space-y-3">
              {problemsData.map((problem, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                      <span className="text-sm text-foreground">{problem.category}</span>
                    </div>
                    <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden relative">
                      <div 
                        className="h-full rounded-lg transition-all duration-500"
                        style={{ 
                          width: `${(problem.count / 34) * 100}%`,
                          backgroundColor: priorityColors[problem.priority],
                        }}
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        <span className="font-mono text-xs text-foreground">
                          {problem.count}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 text-right">
                      <span className={`font-mono text-xs ${
                        problem.trend.startsWith("+") ? "text-danger" : 
                        problem.trend.startsWith("-") ? "text-success" : "text-muted-foreground"
                      }`}>
                        {problem.trend}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: priorityColors.critical }} />
                <span className="text-xs text-muted-foreground">Критический</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: priorityColors.high }} />
                <span className="text-xs text-muted-foreground">Высокий</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: priorityColors.mid }} />
                <span className="text-xs text-muted-foreground">Средний</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: priorityColors.low }} />
                <span className="text-xs text-muted-foreground">Низкий</span>
              </div>
            </div>
          </div>

          {/* Staff Workload */}
          <div className="col-span-2 bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Загрузка персонала
              </h2>
            </div>

            {/* AI Comment */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-5">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary mt-0.5" strokeWidth={1.5} />
                <p className="text-sm text-foreground leading-relaxed">
                  2 сотрудника технической службы перегружены — рекомендуем перераспределить задачи
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {staffData.map((person, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {person.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground truncate">
                        {person.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {person.tasks} задач
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${person.load}%`,
                          backgroundColor: person.load > 85 ? "#D7263D" : 
                                         person.load > 70 ? "#D89614" : "#15824F",
                        }}
                      />
                    </div>
                  </div>
                  <span className={`font-mono text-xs w-10 text-right ${
                    person.load > 85 ? "text-danger" : 
                    person.load > 70 ? "text-warning" : "text-success"
                  }`}>
                    {person.load}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              <h2 className="font-display text-lg font-semibold text-foreground">
                Прогноз на следующую неделю
              </h2>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Доходы</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <span className="text-muted-foreground">Расходы</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-3 rounded bg-info/20 border border-dashed border-info" />
                <span className="text-muted-foreground">Прогноз (95% CI)</span>
              </div>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15824F" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#15824F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E6FE0" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#1E6FE0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE3E1" vertical={false} />
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6C7570", fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6C7570", fontSize: 12 }}
                  tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1F1C",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 16px",
                  }}
                  labelStyle={{ color: "#FAFBFA", fontWeight: 500, marginBottom: 4 }}
                  itemStyle={{ color: "#A3ABA5" }}
                  formatter={(value: number) => [`${(value / 1000).toLocaleString()} тыс. ₸`, ""]}
                />
                {/* Confidence band */}
                <Area
                  type="monotone"
                  dataKey="forecastHigh"
                  stroke="none"
                  fill="#1E6FE0"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="forecastLow"
                  stroke="none"
                  fill="#FAFBFA"
                  fillOpacity={1}
                />
                {/* Historical income */}
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#15824F"
                  strokeWidth={2}
                  fill="url(#incomeGradient)"
                />
                {/* Expenses line */}
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#D7263D"
                  strokeWidth={2}
                  fill="none"
                  strokeDasharray="4 4"
                />
                {/* Forecast line */}
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stroke="#1E6FE0"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  fill="url(#forecastGradient)"
                />
                <ReferenceLine x="Нед 22" stroke="#6C7570" strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Прогноз доходов (нед 23–25)</div>
              <div className="font-display text-xl font-semibold text-foreground">
                13 650 000 ₸
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Прогноз расходов</div>
              <div className="font-display text-xl font-semibold text-foreground">
                5 420 000 ₸
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Ожидаемая маржа</div>
              <div className="font-display text-xl font-semibold text-success">
                +8 230 000 ₸
              </div>
            </div>
          </div>
        </div>

        {/* Chat History */}
        <div className="bg-[var(--neutral-900)] rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-white/60" strokeWidth={1.5} />
              <h2 className="font-display text-lg font-semibold">
                Чат с ИИ
              </h2>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
            >
              Открыть чат целиком
              <ExternalLink className="w-4 h-4 ml-2" strokeWidth={1.5} />
            </Button>
          </div>

          <div className="space-y-3">
            {chatHistory.map((item, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-white/90">{item.question}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm">{item.time}</span>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
