-- ATMOS COMMUNITY HUB SCHEMA
-- Real-time Social Ecosystem with Multi-Media Support
-- Run this in Supabase SQL Editor

-- 1. TABLES
-- POSTS TABLE (Architectural Feed)
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rich_html TEXT NOT NULL,
  image_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LIKES TABLE (Resonance)
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- 2. AUTOMATION
-- Auto-update timestamps for posts
CREATE TRIGGER set_updated_at_posts 
BEFORE UPDATE ON public.posts 
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 3. ROW LEVEL SECURITY (Zero-Trust Standard)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- POLICIES: POSTS
CREATE POLICY "Public Feed: Everyone can read posts" 
ON public.posts FOR SELECT USING (TRUE);

CREATE POLICY "Member Feed: Authenticated can insert posts" 
ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner Feed: Users can update own posts" 
ON public.posts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Owner Feed: Users can delete own posts" 
ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- POLICIES: LIKES
CREATE POLICY "Public Likes: Everyone can read likes" 
ON public.likes FOR SELECT USING (TRUE);

CREATE POLICY "Member Likes: Authenticated can toggle likes" 
ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner Likes: Users can remove own likes" 
ON public.likes FOR DELETE USING (auth.uid() = user_id);

-- 4. STORAGE (Buckets & Policies)
-- Instruction: You must create the bucket 'community_assets' manually in Supabase UI 
-- or use the following SQL if your Supabase instance supports it.

-- Ensure the bucket exists
-- INSERT INTO storage.buckets (id, name, public) VALUES ('community_assets', 'community_assets', true);

-- Storage Policies for 'community_assets'
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT USING (bucket_id = 'community_assets');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'community_assets' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE USING (
  bucket_id = 'community_assets' 
  AND auth.uid() = owner
);

CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE USING (
  bucket_id = 'community_assets' 
  AND auth.uid() = owner
);
