import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  out: boolean;
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface Chat {
  id: number;
  name: string;
  initial: string;
  msg: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

const now = () => new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });

const INITIAL_CHATS: Chat[] = [
  {
    id: 1, name: 'Арина Волкова', initial: 'АВ', msg: 'Видела закат сегодня?', time: '14:23', unread: 3, online: true,
    messages: [
      { id: 1, out: false, text: 'Видела закат сегодня? Просто невероятно!', time: '14:20' },
      { id: 2, out: true,  text: 'Да! Как будто небо стало океаном', time: '14:21', status: 'read' },
      { id: 3, out: false, text: 'Интересно, видят ли его на точке Немо', time: '14:22' },
      { id: 4, out: true,  text: 'Там 2700 км от суши — закаты вечны', time: '14:22', status: 'read' },
      { id: 5, out: false, text: 'Хочу туда', time: '14:23' },
    ],
  },
  {
    id: 2, name: 'Команда Nemo', initial: 'КН', msg: 'Обновление 2.1 готово', time: '12:40', unread: 0, online: true,
    messages: [
      { id: 1, out: false, text: 'Обновление 2.1 готово к релизу', time: '12:40' },
      { id: 2, out: true,  text: 'Отлично, выпускаем', time: '12:41', status: 'delivered' },
    ],
  },
  {
    id: 3, name: 'Дмитрий Море', initial: 'ДМ', msg: 'Встретимся у маяка?', time: '11:05', unread: 1, online: false,
    messages: [{ id: 1, out: false, text: 'Встретимся у маяка?', time: '11:05' }],
  },
  {
    id: 4, name: 'Лена Глубина', initial: 'ЛГ', msg: 'Отправила документы', time: 'вчера', unread: 0, online: false,
    messages: [
      { id: 1, out: false, text: 'Отправила документы', time: 'вчера' },
      { id: 2, out: true,  text: 'Получил, спасибо!', time: 'вчера', status: 'read' },
    ],
  },
  {
    id: 5, name: 'Алекс Прибой', initial: 'АП', msg: 'Голосовое · 0:43', time: 'вчера', unread: 0, online: true,
    messages: [{ id: 1, out: false, text: 'Привет! Как дела?', time: 'вчера' }],
  },
];

const AUTO_REPLIES = [
  'Понял, спасибо!', 'Отлично!', 'Договорились.', 'Скоро отвечу подробнее.', 'Согласен полностью.', 'Хорошо, принято.', 'Ок!'
];

export default function ChatsPage() {
  const [chats, setChats]       = useState<Chat[]>(INITIAL_CHATS);
  const [selected, setSelected] = useState<Chat | null>(null);
  const [input, setInput]       = useState('');
  const [search, setSearch]     = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef           = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected?.id, selected?.messages.length, isTyping]);

  const selectChat = (chat: Chat) => {
    const fresh = chats.find(c => c.id === chat.id) ?? chat;
    setSelected(fresh);
    setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || !selected) return;

    const msg: Message = { id: Date.now(), out: true, text, time: now(), status: 'sent' };

    setChats(prev => prev.map(c =>
      c.id === selected.id ? { ...c, messages: [...c.messages, msg], msg: text, time: now() } : c
    ));
    setSelected(prev => prev ? { ...prev, messages: [...prev.messages, msg] } : null);
    setInput('');

    if (selected.online) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply: Message = {
          id: Date.now() + 1, out: false,
          text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
          time: now(),
        };
        setChats(p => p.map(c =>
          c.id === selected.id ? { ...c, messages: [...c.messages, reply], msg: reply.text, time: now() } : c
        ));
        setSelected(p => p ? { ...p, messages: [...p.messages, reply] } : null);
      }, 1200 + Math.random() * 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const filtered = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 shrink-0 flex flex-col border-r border-[rgba(0,180,216,0.1)]">
        <div className="p-3 pb-2 space-y-2">
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.35)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск чатов..."
              className="input-ocean w-full rounded-xl pl-9 pr-3 py-2.5 text-sm"
            />
          </div>
          <button className="btn-ocean w-full rounded-xl py-2 text-sm flex items-center justify-center gap-2">
            <Icon name="Plus" size={14} />
            Новый чат
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scroll-content px-2 pb-4 space-y-0.5">
          {filtered.map((chat, i) => (
            <button
              key={chat.id}
              onClick={() => selectChat(chat)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all duration-200 animate-fade-in ${
                selected?.id === chat.id
                  ? 'bg-[rgba(0,180,216,0.18)] border border-[rgba(0,180,216,0.22)]'
                  : 'hover:bg-[rgba(6,36,68,0.55)]'
              }`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-display font-bold text-[var(--nemo-deep)]"
                  style={{ background: 'linear-gradient(135deg, #00b4d8, #1565c0)' }}>
                  {chat.initial}
                </div>
                {chat.online && <div className="absolute -bottom-0.5 -right-0.5 online-dot" />}
              </div>
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
          <div className="glass-strong border-b border-[rgba(0,180,216,0.1)] px-5 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-display font-bold text-[var(--nemo-deep)] shrink-0"
              style={{ background: 'linear-gradient(135deg, #00b4d8, #1565c0)' }}>
              {selected.initial}
            </div>
            <div className="flex-1">
              <div className="font-body font-semibold text-[var(--nemo-foam)] text-sm">{selected.name}</div>
              <div className="text-xs" style={{ color: selected.online ? 'rgba(34,197,94,0.75)' : 'rgba(144,224,239,0.4)' }}>
                {isTyping ? 'печатает...' : selected.online ? 'в сети' : 'был(а) недавно'}
              </div>
            </div>
            <div className="flex gap-1">
              {[
                { icon: 'Phone', label: 'Позвонить' },
                { icon: 'Video', label: 'Видеозвонок' },
                { icon: 'Search', label: 'Поиск' },
                { icon: 'MoreVertical', label: 'Ещё' },
              ].map(btn => (
                <button key={btn.icon} title={btn.label}
                  className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.4)] hover:text-[var(--nemo-foam)] transition-all">
                  <Icon name={btn.icon} size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scroll-content px-5 py-4 space-y-2.5">
            {selected.messages.map(m => (
              <div key={m.id} className={`flex ${m.out ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[68%] px-4 py-2.5 ${m.out ? 'msg-out' : 'msg-in'}`}>
                  <p className="font-body text-sm text-white leading-relaxed">{m.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-white/40">{m.time}</span>
                    {m.out && (
                      <Icon name={m.status === 'read' ? 'CheckCheck' : 'Check'} size={11}
                        className={m.status === 'read' ? 'text-[var(--nemo-cyan)]' : 'text-white/40'} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="msg-in px-4 py-3 flex gap-1 items-center">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--nemo-cyan)]"
                      style={{ animation: `bounce 1.1s ${i*0.18}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="glass-strong border-t border-[rgba(0,180,216,0.1)] px-4 py-3 flex items-center gap-2">
            {[
              { icon: 'Paperclip', label: 'Прикрепить' },
              { icon: 'Image', label: 'Фото' },
            ].map(btn => (
              <button key={btn.icon} title={btn.label}
                className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.4)] hover:text-[var(--nemo-foam)] transition-all">
                <Icon name={btn.icon} size={17} />
              </button>
            ))}
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Написать сообщение..."
              className="input-ocean flex-1 rounded-xl px-4 py-2.5 text-sm"
            />
            <button title="Микрофон"
              className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.4)] hover:text-[var(--nemo-foam)] transition-all">
              <Icon name="Mic" size={17} />
            </button>
            <button onClick={sendMessage} disabled={!input.trim()} title="Отправить"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                input.trim() ? 'btn-ocean' : 'bg-[rgba(6,36,68,0.6)] text-[rgba(144,224,239,0.2)] cursor-default'
              }`}>
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
          <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center border border-[rgba(0,180,216,0.2)]">
            <Icon name="MessageCircle" size={28} className="text-[rgba(0,180,216,0.4)]" />
          </div>
          <div>
            <h3 className="font-display text-[var(--nemo-foam)] text-base font-semibold opacity-50">Выберите разговор</h3>
            <p className="font-body text-[rgba(144,224,239,0.3)] text-sm mt-1">или начните новый</p>
          </div>
        </div>
      )}
    </div>
  );
}
