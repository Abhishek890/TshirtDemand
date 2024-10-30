import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, LogOut, Bell } from 'lucide-react';

interface NavbarProps {
  balance: number;
  onRecharge: () => void;
  onLogout: () => void;
}

const Navbar = ({ balance, onRecharge, onLogout }: NavbarProps) => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white border-b border-[#eee8d5]">
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Printer className="w-8 h-8 text-[#dc322f]" />
            <span className="text-xl font-bold text-[#073642]">PrintOnDemand</span>
          </Link>

          <div className="flex items-center space-x-6">
            <button className="text-[#657b83] hover:text-[#073642] transition-colors">
              <Bell size={20} />
            </button>
            
            <div className="text-sm text-[#657b83]">
              Balance: <span className="font-semibold text-[#073642]">₹{balance.toFixed(2)}</span>
            </div>
            
            <button
              onClick={onRecharge}
              className="bg-[#dc322f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#cb4b16] transition-colors"
            >
              Add Balance
            </button>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-[#657b83] hover:text-[#073642] transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;