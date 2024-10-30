import React, { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface SavedDesign {
  id: string;
  name: string;
  url: string;
  date: string;
}

const DesignLibrary = () => {
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([
    {
      id: '1',
      name: 'Summer Collection',
      url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80',
      date: '2024-02-20'
    },
    {
      id: '2',
      name: 'Winter Special',
      url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80',
      date: '2024-02-19'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Design Library</h1>
        <div className="relative">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
          <button className="bg-[#e2ff3d] text-black px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#d4f03d] transition-colors">
            <Upload size={20} />
            <span>Upload Design</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedDesigns.map((design) => (
          <div
            key={design.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="aspect-square relative">
              <img
                src={design.url}
                alt={design.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <button className="bg-white text-black p-2 rounded-full hover:bg-[#e2ff3d] transition-colors">
                  <ImageIcon size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">{design.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Uploaded on {new Date(design.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignLibrary;