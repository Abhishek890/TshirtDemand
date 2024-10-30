import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Truck, Palette } from 'lucide-react';

interface DashboardProps {
  userData: {
    companyName: string;
    type: string;
    userId: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-[#dc322f] to-[#cb4b16] rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {userData.companyName}
          </h1>
          <p className="text-white/90">Start creating amazing designs today</p>
          
          <div className="flex gap-4 mt-6">
            <Link
              to="/new-order"
              className="bg-white text-[#dc322f] px-6 py-3 rounded-xl font-semibold hover:bg-[#fdf6e3] transition-all"
            >
              Create New Design
            </Link>
            <Link
              to="/design-library"
              className="bg-black/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-black/30 transition-all"
            >
              View Library
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <ShoppingBag className="w-8 h-8 text-[#dc322f]" />,
            label: "Active Orders",
            value: "5",
            trend: "In Progress"
          },
          {
            icon: <Package className="w-8 h-8 text-[#dc322f]" />,
            label: "Completed Orders",
            value: "123",
            trend: "All Time"
          },
          {
            icon: <Truck className="w-8 h-8 text-[#dc322f]" />,
            label: "In Delivery",
            value: "3",
            trend: "Arriving Soon"
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-[#eee8d5] hover:border-[#dc322f] transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-[#fdf6e3] rounded-xl">
                {stat.icon}
              </div>
              <span className="text-sm text-[#657b83]">{stat.trend}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#073642]">{stat.value}</h3>
            <p className="text-sm text-[#657b83] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/new-order"
          className="group bg-white p-6 rounded-xl border border-[#eee8d5] hover:border-[#dc322f] transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#fdf6e3] rounded-xl group-hover:bg-[#dc322f] transition-all">
              <Palette className="w-6 h-6 text-[#dc322f] group-hover:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#073642]">Start Designing</h3>
              <p className="text-sm text-[#657b83]">Create a new custom design</p>
            </div>
          </div>
        </Link>

        <Link
          to="/order-management"
          className="group bg-white p-6 rounded-xl border border-[#eee8d5] hover:border-[#dc322f] transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#fdf6e3] rounded-xl group-hover:bg-[#dc322f] transition-all">
              <Package className="w-6 h-6 text-[#dc322f] group-hover:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#073642]">Track Orders</h3>
              <p className="text-sm text-[#657b83]">View and manage your orders</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;