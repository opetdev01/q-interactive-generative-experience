import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'experience', 'voiceovers');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const scriptPath = path.join(dir, 'make_audio.ps1');
const wavPath = path.join(dir, 'tech_research_institute.wav').replace(/\\/g, '/');

const ps = `
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voices = $synth.GetInstalledVoices()
foreach ($v in $voices) {
    if ($v.VoiceInfo.Gender -eq 'Female') {
        $synth.SelectVoice($v.VoiceInfo.Name)
        break
    }
}
$synth.SetOutputToWaveFile("${wavPath}")
$synth.Speak("Welcome to the Tech and Research Institute, an advanced sanctuary of empowering generative AI, real-time virtual production, and spatial computing.")
$synth.Dispose()
`;

fs.writeFileSync(scriptPath, ps);
execSync(`powershell -ExecutionPolicy Bypass -File "${scriptPath}"`, { stdio: 'inherit' });
console.log('Voiceover file generated successfully at:', wavPath);
