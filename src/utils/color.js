export const LIGHT_FACTOR = 0.2;
export const DARK_FACTOR = -0.2;

/**
 * Convert HEX (#rrggbb) -> { r,g,b }
 */
export function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

/**
 * Convert {r,g,b} -> HEX
 */
export function rgbToHex({ r, g, b }) {
    const toHex = (v) => {
        const h = v.toString(16);
        return h.length === 1 ? '0' + h : h;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
}

/**
 * Ajuste la luminosité d'une couleur.
 * percent > 0 → éclaircit, percent < 0 → assombrit
 * Ex: 0.2 = +20%, -0.2 = -20%
 */
export function adjustColorLuminance(hex, percent) {
    const { r, g, b } = hexToRgb(hex);
    const adjust = (c) => {
        if (percent > 0) {
            return Math.round(c + (255 - c) * percent);
        }
        return Math.round(c * (1 + percent));
    };
    return rgbToHex({
        r: Math.min(255, Math.max(0, adjust(r))),
        g: Math.min(255, Math.max(0, adjust(g))),
        b: Math.min(255, Math.max(0, adjust(b)))
    });
}
