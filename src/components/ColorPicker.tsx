import React from 'react';
import { TShirtColor } from '../types';

interface ColorPickerProps {
  selectedColor: TShirtColor;
  onColorChange: (color: TShirtColor) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  const colors: { value: TShirtColor; label: string; bg: string }[] = [
    { value: 'white', label: 'White', bg: 'bg-white' },
    { value: 'black', label: 'Black', bg: 'bg-black' },
    { value: 'navy', label: 'Navy', bg: 'bg-blue-900' },
    { value: 'gray', label: 'Gray', bg: 'bg-gray-600' },
    { value: 'red', label: 'Red', bg: 'bg-red-600' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map(({ value, label, bg }) => (
        <button
          key={value}
          onClick={() => onColorChange(value)}
          className={`
            w-8 h-8 rounded-full ${bg} border-2
            ${selectedColor === value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
            transition-all duration-200
          `}
          title={label}
        />
      ))}
    </div>
  );
};

export default ColorPicker;