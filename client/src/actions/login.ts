"use server"
import { signIn } from "next-auth/react"

export const loginUser = async (formData: FormData) => {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })
  } catch (error) {
    console.error(error)
    return { error: "Invalid credentials" }
  }
}
