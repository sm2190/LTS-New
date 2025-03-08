/*
  # Add Tafsir Al-Fatiha lecture

  1. New Data
    - Add lecture for Tafsir series
      - Title: Tafsir Surah Al-Fatiha - Part 2
      - Duration: 01:33:08
      - URL: Archive.org MP3 link
*/

DO $$
DECLARE
  series_id UUID;
BEGIN
  -- Get the Tafsir series ID
  SELECT id INTO series_id
  FROM series
  WHERE title = 'Tafsir'
  LIMIT 1;

  -- Insert the lecture
  INSERT INTO lectures (
    series_id,
    title,
    duration,
    audio_url,
    description,
    order_index
  ) VALUES (
    series_id,
    'Tafsir Surah Al-Fatiha - Part 2',
    '01:33:08',
    'https://archive.org/download/1-1_20250224/تفسير القرآن الكريم {سورة الفاتحة} {2} {{2}} سماحة الشيخ ال.mp3',
    'Detailed explanation of Surah Al-Fatiha by Sheikh Ibn Uthaymeen',
    2
  );
END $$;