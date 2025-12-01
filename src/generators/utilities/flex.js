import { wrapWithBreakpoint } from '../../utils/breakpoints.js';

export function generateUtilityFlex(theme) {
    const breakpoints = theme.layout.breakpoints;

    let css = `/* === Utility: Flex === */
/* Bloc de base pour aligner rapidement les éléments */
.flex { display: flex; }
.inline-flex { display: inline-flex; }

/* Sens de la ligne */
.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }

/* Alignement vertical */
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }

/* Répartition horizontale */
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }

/* Gestion du retour à la ligne */
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }
\n`;

    // Variantes responsives .md:flex, etc.
    const baseClasses = [
        'flex',
        'inline-flex',
        'flex-row',
        'flex-col',
        'items-start',
        'items-center',
        'items-end',
        'justify-start',
        'justify-center',
        'justify-between',
        'justify-end',
        'flex-wrap',
        'flex-nowrap'
    ];

    for (const [bpName, minWidth] of Object.entries(breakpoints)) {
        let inner = '';
        for (const cls of baseClasses) {
            inner += `  .${bpName}\\:${cls} { ${getUtilityFlexRuleForClass(cls)} }\n`;
        }
        css += wrapWithBreakpoint(bpName, minWidth, inner);
    }

    return css;
}

function getUtilityFlexRuleForClass(cls) {
    switch (cls) {
        case 'flex':
            return 'display: flex;';
        case 'inline-flex':
            return 'display: inline-flex;';
        case 'flex-row':
            return 'flex-direction: row;';
        case 'flex-col':
            return 'flex-direction: column;';
        case 'items-start':
            return 'align-items: flex-start;';
        case 'items-center':
            return 'align-items: center;';
        case 'items-end':
            return 'align-items: flex-end;';
        case 'justify-start':
            return 'justify-content: flex-start;';
        case 'justify-center':
            return 'justify-content: center;';
        case 'justify-between':
            return 'justify-content: space-between;';
        case 'justify-end':
            return 'justify-content: flex-end;';
        case 'flex-wrap':
            return 'flex-wrap: wrap;';
        case 'flex-nowrap':
            return 'flex-wrap: nowrap;';
        default:
            return '';
    }
}
