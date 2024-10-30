import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import SizeSelector from './SizeSelector';
import PrintSizeSelector from './PrintSizeSelector';
import TShirtMockup from './TShirtMockup';
import OrderSummary from './OrderSummary';
import ViewSelector from './ViewSelector';
import DesignControls from './DesignControls';
import { TShirtColor, Size, Design, PrintSize, TShirtView } from '../types';

const Designer = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [color, setColor] = useState<TShirtColor>('black');
  const [size, setSize] = useState<Size>('M');
  const [printSize, setPrintSize] = useState<PrintSize>('A4');
  const [currentView, setCurrentView] = useState<TShirtView>('front');
  const [history, setHistory] = useState({
    past: [],
    present: [],
    future: [],
    canUndo: false,
    canRedo: false,
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newDesign: Design = {
          id: crypto.randomUUID(),
          url: e.target?.result as string,
          position: { x: 200, y: 225 },
          rotation: 0,
          scale: 1,
          layer: designs.length,
          view: currentView,
        };
        
        setDesigns(prev => [...prev, newDesign]);
        setSelectedDesignId(newDesign.id);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDesignUpdate = (id: string, updates: Partial<Design>) => {
    setDesigns(prev => prev.map(design => 
      design.id === id ? { ...design, ...updates } : design
    ));
  };

  const handleUndo = () => {
    if (history.past.length === 0) return;
    
    const newPresent = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);
    
    setHistory({
      past: newPast,
      present: newPresent,
      future: [designs, ...history.future],
      canUndo: newPast.length > 0,
      canRedo: true,
    });
    
    setDesigns(newPresent);
  };

  const handleRedo = () => {
    if (history.future.length === 0) return;
    
    const newPresent = history.future[0];
    const newFuture = history.future.slice(1);
    
    setHistory({
      past: [...history.past, designs],
      present: newPresent,
      future: newFuture,
      canUndo: true,
      canRedo: newFuture.length > 0,
    });
    
    setDesigns(newPresent);
  };

  const handleRotate = () => {
    if (!selectedDesignId) return;
    
    setDesigns(prev => prev.map(design =>
      design.id === selectedDesignId
        ? { ...design, rotation: (design.rotation + 90) % 360 }
        : design
    ));
  };

  const handleDuplicate = () => {
    if (!selectedDesignId) return;
    
    const designToDuplicate = designs.find(d => d.id === selectedDesignId);
    if (!designToDuplicate) return;

    const newDesign: Design = {
      ...designToDuplicate,
      id: crypto.randomUUID(),
      position: {
        x: designToDuplicate.position.x + 20,
        y: designToDuplicate.position.y + 20,
      },
      layer: designs.length,
    };

    setDesigns(prev => [...prev, newDesign]);
    setSelectedDesignId(newDesign.id);
  };

  const handleDelete = () => {
    if (!selectedDesignId) return;
    setDesigns(prev => prev.filter(design => design.id !== selectedDesignId));
    setSelectedDesignId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <DesignControls
        color={color}
        size={size}
        printSize={printSize}
        onColorChange={setColor}
        onSizeChange={setSize}
        onPrintSizeChange={setPrintSize}
        history={history}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onRotate={handleRotate}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        hasDesign={designs.length > 0}
        onFileUpload={handleFileUpload}
      />

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="mb-6">
            <ViewSelector 
              currentView={currentView}
              onViewChange={setCurrentView}
            />
          </div>
          <div className="relative w-full aspect-[3/4] bg-[#111] rounded-xl">
            <TShirtMockup
              color={color}
              printSize={printSize}
              designs={designs.filter(d => d.view === currentView)}
              onDesignUpdate={handleDesignUpdate}
              onDesignSelect={setSelectedDesignId}
              selectedDesignId={selectedDesignId}
              currentView={currentView}
            />
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Use mouse wheel to scale designs • Click and drag to move
          </p>
        </div>

        <OrderSummary
          hasDesign={designs.length > 0}
          size={size}
          color={color}
          printSize={printSize}
        />
      </div>
    </div>
  );
};

export default Designer;