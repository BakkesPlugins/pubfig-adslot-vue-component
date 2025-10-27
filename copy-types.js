const fs = require('fs')
const path = require('path')

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Copy TypeScript declarations
const srcTypes = path.join(__dirname, 'src', 'types', 'index.d.ts')
const distTypes = path.join(__dirname, 'dist', 'index.d.ts')

if (fs.existsSync(srcTypes)) {
  fs.copyFileSync(srcTypes, distTypes)
  console.log('✅ TypeScript declarations copied to dist/index.d.ts')
} else {
  console.log('❌ Source TypeScript declarations not found at src/types/index.d.ts')
}