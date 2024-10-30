import React, { useState } from 'react';
import { TShirtColor, Size } from '../types';

const NewOrder = () => {
  const [selectedColor, setSelectedColor] = useState<TShirtColor>('black');
  const [selectedSize, setSelectedSize] = useState<Size>('M');
  const [currentView, setCurrentView] = useState<'front' | 'back' | 'left' | 'right'>('front');
  const [designType, setDesignType] = useState<'plain' | 'brand'>('plain');

  const colors: { value: TShirtColor; label: string; bg: string }[] = [
    { value: 'black', label: 'Black', bg: 'bg-black border-2 border-[#e2ff3d]' },
    { value: 'white', label: 'White', bg: 'bg-white border-2' },
    { value: 'navy', label: 'Navy', bg: 'bg-[#1e3a8a]' },
    { value: 'gray', label: 'Gray', bg: 'bg-gray-500' },
    { value: 'red', label: 'Red', bg: 'bg-red-600' },
  ];

  const sizes: Size[] = ['S', 'M', 'L', 'XL', '2XL'];

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* T-shirt Preview */}
          <div className="lg:w-2/3">
            <div className="bg-[#1a1a1a] rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">OVERSIZED T-SHIRT</h2>
              <p className="text-gray-400 mb-8">240 GSM OVERSIZED</p>
              
              {/* T-shirt Viewer */}
              <div className="aspect-[4/3] bg-[#0a0a0a] rounded-xl mb-6 flex items-center justify-center">
                {/* T-shirt mockup will go here */}
                <div className="w-96 h-96 relative">
                  {/* Add your T-shirt SVG or image here */}
                </div>
              </div>

              {/* View Controls */}
              <div className="grid grid-cols-4 gap-4">
                {['front', 'back', 'left', 'right'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setCurrentView(view as any)}
                    className={`py-2 rounded-xl text-sm font-medium transition-colors ${
                      currentView === view
                        ? 'bg-[#e2ff3d] text-black'
                        : 'bg-[#333] text-white hover:bg-[#444]'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:w-1/3 space-y-6">
            {/* Product Info */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">OVERSIZED T-SHIRT-MI-9732</h3>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="multi-product"
                  className="rounded border-gray-600 text-[#e2ff3d] focus:ring-[#e2ff3d]"
                />
                <label htmlFor="multi-product">Select Multi Product</label>
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Colors</h3>
              <div className="grid grid-cols-4 gap-4">
                {colors.map(({ value, label, bg }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedColor(value)}
                    className={`w-12 h-12 rounded-lg ${bg} ${
                      selectedColor === value ? 'ring-2 ring-[#e2ff3d]' : ''
                    }`}
                    title={label}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-[#e2ff3d] text-black'
                        : 'bg-[#333] text-white hover:bg-[#444]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Design Type */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Design Type</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={designType === 'plain'}
                    onChange={() => setDesignType('plain')}
                    className="text-[#e2ff3d] focus:ring-[#e2ff3d]"
                  />
                  <span>Plain</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={designType === 'brand'}
                    onChange={() => setDesignType('brand')}
                    className="text-[#e2ff3d] focus:ring-[#e2ff3d]"
                  />
                  <span>Brand Logo</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-[#333] text-white py-3 rounded-xl hover:bg-[#444] transition-colors">
                Back
              </button>
              <button className="flex-1 bg-[#e2ff3d] text-black py-3 rounded-xl font-semibold hover:bg-[#d4f03d] transition-colors">
                Add Design
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;