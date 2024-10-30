import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Size, TShirtColor, PrintSize } from '../types';

interface OrderSummaryProps {
  hasDesign: boolean;
  size: Size;
  color: TShirtColor;
  printSize: PrintSize;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  hasDesign, 
  size, 
  color,
  printSize 
}) => {
  const TSHIRT_PRICE = 270; // Oversized T-shirt price
  const PRINT_PRICES = {
    'A4': 110,
    'A3': 180,
    'A2': 230
  };
  
  const printPrice = PRINT_PRICES[printSize];
  const subtotal = TSHIRT_PRICE + (hasDesign ? printPrice : 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Oversized T-shirt</span>
            <span className="font-medium">₹{TSHIRT_PRICE.toFixed(2)}</span>
          </div>
          {hasDesign && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{printSize} Print</span>
              <span className="font-medium">₹{printPrice.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-4 border-t border-dashed">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">GST (5%)</span>
              <span className="font-medium">₹{tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-medium mb-2">Order Details</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Size: {size}</li>
              <li>Color: {color.charAt(0).toUpperCase() + color.slice(1)}</li>
              <li>Print Size: {printSize}</li>
              <li>Quantity: 1</li>
            </ul>
          </div>
        </div>

        <button
          disabled={!hasDesign}
          className={`
            w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2
            ${hasDesign
              ? 'bg-black text-white hover:bg-black/90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
            transition-all duration-200
          `}
        >
          <ShoppingCart size={20} />
          <span>{hasDesign ? 'Add to Cart' : 'Upload a Design'}</span>
        </button>

        {!hasDesign && (
          <p className="text-sm text-gray-500 text-center mt-4">
            Please upload a design to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;