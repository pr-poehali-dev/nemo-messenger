import Icon from '@/components/ui/icon';

type Page = 'home' | 'chats' | 'calls' | 'contacts' | 'profile' | 'settings' | 'auth';

interface NavBarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: 'home',     icon: 'Waves',      label: 'Главная'  },
  { id: 'chats',    icon: 'MessageCircle', label: 'Чаты'   },
  { id: 'calls',    icon: 'Phone',      label: 'Звонки'   },
  { id: 'contacts', icon: 'Users',      label: 'Контакты' },
  { id: 'profile',  icon: 'User',       label: 'Профиль'  },
  { id: 'settings', icon: 'Settings2',  label: 'Рубка'    },
];

export default function NavBar({ current, onNavigate }: NavBarProps) {
  return (
    <nav className="glass-strong flex flex-col items-center py-6 px-3 gap-1 border-r border-r-[rgba(0,180,216,0.15)] w-[72px] shrink-0 z-20 relative">
      {/* Logo */}
      <button
        onClick={() => onNavigate('home')}
        className="mb-6 flex items-center justify-center"
        title="Nemo"
      >
        <div className="w-10 h-10 rounded-2xl btn-ocean flex items-center justify-center shadow-lg">
          <span className="text-xl">🌊</span>
        </div>
      </button>

      {/* Nav items */}
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          title={item.label}
          className={`
            nav-item w-12 h-12 rounded-2xl flex items-center justify-center
            transition-all duration-200
            ${current === item.id
              ? 'bg-[rgba(0,180,216,0.2)] text-[var(--nemo-cyan)]'
              : 'text-[rgba(144,224,239,0.45)] hover:bg-[rgba(0,180,216,0.1)] hover:text-[var(--nemo-foam)]'
            }
          `}
        >
          <Icon name={item.icon} size={20} />
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Auth / logout */}
      <button
        onClick={() => onNavigate('auth')}
        title="Всплыть"
        className="nav-item w-12 h-12 rounded-2xl flex items-center justify-center text-[rgba(144,224,239,0.35)] hover:bg-[rgba(0,180,216,0.1)] hover:text-[rgba(255,120,120,0.8)] transition-all duration-200"
      >
        <Icon name="LogOut" size={18} />
      </button>
    </nav>
  );
}
