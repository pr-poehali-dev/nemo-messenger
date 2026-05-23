import Icon from '@/components/ui/icon';

const CALLS = [
  { id: 1, name: 'Арина Волкова',  avatar: '🦋', type: 'incoming', missed: false, time: '14:23', duration: '4:32' },
  { id: 2, name: 'Дмитрий Море',   avatar: '🐋', type: 'outgoing', missed: false, time: '11:05', duration: '1:12' },
  { id: 3, name: 'Алекс Прибой',   avatar: '🏄', type: 'incoming', missed: true,  time: 'вчера', duration: ''     },
  { id: 4, name: 'Лена Глубина',   avatar: '🐚', type: 'video',    missed: false, time: 'вчера', duration: '8:15' },
  { id: 5, name: 'Команда Nemo',   avatar: '🌊', type: 'outgoing', missed: false, time: 'Пн',    duration: '23:04'},
  { id: 6, name: 'Северный полюс', avatar: '❄️', type: 'incoming', missed: true,  time: 'Вс',    duration: ''     },
];

export default function CallsPage() {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--nemo-foam)]">Звонки</h1>
          <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">История ваших волн</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost-ocean rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2">
            <Icon name="Phone" size={15} />
            Аудио
          </button>
          <button className="btn-ocean rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2">
            <Icon name="Video" size={15} />
            Видео
          </button>
        </div>
      </div>

      {/* Active call banner */}
      <div className="glass glow-border rounded-3xl p-5 mb-5 flex items-center gap-4 animate-fade-in stagger-1" style={{ borderColor: 'rgba(34,197,94,0.4)' }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.3)]">
          📡
        </div>
        <div className="flex-1">
          <div className="font-display font-semibold text-[var(--nemo-foam)] text-sm">Начать новый звонок</div>
          <div className="font-body text-xs text-[rgba(144,224,239,0.45)] mt-0.5">WebRTC · зашифрованное соединение</div>
        </div>
        <button className="btn-ocean rounded-2xl px-5 py-2.5 text-sm font-display font-semibold flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #166534, #22c55e)' }}>
          <Icon name="PhoneCall" size={15} />
          Позвонить
        </button>
      </div>

      {/* Call history */}
      <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 px-1 animate-fade-in stagger-2">
        История
      </h2>
      <div className="space-y-2">
        {CALLS.map((call, i) => (
          <div
            key={call.id}
            className={`glass rounded-2xl px-4 py-3.5 flex items-center gap-3 animate-fade-in stagger-${Math.min(i + 1, 5)}`}
          >
            {/* Avatar */}
            <div className="w-11 h-11 rounded-2xl glass flex items-center justify-center text-xl border border-[rgba(0,180,216,0.15)] shrink-0">
              {call.avatar}
            </div>
            {/* Info */}
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
            <button className="w-9 h-9 rounded-xl hover:bg-[rgba(0,180,216,0.1)] flex items-center justify-center text-[rgba(144,224,239,0.35)] hover:text-[var(--nemo-cyan)] transition-all">
              <Icon name="Phone" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
