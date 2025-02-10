"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black">
      <div className="max-w-md w-full p-8 bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 mb-4">
          Authentication Error
        </h2>
        <p className="text-gray-300 text-center mb-6">
          {error === "OAuthSignin" && "Error signing in with OAuth provider."}
          {error === "OAuthCallback" && "Error during OAuth callback."}
          {error === "OAuthCreateAccount" && "Error creating OAuth account."}
          {error === "EmailCreateAccount" && "Error creating email account."}
          {error === "Callback" && "Error during callback."}
          {error === "OAuthAccountNotLinked" &&
            "Email already used with different provider."}
          {error === "EmailSignin" && "Error sending email signin link."}
          {error === "CredentialsSignin" && "Invalid credentials."}
          {error === "SessionRequired" && "Please sign in to access this page."}
          {!error && "An unknown error occurred."}
        </p>
        <a
          href="/signin"
          className="block w-full py-3 px-4 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 rounded-lg font-medium text-center text-white shadow-lg shadow-purple-500/25 transition-all duration-200"
        >
          Back to Sign In
        </a>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-300">Loading...</div>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
