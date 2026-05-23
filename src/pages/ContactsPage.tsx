import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CONTACTS = [
  { id: 1, name: 'Алекс Прибой',    avatar: '🏄', handle: '@alex_wave',    status: 'В открытом море',      online: true  },
  { id: 2, name: 'Арина Волкова',   avatar: '🦋', handle: '@arina_v',     status: 'Ловлю закат',           online: true  },
  { id: 3, name: 'Дмитрий Море',    avatar: '🐋', handle: '@dmitry_sea',  status: 'Под водой — без связи', online: false },
  { id: 4, name: 'Елена Глубина',   avatar: '🐚', handle: '@elena_deep',  status: 'Слушаю тишину',         online: false },
  { id: 5, name: 'Иван Горизонт',   avatar: '🌅', handle: '@ivan_hor',    status: 'На поверхности',        online: true  },
  { id: 6, name: 'Команда Nemo',    avatar: '🌊', handle: '@nemo_team',   status: 'Всегда в сети',         online: true  },
  { id: 7, name: 'Маша Коралл',     avatar: '🪸', handle: '@masha_coral', status: 'Изучаю рифы',           online: false },
  { id: 8, name: 'Северный полюс',  avatar: '❄️', handle: '@north_pole',  status: 'Замёрзла',              online: false },
];

export default function ContactsPage() {
  const [search, setSearch] = useState('');

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.handle.includes(search.toLowerCase())
  );

  const online  = filtered.filter(c => c.online);
  const offline = filtered.filter(c => !c.online);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--nemo-foam)]">Контакты</h1>
          <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">{CONTACTS.length} участников экипажа</p>
        </div>
        <button className="btn-ocean rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2">
          <Icon name="UserPlus" size={15} />
          Добавить
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 animate-fade-in stagger-1">
        <Icon name="Search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.35)]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Найти в экипаже..."
          className="input-ocean w-full rounded-2xl pl-10 pr-4 py-3 text-sm"
        />
      </div>

      {/* Online */}
      {online.length > 0 && (
        <div className="mb-4 animate-fade-in stagger-2">
          <div className="flex items-center gap-2 px-1 mb-2">
            <div className="w-2 h-2 rounded-full bg-[var(--nemo-online)]" />
            <span className="font-display text-xs font-semibold text-[rgba(34,197,94,0.7)] uppercase tracking-wider">
              В сети · {online.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {online.map(c => <ContactCard key={c.id} contact={c} />)}
          </div>
        </div>
      )}

      {/* Offline */}
      {offline.length > 0 && (
        <div className="animate-fade-in stagger-3">
          <div className="flex items-center gap-2 px-1 mb-2">
            <div className="w-2 h-2 rounded-full bg-[rgba(144,224,239,0.3)]" />
            <span className="font-display text-xs font-semibold text-[rgba(144,224,239,0.4)] uppercase tracking-wider">
              Не в сети · {offline.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {offline.map(c => <ContactCard key={c.id} contact={c} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function ContactCard({ contact }: { contact: typeof CONTACTS[0] }) {
  return (
    <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-[rgba(0,180,216,0.08)] transition-all duration-200">
      <div className="relative shrink-0">
        <div className="w-11 h-11 rounded-2xl glass flex items-center justify-center text-xl border border-[rgba(0,180,216,0.15)]">
          {contact.avatar}
        </div>
        {contact.online && <div className="absolute -bottom-0.5 -right-0.5 online-dot" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-body font-semibold text-[var(--nemo-foam)] text-sm">{contact.name}</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs text-[rgba(144,224,239,0.4)]">{contact.handle}</span>
          <span className="text-[rgba(144,224,239,0.2)]">·</span>
          <span className="text-xs text-[rgba(144,224,239,0.35)] truncate">{contact.status}</span>
        </div>
      </div>
      <div className="flex gap-1 shrink-0">
        <button className="w-8 h-8 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.35)] hover:text-[var(--nemo-cyan)] transition-all">
          <Icon name="MessageCircle" size={15} />
        </button>
        <button className="w-8 h-8 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.35)] hover:text-[var(--nemo-cyan)] transition-all">
          <Icon name="Phone" size={15} />
        </button>
      </div>
    </div>
  );
}
