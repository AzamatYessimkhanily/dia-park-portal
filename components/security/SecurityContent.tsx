"use client"

import { useState, useEffect } from "react"
import { 
  AlertTriangle, Shield, Users, Camera, CameraOff, Clock, 
  Bell, UserCheck, UserX, Plus, ChevronRight, Eye, 
  Phone, FileText, CheckCircle2, Circle, Image as ImageIcon,
  DoorOpen, DoorClosed, Car, Package, Volume2, Flame,
  Zap, AlertCircle, Info, CheckCircle, User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Incident types with colors
const incidentTypes = {
  emergency: { color: "#D7263D", bg: "rgba(215, 38, 61, 0.15)", icon: AlertTriangle, label: "Экстренное" },
  warning: { color: "#D89614", bg: "rgba(216, 150, 20, 0.15)", icon: AlertCircle, label: "Внимание" },
  normal: { color: "#3FBC7E", bg: "rgba(63, 188, 126, 0.15)", icon: CheckCircle, label: "Норма" },
  info: { color: "#1E6FE0", bg: "rgba(30, 111, 224, 0.15)", icon: Info, label: "Информация" },
}

// Mock incidents data
const incidents = [
  { id: 1, time: "03:42:18", type: "emergency", location: "Паркинг B2", description: "Сработала пожарная сигнализация", icon: Flame },
  { id: 2, time: "03:28:55", type: "warning", location: "Вход главный", description: "Попытка прохода без пропуска", icon: UserX },
  { id: 3, time: "02:57:12", type: "normal", location: "Этаж 8", description: "Проход: Асанов К.М. (ТОО Vertex)", icon: DoorOpen },
  { id: 4, time: "02:41:30", type: "info", location: "Лифт 2", description: "Плановая остановка на ТО", icon: Info },
  { id: 5, time: "02:15:44", type: "normal", location: "Паркинг A1", description: "Выезд: Toyota Camry 789AZB02", icon: Car },
  { id: 6, time: "01:58:22", type: "warning", location: "Этаж 12", description: "Дверь на лестницу открыта >5 мин", icon: DoorClosed },
  { id: 7, time: "01:32:08", type: "normal", location: "Грузовой вход", description: "Доставка: ИП Султанов (4 коробки)", icon: Package },
  { id: 8, time: "01:14:55", type: "info", location: "Периметр", description: "Обход завершён — норма", icon: Shield },
]

// Building floors data
const floors = [
  { floor: 14, name: "Технический", cameras: [true, true], status: "normal", occupancy: 0 },
  { floor: 13, name: "ТОО DataCom", cameras: [true, true, true], status: "normal", occupancy: 2 },
  { floor: 12, name: "ТОО DataCom", cameras: [true, false, true], status: "warning", occupancy: 0 },
  { floor: 11, name: "Vertex Group", cameras: [true, true], status: "normal", occupancy: 1 },
  { floor: 10, name: "Vertex Group", cameras: [true, true, true], status: "normal", occupancy: 3 },
  { floor: 9, name: "KazFinance", cameras: [true, true], status: "normal", occupancy: 0 },
  { floor: 8, name: "KazFinance", cameras: [true, true, true, true], status: "active", occupancy: 4 },
  { floor: 7, name: "Свободно", cameras: [true, true], status: "empty", occupancy: 0 },
  { floor: 6, name: "АО НефтьСервис", cameras: [true, true, true], status: "normal", occupancy: 1 },
  { floor: 5, name: "АО НефтьСервис", cameras: [true, true], status: "normal", occupancy: 0 },
  { floor: 4, name: "TechHub Almaty", cameras: [true, true, true], status: "normal", occupancy: 2 },
  { floor: 3, name: "TechHub Almaty", cameras: [true, true], status: "normal", occupancy: 0 },
  { floor: 2, name: "Ресепшн / Общие", cameras: [true, true, true, true], status: "normal", occupancy: 1 },
  { floor: 1, name: "Лобби / Охрана", cameras: [true, true, true, true, true], status: "active", occupancy: 3 },
]

// Visitors data
const expectedVisitors = [
  { name: "Ермеков Данияр", company: "ИП Ермеков", time: "04:00", host: "TechHub", floor: 4 },
  { name: "Курмангалиев А.", company: "Курьер Kaspi", time: "05:30", host: "Vertex", floor: 10 },
  { name: "Омарова Сауле", company: "Аудит KZ", time: "06:00", host: "KazFinance", floor: 9 },
  { name: "Жунусов Берик", company: "IT Support", time: "07:00", host: "DataCom", floor: 13 },
]

const presentVisitors = [
  { name: "Асанов Кайрат", company: "ТОО Vertex", entryTime: "02:57", floor: 8 },
  { name: "Нурланова Айгуль", company: "DataCom", entryTime: "23:15", floor: 13 },
  { name: "Сериков Марат", company: "Ночная уборка", entryTime: "22:00", floor: "все" },
  { name: "Искаков Тимур", company: "Ночная уборка", entryTime: "22:00", floor: "все" },
  { name: "Касымов Арман", company: "DataCom IT", entryTime: "01:20", floor: 13 },
  { name: "Бекетов Нурлан", company: "КазЭнерго", entryTime: "00:45", floor: 6 },
  { name: "Турсынов Ержан", company: "ТОО НефтьСервис", entryTime: "23:50", floor: 5 },
  { name: "Сагынбаев Д.", company: "Vertex Group", entryTime: "02:10", floor: 10 },
  { name: "Абилов Жандос", company: "TechHub", entryTime: "01:05", floor: 4 },
  { name: "Муратов Алмас", company: "DataCom", entryTime: "00:30", floor: 12 },
  { name: "Есенов Руслан", company: "KazFinance", entryTime: "02:40", floor: 8 },
  { name: "Жумабеков А.", company: "Курьер Glovo", entryTime: "03:15", floor: 1 },
]

const blockedVisitors = [
  { name: "Ибрагимов К.С.", reason: "Просроченный пропуск", since: "18.05.2026" },
  { name: "ТОО СтройМонтаж", reason: "Задолженность", since: "10.05.2026" },
]

// Shift handover checklist
const handoverChecklist = [
  { id: 1, label: "Обход периметра выполнен", checked: true },
  { id: 2, label: "Все камеры проверены", checked: true },
  { id: 3, label: "Журнал инцидентов заполнен", checked: true },
  { id: 4, label: "Ключи пересчитаны", checked: false },
  { id: 5, label: "Техническое помещение закрыто", checked: false },
  { id: 6, label: "Фотофиксация выполнена", checked: false },
]

export function SecurityContent() {
  const [shiftTimer, setShiftTimer] = useState("07:12:47")
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)
  const [handoverNotes, setHandoverNotes] = useState("")
  const [checklist, setChecklist] = useState(handoverChecklist)

  // Simulate timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setShiftTimer(prev => {
        const [h, m, s] = prev.split(":").map(Number)
        let newS = s - 1
        let newM = m
        let newH = h
        if (newS < 0) { newS = 59; newM -= 1 }
        if (newM < 0) { newM = 59; newH -= 1 }
        if (newH < 0) return "00:00:00"
        return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}:${String(newS).padStart(2, "0")}`
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleChecklistItem = (id: number) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const getFloorStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-[var(--dia-green-100)] border-[var(--dia-green-400)]"
      case "warning": return "bg-[var(--status-warning-bg)] border-[var(--status-warning-main)]"
      case "empty": return "bg-[var(--neutral-100)] border-[var(--neutral-200)]"
      default: return "bg-[var(--neutral-100)] border-[var(--neutral-200)]"
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] text-[var(--neutral-900)]">
      {/* Security-specific Header */}
      <header className="sticky top-16 z-10 bg-[var(--neutral-0)] border-b border-[var(--neutral-200)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--dia-green-100)] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[var(--dia-green-600)]" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold tracking-tight">
                  Охрана · Смена 22.05.2026 · 20:00 — 08:00
                </h1>
                <div className="flex items-center gap-2 text-sm text-[var(--neutral-600)]">
                  <span>Дежурный:</span>
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="bg-[var(--dia-green-100)] text-[var(--dia-green-600)] text-[10px]">КА</AvatarFallback>
                  </Avatar>
                  <span className="text-[var(--neutral-700)]">Канат Абдрахманов</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Shift timer */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--neutral-50)] rounded-lg border border-[var(--neutral-200)]">
              <Clock className="w-4 h-4 text-[var(--neutral-500)]" strokeWidth={1.5} />
              <span className="text-sm text-[var(--neutral-600)]">До конца смены:</span>
              <span className="font-mono text-lg text-[var(--dia-green-600)] font-medium tracking-wider">{shiftTimer}</span>
            </div>

            {/* Emergency button */}
            <Button 
              className="bg-[var(--status-danger-main)] hover:bg-[var(--priority-critical)] text-white font-semibold px-6 py-5 text-base gap-2 animate-pulse hover:animate-none"
            >
              <AlertTriangle className="w-5 h-5" strokeWidth={2} />
              Экстренное уведомление
            </Button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="p-6">
        <div className="grid grid-cols-[340px_1fr_320px] gap-6">
          
          {/* Column 1: Incident Log */}
          <div className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--neutral-200)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[var(--dia-green-600)]" strokeWidth={1.5} />
                <h2 className="font-display font-semibold">Журнал инцидентов</h2>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--dia-green-500)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--dia-green-500)]"></span>
                </span>
                <span className="text-xs text-[var(--neutral-500)]">Live</span>
              </div>
            </div>

            <div className="divide-y divide-[var(--neutral-200)] max-h-[calc(100vh-340px)] overflow-y-auto">
              {incidents.map((incident, idx) => {
                const typeConfig = incidentTypes[incident.type as keyof typeof incidentTypes]
                const IconComponent = incident.icon
                return (
                  <div 
                    key={incident.id}
                    className="relative pl-4 pr-3 py-3 hover:bg-[var(--neutral-100)] transition-colors group"
                  >
                    {/* Left border indicator */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-[3px]"
                      style={{ backgroundColor: typeConfig.color }}
                    />
                    
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: typeConfig.bg }}
                      >
                        <IconComponent className="w-4 h-4" style={{ color: typeConfig.color }} strokeWidth={1.5} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-[var(--neutral-500)]">{incident.time}</span>
                          {idx === 0 && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: typeConfig.color }}></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: typeConfig.color }}></span>
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-[var(--neutral-800)] mb-0.5">{incident.description}</p>
                        <p className="text-xs text-[var(--neutral-500)]">{incident.location}</p>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[var(--neutral-500)] hover:text-[var(--neutral-900)] hover:bg-[var(--neutral-100)]">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[var(--neutral-500)] hover:text-[var(--neutral-900)] hover:bg-[var(--neutral-100)]">
                          <FileText className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Column 2: Building Plan */}
          <div className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--neutral-200)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[var(--dia-green-600)]" strokeWidth={1.5} />
                <h2 className="font-display font-semibold">План объекта · DIA Park Tower A</h2>
              </div>
              <div className="flex items-center gap-4 text-xs text-[var(--neutral-500)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--dia-green-500)]"></span>
                  <span>Камера ОК</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--status-danger-main)]"></span>
                  <span>Офлайн</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--status-warning-main)]"></span>
                  <span>Внимание</span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-1.5 max-h-[calc(100vh-340px)] overflow-y-auto">
              {floors.map((floor) => (
                <div
                  key={floor.floor}
                  className={cn(
                    "relative px-4 py-2.5 rounded-lg border transition-all cursor-pointer",
                    getFloorStatusColor(floor.status),
                    hoveredFloor === floor.floor && "ring-1 ring-[var(--dia-green-500)]"
                  )}
                  onMouseEnter={() => setHoveredFloor(floor.floor)}
                  onMouseLeave={() => setHoveredFloor(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-[var(--neutral-700)] w-6">
                        {String(floor.floor).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[var(--neutral-700)]">{floor.name}</span>
                      {floor.status === "active" && (
                        <Badge className="bg-[var(--dia-green-100)] text-[var(--dia-green-600)] border-0 text-[10px] px-1.5 py-0">
                          Активность
                        </Badge>
                      )}
                      {floor.status === "warning" && (
                        <Badge className="bg-[var(--status-warning-bg)] text-[var(--status-warning-main)] border-0 text-[10px] px-1.5 py-0">
                          Внимание
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Occupancy */}
                      {floor.occupancy > 0 && (
                        <div className="flex items-center gap-1 text-xs text-[var(--neutral-500)]">
                          <User className="w-3 h-3" strokeWidth={1.5} />
                          <span>{floor.occupancy}</span>
                        </div>
                      )}

                      {/* Cameras */}
                      <div className="flex items-center gap-1">
                        {floor.cameras.map((isActive, idx) => (
                          <span
                            key={idx}
                            className={cn(
                              "w-2 h-2 rounded-full",
                              isActive ? "bg-[var(--dia-green-500)]" : "bg-[var(--status-danger-main)]"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover tooltip */}
                  {hoveredFloor === floor.floor && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-10 rounded-lg p-3 shadow-xl min-w-[200px]" style={{ background: 'var(--neutral-900)', color: 'var(--neutral-100)', border: '1px solid var(--neutral-700)' }}>
                      <div className="text-sm font-medium mb-2" style={{ color: 'var(--neutral-0)' }}>Этаж {floor.floor}: {floor.name}</div>
                      <div className="space-y-1 text-xs" style={{ color: 'var(--neutral-400)' }}>
                        <div className="flex justify-between">
                          <span>Камеры:</span>
                          <span style={{ color: 'var(--neutral-100)' }}>{floor.cameras.filter(Boolean).length}/{floor.cameras.length} активны</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Присутствует:</span>
                          <span style={{ color: 'var(--neutral-100)' }}>{floor.occupancy} чел.</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Статус:</span>
                          <span className={cn(
                            floor.status === "warning" && "text-[var(--status-warning-main)]",
                            floor.status === "active" && "text-[var(--dia-green-400)]",
                            floor.status === "normal" && "text-[var(--neutral-100)]"
                          )}>
                            {floor.status === "warning" ? "Внимание" : floor.status === "active" ? "Активность" : "Норма"}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-2 h-7 text-xs text-[var(--dia-green-400)] hover:bg-[var(--dia-green-900)]">
                        Открыть камеры
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Visitors */}
          <div className="bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--neutral-200)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--dia-green-600)]" strokeWidth={1.5} />
                <h2 className="font-display font-semibold">Посетители</h2>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-[var(--dia-green-600)] hover:bg-[var(--dia-green-50)] gap-1">
                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                Визит
              </Button>
            </div>

            <div className="max-h-[calc(100vh-340px)] overflow-y-auto">
              {/* Expected */}
              <div className="px-4 py-2 bg-[var(--neutral-50)] border-b border-[var(--neutral-200)]">
                <span className="text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider">Ожидаются · {expectedVisitors.length}</span>
              </div>
              <div className="divide-y divide-[var(--neutral-100)]">
                {expectedVisitors.map((visitor, idx) => (
                  <div key={idx} className="px-4 py-2.5 hover:bg-[var(--neutral-100)] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[var(--neutral-700)]">{visitor.name}</span>
                      <span className="font-mono text-xs text-[var(--neutral-500)]">{visitor.time}</span>
                    </div>
                    <div className="text-xs text-[var(--neutral-500)]">
                      {visitor.company} → {visitor.host}, эт. {visitor.floor}
                    </div>
                  </div>
                ))}
              </div>

              {/* Present */}
              <div className="px-4 py-2 bg-[var(--neutral-50)] border-y border-[var(--neutral-200)]">
                <span className="text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider">В здании · {presentVisitors.length}</span>
              </div>
              <div className="divide-y divide-[var(--neutral-100)]">
                {presentVisitors.slice(0, 8).map((visitor, idx) => (
                  <div key={idx} className="px-4 py-2 hover:bg-[var(--neutral-100)] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--dia-green-500)]"></span>
                        <span className="text-sm text-[var(--neutral-700)]">{visitor.name}</span>
                      </div>
                      <span className="font-mono text-xs text-[var(--neutral-500)]">{visitor.entryTime}</span>
                    </div>
                    <div className="text-xs text-[var(--neutral-500)] ml-3.5">{visitor.company} · эт. {visitor.floor}</div>
                  </div>
                ))}
                {presentVisitors.length > 8 && (
                  <div className="px-4 py-2 text-center">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-[var(--neutral-500)] hover:text-[var(--neutral-900)]">
                      Ещё {presentVisitors.length - 8} посетителей
                    </Button>
                  </div>
                )}
              </div>

              {/* Blocked */}
              <div className="px-4 py-2 bg-[var(--status-danger-bg)] border-y border-[var(--status-danger-main)]">
                <span className="text-xs font-medium text-[var(--status-danger-main)] uppercase tracking-wider">Заблокированы · {blockedVisitors.length}</span>
              </div>
              <div className="divide-y divide-[var(--neutral-100)]">
                {blockedVisitors.map((visitor, idx) => (
                  <div key={idx} className="px-4 py-2.5 hover:bg-[var(--neutral-100)] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <UserX className="w-3.5 h-3.5 text-[var(--status-danger-main)]" strokeWidth={1.5} />
                        <span className="text-sm font-medium text-[var(--neutral-700)]">{visitor.name}</span>
                      </div>
                      <Badge className="bg-[var(--status-danger-bg)] text-[var(--status-danger-main)] border-0 text-[10px]">
                        Блок
                      </Badge>
                    </div>
                    <div className="text-xs text-[var(--neutral-500)] ml-5.5">
                      {visitor.reason} · с {visitor.since}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shift Handover Section */}
        <div className="mt-6 bg-[var(--neutral-0)] rounded-xl border border-[var(--neutral-200)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--neutral-200)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--dia-green-600)]" strokeWidth={1.5} />
              <h2 className="font-display font-semibold">Передача смены</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--neutral-500)]">
              <span>Следующий дежурный:</span>
              <Avatar className="w-5 h-5">
                <AvatarFallback className="bg-[var(--status-info-bg)] text-[var(--status-info-main)] text-[10px]">БА</AvatarFallback>
              </Avatar>
              <span className="text-[var(--neutral-700)]">Бауыржан Алиев</span>
            </div>
          </div>

          <div className="p-4 grid grid-cols-[1fr_300px_200px] gap-6">
            {/* Notes */}
            <div>
              <label className="text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2 block">
                Примечания к смене
              </label>
              <Textarea
                value={handoverNotes}
                onChange={(e) => setHandoverNotes(e.target.value)}
                placeholder="Опишите важные события и замечания для следующей смены..."
                className="bg-[var(--neutral-50)] border-[var(--neutral-200)] text-[var(--neutral-800)] placeholder:text-[var(--neutral-400)] min-h-[100px] resize-none focus:border-[var(--dia-green-500)] focus:ring-[var(--dia-green-100)]"
              />
            </div>

            {/* Checklist */}
            <div>
              <label className="text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2 block">
                Чек-лист ({checklist.filter(i => i.checked).length}/{checklist.length})
              </label>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors",
                      item.checked 
                        ? "bg-[var(--dia-green-50)] border-[var(--dia-green-300)]" 
                        : "bg-[var(--neutral-50)] border-[var(--neutral-200)] hover:border-[var(--dia-green-300)]"
                    )}
                    onClick={() => toggleChecklistItem(item.id)}
                  >
                    <Checkbox 
                      checked={item.checked}
                      className="border-[var(--neutral-200)] data-[state=checked]:bg-[var(--dia-green-600)] data-[state=checked]:border-[var(--dia-green-600)]"
                    />
                    <span className={cn(
                      "text-sm",
                      item.checked ? "text-[var(--neutral-700)]" : "text-[var(--neutral-800)]"
                    )}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo upload */}
            <div>
              <label className="text-xs font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2 block">
                Фотофиксация
              </label>
              <div className="border-2 border-dashed border-[var(--neutral-200)] rounded-lg p-4 text-center hover:border-[var(--dia-green-400)] transition-colors cursor-pointer">
                <ImageIcon className="w-8 h-8 text-[var(--neutral-400)] mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-xs text-[var(--neutral-500)]">Добавить фото</p>
                <p className="text-[10px] text-[var(--neutral-400)] mt-1">JPG, PNG до 5MB</p>
              </div>
              <Button className="w-full mt-3 bg-[var(--dia-green-600)] hover:bg-[var(--dia-green-700)] text-white font-medium">
                Завершить смену
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
