-- Run this once in your Supabase project → SQL Editor
-- Creates the community posts table with public read/write access (anon key)

CREATE TABLE IF NOT EXISTS community_posts (
  id         BIGINT PRIMARY KEY,
  user_name  TEXT        NOT NULL,
  content    TEXT        NOT NULL,
  likes      INT         NOT NULL DEFAULT 0,
  liked_by   TEXT[]      NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read posts
CREATE POLICY "Public read posts"
  ON community_posts FOR SELECT
  USING (true);

-- Allow anyone to insert posts
CREATE POLICY "Public insert posts"
  ON community_posts FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update likes on posts
CREATE POLICY "Public update likes"
  ON community_posts FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Index for fast ordering
CREATE INDEX IF NOT EXISTS community_posts_created_at_idx
  ON community_posts (created_at DESC);

-- Cap at 200 rows (auto-delete oldest beyond limit)
CREATE OR REPLACE FUNCTION trim_community_posts()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM community_posts
  WHERE id IN (
    SELECT id FROM community_posts
    ORDER BY created_at DESC
    OFFSET 200
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trim_posts_trigger
  AFTER INSERT ON community_posts
  EXECUTE FUNCTION trim_community_posts();
