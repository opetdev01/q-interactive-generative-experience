// Ambient Audio Engine with Smooth Music Ducking for Seamless Voiceover Blending

class AmbientAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  private normalVolume: number = 0.20; // Rich ambient background volume (20%)
  private duckedVolume: number = 0.085; // Warm blended ducked volume during VO (8.5%)
  private fadeInterval: number | null = null;

  public init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    try {
      this.audioElement = new Audio('/assets/bgm.wav');
      this.audioElement.loop = true;
      this.audioElement.volume = this.isMuted ? 0 : this.normalVolume;
    } catch (e) {
      console.warn('Audio element initialization failed', e);
    }
  }

  public startMusic() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.audioElement) {
      this.fadeToVolume(this.isMuted ? 0 : this.normalVolume, 600);
      this.audioElement.play().catch(err => {
        console.warn('Autoplay prevented or interrupted', err);
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

  // Smoothly blends background music down during voiceover (keeping a warm, audible background layer)
  public duckForVoiceover() {
    if (this.audioElement && !this.isMuted) {
      this.fadeToVolume(this.duckedVolume, 400);
    }
  }

  // Smoothly restores background music volume after voiceover ends
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
