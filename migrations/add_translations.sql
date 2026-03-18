-- =====================================================
-- Han Kuyumculuk - EN/RU Çeviri Migrasyonu
-- Tüm mevcut içeriklere İngilizce ve Rusça çeviriler ekler
-- Tarih: 2026-03-18
-- =====================================================

SET NAMES utf8mb4;

-- =====================================================
-- 1. TOP BANNER
-- =====================================================
UPDATE top_banner SET
  text_en = 'We will be with you very soon... Follow us for our new collections!',
  text_ru = 'Совсем скоро мы будем с вами... Следите за нашими новыми коллекциями!'
WHERE id = 1;

-- =====================================================
-- 2. HERO SLIDES
-- =====================================================
UPDATE hero_slides SET
  title_en = 'the art  of elegance',
  title_ru = 'искусство  изящества',
  subtitle_en = 'UNIQUE DESIGNS, TIMELESS VALUES',
  subtitle_ru = 'УНИКАЛЬНЫЕ ДИЗАЙНЫ, ВЕЧНЫЕ ЦЕННОСТИ',
  button_text_en = 'DISCOVER JEWELRY',
  button_text_ru = 'ОТКРОЙТЕ ЮВЕЛИРНЫЕ ИЗДЕЛИЯ'
WHERE id = 5;

UPDATE hero_slides SET
  title_en = 'an eternal  tale',
  title_ru = 'бесконечная  сказка',
  subtitle_en = 'EVERY PIECE HOLDS A STORY',
  subtitle_ru = 'В КАЖДОМ ИЗДЕЛИИ СКРЫТА СВОЯ ИСТОРИЯ',
  button_text_en = 'DISCOVER COLLECTIONS',
  button_text_ru = 'ОТКРОЙТЕ КОЛЛЕКЦИИ'
WHERE id = 6;

UPDATE hero_slides SET
  title_en = 'private  appointment',
  title_ru = 'персональная  встреча',
  subtitle_en = 'FOR AN EXPERIENCE TAILORED TO YOU',
  subtitle_ru = 'ДЛЯ ЭКСКЛЮЗИВНОГО ВПЕЧАТЛЕНИЯ',
  button_text_en = 'BOOK AN APPOINTMENT',
  button_text_ru = 'ЗАПИШИТЕСЬ НА ПРИЁМ'
WHERE id = 7;

UPDATE hero_slides SET
  title_en = 'exquisite  artistry',
  title_ru = 'редкое  искусство',
  subtitle_en = 'DESIGNS EXCLUSIVELY FOR YOU',
  subtitle_ru = 'ДИЗАЙНЫ, СОЗДАННЫЕ ТОЛЬКО ДЛЯ ВАС',
  button_text_en = 'EXCLUSIVELY YOURS',
  button_text_ru = 'ТОЛЬКО ДЛЯ ВАС'
WHERE id = 8;

-- =====================================================
-- 3. HOMEPAGE TREND SECTION
-- =====================================================
UPDATE homepage_trend_section SET
  left_title_en = 'Our Designs',
  left_title_ru = 'Наши дизайны',
  right_title_en = 'Our Collection',
  right_title_ru = 'Наша коллекция'
WHERE id = 1;

-- =====================================================
-- 4. HOMEPAGE STORY SECTION
-- =====================================================
UPDATE homepage_story_section SET
  title_en = 'A Story of Elegance',
  title_ru = 'История Элегантности',
  main_text_en = 'Han Kuyumculuk represents much more than a diamond; it is a symbol that transforms the person you value, the special moments shared, and the feelings from the heart into light.',
  main_text_ru = 'Han Kuyumculuk представляет собой гораздо больше, чем бриллиант; это символ, превращающий дорогого вам человека, разделённые особые моменты и чувства от сердца в свет.',
  sub_text_en = 'Han Kuyumculuk, carrying this meaning born from light, leaves a special place in every woman''s heart; because behind every sparkle lies an unforgettable story.',
  sub_text_ru = 'Han Kuyumculuk, неся этот смысл, рождённый из света, оставляет особое место в сердце каждой женщины; ведь за каждым сиянием скрывается незабываемая история.',
  link_text_en = 'The Story Where Light Becomes Love',
  link_text_ru = 'История, где свет становится любовью'
WHERE id = 1;

-- =====================================================
-- 5. HOMEPAGE FEATURED SECTION
-- =====================================================
UPDATE homepage_featured_section SET
  title_part1_en = 'EXCLUSIVELY',
  title_part1_ru = 'СПЕЦИАЛЬНО',
  title_part2_en = 'FOR YOU',
  title_part2_ru = 'ДЛЯ ВАС'
WHERE id = 1;

-- =====================================================
-- 6. HOMEPAGE SPECIAL SECTION
-- =====================================================
UPDATE homepage_special_section SET
  title_part1_en = 'FEEL',
  title_part1_ru = 'ПОЧУВСТВУЙТЕ',
  title_part2_en = 'EXTRAORDINARY',
  title_part2_ru = 'СЕБЯ ОСОБЕННОЙ'
WHERE id = 1;

-- =====================================================
-- 7. HOMEPAGE CARDS
-- =====================================================
-- Top kartlar
UPDATE homepage_cards SET
  title_en = 'GIFTS',
  title_ru = 'ПОДАРКИ',
  button_text_en = 'DISCOVER',
  button_text_ru = 'ОТКРОЙТЕ'
WHERE section_type = 'top' AND sort_order = 1;

UPDATE homepage_cards SET
  title_en = 'FOR MEN',
  title_ru = 'ДЛЯ МУЖЧИН',
  button_text_en = 'DISCOVER',
  button_text_ru = 'ОТКРОЙТЕ'
WHERE section_type = 'top' AND sort_order = 2;

UPDATE homepage_cards SET
  title_en = 'CUSTOM DESIGN',
  title_ru = 'ИНДИВИДУАЛЬНЫЙ ДИЗАЙН',
  button_text_en = 'DISCOVER',
  button_text_ru = 'ОТКРОЙТЕ'
WHERE section_type = 'top' AND sort_order = 3;

-- Bottom kartlar
UPDATE homepage_cards SET
  title_en = 'PRELOVED',
  title_ru = 'PRELOVED',
  subtitle_en = 'Special selections from original collections\nof international jewelry brands await you.',
  subtitle_ru = 'Специальные подборки из оригинальных коллекций\nмеждународных ювелирных брендов ждут вас.',
  button_text_en = 'EXPLORE PRODUCTS',
  button_text_ru = 'СМОТРЕТЬ ИЗДЕЛИЯ'
WHERE section_type = 'bottom' AND sort_order = 1;

UPDATE homepage_cards SET
  title_en = 'BOOK AN APPOINTMENT',
  title_ru = 'ЗАПИШИТЕСЬ НА ПРИЁМ',
  subtitle_en = 'Schedule an appointment for\na bespoke experience; we will be expecting you.',
  subtitle_ru = 'Запишитесь на приём для\nэксклюзивного впечатления — мы будем вас ждать.',
  button_text_en = 'MAKE AN APPOINTMENT',
  button_text_ru = 'ЗАПИСАТЬСЯ'
WHERE section_type = 'bottom' AND sort_order = 2;

-- =====================================================
-- 8. HOMEPAGE BLOG SECTION
-- =====================================================
UPDATE homepage_blog_section SET
  title_en = 'The Story of Diamonds,\nThe Inspiration of Elegance',
  title_ru = 'История бриллианта,\nвдохновение изящества',
  subtitle_en = 'HAN BLOG',
  subtitle_ru = 'БЛОГ HAN',
  description_en = 'The Light of My Eyes Blog is crafted for those who believe that a diamond is not merely a jewel, but a bearer of meaning, emotion, and story.',
  description_ru = 'Блог «Свет моих глаз» создан для тех, кто верит, что бриллиант — это не просто украшение, а ценность, несущая в себе смысл, чувства и историю.',
  additional_text_en = 'In this space, you will find all the details you have been curious about, from rings to necklaces, from special occasion gifts to diamond selection guides, presented through inspiring content and expert perspectives.',
  additional_text_ru = 'Здесь вы найдёте все интересующие детали — от колец до колье, от подарков к особым дням до руководств по выбору бриллиантов — в сопровождении вдохновляющего контента и экспертных мнений.',
  link_text_en = 'read more',
  link_text_ru = 'продолжение статьи'
WHERE id = 1;

-- =====================================================
-- 9. FOOTER SETTINGS
-- =====================================================
UPDATE footer_settings SET
  slogan_en = 'Everything becomes beautiful with you...',
  slogan_ru = 'С тобой всё становится прекраснее...',
  copyright_text_en = '© 2025 Han Kuyumculuk, All Rights Reserved',
  copyright_text_ru = '© 2025 Han Kuyumculuk, Все права защищены'
WHERE id = 1;

-- =====================================================
-- 10. FOOTER COLUMNS
-- =====================================================
UPDATE footer_columns SET title_en = 'HAN JEWELRY', title_ru = 'HAN ЮВЕЛИРНЫЕ' WHERE id = 1;
UPDATE footer_columns SET title_en = 'COLLECTION', title_ru = 'КОЛЛЕКЦИЯ' WHERE id = 2;
UPDATE footer_columns SET title_en = 'CUSTOMER SERVICE', title_ru = 'ОБСЛУЖИВАНИЕ КЛИЕНТОВ' WHERE id = 3;
UPDATE footer_columns SET title_en = 'LEGAL', title_ru = 'ПРАВОВАЯ ИНФОРМАЦИЯ' WHERE id = 4;

-- =====================================================
-- 11. FOOTER LINKS
-- =====================================================
UPDATE footer_links SET text_en = 'About Us', text_ru = 'О нас' WHERE id = 1;
UPDATE footer_links SET text_en = 'Contact', text_ru = 'Контакты' WHERE id = 2;
UPDATE footer_links SET text_en = 'Blog', text_ru = 'Блог' WHERE id = 3;
UPDATE footer_links SET text_en = 'Light of My Eyes', text_ru = 'Свет моих глаз' WHERE id = 4;
UPDATE footer_links SET text_en = 'Care & Warranty', text_ru = 'Уход и гарантия' WHERE id = 5;
UPDATE footer_links SET text_en = 'Cookie Policy', text_ru = 'Политика cookies' WHERE id = 6;

-- =====================================================
-- 12. CONTACT INFO
-- =====================================================
UPDATE contact_info SET
  address_en = 'Liman Mahallesi, Akdeniz Bulvarı, No: 257 Block A, Suite 95, Fenix Center Mall, Konyaaltı/Antalya',
  address_ru = 'Район Лиман, бульвар Акдениз, д. 257, блок А, офис 95, ТЦ Fenix Center, Коньяалты/Анталья',
  working_hours_en = 'Every Day: 10:00 AM - 8:00 PM',
  working_hours_ru = 'Каждый день: 10:00 - 20:00'
WHERE id = 1;

-- =====================================================
-- 13. CATEGORIES - Mücevher
-- =====================================================
UPDATE categories SET
  name_en = 'Rings', name_ru = 'Кольца',
  hero_title_en = 'The Most Precious Signature of Love. The expression of a captivating elegance.',
  hero_title_ru = 'Самая драгоценная подпись любви. Выражение пленительной элегантности.',
  hero_subtitle_en = 'The expression of a captivating elegance.',
  hero_subtitle_ru = 'Выражение пленительной элегантности.',
  hero_description_en = 'With an inner strength.\nLike a value beyond compare.\nSimple yet impressive.',
  hero_description_ru = 'С внутренней силой.\nКак ценность, не имеющая себе равных.\nПросто, но впечатляюще.',
  list_title_en = 'OUR DIAMOND RINGS', list_title_ru = 'НАШИ БРИЛЛИАНТОВЫЕ КОЛЬЦА'
WHERE id = 1;

UPDATE categories SET
  name_en = 'Necklaces', name_ru = 'Колье',
  hero_title_en = 'The Purest Form of Elegance',
  hero_title_ru = 'Чистейшая форма элегантности',
  hero_subtitle_en = 'Designs that inspire admiration.',
  hero_subtitle_ru = 'Дизайны, вызывающие восхищение.',
  hero_description_en = 'This necklace is for things that start with a glance.\nFelt as you come closer, unnamed yet undeniable…\nFar from ostentation, close to the heart.\nLike something you want to protect...',
  hero_description_ru = 'Это колье для вещей, которые начинаются со взгляда.\nЧувствуется по мере приближения, безымянное, но неоспоримое…\nДалёкое от показухи, близкое к сердцу.\nКак то, что хочется защитить...',
  list_title_en = 'OUR DIAMOND NECKLACES', list_title_ru = 'НАШИ БРИЛЛИАНТОВЫЕ КОЛЬЕ'
WHERE id = 2;

UPDATE categories SET
  name_en = 'Bracelets', name_ru = 'Браслеты',
  hero_title_en = 'Light on Your Wrist',
  hero_title_ru = 'Свет на вашем запястье',
  hero_subtitle_en = 'Designs that carry their own character without excess.',
  hero_subtitle_ru = 'Дизайны, несущие свой характер без излишеств.',
  hero_description_en = 'Each one is carefully shaped, reflecting a measured aesthetic sense.\nMaintaining the balance between simplicity and distinction.\nBased not on ostentation, but on lasting elegance.\nPieces that complete your presence...',
  hero_description_ru = 'Каждый тщательно сформирован, отражая выверенное чувство эстетики.\nСоблюдая баланс между простотой и утончённостью.\nОсновано не на показухе, а на непреходящей элегантности.\nУкрашения, дополняющие ваш образ...',
  list_title_en = 'OUR DIAMOND BRACELETS', list_title_ru = 'НАШИ БРИЛЛИАНТОВЫЕ БРАСЛЕТЫ'
WHERE id = 3;

UPDATE categories SET
  name_en = 'Earrings', name_ru = 'Серьги',
  hero_title_en = 'The Touch of Sparkle',
  hero_title_ru = 'Прикосновение сияния',
  hero_subtitle_en = 'An aesthetic understanding shaped by your presence.',
  hero_subtitle_ru = 'Эстетика, формируемая вашим присутствием.',
  hero_description_en = 'Masterfully shaped designs.\nAdding a different meaning to your expression,\nmemorable, striking touches...',
  hero_description_ru = 'Мастерски выполненные дизайны.\nПридающие новый смысл вашему образу,\nзапоминающиеся, яркие акценты...',
  list_title_en = 'OUR DIAMOND EARRINGS', list_title_ru = 'НАШИ БРИЛЛИАНТОВЫЕ СЕРЬГИ'
WHERE id = 4;

UPDATE categories SET
  name_en = 'Sets', name_ru = 'Комплекты',
  hero_title_en = 'Perfect Harmony',
  hero_title_ru = 'Идеальная гармония',
  hero_subtitle_en = 'The most elegant form of harmony.',
  hero_subtitle_ru = 'Самая элегантная форма гармонии.',
  hero_description_en = 'Their coming together is no coincidence.\nEach detail carries value on its own,\nbut together a stronger expression emerges.\nMaking you feel complete…',
  hero_description_ru = 'Их соединение не случайно.\nКаждая деталь ценна сама по себе,\nно вместе рождается более сильное выражение.\nЗаставляя вас чувствовать себя завершённой…',
  list_title_en = 'OUR DIAMOND SETS', list_title_ru = 'НАШИ БРИЛЛИАНТОВЫЕ КОМПЛЕКТЫ'
WHERE id = 5;

-- =====================================================
-- 14. CATEGORIES - Koleksiyon (Gözümün Nuru)
-- =====================================================
UPDATE categories SET
  name_en = 'Light of My Eyes', name_ru = 'Свет моих глаз',
  hero_title_en = 'Light of My Eyes',
  hero_title_ru = 'Свет моих глаз',
  hero_subtitle_en = 'Meaningful designs dedicated to your loved ones.',
  hero_subtitle_ru = 'Наполненные смыслом дизайны для ваших любимых.',
  hero_description_en = 'The Light of My Eyes collection\nwas designed as a symbol\nof love and value.',
  hero_description_ru = 'Коллекция «Свет моих глаз»\nбыла создана как символ\nлюбви и ценности.',
  list_title_en = 'LIGHT OF MY EYES', list_title_ru = 'СВЕТ МОИХ ГЛАЗ'
WHERE id = 6;

-- =====================================================
-- 15. CATEGORIES - Hediye
-- =====================================================
UPDATE categories SET
  name_en = 'Birthday', name_ru = 'День рождения',
  hero_title_en = 'Birthday Sparkle', hero_title_ru = 'Сияние дня рождения',
  hero_subtitle_en = 'The most beautiful birthday gift.', hero_subtitle_ru = 'Самый красивый подарок на день рождения.',
  hero_description_en = 'Gift options to make your loved ones'' birthday special. Diamond designs for every age and style.',
  hero_description_ru = 'Варианты подарков, которые сделают день рождения ваших близких особенным. Бриллиантовые дизайны для любого возраста и стиля.',
  list_title_en = 'BIRTHDAY GIFTS', list_title_ru = 'ПОДАРКИ НА ДЕНЬ РОЖДЕНИЯ'
WHERE id = 7;

UPDATE categories SET
  name_en = 'Mother''s Day', name_ru = 'День матери',
  hero_title_en = 'Special for Mothers', hero_title_ru = 'Особенное для мам',
  hero_subtitle_en = 'The most precious gift for the most precious woman.', hero_subtitle_ru = 'Самый ценный подарок для самой ценной женщины.',
  hero_description_en = 'Special diamond designs to express your love for your mother. Elegant, meaningful and lasting gifts.',
  hero_description_ru = 'Особые бриллиантовые дизайны, чтобы выразить любовь к маме. Элегантные, значимые и долговечные подарки.',
  list_title_en = 'MOTHER''S DAY GIFTS', list_title_ru = 'ПОДАРКИ НА ДЕНЬ МАТЕРИ'
WHERE id = 8;

UPDATE categories SET
  name_en = 'Women''s Day', name_ru = 'Женский день',
  hero_title_en = 'For Women', hero_title_ru = 'Для женщин',
  hero_subtitle_en = 'For strong and elegant women.', hero_subtitle_ru = 'Для сильных и элегантных женщин.',
  hero_description_en = 'Give a meaningful gift to the special women in your life on Women''s Day. Designs that combine style and elegance.',
  hero_description_ru = 'Подарите значимый подарок особенным женщинам в вашей жизни на Женский день. Дизайны, сочетающие стиль и элегантность.',
  list_title_en = 'WOMEN''S DAY GIFTS', list_title_ru = 'ПОДАРКИ НА ЖЕНСКИЙ ДЕНЬ'
WHERE id = 9;

UPDATE categories SET
  name_en = 'Special Occasions', name_ru = 'Особые события',
  hero_title_en = 'For Special Moments', hero_title_ru = 'Для особых моментов',
  hero_subtitle_en = 'Unforgettable gifts.', hero_subtitle_ru = 'Незабываемые подарки.',
  hero_description_en = 'Gift options designed to celebrate the most special moments of your life. Perfect choices for engagements, weddings, anniversaries or any special day.',
  hero_description_ru = 'Варианты подарков для самых особых моментов вашей жизни. Идеальный выбор для помолвок, свадеб, годовщин или любого особого дня.',
  list_title_en = 'SPECIAL OCCASIONS GIFTS', list_title_ru = 'ПОДАРКИ НА ОСОБЫЕ СОБЫТИЯ'
WHERE id = 10;

UPDATE categories SET
  name_en = 'Newborn', name_ru = 'Новорождённый',
  hero_title_en = 'For Little Angels', hero_title_ru = 'Для маленьких ангелов',
  hero_subtitle_en = 'Gifts for new beginnings.', hero_subtitle_ru = 'Подарки для новых начал.',
  hero_description_en = 'Special, meaningful gift options for newborn babies and their families. Perfect as a welcome to life gift.',
  hero_description_ru = 'Особые, значимые варианты подарков для новорождённых и их семей. Идеальный подарок в честь рождения.',
  list_title_en = 'NEWBORN GIFTS', list_title_ru = 'ПОДАРКИ НОВОРОЖДЁННЫМ'
WHERE id = 11;

UPDATE categories SET
  name_en = 'Accessories', name_ru = 'Аксессуары',
  hero_title_en = 'Finishing Touches', hero_title_ru = 'Завершающие штрихи',
  hero_subtitle_en = 'Complete your style.', hero_subtitle_ru = 'Завершите свой стиль.',
  hero_description_en = 'Accessories to complete your jewelry collection. Special options from hair clips to jewelry boxes.',
  hero_description_ru = 'Аксессуары для завершения вашей ювелирной коллекции. Специальные варианты от заколок для волос до шкатулок.',
  list_title_en = 'ACCESSORIES', list_title_ru = 'АКСЕССУАРЫ'
WHERE id = 12;

-- =====================================================
-- 16. CATEGORIES - Erkek
-- =====================================================
UPDATE categories SET
  name_en = 'Prayer Beads', name_ru = 'Чётки',
  hero_title_en = 'Traditional Elegance', hero_title_ru = 'Традиционная элегантность',
  hero_subtitle_en = 'Peace in every bead.', hero_subtitle_ru = 'Покой в каждой бусине.',
  hero_description_en = 'The first thing you notice when you hold them is serenity.\nLife relaxes a little, thoughts slow down.\nNot the numbers, but the pauses remain.\nMeaningful not when you look, but when you pause.\nAfter a while, you don''t even notice them...',
  hero_description_ru = 'Первое, что замечаешь, когда берёшь их в руки — умиротворение.\nЖизнь немного расслабляется, мысли замедляются.\nОстаются не числа, а паузы.\nЗначимы не когда смотришь, а когда останавливаешься.\nЧерез некоторое время их даже не замечаешь...',
  list_title_en = 'PRAYER BEADS COLLECTION', list_title_ru = 'КОЛЛЕКЦИЯ ЧЁТОК'
WHERE id = 13;

UPDATE categories SET
  name_en = 'Men''s Bracelet', name_ru = 'Мужской браслет',
  hero_title_en = 'Men''s Elegance', hero_title_ru = 'Мужская элегантность',
  hero_subtitle_en = 'Power and elegance on your wrist.', hero_subtitle_ru = 'Сила и элегантность на вашем запястье.',
  hero_description_en = 'Like something that accompanies without being noticed.\nReveals itself as you move.\nBlends into the day, never falls behind.\nNeither too much, nor too little.\nNatural when it''s there…',
  hero_description_ru = 'Как то, что сопровождает, не привлекая внимания.\nПроявляется с каждым движением.\nВливается в день, не отстаёт.\nНи много, ни мало.\nЕстественно, когда он есть…',
  list_title_en = 'MEN''S BRACELETS', list_title_ru = 'МУЖСКИЕ БРАСЛЕТЫ'
WHERE id = 14;

UPDATE categories SET
  name_en = 'Men''s Ring', name_ru = 'Мужское кольцо',
  hero_title_en = 'Men''s Rings', hero_title_ru = 'Мужские кольца',
  hero_subtitle_en = 'Symbol of power and character.', hero_subtitle_ru = 'Символ силы и характера.',
  hero_description_en = 'A feeling that changes as you look at your hand.\nSometimes habit, sometimes weight.\nFrom a place that cannot be put into words.\nNeither wanting to tell, nor wanting to hide.\nIt simply stays…',
  hero_description_ru = 'Чувство, которое меняется, когда смотришь на руку.\nИногда привычка, иногда тяжесть.\nИз места, которое нельзя выразить словами.\nНе желая рассказать, не желая скрыть.\nПросто остаётся…',
  list_title_en = 'MEN''S RINGS', list_title_ru = 'МУЖСКИЕ КОЛЬЦА'
WHERE id = 15;

-- Preloved
UPDATE categories SET
  name_en = 'Preloved', name_ru = 'Preloved',
  hero_title_en = 'Preloved', hero_title_ru = 'Preloved',
  hero_subtitle_en = 'Pieces that lose nothing of their value over time.',
  hero_subtitle_ru = 'Изделия, не теряющие своей ценности со временем.',
  hero_description_en = 'Some jewelry exists that\nloses nothing of its value over time.\nIts design, craftsmanship and presence still carries the same impact as the first day.\n\nPreloved pieces\nconsist of carefully selected, authentically preserved\njewelry waiting to be rediscovered.',
  hero_description_ru = 'Существуют украшения,\nкоторые с течением времени не теряют своей ценности.\nИх дизайн, мастерство и присутствие по-прежнему производят то же впечатление, что и в первый день.\n\nPreloved изделия\nсостоят из тщательно отобранных, бережно сохранённых\nукрашений, ожидающих своего нового открытия.',
  list_title_en = 'PRELOVED COLLECTION', list_title_ru = 'КОЛЛЕКЦИЯ PRELOVED'
WHERE id = 16;

-- Kol Düğmesi
UPDATE categories SET
  name_en = 'Cufflinks', name_ru = 'Запонки'
WHERE id = 17;

-- =====================================================
-- 17. ABOUT VALUES (önce _en/_ru sütunları ekle)
-- =====================================================
ALTER TABLE about_values
  ADD COLUMN IF NOT EXISTS title_en VARCHAR(255) DEFAULT NULL AFTER title,
  ADD COLUMN IF NOT EXISTS title_ru VARCHAR(255) DEFAULT NULL AFTER title_en,
  ADD COLUMN IF NOT EXISTS description_en TEXT DEFAULT NULL AFTER description,
  ADD COLUMN IF NOT EXISTS description_ru TEXT DEFAULT NULL AFTER description_en;

UPDATE about_values SET title_en = 'Elegance', title_ru = 'Элегантность', description_en = 'We prioritize elegance in every design.', description_ru = 'Мы ставим элегантность на первое место в каждом дизайне.' WHERE id = 1;
UPDATE about_values SET title_en = 'Quality', title_ru = 'Качество', description_en = 'We work with certified diamonds and the finest materials.', description_ru = 'Мы работаем с сертифицированными бриллиантами и лучшими материалами.' WHERE id = 2;
UPDATE about_values SET title_en = 'Authenticity', title_ru = 'Подлинность', description_en = 'Every jewel carries its own unique story.', description_ru = 'Каждое украшение несёт свою уникальную историю.' WHERE id = 3;
UPDATE about_values SET title_en = 'Trust', title_ru = 'Доверие', description_en = 'The trust we build with our customers is the foundation of our work.', description_ru = 'Доверие, которое мы строим с нашими клиентами — основа нашей работы.' WHERE id = 4;

-- =====================================================
-- 18. PAGES - Çeviri güncellemeleri
-- =====================================================

-- Özel Tasarım
UPDATE pages SET
  title_en = 'Custom Design', title_ru = 'Индивидуальный дизайн',
  hero_title_en = 'Designs Made For You', hero_title_ru = 'Дизайны, созданные для вас',
  hero_subtitle_en = 'Let us design the jewelry of your dreams together', hero_subtitle_ru = 'Давайте вместе создадим украшение вашей мечты',
  meta_title_en = 'Custom Design - Han Jewelry', meta_title_ru = 'Индивидуальный дизайн - Han Ювелирные',
  meta_description_en = 'Custom jewelry design service by Han Jewelry. Create your dream piece with us.', meta_description_ru = 'Услуга индивидуального дизайна украшений Han Ювелирные. Создайте своё уникальное изделие вместе с нами.'
WHERE slug = 'ozel-tasarim';

-- Preloved
UPDATE pages SET
  title_en = 'Preloved', title_ru = 'Preloved',
  hero_title_en = 'Preloved Collection', hero_title_ru = 'Коллекция Preloved',
  hero_subtitle_en = 'Pieces that defy time', hero_subtitle_ru = 'Изделия, бросающие вызов времени'
WHERE slug = 'preloved';

-- Yatırım
UPDATE pages SET
  title_en = 'Investment Products', title_ru = 'Инвестиционные продукты',
  hero_title_en = 'VALUE', hero_title_ru = 'ЦЕННОСТЬ',
  hero_subtitle_en = 'PROTECTION', hero_subtitle_ru = 'ЗАЩИТА',
  meta_title_en = 'Investment Products - Han Jewelry', meta_title_ru = 'Инвестиционные продукты - Han Ювелирные',
  meta_description_en = 'Investment gold products, certified gold and safe investment options.', meta_description_ru = 'Инвестиционные золотые изделия, сертифицированное золото и безопасные инвестиции.'
WHERE slug = 'yatirim';

-- İletişim
UPDATE pages SET
  title_en = 'Contact', title_ru = 'Контакты',
  hero_title_en = 'Contact', hero_title_ru = 'Контакты',
  hero_subtitle_en = 'We look forward to meeting you', hero_subtitle_ru = 'Мы с нетерпением ждём встречи с вами',
  meta_title_en = 'Contact - Han Jewelry', meta_title_ru = 'Контакты - Han Ювелирные',
  meta_description_en = 'Han Jewelry contact information, address, phone and working hours.', meta_description_ru = 'Контактная информация Han Ювелирные: адрес, телефон и часы работы.'
WHERE slug = 'iletisim';

-- Randevu
UPDATE pages SET
  title_en = 'Book an Appointment', title_ru = 'Записаться на приём',
  hero_title_en = 'Book an Appointment', hero_title_ru = 'Записаться на приём',
  hero_subtitle_en = 'Take a step for your custom design process. Let''s meet at a time that suits you.', hero_subtitle_ru = 'Сделайте шаг к индивидуальному дизайну. Давайте встретимся в удобное для вас время.',
  meta_title_en = 'Book an Appointment - Han Jewelry', meta_title_ru = 'Запись на приём - Han Ювелирные',
  meta_description_en = 'Han Jewelry appointment system. Book an appointment for custom design consultations.', meta_description_ru = 'Система записи Han Ювелирные. Запишитесь на консультацию по индивидуальному дизайну.'
WHERE slug = 'randevu';

-- Blog
UPDATE pages SET
  title_en = 'Blog', title_ru = 'Блог',
  hero_title_en = 'The Story of Diamonds, The Inspiration of Elegance', hero_title_ru = 'История бриллиантов, вдохновение элегантности',
  hero_subtitle_en = 'HAN BLOG', hero_subtitle_ru = 'БЛОГ HAN',
  meta_title_en = 'Blog - Han Jewelry', meta_title_ru = 'Блог - Han Ювелирные',
  meta_description_en = 'Diamond stories, jewelry care, design tips and more.', meta_description_ru = 'Истории о бриллиантах, уход за украшениями, советы по дизайну и многое другое.'
WHERE slug = 'blog';

-- Hakkımızda
UPDATE pages SET
  title_en = 'About Us', title_ru = 'О нас',
  hero_title_en = 'About Us', hero_title_ru = 'О нас',
  hero_subtitle_en = 'Han Kuyumculuk', hero_subtitle_ru = 'Han Kuyumculuk',
  content_en = 'Founded in 1988 in Istanbul, Han Kuyumculuk is a well-established manufacturer that views jewelry production not as a craft, but as a discipline, a continuity, and a responsibility.\nThroughout the years since its founding, Han Kuyumculuk has maintained its course by placing stability, quality, and trust at the core of all processes from design to production. The production philosophy, nourished by Istanbul''s historical jewelry culture, merges with contemporary aesthetics and technical precision to form the brand''s character.\nToday, behind many jewelry designs displayed in showcases and offered under different brands, lies the Han signature. Han Kuyumculuk has established a strong position in the industry as a manufacturer that often goes unnamed, yet reveals itself through its craftsmanship, proportions, and attention to detail.\nHan exists through its manufacturer identity. All collections are developed by teams with years of experience in their respective fields. An expert staff with deep knowledge in diamonds and precious stones handles each piece with technical accuracy as well as aesthetic balance. This approach has positioned Han Kuyumculuk as a trusted and referenced brand in diamonds.\nContinuity in production means more than volume for Han; it means maintaining standards. Every stage, from raw materials to craftsmanship details, from quality control to final presentation, is conducted within a systematic structure. This structure is the institutional memory formed from years of accumulated experience.\nHan Kuyumculuk embraces timelessness rather than chasing fleeting trends. Designs are shaped with an aesthetic understanding that remains independent of seasonal influences and preserves its value for years. This approach is a natural consequence of the brand''s dual identity as both manufacturer and designer.',
  content_ru = 'Основанная в 1988 году в Стамбуле, компания Han Kuyumculuk — это авторитетный производитель, рассматривающий ювелирное производство не как ремесло, а как дисциплину, преемственность и ответственность.\nНа протяжении всех лет с момента основания Han Kuyumculuk придерживается курса, ставя стабильность, качество и доверие в центр всех процессов — от дизайна до производства. Философия производства, питаемая исторической ювелирной культурой Стамбула, сочетается с современной эстетикой и технической точностью, формируя характер бренда.\nСегодня за многими ювелирными дизайнами, представленными в витринах под разными брендами, стоит подпись Han. Han Kuyumculuk занял прочные позиции в отрасли как производитель, чьё имя часто остаётся незамеченным, но чьё мастерство, пропорции и внимание к деталям говорят сами за себя.\nHan существует благодаря своей производительной идентичности. Все коллекции разрабатываются командами с многолетним опытом в своих областях. Экспертный персонал с глубокими знаниями в области бриллиантов и драгоценных камней работает с каждым изделием с технической точностью и эстетическим балансом.\nНепрерывность производства для Han означает не просто объём, а поддержание стандартов. Каждый этап систематически организован — от сырья до деталей мастерства, от контроля качества до финальной презентации.\nHan Kuyumculuk предпочитает вневременность погоне за быстротечными трендами. Дизайны создаются с эстетическим пониманием, независимым от сезонных влияний и сохраняющим свою ценность на долгие годы.',
  meta_title_en = 'About Us - Han Jewelry', meta_title_ru = 'О нас - Han Ювелирные',
  meta_description_en = 'Han Jewelry story, our values and vision.', meta_description_ru = 'История Han Ювелирные, наши ценности и видение.'
WHERE slug = 'hakkimizda';

-- Bakım ve Garanti
UPDATE pages SET
  title_en = 'Care and Warranty', title_ru = 'Уход и гарантия',
  hero_title_en = 'Care and Warranty Terms', hero_title_ru = 'Условия ухода и гарантии',
  meta_title_en = 'Care & Warranty - Han Jewelry', meta_title_ru = 'Уход и гарантия - Han Ювелирные',
  meta_description_en = 'Han Jewelry care and warranty terms, jewelry maintenance and warranty coverage.', meta_description_ru = 'Условия ухода и гарантии Han Ювелирные, обслуживание украшений и гарантийное покрытие.'
WHERE slug = 'musteri-hizmetleri/bakim-garanti';

-- Çerez Politikası
UPDATE pages SET
  title_en = 'Cookie Policy', title_ru = 'Политика cookies',
  hero_title_en = 'Cookie Policy', hero_title_ru = 'Политика cookies',
  meta_title_en = 'Cookie Policy - Han Jewelry', meta_title_ru = 'Политика cookies - Han Ювелирные',
  meta_description_en = 'Han Jewelry cookie policy and privacy notice.', meta_description_ru = 'Политика cookies и уведомление о конфиденциальности Han Ювелирные.'
WHERE slug = 'yasal/cerez-politikasi';

-- Hediye sayfası
UPDATE pages SET
  title_en = 'Gifts', title_ru = 'Подарки',
  hero_title_en = 'Gifts', hero_title_ru = 'Подарки',
  hero_subtitle_en = 'There are special days that leave a mark in hearts', hero_subtitle_ru = 'Есть особые дни, оставляющие след в сердцах'
WHERE slug = 'hediye';

-- =====================================================
-- 19. HOMEPAGE INVESTMENT SECTION
-- =====================================================
UPDATE homepage_investment_section SET
  title_en = 'FROM TODAY\nTO TOMORROW\nWITH CONFIDENCE',
  title_ru = 'ОТ СЕГОДНЯ\nК БУДУЩЕМУ\nС УВЕРЕННОСТЬЮ',
  description_en = 'Shape your future with confidence through certified investment-grade gold products. Every gram represents a steadfast step forward.',
  description_ru = 'Формируйте своё будущее с уверенностью благодаря сертифицированным инвестиционным золотым изделиям. Каждый грамм — это надёжный шаг.',
  button_text_en = 'INVESTMENT PRODUCTS',
  button_text_ru = 'ИНВЕСТИЦИОННЫЕ ИЗДЕЛИЯ'
WHERE id = 1;
