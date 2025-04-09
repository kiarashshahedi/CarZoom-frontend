import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Car Parts Shop</h1>
      <p className="mb-4">Find the best car parts and accessories at unbeatable prices.</p>
      <Link href="/products" className="bg-blue-500 text-white px-4 py-2 rounded">Shop Now</Link>
    </div>
  );
}