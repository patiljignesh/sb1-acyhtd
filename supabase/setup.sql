-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_id UNIQUE(user_id)
);

-- Create print requests table
CREATE TABLE IF NOT EXISTS public.print_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    budget DECIMAL,
    status TEXT DEFAULT 'pending',
    files JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create printers table
CREATE TABLE IF NOT EXISTS public.printers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    model TEXT,
    materials TEXT[],
    build_volume TEXT,
    experience TEXT,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    printer_id UUID REFERENCES public.printers(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.print_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.printers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Allow public read access" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow users to update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow profile creation" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for print requests
CREATE POLICY "Allow public read access" ON public.print_requests FOR SELECT USING (true);
CREATE POLICY "Allow authenticated create" ON public.print_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow owners to update" ON public.print_requests FOR UPDATE USING (auth.uid() = user_id);

-- Policies for printers
CREATE POLICY "Allow public read access" ON public.printers FOR SELECT USING (true);
CREATE POLICY "Allow authenticated create" ON public.printers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow owners to update" ON public.printers FOR UPDATE USING (auth.uid() = user_id);

-- Policies for gallery
CREATE POLICY "Allow public read access" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow admin create" ON public.gallery FOR INSERT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Allow admin update" ON public.gallery FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Function to ensure admin exists
CREATE OR REPLACE FUNCTION ensure_admin(admin_email TEXT)
RETURNS void AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, role)
    SELECT id, email, 'admin'
    FROM auth.users
    WHERE email = admin_email
    ON CONFLICT (user_id) DO UPDATE
    SET role = 'admin',
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create admin user
SELECT ensure_admin('admin@gmail.com');