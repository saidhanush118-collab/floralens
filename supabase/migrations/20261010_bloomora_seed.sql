-- ============================================================================
-- BLOOMORA MARKETPLACE — SEED DATA SCRIPT
-- Inserts initial categories and catalog listings into Supabase
-- ============================================================================

-- 1. SEED CATEGORIES (Flower & Decoration Categories)
INSERT INTO public.categories (id, name, slug, type, description, image_url, display_order)
VALUES
    ('c1111111-1111-1111-1111-111111111101', 'Roses', 'roses', 'flower', 'Velvety Dutch and local roses in crimson, peach, pink and white', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', 1),
    ('c1111111-1111-1111-1111-111111111102', 'Lilies', 'lilies', 'flower', 'Fragrant Asiatic and Oriental lilies that radiate sophistication', 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80', 2),
    ('c1111111-1111-1111-1111-111111111103', 'Orchids', 'orchids', 'flower', 'Exotic blue, purple and white Mokara and Dendrobium orchids', 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80', 3),
    ('c1111111-1111-1111-1111-111111111104', 'Mixed Bouquets', 'mixed-bouquets', 'flower', 'Artfully curated floral symphonies wrapped in Korean matte paper', 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80', 4),
    ('c1111111-1111-1111-1111-111111111105', 'Flower Baskets', 'flower-baskets', 'flower', 'Rustic handwoven willow baskets overflowing with blooming stems', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', 5),
    ('c1111111-1111-1111-1111-111111111106', 'Floral Gifts', 'floral-gifts', 'flower', 'Luxury pairings with gourmet chocolates, candles and plush gifts', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80', 6),
    ('c1111111-1111-1111-1111-111111111107', 'Birthday Decorations', 'birthday-decorations', 'decoration', 'Enchanting balloon canopies, neon signage, and floral stage setups', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80', 7),
    ('c1111111-1111-1111-1111-111111111108', 'Anniversary Decorations', 'anniversary-decorations', 'decoration', 'Romantic candlelit pathways, cascading rose arches, and cabana dinners', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80', 8),
    ('c1111111-1111-1111-1111-111111111109', 'Wedding Decorations', 'wedding-decorations', 'decoration', 'Regal mandaps, floral aisles, reception backdrops, and fairy-lit lawns', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80', 9),
    ('c1111111-1111-1111-1111-111111111110', 'Engagement Decorations', 'engagement-decorations', 'decoration', 'Modern ring ceremonies with pastel hydrangeas and custom nameplates', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80', 10)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;
