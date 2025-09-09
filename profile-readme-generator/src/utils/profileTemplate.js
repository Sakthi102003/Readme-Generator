// Converts user data to a Markdown README string
import { defaultSkills, socialFields } from '../config';

export function profileTemplate(data) {
  const d = data || {};
  const socials = d.socials || {};
  const username = (socials.github || '').trim();
  const skillsArr = Array.isArray(d.skills) ? d.skills : [];
  const projects = Array.isArray(d.projects) ? d.projects : [];

  // Create a mapping of skill names to icons
  const skillsMap = defaultSkills.reduce((acc, skill) => {
    acc[skill.name] = skill.icon;
    return acc;
  }, {});

  const section = (title, content) => content ? `\n## ${title}\n\n${content}\n` : '';

  const header = [
    d.name ? `# ${d.name}` : '# Welcome to My GitHub Profile',
    d.tagline ? `\n${d.tagline}\n` : '',
  ].join('\n');

  const about = d.about ? d.about : '';

  const skills = skillsArr.length
    ? `<div align="center">\n\n` + 
      skillsArr.map((s) => {
        const icon = skillsMap[s];
        return icon 
          ? `<img src="${icon}" alt="${s}" width="45" height="45" title="${s}" />`
          : `<code>${s}</code>`;
      }).join('&nbsp;&nbsp;&nbsp;') +
      `\n\n</div>`
    : '';

  const projectsMd = projects
    .filter(p => p && (p.name || p.link || p.description))
    .map(p => `- ${p.link ? `[${p.name || p.link}](${p.link})` : (p.name || 'Project')}${p.description ? ` — ${p.description}` : ''}`)
    .join('\n');

  // Create a mapping of social field names to their configurations
  const socialsMap = socialFields.reduce((acc, social) => {
    acc[social.id] = social;
    return acc;
  }, {});

  const socialsMd = Object.entries(socials)
    .filter(([_, v]) => v)
    .map(([k, v]) => {
      const socialConfig = socialsMap[k];
      const icon = socialConfig?.icon;
      const isImageIcon = icon && (icon.startsWith('http') || icon.startsWith('data:'));
      
      let iconMd = '';
      if (isImageIcon) {
        iconMd = `<img src="${icon}" alt="${socialConfig.label}" width="20" height="20" /> `;
      } else if (icon) {
        iconMd = `${icon} `;
      }
      
      return `<p>${iconMd}<strong>${capitalize(k)}:</strong> ${formatSocial(k, v)}</p>`;
    })
    .join('\n');

  const statsMd = username
    ? [
        `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent)`,
        `![GitHub Streak](https://streak-stats.demolab.com?user=${username}&theme=transparent)`,
        `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent)`,
      ].join('\n\n')
    : '';

  return [
    header,
    section('About Me', about),
    section('Skills', skills),
    section('GitHub Stats', statsMd),
    section('Featured Projects', projectsMd),
    section('Fun Fact', d.funFact),
    section('Connect with Me', socialsMd),
  ].filter(Boolean).join('\n');
}

function capitalize(s) { return (s || '').charAt(0).toUpperCase() + (s || '').slice(1); }

function formatSocial(key, value) {
  if (key === 'github' && !value.startsWith('http')) return `[${value}](https://github.com/${value})`;
  if (key === 'email' && value && !value.startsWith('http')) return `[${value}](mailto:${value})`;
  return value;
}