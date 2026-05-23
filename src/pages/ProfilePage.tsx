import Icon from '@/components/ui/icon';

const BADGES = ['🌊 Первая волна', '📡 1000 сообщений', '🤿 Ныряльщик', '🗺️ Исследователь'];

export default function ProfilePage() {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto scroll-content">
      {/* Profile hero */}
      <div
        className="relative h-52 shrink-0 flex items-end"
        style={{
          background: 'linear-gradient(135deg, #041428 0%, #1565c0 50%, #00b4d8 100%)',
        }}
      >
        {/* Animated mesh */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 60%, rgba(0,180,216,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(21,101,192,0.8) 0%, transparent 50%)',
          }}
        />
        {/* Edit button */}
        <button className="absolute top-4 right-4 glass rounded-xl px-3 py-1.5 text-xs text-[var(--nemo-foam)] flex items-center gap-1.5 border border-[rgba(255,255,255,0.15)]">
          <Icon name="Edit3" size={12} />
          Изменить фон
        </button>
        {/* Avatar */}
        <div className="absolute -bottom-8 left-6 w-20 h-20 rounded-3xl border-2 border-[var(--nemo-cyan)] glass flex items-center justify-center text-4xl shadow-2xl" style={{ boxShadow: '0 0 32px rgba(0,180,216,0.5)' }}>
          🧑‍🚀
        </div>
      </div>

      <div className="pt-12 px-6 pb-6 space-y-5">
        {/* Name + ID */}
        <div className="animate-fade-in">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--nemo-cyan)' }}>
                Капитан Немо
              </h1>
              <p className="font-body text-sm text-[rgba(144,224,239,0.5)] mt-0.5">@captain_nemo · ID: 000001</p>
            </div>
            <button className="btn-ocean rounded-2xl px-4 py-2 text-sm flex items-center gap-1.5">
              <Icon name="Edit2" size={13} />
              Редактировать
            </button>
          </div>
          <p className="mt-3 font-body text-sm text-[rgba(202,240,248,0.65)] leading-relaxed">
            В поиске точки Немо. Люблю глубины, тишину и бесконечный горизонт. 🌊
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in stagger-1">
          {[
            { label: 'Сообщений', val: '1 204' },
            { label: 'Контактов', val: '47'    },
            { label: 'Дней в сети', val: '312' },
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center border border-[rgba(0,180,216,0.1)]">
              <div className="font-display text-xl font-bold text-[var(--nemo-cyan)]">{s.val}</div>
              <div className="font-body text-xs text-[rgba(144,224,239,0.45)] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="animate-fade-in stagger-2">
          <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3">Достижения</h2>
          <div className="flex flex-wrap gap-2">
            {BADGES.map(b => (
              <span key={b} className="glass rounded-xl px-3 py-1.5 text-xs font-body text-[rgba(144,224,239,0.7)] border border-[rgba(0,180,216,0.15)]">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* QR */}
        <div className="animate-fade-in stagger-3">
          <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3">QR-код</h2>
          <div className="glass glow-border rounded-3xl p-6 flex items-center gap-5">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shrink-0"
              style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.2)' }}
            >
              📲
            </div>
            <div>
              <p className="font-body text-sm text-[rgba(202,240,248,0.7)] leading-relaxed">
                Поделитесь QR-кодом, чтобы друзья могли найти вас в океане Nemo
              </p>
              <button className="btn-ghost-ocean rounded-xl px-4 py-2 text-sm mt-3 flex items-center gap-2">
                <Icon name="Share2" size={13} />
                Поделиться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
