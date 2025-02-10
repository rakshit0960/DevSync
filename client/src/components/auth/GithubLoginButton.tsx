import { signIn } from "next-auth/react";
import Image from "next/image";

export function GithubLoginButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className="w-full flex items-center justify-center gap-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors text-white px-4 py-3 rounded-lg font-medium border border-purple-500/20"
    >
      <Image
        className="h-5 w-5"
        src="https://www.svgrepo.com/show/475654/github-color.svg"
        alt="GitHub logo"
        width={20}
        height={20}
      />
      <span>GitHub</span>
    </button>
  );
}
