"use server"

import { signIn } from "@/auth";

export const signInWithGithub = async () => {
  await signIn("github");
};

export const signInWithGoogle = async () => {
  await signIn("google");
};