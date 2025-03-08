/*
  # Insert Sheikh Ibn Uthaymeen's Content

  1. Content Structure
    - Insert scholar data
    - Insert main categories (Quran, Aqeedah, Hadith, Seerah)
    - Insert subcategories for Aqeedah
    - Insert series and lectures
*/

-- Insert Ibn Uthaymeen with a specific UUID
DO $$
DECLARE
  scholar_id UUID;
  quran_category_id UUID;
  aqeedah_category_id UUID;
  hadith_category_id UUID;
  seerah_category_id UUID;
  articles_of_iman_id UUID;
  fundamentals_id UUID;
BEGIN
  -- Insert Ibn Uthaymeen
  scholar_id := gen_random_uuid();
  INSERT INTO scholars (id, name, image_url)
  VALUES (
    scholar_id,
    'Sheikh Ibn Uthaymeen',
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80'
  );

  -- Insert Categories
  quran_category_id := gen_random_uuid();
  aqeedah_category_id := gen_random_uuid();
  hadith_category_id := gen_random_uuid();
  seerah_category_id := gen_random_uuid();

  INSERT INTO categories (id, scholar_id, title, icon, order_index) VALUES
    (quran_category_id, scholar_id, 'The Quran', 'book', 1),
    (aqeedah_category_id, scholar_id, 'Aqeedah', 'heart', 2),
    (hadith_category_id, scholar_id, 'Hadith', 'document-text', 3),
    (seerah_category_id, scholar_id, 'Seerah and History', 'time', 4);

  -- Insert Subcategories for Aqeedah
  articles_of_iman_id := gen_random_uuid();
  fundamentals_id := gen_random_uuid();
  
  INSERT INTO subcategories (id, category_id, title, order_index) VALUES
    (articles_of_iman_id, aqeedah_category_id, 'The 6 Articles of Iman', 1),
    (fundamentals_id, aqeedah_category_id, 'Fundamentals of Aqeedah', 2);

  -- Insert Series for The Quran
  INSERT INTO series (category_id, title, order_index) VALUES
    (quran_category_id, 'Tafsir', 1),
    (quran_category_id, 'Quranic Sciences', 2),
    (quran_category_id, 'Virtues and Etiquette of the Quran', 3);

  -- Insert Series for Articles of Iman
  INSERT INTO series (subcategory_id, title, order_index) VALUES
    (articles_of_iman_id, 'Iman in Allah', 1),
    (articles_of_iman_id, 'Iman in the Angels', 2),
    (articles_of_iman_id, 'Iman in the Books', 3),
    (articles_of_iman_id, 'Iman in the Qadr', 4),
    (articles_of_iman_id, 'Iman in the Last Day and Signs of the Hour', 5);

  -- Insert Series for Fundamentals of Aqeedah
  INSERT INTO series (subcategory_id, title, order_index) VALUES
    (fundamentals_id, 'Nullifiers of Islam', 1),
    (fundamentals_id, 'Shirk and its Types', 2),
    (fundamentals_id, 'Magic and Sorcery', 3),
    (fundamentals_id, 'Innovations and Novelties', 4),
    (fundamentals_id, 'Difference between the Madhabs', 5),
    (fundamentals_id, 'Al Wala''a wa Al Bara''a', 6),
    (fundamentals_id, 'The Names and Attributes of Allah', 7),
    (fundamentals_id, 'Miscellaneous Issues in Faith', 8),
    (fundamentals_id, 'Images and their Rules', 9);

  -- Insert Series for Hadith
  INSERT INTO series (category_id, title, order_index) VALUES
    (hadith_category_id, 'The Terminology of the Hadith', 1),
    (hadith_category_id, 'The Grades of the Hadith', 2),
    (hadith_category_id, 'Explanations of the Hadith', 3);

  -- Insert Series for Seerah
  INSERT INTO series (category_id, title, order_index) VALUES
    (seerah_category_id, 'Events of the Seerah', 1),
    (seerah_category_id, 'The Characteristics of the Prophet ﷺ and His Rights', 2),
    (seerah_category_id, 'Historical Events and Issues', 3);
END $$;