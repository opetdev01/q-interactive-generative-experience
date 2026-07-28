const fs = require('fs');
const path = require('path');

// Parameters for Cinematic Ambient Loop
const sampleRate = 44100;
const durationSeconds = 32; // 32 seconds seamless loop
const totalSamples = sampleRate * durationSeconds;

// Audio buffer
const buffer = new Float32Array(totalSamples);

// Chords (Hz)
const chordProgression = [
  // Fsus2 / Fmaj7: F2, C3, G3, A3, E4
  [87.31, 130.81, 196.00, 220.00, 329.63],
  // Dm9: D2, A2, F3, C4, E4
  [73.42, 110.00, 174.61, 261.63, 329.63],
  // Bbmaj7: Bb1, F2, D3, A3, D4
  [58.27, 87.31, 146.83, 220.00, 293.66],
  // Csus4 / Cadd9: C2, G2, D3, G3, D4
  [65.41, 98.00, 146.83, 196.00, 293.66]
];

const chordDuration = durationSeconds / chordProgression.length; // 8 seconds per chord

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  
  // Determine active chord and blend factor
  const currentChordIdx = Math.floor(t / chordDuration) % chordProgression.length;
  const nextChordIdx = (currentChordIdx + 1) % chordProgression.length;
  const chordTime = (t % chordDuration) / chordDuration;
  
  // Smooth crossfade between chords
  const fade = 0.5 - 0.5 * Math.cos(Math.PI * chordTime);
  const chord1 = chordProgression[currentChordIdx];
  const chord2 = chordProgression[nextChordIdx];
  
  let sample = 0;

  // Synthesizer voice 1: Warm Detuned Pads (Sine + Soft Triangle)
  for (let n = 0; n < chord1.length; n++) {
    const freq1 = chord1[n];
    const freq2 = chord2[n];
    // Blend frequencies for smooth harmonic transition
    const freq = freq1 * (1 - fade) + freq2 * fade;
    
    // Slight detune for analog width
    const osc1 = Math.sin(2 * Math.PI * freq * t);
    const osc2 = Math.sin(2 * Math.PI * (freq * 1.003) * t + 0.5);
    const oscSub = Math.sin(2 * Math.PI * (freq * 0.5) * t) * 0.3; // Deep sub-warmth
    
    // Slow LFO filter modulation
    const lfo = 0.6 + 0.4 * Math.sin(2 * Math.PI * 0.125 * t + n);
    
    sample += (osc1 + osc2 + oscSub) * (0.12 / chord1.length) * lfo;
  }

  // Synthesizer voice 2: High shimmer / aerial breeze (soft filtered noise + sine octave shimmer)
  const shimmerFreq = 523.25; // C5
  const shimmerOsc = Math.sin(2 * Math.PI * shimmerFreq * t + Math.sin(2 * Math.PI * 0.2 * t) * 2);
  const shimmerLfo = Math.pow(0.5 + 0.5 * Math.sin(2 * Math.PI * 0.05 * t), 2) * 0.025;
  sample += shimmerOsc * shimmerLfo;

  // Synthesizer voice 3: Subtle atmospheric air movement
  const noise = (Math.random() * 2 - 1) * 0.012;
  const airLfo = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.08 * t);
  sample += noise * airLfo;

  // Master fade at start and end for seamless loop
  const loopFadeIn = Math.min(1, t / 1.5);
  const loopFadeOut = Math.min(1, (durationSeconds - t) / 1.5);
  const loopEnvelope = loopFadeIn * loopFadeOut;

  buffer[i] = sample * loopEnvelope * 0.85;
}

// Convert Float32Array to 16-bit PCM WAV Buffer
function createWavBuffer(samples, sampleRate) {
  const numChannels = 1;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const bufferSize = 44 + dataSize;
  
  const wavBuffer = Buffer.alloc(bufferSize);
  
  // RIFF header
  wavBuffer.write('RIFF', 0);
  wavBuffer.writeUInt32LE(36 + dataSize, 4);
  wavBuffer.write('WAVE', 8);
  
  // fmt chunk
  wavBuffer.write('fmt ', 12);
  wavBuffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  wavBuffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  wavBuffer.writeUInt16LE(numChannels, 22);
  wavBuffer.writeUInt32LE(sampleRate, 24);
  wavBuffer.writeUInt32LE(byteRate, 28);
  wavBuffer.writeUInt16LE(blockAlign, 32);
  wavBuffer.writeUInt16LE(16, 34); // BitsPerSample (16)
  
  // data chunk
  wavBuffer.write('data', 36);
  wavBuffer.writeUInt32LE(dataSize, 40);
  
  // Write PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const val = s < 0 ? s * 0x8000 : s * 0x7FFF;
    wavBuffer.writeInt16LE(Math.floor(val), offset);
    offset += 2;
  }
  
  return wavBuffer;
}

const outDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const wavPath = path.join(outDir, 'media_city_ambient.wav');
const wavData = createWavBuffer(buffer, sampleRate);
fs.writeFileSync(wavPath, wavData);

console.log(`Successfully generated cinematic ambient audio track: ${wavPath} (${(wavData.length / 1024 / 1024).toFixed(2)} MB)`);
