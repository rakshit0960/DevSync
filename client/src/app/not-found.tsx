"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-medium text-gray-400 mt-4">
            Page not found
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12"
        >
          <div className="relative group py-4 flex justify-center items-center">
            <a href="/support" className="px-4 py-1 text-sm text-gray-400 bg-transparent hover:bg-purple-900/20 rounded-full hover:text-purple-400 transition-all duration-200 relative z-10">
              Need help? Contact support
            </a>
            <div className="absolute inset-0 border-t border-purple-500/30 group-hover:border-purple-500/50 transition-colors duration-300"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}