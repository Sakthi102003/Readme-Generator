import { defaultSkills, socialFields } from '../config';

export const formSchema = {
  fields: [
    { id: 'name', label: 'Name', type: 'text', placeholder: '', required: true },
    { id: 'avatar', label: 'Profile Image URL', type: 'text', placeholder: 'https://example.com/your-avatar.jpg' },
    { id: 'tagline', label: 'Tagline', type: 'text', placeholder: '' },
    { id: 'about', label: 'About Me', type: 'textarea', placeholder: '' },
    { id: 'skills', label: 'Skills / Tech Stack', type: 'checkboxGroup', options: defaultSkills.map(skill => skill.name) },
    {
      id: 'projects',
      label: 'Featured Projects',
      type: 'array',
      itemLabel: 'Project',
      itemFields: [
        { id: 'name', label: 'Project Name', type: 'text', placeholder: '' },
        { id: 'description', label: 'Description', type: 'textarea', placeholder: '' },
        { id: 'link', label: 'Link', type: 'text', placeholder: '' },
      ],
    },
    { id: 'funFact', label: 'Fun Fact or Quote', type: 'text', placeholder: '' },
    { id: 'socials', label: 'Social Profiles', type: 'group', fields: socialFields },
  ],
  initialValues: {
    name: '',
    avatar: '',
    tagline: '',
    about: '',
    skills: [],
    projects: [],
    funFact: '',
    socials: socialFields.reduce((acc, f) => { acc[f.id] = ''; return acc; }, {}),
  },
};