import React from 'react';
import { TShirtView } from '../types';

interface ViewSelectorProps {
  currentView: TShirtView;
  onViewChange: (view: TShirtView) => void;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView, onViewChange }) => {
  const views: { value: TShirtView; label: string }[] = [
    { value: 'front', label: 'Front' },
    { value: 'back', label: 'Back' },
    { value: 'left', label: 'L Side' },
    { value: 'right', label: 'R Side' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {views.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onViewChange(value)}
          className={`
            py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
            ${currentView === value
              ? 'bg-black text-[#e2ff3d] shadow-lg'
              : 'bg-black/10 text-black hover:bg-black/20'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ViewSelector;