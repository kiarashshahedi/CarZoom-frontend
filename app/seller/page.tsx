'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { productApi, orderApi } from '../../lib/api';

export default function SellerDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [products, setProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category_id: 1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await productApi.get('/products/');
        setProducts(productResponse.data.results.filter((p: any) => p.seller === user?.id));
        const invoiceResponse = await orderApi.get('/invoices/');
        setInvoices(invoiceResponse.data.results);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    if (user?.role === 'seller' && user.isSellerApproved) fetchData();
  }, [user]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productApi.post('/products/', { ...newProduct, slug: newProduct.name.toLowerCase().replace(' ', '-') });
      setNewProduct({ name: '', price: '', category_id: 1 });
      const response = await productApi.get('/products/');
      setProducts(response.data.results.filter((p: any) => p.seller === user?.id));
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  if (!user?.isSellerApproved) return <p className="text-red-500">Your seller account is not yet approved.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl mb-2">Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product Name" className="w-full p-2 mb-2 border rounded" />
          <input type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Price" className="w-full p-2 mb-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-xl mb-2">Your Products</h2>
        <ul>{products.map((p: any) => <li key={p.id}>{p.name} - ${p.price}</li>)}</ul>
      </div>
      <div>
        <h2 className="text-xl mb-2">Invoices</h2>
        <ul>{invoices.map((i: any) => <li key={i.id}>Order {i.order} - Net: ${i.net_amount} ({i.paid ? 'Paid' : 'Pending'})</li>)}</ul>
      </div>
    </div>
  );
}