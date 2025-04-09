'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/store';
import { clearCart } from '../../lib/cartSlice';
import CartItem from '../../components/CartItem';
import { orderApi } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      await orderApi.post('/carts/', { items: items.map(item => ({ product_id: item.productId, quantity: item.quantity })) });
      await orderApi.post('/checkout/');
      dispatch(clearCart());
      router.push('/checkout');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map(item => <CartItem key={item.productId} item={item} />)}
          <div className="mt-4">
            <p className="text-xl">Total: ${total.toFixed(2)}</p>
            <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}