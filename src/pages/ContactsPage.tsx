import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Contact {
  id: number;
  name: string;
  initial: string;
  handle: string;
  status: string;
  online: boolean;
}

const CONTACTS: Contact[] = [
  { id: 1, name: 'Алекс Прибой',   initial: 'АП', handle: '@alex_wave',   status: 'В открытом море',      online: true  },
  { id: 2, name: 'Арина Волкова',  initial: 'АВ', handle: '@arina_v',    status: 'Ловлю закат',           online: true  },
  { id: 3, name: 'Дмитрий Море',   initial: 'ДМ', handle: '@dmitry_sea', status: 'Под водой — без связи', online: false },
  { id: 4, name: 'Елена Глубина',  initial: 'ЕГ', handle: '@elena_deep', status: 'Слушаю тишину',         online: false },
  { id: 5, name: 'Иван Горизонт',  initial: 'ИГ', handle: '@ivan_hor',   status: 'На поверхности',        online: true  },
  { id: 6, name: 'Команда Nemo',   initial: 'КН', handle: '@nemo_team',  status: 'Всегда в сети',         online: true  },
  { id: 7, name: 'Маша Коралл',    initial: 'МК', handle: '@masha_cor',  status: 'Изучаю рифы',           online: false },
  { id: 8, name: 'Северный полюс', initial: 'СП', handle: '@north_pole', status: 'Недоступен',            online: false },
];

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Contact | null>(null);

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.handle.includes(search.toLowerCase())
  );
  const online  = filtered.filter(c => c.online);
  const offline = filtered.filter(c => !c.online);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Contact profile drawer */}
      {selected && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="glass-strong rounded-3xl p-6 w-80 border border-[rgba(0,180,216,0.2)] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-display font-bold text-[var(--nemo-deep)]"
                style={{ background: 'linear-gradient(135deg, #00b4d8, #1565c0)', boxShadow: '0 0 32px rgba(0,180,216,0.4)' }}>
                {selected.initial}
              </div>
              <div className="text-center">
                <h3 className="font-display font-bold text-[var(--nemo-foam)] text-lg">{selected.name}</h3>
                <div className="font-body text-sm text-[rgba(144,224,239,0.5)] mt-0.5">{selected.handle}</div>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {selected.online
                    ? <><div className="online-dot" /><span className="text-xs text-green-400">в сети</span></>
                    : <span className="text-xs text-[rgba(144,224,239,0.4)]">{selected.status}</span>
                  }
                </div>
              </div>
              <div className="flex gap-3 w-full">
                <button className="btn-ghost-ocean flex-1 rounded-2xl py-2.5 text-sm flex items-center justify-center gap-2">
                  <Icon name="MessageCircle" size={15} />
                  Написать
                </button>
                <button className="btn-ocean flex-1 rounded-2xl py-2.5 text-sm flex items-center justify-center gap-2">
                  <Icon name="Phone" size={15} />
                  Позвонить
                </button>
              </div>
              <div className="flex gap-2 w-full">
                <button className="btn-ghost-ocean flex-1 rounded-xl py-2 text-sm flex items-center justify-center gap-2 text-[rgba(144,224,239,0.55)]">
                  <Icon name="Video" size={14} />
                  Видео
                </button>
                <button className="btn-ghost-ocean flex-1 rounded-xl py-2 text-sm flex items-center justify-center gap-2 text-[rgba(144,224,239,0.55)]">
                  <Icon name="UserMinus" size={14} />
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 animate-fade-in">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--nemo-foam)]">Контакты</h1>
            <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">{CONTACTS.length} участников экипажа</p>
          </div>
          <button className="btn-ocean rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2">
            <Icon name="UserPlus" size={15} />
            Добавить
          </button>
        </div>

        <div className="relative mb-4 animate-fade-in stagger-1">
          <Icon name="Search" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.35)]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Найти в экипаже..."
            className="input-ocean w-full rounded-2xl pl-10 pr-4 py-3 text-sm"
          />
        </div>

        {online.length > 0 && (
          <div className="mb-4 animate-fade-in stagger-2">
            <div className="flex items-center gap-2 px-1 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--nemo-online)]" />
              <span className="font-display text-xs font-semibold text-[rgba(34,197,94,0.65)] uppercase tracking-wider">
                В сети · {online.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {online.map(c => <ContactCard key={c.id} contact={c} onSelect={setSelected} />)}
            </div>
          </div>
        )}

        {offline.length > 0 && (
          <div className="animate-fade-in stagger-3">
            <div className="flex items-center gap-2 px-1 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[rgba(144,224,239,0.25)]" />
              <span className="font-display text-xs font-semibold text-[rgba(144,224,239,0.35)] uppercase tracking-wider">
                Не в сети · {offline.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {offline.map(c => <ContactCard key={c.id} contact={c} onSelect={setSelected} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactCard({ contact, onSelect }: { contact: Contact; onSelect: (c: Contact) => void }) {
  return (
    <div
      className="glass rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-[rgba(0,180,216,0.08)] transition-all duration-200 cursor-pointer"
      onClick={() => onSelect(contact)}
    >
      <div className="relative shrink-0">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-display font-bold text-[var(--nemo-deep)]"
          style={{ background: 'linear-gradient(135deg, #00b4d8, #1565c0)' }}>
          {contact.initial}
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
        <button onClick={e => { e.stopPropagation(); }}
          className="w-8 h-8 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.35)] hover:text-[var(--nemo-cyan)] transition-all" title="Написать">
          <Icon name="MessageCircle" size={15} />
        </button>
        <button onClick={e => { e.stopPropagation(); }}
          className="w-8 h-8 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.35)] hover:text-[var(--nemo-cyan)] transition-all" title="Позвонить">
          <Icon name="Phone" size={15} />
        </button>
      </div>
    </div>
  );
}
