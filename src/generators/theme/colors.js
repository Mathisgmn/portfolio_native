import { adjustColorLuminance, DARK_FACTOR, LIGHT_FACTOR } from '../../utils/color.js';

export function generateColors(theme, isDarkModeEnabled) {
    const { colors } = theme;

    let css = `/* === Colors & CSS variables === */\n`;
    css += `/* Variables principales, utilisées partout dans le thème */\n:root {\n`;
    for (const [name, value] of Object.entries(colors)) {
        const light = adjustColorLuminance(value, LIGHT_FACTOR);
        const dark = adjustColorLuminance(value, DARK_FACTOR);
        css += `  --color-${name}: ${value};\n`;
        css += `  --color-${name}-light: ${light};\n`;
        css += `  --color-${name}-dark: ${dark};\n`;
    }

    css += `}\n\n`;

    // Mode sombre optionnel
    if (isDarkModeEnabled) {
        css += `/* Palette ajustée quand [data-theme="dark"] est présent */\n[data-theme="dark"] {\n`;
        for (const [name, value] of Object.entries(colors)) {
            const darker = adjustColorLuminance(value, -0.35);
            const lighter = adjustColorLuminance(value, 0.1);
            css += `  --color-${name}: ${darker};\n`;
            css += `  --color-${name}-light: ${value};\n`;
            css += `  --color-${name}-dark: ${lighter};\n`;
        }
        css += `}\n\n`;
    }

    return css;
}
