import React from 'react';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Button } from './ui/button';

export type FilterField = {
  property: string;
  label: string;
  type: 'string' | 'enum' | 'boolean';
  operators: string[];
  options?: { value: string | number | boolean; label: string }[]; // for enum/boolean
};

export type FilterOption = {
  property: string;
  value: string;
  operator: string;
};

interface DynamicFilterProps {
  fields: FilterField[];
  value: FilterOption[];
  onChange: (filters: FilterOption[]) => void;
  onReset?: () => void;
}

export const DynamicFilter: React.FC<DynamicFilterProps> = ({ fields, value, onChange, onReset }) => {
  // Build filter state from value
  const filterState = React.useMemo(() => {
    const state: Record<string, FilterOption> = {};
    value.forEach(f => { state[f.property] = f; });
    return state;
  }, [value]);

  const handleFieldChange = (property: string, key: 'value' | 'operator', val: string) => {
    const next = fields.map(field => {
      const prev = filterState[field.property] || { property: field.property, value: '', operator: field.operators[0] };
      if (field.property === property) {
        return { ...prev, [key]: val };
      }
      return prev;
    });
    onChange(next);
  };

  const handleReset = () => {
    onChange(fields.map(f => ({ property: f.property, value: '', operator: f.operators[0] })));
    if (onReset) onReset();
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      {fields.map(field => {
        const filter = filterState[field.property] || { property: field.property, value: '', operator: field.operators[0] };
        return (
          <div key={field.property} className="flex flex-col gap-1 min-w-[160px]">
            <label className="text-sm font-medium mb-1">{field.label}</label>
            {field.operators.length > 1 && (
              <Select value={filter.operator} onValueChange={v => handleFieldChange(field.property, 'operator', v)}>
                <SelectTrigger><SelectValue placeholder="Chọn điều kiện" /></SelectTrigger>
                <SelectContent>
                  {field.operators.map(op => (
                    <SelectItem key={op} value={op}>{op === 'equals' ? 'Bằng' : op === 'contains' ? 'Chứa' : op}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {field.type === 'string' && (
              <Input
                value={filter.value}
                onChange={e => handleFieldChange(field.property, 'value', e.target.value)}
                placeholder={`Nhập ${field.label.toLowerCase()}`}
              />
            )}
            {field.type === 'enum' && field.options && (
              <Select value={filter.value} onValueChange={v => handleFieldChange(field.property, 'value', v)}>
                <SelectTrigger><SelectValue placeholder={`Chọn ${field.label.toLowerCase()}`} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {field.options.map(opt => (
                    <SelectItem key={String(opt.value)} value={String(opt.value)}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {field.type === 'boolean' && field.options && (
              <Select value={filter.value} onValueChange={v => handleFieldChange(field.property, 'value', v)}>
                <SelectTrigger><SelectValue placeholder={`Chọn ${field.label.toLowerCase()}`} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {field.options.map(opt => (
                    <SelectItem key={String(opt.value)} value={String(opt.value)}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        );
      })}
      <Button variant="outline" type="button" onClick={handleReset}>Đặt lại bộ lọc</Button>
    </div>
  );
}; 