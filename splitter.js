const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Estrazione ed eliminazione del CSS interno
const styleRegex = /<style>([\s\S]*?)<\/style>/i;
const styleMatch = html.match(styleRegex);
if (styleMatch) {
    const cssCode = styleMatch[1].trim();
    fs.writeFileSync(path.join(__dirname, 'style.css'), cssCode);
    html = html.replace(styleRegex, '<link rel="stylesheet" href="style.css">');
}

// 2. Estrazione ed eliminazione del JS interno (ignorando i tag con 'src')
const inlineScriptRegex = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/i;
const scriptMatch = html.match(inlineScriptRegex);
if (scriptMatch) {
    const jsCode = scriptMatch[1].trim();
    if (jsCode.length > 0) {
        fs.writeFileSync(path.join(__dirname, 'script.js'), jsCode);
        html = html.replace(scriptMatch[0], '<script src="script.js"></script>');
    }
}

// 3. Salvataggio del nuovo HTML pulito
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('Codice HTML, CSS e JS separati con successo!');
