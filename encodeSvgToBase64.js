const fs = require('fs');
const path = require('path');

// SVG 파일 경로 설정
const svgPath = path.join(__dirname, 'Vector.svg'); // 실제 경로로 변경
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// SVG 파일을 Base64로 인코딩
const base64Svg = Buffer.from(svgContent).toString('base64');
const dataUri = `data:image/svg+xml;base64,${base64Svg}`;

// dataUri.js 파일 생성
const outputContent = `const dataUri = '${dataUri}';\nexport default dataUri;\n`;
fs.writeFileSync(path.join(__dirname, 'src/components/dataUri.js'), outputContent);

console.log('Data URI 생성 완료:', dataUri);
