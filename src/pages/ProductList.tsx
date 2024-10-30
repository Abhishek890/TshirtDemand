import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const ProductList = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Classic Cotton T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80',
      price: 299,
      category: 'T-Shirts'
    },
    {
      id: '2',
      name: 'Premium Oversized T-Shirt',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80',
      price: 499,
      category: 'T-Shirts'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button className="bg-[#e2ff3d] text-black px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#d4f03d] transition-colors">
          <ShoppingBag size={20} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold">₹{product.price}</span>
                <button className="text-[#e2ff3d] hover:text-[#d4f03d] transition-colors">
                  <ShoppingBag size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;