"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import Link from "next/link";
import { OAuthButtons } from "@/components/auth/OAuthButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const result = await authService.signUp(formData);

      if (result.success) {
        if (result.requiresEmailVerification) {
          // If email verification is required, redirect to sign-in with message
          router.push("/auth/signin?message=Please check your email to verify your account");
        } else {
          // If no email verification required, user is already signed in
          router.push("/dashboard");
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/20">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">
          Create your account
        </h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700/30 border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <input
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700/30 border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <input
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700/30 border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 rounded-lg font-medium text-white shadow-lg shadow-purple-500/25 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <OAuthButtons />

        <div className="text-center mt-6">
          <span className="text-gray-400">Already have an account? </span>
          <Link
            href="/auth/signin"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}