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

  // Create header
  const headerContent = [];
  
  const safeName = escapeMarkdown((d.name || '').trim());
  const safeTagline = escapeMarkdown((d.tagline || '').trim());
  
  headerContent.push(safeName ? `# ${safeName}` : '# Welcome to My GitHub Profile');
  
  if (safeTagline) {
    headerContent.push(`\n**${safeTagline}**\n`);
  }

  const header = headerContent.join('\n');

  const about = d.about ? d.about : '';

  const skills = skillsArr.length
    ? skillsArr.map((s) => {
        const icon = skillsMap[s];
        if (icon) {
          const url = getSkillLink(s);
          // Make icon clickable; keep alt marker for preview sizing and use title for tooltip
          return `[![skill:${s}](${icon} "${s}")](${url})`;
        }
        return `\`${s}\``;
      }).join(' ')
    : '';

  const projectsMd = projects
    .filter(p => p && (p.name || p.link || p.description))
    .map(p => {
      const title = p.link
        ? `**[${p.name || p.link}](${p.link})**`
        : `**${p.name || 'Project'}**`;
      const desc = p.description ? ` — ${p.description}` : '';
      return `- ${title}${desc}`;
    })
    // Add a blank line between entries for visual spacing
    .join('\n\n');

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
  const socialSection = socialsMd ? `${socialsMd}` : '';

  // Add visitor counter as separate section - always create if username exists
  const visitorCounter = username 
    ? `![Profile Views](https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat)` 
    : '';

  const statsMd = username
    ? [
        `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent)`,
        `![GitHub Streak](https://streak-stats.demolab.com?user=${username}&theme=transparent)`,
        `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent)`,
      ].join('\n\n')
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

  return sections.join('\n');
}

// Extracts a usable image URL from various inputs (raw URL, HTML embed snippet, Tenor/Imgur etc.)
function extractImageUrl(input) {
  if (!input) return '';
  const val = String(input).trim();
  // If it's already a direct URL
  if (/^https?:\/\//i.test(val)) return val;
  // Try to pull src="..." from an HTML snippet
  const srcMatch = val.match(/src\s*=\s*"([^"]+)"/i) || val.match(/src\s*=\s*'([^']+)'/i);
  if (srcMatch && srcMatch[1]) return srcMatch[1];
  // Tenor/embed script blocks - try to find a URL inside
  const urlMatch = val.match(/https?:[^\s"')]+\.(?:png|jpe?g|gif|webp|svg)/i);
  if (urlMatch) return urlMatch[0];
  return '';
}

// Very small allowlist sanitizer for <img src>
function sanitizeUrlForImgSrc(url) {
  if (!url) return '';
  const trimmed = String(url).trim();
  // Only allow http(s) and data URIs to keep README safe
  if (/^(https?:|data:)/i.test(trimmed)) return trimmed;
  return '';
}

// Escapes Markdown special characters in user-provided text
function escapeMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/([*_`~])/g, '\\$1') // emphasis, code, strikethrough
    .replace(/^(\s*)#/gm, '$1\\#') // headings
    .replace(/\|/g, '\\|'); // table pipes
}

// Escape characters in HTML attributes
function escapeHtmlAttr(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
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
    twitter: 'X',
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
    twitter: 'x',
    instagram: 'instagram',
    medium: 'medium',
    website: 'globe',
    email: 'gmail'
  };
  return logos[key] || key;
}

function getSkillLink(name) {
  const n = (name || '').toLowerCase();
  const map = {
    'html': 'https://developer.mozilla.org/docs/Web/HTML',
    'css': 'https://developer.mozilla.org/docs/Web/CSS',
    'javascript': 'https://developer.mozilla.org/docs/Web/JavaScript',
    'typescript': 'https://www.typescriptlang.org/',
    'react': 'https://react.dev/',
    'vue.js': 'https://vuejs.org/',
    'angular': 'https://angular.dev/',
    'svelte': 'https://svelte.dev/',
    'node.js': 'https://nodejs.org/',
    'python': 'https://www.python.org/',
    'java': 'https://www.oracle.com/java/',
    'rust': 'https://www.rust-lang.org/',
    'go': 'https://go.dev/',
    'php': 'https://www.php.net/',
    'kotlin': 'https://kotlinlang.org/',
    'swift': 'https://developer.apple.com/swift/',
    'mysql': 'https://www.mysql.com/',
    'postgresql': 'https://www.postgresql.org/',
    'mongodb': 'https://www.mongodb.com/',
    'docker': 'https://www.docker.com/'
  };
  if (map[n]) return map[n];
  const encoded = encodeURIComponent(name || '');
  return `https://www.google.com/search?q=${encoded}`;
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
    return `https://x.com/${value.replace('@', '')}`;
  }
  if (key === 'linkedin' && !value.startsWith('http')) {
    return `https://linkedin.com/in/${value}`;
  }
  
  return value.startsWith('http') ? value : `https://${value}`;
}