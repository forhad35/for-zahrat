// Romantic Music Box / Ambient Synth using Web Audio API
class MusicPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: any = null;
  private step = 0;

  // Gentle, dreamy romantic chord progression frequencies (Hz) - Ethereal Lofi Music Box
  private notes = [
    // Chord 1 (Fmaj7 - gentle & romantic)
    [349.23, 440.0, 523.25, 659.25], // F4, A4, C5, E5
    // Chord 2 (G / Bm)
    [392.0, 493.88, 587.33, 739.99], // G4, B4, D5, F#5
    // Chord 3 (Em7 - warm & nostalgic)
    [329.63, 392.0, 493.88, 587.33], // E4, G4, B4, D5
    // Chord 4 (Am7 - sweet emotion)
    [440.0, 523.25, 659.25, 783.99], // A4, C5, E5, G5
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.init();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playNextArpeggio();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getStatus() {
    return this.isPlaying;
  }

  private playTone(freq: number, time: number, duration: number, volume = 0.08) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Soft sine wave for a gentle music box / celesta timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(volume, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  }

  private playNextArpeggio() {
    if (!this.isPlaying || !this.ctx) return;

    const chordIndex = Math.floor(this.step / 4) % this.notes.length;
    const noteIndex = this.step % 4;
    const chord = this.notes[chordIndex];
    const freq = chord[noteIndex];

    const now = this.ctx.currentTime;
    this.playTone(freq, now, 1.8, 0.07);

    // Also add a soft bass root note at the start of each chord
    if (noteIndex === 0) {
      this.playTone(chord[0] / 2, now, 2.5, 0.09);
    }

    this.step++;
    // Gentle rhythm tempo (approx 580ms per note)
    this.timer = setTimeout(() => {
      this.playNextArpeggio();
    }, 580);
  }
}

export const musicPlayer = new MusicPlayer();
