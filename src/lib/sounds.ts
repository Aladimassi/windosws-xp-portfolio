let ctx: AudioContext | null = null;

function getCtx() {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function tone(freq: number, duration: number, type: OscillatorType = "square", volume = 0.08) {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.stop(ac.currentTime + duration);
  } catch {
    /* audio blocked */
  }
}

export function playStartupSound() {
  tone(523, 0.08);
  setTimeout(() => tone(659, 0.08), 80);
  setTimeout(() => tone(784, 0.12), 160);
}

export function playClickSound() {
  tone(880, 0.04, "square", 0.05);
}

export function playOpenSound() {
  tone(440, 0.06);
  setTimeout(() => tone(550, 0.05), 50);
}

export function playCloseSound() {
  tone(550, 0.05);
  setTimeout(() => tone(440, 0.06), 40);
}

export function playErrorSound() {
  tone(180, 0.15, "sawtooth", 0.1);
  setTimeout(() => tone(140, 0.2, "sawtooth", 0.1), 120);
}
