import { useState } from 'react';
import { AppProvider } from '@/lib/AppContext';
import WaveBackground from '@/components/WaveBackground';
import NavBar, { type Page } from '@/components/NavBar';
import HomePage from '@/pages/HomePage';
import ChatsPage from '@/pages/ChatsPage';
import CallsPage from '@/pages/CallsPage';
import ContactsPage from '@/pages/ContactsPage';
import StoriesPage from '@/pages/StoriesPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import AuthPage from '@/pages/AuthPage';

function NemoApp() {
  const [page, setPage]     = useState<Page>('auth');
  const [authed, setAuthed] = useState(false);

  const handleAuth = () => {
    setAuthed(true);
    setPage('home');
  };

  const handleNavigate = (p: Page) => {
    if (p === 'auth') {
      setAuthed(false);
      setPage('auth');
      return;
    }
    setPage(p);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      <WaveBackground />

      <div className="relative z-10 flex w-full h-full">
        {authed && (
          <NavBar current={page} onNavigate={handleNavigate} />
        )}

        <div className="flex-1 flex overflow-hidden" key={page} style={{ animation: 'fadeIn 0.3s ease-out' }}>
          {!authed ? (
            <AuthPage onAuth={handleAuth} />
          ) : page === 'home' ? (
            <HomePage onNavigate={handleNavigate} />
          ) : page === 'chats' ? (
            <ChatsPage />
          ) : page === 'stories' ? (
            <StoriesPage />
          ) : page === 'calls' ? (
            <CallsPage />
          ) : page === 'contacts' ? (
            <ContactsPage />
          ) : page === 'profile' ? (
            <ProfilePage />
          ) : page === 'settings' ? (
            <SettingsPage />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <AppProvider>
      <NemoApp />
    </AppProvider>
  );
}
