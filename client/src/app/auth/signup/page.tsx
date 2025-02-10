"use client";
"use client";

import { registerUser } from "@/actions/register";
import { GithubLoginButton } from "@/components/auth/GithubLoginButton";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { SignupFormData, signupSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [error, setError] = useState<string>("");

  const onSubmit = handleSubmit(async (data) => {
    const result = await registerUser(data);
    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = "/auth/signin";
    }
  });


  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/20">
        <div>
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">
            Create your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-3 bg-gray-700/30 border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                placeholder="Full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 bg-gray-700/30 border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register("password")}
                className="w-full px-4 py-3 bg-gray-700/30 border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200 text-white shadow-lg shadow-purple-500/25"
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-purple-500/20"></div>
            <span className="mx-4 text-sm text-gray-400">Or continue with</span>
            <div className="flex-grow border-t border-purple-500/20"></div>
          </div>
        </form>

        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <GoogleLoginButton />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <GithubLoginButton />
          </motion.div>
        </div>

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
