// Ambient Audio Engine with Smooth Music Ducking & Autoplay Unlock

class AmbientAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  private normalVolume: number = 0.20; // Rich ambient background volume (20%)
  private duckedVolume: number = 0.085; // Warm blended ducked volume during VO (8.5%)
  private fadeInterval: number | null = null;

  public init() {
    if (this.isInitialized && this.audioElement) return;
    this.isInitialized = true;

    try {
      this.audioElement = new Audio('/assets/bgm.mp3');
      this.audioElement.loop = true;
      this.audioElement.volume = this.isMuted ? 0 : this.normalVolume;

      // Enable unlock listener if browser blocks initial play
      const unlockListener = () => {
        if (this.audioElement && this.audioElement.paused && !this.isMuted) {
          this.audioElement.play().catch(() => {});
        }
        window.removeEventListener('click', unlockListener);
        window.removeEventListener('touchstart', unlockListener);
      };

      window.addEventListener('click', unlockListener, { once: true });
      window.addEventListener('touchstart', unlockListener, { once: true });
    } catch (e) {
      console.warn('Audio element initialization failed', e);
    }
  }

  public startMusic() {
    if (!this.isInitialized || !this.audioElement) {
      this.init();
    }
    if (this.audioElement) {
      this.fadeToVolume(this.isMuted ? 0 : this.normalVolume, 600);
      this.audioElement.play().catch(err => {
        console.warn('Autoplay waiting for user gesture', err);
      });
    }
  }

  private fadeToVolume(targetVol: number, durationMs: number = 400) {
    if (!this.audioElement) return;
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    const startVol = this.audioElement.volume;
    const diff = targetVol - startVol;
    if (Math.abs(diff) < 0.005) {
      this.audioElement.volume = targetVol;
      return;
    }

    const steps = 16;
    const stepTime = durationMs / steps;
    let currentStep = 0;

    this.fadeInterval = window.setInterval(() => {
      currentStep++;
      if (this.audioElement) {
        const progress = currentStep / steps;
        this.audioElement.volume = Math.max(0, Math.min(1, startVol + diff * progress));
      }
      if (currentStep >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        if (this.audioElement) this.audioElement.volume = targetVol;
      }
    }, stepTime);
  }

  public duckForVoiceover() {
    if (this.audioElement && !this.isMuted) {
      this.fadeToVolume(this.duckedVolume, 400);
    }
  }

  public restoreMusic() {
    if (this.audioElement && !this.isMuted) {
      this.fadeToVolume(this.normalVolume, 500);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.audioElement) {
      this.fadeToVolume(muted ? 0 : this.normalVolume, 300);
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public playSceneAmbience(_scene: string) {
    this.startMusic();
  }

  public stopAmbience() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }
}

export const audioEngine = new AmbientAudioEngine();
