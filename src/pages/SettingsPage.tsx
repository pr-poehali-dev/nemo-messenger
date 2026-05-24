import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useApp } from '@/lib/AppContext';
import { THEMES } from '@/lib/theme';
import { t } from '@/lib/i18n';

const FONTS = ['Nunito', 'Raleway', 'Golos Text', 'IBM Plex Sans', 'Rubik'];

const LANGS = [
  { id: 'ru' as const, label: 'Русский' },
  { id: 'en' as const, label: 'English' },
  { id: 'es' as const, label: 'Español' },
];

export default function SettingsPage() {
  const {
    theme, setThemeId,
    rgb, setRgb,
    lang, setLang,
    musicOn, setMusicOn,
    volume, setVolume,
    notifOn, setNotifOn,
    soundsOn, setSoundsOn,
    font, setFont,
  } = useApp();

  const [showRgb, setShowRgb] = useState(false);
  const [rgbR, setRgbR] = useState(rgb?.r ?? 0);
  const [rgbG, setRgbG] = useState(rgb?.g ?? 180);
  const [rgbB, setRgbB] = useState(rgb?.b ?? 216);

  const applyRgb = () => {
    setRgb({ r: rgbR, g: rgbG, b: rgbB });
    setThemeId('rgb');
  };

  const rgbPreview = `rgb(${rgbR},${rgbG},${rgbB})`;

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content gap-5">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold text-[var(--nemo-foam)]">{t(lang, 'settings')}</h1>
        <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">{t(lang, 'worlds')}</p>
      </div>

      {/* Worlds */}
      <section className="animate-fade-in stagger-1">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <Icon name="Globe" size={14} className="text-[var(--nemo-cyan)]" />
          {t(lang, 'worlds')}
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {THEMES.map(th => (
            <button
              key={th.id}
              onClick={() => { setThemeId(th.id); setShowRgb(false); }}
              className={`theme-chip glass rounded-2xl p-3 flex flex-col items-center gap-1.5 transition-all duration-200 ${theme.id === th.id && !showRgb ? 'active border-[var(--nemo-cyan)] border' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{ background: `${th.accentColor}28`, border: `1px solid ${th.accentColor}50` }}>
                <Icon name={th.icon} size={17} style={{ color: th.accentColor }} />
              </div>
              <span className="font-body text-[10px] text-[rgba(144,224,239,0.6)] text-center leading-tight">
                {lang === 'ru' ? th.name : lang === 'en' ? th.nameEn : th.nameEs}
              </span>
            </button>
          ))}

          {/* RGB chip */}
          <button
            onClick={() => setShowRgb(v => !v)}
            className={`theme-chip glass rounded-2xl p-3 flex flex-col items-center gap-1.5 transition-all duration-200 ${showRgb ? 'active border border-[var(--nemo-cyan)]' : ''}`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: rgbPreview, border: '1px solid rgba(255,255,255,0.2)' }}>
              <Icon name="Palette" size={17} className="text-white drop-shadow" />
            </div>
            <span className="font-body text-[10px] text-[rgba(144,224,239,0.6)] text-center leading-tight">RGB</span>
          </button>
        </div>

        {/* RGB editor */}
        {showRgb && (
          <div className="mt-3 glass rounded-2xl p-4 space-y-3 animate-fade-in border border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl flex-shrink-0 border border-[rgba(255,255,255,0.2)]"
                style={{ background: rgbPreview }} />
              <span className="font-body text-xs text-[var(--nemo-foam)]">{rgbPreview}</span>
              <button onClick={applyRgb} className="btn-ocean rounded-xl px-3 py-1.5 text-xs flex items-center gap-1.5 ml-auto">
                <Icon name="Check" size={12} />
                Применить
              </button>
            </div>
            {[
              { label: 'R', val: rgbR, set: setRgbR, color: '#ef4444' },
              { label: 'G', val: rgbG, set: setRgbG, color: '#22c55e' },
              { label: 'B', val: rgbB, set: setRgbB, color: '#3b82f6' },
            ].map(ch => (
              <div key={ch.label} className="flex items-center gap-3">
                <span className="font-display font-bold text-sm w-4 shrink-0" style={{ color: ch.color }}>{ch.label}</span>
                <input type="range" min={0} max={255} value={ch.val}
                  onChange={e => ch.set(Number(e.target.value))}
                  className="flex-1 cursor-pointer h-2 rounded-full appearance-none"
                  style={{ accentColor: ch.color }} />
                <span className="font-body text-xs text-[rgba(144,224,239,0.5)] w-8 text-right tabular-nums">{ch.val}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sound */}
      <section className="animate-fade-in stagger-2">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <Icon name="Volume2" size={14} className="text-[var(--nemo-cyan)]" />
          {t(lang, 'sound')}
        </h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-[rgba(0,180,216,0.07)]">
          <ToggleRow icon="Music" label={t(lang, 'bgMusic')} desc={musicOn ? 'Играет: ' + (lang === 'ru' ? theme.name : lang === 'en' ? theme.nameEn : theme.nameEs) : 'Выключена'} value={musicOn} onChange={setMusicOn} />
          <ToggleRow icon="Bell" label={t(lang, 'notifications')} desc={t(lang, 'voiceMsg')} value={notifOn} onChange={setNotifOn} />
          <ToggleRow icon="MessageSquare" label={t(lang, 'interfaceSounds')} desc="UI" value={soundsOn} onChange={setSoundsOn} />
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name={volume === 0 ? 'VolumeX' : volume < 50 ? 'Volume1' : 'Volume2'} size={16} className="text-[rgba(144,224,239,0.4)]" />
              <div>
                <div className="font-body text-sm text-[var(--nemo-foam)]">{t(lang, 'volume')}</div>
                <div className="font-body text-xs text-[rgba(144,224,239,0.4)] mt-0.5">{volume}%</div>
              </div>
            </div>
            <input type="range" min={0} max={100} value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="w-32 cursor-pointer accent-[var(--nemo-cyan)]" />
          </div>
        </div>
      </section>

      {/* Font */}
      <section className="animate-fade-in stagger-3">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <Icon name="Type" size={14} className="text-[var(--nemo-cyan)]" />
          {t(lang, 'font')}
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
          {t(lang, 'language')}
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

      {/* Security */}
      <section className="animate-fade-in stagger-5">
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
          <Icon name="Shield" size={14} className="text-[var(--nemo-cyan)]" />
          {t(lang, 'security')}
        </h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-[rgba(0,180,216,0.07)]">
          {[
            { icon: 'Lock',        label: '2FA', desc: 'Защита входа' },
            { icon: 'Eye',         label: 'Приватность профиля', desc: 'Все участники' },
            { icon: 'Fingerprint', label: 'Активные сессии', desc: '1 устройство' },
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

      {/* Danger */}
      <section>
        <h2 className="font-display font-semibold text-red-400/80 text-sm mb-3 flex items-center gap-2">
          <Icon name="AlertTriangle" size={13} />
          {t(lang, 'dangerZone')}
        </h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-[rgba(0,180,216,0.07)]">
          <button className="w-full px-4 py-3.5 text-left flex items-center gap-3 hover:bg-[rgba(255,60,60,0.05)] transition-all">
            <Icon name="Trash2" size={15} className="text-red-400 shrink-0" />
            <span className="font-body text-sm text-red-400">{t(lang, 'deleteAccount')}</span>
          </button>
          <button className="w-full px-4 py-3.5 text-left flex items-center gap-3 hover:bg-[rgba(255,60,60,0.05)] transition-all">
            <Icon name="LogOut" size={15} className="text-red-400/70 shrink-0" />
            <span className="font-body text-sm text-red-400/70">{t(lang, 'logout')}</span>
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
