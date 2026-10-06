import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconvPath = path.resolve(__dirname, 'node_modules', 'iconv-lite', 'lib', 'index.js');

if (fs.existsSync(iconvPath)) {
    let content = fs.readFileSync(iconvPath, 'utf8');
    
    // Comment out require('./streams') and require('./extend-node') to fix Cloudflare Workers esbuild bug
    content = content.replace(/require\("\.\/streams"\)\(iconv\);/g, '// require("./streams")(iconv);');
    content = content.replace(/require\("\.\/extend-node"\)\(iconv\);/g, '// require("./extend-node")(iconv);');
    
    fs.writeFileSync(iconvPath, content, 'utf8');
    console.log('Successfully patched iconv-lite for Cloudflare Workers compatibility.');
}
