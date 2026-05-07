-- ============================================================
-- Han Kuyumculuk - EN/RU Metin Düzeltmeleri
-- Türkçe metinler baz alınarak hazırlanmıştır.
-- ============================================================

-- ============================================================
-- 1. HOMEPAGE_CARDS - Çevrilmemiş EN/RU metinler
-- ============================================================

-- HEDİYE kartı
UPDATE `homepage_cards` SET
  `title_en`       = 'GIFTS',
  `title_ru`       = 'ПОДАРКИ',
  `button_text_en` = 'EXPLORE',
  `button_text_ru` = 'ОТКРЫТЬ'
WHERE `id` = 3091;

-- ERKEKLERE ÖZEL kartı
UPDATE `homepage_cards` SET
  `title_en`       = 'FOR MEN',
  `title_ru`       = 'ДЛЯ МУЖЧИН',
  `button_text_en` = 'EXPLORE',
  `button_text_ru` = 'ОТКРЫТЬ'
WHERE `id` = 3092;

-- ÖZEL TASARIM kartı
UPDATE `homepage_cards` SET
  `title_en`       = 'CUSTOM DESIGN',
  `title_ru`       = 'ИНДИВИДУАЛЬНЫЙ ДИЗАЙН',
  `button_text_en` = 'EXPLORE',
  `button_text_ru` = 'ОТКРЫТЬ'
WHERE `id` = 3093;

-- PRELOVED kartı (subtitle ve buton çevrilmemiş)
UPDATE `homepage_cards` SET
  `subtitle_en`    = 'Special selections from original collections\nof international jewelry brands await you.',
  `subtitle_ru`    = 'Особые подборки из оригинальных коллекций\nмеждународных ювелирных брендов ждут вас.',
  `button_text_en` = 'VIEW PRODUCTS',
  `button_text_ru` = 'СМОТРЕТЬ ТОВАРЫ'
WHERE `id` = 3094;

-- RANDEVU OLUŞTURUN kartı
UPDATE `homepage_cards` SET
  `title_en`       = 'BOOK AN APPOINTMENT',
  `title_ru`       = 'ЗАПИСАТЬСЯ НА ПРИЁМ',
  `subtitle_en`    = 'Book an appointment for\na personalized experience tailored to you.',
  `subtitle_ru`    = 'Запишитесь на приём для\nперсонального опыта, созданного специально для вас.',
  `button_text_en` = 'BOOK NOW',
  `button_text_ru` = 'ЗАПИСАТЬСЯ'
WHERE `id` = 3095;

-- ============================================================
-- 2. CATEGORIES - Gülendam (id=19) eksik EN/RU alanları
-- ============================================================

UPDATE `categories` SET
  `name_en`              = 'Gülendam',
  `name_ru`              = 'Gülendam',
  `hero_title_en`        = 'Gülendam',
  `hero_title_ru`        = 'Gülendam',
  `hero_subtitle_en`     = 'A collection born from natural harmony.',
  `hero_subtitle_ru`     = 'Коллекция, рождённая из естественной гармонии.',
  `hero_description_en`  = 'Gülendam was born\namong those who choose\nwhat truly suits them.',
  `hero_description_ru`  = 'Gülendam родилась\nсреди тех, кто выбирает\nто, что им действительно подходит.',
  `list_title_en`        = 'GÜLENDAM',
  `list_title_ru`        = 'GÜLENDAM'
WHERE `id` = 19;

-- ============================================================
-- 3. PAGES - Bakım ve Garanti (id=8) eksik content_en / content_ru
-- ============================================================

UPDATE `pages` SET
  `content_en` = '<h2>Precious Stone and Pearl Jewelry</h2><h3>1. Daily Use and Care Warnings</h3><p>Jewelry containing diamonds, precious stones and pearls requires careful handling due to their natural properties and mounting sensitivity.</p><h3>2. Cleaning Instructions</h3><p>Cleaning should only be performed using care kits appropriate for the product and soft-bristle brushes.</p><h3>3. Warranty Coverage</h3><p>Jewelry is covered under warranty from the date of delivery.</p><h2>Gold and Platinum Jewelry</h2><h3>1. Product Care Information</h3><p>Gold and platinum jewelry are delicate products due to their natural characteristics, handcraftsmanship and precious stone content.</p>',
  `content_ru` = '<h2>Украшения с драгоценными камнями и жемчугом</h2><h3>1. Предупреждения по ежедневному использованию и уходу</h3><p>Украшения, содержащие бриллианты, драгоценные камни и жемчуг, требуют бережного обращения из-за их природных свойств и чувствительности оправы.</p><h3>2. Инструкции по очистке</h3><p>Очистка должна производиться только с использованием наборов по уходу, подходящих для изделия, и мягких щёток.</p><h3>3. Гарантийное покрытие</h3><p>Украшения находятся на гарантии с даты доставки.</p><h2>Золотые и платиновые украшения</h2><h3>1. Информация по уходу за изделием</h3><p>Золотые и платиновые украшения являются деликатными изделиями из-за их природных характеристик, ручной работы и содержания драгоценных камней.</p>'
WHERE `id` = 8;

-- ============================================================
-- 4. PAGES - Çerez Politikası (id=9) eksik content_en / content_ru
-- ============================================================

UPDATE `pages` SET
  `content_en` = '<h2>Han Kuyumculuk Cookie Policy</h2><p>At Han Kuyumculuk, we use cookies. Cookies are automated tools through which we collect information on our website and, in some cases, track information about how you use our website.</p><h2>For what purposes are cookies used?</h2><h3>1. Cookies Support the Core Functions of the Website</h3><p>Some cookies are necessary and functional cookies required for the core functions of our website to operate.</p><h3>2. Cookies Help Improve the Quality of Our Website and Services</h3><p>Cookies collect information about how you use our website.</p>',
  `content_ru` = '<h2>Политика cookies Han Kuyumculuk</h2><p>В Han Kuyumculuk мы используем файлы cookie. Файлы cookie — это автоматические инструменты, с помощью которых мы собираем информацию на нашем сайте и в некоторых случаях отслеживаем сведения о том, как вы им пользуетесь.</p><h2>В каких целях используются файлы cookie?</h2><h3>1. Файлы cookie поддерживают основные функции сайта</h3><p>Некоторые файлы cookie являются обязательными и функциональными — они необходимы для работы основных функций нашего сайта.</p><h3>2. Файлы cookie помогают улучшить качество сайта и услуг</h3><p>Файлы cookie собирают информацию о том, как вы используете наш сайт.</p>'
WHERE `id` = 9;

-- ============================================================
-- 5. HOMEPAGE_STORY_SECTION - Yanlış çeviriler
-- TR: "derin bir anlama dönüştüren simge" → EN/RU yanlış "ışık/light" demişti
-- TR: "duygularla şekillenen bu anlamı" → EN/RU yanlış "born from light" demişti
-- TR: "her detayın ardında" → EN/RU yanlış "every sparkle" demişti
-- ============================================================

UPDATE `homepage_story_section` SET
  `main_text_en` = 'Han Kuyumculuk represents much more than a diamond; it is a symbol that transforms the person you value, the special moments shared, and the feelings from the heart into a profound meaning.',
  `main_text_ru` = 'Han Kuyumculuk представляет собой гораздо больше, чем бриллиант; это символ, превращающий дорогого вам человека, разделённые особые моменты и чувства от сердца в глубокий смысл.',
  `sub_text_en`  = 'Han Kuyumculuk, carrying this meaning shaped by emotion, leaves a special place in every woman\'s heart; because behind every detail lies an unforgettable story.',
  `sub_text_ru`  = 'Han Kuyumculuk, неся этот смысл, сформированный чувствами, оставляет особое место в сердце каждой женщины; ведь за каждой деталью скрывается незабываемая история.'
WHERE `id` = 1;

-- ============================================================
-- 6. "jewelry" → "jewellery" - Tüm EN alanlarında toplu değiştirme
-- ============================================================

-- hero_slides
UPDATE `hero_slides` SET
  `title_en`       = REPLACE(`title_en`,       'jewelry', 'jewellery'),
  `subtitle_en`    = REPLACE(`subtitle_en`,    'jewelry', 'jewellery'),
  `button_text_en` = REPLACE(`button_text_en`, 'jewelry', 'jewellery');
UPDATE `hero_slides` SET
  `title_en`       = REPLACE(`title_en`,       'Jewelry', 'Jewellery'),
  `subtitle_en`    = REPLACE(`subtitle_en`,    'Jewelry', 'Jewellery'),
  `button_text_en` = REPLACE(`button_text_en`, 'Jewelry', 'Jewellery');
UPDATE `hero_slides` SET
  `title_en`       = REPLACE(`title_en`,       'JEWELRY', 'JEWELLERY'),
  `subtitle_en`    = REPLACE(`subtitle_en`,    'JEWELRY', 'JEWELLERY'),
  `button_text_en` = REPLACE(`button_text_en`, 'JEWELRY', 'JEWELLERY');

-- footer_columns
UPDATE `footer_columns` SET
  `title_en` = REPLACE(`title_en`, 'JEWELRY', 'JEWELLERY');
UPDATE `footer_columns` SET
  `title_en` = REPLACE(`title_en`, 'Jewelry', 'Jewellery');

-- footer_links
UPDATE `footer_links` SET
  `text_en` = REPLACE(`text_en`, 'jewelry', 'jewellery'),
  `text_en` = REPLACE(`text_en`, 'Jewelry', 'Jewellery'),
  `text_en` = REPLACE(`text_en`, 'JEWELRY', 'JEWELLERY');

-- categories (EN metin alanları)
UPDATE `categories` SET
  `name_en`             = REPLACE(`name_en`,             'jewelry', 'jewellery'),
  `hero_title_en`       = REPLACE(`hero_title_en`,       'jewelry', 'jewellery'),
  `hero_subtitle_en`    = REPLACE(`hero_subtitle_en`,    'jewelry', 'jewellery'),
  `hero_description_en` = REPLACE(`hero_description_en`, 'jewelry', 'jewellery'),
  `list_title_en`       = REPLACE(`list_title_en`,       'jewelry', 'jewellery');
UPDATE `categories` SET
  `name_en`             = REPLACE(`name_en`,             'Jewelry', 'Jewellery'),
  `hero_title_en`       = REPLACE(`hero_title_en`,       'Jewelry', 'Jewellery'),
  `hero_subtitle_en`    = REPLACE(`hero_subtitle_en`,    'Jewelry', 'Jewellery'),
  `hero_description_en` = REPLACE(`hero_description_en`, 'Jewelry', 'Jewellery'),
  `list_title_en`       = REPLACE(`list_title_en`,       'Jewelry', 'Jewellery');
UPDATE `categories` SET
  `name_en`             = REPLACE(`name_en`,             'JEWELRY', 'JEWELLERY'),
  `hero_title_en`       = REPLACE(`hero_title_en`,       'JEWELRY', 'JEWELLERY'),
  `hero_subtitle_en`    = REPLACE(`hero_subtitle_en`,    'JEWELRY', 'JEWELLERY'),
  `hero_description_en` = REPLACE(`hero_description_en`, 'JEWELRY', 'JEWELLERY'),
  `list_title_en`       = REPLACE(`list_title_en`,       'JEWELRY', 'JEWELLERY');

-- homepage_cards
UPDATE `homepage_cards` SET
  `title_en`       = REPLACE(`title_en`,       'jewelry', 'jewellery'),
  `subtitle_en`    = REPLACE(`subtitle_en`,    'jewelry', 'jewellery'),
  `button_text_en` = REPLACE(`button_text_en`, 'jewelry', 'jewellery');
UPDATE `homepage_cards` SET
  `title_en`       = REPLACE(`title_en`,       'Jewelry', 'Jewellery'),
  `subtitle_en`    = REPLACE(`subtitle_en`,    'Jewelry', 'Jewellery'),
  `button_text_en` = REPLACE(`button_text_en`, 'Jewelry', 'Jewellery');
UPDATE `homepage_cards` SET
  `title_en`       = REPLACE(`title_en`,       'JEWELRY', 'JEWELLERY'),
  `subtitle_en`    = REPLACE(`subtitle_en`,    'JEWELRY', 'JEWELLERY'),
  `button_text_en` = REPLACE(`button_text_en`, 'JEWELRY', 'JEWELLERY');

-- homepage_story_section
UPDATE `homepage_story_section` SET
  `title_en`    = REPLACE(`title_en`,    'jewelry', 'jewellery'),
  `main_text_en`= REPLACE(`main_text_en`,'jewelry', 'jewellery'),
  `sub_text_en` = REPLACE(`sub_text_en`, 'jewelry', 'jewellery'),
  `link_text_en`= REPLACE(`link_text_en`,'jewelry', 'jewellery');
UPDATE `homepage_story_section` SET
  `title_en`    = REPLACE(`title_en`,    'Jewelry', 'Jewellery'),
  `main_text_en`= REPLACE(`main_text_en`,'Jewelry', 'Jewellery'),
  `sub_text_en` = REPLACE(`sub_text_en`, 'Jewelry', 'Jewellery'),
  `link_text_en`= REPLACE(`link_text_en`,'Jewelry', 'Jewellery');

-- homepage_trend_section
UPDATE `homepage_trend_section` SET
  `left_title_en`  = REPLACE(`left_title_en`,  'jewelry', 'jewellery'),
  `right_title_en` = REPLACE(`right_title_en`, 'jewelry', 'jewellery');
UPDATE `homepage_trend_section` SET
  `left_title_en`  = REPLACE(`left_title_en`,  'Jewelry', 'Jewellery'),
  `right_title_en` = REPLACE(`right_title_en`, 'Jewelry', 'Jewellery');

-- homepage_blog_section
UPDATE `homepage_blog_section` SET
  `title_en`          = REPLACE(`title_en`,          'jewelry', 'jewellery'),
  `subtitle_en`       = REPLACE(`subtitle_en`,       'jewelry', 'jewellery'),
  `description_en`    = REPLACE(`description_en`,    'jewelry', 'jewellery'),
  `additional_text_en`= REPLACE(`additional_text_en`,'jewelry', 'jewellery'),
  `link_text_en`      = REPLACE(`link_text_en`,      'jewelry', 'jewellery');
UPDATE `homepage_blog_section` SET
  `title_en`          = REPLACE(`title_en`,          'Jewelry', 'Jewellery'),
  `subtitle_en`       = REPLACE(`subtitle_en`,       'Jewelry', 'Jewellery'),
  `description_en`    = REPLACE(`description_en`,    'Jewelry', 'Jewellery'),
  `additional_text_en`= REPLACE(`additional_text_en`,'Jewelry', 'Jewellery'),
  `link_text_en`      = REPLACE(`link_text_en`,      'Jewelry', 'Jewellery');

-- top_banner
UPDATE `top_banner` SET
  `text_en` = REPLACE(`text_en`, 'jewelry', 'jewellery'),
  `text_en` = REPLACE(`text_en`, 'Jewelry', 'Jewellery');

-- footer_settings
UPDATE `footer_settings` SET
  `slogan_en`        = REPLACE(`slogan_en`,        'jewelry', 'jewellery'),
  `copyright_text_en`= REPLACE(`copyright_text_en`,'jewelry', 'jewellery');
UPDATE `footer_settings` SET
  `slogan_en`        = REPLACE(`slogan_en`,        'Jewelry', 'Jewellery'),
  `copyright_text_en`= REPLACE(`copyright_text_en`,'Jewelry', 'Jewellery');

-- pages (tüm EN alanları)
UPDATE `pages` SET
  `hero_title_en`       = REPLACE(`hero_title_en`,       'jewelry', 'jewellery'),
  `hero_subtitle_en`    = REPLACE(`hero_subtitle_en`,    'jewelry', 'jewellery'),
  `content_en`          = REPLACE(`content_en`,          'jewelry', 'jewellery'),
  `meta_title_en`       = REPLACE(`meta_title_en`,       'jewelry', 'jewellery'),
  `meta_description_en` = REPLACE(`meta_description_en`, 'jewelry', 'jewellery');
UPDATE `pages` SET
  `hero_title_en`       = REPLACE(`hero_title_en`,       'Jewelry', 'Jewellery'),
  `hero_subtitle_en`    = REPLACE(`hero_subtitle_en`,    'Jewelry', 'Jewellery'),
  `content_en`          = REPLACE(`content_en`,          'Jewelry', 'Jewellery'),
  `meta_title_en`       = REPLACE(`meta_title_en`,       'Jewelry', 'Jewellery'),
  `meta_description_en` = REPLACE(`meta_description_en`, 'Jewelry', 'Jewellery');
UPDATE `pages` SET
  `hero_title_en`       = REPLACE(`hero_title_en`,       'JEWELRY', 'JEWELLERY'),
  `hero_subtitle_en`    = REPLACE(`hero_subtitle_en`,    'JEWELRY', 'JEWELLERY'),
  `content_en`          = REPLACE(`content_en`,          'JEWELRY', 'JEWELLERY'),
  `meta_title_en`       = REPLACE(`meta_title_en`,       'JEWELRY', 'JEWELLERY'),
  `meta_description_en` = REPLACE(`meta_description_en`, 'JEWELRY', 'JEWELLERY');
