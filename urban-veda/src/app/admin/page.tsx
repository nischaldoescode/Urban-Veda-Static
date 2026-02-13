/**
 * admin dashboard - main overview
 *
 * features:
 * - key statistics cards
 * - quick action buttons
 * - recent activity feed
 * - system status indicators
 *
 * authentication: handled by admin layout
 *
 * @component
 */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  TrendingUp,
  Eye,
  BarChart3,
  Plus,
  Edit,
  Settings,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalViews: number;
  pendingUpdates: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalViews: 0,
    pendingUpdates: 0,
  });
  const [loading, setLoading] = useState(true);

  /**
   * fetch dashboard statistics from api
   */
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/dashboard");
        const data = await res.json();

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("stats fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-olive border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* page header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-sage-dark font-serif mb-2">
          dashboard
        </h1>
        <p className="text-gray-500">overview of your urban veda store</p>
      </div>

      {/* statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard
          icon={<Package className="text-olive" size={24} />}
          label="total products"
          value={stats.totalProducts}
          change="+2 this month"
          trend="up"
        />
        <StatCard
          icon={<TrendingUp className="text-green-600" size={24} />}
          label="active products"
          value={stats.activeProducts}
          change="all live"
          trend="neutral"
        />
        <StatCard
          icon={<Eye className="text-blue-600" size={24} />}
          label="page views"
          value={stats.totalViews}
          change="+12% vs last week"
          trend="up"
        />
        <StatCard
          icon={<BarChart3 className="text-purple-600" size={24} />}
          label="pending updates"
          value={stats.pendingUpdates}
          change="awaiting review"
          trend="neutral"
        />
      </div>

      {/* main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* quick actions - takes 2 columns on large screens */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-sage-dark mb-4 sm:mb-6 font-serif">
            quick actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <QuickActionCard
              icon={<Plus size={20} />}
              title="add new product"
              description="create a new juice product"
              href="/admin/products/new"
            />
            <QuickActionCard
              icon={<ImageIcon size={20} />}
              title="upload images"
              description="manage media library"
              href="/admin/media"
            />
            <QuickActionCard
              icon={<Edit size={20} />}
              title="edit pages"
              description="update about, philosophy"
              href="/admin/pages"
            />
            <QuickActionCard
              icon={<Settings size={20} />}
              title="site settings"
              description="configure your store"
              href="/admin/settings"
            />
          </div>
        </div>

        {/* system status - takes 1 column */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-sage-dark mb-4 sm:mb-6 font-serif">
            system status
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <StatusItem
              label="database"
              status="healthy"
              icon={<CheckCircle2 className="text-green-600" size={18} />}
            />
            <StatusItem
              label="cloudinary"
              status="operational"
              icon={<CheckCircle2 className="text-green-600" size={18} />}
            />
            <StatusItem
              label="performance"
              status="excellent"
              icon={<CheckCircle2 className="text-green-600" size={18} />}
            />
            <StatusItem
              label="updates"
              status={stats.pendingUpdates > 0 ? "pending" : "up to date"}
              icon={
                stats.pendingUpdates > 0 ? (
                  <AlertCircle className="text-orange-500" size={18} />
                ) : (
                  <CheckCircle2 className="text-green-600" size={18} />
                )
              }
            />
          </div>
        </div>
      </div>

      {/* recent activity */}
      <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-sage-dark mb-4 sm:mb-6 font-serif">
          recent activity
        </h2>
        <div className="space-y-2 sm:space-y-3">
          <ActivityItem
            action="product updated"
            item="ayuboost"
            time="2 hours ago"
            type="edit"
          />
          <ActivityItem
            action="image uploaded"
            item="hero-background.webp"
            time="5 hours ago"
            type="upload"
          />
          <ActivityItem
            action="page modified"
            item="about page"
            time="1 day ago"
            type="edit"
          />
          <ActivityItem
            action="product created"
            item="diabetes care"
            time="3 days ago"
            type="create"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * statistic card component
 */
function StatCard({ icon, label, value, change, trend }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="bg-gray-50 p-2 sm:p-3 rounded-xl">{icon}</div>
        {trend === "up" && (
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            ↑
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl sm:text-3xl font-bold text-sage-dark">{value}</p>
        <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xs text-gray-500">{change}</p>
      </div>
    </div>
  );
}

/**
 * quick action card component
 */
function QuickActionCard({ icon, title, description, href }: any) {
  return (
    <Link
      href={href}
      className="flex flex-col p-3 sm:p-4 bg-gray-50 hover:bg-olive/5 rounded-xl transition-all group border border-transparent hover:border-olive/20"
    >
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="bg-white p-2 rounded-lg group-hover:bg-olive/10 transition-colors">
          {icon}
        </div>
        <ArrowRight
          size={16}
          className="text-gray-400 group-hover:text-olive group-hover:translate-x-1 transition-all"
        />
      </div>
      <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
        {title}
      </h3>
      <p className="text-xs text-gray-500">{description}</p>
    </Link>
  );
}

/**
 * status item component
 */
function StatusItem({ label, status, icon }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2 sm:space-x-3">
        {icon}
        <span className="text-xs sm:text-sm font-semibold text-gray-700">
          {label}
        </span>
      </div>
      <span className="text-xs font-medium text-gray-500">{status}</span>
    </div>
  );
}

/**
 * activity feed item component
 */
function ActivityItem({ action, item, time, type }: any) {
  const colors = {
    edit: "bg-blue-500",
    upload: "bg-green-500",
    create: "bg-purple-500",
    delete: "bg-red-500",
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div
        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors[type as keyof typeof colors]}`}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-700 truncate">
          {action}: <span className="text-olive">{item}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}
