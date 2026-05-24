import { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { useApp } from '@/lib/AppContext';
import { t } from '@/lib/i18n';

interface Message {
  id: number;
  out: boolean;
  text?: string;
  voiceUrl?: string;
  voiceDuration?: number;
  videoUrl?: string;
  imageUrl?: string;
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

const nowStr = () => new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });

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
];

const AUTO_REPLIES = ['Понял, спасибо!', 'Отлично!', 'Договорились.', 'Хорошо, принято.', 'Ок!'];

type RecordMode = 'idle' | 'voice' | 'video';

function fmtDur(sec: number) {
  return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`;
}

function VoicePlayer({ url, duration }: { url: string; duration?: number }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dur, setDur]   = useState(duration ?? 0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  return (
    <div className="flex items-center gap-2 py-0.5">
      <audio ref={audioRef} src={url}
        onTimeUpdate={e => { const a = e.currentTarget; setProgress(a.duration ? a.currentTime/a.duration : 0); }}
        onLoadedMetadata={e => setDur(Math.round(e.currentTarget.duration))}
        onEnded={() => { setPlaying(false); setProgress(0); }}
      />
      <button onClick={toggle}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all shrink-0">
        <Icon name={playing ? 'Pause' : 'Play'} size={14} className="text-white" />
      </button>
      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white/70 rounded-full transition-all" style={{ width: `${progress*100}%` }} />
      </div>
      <span className="text-[10px] text-white/50 tabular-nums shrink-0">{fmtDur(Math.round(dur * (1 - progress)))}</span>
    </div>
  );
}

function VideoNote({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  };
  return (
    <div className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group shrink-0" onClick={toggle}>
      <video ref={ref} src={url} loop muted={false} playsInline className="w-full h-full object-cover" />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Icon name="Play" size={22} className="text-white ml-0.5" />
        </div>
      )}
      <div className="absolute inset-0 rounded-full ring-2 ring-white/30 group-hover:ring-white/60 transition-all" />
    </div>
  );
}

export default function ChatsPage() {
  const { lang } = useApp();
  const [chats, setChats]       = useState<Chat[]>(INITIAL_CHATS);
  const [selected, setSelected] = useState<Chat | null>(null);
  const [input, setInput]       = useState('');
  const [search, setSearch]     = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [recordMode, setRecordMode] = useState<RecordMode>('idle');
  const [recordSeconds, setRecordSeconds] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecRef    = useRef<MediaRecorder | null>(null);
  const chunksRef      = useRef<Blob[]>([]);
  const timerRef       = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileRef        = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected?.id, selected?.messages.length, isTyping]);

  const selectChat = (chat: Chat) => {
    const fresh = chats.find(c => c.id === chat.id) ?? chat;
    setSelected(fresh);
    setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
  };

  const pushMessage = useCallback((msg: Message) => {
    setChats(prev => prev.map(c =>
      c.id === selected?.id
        ? { ...c, messages: [...c.messages, msg], msg: msg.text ?? (msg.voiceUrl ? '🎤 Голосовое' : '🎥 Кружочек'), time: msg.time }
        : c
    ));
    setSelected(prev => prev ? { ...prev, messages: [...prev.messages, msg] } : null);
  }, [selected?.id]);

  const autoReply = useCallback(() => {
    if (!selected?.online) return;
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: Date.now() + 1, out: false,
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        time: nowStr(),
      };
      setChats(p => p.map(c => c.id === selected.id ? { ...c, messages: [...c.messages, reply], msg: reply.text!, time: reply.time } : c));
      setSelected(p => p ? { ...p, messages: [...p.messages, reply] } : null);
    }, 1200 + Math.random() * 600);
  }, [selected]);

  const sendText = () => {
    const text = input.trim();
    if (!text || !selected) return;
    const msg: Message = { id: Date.now(), out: true, text, time: nowStr(), status: 'sent' };
    pushMessage(msg);
    setInput('');
    autoReply();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); }
  };

  const startRecording = async (mode: RecordMode) => {
    try {
      const constraints = mode === 'video'
        ? { audio: true, video: { facingMode: 'user', width: 360, height: 360 } }
        : { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const mimeType = mode === 'video'
        ? (MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm')
        : (MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg');
      const rec = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];
      rec.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      rec.start(100);
      mediaRecRef.current = rec;
      setRecordMode(mode);
      setRecordSeconds(0);
      timerRef.current = setInterval(() => setRecordSeconds(s => s + 1), 1000);
    } catch {
      alert('Нет доступа к микрофону/камере');
    }
  };

  const stopRecording = () => {
    const rec = mediaRecRef.current;
    if (!rec) return;
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: rec.mimeType });
      const url  = URL.createObjectURL(blob);
      const isVid = recordMode === 'video';
      const msg: Message = {
        id: Date.now(), out: true, time: nowStr(), status: 'sent',
        ...(isVid ? { videoUrl: url } : { voiceUrl: url, voiceDuration: recordSeconds }),
      };
      pushMessage(msg);
      autoReply();
      rec.stream.getTracks().forEach(t => t.stop());
    };
    rec.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    setRecordMode('idle');
    setRecordSeconds(0);
  };

  const cancelRecording = () => {
    const rec = mediaRecRef.current;
    if (rec) { rec.stream.getTracks().forEach(t => t.stop()); rec.stop(); }
    if (timerRef.current) clearInterval(timerRef.current);
    setRecordMode('idle');
    setRecordSeconds(0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const msg: Message = { id: Date.now(), out: true, imageUrl: url, time: nowStr(), status: 'sent' };
    pushMessage(msg);
    autoReply();
    e.target.value = '';
  };

  const filtered = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 flex overflow-hidden">
      <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleImageUpload} />

      {/* Sidebar */}
      <div className="w-72 shrink-0 flex flex-col border-r border-[rgba(0,180,216,0.1)]">
        <div className="p-3 pb-2 space-y-2">
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.35)]" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={t(lang, 'search')}
              className="input-ocean w-full rounded-xl pl-9 pr-3 py-2.5 text-sm" />
          </div>
          <button className="btn-ocean w-full rounded-xl py-2 text-sm flex items-center justify-center gap-2">
            <Icon name="Plus" size={14} />
            {t(lang, 'newChat')}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scroll-content px-2 pb-4 space-y-0.5">
          {filtered.map((chat, i) => (
            <button key={chat.id} onClick={() => selectChat(chat)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all duration-200 animate-fade-in ${
                selected?.id === chat.id
                  ? 'bg-[rgba(0,180,216,0.18)] border border-[rgba(0,180,216,0.22)]'
                  : 'hover:bg-[rgba(6,36,68,0.55)]'
              }`}
              style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-display font-bold text-[var(--nemo-deep)]"
                  style={{ background: 'linear-gradient(135deg, var(--nemo-cyan), #1565c0)' }}>
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
          {/* Header */}
          <div className="glass-strong border-b border-[rgba(0,180,216,0.1)] px-5 py-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-display font-bold text-[var(--nemo-deep)] shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--nemo-cyan), #1565c0)' }}>
              {selected.initial}
            </div>
            <div className="flex-1">
              <div className="font-body font-semibold text-[var(--nemo-foam)] text-sm">{selected.name}</div>
              <div className="text-xs" style={{ color: selected.online ? 'rgba(34,197,94,0.75)' : 'rgba(144,224,239,0.4)' }}>
                {isTyping ? t(lang, 'typing') : selected.online ? t(lang, 'online') : 'был(а) недавно'}
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scroll-content px-5 py-4 space-y-2.5">
            {selected.messages.map(m => (
              <div key={m.id} className={`flex ${m.out ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                {/* Video note */}
                {m.videoUrl ? (
                  <div className={`flex items-end gap-2 ${m.out ? 'flex-row-reverse' : ''}`}>
                    <VideoNote url={m.videoUrl} />
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[10px] text-[rgba(144,224,239,0.4)]">{m.time}</span>
                      {m.out && <Icon name={m.status === 'read' ? 'CheckCheck' : 'Check'} size={11}
                        className={m.status === 'read' ? 'text-[var(--nemo-cyan)]' : 'text-[rgba(144,224,239,0.4)]'} />}
                    </div>
                  </div>
                ) : (
                  <div className={`max-w-[68%] px-4 py-2.5 ${m.out ? 'msg-out' : 'msg-in'}`}>
                    {/* Image */}
                    {m.imageUrl && (
                      <img src={m.imageUrl} alt="" className="rounded-xl max-w-full mb-1.5" style={{ maxHeight: 220, objectFit: 'cover' }} />
                    )}
                    {/* Voice */}
                    {m.voiceUrl && (
                      <VoicePlayer url={m.voiceUrl} duration={m.voiceDuration} />
                    )}
                    {/* Text */}
                    {m.text && <p className="font-body text-sm text-white leading-relaxed">{m.text}</p>}
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] text-white/40">{m.time}</span>
                      {m.out && <Icon name={m.status === 'read' ? 'CheckCheck' : 'Check'} size={11}
                        className={m.status === 'read' ? 'text-[var(--nemo-cyan)]' : 'text-white/40'} />}
                    </div>
                  </div>
                )}
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

          {/* Input area */}
          <div className="glass-strong border-t border-[rgba(0,180,216,0.1)] px-4 py-3">
            {/* Recording UI */}
            {recordMode !== 'idle' ? (
              <div className="flex items-center gap-3">
                <button onClick={cancelRecording}
                  className="w-9 h-9 rounded-xl bg-[rgba(255,60,60,0.15)] flex items-center justify-center text-red-400 hover:bg-[rgba(255,60,60,0.25)] transition-all">
                  <Icon name="X" size={17} />
                </button>
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 rec-pulse" />
                  <span className="font-body text-sm text-[var(--nemo-foam)]">
                    {recordMode === 'voice' ? t(lang, 'voiceMsg') : t(lang, 'videoNote')} · {fmtDur(recordSeconds)}
                  </span>
                </div>
                <button onClick={stopRecording}
                  className="btn-ocean w-10 h-10 rounded-xl flex items-center justify-center">
                  <Icon name="Send" size={17} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => fileRef.current?.click()} title={t(lang, 'attach')}
                  className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.4)] hover:text-[var(--nemo-foam)] transition-all">
                  <Icon name="Paperclip" size={17} />
                </button>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder="Написать сообщение..."
                  className="input-ocean flex-1 rounded-xl px-4 py-2.5 text-sm" />
                {input.trim() ? (
                  <button onClick={sendText} title={t(lang, 'send')}
                    className="btn-ocean w-9 h-9 rounded-xl flex items-center justify-center">
                    <Icon name="Send" size={16} />
                  </button>
                ) : (
                  <>
                    {/* Voice message */}
                    <button onClick={() => startRecording('voice')} title={t(lang, 'voiceMsg')}
                      className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.4)] hover:text-[var(--nemo-cyan)] transition-all">
                      <Icon name="Mic" size={17} />
                    </button>
                    {/* Video note */}
                    <button onClick={() => startRecording('video')} title={t(lang, 'videoNote')}
                      className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.4)] hover:text-[var(--nemo-cyan)] transition-all">
                      <Icon name="CirclePlay" fallback="PlayCircle" size={17} />
                    </button>
                  </>
                )}
              </div>
            )}
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
