import { wrapWithBreakpoint } from '../../utils/breakpoints.js';

export function generateLayout(theme) {
    const { layout } = theme;
    const cols = layout.cols;
    const breakpoints = layout.breakpoints;

    let css = `/* === Layout & Grid === */
/* Variables partagées par le système de grille */
:root {
  --container-max-width: ${layout.container};
  --grid-columns: ${cols};
}

/* Container centré */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Ligne de grille */
.row {
  display: flex;
  flex-wrap: wrap;
}

/* Colonnes de base (mobile) */
`;

    // Colonnes .col-1 ... .col-N
    for (let i = 1; i <= cols; i++) {
        const percent = (i / cols) * 100;
        css += `.col-${i} {
  flex: 0 0 ${percent.toFixed(6)}%;
  max-width: ${percent.toFixed(6)}%;
}\n`;
    }

    // Variantes responsives .md:col-6, etc
    for (const [bpName, minWidth] of Object.entries(breakpoints)) {
        let inner = '';
        for (let i = 1; i <= cols; i++) {
            const percent = (i / cols) * 100;
            inner += `  .${bpName}\\:col-${i} {
    flex: 0 0 ${percent.toFixed(6)}%;
    max-width: ${percent.toFixed(6)}%;
  }\n`;
        }
        css += wrapWithBreakpoint(bpName, minWidth, inner);
    }

    return css + '\n';
}
