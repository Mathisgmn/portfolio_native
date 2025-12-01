import { wrapWithBreakpoint } from '../../utils/breakpoints.js';

const GAP_SCALE = {
    0: 0,
    1: 0.25,
    2: 0.5,
    3: 1,
    4: 1.5,
    5: 2
};

export function generateUtilityGrid(theme) {
    const { layout, spacing } = theme;
    const cols = layout.cols || 12;
    const breakpoints = layout.breakpoints || {};
    const baseUnit = spacing?.baseUnit || '1rem';
    const useSpacingVariables = Boolean(spacing);

    let css = `/* === Utility: Grid === */
/* Ensemble de classes utilitaires pour composer des grilles CSS rapidement */
.grid { display: grid; }
.inline-grid { display: inline-grid; }
\n`;

    const baseClasses = [
        'grid',
        'inline-grid',
        'auto-rows-auto',
        'auto-rows-min',
        'auto-rows-max',
        'auto-rows-fr',
        'auto-cols-auto',
        'auto-cols-min',
        'auto-cols-max',
        'auto-cols-fr',
        'items-start',
        'items-center',
        'items-end',
        'items-stretch',
        'justify-items-start',
        'justify-items-center',
        'justify-items-end',
        'justify-items-stretch',
        'content-start',
        'content-center',
        'content-between',
        'content-around',
        'content-end',
        'content-stretch',
        'place-items-center',
        'place-content-center'
    ];

    for (let i = 1; i <= cols; i++) {
        baseClasses.push(`grid-cols-${i}`);
    }

    for (const gapKey of Object.keys(GAP_SCALE)) {
        baseClasses.push(`gap-${gapKey}`);
        baseClasses.push(`gap-x-${gapKey}`);
        baseClasses.push(`gap-y-${gapKey}`);
    }

    for (const cls of baseClasses) {
        css += `.${cls} { ${getUtilityGridRuleForClass(cls, useSpacingVariables, baseUnit)} }\n`;
    }

    for (const [bpName, minWidth] of Object.entries(breakpoints)) {
        let inner = '';
        for (const cls of baseClasses) {
            inner += `  .${bpName}\\:${cls} { ${getUtilityGridRuleForClass(cls, useSpacingVariables, baseUnit)} }\n`;
        }
        css += wrapWithBreakpoint(bpName, minWidth, inner);
    }

    return css;
}

function getUtilityGridRuleForClass(cls, useSpacingVariables, baseUnit) {
    if (cls.startsWith('grid-cols-')) {
        const count = parseInt(cls.replace('grid-cols-', ''), 10);
        return `grid-template-columns: repeat(${count}, minmax(0, 1fr));`;
    }

    if (cls.startsWith('gap-x-')) {
        const key = cls.replace('gap-x-', '');
        return `column-gap: ${resolveGapValue(key, useSpacingVariables, baseUnit)};`;
    }

    if (cls.startsWith('gap-y-')) {
        const key = cls.replace('gap-y-', '');
        return `row-gap: ${resolveGapValue(key, useSpacingVariables, baseUnit)};`;
    }

    if (cls.startsWith('gap-')) {
        const key = cls.replace('gap-', '');
        return `gap: ${resolveGapValue(key, useSpacingVariables, baseUnit)};`;
    }

    switch (cls) {
        case 'grid':
            return 'display: grid;';
        case 'inline-grid':
            return 'display: inline-grid;';
        case 'auto-rows-auto':
            return 'grid-auto-rows: auto;';
        case 'auto-rows-min':
            return 'grid-auto-rows: min-content;';
        case 'auto-rows-max':
            return 'grid-auto-rows: max-content;';
        case 'auto-rows-fr':
            return 'grid-auto-rows: minmax(0, 1fr);';
        case 'auto-cols-auto':
            return 'grid-auto-columns: auto;';
        case 'auto-cols-min':
            return 'grid-auto-columns: min-content;';
        case 'auto-cols-max':
            return 'grid-auto-columns: max-content;';
        case 'auto-cols-fr':
            return 'grid-auto-columns: minmax(0, 1fr);';
        case 'items-start':
            return 'align-items: start;';
        case 'items-center':
            return 'align-items: center;';
        case 'items-end':
            return 'align-items: end;';
        case 'items-stretch':
            return 'align-items: stretch;';
        case 'justify-items-start':
            return 'justify-items: start;';
        case 'justify-items-center':
            return 'justify-items: center;';
        case 'justify-items-end':
            return 'justify-items: end;';
        case 'justify-items-stretch':
            return 'justify-items: stretch;';
        case 'content-start':
            return 'justify-content: start; align-content: start;';
        case 'content-center':
            return 'justify-content: center; align-content: center;';
        case 'content-between':
            return 'justify-content: space-between; align-content: space-between;';
        case 'content-around':
            return 'justify-content: space-around; align-content: space-around;';
        case 'content-end':
            return 'justify-content: end; align-content: end;';
        case 'content-stretch':
            return 'justify-content: stretch; align-content: stretch;';
        case 'place-items-center':
            return 'place-items: center;';
        case 'place-content-center':
            return 'place-content: center;';
        default:
            return '';
    }
}

function resolveGapValue(key, useSpacingVariables, baseUnit) {
    const factor = GAP_SCALE[key];

    if (factor === undefined) {
        return '0';
    }

    if (useSpacingVariables) {
        return `var(--spacing-${key})`;
    }

    return `calc(${baseUnit} * ${factor})`;
}
