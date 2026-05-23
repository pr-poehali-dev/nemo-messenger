import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CHATS = [
  { id: 1, name: 'Арина Волкова',   avatar: '🦋', msg: 'Видела закат сегодня? Просто невероятно!', time: '14:23', unread: 3, online: true  },
  { id: 2, name: 'Команда Nemo',    avatar: '🌊', msg: 'Обновление 2.1 готово к релизу',          time: '12:40', unread: 0, online: true  },
  { id: 3, name: 'Дмитрий Море',    avatar: '🐋', msg: 'Встретимся у маяка?',                     time: '11:05', unread: 1, online: false },
  { id: 4, name: 'Лена Глубина',    avatar: '🐚', msg: 'Отправила документы',                     time: 'вчера', unread: 0, online: false },
  { id: 5, name: 'Алекс Прибой',    avatar: '🏄', msg: 'Голосовое сообщение · 0:43',              time: 'вчера', unread: 0, online: true  },
  { id: 6, name: 'Северный полюс',  avatar: '❄️', msg: 'Ты: Завтра!',                             time: 'Пн',    unread: 0, online: false },
];

const MESSAGES = [
  { id: 1, out: false, text: 'Видела закат сегодня? Просто невероятно! 🌅', time: '14:20' },
  { id: 2, out: true,  text: 'Да! Как будто небо тоже решило стать океаном',  time: '14:21' },
  { id: 3, out: false, text: 'Именно 💙 Интересно, видят ли его на точке Немо',        time: '14:22' },
  { id: 4, out: true,  text: 'Там в 2700 км от любой суши… наверное, там закаты вечны', time: '14:22' },
  { id: 5, out: false, text: 'Хочу туда 🌊', time: '14:23' },
];

export default function ChatsPage() {
  const [selected, setSelected] = useState<typeof CHATS[0] | null>(null);
  const [input, setInput] = useState('');

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Chat list */}
      <div className="w-72 shrink-0 flex flex-col border-r border-[rgba(0,180,216,0.1)]">
        {/* Search */}
        <div className="p-4 pb-3">
          <div className="relative">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.35)]" />
            <input
              placeholder="Поиск в глубинах..."
              className="input-ocean w-full rounded-xl pl-9 pr-3 py-2.5 text-sm"
            />
          </div>
        </div>

        {/* Chats */}
        <div className="flex-1 overflow-y-auto scroll-content px-2 pb-4 space-y-1">
          {CHATS.map((chat, i) => (
            <button
              key={chat.id}
              onClick={() => setSelected(chat)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left
                transition-all duration-200 animate-fade-in stagger-${Math.min(i + 1, 5)}
                ${selected?.id === chat.id
                  ? 'bg-[rgba(0,180,216,0.18)] border border-[rgba(0,180,216,0.25)]'
                  : 'hover:bg-[rgba(6,36,68,0.6)]'
                }
              `}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-2xl glass flex items-center justify-center text-xl border border-[rgba(0,180,216,0.15)]">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 online-dot" />
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-body font-semibold text-[var(--nemo-foam)] text-sm truncate">{chat.name}</span>
                  <span className="text-[10px] text-[rgba(144,224,239,0.35)] shrink-0 ml-1">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[rgba(144,224,239,0.45)] truncate">{chat.msg}</span>
                  {chat.unread > 0 && (
                    <span className="ml-1 shrink-0 min-w-[18px] h-[18px] rounded-full bg-[var(--nemo-cyan)] text-[10px] font-bold text-[var(--nemo-deep)] flex items-center justify-center px-1">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {selected ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="glass-strong border-b border-[rgba(0,180,216,0.1)] px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-lg border border-[rgba(0,180,216,0.15)]">
              {selected.avatar}
            </div>
            <div>
              <div className="font-body font-semibold text-[var(--nemo-foam)] text-sm">{selected.name}</div>
              <div className="text-xs text-[rgba(34,197,94,0.7)]">{selected.online ? 'в сети' : 'был(а) недавно'}</div>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.45)] hover:text-[var(--nemo-foam)] transition-all">
                <Icon name="Phone" size={16} />
              </button>
              <button className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.45)] hover:text-[var(--nemo-foam)] transition-all">
                <Icon name="Video" size={16} />
              </button>
              <button className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.45)] hover:text-[var(--nemo-foam)] transition-all">
                <Icon name="Search" size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scroll-content px-5 py-4 space-y-3">
            {MESSAGES.map(m => (
              <div key={m.id} className={`flex ${m.out ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[68%] px-4 py-2.5 ${m.out ? 'msg-out' : 'msg-in'}`}>
                  <p className="font-body text-sm text-white leading-relaxed">{m.text}</p>
                  <p className="text-[10px] text-[rgba(255,255,255,0.45)] mt-1 text-right">{m.time}</p>
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            <div className="flex justify-start">
              <div className="msg-in px-4 py-3 flex gap-1 items-center">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[var(--nemo-cyan)] opacity-60"
                    style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="glass-strong border-t border-[rgba(0,180,216,0.1)] px-4 py-3 flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.4)] hover:text-[var(--nemo-foam)] transition-all">
              <Icon name="Paperclip" size={17} />
            </button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Напишите сообщение..."
              className="input-ocean flex-1 rounded-xl px-4 py-2.5 text-sm"
            />
            <button className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.4)] hover:text-[var(--nemo-foam)] transition-all">
              <Icon name="Smile" size={17} />
            </button>
            <button
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                input.trim() ? 'btn-ocean text-white' : 'bg-[rgba(6,36,68,0.6)] text-[rgba(144,224,239,0.25)]'
              }`}
            >
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-6xl opacity-30 animate-float">🌊</div>
          <div>
            <h3 className="font-display text-[var(--nemo-foam)] text-lg font-semibold opacity-50">
              Выберите разговор
            </h3>
            <p className="font-body text-[rgba(144,224,239,0.3)] text-sm mt-1">
              или начните новый из глубины
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
