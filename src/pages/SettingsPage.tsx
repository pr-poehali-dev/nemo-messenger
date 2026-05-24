import { useState } from 'react';
import Icon from '@/components/ui/icon';

const THEMES = [
  { id: 'ocean',  icon: 'Waves',     name: 'Океан',        color: '#1565c0' },
  { id: 'cosmos', icon: 'Star',      name: 'Космос',       color: '#6366f1' },
  { id: 'sakura', icon: 'Flower2',   name: 'Сакура',       color: '#ec4899' },
  { id: 'forest', icon: 'TreePine',  name: 'Лес',          color: '#16a34a' },
  { id: 'neon',   icon: 'Zap',       name: 'Неон',         color: '#a855f7' },
  { id: 'pulsar', icon: 'Activity',  name: 'Пульсар',      color: '#f59e0b' },
  { id: 'autumn', icon: 'Leaf',      name: 'Осень',        color: '#ea580c' },
  { id: 'summer', icon: 'Sprout',    name: 'Лето в лесу',  color: '#84cc16' },
  { id: 'mnt',    icon: 'Mountain',  name: 'Горы',         color: '#64748b' },
  { id: 'black',  icon: 'Circle',    name: 'Чёрная дыра',  color: '#374151' },
  { id: 'rgb',    icon: 'Palette',   name: 'RGB',          color: '#ff0080' },
];

const FONTS = ['Nunito', 'Raleway', 'Golos Text', 'IBM Plex Sans', 'Rubik'];
const LANGS  = [
  { id: 'ru', label: 'Русский',  icon: 'BookOpen' },
  { id: 'en', label: 'English',  icon: 'BookOpen' },
  { id: 'es', label: 'Español',  icon: 'BookOpen' },
];

export default function SettingsPage() {
  const [activeTheme, setActiveTheme] = useState('ocean');
  const [music, setMusic]   = useState(true);
  const [notif, setNotif]   = useState(true);
  const [sounds, setSounds] = useState(true);
  const [font, setFont]     = useState('Nunito');
  const [lang, setLang]     = useState('ru');
  const [volume, setVolume] = useState(40);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content gap-5">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold text-[var(--nemo-foam)]">Рубка</h1>
        <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">Управление вашим миром</p>
      </div>

      {/* Worlds */}
      <section className="animate-fade-in stagger-1">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <Icon name="Globe" size={14} className="text-[var(--nemo-cyan)]" />
          Миры
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t.id)}
              className={`theme-chip glass rounded-2xl p-3 flex flex-col items-center gap-1.5 ${activeTheme === t.id ? 'active' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${t.color}28`, border: `1px solid ${t.color}50` }}>
                <Icon name={t.icon} size={17} style={{ color: t.color }} />
              </div>
              <span className="font-body text-[10px] text-[rgba(144,224,239,0.6)] text-center leading-tight">{t.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Sound */}
      <section className="animate-fade-in stagger-2">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <Icon name="Volume2" size={14} className="text-[var(--nemo-cyan)]" />
          Звук
        </h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-[rgba(0,180,216,0.07)]">
          <ToggleRow icon="Music" label="Фоновая музыка"    desc="Web Audio API" value={music}  onChange={setMusic}  />
          <ToggleRow icon="Bell"  label="Уведомления"       desc="Звук новых сообщений" value={notif}  onChange={setNotif}  />
          <ToggleRow icon="MessageSquare" label="Звуки интерфейса" desc="Кнопки и переходы" value={sounds} onChange={setSounds} />
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Volume1" size={16} className="text-[rgba(144,224,239,0.4)]" />
              <div>
                <div className="font-body text-sm text-[var(--nemo-foam)]">Громкость</div>
                <div className="font-body text-xs text-[rgba(144,224,239,0.4)] mt-0.5">{volume}%</div>
              </div>
            </div>
            <div className="w-32">
              <input type="range" min={0} max={100} value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="w-full accent-[var(--nemo-cyan)] cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      {/* Font */}
      <section className="animate-fade-in stagger-3">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <Icon name="Type" size={14} className="text-[var(--nemo-cyan)]" />
          Шрифт
        </h2>
        <div className="flex flex-wrap gap-2">
          {FONTS.map(f => (
            <button key={f} onClick={() => setFont(f)}
              className={`rounded-xl px-3.5 py-2 text-sm transition-all duration-200 ${font === f ? 'btn-ocean' : 'btn-ghost-ocean'}`}
              style={{ fontFamily: f }}>
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Language */}
      <section className="animate-fade-in stagger-4">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <Icon name="Languages" size={14} className="text-[var(--nemo-cyan)]" />
          Язык
        </h2>
        <div className="flex gap-2">
          {LANGS.map(l => (
            <button key={l.id} onClick={() => setLang(l.id)}
              className={`rounded-xl px-4 py-2.5 text-sm transition-all duration-200 flex items-center gap-2 ${lang === l.id ? 'btn-ocean' : 'btn-ghost-ocean'}`}>
              <Icon name="Globe2" size={14} />
              {l.label}
            </button>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="animate-fade-in stagger-5">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <Icon name="Shield" size={14} className="text-[var(--nemo-cyan)]" />
          Безопасность
        </h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-[rgba(0,180,216,0.07)]">
          {[
            { icon: 'Lock',          label: 'Двухфакторная аутентификация', desc: 'Защита входа' },
            { icon: 'Eye',           label: 'Кто видит мой профиль',        desc: 'Все участники' },
            { icon: 'Fingerprint',   label: 'Активные сессии',              desc: '1 устройство' },
          ].map(row => (
            <button key={row.label} className="w-full px-4 py-3.5 text-left flex items-center gap-3 hover:bg-[rgba(0,180,216,0.06)] transition-all">
              <Icon name={row.icon} size={15} className="text-[rgba(144,224,239,0.4)] shrink-0" />
              <div className="flex-1">
                <div className="font-body text-sm text-[var(--nemo-foam)]">{row.label}</div>
                <div className="font-body text-xs text-[rgba(144,224,239,0.4)] mt-0.5">{row.desc}</div>
              </div>
              <Icon name="ChevronRight" size={14} className="text-[rgba(144,224,239,0.25)]" />
            </button>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="font-display font-semibold text-red-400/80 text-sm mb-3 flex items-center gap-2">
          <Icon name="AlertTriangle" size={13} />
          Опасная зона
        </h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-[rgba(0,180,216,0.07)]">
          <button className="w-full px-4 py-3.5 text-left flex items-center gap-3 hover:bg-[rgba(255,60,60,0.05)] transition-all">
            <Icon name="Trash2" size={15} className="text-red-400 shrink-0" />
            <span className="font-body text-sm text-red-400">Удалить аккаунт</span>
          </button>
          <button className="w-full px-4 py-3.5 text-left flex items-center gap-3 hover:bg-[rgba(255,60,60,0.05)] transition-all">
            <Icon name="LogOut" size={15} className="text-red-400/70 shrink-0" />
            <span className="font-body text-sm text-red-400/70">Всплыть (выйти)</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function ToggleRow({ icon, label, desc, value, onChange }: {
  icon: string; label: string; desc: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="px-4 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon name={icon} size={15} className="text-[rgba(144,224,239,0.4)] shrink-0" />
        <div>
          <div className="font-body text-sm text-[var(--nemo-foam)]">{label}</div>
          <div className="font-body text-xs text-[rgba(144,224,239,0.4)] mt-0.5">{desc}</div>
        </div>
      </div>
      <button onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${value ? 'bg-[var(--nemo-cyan)]' : 'bg-[rgba(6,36,68,0.8)] border border-[rgba(0,180,216,0.2)]'}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${value ? 'left-[calc(100%-22px)]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}
