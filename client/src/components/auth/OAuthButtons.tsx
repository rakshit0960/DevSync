"use client";

import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";

interface OAuthButtonsProps {
  callbackUrl?: string;
}

export function OAuthButtons({ callbackUrl = "/dashboard" }: OAuthButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      setLoading(provider);
      await signIn(provider, { callbackUrl });
    } catch (err) {
      console.error(`Error signing in with ${provider}:`, err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-purple-500/20"></div>
        <span className="mx-4 text-sm text-gray-400">Or continue with</span>
        <div className="flex-grow border-t border-purple-500/20"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleOAuthSignIn("google")}
          disabled={loading !== null}
          className="flex items-center justify-center px-4 py-3 space-x-2 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          <FaGoogle className="w-5 h-5" />
          <span>{loading === "google" ? "Signing in..." : "Google"}</span>
        </button>
        <button
          onClick={() => handleOAuthSignIn("github")}
          disabled={loading !== null}
          className="flex items-center justify-center px-4 py-3 space-x-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          <FaGithub className="w-5 h-5" />
          <span>{loading === "github" ? "Signing in..." : "GitHub"}</span>
        </button>
      </div>
    </>
  );
} 