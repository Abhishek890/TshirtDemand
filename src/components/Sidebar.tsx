import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Palette, 
  ShoppingCart, 
  ClipboardList, 
  Wallet, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/design-library', label: 'Design Library', icon: <Palette size={20} /> },
    { path: '/new-order', label: 'Create Design', icon: <ShoppingCart size={20} /> },
    { path: '/order-management', label: 'Orders', icon: <ClipboardList size={20} /> },
    { path: '/wallet', label: 'Wallet', icon: <Wallet size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="space-y-2">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`
            flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors
            ${location.pathname === item.path
              ? 'bg-[#dc322f] text-white'
              : 'text-[#657b83] hover:bg-[#fdf6e3] hover:text-[#073642]'
            }
          `}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;