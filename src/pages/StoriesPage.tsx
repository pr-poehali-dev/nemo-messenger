import { useState, useRef, useCallback } from 'react';
import Icon from '@/components/ui/icon';

interface Story {
  id: number;
  author: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  time: string;
  viewed: boolean;
}

const DEMO_STORIES: Story[] = [
  { id: 1, author: 'Арина В.',   mediaUrl: '', mediaType: 'image', caption: 'Утренний океан',    time: '1 ч назад',  viewed: false },
  { id: 2, author: 'Дмитрий М.', mediaUrl: '', mediaType: 'image', caption: 'На горизонте',      time: '2 ч назад',  viewed: false },
  { id: 3, author: 'Алекс П.',   mediaUrl: '', mediaType: 'video', caption: 'Серфинг',           time: '3 ч назад',  viewed: true  },
  { id: 4, author: 'Лена Г.',    mediaUrl: '', mediaType: 'image', caption: 'Тихая бухта',       time: '4 ч назад',  viewed: true  },
  { id: 5, author: 'Иван Г.',    mediaUrl: '', mediaType: 'image', caption: 'Закат у маяка',     time: '5 ч назад',  viewed: true  },
];

const GRADIENTS = [
  'linear-gradient(160deg, #1565c0 0%, #00b4d8 100%)',
  'linear-gradient(160deg, #0a3a6e 0%, #1e88e5 100%)',
  'linear-gradient(160deg, #062444 0%, #00b4d8 80%)',
  'linear-gradient(160deg, #1e3a5f 0%, #90e0ef 100%)',
  'linear-gradient(160deg, #041428 0%, #1565c0 100%)',
];

export default function StoriesPage() {
  const [stories, setStories]       = useState<Story[]>(DEMO_STORIES);
  const [viewing, setViewing]       = useState<Story | null>(null);
  const [creating, setCreating]     = useState(false);
  const [caption, setCaption]       = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType]   = useState<'image' | 'video'>('image');
  const fileRef = useRef<HTMLInputElement>(null);

  const openFile = (type: 'image' | 'video') => {
    setMediaType(type);
    if (fileRef.current) {
      fileRef.current.accept = type === 'image' ? 'image/*' : 'video/*';
      fileRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setCreating(true);
  };

  const publishStory = () => {
    if (!previewUrl) return;
    const newStory: Story = {
      id: Date.now(),
      author: 'Вы',
      mediaUrl: previewUrl,
      mediaType,
      caption,
      time: 'только что',
      viewed: false,
    };
    setStories(prev => [newStory, ...prev]);
    setCreating(false);
    setPreviewUrl(null);
    setCaption('');
  };

  const viewStory = (story: Story) => {
    setViewing(story);
    setStories(prev => prev.map(s => s.id === story.id ? { ...s, viewed: true } : s));
  };

  const nextStory = useCallback(() => {
    if (!viewing) return;
    const idx = stories.findIndex(s => s.id === viewing.id);
    if (idx < stories.length - 1) {
      const next = stories[idx + 1];
      setViewing(next);
      setStories(prev => prev.map(s => s.id === next.id ? { ...s, viewed: true } : s));
    } else {
      setViewing(null);
    }
  }, [viewing, stories]);

  const prevStory = useCallback(() => {
    if (!viewing) return;
    const idx = stories.findIndex(s => s.id === viewing.id);
    if (idx > 0) setViewing(stories[idx - 1]);
  }, [viewing, stories]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Hidden file input */}
      <input ref={fileRef} type="file" className="hidden" onChange={onFileChange} />

      {/* Story viewer overlay */}
      {viewing && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {/* Progress bar */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[340px] flex gap-1 z-10">
            {stories.map(s => (
              <div
                key={s.id}
                className="flex-1 h-0.5 rounded-full"
                style={{ background: s.id <= (viewing?.id ?? 0) ? 'rgba(0,180,216,0.9)' : 'rgba(255,255,255,0.25)' }}
              />
            ))}
          </div>

          {/* Viewer card */}
          <div
            className="relative w-[340px] rounded-3xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: '9/16', maxHeight: '88vh' }}
          >
            {/* Media */}
            {viewing.mediaUrl ? (
              viewing.mediaType === 'video' ? (
                <video
                  src={viewing.mediaUrl}
                  autoPlay
                  loop
                  muted={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img src={viewing.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: GRADIENTS[viewing.id % GRADIENTS.length] }}
              />
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

            {/* Header */}
            <div className="absolute top-8 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full glass border border-[rgba(0,180,216,0.4)] flex items-center justify-center">
                  <Icon name="User" size={16} className="text-[var(--nemo-foam)]" />
                </div>
                <div>
                  <div className="font-body font-semibold text-white text-sm">{viewing.author}</div>
                  <div className="text-[10px] text-white/60">{viewing.time}</div>
                </div>
              </div>
              <button
                onClick={() => setViewing(null)}
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/70 hover:text-white"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Caption */}
            {viewing.caption && (
              <div className="absolute bottom-6 left-4 right-4">
                <p className="font-body text-white text-sm text-center">{viewing.caption}</p>
              </div>
            )}

            {/* Tap zones */}
            <button className="absolute left-0 top-0 bottom-0 w-1/3" onClick={prevStory} />
            <button className="absolute right-0 top-0 bottom-0 w-1/3" onClick={nextStory} />
          </div>

          {/* Nav buttons */}
          <button
            onClick={prevStory}
            className="absolute left-[calc(50%-210px)] top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-[var(--nemo-foam)] hover:text-white transition-all"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextStory}
            className="absolute left-[calc(50%+170px)] top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-[var(--nemo-foam)] hover:text-white transition-all"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      )}

      {/* Create story modal */}
      {creating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-strong rounded-3xl overflow-hidden w-[340px] shadow-2xl" style={{ maxHeight: '90vh' }}>
            {/* Preview */}
            <div className="relative bg-black" style={{ aspectRatio: '9/16', maxHeight: '60vh' }}>
              {previewUrl && mediaType === 'image' && (
                <img src={previewUrl} alt="" className="w-full h-full object-cover" />
              )}
              {previewUrl && mediaType === 'video' && (
                <video src={previewUrl} autoPlay loop muted className="w-full h-full object-cover" />
              )}
              <button
                onClick={() => { setCreating(false); setPreviewUrl(null); }}
                className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center text-white/70"
              >
                <Icon name="X" size={15} />
              </button>
            </div>

            {/* Controls */}
            <div className="p-4 space-y-3">
              <div className="relative">
                <Icon name="Type" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(144,224,239,0.35)]" />
                <input
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  placeholder="Добавить подпись..."
                  className="input-ocean w-full rounded-xl pl-9 pr-4 py-2.5 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setCreating(false); setPreviewUrl(null); }}
                  className="btn-ghost-ocean flex-1 rounded-xl py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Icon name="X" size={14} />
                  Отмена
                </button>
                <button
                  onClick={publishStory}
                  className="btn-ocean flex-1 rounded-xl py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={14} />
                  Опубликовать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto scroll-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--nemo-foam)]">Истории</h1>
            <p className="font-body text-sm text-[rgba(144,224,239,0.45)] mt-0.5">Моменты из глубины</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openFile('image')}
              className="btn-ghost-ocean rounded-2xl px-3.5 py-2.5 text-sm flex items-center gap-2"
            >
              <Icon name="Image" size={15} />
              Фото
            </button>
            <button
              onClick={() => openFile('video')}
              className="btn-ocean rounded-2xl px-3.5 py-2.5 text-sm flex items-center gap-2"
            >
              <Icon name="Video" size={15} />
              Видео
            </button>
          </div>
        </div>

        {/* Add story card */}
        <div
          className="glass glow-border rounded-3xl p-5 mb-5 flex items-center gap-4 cursor-pointer hover:bg-[rgba(0,180,216,0.08)] transition-all animate-fade-in stagger-1"
          onClick={() => openFile('image')}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-dashed border-[rgba(0,180,216,0.4)] shrink-0"
            style={{ background: 'rgba(0,180,216,0.06)' }}
          >
            <Icon name="Plus" size={22} className="text-[var(--nemo-cyan)]" />
          </div>
          <div>
            <div className="font-display font-semibold text-[var(--nemo-foam)] text-sm">Создать историю</div>
            <div className="font-body text-xs text-[rgba(144,224,239,0.45)] mt-0.5">
              Фото или видео в вертикальном формате · до 24 часов
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={e => { e.stopPropagation(); openFile('image'); }}
              className="w-9 h-9 glass rounded-xl flex items-center justify-center text-[var(--nemo-cyan)] hover:bg-[rgba(0,180,216,0.15)] transition-all"
              title="Загрузить фото"
            >
              <Icon name="ImagePlus" size={16} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); openFile('video'); }}
              className="w-9 h-9 glass rounded-xl flex items-center justify-center text-[var(--nemo-cyan)] hover:bg-[rgba(0,180,216,0.15)] transition-all"
              title="Загрузить видео"
            >
              <Icon name="VideoIcon" size={16} />
            </button>
          </div>
        </div>

        {/* Stories grid */}
        <h2 className="font-display font-semibold text-[var(--nemo-foam)] text-sm mb-3 px-1 animate-fade-in stagger-2">
          Активные истории
        </h2>
        <div className="grid grid-cols-3 gap-3 animate-fade-in stagger-3">
          {stories.map((story, i) => (
            <button
              key={story.id}
              onClick={() => viewStory(story)}
              className="relative rounded-2xl overflow-hidden group"
              style={{ aspectRatio: '9/16' }}
            >
              {/* Media / gradient */}
              {story.mediaUrl ? (
                story.mediaType === 'image' ? (
                  <img src={story.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <video src={story.mediaUrl} className="absolute inset-0 w-full h-full object-cover" muted />
                )
              ) : (
                <div className="absolute inset-0" style={{ background: GRADIENTS[i % GRADIENTS.length] }} />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

              {/* Border ring */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 transition-all ${
                  story.viewed
                    ? 'border-[rgba(144,224,239,0.25)]'
                    : 'border-[var(--nemo-cyan)]'
                }`}
              />

              {/* Video badge */}
              {story.mediaType === 'video' && (
                <div className="absolute top-2 right-2 w-6 h-6 glass rounded-lg flex items-center justify-center">
                  <Icon name="Play" size={10} className="text-white" />
                </div>
              )}

              {/* Author + caption */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <div className="font-body text-white text-xs font-semibold truncate">{story.author}</div>
                {story.caption && (
                  <div className="font-body text-white/60 text-[10px] truncate mt-0.5">{story.caption}</div>
                )}
                <div className="font-body text-white/40 text-[9px] mt-0.5">{story.time}</div>
              </div>

              {/* Hover play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.3)]">
                  <Icon name="Play" size={20} className="text-white ml-0.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
