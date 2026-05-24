import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useApp } from '@/lib/AppContext';
import { t } from '@/lib/i18n';

const BADGES = [
  { label: 'Первая волна',    icon: 'Waves'          },
  { label: '1000 сообщений', icon: 'MessageCircle'  },
  { label: 'Ныряльщик',      icon: 'Anchor'         },
  { label: 'Исследователь',  icon: 'Compass'        },
  { label: '100 дней',       icon: 'Calendar'       },
];

const BG_PRESETS = [
  'linear-gradient(135deg, #041428 0%, #1565c0 50%, #00b4d8 100%)',
  'linear-gradient(135deg, #0d0822 0%, #6366f1 50%, #818cf8 100%)',
  'linear-gradient(135deg, #120008 0%, #ec4899 50%, #f472b6 100%)',
  'linear-gradient(135deg, #011209 0%, #16a34a 50%, #4ade80 100%)',
  'linear-gradient(135deg, #100800 0%, #f59e0b 50%, #fbbf24 100%)',
  'linear-gradient(135deg, #000000 0%, #374151 50%, #6b7280 100%)',
];

export default function ProfilePage() {
  const { lang, theme } = useApp();

  const [editing, setEditing]     = useState(false);
  const [name, setName]           = useState('Капитан Немо');
  const [bio, setBio]             = useState('В поиске точки Немо. Люблю глубины, тишину и бесконечный горизонт.');
  const [handle, setHandle]       = useState('@captain_nemo');
  const [tempName, setTempName]   = useState(name);
  const [tempBio, setTempBio]     = useState(bio);
  const [tempHandle, setTempHandle] = useState(handle);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bgGrad, setBgGrad]       = useState(BG_PRESETS[0]);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [nickColor, setNickColor] = useState(theme.accentColor);
  const avatarRef = useRef<HTMLInputElement>(null);

  const save = () => {
    setName(tempName.trim() || name);
    setBio(tempBio);
    setHandle(tempHandle.trim() || handle);
    setEditing(false);
  };

  const onAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUrl(URL.createObjectURL(file));
    e.target.value = '';
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto scroll-content">
      <input ref={avatarRef} type="file" accept="image/*,video/*" className="hidden" onChange={onAvatarFile} />

      {/* Hero banner */}
      <div className="relative h-52 shrink-0 flex items-end transition-all duration-500" style={{ background: bgGrad }}>
        {/* Mesh overlay */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `radial-gradient(circle at 30% 60%, ${theme.accentColor}80 0%, transparent 50%), radial-gradient(circle at 80% 30%, ${theme.bgMid} 0%, transparent 50%)` }} />

        {/* Background picker button */}
        <button onClick={() => setShowBgPicker(v => !v)}
          className="absolute top-4 right-4 glass rounded-xl px-3 py-1.5 text-xs text-[var(--nemo-foam)] flex items-center gap-1.5 border border-[rgba(255,255,255,0.12)] hover:bg-white/10 transition-all">
          <Icon name="Palette" size={12} />
          Фон
        </button>

        {/* Bg presets picker */}
        {showBgPicker && (
          <div className="absolute top-12 right-4 glass-strong rounded-2xl p-3 flex gap-2 z-10 border border-[rgba(0,180,216,0.2)] animate-fade-in">
            {BG_PRESETS.map((g, i) => (
              <button key={i} onClick={() => { setBgGrad(g); setShowBgPicker(false); }}
                className={`w-8 h-8 rounded-xl flex-shrink-0 transition-all ${bgGrad === g ? 'ring-2 ring-white scale-110' : 'hover:scale-105'}`}
                style={{ background: g }} />
            ))}
          </div>
        )}

        {/* Avatar */}
        <div className="absolute -bottom-10 left-6">
          <div className="relative">
            <div
              onClick={() => avatarRef.current?.click()}
              className="w-20 h-20 rounded-3xl border-2 overflow-hidden cursor-pointer shadow-2xl flex items-center justify-center transition-all hover:scale-105"
              style={{ borderColor: theme.accentColor, boxShadow: `0 0 32px ${theme.accentColor}60` }}
            >
              {avatarUrl ? (
                avatarUrl.includes('video') || avatarUrl.startsWith('blob:') && avatarUrl.endsWith('.mp4')
                  ? <video src={avatarUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  : <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-display font-bold text-[var(--nemo-deep)]"
                  style={{ background: `linear-gradient(135deg, ${theme.accentColor}, #1565c0)` }}>
                  КН
                </div>
              )}
            </div>
            <button onClick={() => avatarRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-[var(--nemo-dark)]"
              style={{ background: theme.accentColor }}>
              <Icon name="Camera" size={12} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-14 px-6 pb-6 space-y-5">
        {/* Name block */}
        <div className="animate-fade-in">
          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">Имя</label>
                <input value={tempName} onChange={e => setTempName(e.target.value)}
                  className="input-ocean w-full rounded-xl px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">Username</label>
                <input value={tempHandle} onChange={e => setTempHandle(e.target.value)}
                  className="input-ocean w-full rounded-xl px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">Цвет ника</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={nickColor} onChange={e => setNickColor(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent" />
                  <span className="font-body text-sm" style={{ color: nickColor }}>{tempName || 'Предпросмотр'}</span>
                </div>
              </div>
              <div>
                <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">О себе</label>
                <textarea value={tempBio} onChange={e => setTempBio(e.target.value)} rows={3}
                  className="input-ocean w-full rounded-xl px-4 py-2.5 text-sm resize-none" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)}
                  className="btn-ghost-ocean flex-1 rounded-xl py-2.5 text-sm flex items-center justify-center gap-2">
                  <Icon name="X" size={14} />
                  {t(lang, 'cancel')}
                </button>
                <button onClick={save}
                  className="btn-ocean flex-1 rounded-xl py-2.5 text-sm flex items-center justify-center gap-2">
                  <Icon name="Check" size={14} />
                  {t(lang, 'save')}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-2xl font-bold truncate" style={{ color: nickColor }}>{name}</h1>
                <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">{handle} · ID: 000001</p>
                <p className="mt-2.5 font-body text-sm text-[rgba(202,240,248,0.65)] leading-relaxed">{bio}</p>
              </div>
              <button onClick={() => { setTempName(name); setTempBio(bio); setTempHandle(handle); setEditing(true); }}
                className="btn-ocean rounded-2xl px-4 py-2 text-sm flex items-center gap-1.5 shrink-0">
                <Icon name="Edit2" size={13} />
                {t(lang, 'edit')}
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in stagger-1">
          {[
            { label: t(lang, 'messages'), val: '1 204', icon: 'MessageSquare' },
            { label: t(lang, 'contacts'), val: '47',    icon: 'Users'         },
            { label: t(lang, 'days'),     val: '312',   icon: 'Calendar'      },
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center border border-[rgba(0,180,216,0.1)]">
              <Icon name={s.icon} size={16} className="mx-auto mb-1.5" style={{ color: theme.accentColor }} />
              <div className="font-display text-xl font-bold" style={{ color: theme.accentColor }}>{s.val}</div>
              <div className="font-body text-xs text-[rgba(144,224,239,0.45)] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="animate-fade-in stagger-2">
          <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
            <Icon name="Award" size={14} style={{ color: theme.accentColor }} />
            {t(lang, 'achievements')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {BADGES.map(b => (
              <span key={b.label} className="glass rounded-xl px-3 py-1.5 text-xs font-body text-[rgba(144,224,239,0.7)] border border-[rgba(0,180,216,0.15)] flex items-center gap-1.5">
                <Icon name={b.icon} size={11} style={{ color: theme.accentColor }} />
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* QR */}
        <div className="animate-fade-in stagger-3">
          <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
            <Icon name="QrCode" size={14} style={{ color: theme.accentColor }} />
            QR-код
          </h2>
          <div className="glass glow-border rounded-3xl p-5 flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 border border-[rgba(0,180,216,0.2)]"
              style={{ background: `${theme.accentColor}12` }}>
              <Icon name="QrCode" size={36} style={{ color: `${theme.accentColor}70` }} />
            </div>
            <div>
              <p className="font-body text-sm text-[rgba(202,240,248,0.65)] leading-relaxed">
                Поделитесь кодом, чтобы друзья нашли вас в Nemo
              </p>
              <button className="btn-ghost-ocean rounded-xl px-4 py-2 text-sm mt-3 flex items-center gap-2">
                <Icon name="Share2" size={13} />
                {t(lang, 'share')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
