import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vwmhxsdquowdkfkjeotd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

interface AdminProfile {
  id: string;
  user_id: string;
  role: string;
  email: string;
}

export class AuthenticationError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const authenticateAdmin = async (email: string, password: string) => {
  try {
    console.log('Starting admin authentication for:', email);

    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Sign in error:', signInError);
      throw new AuthenticationError('Invalid credentials');
    }

    if (!authData.user) {
      console.error('No user found after sign in');
      throw new AuthenticationError('No user found');
    }

    console.log('User authenticated successfully:', authData.user.id);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', authData.user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      throw new AuthenticationError('Failed to fetch user profile');
    }

    if (!profile || profile.role !== 'admin') {
      console.error('No admin profile found');
      throw new AuthenticationError('Unauthorized - Admin access required');
    }

    return {
      user: authData.user,
      profile: profile as AdminProfile,
      session: authData.session,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError('Authentication failed');
  }
};

export const checkAdminAuth = async () => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      throw new AuthenticationError('No active session');
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (profileError) {
      throw new AuthenticationError('Failed to fetch profile');
    }

    if (!profile || profile.role !== 'admin') {
      throw new AuthenticationError('Unauthorized - Admin access required');
    }

    return { session, profile: profile as AdminProfile };
  } catch (error) {
    console.error('Check auth error:', error);
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError('Failed to verify admin authentication');
  }
};