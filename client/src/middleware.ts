export { auth as middleware } from "@/auth";


export const config = {
  matcher: [
    '/dashboard',
    '/docs',
    '/api/auth/:path*'
  ]
}