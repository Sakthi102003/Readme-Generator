import { useState } from 'react';

export default function SocialInputField({ id, label, placeholder, value, onChange, icon, color }) {
  const [focused, setFocused] = useState(false);

  const isImageIcon = icon && (icon.startsWith('http') || icon.startsWith('data:'));

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="label flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {isImageIcon ? (
            <img 
              src={icon} 
              alt={`${label} icon`} 
              className="w-5 h-5" 
              style={{ filter: focused ? 'brightness(1.2)' : 'none' }}
            />
          ) : (
            <span 
              className="text-lg transition-transform duration-200" 
              style={{ 
                transform: focused ? 'scale(1.1)' : 'scale(1)',
                filter: focused ? 'brightness(1.2)' : 'none'
              }}
            >
              {icon}
            </span>
          )}
          <span className="font-medium">{label}</span>
        </div>
      </label>
      <div className="relative">
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`input w-full transition-all duration-200 ${
            focused 
              ? 'border-blue-400 ring-2 ring-blue-100 shadow-md' 
              : 'border-slate-300 hover:border-slate-400'
          } ${
            value 
              ? 'bg-blue-50/30 border-blue-300' 
              : ''
          }`}
          style={{
            paddingLeft: '16px',
            borderLeftColor: value && color ? color : undefined,
            borderLeftWidth: value ? '3px' : '1px'
          }}
        />
        {value && (
          <div 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
    </div>
  );
}
