const isSoundEnabled = () => localStorage.getItem('tictac_sound') !== 'false';

// Shared audio context
let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playClick = (isX) => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(isX ? 600 : 400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(isX ? 300 : 200, ctx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
};

export const playWin = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  
  const playNote = (freq, time, duration) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.3, time + 0.05);
    gain.gain.linearRampToValueAtTime(0, time + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + duration);
  };
  
  const now = ctx.currentTime;
  // A triumphant major arpeggio
  playNote(440, now, 0.15); // A4
  playNote(554.37, now + 0.15, 0.15); // C#5
  playNote(659.25, now + 0.3, 0.3); // E5
};

export const playDraw = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  
  const playNote = (freq, time, duration) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + duration);
  };
  
  const now = ctx.currentTime;
  // A sad descending tone
  playNote(300, now, 0.3);
  playNote(280, now + 0.3, 0.4);
};
