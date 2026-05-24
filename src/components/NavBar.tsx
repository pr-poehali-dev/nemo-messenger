import Icon from '@/components/ui/icon';

export type Page = 'home' | 'chats' | 'calls' | 'contacts' | 'stories' | 'profile' | 'settings' | 'auth';

interface NavBarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: 'home',     icon: 'LayoutDashboard', label: 'Главная'  },
  { id: 'chats',    icon: 'MessageCircle',   label: 'Чаты'     },
  { id: 'stories',  icon: 'PlaySquare',      label: 'Истории'  },
  { id: 'calls',    icon: 'Phone',           label: 'Звонки'   },
  { id: 'contacts', icon: 'Users',           label: 'Контакты' },
  { id: 'profile',  icon: 'User',            label: 'Профиль'  },
  { id: 'settings', icon: 'Settings2',       label: 'Рубка'    },
];

export default function NavBar({ current, onNavigate }: NavBarProps) {
  return (
    <nav className="glass-strong flex flex-col items-center py-5 px-3 gap-0.5 border-r border-r-[rgba(0,180,216,0.12)] w-[68px] shrink-0 z-20 relative">
      {/* Logo */}
      <button
        onClick={() => onNavigate('home')}
        className="mb-5 flex items-center justify-center"
        title="Nemo"
      >
        <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg" style={{ boxShadow: '0 0 18px rgba(0,180,216,0.35)' }}>
          <img
            src="https://cdn.poehali.dev/projects/5e011a8c-fdc8-4250-906e-b15c55b68cc8/bucket/7011f024-f671-445a-b2ee-b028516f26ec.jpg"
            alt="Nemo"
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          title={item.label}
          className={`
            nav-item w-11 h-11 rounded-2xl flex items-center justify-center
            transition-all duration-200
            ${current === item.id
              ? 'bg-[rgba(0,180,216,0.2)] text-[var(--nemo-cyan)]'
              : 'text-[rgba(144,224,239,0.38)] hover:bg-[rgba(0,180,216,0.1)] hover:text-[var(--nemo-foam)]'
            }
          `}
        >
          <Icon name={item.icon} size={19} />
        </button>
      ))}

      <div className="flex-1" />

      <button
        onClick={() => onNavigate('auth')}
        title="Выйти"
        className="nav-item w-11 h-11 rounded-2xl flex items-center justify-center text-[rgba(144,224,239,0.3)] hover:bg-[rgba(255,80,80,0.08)] hover:text-[rgba(255,120,120,0.8)] transition-all duration-200"
      >
        <Icon name="LogOut" size={18} />
      </button>
    </nav>
  );
}
