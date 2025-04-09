'use client';

import { useDispatch } from 'react-redux';
import { addToCart } from '../lib/cartSlice';

interface Product {
  id: number;
  name: string;
  price: number;
  discount_price?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">${product.discount_price || product.price}</p>
      <button
        onClick={() => dispatch(addToCart({ productId: product.id, quantity: 1, name: product.name, price: product.discount_price || product.price }))}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}