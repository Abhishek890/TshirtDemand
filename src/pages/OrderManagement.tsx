import React from 'react';
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  product: string;
  quantity: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  total: number;
}

const OrderManagement = () => {
  const orders: Order[] = [
    {
      id: 'ORD-001',
      product: 'Custom T-Shirt Design',
      quantity: 2,
      status: 'processing',
      date: '2024-02-20',
      total: 599
    },
    {
      id: 'ORD-002',
      product: 'Oversized Print T-Shirt',
      quantity: 1,
      status: 'shipped',
      date: '2024-02-19',
      total: 299
    }
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Package className="text-blue-500" />;
      case 'shipped':
        return <Truck className="text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order Management</h1>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.quantity}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm capitalize">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;