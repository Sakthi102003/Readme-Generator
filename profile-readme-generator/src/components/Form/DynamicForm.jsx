import { useCallback, useEffect, useMemo, useState } from 'react';
import CheckboxGroup from './CheckboxGroup';
import InputField from './InputField';
import TextArea from './TextArea';

// Renders a schema-driven form. Keeps local state and lifts changes up with debounce.
export default function DynamicForm({ schema, value, onChange }) {
  const initial = useMemo(() => schema?.initialValues || {}, [schema]);
  const [form, setForm] = useState(() => ({ ...initial, ...(value || {}) }));

  // Longer debounce for preview updates to prevent glitching
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange && onChange(form);
    }, 300); // Longer debounce for smoother experience
    
    return () => clearTimeout(timeoutId);
  }, [form, onChange]);

  const setField = useCallback((id, val) => setForm((f) => ({ ...f, [id]: val })), []);

  // Memoize field change handlers to prevent re-renders
  const fieldChangeHandlers = useMemo(() => {
    const handlers = {};
    schema?.fields?.forEach(field => {
      handlers[field.id] = (v) => setField(field.id, v);
    });
    return handlers;
  }, [schema?.fields, setField]);

  const renderField = (field, index) => {
    const common = { id: field.id, label: field.label, placeholder: field.placeholder };
    const fieldVal = form[field.id];
    const handleFieldChange = fieldChangeHandlers[field.id];

    switch (field.type) {
      case 'text':
        return (
          <div key={field.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <InputField {...common} value={fieldVal} onChange={handleFieldChange} />
          </div>
        );
      case 'textarea':
        return (
          <div key={field.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <TextArea {...common} value={fieldVal} onChange={handleFieldChange} />
          </div>
        );
      case 'checkboxGroup':
        return (
          <div key={field.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <CheckboxGroup
              id={field.id}
              label={field.label}
              options={field.options}
              value={fieldVal || []}
              onChange={handleFieldChange}
            />
          </div>
        );
      case 'group': {
        const groupVal = form[field.id] || {};
        
        return (
          <div key={field.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <div className="label text-lg font-semibold text-slate-900">{field.label}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {field.fields.map((sf) => (
                  <InputField
                    key={sf.id}
                    id={`${field.id}.${sf.id}`}
                    label={sf.label}
                    placeholder={sf.placeholder}
                    value={groupVal[sf.id] || ''}
                    onChange={(v) => setField(field.id, { ...groupVal, [sf.id]: v })}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      }
      case 'array': {
        const items = Array.isArray(fieldVal) ? fieldVal : [];

        return (
          <div key={field.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="label mb-0 text-lg font-semibold text-slate-900">{field.label}</div>
                  <span className="badge badge-blue">{items.length} items</span>
                </div>
                <button 
                  type="button" 
                  className="btn btn-sm hover:scale-105" 
                  onClick={() => setField(field.id, [...items, {}])}
                >
                  + Add {field.itemLabel || 'Item'}
                </button>
              </div>
              
              <div className="space-y-4">
                {items.map((it, idx) => (
                  <div key={idx} className="card p-6 space-y-4 animate-scale-in hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div className="font-semibold text-slate-900">{field.itemLabel || 'Item'}</div>
                      </div>
                      <button 
                        type="button" 
                        className="btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400" 
                        onClick={() => setField(field.id, items.filter((_, i) => i !== idx))}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {field.itemFields.map((sf) => (
                        sf.type === 'textarea' ? (
                          <div key={sf.id} className="md:col-span-2">
                            <TextArea
                              id={`${field.id}.${idx}.${sf.id}`}
                              label={sf.label}
                              placeholder={sf.placeholder}
                              value={it[sf.id] || ''}
                              onChange={(v) => {
                                const clone = [...items];
                                clone[idx] = { ...(clone[idx] || {}), [sf.id]: v };
                                setField(field.id, clone);
                              }}
                            />
                          </div>
                        ) : (
                          <InputField
                            key={sf.id}
                            id={`${field.id}.${idx}.${sf.id}`}
                            label={sf.label}
                            placeholder={sf.placeholder}
                            value={it[sf.id] || ''}
                            onChange={(v) => {
                              const clone = [...items];
                              clone[idx] = { ...(clone[idx] || {}), [sf.id]: v };
                              setField(field.id, clone);
                            }}
                          />
                        )
                      ))}
                    </div>
                  </div>
                ))}
                
                {items.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <div className="text-4xl mb-2">📝</div>
                    <div className="font-medium">No {field.itemLabel?.toLowerCase() || 'items'} added yet</div>
                    <div className="text-sm">Add your first {field.itemLabel?.toLowerCase() || 'item'} to get started</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <form className="space-y-8">
      {schema?.fields?.map((field, index) => renderField(field, index))}
    </form>
  );
}