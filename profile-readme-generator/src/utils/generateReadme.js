import { profileTemplate } from './profileTemplate';

// Post-process markdown so that skill icons render small on GitHub by
// converting our skill-marked markdown images to HTML with width/height.
function shrinkSkillIcons(markdown, size = 28) {
  if (!markdown) return markdown;
  const w = String(size);

  // Pattern 1: Linked skill icons
  // [![skill:Name](ICON "Name")](LINK)
  const linkedPattern = /\[!\[skill:([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)\]\(([^\s)]+)\)/g;
  markdown = markdown.replace(linkedPattern, (_m, name, icon, title, link) => {
    const alt = title || name;
    return `<a href="${link}"><img src="${icon}" alt="${alt}" width="${w}" height="${w}" /></a>`;
  });

  // Pattern 2: Unlinked skill icons
  // ![skill:Name](ICON "Name")
  const plainPattern = /!\[skill:([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g;
  markdown = markdown.replace(plainPattern, (_m, name, icon, title) => {
    const alt = title || name;
    return `<img src="${icon}" alt="${alt}" width="${w}" height="${w}" />`;
  });

  return markdown;
}

export function generateReadme(data) {
  const md = profileTemplate(data);
  return shrinkSkillIcons(md, 28);
}