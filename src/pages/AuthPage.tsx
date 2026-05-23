import { useState } from 'react';
import Icon from '@/components/ui/icon';

type AuthMode = 'login' | 'register';

interface Props {
  onAuth: () => void;
}

export default function AuthPage({ onAuth }: Props) {
  const [mode, setMode]       = useState<AuthMode>('login');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]       = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative z-10">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div
            className="w-20 h-20 rounded-3xl btn-ocean flex items-center justify-center text-4xl mx-auto mb-4 shadow-2xl"
            style={{ boxShadow: '0 0 48px rgba(0,180,216,0.4)' }}
          >
            🌊
          </div>
          <h1 className="font-display text-3xl font-bold shimmer-text">Nemo</h1>
          <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-1">
            Войдите в глубину
          </p>
        </div>

        {/* Card */}
        <div className="glass glow-border rounded-3xl p-6 animate-fade-in stagger-1">
          {/* Tabs */}
          <div className="glass rounded-2xl p-1 flex gap-1 mb-5">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-xl text-sm font-display font-semibold transition-all duration-200 ${
                  mode === m ? 'btn-ocean' : 'text-[rgba(144,224,239,0.45)] hover:text-[var(--nemo-foam)]'
                }`}
              >
                {m === 'login' ? 'Погрузиться' : 'Зарегистрироваться'}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="space-y-3">
            {mode === 'register' && (
              <div className="animate-fade-in">
                <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">
                  Имя капитана
                </label>
                <div className="relative">
                  <Icon name="User" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.3)]" />
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="input-ocean w-full rounded-xl pl-10 pr-4 py-3 text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">
                Электронная почта
              </label>
              <div className="relative">
                <Icon name="Mail" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.3)]" />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="ocean@nemo.dev"
                  className="input-ocean w-full rounded-xl pl-10 pr-4 py-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">
                Пароль
              </label>
              <div className="relative">
                <Icon name="Lock" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.3)]" />
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-ocean w-full rounded-xl pl-10 pr-11 py-3 text-sm"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.3)] hover:text-[rgba(144,224,239,0.7)] transition-all"
                >
                  <Icon name={showPass ? 'EyeOff' : 'Eye'} size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={onAuth}
            className="btn-ocean w-full rounded-2xl py-3.5 text-sm font-display font-semibold mt-5 flex items-center justify-center gap-2"
          >
            {mode === 'login' ? (
              <>
                <Icon name="Waves" size={16} />
                Погрузиться
              </>
            ) : (
              <>
                <Icon name="Anchor" size={16} />
                Создать аккаунт
              </>
            )}
          </button>

          {mode === 'login' && (
            <button className="w-full text-center text-xs font-body text-[rgba(144,224,239,0.35)] hover:text-[rgba(144,224,239,0.65)] mt-3 transition-all">
              Забыли пароль? Всплывите наверх
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] font-body text-[rgba(144,224,239,0.2)] mt-6 animate-fade-in stagger-2">
          Nemo · Версия 1.0 · Точка отсчёта: 48°52.6′ S, 123°23.6′ W
        </p>
      </div>
    </div>
  );
}
