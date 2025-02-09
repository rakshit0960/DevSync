'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);



  if (status === 'loading') {
    return <div>Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold">Welcome, {session?.user?.name}!</h2>
          <p className="mt-2 text-gray-600">You are successfully logged in.</p>
        </div>

      </div>
    </div>
  );
}