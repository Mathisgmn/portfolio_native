// build.js
import fs from 'node:fs/promises';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import config from './plugo.config.js';
import { generateColors } from './src/generators/theme/colors.js';
import { generateTypography } from './src/generators/theme/typography.js';
import { generateLayout } from './src/generators/theme/layout.js';
import { generateComponentButton } from './src/generators/components/button.js';
import { generateComponentCard } from './src/generators/components/card.js';
import { generateComponentAlert } from './src/generators/components/alert.js';
import { generateUtilityFlex } from './src/generators/utilities/flex.js';
import { generateUtilityGrid } from './src/generators/utilities/grid.js';
import { generateUtilityColor } from './src/generators/utilities/color.js';
import { generateUtilitySpacing } from './src/generators/utilities/spacing.js';
import { generateUtilityImage } from './src/generators/utilities/image.js';
import { countClasses, formatSize } from './src/utils/report.js';

const OUTPUT_DIR = './dist';
const OUTPUT_FILE = `${OUTPUT_DIR}/plugo.css`;
const OUTPUT_MIN_FILE = `${OUTPUT_DIR}/plugo.min.css`;

function generateCSS(currentConfig) {
    const { theme } = currentConfig;

    let css = `/* ==========================================================
 * Plugo CSS Framework
 * Fichier généré automatiquement - ne pas modifier à la main.
 * ========================================================== */
`;

    // Thème global
    css += generateColors(theme, currentConfig.darkMode);
    css += generateTypography(theme);
    css += generateLayout(theme);

    // Components
    if (currentConfig.components.includes('button')) {
        css += generateComponentButton(theme);
    }
    if (currentConfig.components.includes('card')) {
        css += generateComponentCard(theme);
    }
    if (currentConfig.components.includes('alert')) {
        css += generateComponentAlert(theme);
    }

    // Utilities
    if (currentConfig.utilities.includes('flex')) {
        css += generateUtilityFlex(theme);
    }
    if (currentConfig.utilities.includes('grid')) {
        css += generateUtilityGrid(theme);
    }
    if (currentConfig.utilities.includes('color')) {
        css += generateUtilityColor(theme);
    }
    if (currentConfig.utilities.includes('spacing')) {
        css += generateUtilitySpacing(theme);
    }
    if (currentConfig.utilities.includes('image')) {
        css += generateUtilityImage();
    }

    return css;
}

async function runBuild() {
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        const rawCss = generateCSS(config);

        // CSS avec autoprefixer (non minifié)
        const prefixed = await postcss([autoprefixer]).process(rawCss, {
            from: undefined
        });

        await fs.writeFile(OUTPUT_FILE, prefixed.css, 'utf8');

        // CSS minifié (autoprefixer + cssnano)
        const minified = await postcss([
            autoprefixer,
            cssnano({ preset: 'default' })
        ]).process(rawCss, {
            from: undefined
        });

        await fs.writeFile(OUTPUT_MIN_FILE, minified.css, 'utf8');

        // Rapport de build (bonus)
        const totalClasses = countClasses(prefixed.css);

        const sizeRaw = Buffer.byteLength(rawCss, 'utf8');
        const sizePrefixed = Buffer.byteLength(prefixed.css, 'utf8');
        const sizeMin = Buffer.byteLength(minified.css, 'utf8');

        console.log('✅ Build Plugo terminé !');
        console.log('───────────────────────────────');
        console.log(`Classes générées : ${totalClasses}`);
        console.log(`Taille brute      : ${formatSize(sizeRaw)}`);
        console.log(`Taille plugo.css  : ${formatSize(sizePrefixed)}`);
        console.log(`Taille plugo.min.css : ${formatSize(sizeMin)}`);
        console.log('Fichiers générés :');
        console.log(` - ${OUTPUT_FILE}`);
        console.log(` - ${OUTPUT_MIN_FILE}`);
        console.log('───────────────────────────────');
    } catch (err) {
        console.error('❌ Erreur lors du build :', err);
        process.exit(1);
    }
}

runBuild();
