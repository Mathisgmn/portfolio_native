import { wrapWithBreakpoint } from '../../utils/breakpoints.js';

export function generateSpacing(theme) {
    const spacingTheme = theme.spacing;
    const baseUnit = spacingTheme.baseUnit;
    const breakpoints = theme.layout ? theme.layout.breakpoints : {};

    const scale = {
        0: 0,
        1: 0.25,
        2: 0.5,
        3: 1,
        4: 1.5,
        5: 2
    };

    let css = `/* === Spacing === */
/* Échelle d'espacement dérivée de l'unité de base */
:root {
  --spacing-base: ${baseUnit};
`;

    for (const [key, factor] of Object.entries(scale)) {
        css += `  --spacing-${key}: calc(var(--spacing-base) * ${factor});\n`;
    }
    css += `}\n\n`;

    // Classes .m-1, .mt-1, .mb-1, .mx-1, .my-1, .p-1, etc.
    const props = [
        ['m', ['margin']],
        ['mt', ['margin-top']],
        ['mb', ['margin-bottom']],
        ['ml', ['margin-left']],
        ['mr', ['margin-right']],
        ['mx', ['margin-left', 'margin-right']],
        ['my', ['margin-top', 'margin-bottom']],
        ['p', ['padding']],
        ['pt', ['padding-top']],
        ['pb', ['padding-bottom']],
        ['pl', ['padding-left']],
        ['pr', ['padding-right']],
        ['px', ['padding-left', 'padding-right']],
        ['py', ['padding-top', 'padding-bottom']],
        ['gap', ['gap']]
    ];
    const buildSet = (prefix = '', indent = '') => {
        let block = '';
        for (const key of Object.keys(scale)) {
            for (const [short, cssProps] of props) {
                block += `${indent}.${prefix}${short}-${key} {\n`;
                for (const prop of cssProps) {
                    block += `${indent}  ${prop}: var(--spacing-${key});\n`;
                }
                block += `${indent}}\n`;
            }
        }
        return block;
    };

    css += buildSet();

    for (const [bpName, minWidth] of Object.entries(breakpoints)) {
        const responsive = buildSet(`${bpName}\\:`, '  ');
        css += wrapWithBreakpoint(bpName, minWidth, responsive);
    }

    return css + '\n';
}
