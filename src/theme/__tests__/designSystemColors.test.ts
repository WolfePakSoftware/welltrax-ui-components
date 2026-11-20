import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DS_TOKENS_PATH = join(__dirname, '../../../node_modules/@pakenergy/design-system/dist/tokens.css');

const CSS_NAMED_COLORS = new Set([
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond',
  'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
  'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen',
  'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
  'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue',
  'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
  'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory',
  'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
  'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen',
  'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen',
  'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen',
  'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream',
  'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
  'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum',
  'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown',
  'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen',
  'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow',
  'yellowgreen'
]);

function getValidDSTokens(): Set<string> {
  const tokensContent = readFileSync(DS_TOKENS_PATH, 'utf-8');
  const tokens = new Set<string>();
  const varRegex = /^\s*(--[a-z0-9-]+):/gm;
  let match;
  while ((match = varRegex.exec(tokensContent)) !== null) {
    tokens.add(match[1]);
  }
  return tokens;
}

function getAllSourceFiles(dir: string, files: string[] = []): string[] {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (!entry.includes('__tests__') && !entry.includes('.test.') && entry !== 'node_modules' && entry !== 'ColorPicker') {
        getAllSourceFiles(fullPath, files);
      }
    } else if ((entry.endsWith('.ts') || entry.endsWith('.tsx')) &&
               !entry.includes('.test.') &&
               !entry.includes('.stories.')) {
      files.push(fullPath);
    }
  }
  return files;
}

interface ColorViolation {
  file: string;
  line: number;
  type: 'hex' | 'rgb' | 'hsl' | 'named' | 'invalid-var';
  value: string;
  context: string;
}

function scanFileForColors(filePath: string, validTokens: Set<string>): ColorViolation[] {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations: ColorViolation[] = [];
  const relativePath = filePath.replace(join(__dirname, '../../..'), '');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    const hexRegex = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
    let match;
    while ((match = hexRegex.exec(line)) !== null) {
      violations.push({
        file: relativePath,
        line: lineNum,
        type: 'hex',
        value: match[0],
        context: line.trim()
      });
    }

    const rgbRegex = /\b(rgb|rgba|hsl|hsla)\s*\([^)]+\)/g;
    while ((match = rgbRegex.exec(line)) !== null) {
      violations.push({
        file: relativePath,
        line: lineNum,
        type: line.includes('hsl') ? 'hsl' : 'rgb',
        value: match[0],
        context: line.trim()
      });
    }

    const quotedColorRegex = new RegExp(`['"]\\s*(${Array.from(CSS_NAMED_COLORS).join('|')})\\s*['"]`, 'gi');
    while ((match = quotedColorRegex.exec(line)) !== null) {
      const colorName = match[1].toLowerCase();
      if (colorName !== 'black' && colorName !== 'white') {
        violations.push({
          file: relativePath,
          line: lineNum,
          type: 'named',
          value: match[1],
          context: line.trim()
        });
      }
    }

    const bareColorRegex = new RegExp(`:\\s+(${Array.from(CSS_NAMED_COLORS).join('|')})\\s*[;!]`, 'gi');
    while ((match = bareColorRegex.exec(line)) !== null) {
      const colorName = match[1].toLowerCase();
      if (colorName !== 'black' && colorName !== 'white') {
        violations.push({
          file: relativePath,
          line: lineNum,
          type: 'named',
          value: match[1],
          context: line.trim()
        });
      }
    }

    const varRegex = /var\((--[a-z0-9-]+)\)/g;
    while ((match = varRegex.exec(line)) !== null) {
      const varName = match[1];
      if (!validTokens.has(varName)) {
        violations.push({
          file: relativePath,
          line: lineNum,
          type: 'invalid-var',
          value: varName,
          context: line.trim()
        });
      }
    }
  }

  return violations;
}

describe('Design System Colors', () => {
  it('should only use design system color tokens, not hardcoded colors', () => {
    const validTokens = getValidDSTokens();
    const srcDir = join(__dirname, '../../..');
    const sourceFiles = getAllSourceFiles(join(srcDir, 'src'));

    const allViolations: ColorViolation[] = [];
    for (const file of sourceFiles) {
      const violations = scanFileForColors(file, validTokens);
      allViolations.push(...violations);
    }

    if (allViolations.length > 0) {
      const report = allViolations.map(v =>
        `${v.file}:${v.line} [${v.type}] ${v.value}\n  ${v.context}`
      ).join('\n\n');

      fail(`Found ${allViolations.length} hardcoded color(s):\n\n${report}\n\nUse design system tokens instead.`);
    }

    expect(allViolations).toHaveLength(0);
  });
});
