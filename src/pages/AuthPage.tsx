import { useState } from 'react';
import Icon from '@/components/ui/icon';

type AuthMode = 'login' | 'register';

interface Props { onAuth: () => void; }

export default function AuthPage({ onAuth }: Props) {
  const [mode, setMode]         = useState<AuthMode>('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const validate = () => {
    if (mode === 'register' && !name.trim()) return 'Введите имя';
    if (!email.trim() || !email.includes('@')) return 'Введите корректный email';
    if (password.length < 6) return 'Пароль минимум 6 символов';
    return '';
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth();
    }, 900);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative z-10">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl overflow-hidden mx-auto mb-4 shadow-2xl"
            style={{ boxShadow: '0 0 48px rgba(0,180,216,0.4)' }}>
            <img
              src="https://cdn.poehali.dev/projects/5e011a8c-fdc8-4250-906e-b15c55b68cc8/bucket/7011f024-f671-445a-b2ee-b028516f26ec.jpg"
              alt="Nemo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-display text-3xl font-bold shimmer-text">Nemo</h1>
          <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-1">Войдите в глубину</p>
        </div>

        {/* Card */}
        <div className="glass glow-border rounded-3xl p-6 animate-fade-in stagger-1">
          {/* Tabs */}
          <div className="glass rounded-2xl p-1 flex gap-1 mb-5">
            {(['login', 'register'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2 rounded-xl text-sm font-display font-semibold transition-all duration-200 ${
                  mode === m ? 'btn-ocean' : 'text-[rgba(144,224,239,0.45)] hover:text-[var(--nemo-foam)]'
                }`}>
                {m === 'login' ? 'Войти' : 'Регистрация'}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {mode === 'register' && (
              <div className="animate-fade-in">
                <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">Имя</label>
                <div className="relative">
                  <Icon name="User" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.3)]" />
                  <input value={name} onChange={e => setName(e.target.value)} onKeyDown={handleKey}
                    placeholder="Ваше имя" className="input-ocean w-full rounded-xl pl-10 pr-4 py-3 text-sm" />
                </div>
              </div>
            )}

            <div>
              <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">Email</label>
              <div className="relative">
                <Icon name="Mail" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.3)]" />
                <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKey}
                  type="email" placeholder="ocean@nemo.dev"
                  className="input-ocean w-full rounded-xl pl-10 pr-4 py-3 text-sm" />
              </div>
            </div>

            <div>
              <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.3)]" />
                <input value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKey}
                  type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  className="input-ocean w-full rounded-xl pl-10 pr-11 py-3 text-sm" />
                <button onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.3)] hover:text-[rgba(144,224,239,0.7)] transition-all">
                  <Icon name={showPass ? 'EyeOff' : 'Eye'} size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-3 px-3 py-2.5 rounded-xl flex items-center gap-2 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <Icon name="AlertCircle" size={14} className="text-red-400 shrink-0" />
              <span className="font-body text-red-400 text-xs">{error}</span>
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading}
            className="btn-ocean w-full rounded-2xl py-3.5 text-sm font-display font-semibold mt-4 flex items-center justify-center gap-2 disabled:opacity-60">
            {loading
              ? <><Icon name="Loader2" size={16} className="animate-spin" />Подключение...</>
              : mode === 'login'
                ? <><Icon name="LogIn" size={16} />Войти</>
                : <><Icon name="Anchor" size={16} />Создать аккаунт</>
            }
          </button>

          {mode === 'login' && (
            <button className="w-full text-center text-xs font-body text-[rgba(144,224,239,0.35)] hover:text-[rgba(144,224,239,0.6)] mt-3 transition-all flex items-center justify-center gap-1.5">
              <Icon name="KeyRound" size={11} />
              Забыли пароль?
            </button>
          )}
        </div>

        <p className="text-center text-[10px] font-body text-[rgba(144,224,239,0.18)] mt-6 animate-fade-in stagger-2">
          Nemo · v1.0 · 48°52.6′S 123°23.6′W
        </p>
      </div>
    </div>
  );
}
