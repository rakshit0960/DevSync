import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    // Add other protected routes here
  ],
}