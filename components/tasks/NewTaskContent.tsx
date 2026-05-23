'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  Upload,
  X,
  User,
  MapPin,
  Calendar,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const categories = [
  { value: 'technical', label: 'Техническая проблема' },
  { value: 'cleaning', label: 'Уборка' },
  { value: 'security', label: 'Безопасность' },
  { value: 'access', label: 'Доступ/Пропуск' },
  { value: 'complaint', label: 'Жалоба резидента' },
  { value: 'maintenance', label: 'Обслуживание помещения' },
  { value: 'finance', label: 'Финансовый вопрос' },
  { value: 'admin', label: 'Административный запрос' },
  { value: 'other', label: 'Другое' },
]

const priorities = [
  { value: 'low', label: 'Низкий', color: 'var(--priority-low)' },
  { value: 'mid', label: 'Средний', color: 'var(--priority-mid)' },
  { value: 'high', label: 'Высокий', color: 'var(--priority-high)' },
  { value: 'critical', label: 'Аварийный', color: 'var(--priority-critical)' },
]

const assignees = [
  { value: 'auto', label: 'Автоматически' },
  { value: 'tb', label: 'Тимур Бекмамбетов (Техника)' },
  { value: 'ak', label: 'Арман Касымов (Техника)' },
  { value: 'do', label: 'Динара Омарова (Клининг)' },
  { value: 'ka', label: 'Канат Абдрахманов (Охрана)' },
  { value: 'ma', label: 'Марат Алиев (Админ)' },
]

export function NewTaskContent() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'mid',
    description: '',
    location: '',
    assignee: 'auto',
    deadline: '',
  })
  const [files, setFiles] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, would submit to API
    router.push('/tasks')
  }

  return (
    <div className="p-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
          style={{ color: 'var(--neutral-600)' }}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--neutral-900)', fontFamily: 'var(--font-display)' }}>
            Новая заявка
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--neutral-500)' }}>
            Заполните форму для создания заявки
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="rounded-xl border p-6" style={{ background: 'var(--neutral-0)', borderColor: 'var(--neutral-200)' }}>
          {/* Title */}
          <div className="space-y-2 mb-6">
            <Label style={{ color: 'var(--neutral-700)' }}>Название заявки *</Label>
            <Input 
              placeholder="Краткое описание проблемы..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              style={{ borderColor: 'var(--neutral-300)' }}
              required
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label style={{ color: 'var(--neutral-700)' }}>Категория *</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}>
                <SelectTrigger style={{ borderColor: 'var(--neutral-300)' }}>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label style={{ color: 'var(--neutral-700)' }}>Приоритет *</Label>
              <Select value={formData.priority} onValueChange={(v) => setFormData(prev => ({ ...prev, priority: v }))}>
                <SelectTrigger style={{ borderColor: 'var(--neutral-300)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(p => (
                    <SelectItem key={p.value} value={p.value}>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                        {p.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-6">
            <Label style={{ color: 'var(--neutral-700)' }}>Описание проблемы *</Label>
            <Textarea 
              placeholder="Подробно опишите проблему..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              style={{ borderColor: 'var(--neutral-300)' }}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2 mb-6">
            <Label style={{ color: 'var(--neutral-700)' }}>Локация</Label>
            <div className="relative">
              <MapPin size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neutral-400)' }} />
              <Input 
                className="pl-9"
                placeholder="Этаж, помещение, зона..."
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                style={{ borderColor: 'var(--neutral-300)' }}
              />
            </div>
          </div>

          {/* Assignee & Deadline */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label style={{ color: 'var(--neutral-700)' }}>Исполнитель</Label>
              <Select value={formData.assignee} onValueChange={(v) => setFormData(prev => ({ ...prev, assignee: v }))}>
                <SelectTrigger style={{ borderColor: 'var(--neutral-300)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {assignees.map(a => (
                    <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs" style={{ color: 'var(--neutral-500)' }}>
                При выборе «Автоматически» система назначит исполнителя по категории
              </p>
            </div>
            <div className="space-y-2">
              <Label style={{ color: 'var(--neutral-700)' }}>Срок выполнения</Label>
              <div className="relative">
                <Calendar size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--neutral-400)' }} />
                <Input 
                  type="date"
                  className="pl-9"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  style={{ borderColor: 'var(--neutral-300)' }}
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2 mb-6">
            <Label style={{ color: 'var(--neutral-700)' }}>Фото/файлы</Label>
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-[var(--neutral-50)] transition-colors"
              style={{ borderColor: 'var(--neutral-300)' }}
            >
              <Upload size={32} strokeWidth={1} style={{ color: 'var(--neutral-400)' }} className="mx-auto mb-2" />
              <p className="text-sm" style={{ color: 'var(--neutral-600)' }}>
                Перетащите файлы сюда или нажмите для выбора
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--neutral-400)' }}>
                PNG, JPG, PDF до 10MB
              </p>
            </div>
          </div>

          {/* Warning for critical */}
          {formData.priority === 'critical' && (
            <div 
              className="mb-6 p-4 rounded-lg border flex items-start gap-3"
              style={{ background: 'var(--status-danger-bg)', borderColor: 'var(--status-danger-main)' }}
            >
              <AlertCircle size={20} strokeWidth={1.5} style={{ color: 'var(--status-danger-main)' }} className="shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-sm" style={{ color: 'var(--status-danger-main)' }}>
                  Аварийный приоритет
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--neutral-600)' }}>
                  Эта заявка будет отправлена всем ответственным сотрудникам с экстренным уведомлением
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--neutral-200)' }}>
            <Button 
              type="button"
              variant="outline" 
              onClick={() => router.back()}
              style={{ borderColor: 'var(--neutral-300)' }}
            >
              Отмена
            </Button>
            <Button 
              type="submit"
              style={{ background: 'var(--dia-green-600)' }} 
              className="text-white"
            >
              Создать заявку
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
