/**
 * admin dashboard - comprehensive cms interface
 * 
 * features:
 * - site statistics overview
 * - quick actions panel
 * - recent activity feed
 * - product management shortcuts
 * - configuration quick edit
 * - analytics widgets
 * 
 * @requires authentication via middleware
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Settings,
  Image as ImageIcon,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  BarChart3,
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalViews: number;
  pendingUpdates: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalViews: 0,
    pendingUpdates: 0,
  });

  // fetch dashboard data
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch('/api/admin/dashboard');
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('dashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sage-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-olive border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-bg">
      {/* header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-sage-dark font-serif mb-2">
                dashboard
              </h1>
              <p className="text-gray-500">
                welcome back, manage your urban veda site
              </p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <Eye size={18} />
              <span className="font-semibold">view site</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<Package className="text-olive" size={24} />}
            label="total products"
            value={stats.totalProducts}
            change="+2 this month"
          />
          <StatCard
            icon={<TrendingUp className="text-green-600" size={24} />}
            label="active products"
            value={stats.activeProducts}
            change="all live"
          />
          <StatCard
            icon={<Eye className="text-blue-600" size={24} />}
            label="total views"
            value={stats.totalViews}
            change="+12% vs last week"
          />
          <StatCard
            icon={<BarChart3 className="text-purple-600" size={24} />}
            label="pending updates"
            value={stats.pendingUpdates}
            change="awaiting review"
          />
        </div>

        {/* quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* actions panel */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-sage-dark mb-6 font-serif">
              quick actions
            </h2>
            <div className="space-y-3">
              <ActionButton
                icon={<Plus size={20} />}
                label="add new product"
                href="/admin/products/new"
              />
              <ActionButton
                icon={<ImageIcon size={20} />}
                label="upload images"
                href="/admin/media"
              />
              <ActionButton
                icon={<Settings size={20} />}
                label="site configuration"
                href="/admin/settings"
              />
              <ActionButton
                icon={<Edit size={20} />}
                label="manage products"
                href="/admin/products"
              />
            </div>
          </div>

          {/* recent activity */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-sage-dark mb-6 font-serif">
              recent activity
            </h2>
            <div className="space-y-4">
              <ActivityItem
                action="product updated"
                item="ayuboost"
                time="2 hours ago"
              />
              <ActivityItem
                action="image uploaded"
                item="philosophy-hero.webp"
                time="5 hours ago"
              />
              <ActivityItem
                action="config changed"
                item="hero headline"
                time="1 day ago"
              />
              <ActivityItem
                action="product added"
                item="diabetes care"
                time="3 days ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * stat card component for dashboard metrics
 */
function StatCard({ icon, label, value, change }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-50 p-3 rounded-xl">{icon}</div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-sage-dark">{value}</p>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xs text-gray-500">{change}</p>
      </div>
    </div>
  );
}

/**
 * action button component for quick access
 */
function ActionButton({ icon, label, href }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-olive/10 rounded-xl transition-all group"
    >
      <div className="bg-white p-2 rounded-lg group-hover:bg-olive/20 transition-colors">
        {icon}
      </div>
      <span className="font-semibold text-gray-700 group-hover:text-olive transition-colors">
        {label}
      </span>
    </Link>
  );
}

/**
 * activity feed item component
 */
function ActivityItem({ action, item, time }: any) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
      <div className="w-2 h-2 bg-olive rounded-full mt-2" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-700">
          {action}: <span className="text-olive">{item}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}