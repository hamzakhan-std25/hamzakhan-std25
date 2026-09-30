import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { colors } from './lib/tokens.mjs';
import { document, escapeXml, gradientDefinitions, roundedBackground } from './lib/svg.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const profile = JSON.parse(await readFile(resolve(root, 'data/profile.json'), 'utf8'));

function proofChip(label, x) {
  return `<g transform="translate(${x} 244)"><rect width="248" height="48" rx="16" fill="${colors.panel}" stroke="${colors.border}"/><circle cx="22" cy="24" r="5" fill="url(#accent)"/><text x="38" y="30" fill="${colors.text}" font-size="18" font-weight="600">${escapeXml(label)}</text></g>`;
}

function hero() {
  const roles = profile.roles.map((role, index) => `<text class="role role-${index + 1}" x="54" y="116" fill="url(#accent)" font-size="34" font-weight="700">${escapeXml(role)}</text>`).join('');
  const value = 'Production-ready web apps with an AI layer that makes them smarter.';
  const styles = `.role { opacity: 0; animation: roleFade 9s infinite; } .role-2 { animation-delay: 3s; } .role-3 { animation-delay: 6s; } @keyframes roleFade { 0% { opacity: 0; transform: translateY(8px); } 6%, 30% { opacity: 1; transform: none; } 36%, 100% { opacity: 0; } } .orb { animation: drift 8s ease-in-out infinite alternate; } .orb-2 { animation-delay: -3s; } .pill { animation: pulse 4s ease-in-out infinite; transform-origin: center; } @keyframes drift { to { transform: translate(18px, -12px); } } @keyframes pulse { 50% { opacity: .72; } }`;
  const body = `${gradientDefinitions()}${roundedBackground(880, 320)}
<g opacity=".12" fill="none" stroke="${colors.accent2}">${Array.from({ length: 9 }, (_, index) => `<path d="M${54 + index * 92} 28v264"/>`).join('')}</g>
<circle class="orb" cx="760" cy="74" r="56" fill="${colors.accent2}" opacity=".12" filter="url(#softGlow)"/><circle class="orb orb-2" cx="720" cy="92" r="24" fill="${colors.accent1}" opacity=".22"/>
<text x="54" y="72" fill="${colors.text}" font-size="58" font-weight="800">${escapeXml(profile.name)}</text>
${roles}
<text x="54" y="158" fill="${colors.muted}" font-size="20">${escapeXml(value)}</text>
<g class="pill" transform="translate(54 180)"><rect width="238" height="40" rx="20" fill="${colors.accent1}" opacity=".16" stroke="${colors.accent1}"/><circle cx="20" cy="20" r="5" fill="${colors.accent1}"/><text x="34" y="26" fill="${colors.accent1}" font-size="16" font-weight="700">Open to opportunities</text></g>
${proofChip(profile.proofChips[0], 54)}${proofChip(profile.proofChips[1], 316)}${proofChip(profile.proofChips[2], 578)}`;
  return document({ width: 880, height: 320, title: `${profile.name}, ${profile.title}`, description: 'Animated profile banner with rotating roles and proof points.', body, styles });
}

function divider() {
  const styles = `.sweep { animation: sweep 5s ease-in-out infinite; } @keyframes sweep { from { transform: translateX(-220px); } to { transform: translateX(900px); } }`;
  const body = `${gradientDefinitions()}${roundedBackground(880, 24)}<rect x="24" y="11" width="832" height="2" rx="1" fill="${colors.border}"/><rect class="sweep" x="0" y="8" width="220" height="8" rx="4" fill="url(#accent)" opacity=".8"/>`;
  return document({ width: 880, height: 24, title: 'Section divider', description: 'Animated emerald to cyan divider line.', body, styles });
}

function cta() {
  const styles = `.glow { animation: glow 4s ease-in-out infinite; } @keyframes glow { 50% { opacity: .6; } }`;
  const body = `${gradientDefinitions()}${roundedBackground(880, 180)}<circle class="glow" cx="790" cy="42" r="86" fill="${colors.accent2}" opacity=".1" filter="url(#softGlow)"/><text x="48" y="76" fill="${colors.text}" font-size="38" font-weight="800">Let's build something together</text><text x="50" y="116" fill="${colors.muted}" font-size="20">${escapeXml(profile.links.email.replace('mailto:', ''))}</text><text x="50" y="148" fill="${colors.accent2}" font-size="18" class="mono">${escapeXml(profile.links.portfolio)}</text>`;
  return document({ width: 880, height: 180, title: 'Contact Hamza Khan', description: 'Contact call to action with email and portfolio address.', body, styles });
}

function experience() {
  const roles = profile.experience.map((item, index) => {
    const y = 78 + index * 98;
    const current = index === 0;
    const panel = current ? `<rect x="104" y="${y - 30}" width="724" height="72" rx="16" fill="${colors.panel}" stroke="${colors.accent1}" opacity=".95"/>` : '';
    const marker = `<circle cx="64" cy="${y}" r="${current ? 13 : 9}" fill="${current ? 'url(#accent)' : colors.panel2}" stroke="${current ? colors.accent1 : colors.border}" stroke-width="3"/>`;
    return `${panel}${marker}<text x="104" y="${y - 2}" fill="${colors.text}" font-size="24" font-weight="700">${escapeXml(item.role)}</text><text x="104" y="${y + 25}" fill="${colors.muted}" font-size="18">${escapeXml(item.company)} · ${escapeXml(item.location)} · ${escapeXml(item.period)}</text>`;
  }).join('');
  const styles = `.timeline { stroke-dasharray: 320; stroke-dashoffset: 320; animation: draw 2.5s ease-out forwards; } .node { animation: nodePulse 4s ease-in-out infinite; } @keyframes draw { to { stroke-dashoffset: 0; } } @keyframes nodePulse { 50% { opacity: .65; } }`;
  const body = `${gradientDefinitions()}${roundedBackground(880, 360)}<text x="48" y="42" fill="${colors.muted}" font-size="16" class="mono">EXPERIENCE / NEWEST FIRST</text><path class="timeline" d="M64 78 V274" fill="none" stroke="url(#accent)" stroke-width="4"/>${roles}`;
  return document({ width: 880, height: 360, title: 'Hamza Khan experience timeline', description: 'Three software development internships shown newest first, with the current role highlighted.', body, styles });
}

function skills() {
  const positions = [
    [164, 104],
    [440, 104],
    [716, 104],
    [164, 252],
    [440, 252],
    [716, 252]
  ];
  const clusters = profile.skillGroups.map((group, index) => {
    const [x, y] = positions[index];
    const ai = group.name === 'AI & Vector';
    const fill = ai ? colors.accent3 : colors.panel;
    const stroke = ai ? colors.accent3 : colors.border;
    return `<g class="cluster cluster-${index + 1}"><circle cx="${x}" cy="${y}" r="56" fill="${fill}" fill-opacity="${ai ? '.2' : '.95'}" stroke="${stroke}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${ai ? 66 : 61}" fill="none" stroke="${stroke}" stroke-opacity=".35"/><text x="${x}" y="${y - 4}" text-anchor="middle" fill="${colors.text}" font-size="18" font-weight="700">${escapeXml(group.name)}</text><text x="${x}" y="${y + 22}" text-anchor="middle" fill="${ai ? colors.accent3 : colors.muted}" font-size="14">${group.skills.length} skills</text></g>`;
  }).join('');
  const links = positions.slice(0, 3).map(([x]) => `<path d="M${x} 160 V196" stroke="${colors.border}" stroke-width="2"/>`).join('');
  const horizontal = `<path d="M164 178 H716" stroke="${colors.border}" stroke-width="2" stroke-dasharray="5 8"/>`;
  const styles = `.cluster { animation: orbit 8s ease-in-out infinite; transform-origin: center; } .cluster-2 { animation-delay: -2s; } .cluster-3 { animation-delay: -4s; } .cluster-4 { animation-delay: -1s; } .cluster-5 { animation-delay: -3s; } .cluster-6 { animation-delay: -5s; } @keyframes orbit { 50% { transform: translateY(-5px); } }`;
  const body = `${gradientDefinitions()}${roundedBackground(880, 340)}<text x="48" y="42" fill="${colors.muted}" font-size="16" class="mono">SKILL ECOSYSTEM / CONNECTED CAPABILITIES</text>${horizontal}${links}${clusters}`;
  return document({ width: 880, height: 340, title: 'Hamza Khan skill ecosystem', description: 'Connected clusters for frontend, backend, data, AI and vector, auth and security, and DevOps and cloud skills.', body, styles });
}

function pipeline() {
  const stages = [
    ['Query', 'user intent'],
    ['Embed', 'Gemini / OpenAI'],
    ['Vector Search', 'Pinecone / MongoDB'],
    ['LLM', 'Gemini / Groq'],
    ['Response', 'grounded answer']
  ];
  const nodes = stages.map(([label, detail], index) => {
    const x = 84 + index * 178;
    return `<g><circle cx="${x}" cy="100" r="30" fill="${index === 3 ? colors.accent3 : colors.panel}" fill-opacity=".25" stroke="${index === 3 ? colors.accent3 : colors.accent1}" stroke-width="2"/><text x="${x}" y="96" text-anchor="middle" fill="${colors.text}" font-size="16" font-weight="700">${escapeXml(label)}</text><text x="${x}" y="150" text-anchor="middle" fill="${colors.muted}" font-size="13">${escapeXml(detail)}</text></g>`;
  }).join('');
  const styles = `.packet { animation: travel 6s linear infinite; } @keyframes travel { from { offset-distance: 0%; } to { offset-distance: 100%; } }`;
  const body = `${gradientDefinitions()}${roundedBackground(880, 200)}<path id="flow" d="M84 100 H796" fill="none" stroke="${colors.border}" stroke-width="3"/><circle class="packet" r="7" fill="${colors.accent1}"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#flow"/></animateMotion></circle>${nodes}`;
  return document({ width: 880, height: 200, title: 'AI feature pipeline', description: 'Query, embedding, vector search, language model, and grounded response pipeline.', body, styles });
}

function projectCard(project) {
  const metrics = project.metrics.slice(0, 3).map((metric, index) => `<g transform="translate(${18 + index * 132} 158)"><rect width="120" height="48" rx="12" fill="${colors.panel2}" stroke="${colors.border}"/><text x="60" y="21" text-anchor="middle" fill="${colors.accent1}" font-size="18" font-weight="800">${escapeXml(metric.value)}</text><text x="60" y="37" text-anchor="middle" fill="${colors.muted}" font-size="10">${escapeXml(metric.label)}</text></g>`).join('');
  const feature = project.metrics.length ? metrics : `<g transform="translate(18 158)"><rect width="394" height="48" rx="12" fill="${colors.panel2}" stroke="${colors.border}"/><text x="197" y="29" text-anchor="middle" fill="${colors.accent2}" font-size="16" font-weight="700">Streaming · Voice · PWA</text></g>`;
  const statusColor = project.status === 'in-development' ? colors.warn : colors.accent1;
  const styles = `.scan { animation: scan 5s ease-in-out infinite; } @keyframes scan { 50% { opacity: .25; } }`;
  const body = `${gradientDefinitions()}${roundedBackground(430, 250)}<circle class="scan" cx="368" cy="48" r="38" fill="none" stroke="${statusColor}" stroke-width="2" opacity=".35"/><circle cx="32" cy="28" r="5" fill="${statusColor}"/><text x="46" y="34" fill="${statusColor}" font-size="14" font-weight="700">${escapeXml(project.statusNote)}</text><text x="18" y="86" fill="${colors.text}" font-size="30" font-weight="800">${escapeXml(project.title)}</text><text x="18" y="116" fill="${colors.muted}" font-size="15">${escapeXml(project.tagline)}</text>${feature}<text x="18" y="232" fill="${colors.muted}" font-size="12" class="mono">${escapeXml(project.stack.slice(0, 5).join(' · '))}</text>`;
  return document({ width: 430, height: 250, title: project.title, description: `${project.title}: ${project.tagline}.`, body, styles });
}

function socialCard(label, kind, accent) {
  const icon = kind === 'email' ? '@' : kind === 'github' ? '</>' : kind === 'linkedin' ? 'in' : '↗';
  const body = `${roundedBackground(210, 72)}<circle cx="32" cy="36" r="18" fill="${accent}" fill-opacity=".18" stroke="${accent}"/><text x="32" y="43" text-anchor="middle" fill="${accent}" font-size="16" font-weight="800">${escapeXml(icon)}</text><text x="62" y="42" fill="${colors.text}" font-size="18" font-weight="700">${escapeXml(label)}</text>`;
  return document({ width: 210, height: 72, title: `${label} link`, description: `Link to Hamza Khan's ${label}.`, body });
}

const outputs = new Map([
  ['assets/hero.svg', hero()],
  ['assets/divider.svg', divider()],
  ['assets/cta.svg', cta()],
  ['assets/experience.svg', experience()],
  ['assets/skills.svg', skills()],
  ['assets/pipeline.svg', pipeline()],
  ...profile.projects.map((project) => [`assets/projects/${project.id}.svg`, projectCard(project)]),
  ['assets/socials/linkedin.svg', socialCard('LinkedIn', 'linkedin', colors.accent2)],
  ['assets/socials/github.svg', socialCard('GitHub', 'github', colors.text)],
  ['assets/socials/email.svg', socialCard('Email', 'email', colors.accent1)],
  ['assets/socials/portfolio.svg', socialCard('Portfolio', 'portfolio', colors.accent3)]
]);

for (const [relativePath, content] of outputs) {
  const target = resolve(root, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, 'utf8');
  console.log(`${relativePath}: ${Buffer.byteLength(content)} bytes`);
}