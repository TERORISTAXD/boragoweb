-- Fix users table policies to allow admin creation
-- Run this in Supabase SQL Editor

-- First, drop all existing policies on users table
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Owners can view all users" ON public.users;
DROP POLICY IF EXISTS "Owners can update user roles" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can insert users" ON public.users;
DROP POLICY IF EXISTS "Public read access" ON public.users;
DROP POLICY IF EXISTS "Users can insert own record" ON public.users;
DROP POLICY IF EXISTS "Owners can insert users" ON public.users;
DROP POLICY IF EXISTS "Owners can update users" ON public.users;
DROP POLICY IF EXISTS "Owners can delete users" ON public.users;
DROP POLICY IF EXISTS "Authenticated can insert users" ON public.users;
DROP POLICY IF EXISTS "Authenticated can update users" ON public.users;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can read user data (needed for checking if user exists)
CREATE POLICY "Public read access" ON public.users
  FOR SELECT 
  USING (true);

-- Policy 2: Users can insert their own record on signup
CREATE POLICY "Users can insert own record" ON public.users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Policy 3: Only specific owner can insert other users (using hardcoded ID)
CREATE POLICY "Owners can insert users" ON public.users
  FOR INSERT 
  WITH CHECK (
    auth.uid() = 'f97a9218-57da-49b0-92b5-07be3d18c70e'::uuid
  );

-- Policy 4: Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE 
  USING (auth.uid() = id);

-- Policy 5: Only specific owner can update other users' roles (using hardcoded ID)
CREATE POLICY "Owners can update users" ON public.users
  FOR UPDATE 
  USING (
    auth.uid() = 'f97a9218-57da-49b0-92b5-07be3d18c70e'::uuid
  );

-- Policy 6: Only specific owner can delete users (using hardcoded ID)
CREATE POLICY "Owners can delete users" ON public.users
  FOR DELETE 
  USING (
    auth.uid() = 'f97a9218-57da-49b0-92b5-07be3d18c70e'::uuid
  );

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname;
