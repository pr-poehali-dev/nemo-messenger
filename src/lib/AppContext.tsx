import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { THEMES, applyTheme, type ThemeConfig } from './theme';
import { startMusic, stopMusic, setMusicVolume } from './audio';
import { type Lang } from './i18n';

interface RGB { r: number; g: number; b: number; }

interface AppContextType {
  theme: ThemeConfig;
  setThemeId: (id: string) => void;
  rgb: RGB | null;
  setRgb: (rgb: RGB) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  musicOn: boolean;
  setMusicOn: (v: boolean) => void;
  volume: number;
  setVolume: (v: number) => void;
  notifOn: boolean;
  setNotifOn: (v: boolean) => void;
  soundsOn: boolean;
  setSoundsOn: (v: boolean) => void;
  font: string;
  setFont: (f: string) => void;
}

const AppContext = createContext<AppContextType>(null!);

export function AppProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState('ocean');
  const [rgb, setRgbState]         = useState<RGB | null>(null);
  const [lang, setLang]            = useState<Lang>('ru');
  const [musicOn, setMusicOnState] = useState(false);
  const [volume, setVolumeState]   = useState(35);
  const [notifOn, setNotifOn]      = useState(true);
  const [soundsOn, setSoundsOn]    = useState(true);
  const [font, setFontState]       = useState('Nunito');

  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0];

  const applyFont = useCallback((f: string) => {
    document.body.style.fontFamily = `'${f}', sans-serif`;
  }, []);

  // Apply theme on change
  useEffect(() => {
    applyTheme(theme, rgb ?? undefined);
  }, [theme, rgb]);

  // Apply font
  useEffect(() => { applyFont(font); }, [font, applyFont]);

  // Handle music
  useEffect(() => {
    if (musicOn) {
      startMusic(themeId, volume);
    } else {
      stopMusic();
    }
    return () => { stopMusic(); };
  }, [musicOn, themeId]);

  useEffect(() => {
    if (musicOn) setMusicVolume(volume);
  }, [volume, musicOn]);

  const setThemeId = (id: string) => {
    setThemeIdState(id);
    setRgbState(null);
    if (musicOn) {
      setTimeout(() => startMusic(id, volume), 50);
    }
  };

  const setRgb = (r: RGB) => {
    setRgbState(r);
    const t = THEMES.find(th => th.id === themeId) ?? THEMES[0];
    applyTheme(t, r);
  };

  const setMusicOn = (v: boolean) => {
    setMusicOnState(v);
    if (!v) stopMusic();
    else startMusic(themeId, volume);
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    setMusicVolume(v);
  };

  const setFont = (f: string) => {
    setFontState(f);
    applyFont(f);
  };

  return (
    <AppContext.Provider value={{
      theme, setThemeId, rgb, setRgb,
      lang, setLang,
      musicOn, setMusicOn,
      volume, setVolume,
      notifOn, setNotifOn,
      soundsOn, setSoundsOn,
      font, setFont,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
