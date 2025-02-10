"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="mt-6 bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white">
            Welcome, {session?.user?.name}!
          </h2>
          <p className="mt-2 text-gray-300">You are successfully logged in.</p>
        </div>
      </div>
    </div>
  );
}
