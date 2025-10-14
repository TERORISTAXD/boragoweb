-- Admin Panel Enhanced Schema
-- Run this in your Supabase SQL Editor

-- Update users table to support owner role
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE public.users ADD CONSTRAINT users_role_check 
  CHECK (role IN ('owner', 'admin', 'editor', 'customer'));

-- Page content table for editable website content
CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content_value TEXT NOT NULL,
  content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'html', 'markdown', 'json')),
  updated_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page, section, content_key)
);

-- Analytics cache table (to reduce API calls to Google Analytics)
CREATE TABLE IF NOT EXISTS public.analytics_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_name TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  date_range TEXT NOT NULL,
  cached_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  UNIQUE(metric_name, date_range)
);

-- Activity log for admin actions
CREATE TABLE IF NOT EXISTS public.admin_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_content_page ON public.page_content(page);
CREATE INDEX IF NOT EXISTS idx_page_content_section ON public.page_content(page, section);
CREATE INDEX IF NOT EXISTS idx_analytics_cache_expires ON public.analytics_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_admin_activity_user ON public.admin_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_created ON public.admin_activity_log(created_at DESC);

-- Enable RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for page_content
CREATE POLICY "Anyone can view page content" ON public.page_content
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage page content" ON public.page_content
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('owner', 'admin'))
  );

-- RLS Policies for analytics_cache
CREATE POLICY "Admins can view analytics cache" ON public.analytics_cache
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('owner', 'admin'))
  );

CREATE POLICY "Admins can manage analytics cache" ON public.analytics_cache
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('owner', 'admin'))
  );

-- RLS Policies for admin_activity_log
CREATE POLICY "Admins can view activity log" ON public.admin_activity_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('owner', 'admin'))
  );

CREATE POLICY "System can insert activity log" ON public.admin_activity_log
  FOR INSERT WITH CHECK (true);

-- Update trigger for page_content
CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log admin activity
CREATE OR REPLACE FUNCTION log_admin_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_activity_log (user_id, action, entity_type, entity_id, details)
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add activity logging triggers to important tables
CREATE TRIGGER log_products_activity
  AFTER INSERT OR UPDATE OR DELETE ON public.products
  FOR EACH ROW EXECUTE FUNCTION log_admin_activity();

CREATE TRIGGER log_orders_activity
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION log_admin_activity();

-- Seed default page content
INSERT INTO public.page_content (page, section, content_key, content_value, content_type) VALUES
('home', 'hero', 'title', 'Creative Portfolio & Digital Products', 'text'),
('home', 'hero', 'subtitle', 'Showcasing exceptional work and offering premium digital products for creators and businesses.', 'text'),
('pricing', 'header', 'title', 'Pricing', 'text'),
('pricing', 'header', 'subtitle', 'Choose the perfect plan for your needs', 'text'),
('about', 'hero', 'title', 'About Us', 'text'),
('about', 'hero', 'description', 'We are a creative agency focused on delivering exceptional digital experiences.', 'text')
ON CONFLICT (page, section, content_key) DO NOTHING;

-- Create a view for order statistics
CREATE OR REPLACE VIEW public.order_statistics AS
SELECT 
  COUNT(*) as total_orders,
  COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_orders,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
  SUM(CASE WHEN status = 'paid' THEN total_cents ELSE 0 END) as total_revenue_cents,
  AVG(CASE WHEN status = 'paid' THEN total_cents END) as avg_order_value_cents,
  DATE_TRUNC('day', created_at) as order_date
FROM public.orders
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY order_date DESC;

-- Grant access to the view
GRANT SELECT ON public.order_statistics TO authenticated;

-- Function to check if user is owner
CREATE OR REPLACE FUNCTION is_owner()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'owner'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin or owner
CREATE OR REPLACE FUNCTION is_admin_or_owner()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('owner', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update users policies to allow owner to manage admins
CREATE POLICY "Owners can view all users" ON public.users
  FOR SELECT USING (is_owner());

CREATE POLICY "Owners can update user roles" ON public.users
  FOR UPDATE USING (is_owner());

CREATE POLICY "Owners can delete users" ON public.users
  FOR DELETE USING (is_owner());

COMMENT ON TABLE public.page_content IS 'Stores editable website content for the admin panel';
COMMENT ON TABLE public.analytics_cache IS 'Caches Google Analytics data to reduce API calls';
COMMENT ON TABLE public.admin_activity_log IS 'Logs all admin actions for audit trail';
