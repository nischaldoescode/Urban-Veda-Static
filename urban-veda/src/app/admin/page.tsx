"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Eye,
  Plus,
  Edit,
  Settings,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
  Palette,
} from "lucide-react";

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  popularProducts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<"checking" | "healthy" | "error">(
    "checking",
  );

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/dashboard", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setDbStatus("healthy");
        } else {
          setDbStatus("error");
        }
      } catch {
        setDbStatus("error");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-olive border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-sage-dark font-serif mb-1">
          dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          overview of your urban veda store
        </p>
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard
          icon={<Package className="text-olive" size={20} />}
          label="total products"
          value={stats?.totalProducts ?? "—"}
          bg="bg-olive/5"
        />
        <StatCard
          icon={<Eye className="text-green-600" size={20} />}
          label="active / visible"
          value={
            stats ? `${stats.activeProducts} / ${stats.totalProducts}` : "—"
          }
          bg="bg-green-50"
        />
        <StatCard
          icon={<TrendingUp className="text-blue-600" size={20} />}
          label="popular"
          value={stats?.popularProducts ?? "—"}
          bg="bg-blue-50"
        />
        <StatCard
          icon={<AlertCircle className="text-orange-500" size={20} />}
          label="hidden"
          value={stats?.inactiveProducts ?? "—"}
          bg="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* quick actions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-lg font-bold text-sage-dark mb-4 font-serif">
            quick actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: <Plus size={18} />,
                title: "add new product",
                desc: "create a new juice product",
                href: "/admin/products/new",
              },
              {
                icon: <ImageIcon size={18} />,
                title: "upload images",
                desc: "manage media library",
                href: "/admin/media",
              },
              {
                icon: <Edit size={18} />,
                title: "edit pages",
                desc: "update about, philosophy",
                href: "/admin/pages",
              },
              {
                icon: <Settings size={18} />,
                title: "site settings",
                desc: "configure your store",
                href: "/admin/settings",
              },
              {
                icon: <Package size={18} />,
                title: "manage products",
                desc: "edit or hide products",
                href: "/admin/products",
              },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-olive/5 rounded-xl transition-all group border border-transparent hover:border-olive/20"
              >
                <div className="bg-white p-2 rounded-lg group-hover:bg-olive/10 transition-colors text-gray-600">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{a.title}</p>
                  <p className="text-xs text-gray-400 truncate">{a.desc}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-gray-300 group-hover:text-olive group-hover:translate-x-0.5 transition-all flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* system status */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-lg font-bold text-sage-dark mb-4 font-serif">
            system status
          </h2>
          <div className="space-y-2.5">
            <StatusItem
              label="database"
              status={
                dbStatus === "healthy"
                  ? "healthy"
                  : dbStatus === "error"
                    ? "error"
                    : "checking..."
              }
              ok={dbStatus === "healthy"}
            />
            <StatusItem label="cloudinary cdn" status="configured" ok={true} />
            <StatusItem
              label="active products"
              status={stats ? `${stats.activeProducts} live` : "loading..."}
              ok={true}
            />
            <StatusItem
              label="hidden products"
              status={
                stats
                  ? stats.inactiveProducts > 0
                    ? `${stats.inactiveProducts} hidden`
                    : "none hidden"
                  : "loading..."
              }
              ok={stats ? stats.inactiveProducts === 0 : true}
            />
          </div>

          {/* products breakdown */}
          {stats && (
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                product breakdown
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">active</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-olive/20 rounded-full w-20 overflow-hidden">
                      <div
                        className="h-full bg-olive rounded-full transition-all"
                        style={{
                          width:
                            stats.totalProducts > 0
                              ? `${(stats.activeProducts / stats.totalProducts) * 100}%`
                              : "0%",
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-8 text-right">
                      {stats.activeProducts}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">popular</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-blue-100 rounded-full w-20 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{
                          width:
                            stats.totalProducts > 0
                              ? `${(stats.popularProducts / stats.totalProducts) * 100}%`
                              : "0%",
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-8 text-right">
                      {stats.popularProducts}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">hidden</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-orange-100 rounded-full w-20 overflow-hidden">
                      <div
                        className="h-full bg-orange-400 rounded-full transition-all"
                        style={{
                          width:
                            stats.totalProducts > 0
                              ? `${(stats.inactiveProducts / stats.totalProducts) * 100}%`
                              : "0%",
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-8 text-right">
                      {stats.inactiveProducts}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bg: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow">
      <div
        className={`${bg} w-9 h-9 rounded-lg flex items-center justify-center mb-3`}
      >
        {icon}
      </div>
      <p className="text-xl sm:text-2xl font-bold text-sage-dark">{value}</p>
      <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
        {label}
      </p>
    </div>
  );
}

function StatusItem({
  label,
  status,
  ok,
}: {
  label: string;
  status: string;
  ok: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        {ok ? (
          <CheckCircle2 className="text-green-600 flex-shrink-0" size={15} />
        ) : (
          <AlertCircle className="text-orange-500 flex-shrink-0" size={15} />
        )}
        <span className="text-xs font-semibold text-gray-700">{label}</span>
      </div>
      <span className="text-xs text-gray-500">{status}</span>
    </div>
  );
}
