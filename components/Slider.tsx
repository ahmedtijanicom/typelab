import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit?: string;
}

export const Slider: React.FC<SliderProps> = ({ label, value, min, max, step, onChange, unit = '' }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center text-xs font-medium text-gray-500 dark:text-gray-400">
        <label>{label}</label>
        <span className="font-mono">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600 dark:accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
    </div>
  );
};