import { useSession as useNextAuthSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
  }
}

export function useSession() {
  const { data: session, status, update } = useNextAuthSession();
  
  return {
    user: session?.user ?? null,
    session: session as CustomSession | null,
    loading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    updateSession: update,
  };
} 