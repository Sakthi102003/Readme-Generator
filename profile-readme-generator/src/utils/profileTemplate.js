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

  // Create header with avatar if provided
  const headerContent = [];
  
  if (d.avatar) {
    headerContent.push(`<div align="center">\n\n<img src="${d.avatar}" alt="${d.name || 'Profile'}" width="200" height="200" style="border-radius: 50%;" />\n\n</div>`);
  }
  
  headerContent.push(d.name ? `# ${d.name}` : '# Welcome to My GitHub Profile');
  
  if (d.tagline) {
    headerContent.push(`\n*${d.tagline}*\n`);
  }

  const header = headerContent.join('\n');

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
      if (!socialConfig) return '';
      
      const label = getSocialLabel(k);
      const url = formatSocialUrl(k, v);
      const color = socialConfig.color || '#666';
      
      // Create styled badge similar to shields.io
      return `[![${label}](https://img.shields.io/badge/${label}-%23${color.replace('#', '')}.svg?style=for-the-badge&logo=${getSocialLogo(k)}&logoColor=white)](${url})`;
    })
    .filter(Boolean)
    .join(' ');

  // Create social section without visitor counter
  const socialSection = socialsMd ? `<div align="center">\n\n${socialsMd}\n\n</div>` : '';

  // Add visitor counter as separate section - always create if username exists
  const visitorCounter = username 
    ? `<div align="center">\n\n![Profile Views](https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat)\n\n</div>` 
    : '';

  const statsMd = username
    ? `<div align="center">\n\n${[
        `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent)`,
        `![GitHub Streak](https://streak-stats.demolab.com?user=${username}&theme=transparent)`,
        `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent)`,
      ].join('\n\n')}\n\n</div>`
    : '';

  // Build sections array - always include header
  const sections = [
    header,                                          // 1. Image (header with name/tagline/avatar)
  ];

  // Add sections conditionally but ensure they appear when they have content
  if (socialsMd) {
    sections.push(section('Connect with Me', socialSection));  // 2. Socials
  }
  
  if (username) {
    sections.push(section('Profile Views', visitorCounter));    // 3. Profile views
  }
  
  if (about) {
    sections.push(section('About Me', about));                  // 4. About me
  }
  
  if (skillsArr.length > 0) {
    sections.push(section('Skills', skills));                   // 5. Tech Stacks
  }
  
  if (username) {
    sections.push(section('GitHub Stats', statsMd));            // 6. Stats
  }
  
  if (projectsMd) {
    sections.push(section('Featured Projects', projectsMd));    // Additional: Projects
  }
  
  if (d.funFact) {
    sections.push(section('Fun Fact', d.funFact));             // Additional: Fun Fact
  }

  return sections.join('\n');
}

function capitalize(s) { return (s || '').charAt(0).toUpperCase() + (s || '').slice(1); }

function formatSocial(key, value) {
  if (key === 'github' && !value.startsWith('http')) return `[${value}](https://github.com/${value})`;
  if (key === 'email' && value && !value.startsWith('http')) return `[${value}](mailto:${value})`;
  return value;
}

function getSocialLabel(key) {
  const labels = {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    instagram: 'Instagram',
    medium: 'Medium',
    website: 'Website',
    email: 'Email'
  };
  return labels[key] || capitalize(key);
}

function getSocialLogo(key) {
  const logos = {
    github: 'github',
    linkedin: 'linkedin',
    twitter: 'twitter',
    instagram: 'instagram',
    medium: 'medium',
    website: 'globe',
    email: 'gmail'
  };
  return logos[key] || key;
}

function formatSocialUrl(key, value) {
  if (!value) return '#';
  
  if (key === 'github' && !value.startsWith('http')) {
    return `https://github.com/${value}`;
  }
  if (key === 'email' && !value.startsWith('http') && !value.startsWith('mailto:')) {
    return `mailto:${value}`;
  }
  if (key === 'twitter' && !value.startsWith('http')) {
    return `https://twitter.com/${value.replace('@', '')}`;
  }
  if (key === 'linkedin' && !value.startsWith('http')) {
    return `https://linkedin.com/in/${value}`;
  }
  
  return value.startsWith('http') ? value : `https://${value}`;
}