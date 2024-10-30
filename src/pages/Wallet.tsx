import React, { useState } from 'react';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface WalletProps {
  balance: number;
}

const Wallet: React.FC<WalletProps> = ({ balance }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const transactions = [
    { id: 1, type: 'credit', amount: 2000, date: '2024-02-22', time: '13:50:25', status: 'completed' },
    { id: 2, type: 'debit', amount: 1500, date: '2024-02-21', time: '15:30:10', status: 'completed' },
    { id: 3, type: 'credit', amount: 3000, date: '2024-02-20', time: '09:15:45', status: 'completed' },
  ];

  const rechargeAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="space-y-8">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#dc322f] to-[#cb4b16] rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <WalletIcon size={24} />
          </div>
          <div>
            <p className="text-white/80">Available Balance</p>
            <h2 className="text-3xl font-bold">₹{balance.toFixed(2)}</h2>
          </div>
        </div>
      </div>

      {/* Quick Recharge */}
      <div className="bg-white rounded-xl border border-[#eee8d5] p-6">
        <h3 className="text-lg font-semibold text-[#073642] mb-4">Quick Recharge</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {rechargeAmounts.map(amount => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`p-4 rounded-xl border text-center transition-all ${
                selectedAmount === amount
                  ? 'border-[#dc322f] bg-[#dc322f]/5 text-[#dc322f]'
                  : 'border-[#eee8d5] hover:border-[#dc322f] text-[#657b83]'
              }`}
            >
              <span className="text-lg font-semibold">₹{amount}</span>
            </button>
          ))}
        </div>
        <button className="w-full bg-[#dc322f] text-white py-3 rounded-xl font-semibold hover:bg-[#cb4b16] transition-colors flex items-center justify-center space-x-2">
          <Plus size={20} />
          <span>Add Money</span>
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl border border-[#eee8d5] p-6">
        <h3 className="text-lg font-semibold text-[#073642] mb-4">Transaction History</h3>
        <div className="space-y-4">
          {transactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl border border-[#eee8d5] hover:border-[#dc322f] transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-xl ${
                  transaction.type === 'credit'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'credit' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div>
                  <p className="font-medium text-[#073642]">
                    {transaction.type === 'credit' ? 'Money Added' : 'Purchase'}
                  </p>
                  <p className="text-sm text-[#657b83]">
                    {new Date(transaction.date + ' ' + transaction.time).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </p>
                <p className="text-sm text-[#657b83] capitalize">{transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;