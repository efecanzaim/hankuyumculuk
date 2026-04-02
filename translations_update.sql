-- ============================================================
-- Han Kuyumculuk — Eksik Çeviri Güncellemeleri
-- Oluşturulma: 2026-04-01
-- Kapsam: homepage_cards, blog_posts, pages (content_en/ru)
-- ============================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- ============================================================
-- 1. HOMEPAGE_CARDS — EN/RU çevirileri (TR metni kopyalanmıştı)
-- ============================================================

-- Kart: HEDİYE
UPDATE `homepage_cards` SET
  `title_en`       = 'GIFT',
  `title_ru`       = 'ПОДАРОК',
  `button_text_en` = 'DISCOVER',
  `button_text_ru` = 'ОТКРЫТЬ'
WHERE `id` = 2396;

-- Kart: ERKEKLERE ÖZEL
UPDATE `homepage_cards` SET
  `title_en`       = 'FOR MEN',
  `title_ru`       = 'ДЛЯ МУЖЧИН',
  `button_text_en` = 'DISCOVER',
  `button_text_ru` = 'ОТКРЫТЬ'
WHERE `id` = 2397;

-- Kart: ÖZEL TASARIM
UPDATE `homepage_cards` SET
  `title_en`       = 'CUSTOM DESIGN',
  `title_ru`       = 'ИНДИВИДУАЛЬНЫЙ ДИЗАЙН',
  `button_text_en` = 'DISCOVER',
  `button_text_ru` = 'ОТКРЫТЬ'
WHERE `id` = 2398;

-- Kart: PRELOVED
UPDATE `homepage_cards` SET
  `title_en`       = 'PRELOVED',
  `title_ru`       = 'PRELOVED',
  `subtitle_en`    = 'Special selections from original collections of international jewelry brands, waiting for you.',
  `subtitle_ru`    = 'Специальные подборки из оригинальных коллекций международных ювелирных брендов ждут вас.',
  `button_text_en` = 'VIEW PRODUCTS',
  `button_text_ru` = 'СМОТРЕТЬ ТОВАРЫ'
WHERE `id` = 2399;

-- Kart: RANDEVU OLUŞTURUN
UPDATE `homepage_cards` SET
  `title_en`       = 'BOOK AN APPOINTMENT',
  `title_ru`       = 'ЗАПИСАТЬСЯ НА ПРИЁМ',
  `subtitle_en`    = 'For a personalized experience,\nbook an appointment and we will be waiting for you.',
  `subtitle_ru`    = 'Для индивидуального опыта\nзапишитесь на приём — мы будем вас ждать.',
  `button_text_en` = 'BOOK NOW',
  `button_text_ru` = 'ЗАПИСАТЬСЯ'
WHERE `id` = 2400;

-- ============================================================
-- 2. BLOG_POSTS — title_en/ru ve excerpt_en/ru
--    (İçerik çok uzun olduğu için admin panelinden girilmeli)
-- ============================================================

-- Blog: Pırlanta Nedir? (ID: 1)
UPDATE `blog_posts` SET
  `title_en`   = 'What is a Diamond? The Story of 3 Billion Years of Brilliance and Perfection',
  `title_ru`   = 'Что такое бриллиант? История 3 миллиардов лет блеска и совершенства',
  `excerpt_en` = 'When you look at the ring on your finger or the necklace in the display window, you are not just looking at a stylish accessory. That small sparkling stone is older than human history, older than dinosaurs, and even older than many forms of life on Earth. Scientific data tells us that diamonds are between 1 and 3 billion years old. For centuries symbolizing the power of kings and the devotion of lovers, this stone is the rarest meeting point of nature\'s patience and human mastery.',
  `excerpt_ru` = 'Когда вы смотрите на кольцо на пальце или на колье в витрине, вы смотрите не просто на стильный аксессуар. Этот маленький сверкающий камень старше истории человечества, старше динозавров и даже многих форм жизни на Земле. Научные данные говорят нам, что бриллиантам от 1 до 3 миллиардов лет. Веками символизировавший силу королей и преданность влюблённых, этот камень — редчайшая точка встречи терпения природы и мастерства человека.'
WHERE `id` = 1;

-- Blog: Elmas ile Pırlanta (ID: 2)
UPDATE `blog_posts` SET
  `title_en`   = 'What is the Difference Between Diamond and Brilliant? Same Stone, Different Sparkle',
  `title_ru`   = 'В чём разница между алмазом и бриллиантом? Один камень, разный блеск',
  `excerpt_en` = 'When you step into the world of jewelry, there are two terms you hear most often: Diamond and Brilliant. Although these two words are generally used interchangeably, there are in fact very important technical and visual differences between them. To help you make the right decision when choosing a ring or necklace, we have clarified the fine line between these two concepts. Here are the differences between diamond and brilliant, and what you need to know.',
  `excerpt_ru` = 'Когда вы входите в мир ювелирных украшений, есть два термина, которые вы слышите чаще всего: алмаз и бриллиант. Хотя эти два слова обычно используются как взаимозаменяемые, на самом деле между ними есть очень важные технические и визуальные различия. Чтобы помочь вам принять правильное решение при выборе кольца или колье, мы прояснили тонкую грань между этими двумя понятиями. Вот различия между алмазом и бриллиантом, и что вам нужно знать.'
WHERE `id` = 2;

-- Blog: Pırlanta Yüzük Alırken (ID: 3)
UPDATE `blog_posts` SET
  `title_en`   = 'What to Look for When Buying a Diamond Ring? A 5-Step Guide for a Perfect Choice',
  `title_ru`   = 'На что обратить внимание при покупке бриллиантового кольца? 5-шаговое руководство для безупречного выбора',
  `excerpt_en` = 'The Art of Finding the Right Sparkle. Choosing a diamond ring is a process that goes far beyond ordinary shopping — it is emotionally significant and requires careful attention. This is not just a piece of jewelry; it is a gesture, a promise, and usually the symbol of the most special moment that will be cherished for a lifetime. It is quite natural to feel lost among the dazzle of display cases and uncertain amid technical terms like carat, facet, and mounting. Many people make the mistake of focusing only on a stone that looks "big." But the true beauty of a diamond is measured not just by its size, but by its quality and how it suits the hand.',
  `excerpt_ru` = 'Искусство поиска правильного блеска. Выбор бриллиантового кольца — это процесс, выходящий далеко за рамки обычного шопинга: он требует эмоциональной вовлечённости и внимательного подхода. Это не просто украшение; это жест, обещание и, как правило, символ самого особого момента, который будет храниться всю жизнь. Потеряться среди блеска витрин и растеряться среди технических терминов — карат, огранка, оправа — вполне естественно. Многие совершают ошибку, фокусируясь только на «большом» камне. Однако истинная красота бриллианта измеряется не только размером, но и его качеством и тем, насколько он подходит руке.'
WHERE `id` = 3;

-- ============================================================
-- 3. PAGES — content_en ve content_ru (basit HTML sayfaları)
--    NOT: ozel-tasarim (id=1) ve hediye (id=10) JSON içerik
--    taşıdığından admin panelinden girilmesi önerilir.
-- ============================================================

-- Sayfa: preloved (id=2)
UPDATE `pages` SET
  `content_en` = '<p>Carefully selected jewels with preserved authenticity, waiting to be rediscovered.</p>',
  `content_ru` = '<p>Тщательно отобранные украшения с сохранённой подлинностью, ждущие нового открытия.</p>'
WHERE `id` = 2;

-- Sayfa: yatirim (id=3)
UPDATE `pages` SET
  `content_en` = '<p>Look to the future with confidence. Convert your savings into precious metals with our investment gold products. Reliable and certified products.</p><p>Protect your savings with our wide range of products — from gram gold to full gold, from quarter to half gold. Every product is certified to international standards.</p><p>Gold has been the most reliable investment vehicle for centuries, maintaining its value. Shape your investments with the assurance of Han Jewelry.</p><p>Our expert consultants will guide you in selecting products suited to your investment goals. Enjoy a peaceful investment experience with safe storage and insurance options.</p>',
  `content_ru` = '<p>Смотрите в будущее с уверенностью. Конвертируйте свои сбережения в драгоценные металлы с нашими инвестиционными золотыми изделиями. Надёжные и сертифицированные продукты.</p><p>Защитите свои сбережения с нашим широким ассортиментом: от граммового золота до целого, от четверти до половины. Каждый продукт сертифицирован по международным стандартам.</p><p>На протяжении веков золото остаётся самым надёжным инвестиционным инструментом, сохраняя свою ценность. Формируйте инвестиции с гарантией Han Kuyumculuk.</p><p>Наши эксперты-консультанты помогут вам выбрать продукты, соответствующие вашим инвестиционным целям. Наслаждайтесь спокойным инвестиционным опытом с вариантами безопасного хранения и страхования.</p>'
WHERE `id` = 3;

-- Sayfa: iletisim (id=4)
UPDATE `pages` SET
  `content_en` = '<p>At Han Jewelry, we are here to provide you with the best service. You can contact us for your questions, suggestions or custom design requests.</p>',
  `content_ru` = '<p>В Han Kuyumculuk мы здесь, чтобы предоставить вам лучший сервис. Свяжитесь с нами по вопросам, предложениям или запросам на индивидуальный дизайн.</p>'
WHERE `id` = 4;

-- Sayfa: randevu (id=5)
UPDATE `pages` SET
  `content_en` = '<p>You can make an appointment for custom design consultations and a personalized shopping experience. We look forward to offering you a truly special experience.</p>',
  `content_ru` = '<p>Вы можете записаться на консультацию по индивидуальному дизайну и персонализированному шопинг-опыту. Мы с нетерпением ждём возможности подарить вам по-настоящему особый опыт.</p>'
WHERE `id` = 5;

-- Sayfa: blog (id=6)
UPDATE `pages` SET
  `content_en` = '<p>Han Jewelry Blog was created for those who believe that diamonds are not just jewelry, but a value that carries meaning, emotion and story.</p><p>Here you will find all the details you are curious about — from rings to necklaces, from special day gift guides to diamond selection guides — with inspiring content and expert perspectives.</p>',
  `content_ru` = '<p>Блог Han Kuyumculuk создан для тех, кто верит, что бриллиант — это не просто украшение, а ценность, несущая смысл, эмоцию и историю.</p><p>Здесь вы найдёте все интересующие вас детали — от колец до колье, от руководств по подаркам до советов по выбору бриллиантов — с вдохновляющим контентом и экспертными взглядами.</p>'
WHERE `id` = 6;

-- ============================================================
-- Notlar:
-- • ozel-tasarim (id=1): İçerik karmaşık JSON yapısında. Admin
--   paneli → Özel Tasarım → EN/RU sekmelerinden girilmeli.
-- • hediye (id=10): Aynı şekilde JSON içerik, admin panelinden.
-- • blog_posts content_en/ru: Makaleler çok uzun. Admin paneli
--   Blog bölümünden EN/RU içerikler eklenmeli.
-- • bakim-garanti (id=8) ve cerez-politikasi (id=9): Uzun yasal
--   metinler — admin panelinden girilmesi önerilir.
-- ============================================================

-- ============================================================
-- 4. FOOTER_SETTINGS — slogan_svg sütunu ekle
--    (Admin paneli → Footer → Slogan SVG Görseli alanından yönetilir)
-- ============================================================

ALTER TABLE `footer_settings`
  ADD COLUMN IF NOT EXISTS `slogan_svg`    varchar(255) DEFAULT NULL AFTER `logo_image`,
  ADD COLUMN IF NOT EXISTS `slogan_svg_en` varchar(255) DEFAULT NULL AFTER `slogan_svg`,
  ADD COLUMN IF NOT EXISTS `slogan_svg_ru` varchar(255) DEFAULT NULL AFTER `slogan_svg_en`;
