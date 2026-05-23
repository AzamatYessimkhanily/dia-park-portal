"use client"

import { useState } from "react"
import { 
  Search, Hash, MessageSquare, ChevronDown, ChevronRight,
  Paperclip, Smile, AtSign, Bold, Send, ExternalLink,
  MoreHorizontal, Pin, FileText, Image as ImageIcon,
  ArrowRight, Reply, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Types
interface Message {
  id: string
  author: string
  authorInitials: string
  time: string
  content: string
  isOwn?: boolean
  isSystem?: boolean
  image?: string
  replyTo?: { author: string; content: string }
  canCreateTask?: boolean
}

// Data
const chatSections = [
  {
    title: "ОБЪЕКТ",
    channels: [
      { id: "general", name: "общий-чат", type: "channel" as const },
      { id: "announcements", name: "объявления", type: "channel" as const },
    ]
  },
  {
    title: "ОТДЕЛЫ",
    channels: [
      { id: "tech", name: "тех-служба", type: "channel" as const },
      { id: "cleaning", name: "клининг", type: "channel" as const, unread: 3 },
      { id: "security", name: "охрана", type: "channel" as const },
      { id: "admin", name: "администрация", type: "channel" as const },
    ]
  },
  {
    title: "ПО ЗАЯВКАМ",
    channels: [
      { id: "dp-1487", name: "DP-1487", type: "task" as const },
      { id: "dp-1485", name: "DP-1485", type: "task" as const },
      { id: "dp-1482", name: "DP-1482", type: "task" as const },
    ]
  },
  {
    title: "ПРЯМЫЕ",
    channels: [
      { id: "timur", name: "Тимур Бекмамбетов", type: "direct" as const, avatar: "ТБ" },
      { id: "aigerim", name: "Айгерим Сулейменова", type: "direct" as const, avatar: "АС", online: true },
      { id: "daniyar", name: "Данияр Касымов", type: "direct" as const, avatar: "ДК" },
    ]
  }
]

const messages: Message[] = [
  { id: "1", author: "Система", authorInitials: "С", time: "09:12", content: "Заявка DP-1487 создана", isSystem: true },
  { id: "2", author: "Марат Алиев", authorInitials: "МА", time: "09:14", content: "Резидент сообщил о прорыве трубы в туалете на 8 этаже. Вода течёт в коридор." },
  { id: "3", author: "Тимур Бекмамбетов", authorInitials: "ТБ", time: "09:16", content: "Принял. Выезжаю на объект. Кто-то перекрыл воду?" },
  { id: "4", author: "Марат Алиев", authorInitials: "МА", time: "09:17", content: "Охрана пытается найти вентиль. @Ерлан Токаев можешь помочь?" },
  { id: "5", author: "Ерлан Токаев", authorInitials: "ЕТ", time: "09:19", content: "Уже на месте, перекрываю стояк" },
  { id: "6", author: "Система", authorInitials: "С", time: "09:20", content: "Статус изменён: Новая → В работе", isSystem: true },
  { id: "7", author: "Тимур Бекмамбетов", authorInitials: "ТБ", time: "09:32", content: "На месте. Труба лопнула на стыке — нужна замена участка ~50см. Потребуются материалы." },
  { id: "8", author: "Тимур Бекмамбетов", authorInitials: "ТБ", time: "09:33", content: "", image: "/placeholder-pipe.jpg" },
  { id: "9", author: "Айнур Жумабаева", authorInitials: "АЖ", time: "09:35", content: "Тимур, какие материалы нужны? Составь список для закупки.", isOwn: true },
  { id: "10", author: "Тимур Бекмамбетов", authorInitials: "ТБ", time: "09:38", content: "Труба ПВХ 50мм — 1м, муфты соединительные — 2шт, герметик сантехнический, хомуты", canCreateTask: true },
  { id: "11", author: "Айнур Жумабаева", authorInitials: "АЖ", time: "09:40", content: "Хорошо, оформлю заявку на закупку. Ориентировочно через час материалы будут.", isOwn: true },
  { id: "12", author: "Марат Алиев", authorInitials: "МА", time: "09:42", content: "Клининг нужен будет после ремонта — воды много натекло", replyTo: { author: "Тимур Бекмамбетов", content: "На месте. Труба лопнула..." } },
  { id: "13", author: "Система", authorInitials: "С", time: "09:45", content: "Айнур Жумабаева добавила материалы в заявку", isSystem: true },
  { id: "14", author: "Динара Омарова", authorInitials: "ДО", time: "10:15", content: "Клининг готов выехать как только закончите с трубой. Дайте знать." },
  { id: "15", author: "Тимур Бекмамбетов", authorInitials: "ТБ", time: "11:20", content: "Материалы получил, начинаю ремонт. Закончу примерно через 40 минут." },
  { id: "16", author: "Айнур Жумабаева", authorInitials: "АЖ", time: "11:22", content: "Отлично! Держи в курсе.", isOwn: true },
]

const participants = [
  { name: "Айнур Жумабаева", role: "Администратор", initials: "АЖ", online: true },
  { name: "Тимур Бекмамбетов", role: "Тех. служба", initials: "ТБ", online: true },
  { name: "Марат Алиев", role: "Администратор", initials: "МА", online: false },
  { name: "Ерлан Токаев", role: "Охрана", initials: "ЕТ", online: true },
  { name: "Динара Омарова", role: "Клининг", initials: "ДО", online: false },
]

const attachedFiles = [
  { name: "фото_трубы_1.jpg", type: "image" },
  { name: "фото_трубы_2.jpg", type: "image" },
  { name: "акт_осмотра.pdf", type: "doc" },
  { name: "смета_материалов.xlsx", type: "doc" },
]

export function CommunicationContent() {
  const [activeChat, setActiveChat] = useState("dp-1487")
  const [expandedSections, setExpandedSections] = useState<string[]>(["ОБЪЕКТ", "ОТДЕЛЫ", "ПО ЗАЯВКАМ", "ПРЯМЫЕ"])
  const [messageText, setMessageText] = useState("")
  const [showDetails, setShowDetails] = useState(true)

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]
    )
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-x-auto" style={{ background: 'var(--neutral-50)' }}>
      {/* Left Column - Chat List */}
      <div 
        className="w-[250px] flex flex-col"
        style={{ 
          background: 'var(--neutral-0)', 
          borderRight: '1px solid var(--neutral-200)' 
        }}
      >
        {/* Search */}
        <div className="p-3" style={{ borderBottom: '1px solid var(--neutral-200)' }}>
          <div className="relative">
            <Search 
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" 
              style={{ color: 'var(--neutral-400)' }}
              strokeWidth={1.5} 
            />
            <Input 
              placeholder="Поиск чатов..." 
              className="pl-8 h-8 text-sm"
              style={{ background: 'var(--neutral-50)', borderColor: 'var(--neutral-200)' }}
            />
          </div>
        </div>

        {/* Chat Sections */}
        <ScrollArea className="flex-1">
          <div className="py-2">
            {chatSections.map((section) => (
              <div key={section.title} className="mb-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center gap-1 px-3 py-1.5 transition-colors"
                  style={{ 
                    fontSize: '11px', 
                    fontWeight: 500, 
                    color: 'var(--neutral-500)',
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {expandedSections.includes(section.title) ? (
                    <ChevronDown className="w-3 h-3" strokeWidth={1.5} />
                  ) : (
                    <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
                  )}
                  {section.title}
                </button>

                {/* Channels */}
                {expandedSections.includes(section.title) && (
                  <div className="mt-0.5">
                    {section.channels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => setActiveChat(channel.id)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm transition-colors"
                        style={{
                          background: activeChat === channel.id ? 'var(--dia-green-50)' : 'transparent',
                          color: activeChat === channel.id ? 'var(--dia-green-700)' : 'var(--neutral-700)',
                          fontWeight: activeChat === channel.id ? 500 : 400,
                        }}
                      >
                        {channel.type === "channel" && (
                          <Hash 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: 'var(--neutral-400)' }}
                            strokeWidth={1.5} 
                          />
                        )}
                        {channel.type === "task" && (
                          <MessageSquare 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: 'var(--neutral-400)' }}
                            strokeWidth={1.5} 
                          />
                        )}
                        {channel.type === "direct" && (
                          <div className="relative flex-shrink-0">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback 
                                className="text-[9px]"
                                style={{ background: 'var(--neutral-200)', color: 'var(--neutral-600)' }}
                              >
                                {channel.avatar}
                              </AvatarFallback>
                            </Avatar>
                            {channel.online && (
                              <span 
                                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full"
                                style={{ background: 'var(--status-success-main)', border: '2px solid var(--neutral-0)' }}
                              />
                            )}
                          </div>
                        )}
                        <span className="truncate flex-1 text-left">{channel.name}</span>
                        {channel.unread && (
                          <span 
                            className="flex-shrink-0 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium rounded-full px-1"
                            style={{ 
                              background: 'var(--status-danger-main)', 
                              color: 'white',
                              fontFamily: 'var(--font-mono)'
                            }}
                          >
                            {channel.unread}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Center Column - Messages */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div 
          className="h-14 px-4 flex items-center justify-between flex-shrink-0"
          style={{ background: 'var(--neutral-0)', borderBottom: '1px solid var(--neutral-200)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <h2 
                className="text-sm font-semibold truncate"
                style={{ color: 'var(--neutral-900)' }}
              >
                Заявка DP-1487 · Прорыв трубы в туалете 8 этажа
              </h2>
              <p className="text-xs" style={{ color: 'var(--neutral-500)' }}>5 участников</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex -space-x-1.5 mr-2">
              {participants.slice(0, 4).map((p, i) => (
                <Avatar key={i} className="w-6 h-6" style={{ border: '2px solid var(--neutral-0)' }}>
                  <AvatarFallback 
                    className="text-[9px]"
                    style={{ background: 'var(--neutral-200)', color: 'var(--neutral-600)' }}
                  >
                    {p.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              {participants.length > 4 && (
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium"
                  style={{ background: 'var(--neutral-100)', border: '2px solid var(--neutral-0)', color: 'var(--neutral-500)' }}
                >
                  +{participants.length - 4}
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs gap-1.5"
              style={{ borderColor: 'var(--neutral-300)', color: 'var(--neutral-700)' }}
            >
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              Открыть заявку
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setShowDetails(!showDetails)}
            >
              <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1" style={{ background: 'var(--neutral-50)' }}>
          <div className="p-4 space-y-3">
            {messages.map((msg) => {
              if (msg.isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center">
                    <span 
                      className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{ color: 'var(--neutral-500)', background: 'var(--neutral-100)' }}
                    >
                      {msg.content}
                    </span>
                  </div>
                )
              }

              return (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-2.5 max-w-[75%]",
                    msg.isOwn ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  {!msg.isOwn && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback 
                        className="text-xs"
                        style={{ background: 'var(--neutral-200)', color: 'var(--neutral-600)' }}
                      >
                        {msg.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("min-w-0", msg.isOwn ? "text-right" : "")}>
                    <div className={cn("flex items-baseline gap-2 mb-0.5", msg.isOwn ? "justify-end" : "")}>
                      <span 
                        className={cn("text-sm font-medium", msg.isOwn ? "order-2" : "")}
                        style={{ color: 'var(--neutral-800)' }}
                      >
                        {msg.author}
                      </span>
                      <span 
                        className="text-[10px]"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--neutral-400)' }}
                      >
                        {msg.time}
                      </span>
                    </div>
                    
                    {msg.replyTo && (
                      <div className={cn(
                        "flex items-start gap-1.5 mb-1 text-xs",
                        msg.isOwn ? "justify-end" : ""
                      )}
                      style={{ color: 'var(--neutral-500)' }}
                      >
                        <Reply className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                        <span className="truncate">
                          <span className="font-medium">{msg.replyTo.author}:</span> {msg.replyTo.content}
                        </span>
                      </div>
                    )}

                    <div 
                      className="inline-block px-3 py-2 rounded-lg text-sm"
                      style={msg.isOwn 
                        ? { background: 'var(--dia-green-50)', color: 'var(--dia-green-800)', border: '1px solid var(--dia-green-200)' }
                        : { background: 'var(--neutral-0)', color: 'var(--neutral-800)', border: '1px solid var(--neutral-200)' }
                      }
                    >
                      {msg.image ? (
                        <div 
                          className="w-48 h-32 rounded flex items-center justify-center"
                          style={{ background: 'var(--neutral-200)' }}
                        >
                          <ImageIcon className="w-8 h-8" style={{ color: 'var(--neutral-400)' }} strokeWidth={1.5} />
                        </div>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>

                    {msg.canCreateTask && (
                      <button 
                        className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                        style={{ color: 'var(--dia-green-600)' }}
                      >
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Создать задачу из сообщения
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div 
          className="p-3 flex-shrink-0"
          style={{ borderTop: '1px solid var(--neutral-200)', background: 'var(--neutral-0)' }}
        >
          <div className="flex items-end gap-2">
            <div 
              className="flex-1 rounded-lg"
              style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}
            >
              <div 
                className="flex items-center gap-1 px-2 py-1.5"
                style={{ borderBottom: '1px solid var(--neutral-200)' }}
              >
                <button className="p-1 rounded transition-colors hover:bg-[var(--neutral-100)]">
                  <Bold className="w-4 h-4" style={{ color: 'var(--neutral-400)' }} strokeWidth={1.5} />
                </button>
                <button className="p-1 rounded transition-colors hover:bg-[var(--neutral-100)]">
                  <AtSign className="w-4 h-4" style={{ color: 'var(--neutral-400)' }} strokeWidth={1.5} />
                </button>
                <button className="p-1 rounded transition-colors hover:bg-[var(--neutral-100)]">
                  <Smile className="w-4 h-4" style={{ color: 'var(--neutral-400)' }} strokeWidth={1.5} />
                </button>
                <button className="p-1 rounded transition-colors hover:bg-[var(--neutral-100)]">
                  <Paperclip className="w-4 h-4" style={{ color: 'var(--neutral-400)' }} strokeWidth={1.5} />
                </button>
              </div>
              <textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Написать сообщение..."
                className="w-full px-3 py-2 text-sm bg-transparent resize-none focus:outline-none min-h-[60px]"
                style={{ color: 'var(--neutral-800)' }}
                rows={2}
              />
              <div className="px-3 pb-2">
                <span 
                  className="text-[10px]"
                  style={{ color: 'var(--neutral-400)' }}
                >
                  Enter для отправки · <span style={{ fontFamily: 'var(--font-mono)' }}>⌘+Enter</span> для новой строки
                </span>
              </div>
            </div>
            <Button 
              className="h-10 px-4"
              style={{ background: 'var(--dia-green-600)', color: 'white' }}
            >
              <Send className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
              Отправить
            </Button>
          </div>
        </div>
      </div>

      {/* Right Column - Chat Details */}
      {showDetails && (
        <div 
          className="w-[320px] flex flex-col"
          style={{ background: 'var(--neutral-0)', borderLeft: '1px solid var(--neutral-200)' }}
        >
          <div 
            className="p-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--neutral-200)' }}
          >
            <h3 className="text-sm font-semibold" style={{ color: 'var(--neutral-900)' }}>Детали чата</h3>
            <button 
              onClick={() => setShowDetails(false)}
              className="p-1 rounded transition-colors hover:bg-[var(--neutral-100)]"
            >
              <X className="w-4 h-4" style={{ color: 'var(--neutral-400)' }} strokeWidth={1.5} />
            </button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Linked Task */}
              <div>
                <h4 
                  className="text-[11px] font-medium uppercase mb-2"
                  style={{ color: 'var(--neutral-500)', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}
                >
                  Связанная заявка
                </h4>
                <div 
                  className="p-3 rounded-lg"
                  style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--neutral-500)' }}>DP-1487</span>
                    <span 
                      className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                      style={{ background: 'var(--status-warning-bg)', color: 'var(--status-warning-main)' }}
                    >
                      В работе
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-2" style={{ color: 'var(--neutral-800)' }}>Прорыв трубы в туалете 8 этажа</p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--neutral-500)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--status-danger-main)' }} />
                    <span>Аварийный</span>
                    <span style={{ color: 'var(--neutral-300)' }}>·</span>
                    <span>Тех. служба</span>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div>
                <h4 
                  className="text-[11px] font-medium uppercase mb-2"
                  style={{ color: 'var(--neutral-500)', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}
                >
                  Участники ({participants.length})
                </h4>
                <div className="space-y-2">
                  {participants.map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="relative">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback 
                            className="text-[10px]"
                            style={{ background: 'var(--neutral-200)', color: 'var(--neutral-600)' }}
                          >
                            {p.initials}
                          </AvatarFallback>
                        </Avatar>
                        {p.online && (
                          <span 
                            className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full"
                            style={{ background: 'var(--status-success-main)', border: '2px solid var(--neutral-0)' }}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--neutral-800)' }}>{p.name}</p>
                        <p className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>{p.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attached Files */}
              <div>
                <h4 
                  className="text-[11px] font-medium uppercase mb-2"
                  style={{ color: 'var(--neutral-500)', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}
                >
                  Прикреплённые файлы ({attachedFiles.length})
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {attachedFiles.map((file, i) => (
                    <div 
                      key={i}
                      className="p-2 rounded-lg cursor-pointer transition-colors"
                      style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}
                    >
                      <div 
                        className="w-full h-12 rounded flex items-center justify-center mb-1.5"
                        style={{ background: 'var(--neutral-100)' }}
                      >
                        {file.type === "image" ? (
                          <ImageIcon className="w-5 h-5" style={{ color: 'var(--neutral-400)' }} strokeWidth={1.5} />
                        ) : (
                          <FileText className="w-5 h-5" style={{ color: 'var(--neutral-400)' }} strokeWidth={1.5} />
                        )}
                      </div>
                      <p className="text-[11px] truncate" style={{ color: 'var(--neutral-700)' }}>{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pinned Messages */}
              <div>
                <h4 
                  className="text-[11px] font-medium uppercase mb-2"
                  style={{ color: 'var(--neutral-500)', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}
                >
                  Закреплённые сообщения
                </h4>
                <div 
                  className="p-3 rounded-lg"
                  style={{ background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)' }}
                >
                  <div className="flex items-start gap-2">
                    <Pin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'var(--status-warning-main)' }} strokeWidth={1.5} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--neutral-800)' }}>Тимур Бекмамбетов</p>
                      <p className="text-xs line-clamp-2" style={{ color: 'var(--neutral-500)' }}>
                        Труба ПВХ 50мм — 1м, муфты соединительные — 2шт, герметик сантехнический, хомуты
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
