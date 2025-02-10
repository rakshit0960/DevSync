"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

export const runtime = 'nodejs';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error") || "Something went wrong";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black">
      <div className="max-w-md w-full px-6 py-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20">
        <h2 className="text-2xl font-bold text-center text-red-400 mb-4">
          Authentication Error
        </h2>
        <p className="text-gray-300 text-center mb-6">{error}</p>
        <div className="flex justify-center">
          <Link
            href="/auth/signin"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<ErrorFallback />}>
      <ErrorContent />
    </Suspense>
  );
}
