# 🚀 Profile README Generator

A modern, interactive web application that helps developers create beautiful and professional GitHub profile READMEs with ease. Built with React, Vite, and TailwindCSS.

![Profile README Generator Preview](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Profile+README+Generator)

## ✨ Features

- **🎨 Interactive Form Builder** - Easy-to-use form with real-time validation
- **👀 Live Preview** - See your README as you build it
- **🔧 Comprehensive Skills Library** - 100+ programming languages, frameworks, and tools with icons
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and builds
- **🎯 Modern UI** - Clean, professional interface with TailwindCSS
- **📄 One-Click Download** - Generate and download your README.md instantly
- **🔗 Social Integration** - Add links to all your social profiles
- **📊 GitHub Stats** - Automatically includes GitHub statistics widgets
- **🎭 Project Showcase** - Feature your best projects with descriptions and links

## 🛠️ Tech Stack

<div align="center">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="45" height="45" title="React" />&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="45" height="45" title="JavaScript" />&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" width="45" height="45" title="Vite" />&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="TailwindCSS" width="45" height="45" title="TailwindCSS" />&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="45" height="45" title="Node.js" />&nbsp;&nbsp;&nbsp;

</div>

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/profile-readme-generator.git
   cd profile-readme-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📂 Project Structure

```
profile-readme-generator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Form/
│   │   │   ├── CheckboxGroup.jsx    # Skills selection with icons
│   │   │   ├── DynamicForm.jsx      # Main form component
│   │   │   ├── InputField.jsx       # Text input component
│   │   │   └── TextArea.jsx         # Multi-line text input
│   │   ├── Footer.jsx               # App footer
│   │   ├── LoadingSpinner.jsx       # Loading indicator
│   │   ├── Navbar.jsx               # Navigation bar
│   │   ├── Preview.jsx              # README preview component
│   │   └── Toast.jsx                # Notification component
│   ├── hooks/
│   │   └── useToast.js              # Toast notification hook
│   ├── pages/
│   │   ├── Generator.jsx            # Main generator page
│   │   └── Home.jsx                 # Landing page
│   ├── styles/
│   │   └── globals.css              # Global styles
│   ├── utils/
│   │   ├── download.js              # File download utility
│   │   ├── formSchema.js            # Form configuration
│   │   ├── generateReadme.js        # README generation logic
│   │   └── profileTemplate.js       # README template
│   ├── App.jsx                      # Main app component
│   ├── config.js                    # Skills and social configurations
│   └── main.jsx                     # App entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 How to Use

1. **Fill in Your Information**
   - Enter your name and tagline
   - Write a brief about section
   - Add your fun fact or favorite quote

2. **Select Your Skills**
   - Choose from 100+ programming languages and frameworks
   - Each skill displays with its official icon
   - Search functionality for quick finding

3. **Add Your Projects**
   - Showcase your best work
   - Include project names, descriptions, and links
   - Add as many projects as you want

4. **Connect Your Socials**
   - Add GitHub, LinkedIn, Twitter, and more
   - Automatic link formatting and validation

5. **Preview & Download**
   - See live preview of your README
   - Download the generated markdown file
   - Copy and paste into your GitHub profile

## 🎨 Customization

### Adding New Skills

To add new skills with icons, edit `src/config.js`:

```javascript
{
  name: 'Your Technology',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/technology/technology-original.svg'
}
```

### Modifying the Template

Customize the README template in `src/utils/profileTemplate.js` to change the output format.

### Styling

The app uses TailwindCSS for styling. Modify `tailwind.config.js` to customize the theme.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌟 Features in Detail

### Smart Form Validation
- Real-time validation with helpful error messages
- Character counters for text fields
- Required field indicators

### Icon Integration
- 100+ technology icons from DevIcons
- Automatic fallback for missing icons
- Consistent sizing and styling

### GitHub Stats Integration
- Automatic GitHub stats cards
- Language statistics
- Contribution streaks
- Customizable themes

### Responsive Design
- Mobile-first approach
- Smooth animations and transitions
- Touch-friendly interface

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DevIcons](https://devicons.github.io/devicon/) for the amazing technology icons
- [GitHub README Stats](https://github.com/anuraghazra/github-readme-stats) for the stats widgets
- [Shields.io](https://shields.io/) for the badge inspiration
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub


---

<div align="center">

**Built with ❤️ by developers, for developers**

[⭐ Star this repo](https://github.com/Sakthi102003/Readme-Generator) if you found it helpful!

</div>
