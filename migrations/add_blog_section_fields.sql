-- Blog bölümü için giriş metni ve tüm yazılar alanları
ALTER TABLE homepage_blog_section
    ADD COLUMN IF NOT EXISTS intro_text TEXT AFTER description,
    ADD COLUMN IF NOT EXISTS intro_text_en TEXT AFTER intro_text,
    ADD COLUMN IF NOT EXISTS intro_text_ru TEXT AFTER intro_text_en,
    ADD COLUMN IF NOT EXISTS all_posts_text VARCHAR(255) AFTER intro_text_ru,
    ADD COLUMN IF NOT EXISTS all_posts_text_en VARCHAR(255) AFTER all_posts_text,
    ADD COLUMN IF NOT EXISTS all_posts_text_ru VARCHAR(255) AFTER all_posts_text_en,
    ADD COLUMN IF NOT EXISTS all_posts_button_text VARCHAR(100) AFTER all_posts_text_ru,
    ADD COLUMN IF NOT EXISTS all_posts_button_text_en VARCHAR(100) AFTER all_posts_button_text,
    ADD COLUMN IF NOT EXISTS all_posts_button_text_ru VARCHAR(100) AFTER all_posts_button_text_en,
    ADD COLUMN IF NOT EXISTS all_posts_link VARCHAR(255) DEFAULT '/blog' AFTER all_posts_button_text_ru;

-- Varsayılan değerleri doldur
UPDATE homepage_blog_section SET
    intro_text = 'Her hafta, mücevher dünyasından ilham veren hikâyeler, koleksiyon öyküleri ve özel tasarım serüvenlerimizi sizinle paylaşıyoruz.',
    intro_text_en = 'Every week, we share inspiring stories from the world of jewellery, collection tales, and our bespoke design journeys with you.',
    intro_text_ru = 'Каждую неделю мы делимся с вами вдохновляющими историями из мира ювелирных украшений, рассказами о коллекциях и нашими приключениями в индивидуальном дизайне.',
    all_posts_text = 'Tüm blog yazılarımızı okumak için;',
    all_posts_text_en = 'To read all our blog posts;',
    all_posts_text_ru = 'Чтобы прочитать все наши статьи;',
    all_posts_button_text = 'TÜM PAYLAŞIMLAR',
    all_posts_button_text_en = 'ALL POSTS',
    all_posts_button_text_ru = 'ВСЕ ПУБЛИКАЦИИ',
    all_posts_link = '/blog'
WHERE id = 1;
