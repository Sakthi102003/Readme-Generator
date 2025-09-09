import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: '🎨', title: 'Beautiful Design', description: 'Create stunning GitHub profiles with modern templates' },
    { icon: '⚡', title: 'Live Preview', description: 'See your changes in real-time as you type' },
    { icon: '📊', title: 'GitHub Stats', description: 'Auto-generate beautiful stats and contribution graphs' },
    { icon: '🔧', title: 'Customizable', description: 'Full control over every section and styling' },
    { icon: '📱', title: 'Responsive', description: 'Looks great on all devices and screen sizes' },
    { icon: '⬇️', title: 'Easy Export', description: 'Download your README.md file instantly' }
  ];

  const profileElements = [
    'Name & Professional Tagline',
    'About Me Section',
    'Technical Skills & Stack',
    'GitHub Statistics & Analytics',
    'Featured Projects Showcase',
    'Fun Facts & Personal Touch',
    'Social Media Links',
    'Contact Information'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container-lg py-16 md:py-24">
        <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              GitHub Profile
              <br />
              README Generator
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Create a personalized GitHub profile README that stands out. 
              Build your developer story with beautiful templates and live preview.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/generator" className="btn text-lg px-8 py-4 animate-bounce-subtle">
              🚀 Start Creating
            </Link>
            <a 
              href="#features" 
              className="btn-outline text-lg px-8 py-4 hover:scale-105"
            >
              📖 Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-12">
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container-lg py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Choose Our Generator?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to create a professional GitHub profile that showcases your skills and personality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`card-elevated p-6 text-center hover:scale-105 cursor-pointer transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What You Get Section */}
      <div className="container-lg py-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Complete Profile Package
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Get everything you need to create a comprehensive GitHub profile that tells your story and showcases your expertise.
              </p>
            </div>

            <div className="space-y-3">
              {profileElements.map((element, index) => (
                <div 
                  key={element}
                  className={`flex items-center space-x-3 animate-slide-up`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{element}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-elevated p-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Ready to Get Started?</h3>
              <div className="bg-white rounded-lg p-6 space-y-4 border-l-4 border-blue-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="font-bold text-slate-900 mb-2">Start Building Your Profile</h4>
                  <p className="text-slate-600 mb-4">Create a professional GitHub README that showcases your skills and projects.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container-lg py-16">
        <div className="card-elevated p-12 text-center bg-gradient-to-r from-white via-white/600 to-white text-black">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Stand Out?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start building your professional GitHub profile today. 
            Create yours in minutes, not hours.
          </p>
          <Link to="/generator" className="btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
            Create Your Profile Now
          </Link>
        </div>
      </div>
    </div>
  );
}