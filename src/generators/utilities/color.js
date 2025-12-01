export function generateUtilityColor(theme) {
    const { colors } = theme;

    let css = `/* === Utility: Colors (text & background) === */\n`;
    css += `/* Couleurs de texte et fonds synchronisés avec les variables */\n`;

    for (const name of Object.keys(colors)) {
        css += `.text-${name} { color: var(--color-${name}); }\n`;
        css += `.text-${name}-light { color: var(--color-${name}-light); }\n`;
        css += `.text-${name}-dark { color: var(--color-${name}-dark); }\n`;

        css += `.bg-${name} { background-color: var(--color-${name}); }\n`;
        css += `.bg-${name}-light { background-color: var(--color-${name}-light); }\n`;
        css += `.bg-${name}-dark { background-color: var(--color-${name}-dark); }\n`;
    }

    return css + '\n';
}
