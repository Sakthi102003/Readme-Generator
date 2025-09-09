import { defaultSkills, socialFields } from '../config';

export const formSchema = {
  fields: [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'John Doe', required: true },
    { id: 'tagline', label: 'Tagline', type: 'text', placeholder: 'Full-Stack Developer | Open Source Enthusiast' },
    { id: 'about', label: 'About Me', type: 'textarea', placeholder: 'Write a short bio about yourself...' },
    { id: 'skills', label: 'Skills / Tech Stack', type: 'checkboxGroup', options: defaultSkills.map(skill => skill.name) },
    {
      id: 'projects',
      label: 'Featured Projects',
      type: 'array',
      itemLabel: 'Project',
      itemFields: [
        { id: 'name', label: 'Project Name', type: 'text', placeholder: 'Awesome App' },
        { id: 'description', label: 'Description', type: 'textarea', placeholder: 'What does this project do?' },
        { id: 'link', label: 'Link', type: 'text', placeholder: 'https://github.com/you/awesome-app' },
      ],
    },
    { id: 'funFact', label: 'Fun Fact or Quote', type: 'text', placeholder: 'I automate boring stuff so I can code more.' },
    { id: 'socials', label: 'Social Profiles', type: 'group', fields: socialFields },
  ],
  initialValues: {
    name: '',
    tagline: '',
    about: '',
    skills: [],
    projects: [],
    funFact: '',
    socials: socialFields.reduce((acc, f) => { acc[f.id] = ''; return acc; }, {}),
  },
};