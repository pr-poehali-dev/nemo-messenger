type Page = 'home' | 'chats' | 'calls' | 'contacts' | 'profile' | 'settings' | 'auth';

interface Props {
  onNavigate: (page: Page) => void;
}

const THEMES = [
  { id: 'ocean',   emoji: '🌊', name: 'Океан',        color: '#1565c0' },
  { id: 'cosmos',  emoji: '🌌', name: 'Космос',       color: '#6366f1' },
  { id: 'sakura',  emoji: '🌸', name: 'Сакура',       color: '#ec4899' },
  { id: 'forest',  emoji: '🌲', name: 'Лес',          color: '#16a34a' },
  { id: 'neon',    emoji: '⚡', name: 'Неон',         color: '#a855f7' },
  { id: 'black',   emoji: '🕳️', name: 'Чёрная дыра',  color: '#374151' },
];

const STATS = [
  { label: 'Сообщений', value: '1 204',  icon: '💬' },
  { label: 'Контактов', value: '47',     icon: '👥' },
  { label: 'Звонков',   value: '12',     icon: '📞' },
];

export default function HomePage({ onNavigate }: Props) {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content gap-6">
      {/* Hero */}
      <div className="glass rounded-3xl p-8 glow-border animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl btn-ocean flex items-center justify-center text-2xl shadow-xl">
            🌊
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold shimmer-text">Nemo</h1>
            <p className="text-[var(--nemo-foam)] opacity-60 text-sm font-body">
              Мессенджер — глубже, чем кажется
            </p>
          </div>
        </div>
        <p className="text-[rgba(202,240,248,0.65)] font-body text-sm leading-relaxed max-w-lg">
          Вы находитесь в точке Немо — самом удалённом месте на Земле.
          Здесь ваши слова путешествуют через океан.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`glass rounded-2xl p-4 text-center stagger-${i + 1} animate-fade-in`}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-display text-xl font-bold text-[var(--nemo-cyan)]">{s.value}</div>
              <div className="text-xs text-[rgba(144,224,239,0.5)] font-body mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="stagger-2 animate-fade-in">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-base mb-3 px-1">
          Быстрый доступ
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '💬', label: 'Новый чат',      page: 'chats' as Page },
            { icon: '📞', label: 'Позвонить',       page: 'calls' as Page },
            { icon: '👤', label: 'Мой профиль',     page: 'profile' as Page },
            { icon: '👥', label: 'Контакты',        page: 'contacts' as Page },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className="glass glow-border rounded-2xl p-4 flex items-center gap-3 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-body font-medium text-[var(--nemo-foam)] text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Themes preview */}
      <div className="stagger-3 animate-fade-in">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-base mb-3 px-1">
          Миры
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => onNavigate('settings')}
              className="theme-chip glass rounded-2xl p-3 flex flex-col items-center gap-1.5"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: `${theme.color}40`, border: `1px solid ${theme.color}60` }}
              >
                {theme.emoji}
              </div>
              <span className="font-body text-xs text-[rgba(144,224,239,0.65)]">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
