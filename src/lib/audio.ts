let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let currentNodes: AudioNode[] = [];
let isPlaying = false;
let currentTheme = 'ocean';

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function stopAll() {
  currentNodes.forEach(n => { try { (n as OscillatorNode).stop?.(); } catch (_e) { /* ignore */ } });
  currentNodes = [];
  isPlaying = false;
}

function createOscillator(freq: number, type: OscillatorType, gainVal: number, detune = 0): [OscillatorNode, GainNode] {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  g.gain.value = gainVal;
  osc.connect(g);
  g.connect(masterGain!);
  return [osc, g];
}

function playOcean() {
  const c = getCtx();
  // Deep rumble
  const [r1] = createOscillator(55, 'sine', 0.08);
  const [r2] = createOscillator(60, 'sine', 0.05, 3);
  // Mid wave wash
  const bufSize = c.sampleRate * 3;
  const buf = c.createBuffer(1, bufSize, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
  const noise = c.createBufferSource();
  noise.buffer = buf;
  noise.loop = true;
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 400;
  filter.Q.value = 2;
  const noiseGain = c.createGain();
  noiseGain.gain.value = 0.06;
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(masterGain!);
  // LFO for wave rhythm
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.12;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.04;
  lfo.connect(lfoGain);
  lfoGain.connect(noiseGain.gain);
  [r1,r2,noise,lfo].forEach(n => n.start?.());
  currentNodes.push(r1, r2, noise, lfo);
}

function playCosmos() {
  const c = getCtx();
  const freqs = [110, 165, 220, 293, 330];
  freqs.forEach((f, i) => {
    const [osc] = createOscillator(f, 'sine', 0.025 - i * 0.003, i * 5);
    osc.start();
    // Slow LFO
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.03;
    const lg = c.createGain();
    lg.gain.value = f * 0.1;
    lfo.connect(lg);
    lg.connect(osc.frequency);
    lfo.start();
    currentNodes.push(osc, lfo);
  });
}

function playNeon() {
  const freqs = [80, 160, 240, 320];
  freqs.forEach((f, i) => {
    const [osc] = createOscillator(f, 'square', 0.018 - i * 0.003);
    osc.start();
    currentNodes.push(osc);
  });
  const [sub] = createOscillator(40, 'triangle', 0.04);
  sub.start();
  currentNodes.push(sub);
}

function playSakura() {
  const c = getCtx();
  const freqs = [261, 329, 392, 440, 523];
  freqs.forEach((f, i) => {
    const [osc] = createOscillator(f, 'sine', 0.02, i * 2);
    osc.start();
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.08 + i * 0.05;
    const lg = c.createGain();
    lg.gain.value = 3;
    lfo.connect(lg);
    lg.connect(osc.detune);
    lfo.start();
    currentNodes.push(osc, lfo);
  });
}

function playForest() {
  const c = getCtx();
  // Birds-like chirps
  const buf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random()*2-1)*0.15;
  const src = c.createBufferSource();
  src.buffer = buf; src.loop = true;
  const hpf = c.createBiquadFilter();
  hpf.type = 'highpass'; hpf.frequency.value = 2000;
  const g = c.createGain(); g.gain.value = 0.04;
  src.connect(hpf); hpf.connect(g); g.connect(masterGain!);
  src.start();
  currentNodes.push(src);
  // Low wind
  const [wind] = createOscillator(80, 'sine', 0.05);
  wind.start(); currentNodes.push(wind);
}

function playPulsar() {
  const c = getCtx();
  const [osc] = createOscillator(220, 'sawtooth', 0.06);
  osc.start(); currentNodes.push(osc);
  const lfo = c.createOscillator();
  lfo.frequency.value = 2;
  const lg = c.createGain(); lg.gain.value = 0.04;
  lfo.connect(lg); lg.connect(masterGain!.gain);
  lfo.start(); currentNodes.push(lfo);
}

function playGeneric(baseFreq: number) {
  const [o1] = createOscillator(baseFreq, 'sine', 0.04);
  const [o2] = createOscillator(baseFreq * 1.5, 'sine', 0.025);
  [o1,o2].forEach(o => { o.start(); currentNodes.push(o); });
}

export function startMusic(theme: string, volume: number) {
  stopAll();
  const c = getCtx();
  if (c.state === 'suspended') c.resume();
  masterGain = c.createGain();
  masterGain.gain.value = volume / 100 * 0.4;
  masterGain.connect(c.destination);
  currentTheme = theme;
  isPlaying = true;
  switch (theme) {
    case 'ocean':  playOcean();          break;
    case 'cosmos': playCosmos();         break;
    case 'neon':   playNeon();           break;
    case 'sakura': playSakura();         break;
    case 'forest': playForest();         break;
    case 'pulsar': playPulsar();         break;
    case 'autumn': playGeneric(174);     break;
    case 'summer': playGeneric(220);     break;
    case 'mnt':    playGeneric(110);     break;
    case 'black':  playGeneric(55);      break;
    default:       playOcean();
  }
}

export function stopMusic() { stopAll(); }

export function setMusicVolume(vol: number) {
  if (masterGain) masterGain.gain.value = vol / 100 * 0.4;
}

export function isMusicPlaying() { return isPlaying; }

export function playNotificationSound() {
  const c = getCtx();
  if (c.state === 'suspended') c.resume();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'sine';
  osc.frequency.value = 880;
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(0.15, c.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4);
  osc.connect(g); g.connect(c.destination);
  osc.start(); osc.stop(c.currentTime + 0.4);
}