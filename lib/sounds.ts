let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    audioCtx = new Ctor();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

function beep(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  delay = 0,
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  const startTime = ctx.currentTime + delay;
  gain.gain.setValueAtTime(0.15, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

export function playSelectSound() {
  beep(440, 0.08);
}

export function playMoveSound() {
  beep(660, 0.12);
}

export function playWinSound() {
  [523.25, 659.25, 783.99].forEach((freq, i) => beep(freq, 0.2, "sine", i * 0.15));
}

export function playLoseSound() {
  beep(180, 0.4, "sawtooth");
}
