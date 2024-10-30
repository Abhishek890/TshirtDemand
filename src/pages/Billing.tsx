import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

const Billing = () => {
  const bills = [
    {
      id: 'INV-001',
      date: '2024-02-22',
      amount: 2999,
      items: 2,
      status: 'paid',
      orderNumber: 'ORD-2402-001'
    },
    {
      id: 'INV-002',
      date: '2024-02-20',
      amount: 1499,
      items: 1,
      status: 'paid',
      orderNumber: 'ORD-2402-002'
    },
    {
      id: 'INV-003',
      date: '2024-02-18',
      amount: 4499,
      items: 3,
      status: 'paid',
      orderNumber: 'ORD-2402-003'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#073642]">Billing History</h1>
        <button className="bg-[#dc322f] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#cb4b16] transition-colors flex items-center space-x-2">
          <FileText size={20} />
          <span>Export All</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#eee8d5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#fdf6e3]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#073642]">Invoice ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#073642]">Order Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#073642]">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#073642]">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#073642]">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#073642]">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-[#073642]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee8d5]">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-[#fdf6e3]/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-[#073642] font-medium">{bill.id}</td>
                  <td className="px-6 py-4 text-sm text-[#657b83]">{bill.orderNumber}</td>
                  <td className="px-6 py-4 text-sm text-[#657b83]">
                    {new Date(bill.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#657b83]">{bill.items}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#073642]">₹{bill.amount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end space-x-3">
                      <button className="text-[#657b83] hover:text-[#073642] transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="text-[#657b83] hover:text-[#073642] transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;