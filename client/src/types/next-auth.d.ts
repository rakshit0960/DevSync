import NextAuth from "next-auth"  
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      image?: string
    }
    accessToken?: string
  }
  
  interface User {
    id: string
    email: string
    name?: string
    image?: string
    emailVerified?: Date | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    accessToken?: string
  }
} 
export default NextAuth 