// admin dashboard - simple version for now
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check auth
    async function checkAuth() {
      try {
        const res = await fetch('/api/config');
        if (res.status === 401) {
          router.push('/admin/login');
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push('/admin/login');
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-olive border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-bg p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-sage-dark mb-8 font-serif">
          Admin Dashboard
        </h1>
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <p className="text-gray-600">
            Welcome to the admin panel. Full CMS coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}