import React, { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import DesignControls from '../components/DesignControls';
import TShirtMockup from '../components/TShirtMockup';
import OrderSummary from '../components/OrderSummary';
import ViewSelector from '../components/ViewSelector';
import { TShirtColor, Size, Design, DesignHistory, PrintSize, TShirtView } from '../types';

const Designer = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [color, setColor] = useState<TShirtColor>('black');
  const [size, setSize] = useState<Size>('M');
  const [printSize, setPrintSize] = useState<PrintSize>('A4');
  const [currentView, setCurrentView] = useState<TShirtView>('front');
  const [history, setHistory] = useState<DesignHistory>({
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
          id: nanoid(),
          url: e.target?.result as string,
          position: { x: 200, y: 225 },
          rotation: 0,
          scale: 1,
          layer: designs.length,
          view: currentView,
        };
        
        setHistory(prev => ({
          past: [...prev.past, prev.present],
          present: [...designs, newDesign],
          future: [],
          canUndo: true,
          canRedo: false,
        }));
        
        setDesigns(prev => [...prev, newDesign]);
        setSelectedDesignId(newDesign.id);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDesignUpdate = useCallback((id: string, updates: Partial<Design>) => {
    setDesigns(prev => prev.map(design => 
      design.id === id ? { ...design, ...updates } : design
    ));
  }, []);

  const handleUndo = () => {
    if (history.past.length === 0) return;
    
    setHistory(prev => ({
      past: prev.past.slice(0, -1),
      present: prev.past[prev.past.length - 1],
      future: [prev.present, ...prev.future],
      canUndo: prev.past.length > 1,
      canRedo: true,
    }));
    
    setDesigns(history.past[history.past.length - 1]);
  };

  const handleRedo = () => {
    if (history.future.length === 0) return;
    
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: prev.future[0],
      future: prev.future.slice(1),
      canUndo: true,
      canRedo: prev.future.length > 1,
    }));
    
    setDesigns(history.future[0]);
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
      id: nanoid(),
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

  const visibleDesigns = designs.filter(design => design.view === currentView);

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  designs={visibleDesigns}
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
      </div>
    </div>
  );
};

export default Designer;