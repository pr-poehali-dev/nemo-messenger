import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface CallEntry {
  id: number;
  name: string;
  initial: string;
  type: 'incoming' | 'outgoing' | 'video';
  missed: boolean;
  time: string;
  duration: string;
  online: boolean;
}

const CALLS: CallEntry[] = [
  { id: 1, name: 'Арина Волкова',  initial: 'АВ', type: 'incoming', missed: false, time: '14:23', duration: '4:32', online: true  },
  { id: 2, name: 'Дмитрий Море',   initial: 'ДМ', type: 'outgoing', missed: false, time: '11:05', duration: '1:12', online: false },
  { id: 3, name: 'Алекс Прибой',   initial: 'АП', type: 'incoming', missed: true,  time: 'вчера', duration: '',     online: true  },
  { id: 4, name: 'Лена Глубина',   initial: 'ЛГ', type: 'video',    missed: false, time: 'вчера', duration: '8:15', online: false },
  { id: 5, name: 'Команда Nemo',   initial: 'КН', type: 'outgoing', missed: false, time: 'Пн',    duration: '23:04',online: true  },
  { id: 6, name: 'Северный полюс', initial: 'СП', type: 'incoming', missed: true,  time: 'Вс',    duration: '',     online: false },
];

export default function CallsPage() {
  const [activeCall, setActiveCall] = useState<CallEntry | null>(null);
  const [muted, setMuted]     = useState(false);
  const [camOff, setCamOff]   = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const startCall = (c: CallEntry) => {
    setActiveCall(c);
    setElapsed(0);
    const timer = setInterval(() => setElapsed(p => p + 1), 1000);
    return () => clearInterval(timer);
  };

  const endCall = () => { setActiveCall(null); setMuted(false); setCamOff(false); setElapsed(0); };

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content">
      {/* Active call overlay */}
      {activeCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="glass-strong rounded-3xl p-8 w-80 flex flex-col items-center gap-5 border border-[rgba(0,180,216,0.25)]">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-display font-bold text-[var(--nemo-deep)]"
              style={{ background: 'linear-gradient(135deg, #00b4d8, #1565c0)', boxShadow: '0 0 40px rgba(0,180,216,0.4)' }}>
              {activeCall.initial}
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-[var(--nemo-foam)] text-xl">{activeCall.name}</div>
              <div className="font-body text-[var(--nemo-cyan)] text-sm mt-1 tabular-nums">{fmt(elapsed)}</div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setMuted(!muted)}
                className={`w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${muted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'glass text-[var(--nemo-foam)] border border-[rgba(0,180,216,0.15)]'}`}
                title={muted ? 'Включить микрофон' : 'Выключить микрофон'}>
                <Icon name={muted ? 'MicOff' : 'Mic'} size={20} />
              </button>
              {activeCall.type === 'video' && (
                <button onClick={() => setCamOff(!camOff)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${camOff ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'glass text-[var(--nemo-foam)] border border-[rgba(0,180,216,0.15)]'}`}
                  title={camOff ? 'Включить камеру' : 'Выключить камеру'}>
                  <Icon name={camOff ? 'VideoOff' : 'Video'} size={20} />
                </button>
              )}
              <button onClick={endCall}
                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-all"
                title="Завершить">
                <Icon name="PhoneOff" size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--nemo-foam)]">Звонки</h1>
          <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">История соединений</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => startCall({ id: 0, name: 'Новый звонок', initial: '?', type: 'incoming', missed: false, time: '', duration: '', online: true })}
            className="btn-ghost-ocean rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2">
            <Icon name="Phone" size={15} />
            Аудио
          </button>
          <button
            onClick={() => startCall({ id: 0, name: 'Видеозвонок', initial: '?', type: 'video', missed: false, time: '', duration: '', online: true })}
            className="btn-ocean rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2">
            <Icon name="Video" size={15} />
            Видео
          </button>
        </div>
      </div>

      {/* Call history */}
      <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 px-1 animate-fade-in stagger-1 flex items-center gap-2">
        <Icon name="ClockRewind" fallback="Clock" size={14} className="text-[var(--nemo-cyan)]" />
        История
      </h2>
      <div className="space-y-2">
        {CALLS.map((call, i) => (
          <div key={call.id}
            className={`glass rounded-2xl px-4 py-3.5 flex items-center gap-3 animate-fade-in`}
            style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-display font-bold text-[var(--nemo-deep)]"
                style={{ background: 'linear-gradient(135deg, #00b4d8, #1565c0)' }}>
                {call.initial}
              </div>
              {call.online && <div className="absolute -bottom-0.5 -right-0.5 online-dot" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-body font-semibold text-[var(--nemo-foam)] text-sm">{call.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon
                  name={call.missed ? 'PhoneMissed' : call.type === 'incoming' ? 'PhoneIncoming' : call.type === 'video' ? 'Video' : 'PhoneOutgoing'}
                  size={12}
                  className={call.missed ? 'text-red-400' : 'text-[var(--nemo-cyan)]'}
                />
                <span className={`text-xs ${call.missed ? 'text-red-400' : 'text-[rgba(144,224,239,0.5)]'}`}>
                  {call.missed ? 'Пропущен' : call.type === 'incoming' ? 'Входящий' : call.type === 'video' ? 'Видео' : 'Исходящий'}
                  {call.duration && ` · ${call.duration}`}
                </span>
              </div>
            </div>
            <span className="text-[10px] text-[rgba(144,224,239,0.3)] shrink-0">{call.time}</span>
            <button
              onClick={() => startCall(call)}
              title="Позвонить"
              className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.35)] hover:text-[var(--nemo-cyan)] transition-all">
              <Icon name={call.type === 'video' ? 'Video' : 'Phone'} size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
