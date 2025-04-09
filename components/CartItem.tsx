'use client';

import { useDispatch } from 'react-redux';
import { removeFromCart } from '../lib/cartSlice';

interface CartItemProps {
  item: { productId: number; name: string; price: number; quantity: number };
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h3>{item.name}</h3>
        <p>${item.price} x {item.quantity}</p>
      </div>
      <button
        onClick={() => dispatch(removeFromCart(item.productId))}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
}