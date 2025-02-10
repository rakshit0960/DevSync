"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      // First sign in with Supabase
      await authService.signIn(data);
      
      // Then create NextAuth session
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setFormError("root", {
          message: "Invalid email or password",
        });
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setFormError("root", {
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/20">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">
          Sign in to your account
        </h2>

        {errors.root && (
          <div className="bg-red-500/10 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 bg-gray-700/30 border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 rounded-lg font-medium text-white shadow-lg shadow-purple-500/25 disabled:opacity-50 transition-all duration-200"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <OAuthButtons />

        <div className="text-center mt-6">
          <span className="text-gray-400">Don't have an account? </span>
          <Link
            href="/auth/signup"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
