'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import { authApi } from '../../../lib/api';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    username: '', national_code: '', first_name: '', last_name: '', email: '', shaba_number: '', gender: '', address: '', password: '', has_mechanic_shop: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (user?.profile_completed) router.push('/products');
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.post('/profile/complete/', formData);
      router.push('/products');
    } catch (error) {
      console.error('Profile completion failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} placeholder="Username" className="w-full p-2 mb-2 border rounded" />
        <input type="text" value={formData.national_code} onChange={e => setFormData({ ...formData, national_code: e.target.value })} placeholder="National Code" className="w-full p-2 mb-2 border rounded" />
        <input type="text" value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })} placeholder="First Name" className="w-full p-2 mb-2 border rounded" />
        <input type="text" value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })} placeholder="Last Name" className="w-full p-2 mb-2 border rounded" />
        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full p-2 mb-2 border rounded" />
        {user?.role === 'seller' && (
          <input type="text" value={formData.shaba_number} onChange={e => setFormData({ ...formData, shaba_number: e.target.value })} placeholder="Shaba Number" className="w-full p-2 mb-2 border rounded" />
        )}
        <input type="text" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} placeholder="Gender" className="w-full p-2 mb-2 border rounded" />
        <textarea value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="Address" className="w-full p-2 mb-2 border rounded" />
        <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="Password" className="w-full p-2 mb-2 border rounded" />
        {user?.role === 'mechanic' && (
          <label className="flex items-center mb-2">
            <input type="checkbox" checked={formData.has_mechanic_shop} onChange={e => setFormData({ ...formData, has_mechanic_shop: e.target.checked })} />
            <span className="ml-2">I have a mechanic shop</span>
          </label>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}