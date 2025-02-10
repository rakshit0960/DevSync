import { supabase } from '@/lib/supabase'

interface SignUpData {
  email: string
  password: string
  name?: string
}

export const authService = {
  async signUp({ email, password, name }: SignUpData) {
    try {
      // 1. Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (authError) throw new Error(authError.message)
      if (!authData.user) throw new Error('No user data returned')

      // 2. Create user record in our User table
      const now = new Date().toISOString()
      const { error: userError } = await supabase
        .from('User')
        .insert([
          {
            id: authData.user.id,
            email: authData.user.email,
            name: name,
            createdAt: now,
            updatedAt: now,
          }
        ])

      if (userError) {
        console.error('Error creating user record:', userError)
        // Even if this fails, we continue as the auth user is created
      }

      // 3. Return information about email verification
      return {
        success: true,
        message: authData.session ? 
          'Account created and signed in successfully' : 
          'Please check your email for verification link',
        requiresEmailVerification: !authData.session,
        session: authData.session
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create account',
        requiresEmailVerification: false,
        session: null
      }
    }
  },

  async signIn({ email, password }: { email: string; password: string }) {
    try {
      // 1. Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw new Error(error.message)
      if (!data.user) throw new Error('No user found')

      // 2. Update last login timestamp
      const now = new Date().toISOString()
      await supabase
        .from('User')
        .update({ updatedAt: now })
        .eq('id', data.user.id)
        .single()

      return {
        success: true,
        session: data.session,
        user: data.user
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to sign in',
        session: null,
        user: null
      }
    }
  },

  async signOut() {
    try {
      // 1. Clear the Supabase session
      await supabase.auth.signOut()

      // 2. Optionally, clear the current session from the Session table
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.access_token) {
        await supabase
          .from('Session')
          .delete()
          .eq('sessionToken', session.access_token)
      }

      return { success: true }
    } catch (error) {
      console.error('Error during sign out:', error)
      return { success: false, error }
    }
  },

  async deleteAccount(userId: string) {
    try {
      // 1. Delete Account records
      await supabase
        .from('Account')
        .delete()
        .eq('userId', userId)

      // 2. Delete Session records
      await supabase
        .from('Session')
        .delete()
        .eq('userId', userId)

      // 3. Delete User record
      await supabase
        .from('User')
        .delete()
        .eq('id', userId)

      // 4. Delete from Supabase Auth
      await supabase.auth.admin.deleteUser(userId)

      return { success: true }
    } catch (error) {
      console.error('Error deleting account:', error)
      return { success: false, error }
    }
  }
} 