import Icon from '@/components/ui/icon';

type Page = 'home' | 'chats' | 'calls' | 'contacts' | 'stories' | 'profile' | 'settings' | 'auth';

interface Props { onNavigate: (page: Page) => void; }

const THEMES = [
  { id: 'ocean',  name: 'Океан',       icon: 'Waves',       color: '#1565c0' },
  { id: 'cosmos', name: 'Космос',      icon: 'Star',        color: '#6366f1' },
  { id: 'sakura', name: 'Сакура',      icon: 'Flower2',     color: '#ec4899' },
  { id: 'forest', name: 'Лес',         icon: 'TreePine',    color: '#16a34a' },
  { id: 'neon',   name: 'Неон',        icon: 'Zap',         color: '#a855f7' },
  { id: 'black',  name: 'Чёрная дыра', icon: 'Circle',      color: '#374151' },
];

const QUICK = [
  { icon: 'MessageCircle', label: 'Новый чат',    page: 'chats'    as Page },
  { icon: 'Phone',         label: 'Позвонить',    page: 'calls'    as Page },
  { icon: 'PlaySquare',    label: 'Истории',      page: 'stories'  as Page },
  { icon: 'Users',         label: 'Контакты',     page: 'contacts' as Page },
];

const STATS = [
  { label: 'Сообщений', value: '1 204', icon: 'MessageSquare' },
  { label: 'Контактов', value: '47',    icon: 'Users'         },
  { label: 'Звонков',   value: '12',    icon: 'PhoneCall'     },
];

export default function HomePage({ onNavigate }: Props) {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content gap-5">
      {/* Hero */}
      <div className="glass rounded-3xl p-7 glow-border animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl shrink-0" style={{ boxShadow: '0 0 28px rgba(0,180,216,0.35)' }}>
            <img
              src="https://cdn.poehali.dev/projects/5e011a8c-fdc8-4250-906e-b15c55b68cc8/bucket/7011f024-f671-445a-b2ee-b028516f26ec.jpg"
              alt="Nemo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold shimmer-text">Nemo</h1>
            <p className="text-[var(--nemo-foam)] opacity-55 text-sm font-body mt-0.5">
              Мессенджер — глубже, чем кажется
            </p>
          </div>
        </div>
        <p className="text-[rgba(202,240,248,0.6)] font-body text-sm leading-relaxed max-w-lg">
          Точка Немо — самое удалённое место на Земле. Здесь ваши слова путешествуют через океан.
        </p>

        <div className="grid grid-cols-3 gap-3 mt-5">
          {STATS.map((s, i) => (
            <div key={s.label} className={`glass rounded-2xl p-4 text-center stagger-${i + 1} animate-fade-in`}>
              <Icon name={s.icon} size={18} className="text-[var(--nemo-cyan)] mx-auto mb-1.5" />
              <div className="font-display text-xl font-bold text-[var(--nemo-cyan)]">{s.value}</div>
              <div className="text-xs text-[rgba(144,224,239,0.45)] font-body mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="stagger-2 animate-fade-in">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 px-1 flex items-center gap-2">
          <Icon name="Zap" size={14} className="text-[var(--nemo-cyan)]" />
          Быстрый доступ
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {QUICK.map(item => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className="glass glow-border rounded-2xl p-4 flex items-center gap-3 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(0,180,216,0.12)', border: '1px solid rgba(0,180,216,0.2)' }}>
                <Icon name={item.icon} size={17} className="text-[var(--nemo-cyan)]" />
              </div>
              <span className="font-body font-medium text-[var(--nemo-foam)] text-sm">{item.label}</span>
              <Icon name="ChevronRight" size={14} className="text-[rgba(144,224,239,0.3)] ml-auto" />
            </button>
          ))}
        </div>
      </div>

      {/* Themes */}
      <div className="stagger-3 animate-fade-in">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 px-1 flex items-center gap-2">
          <Icon name="Globe" size={14} className="text-[var(--nemo-cyan)]" />
          Миры
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => onNavigate('settings')}
              className="theme-chip glass rounded-2xl p-3 flex flex-col items-center gap-1.5"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${theme.color}30`, border: `1px solid ${theme.color}55` }}>
                <Icon name={theme.icon} size={16} style={{ color: theme.color }} />
              </div>
              <span className="font-body text-xs text-[rgba(144,224,239,0.6)]">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
