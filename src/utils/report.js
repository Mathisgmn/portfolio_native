/**
 * Très basique : compte les classes via regex `.nom {`
 */
export function countClasses(css) {
    const matches = css.match(/\.[a-zA-Z0-9\\:_-]+\s*\{/g) || [];
    return matches.length;
}

export function formatSize(bytes) {
    return (bytes / 1024).toFixed(2) + ' kB';
}
