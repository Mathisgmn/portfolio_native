export function generateTypography(theme) {
    const { typography, spacing } = theme;
    const lineHeightRatio = parseFloat(spacing.ratioLineHeight || '1.25');

    return `/* === Typography === */
/* Polices et hauteurs de ligne pour tout le document */
:root {
  --font-main: ${typography.main};
  --font-headlines: ${typography.headlines};
  --line-height-ratio: ${lineHeightRatio};
}

/* Reset léger pour partir d'une base propre */
html, body {
  margin: 0;
  padding: 0;
  font-family: var(--font-main);
  line-height: var(--line-height-ratio);
}

/* Les titres restent cohérents quelle que soit la police */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-headlines);
  line-height: var(--line-height-ratio);
  margin: 0 0 0.5em 0;
}

/* Exemple de tailles basiques */
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

/* Paragraphe avec marge par défaut, facile à surcharger */
p {
  margin: 0 0 1em 0;
}

`;
}
