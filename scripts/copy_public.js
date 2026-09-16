import fs from 'fs';
import path from 'path';

const srcPublic = path.join(process.cwd(), 'public');
const distDir = path.join(process.cwd(), 'dist');

if (fs.existsSync(srcPublic)) {
  console.log('Copying public assets to dist for Vercel deployment...');
  fs.cpSync(srcPublic, distDir, { recursive: true, force: true });
  console.log('✅ Successfully copied public media assets to dist!');
} else {
  console.error('❌ public directory not found!');
}
