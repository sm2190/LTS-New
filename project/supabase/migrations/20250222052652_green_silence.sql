/*
  # Initial Schema for Islamic Lectures App

  1. New Tables
    - scholars: Store scholar information
    - categories: Main categories of content (Quran, Aqeedah, etc.)
    - subcategories: For nested categories (e.g., Articles of Iman)
    - series: Collections of lectures
    - lectures: Individual audio lectures
    
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Create scholars table
CREATE TABLE IF NOT EXISTS scholars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scholar_id UUID REFERENCES scholars(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create series table
CREATE TABLE IF NOT EXISTS series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  subcategory_id UUID REFERENCES subcategories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create lectures table
CREATE TABLE IF NOT EXISTS lectures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE scholars ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;
ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on scholars" ON scholars
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on categories" ON categories
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on subcategories" ON subcategories
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on series" ON series
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on lectures" ON lectures
  FOR SELECT TO public USING (true);