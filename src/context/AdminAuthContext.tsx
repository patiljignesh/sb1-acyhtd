import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, checkAdminAuth, AuthenticationError } from '@/lib/supabase';
import { toast } from 'sonner';

interface AdminProfile {
  id: string;
  user_id: string;
  role: 'admin';
  email: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: AdminProfile | null;
  checkAuth: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

function useAdminAuthContext() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  const checkAuthStatus = async () => {
    try {
      const { profile } = await checkAdminAuth();
      setProfile(profile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      setProfile(null);
      setIsAuthenticated(false);
      
      if (error instanceof AuthenticationError && 
          window.location.pathname.startsWith('/admin') && 
          window.location.pathname !== '/admin/login') {
        navigate('/admin/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setProfile(null);
      setIsAuthenticated(false);
      navigate('/admin/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  useEffect(() => {
    checkAuthStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setIsAuthenticated(false);
      } else if (event === 'SIGNED_IN') {
        await checkAuthStatus();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    profile,
    checkAuth: checkAuthStatus,
    signOut,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useAdminAuthContext();
}