import { useState } from 'react';
import { defaultSkills } from '../../config';

export default function CheckboxGroup({ id, label, options = [], value = [], onChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Create a mapping of skill names to icons
  const skillsMap = defaultSkills.reduce((acc, skill) => {
    acc[skill.name] = skill.icon;
    return acc;
  }, {});

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggle = (opt) => {
    const set = new Set(value);
    if (set.has(opt)) set.delete(opt); else set.add(opt);
    onChange(Array.from(set));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        {label && <div className="label">{label}</div>}
        <span className="text-xs text-blue-600 font-medium">{value.length} selected</span>
      </div>
      
      {/* Search filter for large option lists */}
      {options.length > 8 && (
        <input
          type="text"
          placeholder="Search skills..."
          className="input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 bg-slate-50 rounded-lg border">
        {filteredOptions.map((opt) => (
          <button
            type="button"
            key={opt}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 ${
              value.includes(opt) 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                : 'border-slate-300 hover:bg-white hover:border-blue-300 text-slate-700'
            }`}
            onClick={() => toggle(opt)}
          >
            {skillsMap[opt] && (
              <img 
                src={skillsMap[opt]} 
                alt={`${opt} icon`} 
                className="w-4 h-4 flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            {value.includes(opt) ? '✓ ' : ''}{opt}
          </button>
        ))}
        {filteredOptions.length === 0 && searchTerm && (
          <div className="w-full text-center py-4 text-slate-500 text-sm">
            No skills found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Selected skills summary */}
      {value.length > 0 && (
        <div className="text-xs text-slate-600">
          Selected: {value.slice(0, 3).join(', ')}{value.length > 3 ? ` and ${value.length - 3} more` : ''}
        </div>
      )}
    </div>
  );
}