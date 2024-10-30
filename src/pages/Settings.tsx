import React, { useState } from 'react';
import { Save, Building2, MapPin, Phone, Mail, CreditCard, Image, Upload } from 'lucide-react';

interface SettingsProps {
  userData: {
    companyName: string;
    type: string;
    userId: string;
  };
}

const Settings: React.FC<SettingsProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'business', label: 'Business' },
    { id: 'brand', label: 'Brand Logo' },
    { id: 'bank', label: 'Bank Details' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#073642]">Settings</h1>

      {/* Tabs */}
      <div className="flex space-x-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-xl font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-[#dc322f] text-white'
                : 'bg-[#eee8d5] text-[#657b83] hover:bg-[#dc322f] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-[#eee8d5] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">First Name</label>
              <input
                type="text"
                defaultValue="Sriyal"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">Last Name</label>
              <input
                type="text"
                defaultValue="Singh"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">Phone Number</label>
              <input
                type="tel"
                defaultValue="8779967825"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">Email</label>
              <input
                type="email"
                defaultValue="sriyal@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#073642] mb-2">Address</label>
              <input
                type="text"
                defaultValue="703, SAGAR VIEW BLD MALAD WEST MUMBAI"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Business Settings */}
      {activeTab === 'business' && (
        <div className="bg-white rounded-xl border border-[#eee8d5] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">Business Name</label>
              <input
                type="text"
                defaultValue={userData.companyName}
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">Business Type</label>
              <input
                type="text"
                defaultValue={userData.type}
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">GST Number</label>
              <input
                type="text"
                placeholder="Enter GST Number"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">PAN Number</label>
              <input
                type="text"
                placeholder="Enter PAN Number"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Brand Logo Settings */}
      {activeTab === 'brand' && (
        <div className="bg-white rounded-xl border border-[#eee8d5] p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              {logoPreview ? (
                <div className="relative w-48 h-48">
                  <img
                    src={logoPreview}
                    alt="Brand Logo"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setLogoFile(null);
                      setLogoPreview('');
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-48 h-48 border-2 border-dashed border-[#eee8d5] rounded-xl flex flex-col items-center justify-center">
                  <Upload className="w-12 h-12 text-[#93a1a1] mb-2" />
                  <p className="text-sm text-[#657b83]">Upload your brand logo</p>
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="block w-full text-center bg-[#eee8d5] text-[#073642] px-4 py-3 rounded-xl cursor-pointer hover:bg-[#dc322f] hover:text-white transition-colors"
              >
                Choose Logo File
              </label>
            </div>
            <p className="text-sm text-[#657b83] text-center">
              Supported formats: PNG, JPG, SVG (max 2MB)
            </p>
          </div>
        </div>
      )}

      {/* Bank Details */}
      {activeTab === 'bank' && (
        <div className="bg-white rounded-xl border border-[#eee8d5] p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">Bank Name</label>
              <input
                type="text"
                placeholder="Enter bank name"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">Account Number</label>
              <input
                type="text"
                placeholder="Enter account number"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">IFSC Code</label>
              <input
                type="text"
                placeholder="Enter IFSC code"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#073642] mb-2">Account Holder Name</label>
              <input
                type="text"
                placeholder="Enter account holder name"
                className="w-full px-4 py-3 rounded-xl border border-[#eee8d5] focus:ring-2 focus:ring-[#dc322f] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      <button className="bg-[#dc322f] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#cb4b16] transition-colors flex items-center space-x-2">
        <Save size={20} />
        <span>Save Changes</span>
      </button>
    </div>
  );
};

export default Settings;