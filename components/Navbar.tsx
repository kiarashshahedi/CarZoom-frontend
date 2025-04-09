'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { logout } from '../lib/authSlice';

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Car Parts Shop</Link>
        <div className="space-x-4">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          {user ? (
            <>
              {user.role === 'seller' && user.isSellerApproved && <Link href="/seller">Seller Dashboard</Link>}
              <Link href="/profile">Profile</Link>
              <button onClick={() => dispatch(logout())} className="bg-red-500 px-2 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}