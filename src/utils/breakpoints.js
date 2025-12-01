/**
 * Génère un bloc @media pour un breakpoint (sm, md, …)
 */
export function wrapWithBreakpoint(breakpointName, minWidth, content) {
    return `
@media (min-width: ${minWidth}) {
${content}
}
`;
}
