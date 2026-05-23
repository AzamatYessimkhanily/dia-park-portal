"use client"

import { useState } from "react"
import { Mail, Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div 
        className="hidden lg:flex w-1/2 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A2E1F 0%, var(--dia-green-700) 60%, var(--dia-green-600) 100%)"
        }}
      >
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px"
          }}
        />

        {/* Large Decorative Logo Watermark */}
        <img
          src="/dia-holding.png"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-16 -right-10 w-[420px] h-[420px] select-none pointer-events-none"
          style={{
            opacity: 0.09,
            filter: 'brightness(2.5) contrast(0.6)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/dia-holding.png"
              alt="DIA Holding"
              className="w-11 h-11 rounded-lg shrink-0"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-display font-semibold tracking-wide text-sm">
                DIA HOLDING
              </span>
              <span className="text-white/50 font-mono text-[10px] mt-1 tracking-widest uppercase">
                Property Management
              </span>
            </div>
          </div>

          {/* Quote Block - Centered */}
          <div className="flex-1 flex items-center">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-white/40" />
                <span className="text-white/60 font-mono text-xs uppercase tracking-widest">
                  Внутренний портал
                </span>
              </div>
              <h1 className="text-white text-4xl font-display font-semibold leading-tight mb-4">
                Управляйте объектом из одного места
              </h1>
              <p className="text-white/50 text-base leading-relaxed">
                Единая платформа для управления коммерческой недвижимостью: 
                заявки, финансы, резиденты, техническое обслуживание и аналитика.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col">
        {/* Mobile Logo */}
        <div className="lg:hidden p-6">
          <div className="flex items-center gap-3">
            <img
              src="/dia-holding.png"
              alt="DIA Holding"
              className="w-9 h-9 rounded-md shrink-0"
            />
            <span className="font-display font-semibold tracking-wide text-sm" style={{ color: "var(--dia-green-700)" }}>
              DIA PARK
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[400px]">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-display font-semibold text-[var(--neutral-900)] mb-2">
                Войти в Dia Park
              </h1>
              <p className="text-[var(--neutral-600)] text-sm">
                Введите email и пароль чтобы продолжить
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-500)]">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="h-12 pl-11 pr-4 bg-[var(--neutral-50)] border-[var(--neutral-300)] rounded-lg text-[var(--neutral-900)] placeholder:text-[var(--neutral-500)] focus:border-[var(--dia-green-600)] focus:ring-1 focus:ring-[var(--dia-green-600)]/20 transition-all"
                  placeholder="Email"
                />
                <label 
                  className={`absolute left-11 transition-all duration-200 pointer-events-none ${
                    emailFocused || email 
                      ? "-top-2.5 text-xs bg-white px-1 text-[var(--dia-green-600)]" 
                      : "top-1/2 -translate-y-1/2 text-sm text-[var(--neutral-500)] opacity-0"
                  }`}
                >
                  Email
                </label>
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-500)]">
                  <Lock className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="h-12 pl-11 pr-12 bg-[var(--neutral-50)] border-[var(--neutral-300)] rounded-lg text-[var(--neutral-900)] placeholder:text-[var(--neutral-500)] focus:border-[var(--dia-green-600)] focus:ring-1 focus:ring-[var(--dia-green-600)]/20 transition-all"
                  placeholder="Пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--neutral-500)] hover:text-[var(--neutral-600)] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={1.5} />
                  )}
                </button>
                <label 
                  className={`absolute left-11 transition-all duration-200 pointer-events-none ${
                    passwordFocused || password 
                      ? "-top-2.5 text-xs bg-white px-1 text-[var(--dia-green-600)]" 
                      : "top-1/2 -translate-y-1/2 text-sm text-[var(--neutral-500)] opacity-0"
                  }`}
                >
                  Пароль
                </label>
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="remember" 
                    className="border-[var(--neutral-300)] data-[state=checked]:bg-[var(--dia-green-600)] data-[state=checked]:border-[var(--dia-green-600)]"
                  />
                  <label htmlFor="remember" className="text-sm text-[var(--neutral-600)] cursor-pointer">
                    Запомнить меня
                  </label>
                </div>
                <a 
                  href="#" 
                  className="text-sm text-[var(--dia-green-600)] hover:text-[var(--dia-green-700)] transition-colors"
                >
                  Забыли пароль?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium rounded-lg transition-all"
                style={{ 
                  backgroundColor: "var(--dia-green-600)",
                  boxShadow: "0 2px 8px rgba(21, 130, 79, 0.25), 0 1px 2px rgba(21, 130, 79, 0.15)"
                }}
              >
                Войти
              </Button>

              {/* Divider */}
              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-[var(--neutral-300)]" />
                <span className="text-xs text-[var(--neutral-500)] uppercase tracking-wider">или</span>
                <div className="flex-1 h-px bg-[var(--neutral-300)]" />
              </div>

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-medium rounded-lg border-[var(--neutral-300)] text-[var(--neutral-900)] hover:bg-[var(--neutral-50)] hover:border-[var(--neutral-400)] transition-all gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Войти через Google
              </Button>

              {/* No Account Notice */}
              <p className="text-center text-sm text-[var(--neutral-500)] pt-2">
                Нет аккаунта?{" "}
                <span className="text-[var(--neutral-600)]">
                  Обратитесь к администратору объекта
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <span className="font-mono text-xs text-[var(--neutral-500)] tracking-wide">
            DIA PARK · v1.0 · 2026
          </span>
        </div>
      </div>
    </div>
  )
}
