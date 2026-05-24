import { useState } from 'react';
import Icon from '@/components/ui/icon';

const BADGES = [
  { label: 'Первая волна',    icon: 'Waves'      },
  { label: '1000 сообщений', icon: 'MessageCircle' },
  { label: 'Ныряльщик',      icon: 'Anchor'     },
  { label: 'Исследователь',  icon: 'Compass'    },
];

export default function ProfilePage() {
  const [editing, setEditing]   = useState(false);
  const [name, setName]         = useState('Капитан Немо');
  const [bio, setBio]           = useState('В поиске точки Немо. Люблю глубины, тишину и бесконечный горизонт.');
  const [tempName, setTempName] = useState(name);
  const [tempBio, setTempBio]   = useState(bio);

  const save = () => {
    setName(tempName);
    setBio(tempBio);
    setEditing(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto scroll-content">
      {/* Hero */}
      <div className="relative h-48 shrink-0 flex items-end"
        style={{ background: 'linear-gradient(135deg, #041428 0%, #1565c0 50%, #00b4d8 100%)' }}>
        <div className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, rgba(0,180,216,0.7) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(21,101,192,0.9) 0%, transparent 50%)' }} />
        <button className="absolute top-4 right-4 glass rounded-xl px-3 py-1.5 text-xs text-[var(--nemo-foam)] flex items-center gap-1.5 border border-[rgba(255,255,255,0.12)]">
          <Icon name="Palette" size={12} />
          Изменить фон
        </button>
        <div className="absolute -bottom-9 left-6 w-20 h-20 rounded-3xl border-2 border-[var(--nemo-cyan)] flex items-center justify-center text-2xl font-display font-bold text-[var(--nemo-deep)] shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #00b4d8, #1565c0)', boxShadow: '0 0 32px rgba(0,180,216,0.5)' }}>
          КН
        </div>
      </div>

      <div className="pt-12 px-6 pb-6 space-y-5">
        {/* Name + bio */}
        <div className="animate-fade-in">
          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">Имя</label>
                <input value={tempName} onChange={e => setTempName(e.target.value)}
                  className="input-ocean w-full rounded-xl px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="font-body text-xs text-[rgba(144,224,239,0.55)] mb-1.5 block">О себе</label>
                <textarea value={tempBio} onChange={e => setTempBio(e.target.value)} rows={3}
                  className="input-ocean w-full rounded-xl px-4 py-2.5 text-sm resize-none" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="btn-ghost-ocean flex-1 rounded-xl py-2.5 text-sm flex items-center justify-center gap-2">
                  <Icon name="X" size={14} />
                  Отмена
                </button>
                <button onClick={save} className="btn-ocean flex-1 rounded-xl py-2.5 text-sm flex items-center justify-center gap-2">
                  <Icon name="Check" size={14} />
                  Сохранить
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <h1 className="font-display text-2xl font-bold text-[var(--nemo-cyan)]">{name}</h1>
                <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">@captain_nemo · ID: 000001</p>
                <p className="mt-3 font-body text-sm text-[rgba(202,240,248,0.65)] leading-relaxed">{bio}</p>
              </div>
              <button onClick={() => { setTempName(name); setTempBio(bio); setEditing(true); }}
                className="btn-ocean rounded-2xl px-4 py-2 text-sm flex items-center gap-1.5 ml-4 shrink-0">
                <Icon name="Edit2" size={13} />
                Изменить
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in stagger-1">
          {[
            { label: 'Сообщений', val: '1 204', icon: 'MessageSquare' },
            { label: 'Контактов', val: '47',    icon: 'Users'         },
            { label: 'Дней',      val: '312',   icon: 'Calendar'      },
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center border border-[rgba(0,180,216,0.1)]">
              <Icon name={s.icon} size={16} className="text-[var(--nemo-cyan)] mx-auto mb-1.5" />
              <div className="font-display text-xl font-bold text-[var(--nemo-cyan)]">{s.val}</div>
              <div className="font-body text-xs text-[rgba(144,224,239,0.45)] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="animate-fade-in stagger-2">
          <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
            <Icon name="Award" size={14} className="text-[var(--nemo-cyan)]" />
            Достижения
          </h2>
          <div className="flex flex-wrap gap-2">
            {BADGES.map(b => (
              <span key={b.label} className="glass rounded-xl px-3 py-1.5 text-xs font-body text-[rgba(144,224,239,0.7)] border border-[rgba(0,180,216,0.15)] flex items-center gap-1.5">
                <Icon name={b.icon} size={11} className="text-[var(--nemo-cyan)]" />
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* QR */}
        <div className="animate-fade-in stagger-3">
          <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 flex items-center gap-2">
            <Icon name="QrCode" size={14} className="text-[var(--nemo-cyan)]" />
            QR-код
          </h2>
          <div className="glass glow-border rounded-3xl p-5 flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 border border-[rgba(0,180,216,0.2)]"
              style={{ background: 'rgba(0,180,216,0.08)' }}>
              <Icon name="QrCode" size={36} className="text-[rgba(0,180,216,0.5)]" />
            </div>
            <div>
              <p className="font-body text-sm text-[rgba(202,240,248,0.65)] leading-relaxed">
                Поделитесь QR-кодом, чтобы друзья нашли вас в Nemo
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
