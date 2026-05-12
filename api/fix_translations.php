<?php
/**
 * One-off migration: Hediye, Özel Tasarım, Gözümün Nuru sayfalarının
 * sections JSON'una _En/_Ru variantlarını doğru escape ile yazar.
 *
 * Kullanım: tarayıcıdan https://hankuyumculuk.com/api/fix_translations.php
 * adresine git. JSON sonuç görürsen migration tamam.
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

$db = getDB();
$results = [];

// ---------------------------------------------------------------------------
// 1) HEDIYE (pages id=10)
// ---------------------------------------------------------------------------
$hediye = [
    "philosophyTitle1" => "Bir teşekkür,",
    "philosophyTitle1En" => "A thank-you,",
    "philosophyTitle1Ru" => "Благодарность,",
    "philosophyTitle2" => "bir kutlama",
    "philosophyTitle2En" => "a celebration",
    "philosophyTitle2Ru" => "праздник",
    "philosophyText" => "\"iyi ki varsın\" demenin en kalıcı hâli…\n\nHan'da hediye,\nyalnızca bir mücevher seçimi değil;\nduyulmuş, düşünülmüş ve anlam yüklenmiş bir jesttir.",
    "philosophyTextEn" => "The most enduring way of saying \"I am glad you exist\"…\n\nAt Han, a gift\nis not merely the choice of a piece of jewellery;\nit is a gesture that has been heard, considered, and infused with meaning.",
    "philosophyTextRu" => "Самый стойкий способ сказать «как хорошо, что ты есть»…\n\nПодарок в Han —\nэто не просто выбор украшения;\nэто жест, который услышан, продуман и наполнен смыслом.",
    "splitImage" => "/images/pages/1771402779_65a6015f_WhatsApp_Image_2026_02_17_at_18_02_06.jpg",
    "splitTitle" => "Değer\nverdiğini göster",
    "splitTitleEn" => "Show\nthat you care",
    "splitTitleRu" => "Покажи,\nчто это ценно",
    "splitText1" => "Değer verdiğini, düşündüğünü\nve özen gösterdiğini göstermenin\nen açık yoludur.",
    "splitText1En" => "It is the clearest way of showing\nthat you care, that you have thought of someone,\nand that you have taken the time.",
    "splitText1Ru" => "Это самый ясный способ показать,\nчто вам не безразлично, что вы подумали\nи проявили заботу.",
    "splitText2" => "Anneler Günü'nde minneti,\nKadınlar Günü'nde zarafeti,\nSevgililer Günü'nde bağı,\nyıl dönümlerinde ortak bir hikâyeyi anlatır.",
    "splitText2En" => "On Mother's Day it speaks of gratitude,\non International Women's Day of elegance,\non Valentine's Day of connection,\non anniversaries of a shared story.",
    "splitText2Ru" => "В День матери — благодарность,\nв Международный женский день — изящество,\nв День святого Валентина — связь,\nв годовщины — общая история.",
    "categoriesTitle" => "Kategorilerimiz",
    "categoriesTitleEn" => "Our Categories",
    "categoriesTitleRu" => "Наши категории",
    "categoriesSubtitle" => "Seçilmiş, düşünülmüş ve\nuzun vadeli bir değerin ifadesi",
    "categoriesSubtitleEn" => "An expression of something carefully selected, thoughtfully considered\nand built to last.",
    "categoriesSubtitleRu" => "Выражение тщательно выбранной, продуманной\nи долговечной ценности.",
    "categories" => [
        [
            "title" => "Yüzük", "titleEn" => "Ring", "titleRu" => "Кольцо",
            "description" => "Biçiminin içinde anlam",
            "descriptionEn" => "Meaning within its form",
            "descriptionRu" => "Смысл в каждой линии",
            "image" => "/images/pages/1778508191_26ec1e67_YZ00016_3.jpg",
            "href" => "/mucevher/yuzuk",
        ],
        [
            "title" => "Kolye", "titleEn" => "Necklace", "titleRu" => "Колье",
            "description" => "Göğsüne yakın sevgi",
            "descriptionEn" => "Love kept close to the heart",
            "descriptionRu" => "Любовь, которая всегда рядом",
            "image" => "/images/pages/1778508219_6e3eb6b5_KL00014_3.jpg",
            "href" => "/mucevher/kolye",
        ],
        [
            "title" => "Bileklik", "titleEn" => "Bracelet", "titleRu" => "Браслет",
            "description" => "Hareketiyle hikâye",
            "descriptionEn" => "A story told through movement",
            "descriptionRu" => "История в каждом движении",
            "image" => "/images/pages/1778508241_cc66e71b_BL00027_4.jpg",
            "href" => "/mucevher/bileklik",
        ],
        [
            "title" => "Küpe", "titleEn" => "Earring", "titleRu" => "Серьги",
            "description" => "Yüze yakın söz",
            "descriptionEn" => "A whisper close to the face",
            "descriptionRu" => "Слова, звучащие у самого лица",
            "image" => "/images/pages/1778508261_ff7a76f7_KP00005_3.jpg",
            "href" => "/mucevher/kupe",
        ],
    ],
    "darkBgImage" => "/images/parallax-bg.jpg",
    "darkText1" => "Her parça;\nzarif tasarımı, dengeli oranları ve ustalıklı işçiliğiyle\nverildiği ana değer katar.",
    "darkText1En" => "Each piece —\nwith its refined design, balanced proportions, and masterful craftsmanship —\nadds meaning to the moment it is given.",
    "darkText1Ru" => "Каждое изделие —\nс изысканным дизайном, выверенными пропорциями и тонким мастерством —\nделает момент, когда его дарят, особенным.",
    "darkText2" => "Gösterişten çok dengeye,\nabartıdan çok ustalığa,\ngeçicilikten çok kalıcılığa odaklanır.",
    "darkText2En" => "Focused more on balance than display,\non craftsmanship more than excess,\non permanence more than fleeting trends.",
    "darkText2Ru" => "Сделано не ради показа, а ради гармонии,\nне ради избытка, а ради мастерства,\nне на сезон, а на годы.",
    "darkText3" => "Çünkü bazı hediyeler,\nkutudan çıktığı an değil,\nyıllar sonra bile hatırlandığında anlam kazanır…",
    "darkText3En" => "Because some gifts gain their meaning\nnot in the moment they leave the box,\nbut years later, when they are remembered…",
    "darkText3Ru" => "Потому что некоторые подарки обретают смысл\nне в момент, когда покидают коробку,\nа спустя годы, когда их вспоминают…",
    "ctaSmallTitle" => "Peki Sen?",
    "ctaSmallTitleEn" => "And You?",
    "ctaSmallTitleRu" => "А ты?",
    "ctaTitle" => "Kimin hayatında iz bırakmak istiyorsun",
    "ctaTitleEn" => "Whose life would you like to leave a mark on",
    "ctaTitleRu" => "В чьей жизни ты хочешь оставить след",
    "ctaSubtitle" => "Seçilmiş, düşünülmüş ve\nuzun vadeli bir değerin ifadesi",
    "ctaSubtitleEn" => "An expression of something carefully selected, thoughtfully considered\nand built to last.",
    "ctaSubtitleRu" => "Выражение тщательно выбранной, продуманной\nи долговечной ценности.",
];

$stmt = $db->prepare("UPDATE pages SET
    title_en = :te, title_ru = :tr,
    hero_title_en = :hte, hero_title_ru = :htr,
    hero_subtitle_en = :hse, hero_subtitle_ru = :hsr,
    content = :content
    WHERE id = 10");
$stmt->execute([
    ':te' => 'Gifts',
    ':tr' => 'Подарки',
    ':hte' => 'Gifts',
    ':htr' => 'Подарки',
    ':hse' => 'There are special days that remain as a mark in the heart',
    ':hsr' => 'Есть особые дни, которые остаются следом в сердцах',
    ':content' => json_encode($hediye, JSON_UNESCAPED_UNICODE),
]);
$results['hediye'] = ['affected' => $stmt->rowCount(), 'content_len' => strlen(json_encode($hediye, JSON_UNESCAPED_UNICODE))];

// ---------------------------------------------------------------------------
// 2) ÖZEL TASARIM (pages id=1)
// ---------------------------------------------------------------------------
$ozel = [
    "heroSubtitle" => "Han Kuyumculuk",
    "heroSubtitleEn" => "Han Kuyumculuk",
    "heroSubtitleRu" => "Han Kuyumculuk",
    "heroTitle" => "Size Özel",
    "heroTitleEn" => "Exclusively Yours",
    "heroTitleRu" => "Только для вас",
    "heroDesc" => "Her şey sizi dinlemekle başlıyor...",
    "heroDescEn" => "Everything begins with listening to you...",
    "heroDescRu" => "Всё начинается с того, что мы слушаем вас...",
    "scrollText" => "Keşfedin",
    "scrollTextEn" => "Discover",
    "scrollTextRu" => "Открыть",
    "philosophyQuote1" => "Gerçek değer,",
    "philosophyQuote1En" => "True value",
    "philosophyQuote1Ru" => "Истинная ценность",
    "philosophyQuote2" => "kişiye ait olanda saklıdır.",
    "philosophyQuote2En" => "lies in what belongs to the individual.",
    "philosophyQuote2Ru" => "скрыта в том, что принадлежит самому человеку.",
    "philosophyText" => "Size özel olan,\nhazır kalıplara sığmaz.\nBir ölçüden fazlasıdır;\nbir duruştur, bir ihtiyaçtır, bir hikâyedir.",
    "philosophyTextEn" => "What is uniquely yours\nwill not fit into ready-made moulds.\nIt is more than a measurement;\nit is a stance, a need, a story.",
    "philosophyTextRu" => "То, что создано именно для вас,\nне укладывается в готовые шаблоны.\nЭто больше, чем размер;\nэто позиция, потребность, история.",
    "splitImage" => "/images/pages/1778481403_556bc156_size___zezl.png",
    "splitTitle" => "Dinlenmeyi\nbeklersiniz.",
    "splitTitleEn" => "You expect\nto be heard.",
    "splitTitleRu" => "Вы ждёте,\nчтобы вас услышали.",
    "splitText1" => "Söylediklerinizin anlaşılmasını,\nanlatmak istediklerinizin\ndikkatle ele alınmasını istersiniz.",
    "splitText1En" => "You want what you say to be understood\nand what you wish to express\nto be considered with care.",
    "splitText1Ru" => "Вы хотите, чтобы вас понимали,\nа то, что вы хотите донести,\nбыло воспринято с особым вниманием.",
    "splitText2" => "Detay ararsınız.\nHer çizginin, her dokunun\nsizinle bir bağ kurmasını beklersiniz.",
    "splitText2En" => "You look for detail.\nYou expect every line, every texture\nto form a connection with you.",
    "splitText2Ru" => "Вы ищете детали.\nВам важно, чтобы каждая линия, каждая текстура\nсоздавала связь именно с вами.",
    "processTitle" => "Özgürlük İstersiniz",
    "processTitleEn" => "You Seek Freedom",
    "processTitleRu" => "Вы стремитесь к свободе",
    "processSubtitle" => "Seçeneklerin sizi sınırlamamasını,\naksine size alan açmasını beklersiniz.",
    "processSubtitleEn" => "You expect the options not to limit you,\nbut to open new space for you instead.",
    "processSubtitleRu" => "Вы хотите, чтобы варианты не ограничивали вас,\nа, напротив, открывали перед вами новые возможности.",
    "steps" => [
        [
            "label" => "İlk Adım", "labelEn" => "First Step", "labelRu" => "Первый шаг",
            "title" => "Anlama", "titleEn" => "Understanding", "titleRu" => "Понимание",
            "desc" => "Mücevher, biçim almadan önce sizi anlamakla başlar.\nBeklentiler, duygular ve size ait hikâye bu aşamada netleşir.\nHalinizi, niyenizi, anlatmak istediğinizi duygunuzu dinleriz.",
            "descEn" => "Before the jewellery takes shape, the process begins with understanding you.\nExpectations, emotions and the story that belongs to you become clear in this phase.\nWe listen to your state, your intention, and the feeling you wish to convey.",
            "descRu" => "Прежде чем украшение примет форму, всё начинается с того, что мы понимаем вас.\nОжидания, чувства и ваша личная история становятся ясными на этом этапе.\nМы вслушиваемся в ваше состояние, намерение и эмоцию, которую вы хотите передать.",
        ],
        [
            "label" => "İkinci Adım", "labelEn" => "Second Step", "labelRu" => "Второй шаг",
            "title" => "Şekillendirme", "titleEn" => "Shaping", "titleRu" => "Формирование",
            "desc" => "Ölçüler, dokular ve detaylar, yavaş yavaş belirir.\nBu aşama bir karar değil, bir keşiftir.\nParça kendini bulana kadar çalışılır.\nBu aşamada, sizin beklentileriniz ile bizim teknik bilgimiz\nve yıllara dayanan üretim tecrübemiz bir araya gelir.\nTasarım, bu evrede gerçek karakterini kazanır.",
            "descEn" => "Proportions, textures and details gradually emerge.\nThis stage is not a decision but a discovery.\nWe work until the piece finds its true form.\nHere, your expectations meet our technical knowledge\nand our many years of production experience.\nThe design acquires its true character in this phase.",
            "descRu" => "Пропорции, текстуры и детали постепенно проступают.\nЭтот этап — не решение, а открытие.\nМы работаем, пока изделие не обретёт свой облик.\nЗдесь ваши ожидания встречаются с нашими техническими знаниями\nи многолетним опытом производства.\nИменно на этом этапе дизайн приобретает свой характер.",
        ],
        [
            "label" => "Üçüncü Adım", "labelEn" => "Third Step", "labelRu" => "Третий шаг",
            "title" => "Üretim", "titleEn" => "Production", "titleRu" => "Производство",
            "desc" => "Tasarım netleştiğinde, usta ellerde,\neşsiz bir parça olarak hayata geçer.\nBeklenti ve istekleriniz tam olarak karşılık bulana dek\nsüreç titizlikle devam eder.",
            "descEn" => "Once the design is finalised, it comes to life in masterful hands\nas a unique piece.\nThe process continues with utmost care\nuntil your expectations and wishes are fully met.",
            "descRu" => "Когда дизайн утверждён, он рождается в руках мастеров\nкак уникальное произведение.\nПроцесс продолжается с предельной тщательностью,\nпока ваши ожидания и пожелания не будут полностью воплощены.",
        ],
        [
            "label" => "Son Adım", "labelEn" => "Final Step", "labelRu" => "Последний шаг",
            "title" => "Tamamlanma", "titleEn" => "Completion", "titleRu" => "Завершение",
            "desc" => "Ortaya çıkan mücevher, artık yalnızca bir tasarım değil,\nsize ait bir iz haline gelir.\nTamamlanma, beklentileriniz eksiksiz karşılandığında gerçekleşir.",
            "descEn" => "The finished jewellery is no longer just a design;\nit becomes a mark that belongs to you.\nCompletion is reached when your expectations are entirely fulfilled.",
            "descRu" => "Готовое украшение становится не просто дизайном,\nа неотъемлемой частью вашей истории.\nЗавершение наступает, когда все ваши ожидания полностью реализованы.",
        ],
    ],
    "darkBgImage" => "/images/parallax-bg.jpg",
    "darkTitle" => "Ve Sonunda...",
    "darkTitleEn" => "And in the End...",
    "darkTitleRu" => "И в итоге...",
    "darkText1" => "Size ait olduğunu hissettiren",
    "darkText1En" => "A piece that feels",
    "darkText1Ru" => "Изделие, которое ощущается",
    "darkText1Cursive" => "bir parça beklersiniz.",
    "darkText1CursiveEn" => "truly your own.",
    "darkText1CursiveRu" => "по-настоящему вашим.",
    "darkText2" => "Başkasına değil,\ntam olarak size yakışan.",
    "darkText2En" => "Not for anyone else —\nmade precisely to suit you.",
    "darkText2Ru" => "Не для кого-то другого,\nа именно для вас.",
    "ctaTitle1" => "İşte bu yüzden",
    "ctaTitle1En" => "That is why",
    "ctaTitle1Ru" => "Именно поэтому",
    "ctaTitle2" => "Han \"Size Özel\"",
    "ctaTitle2En" => "Han \"Exclusively Yours\"",
    "ctaTitle2Ru" => "Han «Только для вас»",
    "ctaDesc" => "Dinleyen, anlayan ve sizin için şekillenen\nbir ustalık yaklaşımı sunar.",
    "ctaDescEn" => "offers a craft approach that listens, understands\nand takes shape for you.",
    "ctaDescRu" => "предлагает мастерство, которое слышит, понимает\nи рождается именно для вас.",
    "ctaButtonText" => "RANDEVU OLUŞTURUN",
    "ctaButtonTextEn" => "BOOK AN APPOINTMENT",
    "ctaButtonTextRu" => "ЗАПИСАТЬСЯ НА ПРИЁМ",
    "ctaButtonLink" => "/randevu?subject=size-ozel",
    "galleryImages" => [
        ["image" => "/images/pages/1771409950_d428e56a_BL18004.jpg", "href" => "/urun/BL00004"],
        ["image" => "/images/pages/1771409967_8f27cfbd_YZ18018_1.jpg", "href" => "/urun/YZ00018"],
        ["image" => "/images/pages/1771409984_c5f75a85_KL18007.jpg", "href" => "/urun/KL00007"],
    ],
];

$stmt = $db->prepare("UPDATE pages SET content = :content WHERE id = 1");
$stmt->execute([':content' => json_encode($ozel, JSON_UNESCAPED_UNICODE)]);
$results['ozel_tasarim'] = ['affected' => $stmt->rowCount(), 'content_len' => strlen(json_encode($ozel, JSON_UNESCAPED_UNICODE))];

// ---------------------------------------------------------------------------
// 3) GÖZÜMÜN NURU (categories id=6)
// ---------------------------------------------------------------------------
$nuru = [
    "heroTitleImage" => "",
    "heroSvg" => "/images/categories/1775459656_c7227a5c_footer_slogan.svg",
    "heroSvgEn" => "/images/categories/1777205277_b4c5c60f_Sseninle_ayd__nlan__r_ruhum_ingilizce.svg",
    "heroSvgRu" => "/images/categories/1775633122_cbe9ffa2_rusca.svg",
    "philosophyQuote1" => "\"Sen benim hayatımı güzelleştiren biri değilsin;",
    "philosophyQuote1En" => "\"You are not someone who makes my life more beautiful;",
    "philosophyQuote1Ru" => "«Ты не тот, кто украшает мою жизнь —",
    "philosophyQuote2" => "hayatımı anlamlı kılan yerdesin.\"",
    "philosophyQuote2En" => "you are the place that gives my life its meaning.\"",
    "philosophyQuote2Ru" => "ты то, что наполняет её смыслом».",
    "philosophyText" => "Gözümün Nuru,\ndeğerini yitirmeyen bir yakınlıktan doğdu.\nRuhun penceresinden süzülen aydınlık bir bağdan…",
    "philosophyTextEn" => "The Light of My Eyes\nwas born from a closeness that never loses its value.\nFrom a luminous bond that filters through the window of the soul…",
    "philosophyTextRu" => "«Свет моих глаз»\nрождён из близости, не теряющей своей ценности.\nИз светлой связи, проникающей сквозь окно души…",
    "splitImage" => "/images/categories/1772005508_75556557_inci_kupe_gorsel.png",
    "splitTitle" => "Her detay\nbir bağ",
    "splitTitleEn" => "Every detail\na bond",
    "splitTitleRu" => "Каждая деталь —\nсвязь",
    "splitText1" => "Bu koleksiyondaki her parça,\nbirine duyulan saf sevginin,\nkoruma içgüdüsünün\nve vazgeçilmez olma hissinin manevi yansımasıdır.",
    "splitText1En" => "Every piece in this collection\nis a spiritual reflection of pure love for another,\nthe instinct to protect,\nand the feeling of being irreplaceable.",
    "splitText1Ru" => "Каждое изделие этой коллекции —\nдуховное отражение чистой любви к кому-то,\nинстинкта защиты\nи ощущения собственной незаменимости.",
    "splitText2" => "Her dokunuş, her detay;\nkoruyan, saran, tamamlayan emek harcanmış\nbir bağın izini taşır.",
    "splitText2En" => "Every touch, every detail\ncarries the mark of a bond\ncrafted with care that protects, embraces and completes.",
    "splitText2Ru" => "Каждое прикосновение, каждая деталь\nнесёт след связи,\nсозданной с заботой, которая защищает, обнимает и завершает.",
    "collectionTitle" => "Koleksiyonu Keşfet",
    "collectionTitleEn" => "Discover the Collection",
    "collectionTitleRu" => "Откройте коллекцию",
    "collectionSubtitle" => "Göz alıcı olmaktan öte;\nait olmak için…",
    "collectionSubtitleEn" => "Beyond being eye-catching;\nmade to belong…",
    "collectionSubtitleRu" => "Не для того, чтобы привлекать взгляды;\nа чтобы принадлежать…",
    "darkBgImage" => "/images/parallax-bg.jpg",
    "darkText1" => "Gösterişten ziyade,\nhissettirmeye odaklı tasarlandı.",
    "darkText1En" => "Designed to be felt\nrather than to be seen.",
    "darkText1Ru" => "Создано, чтобы прочувствовать,\nа не просто увидеть.",
    "darkText2" => "Han mücevherleri,",
    "darkText2En" => "Han jewellery",
    "darkText2Ru" => "Украшения Han",
    "darkText2Cursive" => "Sizinle anlam kazanır, Sizinle tamamlanır.",
    "darkText2CursiveEn" => "find their meaning with you, become complete with you.",
    "darkText2CursiveRu" => "обретают смысл рядом с вами, становятся целостными с вами.",
    "darkText3" => "Bu çok özel birinin hikâyesi…\nPeki Sen neresindesin?",
    "darkText3En" => "This is the story of someone truly special…\nAnd where are you in it?",
    "darkText3Ru" => "Это история кого-то особенного…\nА где в ней вы?",
    "ctaSmallTitle" => "Seçilmiş",
    "ctaSmallTitleEn" => "Carefully Selected",
    "ctaSmallTitleRu" => "Выбранное",
    "ctaTitle" => "Düşünülmüş ve Uzun Vadeli Bir Değer",
    "ctaTitleEn" => "Considered and Long-Lasting Value",
    "ctaTitleRu" => "Продуманная и долговечная ценность",
    "ctaSubtitle" => "Seçilmiş, düşünülmüş ve\nuzun vadeli bir değerin ifadesi",
    "ctaSubtitleEn" => "An expression of something carefully selected, thoughtfully considered\nand built to last.",
    "ctaSubtitleRu" => "Выражение тщательно выбранной, продуманной\nи долговечной ценности.",
];

$stmt = $db->prepare("UPDATE categories SET content = :content WHERE id = 6");
$stmt->execute([':content' => json_encode($nuru, JSON_UNESCAPED_UNICODE)]);
$results['gozumun_nuru'] = ['affected' => $stmt->rowCount(), 'content_len' => strlen(json_encode($nuru, JSON_UNESCAPED_UNICODE))];

// ---------------------------------------------------------------------------
// 4) HOMEPAGE CARDS
// ---------------------------------------------------------------------------
$cards = [
    4041 => ['title_en' => 'GIFTS', 'title_ru' => 'ПОДАРКИ', 'button_text_en' => 'DISCOVER', 'button_text_ru' => 'ОТКРЫТЬ'],
    4042 => ['title_en' => 'FOR MEN', 'title_ru' => 'ДЛЯ МУЖЧИН', 'button_text_en' => 'DISCOVER', 'button_text_ru' => 'ОТКРЫТЬ'],
    4043 => ['title_en' => 'CUSTOM DESIGN', 'title_ru' => 'ИНДИВИДУАЛЬНЫЙ ДИЗАЙН', 'button_text_en' => 'DISCOVER', 'button_text_ru' => 'ОТКРЫТЬ'],
    4044 => [
        'title_en' => 'PRELOVED', 'title_ru' => 'PRELOVED',
        'subtitle_en' => "Curated selections from authentic collections\nof international jewellery houses await you.",
        'subtitle_ru' => "Эксклюзивный выбор из подлинных коллекций\nмеждународных ювелирных брендов уже ждёт вас.",
        'button_text_en' => 'EXPLORE PRODUCTS', 'button_text_ru' => 'ПОСМОТРЕТЬ ИЗДЕЛИЯ',
    ],
    4045 => [
        'title_en' => 'BOOK AN APPOINTMENT', 'title_ru' => 'ЗАПИСАТЬСЯ НА ПРИЁМ',
        'subtitle_en' => "Book an appointment for a personal experience —\nwe look forward to welcoming you.",
        'subtitle_ru' => "Запишитесь на приём ради персонального опыта —\nмы будем рады вас принять.",
        'button_text_en' => 'BOOK NOW', 'button_text_ru' => 'ЗАПИСАТЬСЯ',
    ],
];

$cardResults = [];
foreach ($cards as $id => $fields) {
    $setParts = [];
    $params = [':id' => $id];
    foreach ($fields as $col => $val) {
        $setParts[] = "$col = :$col";
        $params[":$col"] = $val;
    }
    $sql = "UPDATE homepage_cards SET " . implode(', ', $setParts) . " WHERE id = :id";
    try {
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $cardResults[$id] = $stmt->rowCount();
    } catch (PDOException $e) {
        $cardResults[$id] = 'error: ' . $e->getMessage();
    }
}
$results['homepage_cards'] = $cardResults;

echo json_encode(['ok' => true, 'results' => $results], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
