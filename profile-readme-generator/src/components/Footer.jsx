
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-r from-slate-50 to-blue-50 mt-16">
      <div className="container-lg py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📝</span>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                README Generator
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Create stunning GitHub profile READMEs in minutes. 
              Build your developer story with beautiful templates and live preview.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="/" className="block text-slate-600 hover:text-blue-600 transition-colors duration-200">
                Home
              </a>
              <a href="/generator" className="block text-slate-600 hover:text-blue-600 transition-colors duration-200">
                Generator
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-slate-600">
            © {currentYear} Profile README Generator. Your generated content is yours to use freely.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a 
              href="https://github.com/Sakthi102003/Readme-Generator" 
              className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
            >
              ⭐ GitHub
            </a>
            <a 
              href="#" 
              className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
            >
              � Share
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}