export interface ThemeConfig {
  id: string;
  name: string;
  nameEn: string;
  nameEs: string;
  icon: string;
  accentColor: string;
  bgFrom: string;
  bgMid: string;
  bgTo: string;
  glowColor: string;
  foamColor: string;
  wave1: string;
  wave2: string;
  wave3: string;
  bgAnimation: string;
  termLogout: string;
  termSettings: string;
  termChats: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'ocean', name: 'Океан', nameEn: 'Ocean', nameEs: 'Océano', icon: 'Waves',
    accentColor: '#00b4d8', bgFrom: '#020b18', bgMid: '#041428', bgTo: '#062444',
    glowColor: 'rgba(0,180,216,0.25)', foamColor: '#caf0f8',
    wave1: 'rgba(21,101,192,0.35)', wave2: 'rgba(0,180,216,0.22)', wave3: 'rgba(144,224,239,0.12)',
    bgAnimation: 'ocean', termLogout: 'Всплыть', termSettings: 'Рубка', termChats: 'Чаты',
  },
  {
    id: 'cosmos', name: 'Космос', nameEn: 'Cosmos', nameEs: 'Cosmos', icon: 'Star',
    accentColor: '#818cf8', bgFrom: '#050210', bgMid: '#0d0822', bgTo: '#160f38',
    glowColor: 'rgba(129,140,248,0.25)', foamColor: '#e0e7ff',
    wave1: 'rgba(99,102,241,0.3)', wave2: 'rgba(129,140,248,0.2)', wave3: 'rgba(196,181,253,0.1)',
    bgAnimation: 'cosmos', termLogout: 'Выйти', termSettings: 'Настройки', termChats: 'Чаты',
  },
  {
    id: 'sakura', name: 'Сакура', nameEn: 'Sakura', nameEs: 'Sakura', icon: 'Flower2',
    accentColor: '#f472b6', bgFrom: '#120008', bgMid: '#200010', bgTo: '#380020',
    glowColor: 'rgba(244,114,182,0.25)', foamColor: '#fce7f3',
    wave1: 'rgba(236,72,153,0.3)', wave2: 'rgba(244,114,182,0.2)', wave3: 'rgba(251,207,232,0.12)',
    bgAnimation: 'sakura', termLogout: 'Выйти', termSettings: 'Настройки', termChats: 'Сообщения',
  },
  {
    id: 'forest', name: 'Лес', nameEn: 'Forest', nameEs: 'Bosque', icon: 'TreePine',
    accentColor: '#4ade80', bgFrom: '#011209', bgMid: '#022010', bgTo: '#04361a',
    glowColor: 'rgba(74,222,128,0.22)', foamColor: '#dcfce7',
    wave1: 'rgba(22,163,74,0.3)', wave2: 'rgba(74,222,128,0.2)', wave3: 'rgba(187,247,208,0.1)',
    bgAnimation: 'forest', termLogout: 'Уйти', termSettings: 'Опушка', termChats: 'Разговоры',
  },
  {
    id: 'neon', name: 'Неон', nameEn: 'Neon', nameEs: 'Neón', icon: 'Zap',
    accentColor: '#e879f9', bgFrom: '#050008', bgMid: '#0d0014', bgTo: '#180020',
    glowColor: 'rgba(232,121,249,0.28)', foamColor: '#fae8ff',
    wave1: 'rgba(168,85,247,0.3)', wave2: 'rgba(232,121,249,0.22)', wave3: 'rgba(240,171,252,0.12)',
    bgAnimation: 'neon', termLogout: 'Выйти', termSettings: 'Настройки', termChats: 'Чаты',
  },
  {
    id: 'pulsar', name: 'Пульсар', nameEn: 'Pulsar', nameEs: 'Púlsar', icon: 'Activity',
    accentColor: '#fbbf24', bgFrom: '#100800', bgMid: '#1c1000', bgTo: '#2d1900',
    glowColor: 'rgba(251,191,36,0.25)', foamColor: '#fef3c7',
    wave1: 'rgba(245,158,11,0.3)', wave2: 'rgba(251,191,36,0.22)', wave3: 'rgba(253,230,138,0.12)',
    bgAnimation: 'pulsar', termLogout: 'Выйти', termSettings: 'Настройки', termChats: 'Чаты',
  },
  {
    id: 'autumn', name: 'Осень', nameEn: 'Autumn', nameEs: 'Otoño', icon: 'Leaf',
    accentColor: '#fb923c', bgFrom: '#110500', bgMid: '#200a00', bgTo: '#351200',
    glowColor: 'rgba(251,146,60,0.25)', foamColor: '#ffedd5',
    wave1: 'rgba(234,88,12,0.3)', wave2: 'rgba(251,146,60,0.22)', wave3: 'rgba(253,186,116,0.12)',
    bgAnimation: 'autumn', termLogout: 'Выйти', termSettings: 'Настройки', termChats: 'Чаты',
  },
  {
    id: 'summer', name: 'Лето в лесу', nameEn: 'Summer Forest', nameEs: 'Verano', icon: 'Sprout',
    accentColor: '#a3e635', bgFrom: '#060e00', bgMid: '#0d1c00', bgTo: '#162e00',
    glowColor: 'rgba(163,230,53,0.22)', foamColor: '#ecfccb',
    wave1: 'rgba(132,204,22,0.28)', wave2: 'rgba(163,230,53,0.2)', wave3: 'rgba(217,249,157,0.1)',
    bgAnimation: 'summer', termLogout: 'Выйти', termSettings: 'Настройки', termChats: 'Чаты',
  },
  {
    id: 'mnt', name: 'Горы', nameEn: 'Mountains', nameEs: 'Montañas', icon: 'Mountain',
    accentColor: '#94a3b8', bgFrom: '#050810', bgMid: '#0c1220', bgTo: '#141c30',
    glowColor: 'rgba(148,163,184,0.2)', foamColor: '#e2e8f0',
    wave1: 'rgba(100,116,139,0.3)', wave2: 'rgba(148,163,184,0.2)', wave3: 'rgba(226,232,240,0.1)',
    bgAnimation: 'mnt', termLogout: 'Спуститься', termSettings: 'Базовый лагерь', termChats: 'Чаты',
  },
  {
    id: 'black', name: 'Чёрная дыра', nameEn: 'Black Hole', nameEs: 'Agujero Negro', icon: 'CircleDot',
    accentColor: '#6b7280', bgFrom: '#000000', bgMid: '#050505', bgTo: '#0a0a0a',
    glowColor: 'rgba(107,114,128,0.15)', foamColor: '#d1d5db',
    wave1: 'rgba(55,65,81,0.25)', wave2: 'rgba(75,85,99,0.15)', wave3: 'rgba(107,114,128,0.08)',
    bgAnimation: 'black', termLogout: 'Выйти', termSettings: 'Настройки', termChats: 'Чаты',
  },
];

export function applyTheme(theme: ThemeConfig, rgb?: { r: number; g: number; b: number }) {
  const root = document.documentElement;
  const accent = rgb
    ? `rgb(${rgb.r},${rgb.g},${rgb.b})`
    : theme.accentColor;

  const toHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1,3),16)/255;
    const g = parseInt(hex.slice(3,5),16)/255;
    const b = parseInt(hex.slice(5,7),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h=0,s=0;
    const l=(max+min)/2;
    if(max!==min){
      const d=max-min;
      s=l>0.5?d/(2-max-min):d/(max+min);
      switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}
      h/=6;
    }
    return `${Math.round(h*360)} ${Math.round(s*100)}% ${Math.round(l*100)}%`;
  };

  root.style.setProperty('--nemo-cyan', accent);
  root.style.setProperty('--nemo-deep', theme.bgFrom);
  root.style.setProperty('--nemo-dark', theme.bgMid);
  root.style.setProperty('--nemo-mid',  theme.bgTo);
  root.style.setProperty('--nemo-glass-border', theme.glowColor);
  root.style.setProperty('--nemo-mist', theme.foamColor);
  root.style.setProperty('--nemo-foam', theme.foamColor);
  root.style.setProperty('--background', toHsl(theme.bgFrom));
  root.style.setProperty('--primary', `${toHsl(rgb ? `#${rgb.r.toString(16).padStart(2,'0')}${rgb.g.toString(16).padStart(2,'0')}${rgb.b.toString(16).padStart(2,'0')}` : accent)}`);
  document.body.style.background = `linear-gradient(180deg, ${theme.bgFrom} 0%, ${theme.bgMid} 50%, ${theme.bgTo} 100%)`;
}
