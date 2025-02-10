import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { supabase } from './supabase'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password')
        }

        try {
          const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (authError || !user?.email) {
            throw new Error(authError?.message || 'Invalid credentials')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email,
            image: user.user_metadata?.avatar_url,
          }
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : 'Invalid credentials')
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false

      try {
        if (account?.provider === 'google' || account?.provider === 'github') {
          // Check if user exists
          const { data: existingUser } = await supabase
            .from('User')
            .select('id')
            .eq('email', user.email)
            .single()

          if (!existingUser) {
            const now = new Date().toISOString()
            // Create new user
            const { error: userError } = await supabase
              .from('User')
              .insert([
                {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  image: user.image,
                  emailVerified: now,
                  createdAt: now,
                  updatedAt: now,
                }
              ])

            if (userError) throw userError

            // Create account link
            const { error: accountError } = await supabase
              .from('Account')
              .insert([
                {
                  userId: user.id,
                  type: 'oauth',
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  createdAt: now,
                  updatedAt: now,
                }
              ])

            if (accountError) throw accountError
          }
        }
        return true
      } catch (error) {
        console.error('Error during sign in:', error)
        return false
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        if (account) {
          token.accessToken = account.access_token
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.accessToken = token.accessToken as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV === 'development',
}