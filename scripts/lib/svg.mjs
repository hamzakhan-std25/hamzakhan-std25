import { colors, fonts } from './tokens.mjs';

export function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function document({ width, height, title, description, body, styles = '' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" role="img">
<title>${escapeXml(title)}</title>
<desc>${escapeXml(description)}</desc>
<style>
:root { --bg: ${colors.bg}; --panel: ${colors.panel}; --panel-2: ${colors.panel2}; --border: ${colors.border}; --accent-1: ${colors.accent1}; --accent-2: ${colors.accent2}; --accent-3: ${colors.accent3}; --text: ${colors.text}; --muted: ${colors.muted}; --warn: ${colors.warn}; }
text { font-family: ${fonts.sans}; }
.mono { font-family: ${fonts.mono}; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; } }
${styles}
</style>
${body}
</svg>
`;
}

export function roundedBackground(width, height) {
  return `<rect width="${width}" height="${height}" rx="22" fill="${colors.bg}" stroke="${colors.border}"/>`;
}

export function gradientDefinitions() {
  return `<defs>
  <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${colors.accent1}"/><stop offset="100%" stop-color="${colors.accent2}"/></linearGradient>
  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
</defs>`;
}