"use client";

import { ArrowRightOnRectangleIcon, ChartBarIcon, Cog6ToothIcon, DocumentTextIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);


  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-950">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-950/70 border-r border-purple-900/30 p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-full bg-purple-900/20 flex items-center justify-center">
              <DocumentTextIcon className="h-5 w-5 text-purple-500" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              AuthDash
            </h1>
          </div>

          <nav className="space-y-2 flex-1">
            {[
              { name: 'Dashboard', icon: ChartBarIcon, active: true },
              { name: 'Profile', icon: UserCircleIcon },
              { name: 'Documents', icon: DocumentTextIcon },
              { name: 'Settings', icon: Cog6ToothIcon },
            ].map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active
                    ? 'bg-purple-900/30 text-purple-400'
                    : 'text-gray-400 hover:bg-purple-900/20'
                  }`}
              >
                <item.icon className="h-5 w-5 text-purple-500" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="border-t border-purple-900/30 pt-4">
            <div className="flex items-center gap-3 mb-4">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-purple-900/20 flex items-center justify-center">
                  <UserCircleIcon className="h-6 w-6 text-purple-500" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-300">{session?.user?.name}</p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-300 mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Total Documents', value: '1,234', color: 'bg-purple-600' },
                { title: 'Active Users', value: '89', color: 'bg-pink-600' },
                { title: 'Storage Used', value: '64%', color: 'bg-indigo-600' },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-950/70 rounded-xl p-6 border border-purple-900/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-300 mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <ChartBarIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="bg-gray-950/70 rounded-xl p-6 border border-purple-900/30 mb-8">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">Activity Overview</h2>
              <div className="h-64 bg-purple-900/20 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Chart Implementation Here</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-950/70 rounded-xl p-6 border border-purple-900/30">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Recent Documents</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 hover:bg-purple-900/20 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="h-5 w-5 text-purple-500" />
                        <span className="text-gray-400">document_{item}.md</span>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-950/70 rounded-xl p-6 border border-purple-900/30">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">System Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                    <span className="text-green-500">Authentication Service</span>
                    <span className="text-sm text-green-500">Operational</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg">
                    <span className="text-blue-500">Database Connection</span>
                    <span className="text-sm text-blue-500">Stable</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg">
                    <span className="text-purple-500">API Response Time</span>
                    <span className="text-sm text-purple-500">142ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
