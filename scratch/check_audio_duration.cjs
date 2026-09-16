const fs = require('fs');
const path = require('path');

function getMp3Duration(filePath) {
  const buffer = fs.readFileSync(filePath);
  // Simple estimation for standard 128kbps MP3 or inspect header
  // File size in bytes * 8 / bit_rate (e.g. 128000)
  const stats = fs.statSync(filePath);
  const durationEst = (stats.size * 8) / 128000;
  return durationEst;
}

const p1 = path.join(__dirname, '..', 'public', 'assets', 'vo_intro_step1.mp3');
const p2 = path.join(__dirname, '..', 'public', 'assets', 'vo_intro_step2.mp3');

console.log('VO 1 file size:', fs.statSync(p1).size, 'bytes, Est duration:', getMp3Duration(p1).toFixed(2), 'sec');
console.log('VO 2 file size:', fs.statSync(p2).size, 'bytes, Est duration:', getMp3Duration(p2).toFixed(2), 'sec');
