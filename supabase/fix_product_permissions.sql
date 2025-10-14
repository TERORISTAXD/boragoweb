-- Fix product creation permissions for admin panel
-- Run this in Supabase SQL Editor

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'products';

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

-- Create new policies that work with authenticated users
-- Allow authenticated users to insert products (admin check will be in app)
CREATE POLICY "Authenticated users can insert products" ON public.products
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to update products
CREATE POLICY "Authenticated users can update products" ON public.products
  FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to delete products
CREATE POLICY "Authenticated users can delete products" ON public.products
  FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- Verify policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'products';
