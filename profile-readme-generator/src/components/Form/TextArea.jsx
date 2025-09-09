
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const TextArea = React.memo(function TextArea({ id, label, placeholder, value, onChange, rows = 4 }) {
  const [localValue, setLocalValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  
  const charCount = useMemo(() => localValue?.length || 0, [localValue]);
  const minHeight = useMemo(() => `${rows * 24}px`, [rows]);

  // Keep in sync with external value when not actively typing
  useEffect(() => {
    if (!isFocused && value !== undefined && value !== localValue) {
      setLocalValue(value || '');
    }
  }, [value, isFocused, localValue]);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleChange = useCallback((e) => {
    const v = e.target.value;
    setLocalValue(v); // immediate UI update
    onChange && onChange(v); // parent should debounce if needed
  }, [onChange]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="label">{label}</label>
        <span className="text-xs text-slate-500">{charCount} characters</span>
      </div>
      <div className="relative">
        <textarea
          id={id}
          className="textarea"
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={rows}
          style={{ minHeight }}
        />
        {localValue && (
          <div className="absolute right-3 top-3 text-green-500">
            ✓
          </div>
        )}
      </div>
      {placeholder && !isFocused && !localValue && (
        <p className="text-xs text-slate-500">Enter your {label.toLowerCase()}</p>
      )}
    </div>
  );
});

export default TextArea;