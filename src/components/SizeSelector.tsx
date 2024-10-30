import React from 'react';
import { Size } from '../types';

interface SizeSelectorProps {
  selectedSize: Size;
  onSizeChange: (size: Size) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
  const sizes: { value: Size; label: string }[] = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: '2XL', label: '2XL' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onSizeChange(value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium
            ${selectedSize === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
            transition-colors duration-200
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;