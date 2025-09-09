import React, { useCallback, useEffect, useState } from 'react';

// Simplified, responsive input: immediate local typing, parent can debounce heavy work.
const InputField = React.memo(function InputField({ id, label, placeholder, value, onChange, type = 'text', required = false }) {
  const [localValue, setLocalValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  // Keep in sync with external value when not actively typing (e.g., after debounce resolves)
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
      <label htmlFor={id} className="label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          className="input"
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {localValue && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            ✓
          </div>
        )}
      </div>
      {placeholder && !isFocused && !localValue && (
        <p className="text-xs text-slate-500">Example: {placeholder}</p>
      )}
    </div>
  );
});

export default InputField;