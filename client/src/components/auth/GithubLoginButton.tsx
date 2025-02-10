"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Image from "next/image";

export function GithubLoginButton() {
  return (
    <motion.button
      type="button"
      onClick={() => signIn("github")}
      className="flex items-center justify-center px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500 group w-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Image
        className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
        src="https://www.svgrepo.com/show/512317/github-142.svg"
        alt="GitHub logo"
        width={20}
        height={20}
      />
      <span className="ml-2 text-gray-200">GitHub</span>
    </motion.button>
  );
}
