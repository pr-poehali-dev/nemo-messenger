import { useState } from 'react';
import Icon from '@/components/ui/icon';

const THEMES = [
  { id: 'ocean',   emoji: '🌊', name: 'Океан',        desc: 'Синие волны',          color: '#1565c0' },
  { id: 'cosmos',  emoji: '🌌', name: 'Космос',       desc: 'Звёздная бездна',      color: '#6366f1' },
  { id: 'sakura',  emoji: '🌸', name: 'Сакура',       desc: 'Цветение весны',       color: '#ec4899' },
  { id: 'forest',  emoji: '🌲', name: 'Лес',          desc: 'Тихая чаща',           color: '#16a34a' },
  { id: 'neon',    emoji: '⚡', name: 'Неон',         desc: 'Ночной город',          color: '#a855f7' },
  { id: 'pulsar',  emoji: '💫', name: 'Пульсар',      desc: 'Космические пульсации', color: '#f59e0b' },
  { id: 'autumn',  emoji: '🍂', name: 'Осень',        desc: 'Листопад',             color: '#ea580c' },
  { id: 'summer',  emoji: '🌿', name: 'Лето в лесу',  desc: 'Свежесть трав',        color: '#84cc16' },
  { id: 'clean',   emoji: '🏔️', name: 'Горы',         desc: 'Чистый воздух',        color: '#64748b' },
  { id: 'black',   emoji: '🕳️', name: 'Чёрная дыра',  desc: 'Абсолютная темнота',   color: '#374151' },
  { id: 'rgb',     emoji: '🎨', name: 'RGB',          desc: 'Своя палитра',         color: '#ff0080' },
];

const FONTS = ['Nunito', 'Raleway', 'Golos Text', 'IBM Plex Sans', 'Rubik'];
const LANGS = [
  { id: 'ru', label: '🇷🇺 Русский' },
  { id: 'en', label: '🇬🇧 English' },
  { id: 'es', label: '🇪🇸 Español' },
];

export default function SettingsPage() {
  const [activeTheme, setActiveTheme] = useState('ocean');
  const [music, setMusic]     = useState(true);
  const [notif, setNotif]     = useState(true);
  const [font, setFont]       = useState('Nunito');
  const [lang, setLang]       = useState('ru');
  const [volume, setVolume]   = useState(40);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content gap-5">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold text-[var(--nemo-foam)]">Рубка</h1>
        <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">Управление вашим миром</p>
      </div>

      {/* Worlds / Themes */}
      <section className="animate-fade-in stagger-1">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <span>🌍</span> Миры
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t.id)}
              className={`theme-chip glass rounded-2xl p-3 flex flex-col items-center gap-1.5 ${activeTheme === t.id ? 'active' : ''}`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${t.color}30`, border: `1px solid ${t.color}55` }}
              >
                {t.emoji}
              </div>
              <span className="font-body text-[10px] text-[rgba(144,224,239,0.65)] text-center leading-tight">{t.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Sound */}
      <section className="animate-fade-in stagger-2">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <span>🎵</span> Звук
        </h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-[rgba(0,180,216,0.08)]">
          <ToggleRow label="Фоновая музыка" desc="Генерируется через Web Audio API" value={music} onChange={setMusic} />
          <ToggleRow label="Уведомления" desc="Звук новых сообщений" value={notif} onChange={setNotif} />
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div>
              <div className="font-body text-sm text-[var(--nemo-foam)]">Громкость</div>
              <div className="font-body text-xs text-[rgba(144,224,239,0.4)] mt-0.5">{volume}%</div>
            </div>
            <div className="w-36">
              <input
                type="range"
                min={0} max={100}
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="w-full accent-[var(--nemo-cyan)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Font */}
      <section className="animate-fade-in stagger-3">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <span>🔤</span> Шрифт
        </h2>
        <div className="flex flex-wrap gap-2">
          {FONTS.map(f => (
            <button
              key={f}
              onClick={() => setFont(f)}
              className={`rounded-xl px-3.5 py-2 text-sm transition-all duration-200
                ${font === f
                  ? 'btn-ocean'
                  : 'btn-ghost-ocean'
                }`}
              style={{ fontFamily: f }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Language */}
      <section className="animate-fade-in stagger-4">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <span>🌐</span> Язык
        </h2>
        <div className="flex gap-2">
          {LANGS.map(l => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`rounded-xl px-4 py-2.5 text-sm transition-all duration-200
                ${lang === l.id ? 'btn-ocean' : 'btn-ghost-ocean'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section className="animate-fade-in stagger-5">
        <h2 className="font-display font-semibold text-red-400 text-sm mb-3 flex items-center gap-2">
          <Icon name="AlertTriangle" size={13} />
          Опасная зона
        </h2>
        <div className="glass rounded-2xl divide-y divide-[rgba(0,180,216,0.08)]">
          <button className="w-full px-4 py-3.5 text-left flex items-center gap-3 hover:bg-[rgba(255,60,60,0.06)] transition-all">
            <Icon name="Trash2" size={15} className="text-red-400 shrink-0" />
            <span className="font-body text-sm text-red-400">Удалить аккаунт</span>
          </button>
          <button className="w-full px-4 py-3.5 text-left flex items-center gap-3 hover:bg-[rgba(255,60,60,0.06)] transition-all">
            <Icon name="LogOut" size={15} className="text-[rgba(255,120,120,0.7)] shrink-0" />
            <span className="font-body text-sm text-[rgba(255,120,120,0.7)]">Всплыть (выйти)</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function ToggleRow({ label, desc, value, onChange }: {
  label: string; desc: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="px-4 py-3.5 flex items-center justify-between">
      <div>
        <div className="font-body text-sm text-[var(--nemo-foam)]">{label}</div>
        <div className="font-body text-xs text-[rgba(144,224,239,0.4)] mt-0.5">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${value ? 'bg-[var(--nemo-cyan)]' : 'bg-[rgba(6,36,68,0.8)] border border-[rgba(0,180,216,0.2)]'}`}
      >
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${value ? 'left-[calc(100%-22px)]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}
