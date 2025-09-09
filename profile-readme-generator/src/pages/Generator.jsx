import { useCallback, useMemo, useState } from 'react';
import DynamicForm from '../components/Form/DynamicForm';
import Preview from '../components/Preview';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { download } from '../utils/download';
import { formSchema } from '../utils/formSchema';
import { generateReadme } from '../utils/generateReadme';

export default function Generator() {
  const [formData, setFormData] = useState(formSchema.initialValues);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const { toasts, removeToast, success, error } = useToast();

  // Memoize the form change handler
  const handleFormChange = useCallback((data) => {
    setFormData(data);
  }, []);

  const markdown = useMemo(() => generateReadme(formData), [formData]);

  const onDownload = async () => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing
      download('README.md', markdown);
      success('README.md downloaded successfully!');
    } catch (err) {
      error('Failed to download README.md');
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      success('Markdown copied to clipboard!');
    } catch (err) {
      error('Failed to copy to clipboard');
    }
  };

  // Calculate completion percentage
  const calculateProgress = () => {
    const fields = ['name', 'tagline', 'about', 'skills', 'githubUsername'];
    const completed = fields.filter(field => formData[field] && formData[field].length > 0).length;
    return Math.round((completed / fields.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <div className="container-lg py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              README Generator
            </h1>
            <p className="text-slate-600">Create your perfect GitHub profile in minutes</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              className="btn-outline"
              onClick={copyToClipboard}
            >
              📋 Copy Markdown
            </button>
            <button 
              className="btn"
              onClick={onDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <span className="spinner"></span>
                  Downloading...
                </>
              ) : (
                <>
                  ⬇️ Download README.md
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Profile Completion</span>
            <span className="text-sm font-medium text-blue-600">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-6">
          <div className="tab-list rounded-lg">
            <button
              className={`tab-button rounded-l-lg flex-1 ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => setActiveTab('form')}
            >
              📝 Form
            </button>
            <button
              className={`tab-button rounded-r-lg flex-1 ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              👁️ Preview
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Form Section */}
          <div className={`${activeTab === 'form' ? 'block' : 'hidden'} lg:block`}>
            <div className="card-elevated p-6 md:p-8 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Profile Information</h2>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live Preview</span>
                </div>
              </div>
              <DynamicForm schema={formSchema} value={formData} onChange={handleFormChange} />
            </div>
          </div>

          {/* Preview Section */}
          <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-24">
              <div className="card-elevated animate-fade-in">
                <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Live Preview</h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <Preview data={formData} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12">
          <div className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">💡 Pro Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
              <div>• Add your GitHub username for automatic stats</div>
              <div>• Include 3-5 key skills you want to highlight</div>
              <div>• Write a compelling tagline that describes you</div>
              <div>• Add 2-3 of your best projects</div>
              <div>• Include social links for networking</div>
              <div>• Keep your about section concise but personal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}