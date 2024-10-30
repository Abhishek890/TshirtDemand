import React from 'react';
import { PrintSize } from '../types';

interface PrintSizeSelectorProps {
  selectedSize: PrintSize;
  onSizeChange: (size: PrintSize) => void;
}

const PrintSizeSelector: React.FC<PrintSizeSelectorProps> = ({
  selectedSize,
  onSizeChange,
}) => {
  const sizes: { value: PrintSize; label: string; dimensions: string }[] = [
    { value: 'A4', label: 'A4 Print', dimensions: '10" × 12"' },
    { value: 'A3', label: 'A3 Print', dimensions: '14" × 16"' },
    { value: 'A2', label: 'A2 Print', dimensions: '16" × 20"' },
  ];

  return (
    <div className="space-y-2">
      {sizes.map(({ value, label, dimensions }) => (
        <button
          key={value}
          onClick={() => onSizeChange(value)}
          className={`
            w-full px-4 py-2 rounded-lg text-sm font-medium text-left
            ${selectedSize === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
            transition-colors duration-200
          `}
        >
          <div className="flex justify-between items-center">
            <span>{label}</span>
            <span className="text-xs opacity-80">{dimensions}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PrintSizeSelector;