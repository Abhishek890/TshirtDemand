import React from 'react';
import { Upload, Palette, Undo, Redo, RotateCw, Layers, Copy, Trash2 } from 'lucide-react';
import ColorPicker from './ColorPicker';
import SizeSelector from './SizeSelector';
import PrintSizeSelector from './PrintSizeSelector';
import { TShirtColor, Size, DesignHistory, PrintSize } from '../types';

interface DesignControlsProps {
  color: TShirtColor;
  size: Size;
  printSize: PrintSize;
  onColorChange: (color: TShirtColor) => void;
  onSizeChange: (size: Size) => void;
  onPrintSizeChange: (size: PrintSize) => void;
  history: DesignHistory;
  onUndo: () => void;
  onRedo: () => void;
  onRotate: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  hasDesign: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DesignControls: React.FC<DesignControlsProps> = ({
  color,
  size,
  printSize,
  onColorChange,
  onSizeChange,
  onPrintSizeChange,
  history,
  onUndo,
  onRedo,
  onRotate,
  onDuplicate,
  onDelete,
  hasDesign,
  onFileUpload,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Design Studio</h2>
        <div className="flex space-x-2">
          <button
            onClick={onUndo}
            disabled={!history.canUndo}
            className={`p-2 rounded-lg ${history.canUndo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
            title="Undo"
          >
            <Undo size={20} />
          </button>
          <button
            onClick={onRedo}
            disabled={!history.canRedo}
            className={`p-2 rounded-lg ${history.canRedo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
            title="Redo"
          >
            <Redo size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Upload Section */}
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={onFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop or click to upload
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports PNG, JPG, SVG (max 5MB)
            </p>
          </div>
        </div>

        {/* Print Size Selection */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Print Size</h3>
          <PrintSizeSelector
            selectedSize={printSize}
            onSizeChange={onPrintSizeChange}
          />
        </div>

        {/* Design Tools */}
        {hasDesign && (
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Design Tools</h3>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={onRotate}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
                title="Rotate Design"
              >
                <RotateCw size={20} />
                <span className="text-xs mt-1">Rotate</span>
              </button>
              <button
                onClick={onDuplicate}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
                title="Duplicate Design"
              >
                <Copy size={20} />
                <span className="text-xs mt-1">Duplicate</span>
              </button>
              <button
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
                title="Layer Order"
              >
                <Layers size={20} />
                <span className="text-xs mt-1">Layers</span>
              </button>
              <button
                onClick={onDelete}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 text-red-600"
                title="Delete Design"
              >
                <Trash2 size={20} />
                <span className="text-xs mt-1">Delete</span>
              </button>
            </div>
          </div>
        )}

        {/* Color Selection */}
        <div className="border-t pt-6">
          <h3 className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Palette size={18} className="mr-2" />
            T-Shirt Color
          </h3>
          <ColorPicker selectedColor={color} onColorChange={onColorChange} />
        </div>

        {/* Size Selection */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Size</h3>
          <SizeSelector selectedSize={size} onSizeChange={onSizeChange} />
        </div>
      </div>
    </div>
  );
};

export default DesignControls;