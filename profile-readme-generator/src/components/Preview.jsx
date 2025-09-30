import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { profileTemplate } from '../utils/profileTemplate';

export default function Preview({ data }) {
  const [activeTab, setActiveTab] = useState('preview');
  const [copySuccess, setCopySuccess] = useState(false);
  
  const markdown = useMemo(() => profileTemplate(data), [data]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="tab-list">
        <button
          className={`tab-button rounded-l-lg flex-1 ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          👁️ Preview
        </button>
        <button
          className={`tab-button rounded-r-lg flex-1 ${activeTab === 'markdown' ? 'active' : ''}`}
          onClick={() => setActiveTab('markdown')}
        >
          📝 Markdown
        </button>
      </div>

      {/* Content */}
      {activeTab === 'preview' ? (
        <div className="prose max-w-none p-6 bg-white rounded-b-lg border border-t-0">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({node, ...props}) => {
                const alt = String(props.alt || '');
                // If it's a skill icon, render smaller
                if (/^skill:/i.test(alt)) {
                  const cleanAlt = alt.replace(/^skill:\s*/i, '');
                  return (
                    <img
                      alt={cleanAlt}
                      {...props}
                      style={{
                        width: 28,
                        height: 28,
                        objectFit: 'contain',
                        verticalAlign: 'middle',
                        display: 'inline-block',
                        marginRight: 8,
                        marginBottom: 8
                      }}
                    />
                  );
                }
                // Social badges from shields.io -> align horizontally with spacing
                const src = String(props.src || '');
                if (src.includes('img.shields.io')) {
                  return (
                    <img
                      {...props}
                      alt={alt}
                      style={{
                        height: 28,
                        objectFit: 'contain',
                        verticalAlign: 'middle',
                        display: 'inline-block',
                        marginRight: 8,
                        marginBottom: 8
                      }}
                    />
                  );
                }
                return <img {...props} alt={alt} style={{ maxWidth: '100%' }} />;
              }
            }}
          >{markdown}</ReactMarkdown>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={copyToClipboard}
              className={`btn-sm ${copySuccess ? 'bg-green-600' : ''} transition-colors duration-200`}
            >
              {copySuccess ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <pre className="bg-slate-900 text-slate-100 p-6 rounded-b-lg overflow-auto text-sm leading-relaxed max-h-96 border border-t-0">
            <code>{markdown}</code>
          </pre>
        </div>
      )}

      {/* Preview Stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="font-semibold text-blue-700">{markdown.split('\n').length}</div>
          <div className="text-blue-600">Lines</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
          <div className="font-semibold text-purple-700">{markdown.length}</div>
          <div className="text-purple-600">Characters</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="font-semibold text-green-700">{markdown.split(' ').length}</div>
          <div className="text-green-600">Words</div>
        </div>
      </div>
    </div>
  );
}