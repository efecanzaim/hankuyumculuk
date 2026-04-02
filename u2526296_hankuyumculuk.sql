-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 01 Nis 2026, 14:34:12
-- Sunucu sürümü: 10.6.25-MariaDB
-- PHP Sürümü: 8.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `u2526296_hankuyumculuk`
--
CREATE DATABASE IF NOT EXISTS `u2526296_hankuyumculuk` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `u2526296_hankuyumculuk`;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `about_values`
--

DROP TABLE IF EXISTS `about_values`;
CREATE TABLE `about_values` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Değer başlığı (Zarafet, Kalite vb.)',
  `title_en` varchar(255) DEFAULT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL COMMENT 'Değer açıklaması',
  `description_en` text DEFAULT NULL,
  `description_ru` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL COMMENT 'Değer görseli',
  `sort_order` int(11) DEFAULT 0 COMMENT 'Sıralama',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `about_values`
--

INSERT INTO `about_values` (`id`, `title`, `title_en`, `title_ru`, `description`, `description_en`, `description_ru`, `image`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Zarafet', 'Elegance', 'Элегантность', 'Her tasarımımızda zarafeti ön planda tutuyoruz.', 'We prioritize elegance in every design.', 'Мы ставим элегантность на первое место в каждом дизайне.', '/images/pages/1771324911_1c67d0d4_han_zerafet_jpg.jpg', 1, 1, '2026-01-26 14:31:39', '2026-03-18 13:21:22'),
(2, 'Kalite', 'Quality', 'Качество', 'Sertifikalı pırlantalar ve en kaliteli malzemelerle çalışıyoruz.', 'We work with certified diamonds and the finest materials.', 'Мы работаем с сертифицированными бриллиантами и лучшими материалами.', '/images/pages/1771324986_4c237c81_han_kalite_jpg.jpg', 2, 1, '2026-01-26 14:31:39', '2026-03-18 13:21:22'),
(3, 'Özgünlük', 'Authenticity', 'Подлинность', 'Her mücevher, kendine özgü bir hikâye taşır.', 'Every jewel carries its own unique story.', 'Каждое украшение несёт свою уникальную историю.', '/images/pages/1771324999_4cd44b92_ozgunluk_jpg.jpg', 3, 1, '2026-01-26 14:31:39', '2026-03-18 13:21:22'),
(4, 'Güven', 'Trust', 'Доверие', 'Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temelidir.', 'The trust we build with our customers is the foundation of our work.', 'Доверие, которое мы строим с нашими клиентами — основа нашей работы.', '/images/pages/1771325009_c4488825_han_guven_jpg.jpg', 4, 1, '2026-01-26 14:31:39', '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `email`, `full_name`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2a$12$BZ1lntPuQoEaTNYmWU/n0.39twpJ7T12bl2meRjSZINzEPkURngMW', 'admin@hankuyumculuk.com', 'Admin', 1, '2026-04-01 09:29:37', '2026-01-21 15:30:29', '2026-04-01 09:29:37');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `customer_email` varchar(100) DEFAULT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `notes` text DEFAULT NULL,
  `status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `excerpt_en` text DEFAULT NULL,
  `excerpt_ru` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `content_en` longtext DEFAULT NULL,
  `content_ru` longtext DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `author` varchar(100) DEFAULT 'Han Kuyumculuk',
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `published_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `title_en`, `title_ru`, `slug`, `excerpt`, `excerpt_en`, `excerpt_ru`, `content`, `content_en`, `content_ru`, `image`, `author`, `status`, `created_at`, `updated_at`, `published_at`) VALUES
(1, 'Pırlanta Nedir? 3 Milyar Yıllık Işıltının ve Kusursuzluğun Hikayesi', NULL, NULL, 'pirlanta-nedir', 'Parmağınızdaki yüzüğe veya vitrindeki o kolyeye baktığınızda, aslında sadece şık bir aksesuara bakmıyorsunuz. O küçük ışıltılı taş, insanlık tarihinden, dinozorlardan ve hatta yeryüzündeki yaşamın pek çok formundan bile daha yaşlı. Bilimsel veriler, pırlantaların 1 ila 3 milyar yıl yaşında olduğunu söylüyor. Yüzyıllar boyunca kralların gücünü, aşıkların ise bağlılığını simgeleyen bu taş; doğanın sabrı ile insan ustalığının buluştuğu en nadide noktadır.', NULL, NULL, 'Parmağınızdaki yüzüğe veya vitrindeki o kolyeye baktığınızda, aslında sadece şık bir aksesuara bakmıyorsunuz. O küçük ışıltılı taş, insanlık tarihinden, dinozorlardan ve hatta yeryüzündeki yaşamın pek çok formundan bile daha yaşlı.\nBilimsel veriler, pırlantaların 1 ila 3 milyar yıl yaşında olduğunu söylüyor. Yüzyıllar boyunca kralların gücünü, aşıkların ise bağlılığını simgeleyen bu taş; doğanın sabrı ile insan ustalığının buluştuğu en nadide noktadır.\nPeki, kömürle aynı kimyasal aileden (karbon) gelen bu madde, nasıl oluyor da dünyanın en sert, en parlak ve en arzu edilen hazinesine dönüşüyor? İşte pırlantanın derinliklerden gelen hikayesi.\nPırlanta Nasıl Oluşur? Yerin 150 Kilometre Altındaki \"Ateşli\" Yolculuk\nPırlantanın hikayesi, yeryüzünün 150 kilometre kadar derinlerinde, \"manto\" adı verilen o karanlık ve sıcak tabakada başlar. Burada doğa, laboratuvarların bile taklit etmekte zorlandığı ekstrem koşullar yaratır:\n•	Sıcaklık: 1000°C\'nin üzerinde,\n•	Basınç: Yeryüzündekinin tam 50.000 katı.\nİşte bu muazzam baskı altında, saf karbon atomları birbirlerine kusursuz bir geometrik düzenle kenetlenir ve kristalleşir. Eğer bu basınç olmasaydı, o karbon sadece kalem ucunda kullandığımız yumuşak grafiti oluşturacaktı. Pırlanta, zorluklar altında mükemmelleşmenin doğadaki kanıtıdır.\nYeryüzüne ulaşmaları ise volkanik patlamalar sayesinde olur. \"Kimberlit\" adı verilen volkanik kayalarla hızla yukarı taşınan bu kristaller, soğuyarak keşfedilmeyi bekler.\nIşıltının Mühendisliği: Ham Elması Pırlantaya Dönüştüren \"Kesim\" Sanatı\nGenellikle madenden çıkan ham taşa \"Elmas\", onun işlenmiş ve parlatılmış haline \"Pırlanta\" denir. Ham taş, doğadan ilk çıktığında buzlu bir cama benzer; mat ve şekilsizdir. Onu büyüleyici kılan şey, üzerindeki kesim sanatıdır.\nPırlanta, ışığı içine hapsetmek ve onu bir gökkuşağı şöleni gibi (ateş) geri yansıtmak üzere tasarlanmış özel bir kesim şeklidir. Bir pırlantada genellikle 57 adet faset (açılı ayna yüzeyi) bulunur.\n•	Taç (Üst Kısım): Işığın girdiği penceredir.\n•	Külah (Alt Sivri Kısım): Işığın kırılıp yukarı, yani gözünüze geri döndüğü yerdir.\nBu kesim o kadar hassas bir matematik gerektirir ki, açılarda yapılacak mikronluk bir hata, taşın \"sönük\" görünmesine neden olur. Kusursuz kesilmiş bir pırlanta ise adeta canlı gibi parlar.\nNeden \"Sonsuzluk\" Simgesidir? Doğanın En Sert Maddesi Hakkında Bilmeniz Gerekenler\nPırlantanın evlilik tekliflerinin başrolünde olmasının sebebi, sadece maddi değeri değildir. Pırlanta, mineral sertliğini ölçen Mohs skalasında 10 üzerinden 10 alan, doğadaki en sert maddedir.\nOnu çizebilecek, aşındırabilecek veya parlaklığını soldurabilecek başka bir mineral yoktur. Bir pırlantayı ancak başka bir pırlanta kesebilir. Yüzyıllar geçse de eskimeyen, yıpranmayan ve ilk günkü ışıltısını koruyan bu yapısı, onu \"sonsuz sevgi\" ve \"yıkılmaz bağ\" için en mükemmel sembol yapar.\nBir Taştan Çok Daha Fazlası\nÖzetle pırlanta; yerin derinliklerinde milyarlarca yıl süren bir hazırlığın ve usta ellerde şekillenen hassas bir sanatın ürünüdür. Her pırlanta, tıpkı bir parmak izi gibi kendine has özellikler taşır ve eşsizdir.\nSiz de üzerinizde sadece bir mücevher değil, dünyanın oluşum sancılarına tanıklık etmiş, zamana meydan okuyan bir ışıltı taşıyorsunuz.\n', NULL, NULL, '/images/uploads/1770190151_778d3c75_pirlantanedir.jpg', 'Han Kuyumculuk', 'published', '2026-01-23 15:33:42', '2026-02-04 07:29:17', '2026-01-23 15:33:42'),
(2, 'Elmas ile Pırlanta Arasındaki Fark Nedir? Aynı Taş, Farklı Işıltı', NULL, NULL, 'elmas-ile-pirlanta-arasindaki-fark', 'Mücevher dünyasına adım attığınızda en sık duyduğunuz iki terim vardır: Elmas ve Pırlanta. Genellikle bu iki kelime birbirinin yerine kullanılsa da, aslında aralarında teknik ve görsel olarak çok önemli farklar bulunur. Bir yüzük veya kolye seçerken doğru kararı verebilmeniz için, bu iki kavram arasındaki ince çizgiyi sizin için netleştirdik. İşte elmas ve pırlanta arasındaki farklar ve bilmeniz gerekenler.', NULL, NULL, 'Mücevher dünyasına adım attığınızda en sık duyduğunuz iki terim vardır: Elmas ve Pırlanta. Genellikle bu iki kelime birbirinin yerine kullanılsa da, aslında aralarında teknik ve görsel olarak çok önemli farklar bulunur.\nBir yüzük veya kolye seçerken doğru kararı verebilmeniz için, bu iki kavram arasındaki ince çizgiyi sizin için netleştirdik. İşte elmas ve pırlanta arasındaki farklar ve bilmeniz gerekenler.\nTemelde İkisi de Aynı Maden midir?\nKısa cevap: Evet.\nBilimsel olarak bakıldığında elmas ve pırlanta aynı hammaddedir. Her ikisi de yerin kilometrelerce altında, yüksek basınç ve sıcaklıkla oluşan, dünyanın en sert madeni olan karbondur.\nAradaki fark, madenin kimyasında değil, işleniş biçiminde (kesiminde) yatar.\nBunu basit bir örnekle açıklayabiliriz: Elması \"kumaş\", pırlantayı ise o kumaştan dikilmiş \"modern bir elbise\" olarak düşünebilirsiniz. Yani elmas taşın ham ismiyken, pırlanta o taşın özel bir teknikle kesilmiş halidir. Ancak Türkiye’deki kuyumculuk terminolojisinde \"Elmas\" denildiğinde genellikle eski tip kesim (Elmas Kesim) kastedilir.\nPırlanta Nedir? Işıltının Mühendisliği\nPırlanta, ham elmas madeninin, ışığı en mükemmel şekilde yansıtmak üzere özel olarak kesilmesiyle elde edilir.\n1919 yılında Marcel Tolkowsky tarafından geliştirilen bu kesim tekniğinde, taşa tam 57 adet faset (açılı yüzey) kazandırılır. Bu fasetlerin amacı şudur: Taşın içine giren ışığı hapsedip, kendi içinde kırarak dışarıya muazzam bir \"ateş\" ve parıltı olarak geri yansıtmak.\nBugün evlilik tekliflerinin vazgeçilmezi olan o göz alıcı parlaklık, işte bu \"pırlanta kesim\" (Brilliant Cut) sayesinde oluşur. Pırlantanın alt kısmı sivridir (külah) ve ışığı yukarı doğru iter.\nElmas Kesim Nedir? Tarihin Derin İzleri\nHalk arasında \"Elmas\" olarak bilinen takılar ise aslında \"Gül Kesim\" (Rose Cut) adı verilen çok daha eski bir tekniktir.\nPırlantadan önceki dönemlerde, teknoloji henüz 57 fasetli kesime izin vermezken ustalar taşları daha düz ve sade bir şekilde işlerdi. \"Elmas kesim\" taşların altı düzdür, üst kısmı ise kubbe şeklindedir ve daha az faset içerir (genellikle 12 ila 24 arası).\nBu nedenle elmas kesim takılar, pırlanta gibi \"patlayan\" bir ışıltı vermez. Bunun yerine daha buğulu, gizemli ve loş bir parıltıya sahiptirler. Osmanlı döneminden kalan o nostaljik ve ağırbaşlı duruşun sırrı da budur.\nÖzetle: Elmas ve Pırlanta Arasındaki 3 Temel Fark\nKarar verirken göz önünde bulundurmanız gereken temel farklar şunlardır:\n1.	Işık Yansıması: Pırlanta, ışığı kırmak ve çok yüksek bir parlaklık vermek üzere tasarlanmıştır. Elmas kesim ise daha az parlar, daha sade ve otantik bir görünüm sunar.\n2.	Kesim Şekli: Pırlantanın altı sivridir ve yüzeyinde çok sayıda (57) kesik (faset) vardır. Elmas kesimin altı düzdür ve üst yüzeyi daha az işlenmiştir.\n3.	Montür Uyumu: Pırlantalar genellikle ışığı alabilmesi için tırnaklı ve açık montürlere yerleştirilir. Elmaslar ise tabanı düz olduğu için genellikle metalin içine gömülerek mıhlanır ve alt kısımları kapalıdır (genellikle \"foya\" tekniği kullanılır).\nHangisini Tercih Etmelisiniz?\nBu tamamen sizin stilinize ve kullanım amacınıza bağlıdır.\n•	Eğer modern, dikkat çekici ve ışıltısı yüksek bir görünüm arıyorsanız, tercihiniz kesinlikle Pırlanta olmalı. Özellikle tektaş yüzüklerde ve modern takı setlerinde pırlanta rakipsizdir.\n•	Eğer tarihi dokusu olan, antika görünümlü, nostaljik ve ağırbaşlı tasarımlardan hoşlanıyorsanız, Elmas kesim takılar sizin için eşsiz bir seçenek olacaktır.\n', NULL, NULL, '/images/uploads/1770190131_8b340196_elmasilepirlanta.jpg', 'Han Kuyumculuk', 'published', '2026-01-23 15:34:55', '2026-02-04 07:28:54', '2026-01-23 15:34:55'),
(3, 'Pırlanta Yüzük Alırken Nelere Dikkat Edilmeli? Kusursuz Seçim İçin 5 Adımlı Rehber', NULL, NULL, 'pirlanta-yuzuk-alirkan-nelere-dikkat-etmeli', 'Doğru Işıltıyı Bulma Sanatı Pırlanta yüzük seçmek, sıradan bir alışverişin çok ötesinde, duygusal değeri yüksek ve özen gerektiren bir süreçtir. Bu sadece bir mücevher değil; bir jest, bir söz ve genellikle bir ömür boyu saklanacak en özel anının sembolüdür. Ancak vitrinlerin ışıltısı arasında kaybolmak ve teknik terimler (karat, faset, montür) arasında kararsız kalmak oldukça doğaldır. Pek çok kişi, sadece \"büyük\" görünen bir taşa odaklanarak hata yapabilir. Oysa pırlantanın gerçek güzelliği, sadece boyutuyla değil, kalitesiyle ve parmağa yakışmasıyla ölçülür.', NULL, NULL, 'Doğru Işıltıyı Bulma Sanatı\nPırlanta yüzük seçmek, sıradan bir alışverişin çok ötesinde, duygusal değeri yüksek ve özen gerektiren bir süreçtir. Bu sadece bir mücevher değil; bir jest, bir söz ve genellikle bir ömür boyu saklanacak en özel anının sembolüdür.\nAncak vitrinlerin ışıltısı arasında kaybolmak ve teknik terimler (karat, faset, montür) arasında kararsız kalmak oldukça doğaldır. Pek çok kişi, sadece \"büyük\" görünen bir taşa odaklanarak hata yapabilir. Oysa pırlantanın gerçek güzelliği, sadece boyutuyla değil, kalitesiyle ve parmağa yakışmasıyla ölçülür.\nPeki, bütçenizi en verimli şekilde kullanarak o hayalinizdeki yüzüğü nasıl bulursunuz? İşte pırlanta alışverişine çıkmadan önce bilmeniz gereken, hata yapmanızı engelleyecek 5 altın kural.\n1. Pırlantanın Kimliği: 4C Kuralını Kendi Lehinize Çevirin\nPırlanta dünyasının evrensel dili olan 4C kuralını (Kesim, Karat, Renk, Berraklık) duymuşsunuzdur. Ancak burada önemli olan kuralları ezberlemek değil, hangisinin sizin için öncelikli olduğuna karar vermektir.\n•	Kesim (Cut): Işıltının anahtarıdır. Taş ne kadar büyük olursa olsun, kesimi kötüyse mat görünür. Canlı bir görünüm için kesim kalitesinden ödün vermemelisiniz.\n•	Renk (Color): Pırlantalar D (Tamamen renksiz) harfinden başlar. Ancak G ve H renkleri, çıplak gözle bakıldığında oldukça beyaz görünür ve fiyat avantajı sunar.\n•	Berraklık (Clarity): Doğal izlerdir. Mikroskopsuz görülmeyen (Eye-clean) yani VS veya SI kategorisindeki taşlar, hem bütçe dostudur hem de şık durur.\n2. Sertifika: Yüzüğünüzün \"Pasaportu\" Var mı?\nPırlanta alırken sormanız gereken en kritik soru şudur: \"Bu taşın sertifikası var mı?\"\nSertifika, satın aldığınız taşın özelliklerinin (karat, renk, berraklık vb.) bağımsız uzmanlarca onaylandığını gösteren belgedir. Özellikle uluslararası geçerliliği olan (HRD, GIA gibi) laboratuvar sertifikaları veya markanın kurumsal garanti sertifikası, taşın kimliğidir. Sertifikasız bir pırlanta, belirsiz bir yatırımdır; güvenli seçim her zaman sertifikalı olandır.\n3. Montür Seçimi: Taşı Gösteren \"Sahne\"\nSeçtiğiniz pırlanta oyunun başrolüyse, yüzüğün metal kısmı (montür) sahnedir. Doğru montür, taşı olduğundan daha büyük ve parlak gösterebilir.\n•	Tırnak Yapısı: 4 tırnaklı modeller taşı daha kare ve ferah gösterirken, 6 tırnaklı modeller daha yuvarlak bir form ve güvenli tutuş sağlar.\n•	Metal Rengi: Eğer seçtiğiniz pırlanta çok beyaz değilse (hafif sarımtırak tonlar içeriyorsa), sarı altın bir montür bu tonu gizleyerek taşın daha beyaz algılanmasını sağlar.\n4. Karat Büyüklüğü Her Şey Değildir\nEn sık yapılan hata, kaliteyi tamamen göz ardı edip sadece karatı (ağırlığı) yüksek tutmaya çalışmaktır. Unutmayın: Işıl ışıl parlayan 0.30 karatlık zarif bir tektaş, mat ve cansız duran 0.50 karattan çok daha etkileyici görünür.\nAyrıca parmak yapısı da önemlidir. İnce parmaklarda daha küçük karatlar bile oldukça dolgun ve ihtişamlı durabilir. Sadece rakamlara değil, yüzüğün parmaktaki duruşuna odaklanın.\n5. Dedektiflik Zamanı: Onun Tarzını ve Alışkanlıklarını Analiz Edin\nBelki de en önemli ama en çok atlanan madde budur. Alacağınız yüzük sadece vitrinde güzel durmamalı, kız arkadaşınızın veya eşinizin günlük yaşamına da uyum sağlamalıdır. Seçim yapmadan önce şu soruların cevabını mutlaka düşünün:\n•	Mevcut Takı Zevki: Şu an kullandığı takılara dikkat edin. Genellikle minimalist, zarif ve ince takılar mı kullanıyor; yoksa büyük, gösterişli ve \"ben buradayım\" diyen parçaları mı seviyor? Onun zevkine zıt bir seçim, yüzüğün kutuda kalmasına neden olabilir.\n•	Günlük Yaşam Rutini: Gün içinde ellerini çok sık kullandığı bir işi var mı? Eğer aktif bir yaşantısı varsa, taşı çok yüksekte tutan montürler bir yerlere takılabilir ve kullanımı zorlaştırabilir. Bu durumda daha alçak ve taşı saran (sivama) modeller çok daha konforlu olacaktır.\n•	Geçmiş İpuçları: Sizinle konuşurken beğendiği bir yüzük modelini gösterdi mi veya bir arkadaşının yüzüğü hakkında \"Çok kaba\" ya da \"Çok zarif\" gibi bir yorum yaptı mı? Bu küçük ipuçları, doğru modele giden en kestirme yoldur.\nİçinize Sinen Seçimi Yapın\nPırlanta yüzük alırken teknik detaylar yol göstericidir ama son kararı verdiren sizin gözlemleriniz ve hislerinizdir. Partnerinizin tarzını yansıtan, bütçenize uygun ve sertifikasıyla güven veren model, sizin için \"en doğru\" modeldir.\n', NULL, NULL, '/images/uploads/1770190114_8803f326_pirlantayuzukalirken.jpg', 'Han Kuyumculuk', 'published', '2026-01-23 15:36:06', '2026-02-04 07:28:37', '2026-01-23 15:36:06'),
(4, 'Yüzük Ölçüsü Gizlice Nasıl Alınır? (Sürpriz Bozmayan 7 Yöntem)', NULL, NULL, 'yuzuk-olcusu-gizlice-nasil-alinir-surpriz-bozmayan-7-yontem', 'Evlilik teklifi sürprizini bozmadan doğru yüzük ölçüsünü bulun! Profesyonel ve gizli 7 yöntemle kusursuz sona ulaşın.', NULL, NULL, 'Hayatınızın en unutulmaz sorusunu sormaya hazırlanıyorsunuz: \"Benimle evlenir misin?\" Planlar yapıldı, o göz alıcı pırlanta seçildi ama zihninizde tek bir soru işareti var: O yüzük o parmağa tam oturacak mı?\nEvlilik teklifi anının büyüsünü, parmağa dar gelen veya büyük gelen bir yüzükle bölmek istemezsiniz. Ancak \"Yüzük ölçün kaç?\" diye sormak da tüm sürprizi bir anda bozabilir. Profesyonel bir destek almadan önce, operasyonun gizliliğini koruyarak yüzük ölçüsü almanın en şık 7 yolunu sizin için derledik.\n________________________________________\n1. Mevcut Bir Yüzüğü \"Referans\" Alın\nEn klasik ve güvenilir yöntem budur. Sevgilinizin hali hazırda sağ veya sol yüzük parmağına taktığı bir yüzüğü kısa süreliğine ödünç alın.\n•	Profesyonel İpucu: Yüzüğü bir kağıdın üzerine koyup iç halkasını ince uçlu bir kalemle çizin. Bu çizim, uzman bir kuyumcunun doğru ölçüyü milimetrik olarak hesaplaması için yeterli olacaktır.\n2. Ortak Bir Arkadaştan Destek Alın\nEn yakın arkadaşların bilmediği sır yoktur. Eğer sevgilinizin yüzük ölçüsünü bilmiyorsa bile, onu \"tesadüfen\" bir alışveriş gezisinde takı bakmaya ikna edebilir. \"Şu modelin benim parmağımdaki duruşuna bir baksana, senin parmağında nasıl durur?\" diyerek yapılan bir deneme, size doğru ölçüyü altın tepside sunar.\n3. Kendi Parmağınızla Kıyaslama Yapın\nEğer yüzüğü yanınızda götürme şansınız yoksa, sevgilinizin yüzüğünü kendi parmaklarınızdan birine takın. Yüzüğün parmağınızda tam olarak nereye kadar geldiğini bir kalemle işaretleyin. Bu yöntem, profesyonel bir ölçüm cihazı kadar olmasa da oldukça yakın bir sonuç verir.\n4. \"Aile Hediyesi\" Bahanesini Kullanın\n\"Kız kardeşime veya anneme bir doğum günü hediyesi alacağım, senin parmağın onunkine çok benziyor, bir dener misin?\" cümlesi, yüzyıllardır çalışan en masum taktiğidir. Bu sayede hem zevkini hem de ölçüsünü doğal bir şekilde öğrenmiş olursunuz.\n5. Görsel Kanıtlardan Yararlanın\nBirlikte çekildiğiniz fotoğraflara daha yakından bakın. Ellerinin göründüğü net bir fotoğraf, uzman bir gözün (kuyumcunuzun) tahmin yürütmesine yardımcı olabilir. Özellikle el ele tutuştuğunuz bir karede, parmak kalınlıklarını kıyaslamak iyi bir ipucudur.\n6. Kağıt ve Kalem İle Hızlı Çizim\nEğer evdeki takı kutusuna erişiminiz varsa, en sık kullandığı yüzüğün iç çemberini bir kağıda aktarın. Dikkat etmeniz gereken nokta, yüzüğün yamuk durmaması ve çizimin tam halka şeklinde olmasıdır.\n7. Standart Ölçü ve Tadilat Güvencesi\nEğer hiçbir şekilde risk almak istemiyorsanız, genel ortalamaya güvenebilirsiniz. Çoğu marka, evlilik teklifi sonrası ücretsiz ölçü ayarlama hizmeti sunar. Biraz büyük bir ölçü alıp o büyülü andan sonra birlikte gelerek tam ölçüye getirtmek, en garantili yoldur.\n________________________________________\nKüçük Bir Tavsiye: Sol El ve Sağ El Farkı\nUnutmayın, sağ ve sol el parmak ölçüleri genellikle birbirinden bir numara farklı olabilir. Ülkemizdeki geleneklere göre evlilik teklifi sonrası yüzük genellikle sağ elin yüzük parmağına takılır, evlilikle birlikte sol ele geçer. Ölçü alırken sevgilinizin yüzüğü hangi elinde kullanmayı tercih ettiğine dikkat etmek, o büyülü anın konforunu artıracaktır.\n', NULL, NULL, '/images/uploads/1771589479_31991ad7_Y__z__k___l____s___Blog_Foto.png', 'Han Kuyumculuk', 'published', '2026-02-20 12:25:41', '2026-02-20 12:25:41', '2026-02-20 12:25:41'),
(5, 'Renkli Pırlantalar: \"Fancy\" Taşların Dünyasına Giriş', NULL, NULL, 'renkli-pirlanta-rehberi', 'Doğanın milyonlarca yıllık mirası “Fancy” pırlantalarla tanışın; nadir renklerin büyüleyici ışıltısını keşfedin.', NULL, NULL, 'Çoğumuz pırlantayı \"ne kadar renksizse o kadar iyidir\" kuralıyla tanırız. Ancak mücevher dünyasının gizli bir kapısı vardır ki, orada kurallar tamamen değişir. Standart D-Z renk skalasının bittiği yerde başlayan bu dünyaya hoş geldiniz: Fancy Color Diamonds.\nDoğanın milyonlarca yılda, içine bir tutam bor, azot veya yoğun basınç ekleyerek hazırladığı bu \"renkli mucizeler\", sadece bir takı değil, yeryüzünün parmak izleridir. Peki, bir pırlantayı \"fancy\" yapan nedir ve bu renkler nereden gelir?\nBeyazın Ötesi: Bir Pırlanta Nasıl Renklenir?\nStandart beyaz pırlantalarda sarımsı bir ton \"kusur\" kabul edilirken, renkli pırlantalarda bu durum bir \"karakter\" haline gelir. Renkler, pırlantanın oluşum sürecindeki küçük \"kazalar\" sonucu ortaya çıkar:\n•	Sarı (Canary): Pırlantanın yapısındaki azot atomları sayesinde oluşur. Güneşi andıran tonlarıyla en sevilen fancy türüdür.\n•	Mavi: İçerideki bor elementinin eseridir. Okyanusun derinliklerini hatırlatan bu taşlar inanılmaz nadirdir.\n•	Pembe ve Kırmızı: Diğerlerinin aksine bir elementten değil, pırlantanın kristal kafes yapısındaki yoğun basınç sonucu oluşur. Kırmızı, dünyanın en nadir pırlanta rengidir.\n•	Yeşil: Radyasyonun (tamamen doğal!) taşın kristal yapısını değiştirmesiyle o eşsiz rengini alır.\nFancy Skalası: Rengin Gücü\nBeyaz pırlantalarda berraklık ön plandayken, renkli pırlantalarda tek bir kral vardır: Rengin yoğunluğu. Uzmanlar bu taşları şu şekilde derecelendirir:\n1.	Fancy Light: Hafif, pastel bir ton.\n2.	Fancy: Belirgin ve dengeli bir renk.\n3.	Fancy Intense: Göz alıcı ve doygun.\n4.	Fancy Vivid: Renkli pırlanta dünyasının zirvesi; en canlı, en \"patlayan\" ton.\nBiliyor muydunuz? Her 10.000 beyaz pırlantadan sadece 1 tanesi \"fancy\" kategorisine girecek kadar renk yoğunluğuna sahiptir.\nHangi Renk Sizi Yansıtıyor?\nMücevher seçiminde renkler, kişiliğinizin bir yansımasıdır.\n•	Sarı pırlantalar; neşe, enerji ve optimizmi temsil eder.\n•	Pembe pırlantalar; romantizm ve zarafetin en sofistike halidir.\n•	Mavi pırlantalar; dinginlik ve asalet arayanların tercihidir.\n•	Siyah pırlantalar; ise modern, maskülen ve gizemli bir stilin anahtarıdır.\n________________________________________\nBir \"fancy\" pırlanta seçerken dikkat edilmesi gereken en kritik nokta, taşın sertifikasında \"Natural\" ibaresini aramaktır. Bu ibare, o büyüleyici rengin laboratuvar müdahalesiyle değil, tamamen doğa ana tarafından taşın kalbine işlendiğini kanıtlar.\nRenkli pırlantalar, klasik olanın dışına çıkmak ve doğanın en nadir sanat eserlerinden birini üzerinde taşımak isteyenler için unutulmaz bir yolculuktur. Işıltınızın rengi ne olursa olsun, önemli olan onun sizin hikayenizi anlatmasıdır.\n', NULL, NULL, '/images/uploads/1772182134_0df8b9b3_An_ultraluxury_editorial_scene_inspired_by_nature__delpmaspu.jpg', 'Han Kuyumculuk', 'published', '2026-02-27 08:49:34', '2026-02-27 08:49:34', '2026-02-27 08:49:34'),
(7, '2026 Yaz Düğünlerinde Pırlanta: Işıltının Yeni Modası', NULL, NULL, '2026-yaz-dugunlerinde-pirlanta-isiltinin-yeni-modasi', '2026 Yazı: Pırlanta, iddialı renklerle yeniden doğuyor. Özel tasarım mücevher ve elbiselerin en şık buluşması.', NULL, NULL, 'Yaz düğünleri her zaman romantizmin doruk noktasıdır; ancak 2026 yazı, pırlantayı o bildiğimiz \"mesafeli\" kalıplarından çıkarıp podyumların cesur diliyle yeniden tanımlıyor. Bu sezon, vitrinlerdeki seri üretim parçaların yerini, bir sanat galerisinden fırlamışçasına özgün ve hikayesi olan özel tasarım parçalar alıyor. Eğer bu yaz bir \"evet\"e hazırlanıyorsanız veya o büyülü gecenin en şık davetlisi olmayı hedefliyorsanız, mücevher kutunuzda radikal bir değişime hazır olun.\nPodyumdan Teninize: Elbiselerin Renk Harmonisi\n2026 yaz düğünlerinde elbiseler, doğanın en saf ve en iddialı tonlarını bir araya getiriyor. Bu sezonun renk paletinde \"tereyağı sarısı\" (butter yellow), \"tozlu lavanta\" ve \"adaçayı yeşili\" gibi yumuşak ama karakterli tonlar hakimiyet kuruyor. Bu pastel şıklık, pırlantanın beyaz ışığını nötrlemek yerine onu daha da parlatıyor. Özellikle adaçayı yeşili bir ipek elbiseyi, içinde yeşil pırlanta (teal) dokunuşları olan bir kolye ile tamamlamak, sezonun en rafine stil hamlesi. Daha cesur bir görünüm içinse \"yakut kırmızısı\" ve \"elektrik mavisi\" gibi doygun renkler ön planda; bu iddialı elbiseler, pırlantanın şeffaf zarafetiyle dengelenerek kusursuz bir kontrast yaratıyor.\nIşıltının Yeni Paleti: Şampanya ve Konyak Esintisi\nPırlantada \"renksiz kusursuzluk\" kuralı, 2026’da yerini büyüleyici bir renk karnavalına bırakıyor. Bu yazın stil kodlarında, gün batımının sıcaklığını taşıyan şampanya ve konyak tonlu pırlantalar başrolde. Özellikle sezonun favorisi olan \"rose-gold\" ve şeftali tonlu saten elbiselerle kusursuz bir uyum yakalayan bu sıcak pırlantalar, tende adeta eriyen modern bir lüks algısı yaratıyor. Renk artık sadece bir detay değil; mücevherin tam kalbinde yer alan ve kıyafetinizin tonuyla dans eden ana kahraman.\nKlasiğin Rönesansı: \"Minimalist İhtişam\"\n2026’da klasik pırlanta aksesuarlar bir \"Rönesans\" yaşıyor ama çok daha rafine bir dille. Geleneksel ve ağır setlerin yerini, mimari formların hakim olduğu bir zarafet alıyor. Özel tasarımın gücü tam burada devreye giriyor: Bir yanda damla kesim pırlantanın romantizmi, diğer yanda baget kesimin keskin ve modern hatları aynı küpede buluşarak ezber bozuyor. Bilekliklerde ise o meşhur \"su yolu\" dizimleri, aralara serpiştirilen farklı boyutlardaki taşlarla daha dinamik bir ritme kavuşuyor. Klasik pırlanta bu yaz artık daha özgür, daha kuralsız ve kesinlikle daha heyecan verici.\nStil Editöründen Notlar: Akışkan Formlar ve Kişisel İmzalar\nBu sezon aksesuar seçimi, kıyafetin bir tamamlayıcısı değil, odak noktasının ta kendisi. Boyun çizgisinden sırt dekoltesine süzülen pırlanta zincirler, omuz hattını vurgulayan asimetrik küpeler ve parmaklarda katmanlı bir hikaye anlatan çoklu yüzükler... 2026 yaz gelinleri ve davetlileri için \"az ama öz\" felsefesi, yerini \"karakterli ve özgün\" duruşa bırakıyor. Pırlantanın zamansız ışıltısını sezonun moda renkleriyle harmanlayarak, sıradan bir aksesuarı nesiller boyu taşınacak bir stil mirasına dönüştürmek sizin elinizde. Unutmayın; gerçek lüks, taşın karatında değil, onun elbisenizin ruhuyla nasıl bütünleştiğinde gizlidir.\n', NULL, NULL, '/images/uploads/1773043409_947416e8_blog_g__rsel__2_.jpg', 'Han Kuyumculuk', 'published', '2026-03-06 13:35:58', '2026-03-09 08:03:31', '2026-03-06 13:35:58'),
(8, 'Pırlantanın Astrolojik Sırrı: Enerjisi Burcunuza Uygun mu?', NULL, NULL, 'pirlantanin-astrolojik-sirri-enerjisi-burcunuza-uygun-mu', 'Burcunuza göre hangi pırlanta enerjinizi dengeler? Kesim ve renkleri keşfedin, tarzınızı öğrenin.', NULL, NULL, 'Pırlantalar, zarafetin ve lüksün ötesinde, burç enerjilerini dengeleyen özel taşlardır. Her burcun kendine özgü karakteri, sevdiği renkler ve takı tercihleri vardır. Doğru pırlanta seçimi, hem ruhsal enerjinizi hem de stilinizi güçlendirebilir. İşte burçlara göre uygun pırlanta kesimi, rengi ve enerjisi:\nKoç (21 Mart – 19 Nisan)\nKoçlar cesur, girişken ve lider ruhludur. Hızlı karar vermeyi sever ve hareketli bir yaşam tarzına sahiptir. Yuvarlak kesim pırlantalar, bu enerjiyi dengeler ve dikkat çekici bir şıklık sağlar. Parlak beyaz taşlar Koç’un ateş elementini güçlendirirken, yüzük ve kolye gibi enerjik aksesuarları tercih ederler.\nBoğa (20 Nisan – 20 Mayıs)\nBoğalar sabırlı, kararlı ve güven arayışındadır. Maddi ve estetik değerlere önem verirler. Oval veya yastık kesim pırlantalar, sakin ve dengeli enerji verir. Şampanya veya krem tonları, Boğa’nın toprak enerjisiyle uyumlu olur. Minimalist ama şık kolye ve küpeler bu burç için idealdir.\nİkizler (21 Mayıs – 20 Haziran)\nİkizler meraklı, esnek ve sosyal bir burçtur. Yeni şeyler denemeyi sever ve tarzlarını sıkça değiştirirler. Princess veya zümrüt kesim taşlar, yaratıcılıklarını besler ve enerjilerini dengeler. Açık sarı veya pastel ton pırlantalar, hem gündelik hem özel takılarda uygundur.\nYengeç (21 Haziran – 22 Temmuz)\nDuygusal, koruyucu ve sezgisel Yengeçler, aile ve yakın çevreye önem verir. Kalp kesim pırlantalar, burcun duygusal derinliğini destekler. Açık pembe veya beyaz taşlar, Yengeç’in su elementini dengeler. Zarif ve anlamlı takıları, özellikle kolye ve yüzükleri tercih ederler.\nAslan (23 Temmuz – 22 Ağustos)\nAslan burcu gösterişli, özgüvenli ve yaratıcıdır. Dikkat çekmekten hoşlanır. Markiz veya oval kesim pırlantalar, Aslan’ın enerjisini artırır. Altın tonları veya beyaz pırlantalar, ateş elementini destekler. Büyük ve gösterişli takılar, bu burç için favoridir; özellikle yüzük ve bileklikler.\nBaşak (23 Ağustos – 22 Eylül)\nTitiz, analitik ve mükemmeliyetçi Başaklar, düzen ve sadeliğe önem verir. Yuvarlak veya zümrüt kesim pırlantalar, odaklanmayı artırır ve stresi azaltır. Berrak beyaz taşlar, toprak elementine uyum sağlar. Küçük, zarif ve klasik takıları günlük hayatta tercih ederler.\nTerazi (23 Eylül – 22 Ekim)\nTeraziler estetik, uyumlu ve sosyal ilişkileri önemseyen bir burçtur. Princess kesim pırlantalar, denge ve güzellik enerjilerini destekler. Açık mavi veya beyaz taşlar, ruhsal ve sosyal uyumu artırır. Takı olarak kolye ve küpeyi özenle seçer, stilinde zarafeti ön plana çıkarırlar.\nAkrep (23 Ekim – 21 Kasım)\nTutkulu, gizemli ve derin duygulara sahip Akrepler, yoğun enerjisiyle dikkat çeker. Yuvarlak veya damla kesim pırlantalar, dönüşüm ve tutku enerjilerini dengeler. Derin mavi veya siyah ton taşlar, Akrep’in su elementini güçlendirir. Minimal ama etkileyici yüzük ve kolyeler tercih ederler.\nYay (22 Kasım – 21 Aralık)\nÖzgür ruhlu, maceraperest ve iyimser Yaylar, yeni deneyimlere açıktır. Cushion veya oval kesim pırlantalar, enerjilerini dengeler ve motivasyonlarını artırır. Açık sarı veya beyaz taşlar, ateş elementine uyumludur. Enerjik ve hareketli yaşamlarına uygun kolye ve bileklikler idealdir.\nOğlak (22 Aralık – 19 Ocak)\nDisiplinli, kararlı ve sorumluluk sahibi Oğlaklar, uzun vadeli hedeflere odaklanır. Baget kesim pırlantalar, odaklanmayı artırır ve kararlılık enerjisini destekler. Krem veya beyaz taşlar, toprak elementine uyumlu sakinlik sağlar. Klasik ve kaliteli takıları, özellikle yüzük ve kolye tercih ederler.\nKova (20 Ocak – 18 Şubat)\nYenilikçi, özgür ruhlu ve sıra dışı Kova burçları, farklı fikir ve tarzlarıyla öne çıkar. Asimetrik veya marquise kesim pırlantalar, yaratıcı enerjilerini besler. Açık mavi veya gri taşlar, hava elementine uyumludur. Modern ve farklı tasarımlı takıları severler; özellikle kolye ve küpelerde yenilikçi detaylar hoşlarına gider.\nBalık (19 Şubat – 20 Mart)\nDuygusal, hayalperest ve sezgisel Balıklar, ruhsal bağlantılara önem verir. Kalp veya yuvarlak kesim taşlar, sezgisel ve duygusal enerjilerini güçlendirir. Açık mavi, lavanta veya beyaz taşlar, su elementini destekler. Zarif ve romantik takılar, özellikle kolye ve ince yüzükler, bu burç için idealdir.\n', NULL, NULL, '/images/uploads/1773308388_1e297323_P__rlantan__n_Astrolojik_S__rr___Enerjisi_Burcunuza_Uygun_mu.jpg', 'Han Kuyumculuk', 'published', '2026-03-12 09:42:19', '2026-03-12 09:42:19', '2026-03-12 09:42:19'),
(9, 'Nisan Ayı Doğum Taşı Nedir? Pırlantanın Büyüleyici Sırrı ve Hediye Rehberi', NULL, NULL, 'nisan-ayi-dogum-tasi-nedir-pirlantanin-buyuleyici-sirri-ve-hediye-rehberi', 'Nisan ayının doğum taşı pırlanta ile baharın enerjisini yakalayın. Sevdiklerinize sonsuz bir ışıltı hediye edin.', NULL, NULL, 'Baharın ve Sonsuzluğun Simgesi: Nisan Ayı Doğum Taşı Pırlanta\nDoğanın uyandığı, renklerin yeniden canlandığı ve umudun tazelendiği bahar aylarının kalbi Nisan, astrolojik ve gemolojik olarak yılın en ayrıcalıklı aylarından biridir. Çünkü Nisan ayının doğum taşı, yeryüzünün en değerli ve en büyüleyici taşı olan pırlantadır.\nEğer siz de bir Nisan doğumluysanız veya hayatınızdaki o özel Nisan doğumluya unutulmaz bir hediye arıyorsanız, pırlantanın kusursuz dünyasına daha yakından bakmanın tam zamanı.\nPırlantanın Anlamı ve Tarihsel Büyüsü\nPırlantanın hikayesi, milyarlarca yıl öncesine, dünyanın derinliklerine dayanır. İsmini Yunanca \"fethedilemez\" veya \"kırılmaz\" anlamına gelen adamas kelimesinden alan bu eşsiz taş, tarih boyunca gücün, cesaretin ve yenilmezliğin sembolü olmuştur.\nIşığı kusursuz bir şekilde yansıtma özelliği (ateş ve parıltı), pırlantayı karanlığı aydınlatan bir umut ışığı olarak konumlandırmıştır. Günümüzde ise pırlanta, sarsılmaz bağların, saf sevginin ve sonsuzluğun en zarif temsilcisidir.\nNisan Doğumlular İçin Neden En Mükemmel Hediye?\nDoğum taşları, sadece takı kutusunda duran aksesuarlar değildir; kişinin karakterini, enerjisini ve aurasını yansıtan kişisel tılsımlardır. Nisan ayının dinamik (Koç) ve estetik (Boğa) enerjilerini taşıyanlar için pırlanta, harika bir tamamlayıcıdır.\n•	Netlik ve Denge: Pırlanta, zihinsel berraklığı ve içsel dengeyi sembolize eder. Nisan doğumluların kararlı ve yenilikçi ruhunu destekler.\n•	Kişiselleştirilmiş Lüks: Her pırlanta parmak izi gibi benzersizdir. İçerisindeki doğal izler (inklüzonlar), tıpkı hediye ettiğiniz kişinin benzersiz karakteri gibidir.\n•	Zamansızlık: Pırlanta sadece belirli bir yaşın veya trendin değil, her dönemin mücevheridir. Nesilden nesile aktarılabilecek bir mirastır.\nNisan Ayına Özel Hediye Seçim Rehberi\nPırlanta denildiğinde akla ilk olarak evlilik teklifleri gelse de, Nisan ayı bu kuralı esnetmek için harika bir bahanedir. Kendi ışıltınızı kutlamak veya sevdiklerinizi şımartmak için tercih edebileceğiniz bazı favori tasarımlar:\n•	Zarif Pırlanta Kolyeler: Günlük şıklığın vazgeçilmezi olan tektaş veya su damlası formundaki pırlanta kolyeler, \"her an teninde taşıyabileceği\" anlamlı bir doğum günü hediyesidir.\n•	Renkli Taş ve Pırlanta Uyumu: Baharın ruhunu yansıtmak isteyenler için zümrüt, safir veya yakut gibi renkli taşların pırlanta halesiyle çevrelendiği vintage esintili yüzükler harika bir alternatiftir.\n•	Su Yolu Bileklikler (Tennis Bracelet): Gündüzden geceye her stile uyum sağlayan su yolu bileklikler, Nisan doğumlu kadınların mücevher koleksiyonundaki en güçlü parçalardan biri olmaya adaydır.\n•	Minimalist Küpeler: İster baget kesim ister klasik yuvarlak kesim olsun, pırlanta çivi küpeler yüzü aydınlatan en zarif dokunuştur.\nKendi Işıltınızı Keşfedin\nNisan ayının getirdiği bu eşsiz ışıltıyı üzerinizde taşımak sadece bir doğum günü kutlaması değil, aynı zamanda kendinize verdiğiniz değerin de bir göstergesidir.\nSiz de bu Nisan ayında, sonsuzluğun ve bahar enerjisinin simgesi olan pırlanta ile tanışmak için koleksiyonlarımızı keşfedebilir, tarzınıza en uygun ışıltıyı bulabilirsiniz. Unutmayın; en değerli mücevher, sizin hikayenizi anlatan mücevherdir.', NULL, NULL, '/images/uploads/1774338879_24ef852d_Nisan_Ay___Do__um_Ta_____jpg.jpg', 'Han Kuyumculuk', 'published', '2026-03-17 12:27:07', '2026-03-24 07:54:40', '2026-03-17 12:27:07'),
(10, '2026 Anneler Günü Ne Zaman ve Anneye Alınacak Hediyeler', NULL, NULL, '2026-anneler-gunu-ne-zaman-ve-anneye-alinacak-hediyeler', 'Anneler Günü her yıl Mayıs ayının ikinci pazarı kutlanır. 2026\'da bu özel gün 10 Mayıs Pazar günüdür.', NULL, NULL, 'Her yıl mayıs ayının ikinci pazar günü kutlanan bu anlamlı gün, baharın en taze ve güzel müjdecilerinden biridir. Şimdiden planlamalara başlamak isteyen ve arama motorlarında sıkça 2026 anneler günü ne zaman sorusunun yanıtını arayanlar için takvimlerin bu yıl 10 Mayıs 2026 Pazar gününü gösterdiğini hemen belirtelim. Baharın tam kalbine denk gelen bu güzel günde, hayatımızın en değerli varlıklarına olan sevgimizi göstermek için hazırlıklara başlamanın tam vakti.\nPeki, bizi koşulsuz seven, her düştüğümüzde elimizden tutan bu muazzam insanlara duygularımızı en doğru şekilde nasıl ifade edebiliriz?\nHediye Seçerken Neden Bu Kadar Kararsız Kalıyoruz?\nKonu anneye alınacak hediyeler olduğunda genellikle işin içinden çıkamıyor ve en sonunda evin ortak bir ihtiyacına yöneliyoruz. Çok beğendiği o kahve makinesi veya şık bir mutfak aleti ilk etapta iyi bir fikir gibi gelebilir. Ancak burada küçük ve naif bir detayı hatırlamakta fayda var: Ev eşyaları, doğası gereği ailenin tüm fertlerine hizmet eden ortak kullanım araçlarıdır. Bunu, Babalar Günü\'nde babanıza hediye olarak bir tornavida seti veya matkap almaya benzetebiliriz; evet işe yarar ama o güne has, kişisel ve özel dokunuştan biraz yoksundur.\nAnnelerimiz bu pazar gününde \"evin yöneticisi\" rolünden sıyrılıp sadece \"kendisi\" olarak şımartılmayı sonuna kadar hak ediyor.\nAnneye Alınabilecek Kişisel ve Anlamlı Alternatifler\nOnu gerçekten özel hissettirmek için öncelikle tamamen ona ait olacak deneyimlere veya kişisel ilgi alanlarına yönelebilirsiniz. Örneğin:\n•	Birlikte gideceğiniz güzel bir tiyatro oyunu veya konser bileti,\n•	Tüm gün sürecek, yorgunluğunu atacağı rahatlatıcı bir spa deneyimi,\n•	Uzun zamandır denemek istediği bir hobi (seramik, resim veya aşçılık) atölyesi,\n•	En güzel aile fotoğraflarınızdan oluşan, kendi ellerinizle hazırladığınız el yapımı bir albüm.\nBu tarz hediyeler ona sadece bir eşya değil, gülümseyerek hatırlayacağı harika anılar verecektir.\nKalıcı Bir Hatıra Bırakma İsteğinin Psikolojisi\nTüm bu güzel deneyimlerin ve anıların yanında, insan psikolojisi sevdiklerine duyduğu o yoğun minnet duygusunu zamana meydan okuyan, kalıcı bir fiziksel nesneyle somutlaştırmak ister. Birlikte geçirilen bir gün biter, kıyafetler eskir, en güzel çiçekler bile birkaç gün içinde solar. İnsan zihni, tıpkı annesinin sevgisi kadar dayanıklı, biz yanında olmasak bile ona her baktığında bizi hatırlatacak bir \"zaman kapsülü\" arayışına girer.\nKöklü aile geleneklerinde annelerden çocuklara dayanıklı objelerin geçmesinin asıl nedeni de tam olarak budur: \"Sana olan sevgim bu nesne kadar sağlam, dirençli ve kalıcı.\"\nZamanın Ötesinde Bir Teşekkür: Pırlanta Zarafeti\nİşte pırlantanın derin duygusal anlamı tam da bu kalıcılık isteğinde saklıdır. Yerin kilometrelerce altında, inanılmaz bir sabırla ve milyonlarca yılda oluşan pırlanta; bir annenin bitmek bilmeyen şefkatini, sabrını ve emeğini andırır. Doğada hiçbir pırlanta bir diğerinin aynısı değildir; tıpkı annelerimizin kalbimizdeki eşsiz ve tek yeri gibi.\nOna alacağınız pırlanta bir mücevher; nesiller boyu saklanacak duygusal bir hatıra, sevginizin sarsılmaz bir sembolüdür. Bu 10 Mayıs\'ta annenize \"Zaman geçse de sana olan sevgim hiç eksilmeyecek\" demek isterseniz, ev eşyalarından uzaklaşıp sadece onun ruhuna hitap edecek şu ışıltılı seçenekleri değerlendirebilirsiniz:\n•	Sonsuzluk Temalı Tasarımlar: Annenizin koşulsuz sevgisinin bir sınırı veya sonu yoktur. Sonsuzluk döngüsüyle tasarlanmış kolyeler, aranızdaki bağın bitmez tükenmez doğasını simgeler.\n•	Nesiller Boyu Akan Sevgi (Suyolu Bileklikler): Yan yana özenle dizilmiş taşlarıyla bir ailenin kesintisiz akışını temsil eder. Bileğinde zarifçe dururken, ona her an ailenizin kopmaz bağlarını hatırlatacaktır.\n•	Zamanın Durduğu An (Klasik Tektaş): \"Sen benim hayatımdaki tek ve en eşsiz insansın\" mesajını vermenin en asil yoludur. Günlük kullanıma uygun sadeliği sayesinde anneniz bu hatırayı her an teninde taşıyabilir.\n•	Geçmişle Geleceğin Bağı (İncili Tasarımlar): İncinin nostaljik dokusuyla pırlantanın sarsılmaz ışığını birleştiren mücevherler, özellikle klasikleşmiş zarafeti seven anneler için paha biçilemez bir anı olacaktır.\nHediyeniz ne olursa olsun, 10 Mayıs Pazar sabahı ona verebileceğiniz en kıymetli şeyin sımsıkı bir sarılma ve gözlerinin içine bakarak söyleyeceğiniz içten bir söz olduğunu unutmayın. Şimdiden tüm annelerimizin Anneler Günü kutlu olsun!\n', NULL, NULL, '/images/uploads/1774353947_6cebf63e_anneler_g__n___2026_jpg.jpg', 'Han Kuyumculuk', 'published', '2026-03-24 12:06:16', '2026-03-24 12:06:16', '2026-03-24 12:06:16');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `parent_type` enum('mucevher','koleksiyon','hediye','erkek','preloved','yatirim','ozel_tasarim') NOT NULL COMMENT 'Ana kategori türü',
  `name` varchar(100) NOT NULL COMMENT 'Kategori adı',
  `name_en` varchar(100) DEFAULT NULL,
  `name_ru` varchar(100) DEFAULT NULL,
  `slug` varchar(100) NOT NULL COMMENT 'URL için slug',
  `hero_image` varchar(255) DEFAULT NULL COMMENT 'Kategori hero görseli',
  `hero_title` varchar(255) DEFAULT NULL COMMENT 'Hero başlık',
  `hero_title_en` varchar(255) DEFAULT NULL,
  `hero_title_ru` varchar(255) DEFAULT NULL,
  `hero_subtitle` varchar(255) DEFAULT NULL COMMENT 'Hero alt başlık',
  `hero_subtitle_en` varchar(255) DEFAULT NULL,
  `hero_subtitle_ru` varchar(255) DEFAULT NULL,
  `hero_description` text DEFAULT NULL COMMENT 'Hero açıklama metni',
  `content` longtext DEFAULT NULL,
  `hero_description_en` text DEFAULT NULL,
  `hero_description_ru` text DEFAULT NULL,
  `list_title` varchar(255) DEFAULT NULL COMMENT 'Ürün listesi başlığı',
  `list_title_en` varchar(255) DEFAULT NULL,
  `list_title_ru` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `categories`
--

INSERT INTO `categories` (`id`, `parent_type`, `name`, `name_en`, `name_ru`, `slug`, `hero_image`, `hero_title`, `hero_title_en`, `hero_title_ru`, `hero_subtitle`, `hero_subtitle_en`, `hero_subtitle_ru`, `hero_description`, `content`, `hero_description_en`, `hero_description_ru`, `list_title`, `list_title_en`, `list_title_ru`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'mucevher', 'Yüzük', 'Rings', 'Кольца', 'yuzuk', '/images/categories/1771925327_e2f5a03b_YZ18002_5.jpg', 'The Most Precious Signature of Love The expression of a captivating elegance.', 'The Most Precious Signature of Love. The expression of a captivating elegance.', 'Самая драгоценная подпись любви. Выражение пленительной элегантности.', 'Büyüleyici bir zarafetin ifadesi.', 'The expression of a captivating elegance.', 'Выражение пленительной элегантности.', '\n\nİçten gelen bir güçle. \nEşi benzeri olmayan bir değer gibi. \nSade ama etkileyici.', NULL, 'With an inner strength.\nLike a value beyond compare.\nSimple yet impressive.', 'С внутренней силой.\nКак ценность, не имеющая себе равных.\nПросто, но впечатляюще.', 'PIRLANTA YÜZÜKLERİMİZ', 'OUR DIAMOND RINGS', 'НАШИ БРИЛЛИАНТОВЫЕ КОЛЬЦА', 1, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(2, 'mucevher', 'Kolye', 'Necklaces', 'Колье', 'kolye', '/images/categories/1771326205_662e5909_han_kolye.png', 'Zarafetin En Saf Hali', 'The Purest Form of Elegance', 'Чистейшая форма элегантности', 'Hayranlık uyandıran tasarımlar.', 'Designs that inspire admiration.', 'Дизайны, вызывающие восхищение.', 'Bu kolye, bir bakışla başlayan şeyler için.\nYaklaştıkça hissedilen, adı konmadan kalan…\nGösterişten uzak, kalbe yakın.\nKorunmak istenen bir şeye benzer...', NULL, 'This necklace is for things that start with a glance.\nFelt as you come closer, unnamed yet undeniable…\nFar from ostentation, close to the heart.\nLike something you want to protect...', 'Это колье для вещей, которые начинаются со взгляда.\nЧувствуется по мере приближения, безымянное, но неоспоримое…\nДалёкое от показухи, близкое к сердцу.\nКак то, что хочется защитить...', 'PIRLANTA KOLYELERİMİZ', 'OUR DIAMOND NECKLACES', 'НАШИ БРИЛЛИАНТОВЫЕ КОЛЬЕ', 2, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(3, 'mucevher', 'Bileklik', 'Bracelets', 'Браслеты', 'bileklik', '/images/categories/1770980907_68856455_han_bileklik_jpg.jpg', 'Bileğinizde Işık', 'Light on Your Wrist', 'Свет на вашем запястье', 'Abartıya ihtiyaç duymayan, kendi karakterini taşıyan tasarımlar.', 'Designs that carry their own character without excess.', 'Дизайны, несущие свой характер без излишеств.', '\nHer biri özenle şekillenir, ölçülü bir estetik anlayışını yansıtır.\nSadelik ile seçkinlik arasındaki dengeyi korur.\nGösterişe değil, kalcı bir zarafet duygusuna dayanır.\nDuruşunuzu tamamlayan parçalar...', NULL, 'Each one is carefully shaped, reflecting a measured aesthetic sense.\nMaintaining the balance between simplicity and distinction.\nBased not on ostentation, but on lasting elegance.\nPieces that complete your presence...', 'Каждый тщательно сформирован, отражая выверенное чувство эстетики.\nСоблюдая баланс между простотой и утончённостью.\nОсновано не на показухе, а на непреходящей элегантности.\nУкрашения, дополняющие ваш образ...', 'PIRLANTA BİLEKLİKLERİMİZ', 'OUR DIAMOND BRACELETS', 'НАШИ БРИЛЛИАНТОВЫЕ БРАСЛЕТЫ', 3, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(4, 'mucevher', 'Küpe', 'Earrings', 'Серьги', 'kupe', '/images/categories/1772109227_5ec2bb5c_kategori_kupe_jpg.jpg', 'Işıltının Dokunuşu', 'The Touch of Sparkle', 'Прикосновение сияния', 'Varlığınızla şekillenen bir estetik anlayışı.', 'An aesthetic understanding shaped by your presence.', 'Эстетика, формируемая вашим присутствием.', '\nUstalıkla biçim bulmuş tasarımlar.\nİfadenize farklı bir anlam ekleyen,\nHatırda kalan, çarpıcı dokunuşlar...', NULL, 'Masterfully shaped designs.\nAdding a different meaning to your expression,\nmemorable, striking touches...', 'Мастерски выполненные дизайны.\nПридающие новый смысл вашему образу,\nзапоминающиеся, яркие акценты...', 'PIRLANTA KÜPELERİMİZ', 'OUR DIAMOND EARRINGS', 'НАШИ БРИЛЛИАНТОВЫЕ СЕРЬГИ', 4, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(5, 'mucevher', 'Set', 'Sets', 'Комплекты', 'set', '/images/categories/1770980929_0a9fd7f3_han_set_jpg.jpg', 'Kusursuz Uyum', 'Perfect Harmony', 'Идеальная гармония', 'Uyumun en zarif hali.', 'The most elegant form of harmony.', 'Самая элегантная форма гармонии.', '\nBir araya gelişleri rastlantı değil.\nHer ayrıntı kendi başına değer taşır,\nBirlikte ise daha güçlü bir ifade ortaya çıkar.\nSizi tamamlanmış hissettiren…', NULL, 'Their coming together is no coincidence.\nEach detail carries value on its own,\nbut together a stronger expression emerges.\nMaking you feel complete…', 'Их соединение не случайно.\nКаждая деталь ценна сама по себе,\nно вместе рождается более сильное выражение.\nЗаставляя вас чувствовать себя завершённой…', 'PIRLANTA SETLERİMİZ', 'OUR DIAMOND SETS', 'НАШИ БРИЛЛИАНТОВЫЕ КОМПЛЕКТЫ', 5, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(6, 'koleksiyon', 'Gözümün Nuru', 'Light of My Eyes', 'Свет моих глаз', 'gozumun-nuru', '/images/categories/1772455350_bd3d026c_IMG_1178_lifestyle.jpg', 'Gözümün Nuru', 'Light of My Eyes', 'Свет моих глаз', 'Sevdiklerinize özel, anlam dolu tasarımlar.', 'Meaningful designs dedicated to your loved ones.', 'Наполненные смыслом дизайны для ваших любимых.', 'Gözümün Nuru koleksiyonu,\nsevgi ve değerin sembolü\nolarak tasarlandı.', '{\"heroSvg\":\"/images/categories/1775035811_051624d2_gozumunnuru_hero.svg\",\"philosophyQuote1\":\"\\\"Sen benim hayatımı güzelleştiren biri değilsin;\",\"philosophyQuote2\":\"hayatımı anlamlı kılan yerdesin.\\\"\",\"philosophyText\":\"Gözümün Nuru,\\ndeğerini yitirmeyen bir yakınlıktan doğdu.\\nRuhun penceresinden süzülen aydınlık bir bağdan…\",\"splitImage\":\"/images/categories/1772005508_75556557_inci_kupe_gorsel.png\",\"splitTitle\":\"Her detay\\nbir bağ\",\"splitText1\":\"Bu koleksiyondaki her parça,\\nbirine duyulan saf sevginin,\\nkoruma içgüdüsünün\\nve vazgeçilmez olma hissinin manevi yansımasıdır.\",\"splitText2\":\"Her dokunuş, her detay;\\nkoruyan, saran, tamamlayan emek harcanmış\\nbir bağın izini taşır.\",\"collectionTitle\":\"Koleksiyonu Keşfet\",\"collectionSubtitle\":\"Işık saçmaktan daha çok;\\nait olmak için…\",\"darkBgImage\":\"/images/parallax-bg.jpg\",\"darkText1\":\"Gösterişten ziyade,\\nhissettirmeye odaklı tasarlandı.\",\"darkText2\":\"Han mücevherleri,\",\"darkText2Cursive\":\"özel hissettirmek için var olur.\",\"darkText3\":\"Bu çok özel birinin hikâyesi…\\nPeki Sen neresindesin?\",\"ctaSmallTitle\":\"Seçilmiş\",\"ctaTitle\":\"Düşünülmüş ve Uzun Vadeli Bir Değer\",\"ctaSubtitle\":\"Seçilmiş, düşünülmüş ve\\nuzun vadeli bir değerin ifadesi\"}', 'The Light of My Eyes collection\nwas designed as a symbol\nof love and value.', 'Коллекция «Свет моих глаз»\nбыла создана как символ\nлюбви и ценности.', 'GÖZÜMÜN NURU', 'LIGHT OF MY EYES', 'СВЕТ МОИХ ГЛАЗ', 1, 1, '2026-01-21 15:30:29', '2026-04-01 09:30:14'),
(7, 'hediye', 'Doğum Günü', 'Birthday', 'День рождения', 'dogum-gunu', '/images/hediye-menu-hero.jpg', 'Doğum Günü Işıltısı', 'Birthday Sparkle', 'Сияние дня рождения', 'En güzel doğum günü hediyesi.', 'The most beautiful birthday gift.', 'Самый красивый подарок на день рождения.', 'Sevdiklerinizin doğum gününü özel kılacak hediye seçenekleri. Her yaşa ve tarza uygun pırlanta tasarımlar.', NULL, 'Gift options to make your loved ones\' birthday special. Diamond designs for every age and style.', 'Варианты подарков, которые сделают день рождения ваших близких особенным. Бриллиантовые дизайны для любого возраста и стиля.', 'DOĞUM GÜNÜ HEDİYELERİ', 'BIRTHDAY GIFTS', 'ПОДАРКИ НА ДЕНЬ РОЖДЕНИЯ', 1, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(8, 'hediye', 'Anneler Günü', 'Mother\'s Day', 'День матери', 'anneler-gunu', '/images/hediye-menu-hero.jpg', 'Anneler İçin Özel', 'Special for Mothers', 'Особенное для мам', 'En değerli kadına, en değerli hediye.', 'The most precious gift for the most precious woman.', 'Самый ценный подарок для самой ценной женщины.', 'Annenize olan sevginizi ifade edecek özel pırlanta tasarımlar. Zarif, anlamlı ve kalıcı hediyeler.', NULL, 'Special diamond designs to express your love for your mother. Elegant, meaningful and lasting gifts.', 'Особые бриллиантовые дизайны, чтобы выразить любовь к маме. Элегантные, значимые и долговечные подарки.', 'ANNELER GÜNÜ HEDİYELERİ', 'MOTHER\'S DAY GIFTS', 'ПОДАРКИ НА ДЕНЬ МАТЕРИ', 2, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(9, 'hediye', 'Kadınlar Günü', 'Women\'s Day', 'Женский день', 'kadinlar-gunu', '/images/hediye-menu-hero.jpg', 'Kadınlara Özel', 'For Women', 'Для женщин', 'Güçlü ve zarif kadınlara.', 'For strong and elegant women.', 'Для сильных и элегантных женщин.', 'Kadınlar gününde hayatınızdaki özel kadınlara anlamlı bir hediye verin. Şıklık ve zarafeti bir arada sunan tasarımlar.', NULL, 'Give a meaningful gift to the special women in your life on Women\'s Day. Designs that combine style and elegance.', 'Подарите значимый подарок особенным женщинам в вашей жизни на Женский день. Дизайны, сочетающие стиль и элегантность.', 'KADINLAR GÜNÜ HEDİYELERİ', 'WOMEN\'S DAY GIFTS', 'ПОДАРКИ НА ЖЕНСКИЙ ДЕНЬ', 3, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(10, 'hediye', 'Özel Günler', 'Special Occasions', 'Особые события', 'ozel-gunler', '/images/hediye-menu-hero.jpg', 'Özel Anlar İçin', 'For Special Moments', 'Для особых моментов', 'Unutulmaz hediyeler.', 'Unforgettable gifts.', 'Незабываемые подарки.', 'Hayatınızın en özel anlarını kutlamak için tasarlanmış hediye seçenekleri. Nişan, düğün, yıldönümü veya herhangi bir özel gün için mükemmel seçimler.', NULL, 'Gift options designed to celebrate the most special moments of your life. Perfect choices for engagements, weddings, anniversaries or any special day.', 'Варианты подарков для самых особых моментов вашей жизни. Идеальный выбор для помолвок, свадеб, годовщин или любого особого дня.', 'ÖZEL GÜNLER HEDİYELERİ', 'SPECIAL OCCASIONS GIFTS', 'ПОДАРКИ НА ОСОБЫЕ СОБЫТИЯ', 4, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(11, 'hediye', 'Yeni Doğan', 'Newborn', 'Новорождённый', 'yeni-dogan', '/images/hediye-menu-hero.jpg', 'Minik Melekler İçin', 'For Little Angels', 'Для маленьких ангелов', 'Yeni başlangıçlara özel hediyeler.', 'Gifts for new beginnings.', 'Подарки для новых начал.', 'Yeni doğan bebeklere ve ailelerine özel, anlamlı hediye seçenekleri. Hayata hoş geldin hediyesi olarak mükemmel.', NULL, 'Special, meaningful gift options for newborn babies and their families. Perfect as a welcome to life gift.', 'Особые, значимые варианты подарков для новорождённых и их семей. Идеальный подарок в честь рождения.', 'YENİ DOĞAN HEDİYELERİ', 'NEWBORN GIFTS', 'ПОДАРКИ НОВОРОЖДЁННЫМ', 5, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(12, 'hediye', 'Aksesuar', 'Accessories', 'Аксессуары', 'aksesuar', '/images/hediye-menu-hero.jpg', 'Tamamlayıcı Dokunuşlar', 'Finishing Touches', 'Завершающие штрихи', 'Stilinizi tamamlayın.', 'Complete your style.', 'Завершите свой стиль.', 'Mücevher koleksiyonunuzu tamamlayacak aksesuarlar. Saç tokalarından mücevher kutularına özel seçenekler.', NULL, 'Accessories to complete your jewelry collection. Special options from hair clips to jewelry boxes.', 'Аксессуары для завершения вашей ювелирной коллекции. Специальные варианты от заколок для волос до шкатулок.', 'AKSESUARLAR', 'ACCESSORIES', 'АКСЕССУАРЫ', 6, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(13, 'erkek', 'Tesbih', 'Prayer Beads', 'Чётки', 'tesbih', '/images/categories/1771340379_c88d3d2e_beyaz_tesbih_1_lifestyle_jpg.jpg', 'Geleneksel Zarafet', 'Traditional Elegance', 'Традиционная элегантность', 'Her tanede huzur.', 'Peace in every bead.', 'Покой в каждой бусине.', 'Elde tutunca ilk fark edilen şey dinginlik.\nYaşam biraz gevşiyor, düşünce yavaşlıyor.\nSayılar değil, aralar kalıyor.\nBakarken değil, dururken anlamlı.\nBir süre sonra fark edilmiyor bile...', NULL, 'The first thing you notice when you hold them is serenity.\nLife relaxes a little, thoughts slow down.\nNot the numbers, but the pauses remain.\nMeaningful not when you look, but when you pause.\nAfter a while, you don\'t even notice them...', 'Первое, что замечаешь, когда берёшь их в руки — умиротворение.\nЖизнь немного расслабляется, мысли замедляются.\nОстаются не числа, а паузы.\nЗначимы не когда смотришь, а когда останавливаешься.\nЧерез некоторое время их даже не замечаешь...', 'TESBİH KOLEKSİYONU', 'PRAYER BEADS COLLECTION', 'КОЛЛЕКЦИЯ ЧЁТОК', 1, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(14, 'erkek', 'Erkek Bileklik', 'Men\'s Bracelet', 'Мужской браслет', 'erkek-bileklik', '/images/erkek-menu-hero.jpg', 'Erkek Şıklığı', 'Men\'s Elegance', 'Мужская элегантность', 'Bileğinizde güç ve zarafet.', 'Power and elegance on your wrist.', 'Сила и элегантность на вашем запястье.', 'Göze gelmeden eşlik eden bir şey gibi.\nHareket ettikçe kendini belli ediyor.\nGünün içine karışıyor, geride kalmıyor.\nNe fazla, ne eksik.\nOradayken doğal…', NULL, 'Like something that accompanies without being noticed.\nReveals itself as you move.\nBlends into the day, never falls behind.\nNeither too much, nor too little.\nNatural when it\'s there…', 'Как то, что сопровождает, не привлекая внимания.\nПроявляется с каждым движением.\nВливается в день, не отстаёт.\nНи много, ни мало.\nЕстественно, когда он есть…', 'ERKEK BİLEKLİKLERİ', 'MEN\'S BRACELETS', 'МУЖСКИЕ БРАСЛЕТЫ', 2, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(15, 'erkek', 'Erkek Yüzük', 'Men\'s Ring', 'Мужское кольцо', 'erkek-yuzuk', '/images/erkek-menu-hero.jpg', 'Erkek Yüzükleri', 'Men\'s Rings', 'Мужские кольца', 'Güç ve karakterin simgesi.', 'Symbol of power and character.', 'Символ силы и характера.', 'Ele baktıkça değişen bir his.\nBazen alışkanlık, bazen ağırlık gibi.\nSöze gelmeyen bir yerden.\nNe anlatmak istiyor, ne saklamak.\nSadece duruyor…', NULL, 'A feeling that changes as you look at your hand.\nSometimes habit, sometimes weight.\nFrom a place that cannot be put into words.\nNeither wanting to tell, nor wanting to hide.\nIt simply stays…', 'Чувство, которое меняется, когда смотришь на руку.\nИногда привычка, иногда тяжесть.\nИз места, которое нельзя выразить словами.\nНе желая рассказать, не желая скрыть.\nПросто остаётся…', 'ERKEK YÜZÜKLERİ', 'MEN\'S RINGS', 'МУЖСКИЕ КОЛЬЦА', 3, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(16, 'preloved', 'Preloved', 'Preloved', 'Preloved', 'preloved', '/images/categories/1771243113_756f498f_preloved_i__erik.jpg', 'Preloved', 'Preloved', 'Preloved', 'Zamanla değerinden hiçbir şey kaybetmeyen parçalar.', 'Pieces that lose nothing of their value over time.', 'Изделия, не теряющие своей ценности со временем.', 'Bazı mücevherler vardır;\nzamanla değerinden hiçbir şey kaybetmez.\nTasarımı, işçiliği ve duruşuyla hâlâ ilk günkü etkisini taşır.\n\nPreloved parçalar,\nözenle seçilmiş, özgünlüğü korunmuş\nve yeniden keşfedilmeyi bekleyen mücevherlerden oluşur.', NULL, 'Some jewelry exists that\nloses nothing of its value over time.\nIts design, craftsmanship and presence still carries the same impact as the first day.\n\nPreloved pieces\nconsist of carefully selected, authentically preserved\njewelry waiting to be rediscovered.', 'Существуют украшения,\nкоторые с течением времени не теряют своей ценности.\nИх дизайн, мастерство и присутствие по-прежнему производят то же впечатление, что и в первый день.\n\nPreloved изделия\nсостоят из тщательно отобранных, бережно сохранённых\nукрашений, ожидающих своего нового открытия.', 'PRELOVED KOLEKSİYONU', 'PRELOVED COLLECTION', 'КОЛЛЕКЦИЯ PRELOVED', 1, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22'),
(17, 'erkek', 'Kol Düğmesi', 'Cufflinks', 'Запонки', 'kol', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, 1, '2026-03-06 11:29:25', '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `category_products`
--

DROP TABLE IF EXISTS `category_products`;
CREATE TABLE `category_products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL COMMENT 'Kategori ID',
  `product_id` int(11) NOT NULL COMMENT 'Ürün ID',
  `sort_order` int(11) DEFAULT 0 COMMENT 'Sıralama',
  `is_active` tinyint(1) DEFAULT 1 COMMENT 'Aktif mi',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `category_products`
--

INSERT INTO `category_products` (`id`, `category_id`, `product_id`, `sort_order`, `is_active`, `created_at`) VALUES
(1276, 16, 107, 3, 1, '2026-02-27 08:08:58'),
(1277, 16, 104, 5, 1, '2026-02-27 08:09:24'),
(1281, 16, 98, 8, 1, '2026-02-27 08:10:58'),
(1283, 16, 103, 10, 1, '2026-02-27 08:11:19'),
(1405, 4, 26, 2, 1, '2026-03-02 13:42:11'),
(1415, 1, 19, 2, 1, '2026-03-03 07:10:18'),
(1428, 1, 24, 4, 1, '2026-03-03 07:15:32'),
(1429, 1, 32, 7, 1, '2026-03-03 07:15:41'),
(1432, 1, 25, 6, 1, '2026-03-03 07:17:03'),
(1433, 1, 21, 9, 1, '2026-03-03 07:17:09'),
(1434, 1, 30, 10, 1, '2026-03-03 07:17:49'),
(1438, 6, 4, 9, 1, '2026-03-03 07:19:36'),
(1439, 1, 4, 13, 1, '2026-03-03 07:19:36'),
(1443, 1, 36, 8, 1, '2026-03-03 07:21:48'),
(1444, 1, 23, 12, 1, '2026-03-03 07:21:58'),
(1450, 6, 2, 3, 1, '2026-03-03 07:26:44'),
(1451, 1, 2, 14, 1, '2026-03-03 07:26:44'),
(1454, 1, 13, 16, 1, '2026-03-03 07:29:48'),
(1463, 1, 33, 36, 1, '2026-03-03 07:34:57'),
(1465, 1, 31, 34, 1, '2026-03-03 07:35:30'),
(1471, 1, 16, 28, 1, '2026-03-03 07:38:58'),
(1474, 1, 14, 26, 1, '2026-03-03 07:40:54'),
(1478, 1, 18, 23, 1, '2026-03-03 07:41:39'),
(1481, 6, 55, 4, 1, '2026-03-03 07:42:00'),
(1482, 1, 55, 21, 1, '2026-03-03 07:42:00'),
(1483, 6, 56, 6, 1, '2026-03-03 07:42:09'),
(1484, 1, 56, 20, 1, '2026-03-03 07:42:09'),
(1487, 1, 15, 18, 1, '2026-03-03 07:42:35'),
(1497, 2, 34, 7, 1, '2026-03-03 08:08:36'),
(1538, 6, 88, 16, 1, '2026-03-03 11:47:43'),
(1539, 2, 88, 4, 1, '2026-03-03 11:47:43'),
(1554, 2, 35, 10, 1, '2026-03-03 12:42:44'),
(1557, 1, 17, 30, 1, '2026-03-03 12:50:26'),
(1560, 6, 22, 11, 1, '2026-03-03 12:52:58'),
(1561, 1, 22, 15, 1, '2026-03-03 12:52:58'),
(1566, 16, 99, 1, 1, '2026-03-03 13:41:06'),
(1567, 16, 108, 2, 1, '2026-03-03 13:41:34'),
(1568, 16, 102, 7, 1, '2026-03-03 13:42:08'),
(1569, 16, 101, 9, 1, '2026-03-03 13:42:37'),
(1570, 16, 100, 4, 1, '2026-03-03 13:43:08'),
(1571, 16, 109, 6, 1, '2026-03-03 13:43:32'),
(1577, 2, 106, 17, 1, '2026-03-04 08:02:46'),
(1586, 2, 118, 19, 1, '2026-03-06 11:50:18'),
(1621, 5, 127, 1, 1, '2026-03-09 13:42:08'),
(1622, 5, 128, 3, 1, '2026-03-09 13:42:50'),
(1623, 5, 129, 2, 1, '2026-03-09 13:42:59'),
(1626, 13, 111, 1, 1, '2026-03-10 07:36:36'),
(1632, 1, 62, 1, 1, '2026-03-10 07:42:20'),
(1633, 1, 20, 3, 1, '2026-03-10 07:42:52'),
(1634, 1, 53, 5, 1, '2026-03-10 07:43:21'),
(1635, 6, 54, 0, 1, '2026-03-10 07:43:43'),
(1636, 1, 54, 22, 1, '2026-03-10 07:43:43'),
(1637, 6, 57, 0, 1, '2026-03-10 07:44:09'),
(1638, 1, 57, 24, 1, '2026-03-10 07:44:09'),
(1639, 6, 58, 5, 1, '2026-03-10 07:44:29'),
(1640, 1, 58, 19, 1, '2026-03-10 07:44:29'),
(1641, 1, 59, 11, 1, '2026-03-10 07:44:46'),
(1642, 1, 79, 40, 1, '2026-03-10 07:45:24'),
(1643, 1, 74, 37, 1, '2026-03-10 07:45:41'),
(1644, 1, 60, 17, 1, '2026-03-10 07:46:54'),
(1645, 1, 75, 31, 1, '2026-03-10 07:47:10'),
(1646, 1, 78, 38, 1, '2026-03-10 07:47:28'),
(1648, 1, 61, 35, 1, '2026-03-10 07:48:11'),
(1649, 1, 77, 33, 1, '2026-03-10 07:48:32'),
(1659, 3, 50, 10, 1, '2026-03-10 09:34:26'),
(1660, 6, 50, 0, 1, '2026-03-10 09:34:26'),
(1665, 3, 39, 14, 1, '2026-03-10 09:36:07'),
(1666, 6, 39, 12, 1, '2026-03-10 09:36:07'),
(1672, 3, 94, 18, 1, '2026-03-10 09:41:20'),
(1703, 4, 27, 6, 1, '2026-03-10 09:49:10'),
(1704, 4, 28, 4, 1, '2026-03-10 09:49:26'),
(1705, 4, 29, 5, 1, '2026-03-10 09:49:32'),
(1722, 3, 6, 21, 1, '2026-03-11 12:05:53'),
(1723, 6, 6, 21, 1, '2026-03-11 12:05:53'),
(1724, 3, 7, 19, 1, '2026-03-11 12:06:55'),
(1725, 6, 7, 19, 1, '2026-03-11 12:06:55'),
(1726, 3, 10, 27, 1, '2026-03-11 12:07:28'),
(1727, 6, 10, 23, 1, '2026-03-11 12:07:28'),
(1730, 3, 12, 24, 1, '2026-03-11 12:08:10'),
(1731, 6, 12, 26, 1, '2026-03-11 12:08:10'),
(1732, 3, 89, 20, 1, '2026-03-11 12:08:39'),
(1733, 3, 93, 28, 1, '2026-03-11 12:09:03'),
(1734, 3, 90, 5, 1, '2026-03-11 12:09:22'),
(1735, 3, 91, 16, 1, '2026-03-11 12:09:41'),
(1736, 3, 92, 26, 1, '2026-03-11 12:10:01'),
(1737, 3, 5, 17, 1, '2026-03-11 12:10:27'),
(1738, 6, 5, 20, 1, '2026-03-11 12:10:27'),
(1739, 3, 8, 6, 1, '2026-03-11 12:10:47'),
(1740, 6, 8, 24, 1, '2026-03-11 12:10:47'),
(1741, 3, 9, 4, 1, '2026-03-11 12:11:05'),
(1742, 6, 9, 22, 1, '2026-03-11 12:11:05'),
(1743, 3, 51, 12, 1, '2026-03-11 12:11:30'),
(1744, 6, 51, 0, 1, '2026-03-11 12:11:30'),
(1745, 2, 70, 3, 1, '2026-03-11 12:11:54'),
(1746, 2, 69, 2, 1, '2026-03-11 12:12:23'),
(1747, 2, 68, 1, 1, '2026-03-11 12:12:44'),
(1748, 2, 126, 22, 1, '2026-03-11 12:13:08'),
(1751, 6, 3, 2, 1, '2026-03-11 12:14:29'),
(1752, 2, 3, 8, 1, '2026-03-11 12:14:29'),
(1753, 2, 37, 11, 1, '2026-03-11 12:14:52'),
(1754, 2, 72, 13, 1, '2026-03-11 12:15:09'),
(1755, 2, 73, 15, 1, '2026-03-11 12:15:27'),
(1756, 6, 87, 17, 1, '2026-03-11 12:15:48'),
(1757, 2, 87, 5, 1, '2026-03-11 12:15:48'),
(1758, 6, 52, 18, 1, '2026-03-11 12:16:17'),
(1759, 2, 52, 6, 1, '2026-03-11 12:16:17'),
(1760, 4, 67, 8, 1, '2026-03-11 12:16:37'),
(1761, 4, 65, 7, 1, '2026-03-11 12:16:56'),
(1762, 4, 64, 3, 1, '2026-03-11 12:17:14'),
(1763, 4, 63, 1, 1, '2026-03-11 12:17:33'),
(1766, 1, 80, 29, 1, '2026-03-11 12:19:00'),
(1767, 1, 81, 41, 1, '2026-03-11 12:19:25'),
(1768, 1, 82, 25, 1, '2026-03-11 12:19:40'),
(1769, 1, 83, 27, 1, '2026-03-11 12:19:58'),
(1770, 1, 84, 42, 1, '2026-03-11 12:22:25'),
(1771, 1, 85, 39, 1, '2026-03-11 12:23:14'),
(1772, 1, 76, 32, 1, '2026-03-11 12:46:21'),
(1782, 3, 41, 7, 1, '2026-03-11 12:57:05'),
(1783, 6, 41, 13, 1, '2026-03-11 12:57:05'),
(1787, 3, 47, 11, 1, '2026-03-11 13:00:41'),
(1788, 3, 11, 22, 1, '2026-03-11 13:02:51'),
(1789, 6, 11, 28, 1, '2026-03-11 13:02:51'),
(1790, 6, 86, 10, 1, '2026-03-11 13:07:11'),
(1791, 4, 86, 13, 1, '2026-03-11 13:07:11'),
(1792, 2, 44, 9, 1, '2026-03-11 13:25:15'),
(1793, 2, 38, 16, 1, '2026-03-11 13:26:04'),
(1794, 3, 43, 25, 1, '2026-03-11 13:27:15'),
(1795, 6, 43, 27, 1, '2026-03-11 13:27:15'),
(1796, 3, 96, 15, 1, '2026-03-13 08:45:44'),
(1797, 3, 40, 1, 1, '2026-03-13 08:46:16'),
(1798, 6, 40, 7, 1, '2026-03-13 08:46:16'),
(1799, 3, 95, 23, 1, '2026-03-13 08:49:50'),
(1800, 6, 95, 8, 1, '2026-03-13 08:49:50'),
(1803, 3, 42, 9, 1, '2026-03-13 08:52:00'),
(1804, 6, 42, 14, 1, '2026-03-13 08:52:00'),
(1805, 3, 49, 3, 1, '2026-03-13 08:52:31'),
(1806, 6, 49, 9, 1, '2026-03-13 08:52:31'),
(1807, 3, 97, 13, 1, '2026-03-13 08:53:11'),
(1808, 3, 46, 2, 1, '2026-03-13 08:54:43'),
(1809, 3, 48, 8, 1, '2026-03-13 08:55:09'),
(1810, 2, 45, 12, 1, '2026-03-13 08:55:45'),
(1811, 2, 132, 18, 1, '2026-03-13 08:56:25'),
(1812, 2, 71, 14, 1, '2026-03-13 08:56:46'),
(1814, 2, 117, 24, 1, '2026-03-13 08:57:36'),
(1817, 2, 119, 20, 1, '2026-03-13 08:59:54'),
(1818, 2, 120, 21, 1, '2026-03-13 09:00:11'),
(1819, 6, 1, 1, 1, '2026-03-13 09:00:42'),
(1820, 4, 1, 15, 1, '2026-03-13 09:00:42'),
(1821, 4, 66, 9, 1, '2026-03-13 09:01:12'),
(1822, 4, 110, 14, 1, '2026-03-13 09:01:47'),
(1823, 4, 121, 11, 1, '2026-03-13 09:02:12'),
(1824, 4, 115, 10, 1, '2026-03-13 09:02:40'),
(1825, 4, 122, 12, 1, '2026-03-13 09:03:04'),
(1826, 1, 125, 43, 1, '2026-03-13 09:03:48'),
(1831, 5, 133, 4, 1, '2026-03-18 10:42:56'),
(1834, 5, 130, 7, 1, '2026-03-18 10:43:43'),
(1835, 5, 131, 8, 1, '2026-03-18 10:43:55'),
(1836, 5, 134, 6, 1, '2026-03-18 10:45:53'),
(1837, 5, 135, 5, 1, '2026-03-18 10:46:04'),
(1838, 17, 113, 0, 1, '2026-03-18 11:21:46'),
(1839, 17, 114, 0, 1, '2026-03-18 11:22:05'),
(1840, 17, 112, 0, 1, '2026-03-18 11:22:47'),
(1841, 17, 123, 0, 1, '2026-03-18 11:23:26'),
(1842, 17, 124, 0, 1, '2026-03-18 11:24:25'),
(1843, 2, 116, 19, 1, '2026-03-18 11:24:49');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `contact_info`
--

DROP TABLE IF EXISTS `contact_info`;
CREATE TABLE `contact_info` (
  `id` int(11) NOT NULL,
  `address` text DEFAULT NULL,
  `address_en` text DEFAULT NULL,
  `address_ru` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `working_hours` varchar(255) DEFAULT NULL,
  `working_hours_en` varchar(255) DEFAULT NULL,
  `working_hours_ru` varchar(255) DEFAULT NULL,
  `map_embed` text DEFAULT NULL COMMENT 'Google Maps embed kodu',
  `instagram1` varchar(100) DEFAULT '@gozumunnuru.antalya',
  `instagram1_url` varchar(255) DEFAULT 'https://www.instagram.com/gozumunnuru.antalya',
  `instagram2` varchar(100) DEFAULT '@hankuyumculuk_',
  `instagram2_url` varchar(255) DEFAULT 'https://www.instagram.com/hankuyumculuk_',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `contact_info`
--

INSERT INTO `contact_info` (`id`, `address`, `address_en`, `address_ru`, `phone`, `email`, `working_hours`, `working_hours_en`, `working_hours_ru`, `map_embed`, `instagram1`, `instagram1_url`, `instagram2`, `instagram2_url`, `updated_at`) VALUES
(1, 'Liman Mahallesi, Akdeniz Bulvarı, No: 257 A Blok İç Kapı No: 95 Fenix Center AVM Konyaaltı/Antalya', 'Liman Mahallesi, Akdeniz Bulvarı, No: 257 Block A, Suite 95, Fenix Center Mall, Konyaaltı/Antalya', 'Район Лиман, бульвар Акдениз, д. 257, блок А, офис 95, ТЦ Fenix Center, Коньяалты/Анталья', '+90 (242) 335 07 00', 'info@hankuyumculuk.com', 'Haftanın Her Günü: 10:00 - 20:00', 'Every Day: 10:00 AM - 8:00 PM', 'Каждый день: 10:00 - 20:00', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.8477013417514!2d30.602089575529437!3d36.84612336511002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39303a734f60f%3A0xe343a4fa77583d88!2sFenix%20Center%20AVM!5e0!3m2!1str!2str!4v1768831178229!5m2!1str!2str\" width=\"100%\" height=\"100%\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>', '@hankuyumculuk_', 'https://www.instagram.com/hankuyumculuk_', '@gozumunnuru.antalya', 'https://www.instagram.com/gozumunnuru.antalya', '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `featured_products`
--

DROP TABLE IF EXISTS `featured_products`;
CREATE TABLE `featured_products` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL COMMENT 'Görüntülenecek isim (farklı olabilir)',
  `display_name_en` varchar(255) DEFAULT NULL,
  `display_name_ru` varchar(255) DEFAULT NULL,
  `display_category` varchar(100) DEFAULT NULL COMMENT 'Görüntülenecek kategori etiketi',
  `display_category_en` varchar(100) DEFAULT NULL,
  `display_category_ru` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `featured_products`
--

INSERT INTO `featured_products` (`id`, `product_id`, `display_name`, `display_name_en`, `display_name_ru`, `display_category`, `display_category_en`, `display_category_ru`, `sort_order`, `is_active`) VALUES
(1, 2, 'YZK-180001', NULL, NULL, 'Yüzük', 'Ring', 'Кольцо', 0, 1),
(2, 14, 'YZK-140004', NULL, NULL, 'Yüzük', 'Ring', 'Кольцо', 1, 1),
(4, 5, 'BLK-180006', NULL, NULL, 'Bileklik', 'Bracelet', 'Браслет', 2, 1),
(6, 32, 'YZK-180018', NULL, NULL, 'Yüzük', 'Ring', 'Кольцо', 3, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `footer_columns`
--

DROP TABLE IF EXISTS `footer_columns`;
CREATE TABLE `footer_columns` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL COMMENT 'Sütun başlığı',
  `title_en` varchar(100) DEFAULT NULL,
  `title_ru` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `footer_columns`
--

INSERT INTO `footer_columns` (`id`, `title`, `title_en`, `title_ru`, `sort_order`, `is_active`) VALUES
(1, 'HAN KUYUMCULUK', 'HAN JEWELRY', 'HAN ЮВЕЛИРНЫЕ', 1, 1),
(2, 'KOLEKSİYON', 'COLLECTION', 'КОЛЛЕКЦИЯ', 2, 1),
(3, 'MÜŞTERİ HİZMETLERİ', 'CUSTOMER SERVICE', 'ОБСЛУЖИВАНИЕ КЛИЕНТОВ', 3, 1),
(4, 'YASAL', 'LEGAL', 'ПРАВОВАЯ ИНФОРМАЦИЯ', 4, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `footer_links`
--

DROP TABLE IF EXISTS `footer_links`;
CREATE TABLE `footer_links` (
  `id` int(11) NOT NULL,
  `column_id` int(11) NOT NULL,
  `text` varchar(100) NOT NULL COMMENT 'Link metni',
  `text_en` varchar(100) DEFAULT NULL,
  `text_ru` varchar(100) DEFAULT NULL,
  `url` varchar(255) NOT NULL COMMENT 'Link adresi',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `footer_links`
--

INSERT INTO `footer_links` (`id`, `column_id`, `text`, `text_en`, `text_ru`, `url`, `sort_order`, `is_active`) VALUES
(1, 1, 'Hakkımızda', 'About Us', 'О нас', '/hakkimizda', 1, 1),
(2, 1, 'İletişim', 'Contact', 'Контакты', '/iletisim', 2, 1),
(3, 1, 'Blog', 'Blog', 'Блог', '/blog', 3, 1),
(4, 2, 'Gözümün Nuru', 'Light of My Eyes', 'Свет моих глаз', '/koleksiyon/gozumun-nuru', 1, 1),
(5, 3, 'Bakım ve Garanti', 'Care & Warranty', 'Уход и гарантия', '/musteri-hizmetleri/bakim-garanti', 1, 1),
(6, 4, 'Çerez Politikası', 'Cookie Policy', 'Политика cookies', '/yasal/cerez-politikasi', 1, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `footer_settings`
--

DROP TABLE IF EXISTS `footer_settings`;
CREATE TABLE `footer_settings` (
  `id` int(11) NOT NULL,
  `logo_image` varchar(255) DEFAULT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `slogan_en` varchar(255) DEFAULT NULL,
  `slogan_ru` varchar(255) DEFAULT NULL,
  `copyright_text` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ru` text DEFAULT NULL,
  `copyright_text_en` varchar(255) DEFAULT NULL,
  `copyright_text_ru` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `footer_settings`
--

INSERT INTO `footer_settings` (`id`, `logo_image`, `slogan`, `slogan_en`, `slogan_ru`, `copyright_text`, `description`, `description_en`, `description_ru`, `copyright_text_en`, `copyright_text_ru`, `updated_at`) VALUES
(1, '/images/1818-logo.svg', 'Seninle güzelleşir her şey...', 'Everything becomes beautiful with you...', 'С тобой всё становится прекраснее...', '© 2025 Han Kuyumculuk, Tüm Hakları Saklıdır', NULL, NULL, NULL, '© 2025 Han Kuyumculuk, All Rights Reserved', '© 2025 Han Kuyumculuk, Все права защищены', '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_settings`
--

DROP TABLE IF EXISTS `general_settings`;
CREATE TABLE `general_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(50) NOT NULL COMMENT 'Ayar anahtarı',
  `setting_value` text DEFAULT NULL COMMENT 'Ayar değeri',
  `setting_type` enum('text','textarea','image','boolean','json') DEFAULT 'text',
  `description` varchar(255) DEFAULT NULL COMMENT 'Ayar açıklaması',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `general_settings`
--

INSERT INTO `general_settings` (`id`, `setting_key`, `setting_value`, `setting_type`, `description`, `updated_at`) VALUES
(1, 'erkek_kol_category', '{\"heroImage\":\"\\/images\\/erkek-menu-hero.jpg\",\"heroTitle\":\"Erkek Kol\",\"heroSubtitle\":\"Stil ve rahatlığın mükemmel birleşimi.\",\"heroDescription\":\"Erkekler için tasarlanmış\\nzaif ve konforlu kol ürünleri.\",\"categoryTitle\":\"ERKEK KOL\",\"products\":[]}', 'json', NULL, '2026-02-12 08:09:45'),
(2, 'menu_images', '{\"mucevherHero\":\"\\/images\\/menu\\/1771326006_b30b913f_M__cevher_kategori_foto.png\",\"mucevherHeroPosition\":\"54% 46%\",\"mucevherHeroScale\":1,\"koleksiyonHero\":\"\\/images\\/menu\\/1771326017_7f320e85_koleksiyon_kategori_foto.png\",\"koleksiyonHeroPosition\":\"49% 54%\",\"erkekHero\":\"\\/images\\/menu\\/1771326029_0516a3b4_erkek_menu.png\",\"erkekHeroPosition\":\"47% 70%\"}', 'json', NULL, '2026-02-17 11:00:38'),
(430, 'koleksiyon_sayfasi', '[{\"id\":1,\"image\":\"\\/images\\/products\\/1769676587_b3b37281_YZ18001.jpg\",\"name\":\"YZK-180001\",\"category\":\"Yüzük\",\"link\":\"\\/urun\\/YZ18001\"},{\"id\":2,\"image\":\"\\/images\\/products\\/1769676329_41cccad3_YZ14004.jpg\",\"name\":\"YZK-140004\",\"category\":\"Yüzük\",\"link\":\"\\/urun\\/YZ14004\"},{\"id\":4,\"image\":\"\\/images\\/products\\/1769771480_0b413212_BL18006.jpg\",\"name\":\"BLK-180006\",\"category\":\"Bileklik\",\"link\":\"\\/urun\\/BL18006\"},{\"id\":6,\"image\":\"\\/images\\/products\\/1769674530_3b5671a3_YZ18018.jpg\",\"name\":\"YZK-180018\",\"category\":\"Yüzük\",\"link\":\"\\/urun\\/YZ18018\"}]', 'json', NULL, '2026-04-01 09:30:15');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `header_main_nav`
--

DROP TABLE IF EXISTS `header_main_nav`;
CREATE TABLE `header_main_nav` (
  `id` int(11) NOT NULL,
  `text` varchar(100) NOT NULL COMMENT 'Menü metni',
  `url` varchar(255) NOT NULL COMMENT 'Menü linki',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `header_main_nav`
--

INSERT INTO `header_main_nav` (`id`, `text`, `url`, `sort_order`, `is_active`) VALUES
(1, 'MÜCEVHER', '/mucevher', 1, 1),
(2, 'KOLEKSİYON', '/koleksiyon', 2, 1),
(3, 'ÖZEL TASARIM', '/ozel-tasarim', 3, 1),
(4, 'HEDİYE', '/hediye', 4, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `header_settings`
--

DROP TABLE IF EXISTS `header_settings`;
CREATE TABLE `header_settings` (
  `id` int(11) NOT NULL,
  `logo_image` varchar(255) DEFAULT '/images/logo.png',
  `logo_alt` varchar(100) DEFAULT 'Han Kuyumculuk',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `header_settings`
--

INSERT INTO `header_settings` (`id`, `logo_image`, `logo_alt`, `updated_at`) VALUES
(1, '/images/logo.png', 'Han Kuyumculuk', '2026-01-21 15:30:29');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `header_top_links`
--

DROP TABLE IF EXISTS `header_top_links`;
CREATE TABLE `header_top_links` (
  `id` int(11) NOT NULL,
  `text` varchar(100) NOT NULL COMMENT 'Link metni',
  `url` varchar(255) NOT NULL COMMENT 'Link adresi',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `header_top_links`
--

INSERT INTO `header_top_links` (`id`, `text`, `url`, `sort_order`, `is_active`) VALUES
(1, 'Hakkımızda', '/hakkimizda', 1, 1),
(2, 'Blog', '/blog', 2, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `hero_slides`
--

DROP TABLE IF EXISTS `hero_slides`;
CREATE TABLE `hero_slides` (
  `id` int(11) NOT NULL,
  `background_media` varchar(255) NOT NULL COMMENT 'Görsel veya video dosyası',
  `media_type` enum('image','video') DEFAULT 'image',
  `title` varchar(255) DEFAULT NULL COMMENT 'Başlık',
  `title_en` varchar(255) DEFAULT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL COMMENT 'Alt başlık',
  `subtitle_en` varchar(255) DEFAULT NULL,
  `subtitle_ru` varchar(255) DEFAULT NULL,
  `button_text` varchar(100) DEFAULT NULL COMMENT 'Buton metni',
  `button_text_en` varchar(100) DEFAULT NULL,
  `button_text_ru` varchar(100) DEFAULT NULL,
  `button_link` varchar(255) DEFAULT NULL COMMENT 'Buton linki',
  `sort_order` int(11) DEFAULT 0,
  `image_position` varchar(50) DEFAULT '50% 50%',
  `image_scale` decimal(3,2) DEFAULT 1.00,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `hero_slides`
--

INSERT INTO `hero_slides` (`id`, `background_media`, `media_type`, `title`, `title_en`, `title_ru`, `subtitle`, `subtitle_en`, `subtitle_ru`, `button_text`, `button_text_en`, `button_text_ru`, `button_link`, `sort_order`, `image_position`, `image_scale`, `is_active`, `created_at`, `updated_at`) VALUES
(5, '/images/hero/1771938457_16fee9a4_Video_Project_1.mp4', 'image', 'zarafet  sanatı', 'the art  of elegance', 'искусство  изящества', 'EŞSIZ TASARIMLAR, ZAMANSIZ DEĞERLER', 'UNIQUE DESIGNS, TIMELESS VALUES', 'УНИКАЛЬНЫЕ ДИЗАЙНЫ, ВЕЧНЫЕ ЦЕННОСТИ', 'MÜCEVHERLERİ KEŞFEDİN', 'DISCOVER JEWELRY', 'ОТКРОЙТЕ ЮВЕЛИРНЫЕ ИЗДЕЛИЯ', '/mucevher/yuzuk', 1, '50% 50%', 1.00, 1, '2026-02-12 08:09:44', '2026-03-18 13:21:22'),
(6, '/images/hero/1770990751_55131eac_hero_bg2.mp4', 'image', 'sonsuz masal', 'an eternal  tale', 'бесконечная  сказка', 'HER PARÇADA BİR HİKÂYE SAKLANIYOR', 'EVERY PIECE HOLDS A STORY', 'В КАЖДОМ ИЗДЕЛИИ СКРЫТА СВОЯ ИСТОРИЯ', 'KOLEKSİYONLARI KEŞFEDİN', 'DISCOVER COLLECTIONS', 'ОТКРОЙТЕ КОЛЛЕКЦИИ', '/koleksiyon/gozumun-nuru', 2, '50% 50%', 1.00, 1, '2026-02-12 08:09:44', '2026-03-18 13:21:22'),
(7, '/images/hero/1770990759_ae8292b2_hero_bg3.mp4', 'image', 'özel  randevu', 'private  appointment', 'персональная  встреча', 'SİZE ÖZEL BİR DENEYİM İÇİN', 'FOR AN EXPERIENCE TAILORED TO YOU', 'ДЛЯ ЭКСКЛЮЗИВНОГО ВПЕЧАТЛЕНИЯ', 'RANDEVU OLUŞTURUN', 'BOOK AN APPOINTMENT', 'ЗАПИШИТЕСЬ НА ПРИЁМ', '/randevu', 3, '50% 50%', 1.00, 1, '2026-02-12 08:09:44', '2026-03-18 13:21:22'),
(8, '/images/hero/1770990764_9e7b66ad_hero_bg4.mp4', 'image', 'nadide  sanat', 'exquisite  artistry', 'редкое  искусство', 'SADECE SİZE ÖZEL TASARIMLAR', 'DESIGNS EXCLUSIVELY FOR YOU', 'ДИЗАЙНЫ, СОЗДАННЫЕ ТОЛЬКО ДЛЯ ВАС', 'SİZE ÖZEL', 'EXCLUSIVELY YOURS', 'ТОЛЬКО ДЛЯ ВАС', '/ozel-tasarim/', 4, '50% 50%', 1.00, 1, '2026-02-12 08:09:44', '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `homepage_blog_section`
--

DROP TABLE IF EXISTS `homepage_blog_section`;
CREATE TABLE `homepage_blog_section` (
  `id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `title_en` text DEFAULT NULL,
  `title_ru` text DEFAULT NULL,
  `subtitle` varchar(100) DEFAULT NULL,
  `subtitle_en` varchar(100) DEFAULT NULL,
  `subtitle_ru` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ru` text DEFAULT NULL,
  `additional_text` text DEFAULT NULL,
  `additional_text_en` text DEFAULT NULL,
  `additional_text_ru` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `link_text` varchar(100) DEFAULT NULL,
  `link_text_en` varchar(100) DEFAULT NULL,
  `link_text_ru` varchar(100) DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `homepage_blog_section`
--

INSERT INTO `homepage_blog_section` (`id`, `title`, `title_en`, `title_ru`, `subtitle`, `subtitle_en`, `subtitle_ru`, `description`, `description_en`, `description_ru`, `additional_text`, `additional_text_en`, `additional_text_ru`, `image`, `link_text`, `link_text_en`, `link_text_ru`, `link_url`, `is_active`, `updated_at`) VALUES
(1, 'Pırlantanın Hikâyesi,\nZarafetin İlhamı', 'The Story of Diamonds,\nThe Inspiration of Elegance', 'История бриллианта,\nвдохновение изящества', 'HAN BLOG', 'HAN BLOG', 'БЛОГ HAN', 'Gözümün Nuru Blog, pırlantanın yalnızca bir mücevher değil; anlam, duygu ve hikâye taşıyan bir değer olduğuna inananlar için hazırlandı.', 'The Light of My Eyes Blog is crafted for those who believe that a diamond is not merely a jewel, but a bearer of meaning, emotion, and story.', 'Блог «Свет моих глаз» создан для тех, кто верит, что бриллиант — это не просто украшение, а ценность, несущая в себе смысл, чувства и историю.', 'Bu alanda; yüzüklerden kolyelere, özel gün hediyelerinden pırlanta seçme rehberlerine kadar merak edilen tüm detayları, ilham veren içerikler ve uzman bakış açılarıyla bulacaksınız.', 'In this space, you will find all the details you have been curious about, from rings to necklaces, from special occasion gifts to diamond selection guides, presented through inspiring content and expert perspectives.', 'Здесь вы найдёте все интересующие детали — от колец до колье, от подарков к особым дням до руководств по выбору бриллиантов — в сопровождении вдохновляющего контента и экспертных мнений.', '/images/blog-featured.jpg', 'yazının devamı', 'read more', 'продолжение статьи', '/blog/pirlanta-hikayeleri', 1, '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `homepage_cards`
--

DROP TABLE IF EXISTS `homepage_cards`;
CREATE TABLE `homepage_cards` (
  `id` int(11) NOT NULL,
  `section_type` enum('top','bottom') NOT NULL COMMENT 'Üst veya alt kartlar',
  `title` varchar(100) NOT NULL,
  `title_en` varchar(100) DEFAULT NULL,
  `title_ru` varchar(100) DEFAULT NULL,
  `subtitle` text DEFAULT NULL,
  `subtitle_en` text DEFAULT NULL,
  `subtitle_ru` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `button_text` varchar(50) DEFAULT NULL,
  `button_text_en` varchar(50) DEFAULT NULL,
  `button_text_ru` varchar(50) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_position` varchar(50) DEFAULT '50% 50%',
  `image_scale` decimal(3,2) DEFAULT 1.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `homepage_cards`
--

INSERT INTO `homepage_cards` (`id`, `section_type`, `title`, `title_en`, `title_ru`, `subtitle`, `subtitle_en`, `subtitle_ru`, `image`, `link`, `button_text`, `button_text_en`, `button_text_ru`, `sort_order`, `is_active`, `updated_at`, `image_position`, `image_scale`) VALUES
(2396, 'top', 'HEDİYE', 'HEDİYE', 'HEDİYE', '', '', '', '/images/categories/mucevher-card.jpg', '/hediye', 'KEŞFEDİN', 'KEŞFEDİN', 'KEŞFEDİN', 1, 1, '2026-04-01 09:30:15', '50% 50%', 1.00),
(2397, 'top', 'ERKEKLERE ÖZEL', 'ERKEKLERE ÖZEL', 'ERKEKLERE ÖZEL', '', '', '', '/images/categories/1771325192_07f6dbf3_erkeklere___zel_kategori_foto.png', '/erkek/tesbih', 'KEŞFEDİN', 'KEŞFEDİN', 'KEŞFEDİN', 2, 1, '2026-04-01 09:30:15', '50% 50%', 1.00),
(2398, 'top', 'ÖZEL TASARIM', 'ÖZEL TASARIM', 'ÖZEL TASARIM', '', '', '', '/images/categories/ozel-tasarim-card.jpg', '/ozel-tasarim', 'KEŞFEDİN', 'KEŞFEDİN', 'KEŞFEDİN', 3, 1, '2026-04-01 09:30:15', '50% 50%', 1.00),
(2399, 'bottom', 'PRELOVED', 'PRELOVED', 'PRELOVED', 'Uluslararası mücevher markalarına ait \norijinal koleksiyonlardan özel seçimler, sizi bekliyor.', 'Uluslararası mücevher markalarına ait \norijinal koleksiyonlardan özel seçimler, sizi bekliyor.', 'Uluslararası mücevher markalarına ait \norijinal koleksiyonlardan özel seçimler, sizi bekliyor.', '/images/promo/1770990882_ebf2d05f_PRELOVED_anasayfa_jpg.jpg', '/preloved', 'ÜRÜNLERİ İNCELEYİN', 'ÜRÜNLERİ İNCELEYİN', 'ÜRÜNLERİ İNCELEYİN', 1, 1, '2026-04-01 09:30:15', '50% 50%', 1.00),
(2400, 'bottom', 'RANDEVU OLUŞTURUN', 'RANDEVU OLUŞTURUN', 'RANDEVU OLUŞTURUN', 'Size özel bir deneyim için\nrandevu alın, sizi bekliyor olacağız.', 'Size özel bir deneyim için\nrandevu alın, sizi bekliyor olacağız.', 'Size özel bir deneyim için\nrandevu alın, sizi bekliyor olacağız.', '/images/promo/1771483200_92c90fa0_han_magaza_logo_pano.png', '/randevu', 'RANDEVU ALIN', 'RANDEVU ALIN', 'RANDEVU ALIN', 2, 1, '2026-04-01 09:30:15', '50% 50%', 1.00);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `homepage_featured_section`
--

DROP TABLE IF EXISTS `homepage_featured_section`;
CREATE TABLE `homepage_featured_section` (
  `id` int(11) NOT NULL,
  `title_part1` varchar(100) DEFAULT 'SİZE ÖZEL',
  `title_part1_en` varchar(100) DEFAULT NULL,
  `title_part1_ru` varchar(100) DEFAULT NULL,
  `title_part2` varchar(100) DEFAULT 'ÜRÜNLERİMİZ',
  `title_part2_en` varchar(100) DEFAULT NULL,
  `title_part2_ru` varchar(100) DEFAULT NULL,
  `banner_image1` varchar(255) DEFAULT NULL,
  `banner_image2` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `homepage_featured_section`
--

INSERT INTO `homepage_featured_section` (`id`, `title_part1`, `title_part1_en`, `title_part1_ru`, `title_part2`, `title_part2_en`, `title_part2_ru`, `banner_image1`, `banner_image2`, `is_active`, `updated_at`) VALUES
(1, 'SİZE ÖZEL', 'EXCLUSIVELY', 'СПЕЦИАЛЬНО', 'ÜRÜNLERİMİZ', 'FOR YOU', 'ДЛЯ ВАС', '/images/products/1772442365_bfc66548_mavi_yuzuk.png', '/images/products/1770967470_438ca162_bordo_bileklik__2_.png', 1, '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `homepage_investment_section`
--

DROP TABLE IF EXISTS `homepage_investment_section`;
CREATE TABLE `homepage_investment_section` (
  `id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `title_en` text DEFAULT NULL,
  `title_ru` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ru` text DEFAULT NULL,
  `left_image` varchar(255) DEFAULT NULL,
  `right_image` varchar(255) DEFAULT NULL,
  `button_text` varchar(100) DEFAULT NULL,
  `button_text_en` varchar(100) DEFAULT NULL,
  `button_text_ru` varchar(100) DEFAULT NULL,
  `button_link` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `homepage_investment_section`
--

INSERT INTO `homepage_investment_section` (`id`, `title`, `title_en`, `title_ru`, `description`, `description_en`, `description_ru`, `left_image`, `right_image`, `button_text`, `button_text_en`, `button_text_ru`, `button_link`, `is_active`, `updated_at`) VALUES
(1, 'BUGÜNDEN\nYARINLARA\nGÜVENLE', 'FROM TODAY\nTO TOMORROW\nWITH CONFIDENCE', 'ОТ СЕГОДНЯ\nК БУДУЩЕМУ\nС УВЕРЕННОСТЬЮ', 'Kalitesi sertifikalı yatırımlık altın ürünleriyle geleceğinizi güvenle şekillendirin. Her gram, istikrarlı bir adım demektir.', 'Shape your future with confidence through certified investment-grade gold products. Every gram represents a steadfast step forward.', 'Формируйте своё будущее с уверенностью благодаря сертифицированным инвестиционным золотым изделиям. Каждый грамм — это надёжный шаг.', '/images/investment.jpg', '/images/investment-product.jpg', 'YATIRIMLIK ÜRÜNLER', 'INVESTMENT PRODUCTS', 'ИНВЕСТИЦИОННЫЕ ИЗДЕЛИЯ', '/yatirim', 1, '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `homepage_parallax_section`
--

DROP TABLE IF EXISTS `homepage_parallax_section`;
CREATE TABLE `homepage_parallax_section` (
  `id` int(11) NOT NULL,
  `background_image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `homepage_parallax_section`
--

INSERT INTO `homepage_parallax_section` (`id`, `background_image`, `is_active`, `updated_at`) VALUES
(1, '/images/parallax-bg.jpg', 1, '2026-01-21 15:30:29');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `homepage_special_section`
--

DROP TABLE IF EXISTS `homepage_special_section`;
CREATE TABLE `homepage_special_section` (
  `id` int(11) NOT NULL,
  `title_part1` varchar(100) DEFAULT 'KENDİNİZİ',
  `title_part1_en` varchar(100) DEFAULT NULL,
  `title_part1_ru` varchar(100) DEFAULT NULL,
  `title_part2` varchar(100) DEFAULT 'ÖZEL HİSSEDİN',
  `title_part2_en` varchar(100) DEFAULT NULL,
  `title_part2_ru` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `homepage_special_section`
--

INSERT INTO `homepage_special_section` (`id`, `title_part1`, `title_part1_en`, `title_part1_ru`, `title_part2`, `title_part2_en`, `title_part2_ru`, `is_active`, `updated_at`) VALUES
(1, 'KENDİNİZİ', 'FEEL', 'ПОЧУВСТВУЙТЕ', 'ÖZEL HİSSEDİN', 'EXTRAORDINARY', 'СЕБЯ ОСОБЕННОЙ', 1, '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `homepage_story_section`
--

DROP TABLE IF EXISTS `homepage_story_section`;
CREATE TABLE `homepage_story_section` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `main_text` text DEFAULT NULL,
  `main_text_en` text DEFAULT NULL,
  `main_text_ru` text DEFAULT NULL,
  `sub_text` text DEFAULT NULL,
  `sub_text_en` text DEFAULT NULL,
  `sub_text_ru` text DEFAULT NULL,
  `link_text` varchar(100) DEFAULT NULL,
  `link_text_en` varchar(100) DEFAULT NULL,
  `link_text_ru` varchar(100) DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `homepage_story_section`
--

INSERT INTO `homepage_story_section` (`id`, `title`, `title_en`, `title_ru`, `main_text`, `main_text_en`, `main_text_ru`, `sub_text`, `sub_text_en`, `sub_text_ru`, `link_text`, `link_text_en`, `link_text_ru`, `link_url`, `is_active`, `updated_at`) VALUES
(1, 'Zarafetiyle Bir Hikaye', 'A Story of Elegance', 'История Элегантности', 'Han Kuyumculuk, bir pırlantadan çok daha fazlasını temsil eder; değer verilen kişiyi, paylaşılan özel anları ve kalpten gelen duyguları ışığa dönüştüren bir semboldür.', 'Han Kuyumculuk represents much more than a diamond; it is a symbol that transforms the person you value, the special moments shared, and the feelings from the heart into light.', 'Han Kuyumculuk представляет собой гораздо больше, чем бриллиант; это символ, превращающий дорогого вам человека, разделённые особые моменты и чувства от сердца в свет.', 'Han Kuyumculuk, ışığın içinden doğan bu anlamı taşıyarak her kadının kalbinde özel bir yer bırakır; çünkü her ışıltının ardında unutulmaz bir hikâye vardır.', 'Han Kuyumculuk, carrying this meaning born from light, leaves a special place in every woman\'s heart; because behind every sparkle lies an unforgettable story.', 'Han Kuyumculuk, неся этот смысл, рождённый из света, оставляет особое место в сердце каждой женщины; ведь за каждым сиянием скрывается незабываемая история.', 'Işığın Aşka Dönüştüğü Hikâye', 'The Story Where Light Becomes Love', 'История, где свет становится любовью', '/hikaye', 1, '2026-03-18 13:21:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `homepage_trend_section`
--

DROP TABLE IF EXISTS `homepage_trend_section`;
CREATE TABLE `homepage_trend_section` (
  `id` int(11) NOT NULL,
  `left_image` varchar(255) DEFAULT NULL,
  `left_title` varchar(255) DEFAULT NULL,
  `left_title_en` varchar(255) DEFAULT NULL,
  `left_title_ru` varchar(255) DEFAULT NULL,
  `left_title_link` varchar(255) DEFAULT NULL,
  `left_link` varchar(255) DEFAULT NULL,
  `right_image` varchar(255) DEFAULT NULL,
  `right_title` varchar(255) DEFAULT NULL,
  `right_title_en` varchar(255) DEFAULT NULL,
  `right_title_ru` varchar(255) DEFAULT NULL,
  `right_title_link` varchar(255) DEFAULT NULL,
  `right_link` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `left_image_position` varchar(50) DEFAULT '50% 50%',
  `left_image_scale` decimal(3,2) DEFAULT 1.00,
  `right_image_position` varchar(50) DEFAULT '50% 50%',
  `right_image_scale` decimal(3,2) DEFAULT 1.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `homepage_trend_section`
--

INSERT INTO `homepage_trend_section` (`id`, `left_image`, `left_title`, `left_title_en`, `left_title_ru`, `left_title_link`, `left_link`, `right_image`, `right_title`, `right_title_en`, `right_title_ru`, `right_title_link`, `right_link`, `is_active`, `updated_at`, `left_image_position`, `left_image_scale`, `right_image_position`, `right_image_scale`) VALUES
(1, '/images/trend/1771324798_f5a8f56d_tasarimlarimiz.png', 'Tasarımlarımız', 'Our Designs', 'Наши дизайны', '/mucevher/yuzuk', '/ozel-tasarim/', '/images/trend/1772453076_c43abe3d_IMG_1178_lifestyle.jpg', 'Koleksiyonlarımız', 'Our Collection', 'Наша коллекция', '/koleksiyon/gozumun-nuru', '/koleksiyon/gozumun-nuru', 1, '2026-03-27 07:56:18', '50% 50%', 1.00, '50% 50%', 1.80);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `media`
--

DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(50) DEFAULT NULL COMMENT 'image/jpeg, video/mp4 vb.',
  `file_size` int(11) DEFAULT NULL COMMENT 'Dosya boyutu (byte)',
  `width` int(11) DEFAULT NULL COMMENT 'Görsel genişliği',
  `height` int(11) DEFAULT NULL COMMENT 'Görsel yüksekliği',
  `alt_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `pages`
--

DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `slug` varchar(100) NOT NULL COMMENT 'URL için slug',
  `title` varchar(255) NOT NULL COMMENT 'Sayfa başlığı',
  `title_en` varchar(255) DEFAULT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `hero_image` varchar(255) DEFAULT NULL,
  `hero_image_position` varchar(50) DEFAULT '50% 50%',
  `hero_image_scale` decimal(3,2) DEFAULT 1.00,
  `hero_title` varchar(255) DEFAULT NULL,
  `hero_title_en` varchar(255) DEFAULT NULL,
  `hero_title_ru` varchar(255) DEFAULT NULL,
  `hero_subtitle` varchar(255) DEFAULT NULL,
  `hero_subtitle_en` varchar(255) DEFAULT NULL,
  `hero_subtitle_ru` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL COMMENT 'Sayfa içeriği (HTML destekli)',
  `content_en` longtext DEFAULT NULL,
  `content_ru` longtext DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_title_en` varchar(255) DEFAULT NULL,
  `meta_title_ru` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_description_en` text DEFAULT NULL,
  `meta_description_ru` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `values_title` varchar(255) DEFAULT 'Vizyonumuz' COMMENT 'Values bölümü başlığı'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `pages`
--

INSERT INTO `pages` (`id`, `slug`, `title`, `title_en`, `title_ru`, `hero_image`, `hero_image_position`, `hero_image_scale`, `hero_title`, `hero_title_en`, `hero_title_ru`, `hero_subtitle`, `hero_subtitle_en`, `hero_subtitle_ru`, `content`, `content_en`, `content_ru`, `meta_title`, `meta_title_en`, `meta_title_ru`, `meta_description`, `meta_description_en`, `meta_description_ru`, `is_active`, `created_at`, `updated_at`, `values_title`) VALUES
(1, 'ozel-tasarim', 'Özel Tasarım', 'Custom Design', 'Индивидуальный дизайн', '/images/pages/1771410449_1c504970_size_ozel_header_jpg.jpg', '50% 50%', 1.00, 'Size Özel Tasarımlar', 'Designs Made For You', 'Дизайны, созданные для вас', 'Hayalinizdeki mücevheri birlikte tasarlayalım', 'Let us design the jewelry of your dreams together', 'Давайте вместе создадим украшение вашей мечты', '{\"heroSubtitle\":\"Han Kuyumculuk\",\"heroTitle\":\"Size Özel\",\"heroDesc\":\"Her şey sizi dinlemekle başlıyor...\",\"scrollText\":\"Keşfedin\",\"philosophyQuote1\":\"Gerçek değer,\",\"philosophyQuote2\":\"kişiye ait olanda saklıdır.\",\"philosophyText\":\"Size özel olan,\\nhazır kalıplara sığmaz.\\nBir ölçüden fazlasıdır;\\nbir duruştur, bir ihtiyaçtır, bir hikâyedir.\",\"splitImage\":\"/images/pages/1771411171_b9b5147c_size_ozel_jpg.jpg\",\"splitTitle\":\"Dinlenmeyi\\nbeklersiniz.\",\"splitText1\":\"Söylediklerinizin anlaşılmasını,\\nanlatmak istediklerinizin\\ndikkatle ele alınmasını istersiniz.\",\"splitText2\":\"Detay ararsınız.\\nHer çizginin, her dokunun\\nsizinle bir bağ kurmasını beklersiniz.\",\"processTitle\":\"Özgürlük İstersiniz\",\"processSubtitle\":\"Seçeneklerin sizi sınırlamamasını,\\naksine size alan açmasını beklersiniz.\",\"steps\":[{\"label\":\"İlk Adım\",\"title\":\"Anlama\",\"desc\":\"Mücevher, biçim almadan önce sizi anlamakla başlar.\\nBeklentiler, duygular ve size ait hikâye bu aşamada netleşir.\\nHalinizi, niyenizi, anlatmak istediğinizi duygunuzu dinleriz.\"},{\"label\":\"İkinci Adım\",\"title\":\"Şekillendirme\",\"desc\":\"Ölçüler, dokular ve detaylar, yavaş yavaş belirir.\\nBu aşama bir karar değil, bir keşiftir.\\nParça kendini bulana kadar çalışılır.\\nBu aşamada, sizin beklentileriniz ile bizim teknik bilgimiz\\nve yıllara dayanan üretim tecrübemiz bir araya gelir.\\nTasarım, bu evrede gerçek karakterini kazanır.\"},{\"label\":\"Üçüncü Adım\",\"title\":\"Üretim\",\"desc\":\"Tasarım netleştiğinde, usta ellerde,\\neşsiz bir parça olarak hayata geçer.\\nBeklenti ve istekleriniz tam olarak karşılık bulana dek\\nsüreç titizlikle devam eder.\"},{\"label\":\"Son Adım\",\"title\":\"Tamamlanma\",\"desc\":\"Ortaya çıkan mücevher, artık yalnızca bir tasarım değil,\\nsize ait bir iz haline gelir.\\nTamamlanma, beklentileriniz eksiksiz karşılandığında gerçekleşir.\"}],\"darkBgImage\":\"/images/parallax-bg.jpg\",\"darkTitle\":\"Ve Sonunda...\",\"darkText1\":\"Size ait olduğunu hissettiren\",\"darkText1Cursive\":\"bir parça beklersiniz.\",\"darkText2\":\"Başkasına değil,\\ntam olarak size yakışan.\",\"ctaTitle1\":\"İşte bu yüzden\",\"ctaTitle2\":\"Han \\\"Size Özel\\\"\",\"ctaDesc\":\"Dinleyen, anlayan ve sizin için şekillenen\\nbir ustalık yaklaşımı sunar.\",\"ctaButtonText\":\"RANDEVU OLUŞTURUN\",\"ctaButtonLink\":\"/randevu?subject=size-ozel\",\"galleryImages\":[{\"image\":\"/images/pages/1771409950_d428e56a_BL18004.jpg\",\"href\":\"/urun/BL18004\"},{\"image\":\"/images/pages/1771409967_8f27cfbd_YZ18018_1.jpg\",\"href\":\"/urun/YZ18018\"},{\"image\":\"/images/pages/1771409984_c5f75a85_KL18007.jpg\",\"href\":\"/urun/KL18007\"}]}', NULL, NULL, NULL, 'Custom Design - Han Jewelry', 'Индивидуальный дизайн - Han Ювелирные', NULL, 'Custom jewelry design service by Han Jewelry. Create your dream piece with us.', 'Услуга индивидуального дизайна украшений Han Ювелирные. Создайте своё уникальное изделие вместе с нами.', 1, '2026-01-21 15:30:29', '2026-03-31 07:58:40', 'Vizyonumuz'),
(2, 'preloved', 'Preloved', 'Preloved', 'Preloved', '/images/preloved-hero.jpg', '50% 50%', 1.00, 'Preloved Koleksiyon', 'Preloved Collection', 'Коллекция Preloved', 'Zamana meydan okuyan parçalar', 'Pieces that defy time', 'Изделия, бросающие вызов времени', '<p>Özenle seçilmiş, özgünlüğü korunmuş ve yeniden keşfedilmeyi bekleyen mücevherler.</p>', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22', 'Vizyonumuz'),
(3, 'yatirim', 'Yatırımlık Ürünler', 'Investment Products', 'Инвестиционные продукты', '/images/investment.jpg', '50% 50%', 1.00, 'DEĞER', 'VALUE', 'ЦЕННОСТЬ', 'KORUMA', 'PROTECTION', 'ЗАЩИТА', '<p>Geleceğe güvenle bakın. Yatırımlık altın ürünlerimizle birikimlerinizi değerli metallere dönüştürün. Güvenilir ve sertifikalı ürünler.</p><p>Gram altından tam altına, çeyrekten yarım altına kadar geniş ürün yelpazemizle tasarruflarınızı koruma altına alın. Her ürün, uluslararası standartlarda sertifikalıdır.</p><p>Altın, yüzyıllardır değerini koruyan en güvenilir yatırım aracı. Han Kuyumculuk güvencesiyle yatırımlarınızı şekillendirin.</p><p>Uzman danışmanlarımız, yatırım hedeflerinize uygun ürünleri seçmenizde size rehberlik eder. Güvenli saklama ve sigorta seçenekleriyle huzurlu bir yatırım deneyimi.</p>', NULL, NULL, 'Yatırımlık Ürünler - Han Kuyumculuk', 'Investment Products - Han Jewelry', 'Инвестиционные продукты - Han Ювелирные', 'Yatırımlık altın ürünleri, sertifikalı altın ve güvenli yatırım seçenekleri.', 'Investment gold products, certified gold and safe investment options.', 'Инвестиционные золотые изделия, сертифицированное золото и безопасные инвестиции.', 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22', 'Vizyonumuz'),
(4, 'iletisim', 'İletişim', 'Contact', 'Контакты', '/images/contact-hero.jpg', '50% 50%', 1.00, 'İletişim', 'Contact', 'Контакты', 'Sizinle tanışmak için sabırsızlanıyoruz', 'We look forward to meeting you', 'Мы с нетерпением ждём встречи с вами', '<p>Han Kuyumculuk olarak, size en iyi hizmeti sunmak için buradayız. Sorularınız, önerileriniz veya özel tasarım talepleriniz için bizimle iletişime geçebilirsiniz.</p>', NULL, NULL, 'İletişim - Han Kuyumculuk', 'Contact - Han Jewelry', 'Контакты - Han Ювелирные', 'Han Kuyumculuk iletişim bilgileri, adres, telefon ve çalışma saatleri.', 'Han Jewelry contact information, address, phone and working hours.', 'Контактная информация Han Ювелирные: адрес, телефон и часы работы.', 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22', 'Vizyonumuz'),
(5, 'randevu', 'Randevu Oluşturun', 'Book an Appointment', 'Записаться на приём', '/images/categories/ozel-tasarim-card.jpg', '50% 50%', 1.00, 'Randevu Oluşturun', 'Book an Appointment', 'Записаться на приём', 'Özel tasarım süreciniz için bir adım atın. Size uygun bir zamanda buluşalım.', 'Take a step for your custom design process. Let\'s meet at a time that suits you.', 'Сделайте шаг к индивидуальному дизайну. Давайте встретимся в удобное для вас время.', '<p>Özel tasarım görüşmeleri ve kişiye özel alışveriş deneyimi için randevu alabilirsiniz. Size özel bir deneyim sunmak için sabırsızlanıyoruz.</p>', NULL, NULL, 'Randevu Oluşturun - Han Kuyumculuk', 'Book an Appointment - Han Jewelry', 'Запись на приём - Han Ювелирные', 'Han Kuyumculuk randevu sistemi. Özel tasarım görüşmeleri için randevu alın.', 'Han Jewelry appointment system. Book an appointment for custom design consultations.', 'Система записи Han Ювелирные. Запишитесь на консультацию по индивидуальному дизайну.', 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22', 'Vizyonumuz'),
(6, 'blog', 'Blog', 'Blog', 'Блог', '/images/blog-featured.jpg', '50% 50%', 1.00, 'Pırlantanın Hikâyesi, Zarafetin İlhamı', 'The Story of Diamonds, The Inspiration of Elegance', 'История бриллиантов, вдохновение элегантности', 'HAN BLOG', 'HAN BLOG', 'БЛОГ HAN', '<p>Gözümün Nuru Blog, pırlantanın yalnızca bir mücevher değil; anlam, duygu ve hikâye taşıyan bir değer olduğuna inananlar için hazırlandı.</p><p>Bu alanda; yüzüklerden kolyelere, özel gün hediyelerinden pırlanta seçme rehberlerine kadar merak edilen tüm detayları, ilham veren içerikler ve uzman bakış açılarıyla bulacaksınız.</p>', NULL, NULL, 'Blog - Han Kuyumculuk', 'Blog - Han Jewelry', 'Блог - Han Ювелирные', 'Pırlanta hikâyeleri, mücevher bakımı, tasarım ipuçları ve daha fazlası.', 'Diamond stories, jewelry care, design tips and more.', 'Истории о бриллиантах, уход за украшениями, советы по дизайну и многое другое.', 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22', 'Vizyonumuz'),
(7, 'hakkimizda', 'Hakkımızda', 'About Us', 'О нас', '/images/pages/1771321675_078e50d5_magaza_jpg.jpg', '50% 50%', 1.00, 'Hakkımızda', 'About Us', 'О нас', 'Han Kuyumculuk', 'Han Kuyumculuk', 'Han Kuyumculuk', '1988 yılında İstanbul’da kurulan Han Kuyumculuk, mücevher üretimini bir zanaat değil; bir disiplin, bir süreklilik ve bir sorumluluk olarak gören köklü bir üretici kuruluştur.\nKuruluşundan bu yana geçen yıllar boyunca Han Kuyumculuk, tasarımdan üretime uzanan tüm süreçlerde istikrar, kalite ve güven ilkelerini merkeze alarak yol almıştır. İstanbul’un tarihsel kuyumculuk kültüründen beslenen üretim anlayışı, çağdaş estetik ve teknik hassasiyetle birleşerek markanın karakterini oluşturur.\nBugün vitrinlerde görülen, farklı markalar altında sunulan birçok mücevher tasarımının arkasında Han imzası bulunmaktadır. Han Kuyumculuk, çoğu zaman adı görünmeden; ancak işçiliği, oranı ve detay diliyle kendini belli eden bir üretici olarak sektörde güçlü bir yer edinmiştir.\nHan, üretici kimliğiyle var olur. Tüm koleksiyonlar; alanında uzun yıllar deneyim kazanmış, her biri kendi uzmanlık alanında söz sahibi ekipler tarafından geliştirilir. Pırlanta ve değerli taşlar konusunda derin bilgi birikimine sahip uzman kadro, her parçayı teknik doğruluk kadar estetik dengeyle de ele alır. Bu yaklaşım, Han Kuyumculuk’un pırlantada güvenilen ve referans alınan bir marka olarak konumlanmasını sağlamıştır.\nÜretimde süreklilik, Han için yalnızca hacim değil; standartların korunması anlamına gelir. Kullanılan hammaddeden işçilik detaylarına, kalite kontrolden son sunuma kadar tüm aşamalar sistematik bir yapı içinde yürütülür. Bu yapı, yıllar içinde edinilen deneyimin kurumsal hafızaya dönüşmüş halidir.\nHan Kuyumculuk, hızlı trendlerin peşinden gitmek yerine zamansızlığı esas alır. Tasarımlar; dönemsel etkilerden bağımsız, uzun yıllar değerini koruyacak bir estetik anlayışla şekillendirilir. Bu yaklaşım, markanın hem üretici hem de tasarımcı kimliğinin doğal bir sonucudur. Bugün Han Kuyumculuk;\nGücünü yıllara dayanan üretim tecrübesinden,\nGüvenilirliğini uzman ve istikrarlı ekibinden,\nKimliğini ise pırlantada söz sahibi olma kararlılığından alır.\nHan, mücevheri yalnızca üreten değil; onu anlayan, ölçen ve kalıcı kılan bir marka olarak yoluna devam etmektedir.', 'Founded in 1988 in Istanbul, Han Kuyumculuk is a well-established manufacturer that views jewelry production not as a craft, but as a discipline, a continuity, and a responsibility.\nThroughout the years since its founding, Han Kuyumculuk has maintained its course by placing stability, quality, and trust at the core of all processes from design to production. The production philosophy, nourished by Istanbul\'s historical jewelry culture, merges with contemporary aesthetics and technical precision to form the brand\'s character.\nToday, behind many jewelry designs displayed in showcases and offered under different brands, lies the Han signature. Han Kuyumculuk has established a strong position in the industry as a manufacturer that often goes unnamed, yet reveals itself through its craftsmanship, proportions, and attention to detail.\nHan exists through its manufacturer identity. All collections are developed by teams with years of experience in their respective fields. An expert staff with deep knowledge in diamonds and precious stones handles each piece with technical accuracy as well as aesthetic balance. This approach has positioned Han Kuyumculuk as a trusted and referenced brand in diamonds.\nContinuity in production means more than volume for Han; it means maintaining standards. Every stage, from raw materials to craftsmanship details, from quality control to final presentation, is conducted within a systematic structure. This structure is the institutional memory formed from years of accumulated experience.\nHan Kuyumculuk embraces timelessness rather than chasing fleeting trends. Designs are shaped with an aesthetic understanding that remains independent of seasonal influences and preserves its value for years. This approach is a natural consequence of the brand\'s dual identity as both manufacturer and designer.', 'Основанная в 1988 году в Стамбуле, компания Han Kuyumculuk — это авторитетный производитель, рассматривающий ювелирное производство не как ремесло, а как дисциплину, преемственность и ответственность.\nНа протяжении всех лет с момента основания Han Kuyumculuk придерживается курса, ставя стабильность, качество и доверие в центр всех процессов — от дизайна до производства. Философия производства, питаемая исторической ювелирной культурой Стамбула, сочетается с современной эстетикой и технической точностью, формируя характер бренда.\nСегодня за многими ювелирными дизайнами, представленными в витринах под разными брендами, стоит подпись Han. Han Kuyumculuk занял прочные позиции в отрасли как производитель, чьё имя часто остаётся незамеченным, но чьё мастерство, пропорции и внимание к деталям говорят сами за себя.\nHan существует благодаря своей производительной идентичности. Все коллекции разрабатываются командами с многолетним опытом в своих областях. Экспертный персонал с глубокими знаниями в области бриллиантов и драгоценных камней работает с каждым изделием с технической точностью и эстетическим балансом.\nНепрерывность производства для Han означает не просто объём, а поддержание стандартов. Каждый этап систематически организован — от сырья до деталей мастерства, от контроля качества до финальной презентации.\nHan Kuyumculuk предпочитает вневременность погоне за быстротечными трендами. Дизайны создаются с эстетическим пониманием, независимым от сезонных влияний и сохраняющим свою ценность на долгие годы.', 'Hakkımızda - Han Kuyumculuk', 'About Us - Han Jewelry', 'О нас - Han Ювелирные', 'Han Kuyumculuk hikâyesi, değerlerimiz ve vizyonumuz.', 'Han Jewelry story, our values and vision.', 'История Han Ювелирные, наши ценности и видение.', 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22', 'Vizyonumuz'),
(8, 'musteri-hizmetleri/bakim-garanti', 'Bakım ve Garanti Koşulları', 'Care and Warranty', 'Уход и гарантия', NULL, '50% 50%', 1.00, 'Bakım ve Garanti Koşulları', 'Care and Warranty Terms', 'Условия ухода и гарантии', NULL, NULL, NULL, '<h2>Değerli Taş ve İnci Mücevher</h2><h3>1. Günlük Kullanım ve Bakım Uyarıları</h3><p>Elmas, değerli taş ve inci içeren mücevherler; doğal yapıları ve montaj hassasiyetleri nedeniyle özenli kullanım gerektirir.</p><h3>2. Temizlik Talimatları</h3><p>Temizlik işlemi, yalnızca ürüne uygun bakım kitleri ve yumuşak kıllı fırçalar kullanılarak yapılmalıdır.</p><h3>3. Garanti Kapsamı</h3><p>Mücevherler, teslim tarihinden itibaren garanti kapsamındadır.</p><h2>Altın ve Platin Mücevher</h2><h3>1. Ürün Bakımına İlişkin Bilgilendirme</h3><p>Altın ve platin mücevherler; doğal özellikleri, el işçiliği ve değerli taş içermeleri sebebiyle hassas ürünlerdir.</p>', NULL, NULL, 'Bakım ve Garanti - Han Kuyumculuk', 'Care & Warranty - Han Jewelry', 'Уход и гарантия - Han Ювелирные', 'Han Kuyumculuk bakım ve garanti koşulları, mücevher bakımı ve garanti kapsamı.', 'Han Jewelry care and warranty terms, jewelry maintenance and warranty coverage.', 'Условия ухода и гарантии Han Ювелирные, обслуживание украшений и гарантийное покрытие.', 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22', 'Vizyonumuz'),
(9, 'yasal/cerez-politikasi', 'Çerez Politikası', 'Cookie Policy', 'Политика cookies', NULL, '50% 50%', 1.00, 'Çerez Politikası', 'Cookie Policy', 'Политика cookies', NULL, NULL, NULL, '<h2>Han Kuyumculuk Çerez Politikası</h2><p>Han Kuyumculuk olarak çerezler kullanmaktayız. Çerezler, internet sitemiz üzerinden bilgi topladığımız ve bazı durumlarda internet sitemizi kullanımınıza ilişkin bilgileri takip edebildiğimiz otomatik araçlardır.</p><h2>Çerezler hangi amaçlarla kullanılır?</h2><h3>1. Çerezler İnternet Sitesinin Temel İşlevlerini Destekler</h3><p>Bazı çerezler, internet sitemizin temel işlevlerinin çalışabilmesi için gerekli olan zorunlu ve işlevsel çerezlerdir.</p><h3>2. Çerezler İnternet Sitemizin ve Hizmetlerimizin Kalitesini Artırmaya Yardımcı Olur</h3><p>Çerezler internet sitemizi nasıl kullandığınıza ilişkin bilgiler toplar.</p>', NULL, NULL, 'Çerez Politikası - Han Kuyumculuk', 'Cookie Policy - Han Jewelry', 'Политика cookies - Han Ювелирные', 'Han Kuyumculuk çerez politikası ve gizlilik bildirimi.', 'Han Jewelry cookie policy and privacy notice.', 'Политика cookies и уведомление о конфиденциальности Han Ювелирные.', 1, '2026-01-21 15:30:29', '2026-03-18 13:21:22', 'Vizyonumuz'),
(10, 'hediye', 'Hediye', 'Gifts', 'Подарки', '/images/pages/1772001758_b80017ce_hediye_jpg.jpg', '50% 50%', 1.00, 'Hediye', 'Gifts', 'Подарки', 'Kalplerde bir iz olarak kalan özel günler vardır', 'There are special days that leave a mark in hearts', 'Есть особые дни, оставляющие след в сердцах', '{\"philosophyTitle1\":\"Bir teşekkür,\",\"philosophyTitle2\":\"bir kutlama\",\"philosophyText\":\"\\\"iyi ki varsın\\\" demenin en kalıcı hâli…\\n\\nHan\'da hediye,\\nyalnızca bir mücevher seçimi değil;\\nduyulmuş, düşünülmüş ve anlam yüklenmiş bir jesttir.\",\"splitImage\":\"/images/pages/1771402779_65a6015f_WhatsApp_Image_2026_02_17_at_18_02_06.jpg\",\"splitTitle\":\"Değer\\nverdiğini göster\",\"splitText1\":\"Değer verdiğini, düşündüğünü\\nve özen gösterdiğini göstermenin\\nen açık yoludur.\",\"splitText2\":\"Anneler Günü\'nde minneti,\\nKadınlar Günü\'nde zarafeti,\\nSevgililer Günü\'nde bağı,\\nyıl dönümlerinde ortak bir hikâyeyi anlatır.\",\"categoriesTitle\":\"Kategorilerimiz\",\"categoriesSubtitle\":\"Seçilmiş, düşünülmüş ve\\nuzun vadeli bir değerin ifadesi\",\"categories\":[{\"title\":\"Yüzük\",\"description\":\"Biçiminin içinde anlam\",\"image\":\"/images/pages/1771403815_a3a372a8_YZ18016_5.jpg\",\"href\":\"/mucevher/yuzuk\"},{\"title\":\"Kolye\",\"description\":\"Göğsüne yakın sevgi\",\"image\":\"/images/pages/1771403879_27331d55_KL18014_5.jpg\",\"href\":\"/mucevher/kolye\"},{\"title\":\"Bileklik\",\"description\":\"Hareketiyle hikâye\",\"image\":\"/images/pages/1771403891_5d589889_BL18027_5.jpg\",\"href\":\"/mucevher/bileklik\"},{\"title\":\"Küpe\",\"description\":\"Yüze yakın söz\",\"image\":\"/images/pages/1771403903_327fac98_KP18005_5.jpg\",\"href\":\"/mucevher/kupe\"}],\"darkBgImage\":\"/images/parallax-bg.jpg\",\"darkText1\":\"Her parça;\\nzamansız tasarımı, dengeli oranları ve ustalıklı işçiliğiyle\\nverildiği ana değer katar.\",\"darkText2\":\"Gösterişten çok dengeye,\\nabartıdan çok ustalığa,\\ngeçicilikten çok kalıcılığa odaklanır.\",\"darkText3\":\"Çünkü bazı hediyeler,\\nkutudan çıktığı an değil,\\nyıllar sonra bile hatırlandığında anlam kazanır…\",\"ctaSmallTitle\":\"Peki Sen?\",\"ctaTitle\":\"Kimin hayatında iz bırakmak istiyorsun\",\"ctaSubtitle\":\"Seçilmiş, düşünülmüş ve\\nuzun vadeli bir değerin ifadesi\"}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2026-02-17 10:49:32', '2026-03-18 13:21:22', 'Vizyonumuz');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL COMMENT 'Bağlı olduğu kategori',
  `slug` varchar(255) NOT NULL COMMENT 'URL için slug',
  `name` varchar(255) NOT NULL COMMENT 'Ürün adı',
  `name_en` varchar(255) DEFAULT NULL,
  `name_ru` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL COMMENT 'Alt başlık (ör: 0,55 Karat)',
  `subtitle_en` varchar(255) DEFAULT NULL,
  `subtitle_ru` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL COMMENT 'Ürün açıklaması',
  `description_en` text DEFAULT NULL,
  `description_ru` text DEFAULT NULL,
  `main_image` varchar(255) DEFAULT NULL COMMENT 'Ana ürün görseli',
  `banner_image` varchar(255) DEFAULT NULL COMMENT 'Detay sayfası banner',
  `banner_image_position` varchar(50) DEFAULT '50% 50%',
  `banner_image_scale` decimal(3,2) DEFAULT 1.00,
  `gallery_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Galeri görselleri dizisi' CHECK (json_valid(`gallery_images`)),
  `image_position` varchar(20) DEFAULT '50% 50%',
  `image_scale` decimal(3,2) DEFAULT 1.00,
  `gold_weight` decimal(10,2) DEFAULT NULL COMMENT 'Altın ağırlığı (gram)',
  `gold_karat` int(11) DEFAULT NULL COMMENT 'Altın ayar (14, 18, 22 vb.)',
  `product_type` varchar(50) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0 COMMENT 'Ana sayfada gösterilsin mi',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `products`
--

INSERT INTO `products` (`id`, `category_id`, `slug`, `name`, `name_en`, `name_ru`, `subtitle`, `subtitle_en`, `subtitle_ru`, `description`, `description_en`, `description_ru`, `main_image`, `banner_image`, `banner_image_position`, `banner_image_scale`, `gallery_images`, `image_position`, `image_scale`, `gold_weight`, `gold_karat`, `product_type`, `is_featured`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 4, 'KP18001', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18001', '', '', '', '', '', '/images/products/kupe1.jpg', '/images/products/1773392440_5c2f580e_KP18001_lifestyle.jpg', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 8.94, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(2, 1, 'YZ18001', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18001', '', '', '', '', '', '/images/products/1769676587_b3b37281_YZ18001.jpg', '/images/products/1769676590_7ff084c1_YZ18001_3.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769676596_a0cc7d7f_YZ18001.jpg\",\"\\/images\\/products\\/1769676595_fda67f9a_YZ18001_1.jpg\",\"\\/images\\/products\\/1769676595_0b29380c_YZ18001_2.jpg\"]', '50% 50%', 1.00, 7.69, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(3, 2, 'KL18001', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18001', '', '', '', '', '', '/images/products/1771415231_09ede2b9_10500_set_kolye_uzak_jpg.jpg', '/images/products/1773231246_502509f8_KL18001_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769673929_208e8784_KL18001.jpg\",\"\\/images\\/products\\/1771415254_7edeb1c0_10500_set_kolye_uzak_jpg.jpg\"]', '50% 50%', 1.00, 7.28, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(4, 1, 'YZ18002', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18002', '', '', '', '', '', '/images/products/1769676483_7ca22f34_YZ18002.jpg', '/images/products/1770815913_fd544d65_YZ18002_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769676522_4d77e5e8_YZ18002.jpg\",\"\\/images\\/products\\/1769676521_f679d58b_YZ18002_1.jpg\",\"\\/images\\/products\\/1769676521_d7d41959_YZ18002_2.jpg\"]', '50% 50%', 1.00, 10.73, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(5, 3, 'BL18006', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18006', '', '', '', '', '', '/images/products/1769771480_0b413212_BL18006.jpg', '/images/products/1773231023_a621326a_BL18006_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769771511_04b3d234_BL18006.jpg\",\"\\/images\\/products\\/1769771495_5dea60b6_BL18006_1.jpg\",\"\\/images\\/products\\/1769771499_e3f3d74d_BL18006_2.jpg\"]', '50% 50%', 1.00, 24.69, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(6, 3, 'BL14007', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14007', '', '', '', '', '', '/images/products/1769672494_c57e4b09_BL14007.jpg', '/images/products/1773230750_fe2302cd_BL14007_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672501_bdb91de9_BL14007.jpg\",\"\\/images\\/products\\/1769672500_08b89461_BL14007_1.jpg\",\"\\/images\\/products\\/1769672501_032d5478_BL14007_2.jpg\",\"\\/images\\/products\\/1769672501_856d11d3_BL14007_3.jpg\"]', '50% 50%', 1.00, 8.74, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(7, 3, 'BL14008', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14008', '', '', '', '', '', '/images/products/1769672472_c0c489ad_BL14008.jpg', '/images/products/1773230811_8d889800_BL14008_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672480_93af6484_BL14008.jpg\",\"\\/images\\/products\\/1769672479_6d0cde35_BL14008_1.jpg\",\"\\/images\\/products\\/1769672479_454347b9_BL14008_2.jpg\",\"\\/images\\/products\\/1769672479_d61a4b7b_BL14008_3.jpg\"]', '50% 50%', 1.00, 19.06, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(8, 3, 'BL18009', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18009', '', '', '', '', '', '/images/products/1769672434_30518734_BL18009.jpg', '/images/products/1773231042_1e0f61b7_BL18009_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672442_77b28ccf_BL18009.jpg\",\"\\/images\\/products\\/1769672441_ae6a1673_BL18009_1.jpg\",\"\\/images\\/products\\/1769672441_a58a237f_BL18009_2.jpg\",\"\\/images\\/products\\/1769672441_d34e7180_BL18009_3.jpg\"]', '50% 50%', 1.00, 9.63, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(9, 3, 'BL18010', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18010', '', '', '', '', '', '/images/products/1769672414_0c138aca_BL18010.jpg', '/images/products/1773231063_81487535_BL18010_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672421_37fc08a9_BL18010.jpg\",\"\\/images\\/products\\/1769672421_45be4f1a_BL18010_1.jpg\",\"\\/images\\/products\\/1769672421_99fec3cd_BL18010_2.jpg\"]', '50% 50%', 1.00, 10.38, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(10, 3, 'BL14012', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14012', '', '', '', '', '', '/images/products/1769672382_4bae9859_BL14012.jpg', '/images/products/1773230844_85878c88_BL14012_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672390_c1acb632_BL14012.jpg\",\"\\/images\\/products\\/1769672389_5e3c0a10_BL14012_1.jpg\",\"\\/images\\/products\\/1769672390_c570c2f7_BL14012_2.jpg\",\"\\/images\\/products\\/1769672390_7cd06a46_BL14012_3.jpg\"]', '50% 50%', 1.00, 8.38, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(11, 3, 'BL14013', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14013', '', '', '', '', '', '/images/products/1769672295_fcd5d472_BL14013.jpg', '/images/products/1773230869_9093ec5f_BL14013_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672315_c6b843a3_BL14013.jpg\",\"\\/images\\/products\\/1769672313_2f053ec6_BL14013_1.jpg\"]', '50% 50%', 1.00, 12.97, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(12, 3, 'BL14014', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14014', '', '', '', '', '', '/images/products/1769672274_7e3a53e8_BL14014.jpg', '/images/products/1773230888_2f47e704_BL14014_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672283_5de0a89a_BL14014.jpg\",\"\\/images\\/products\\/1769672282_2c053f97_BL14014_1.jpg\",\"\\/images\\/products\\/1769672282_c1245e83_BL14014_2.jpg\"]', '50% 50%', 1.00, 19.40, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(13, 1, 'YZ14003', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ14003', '', '', '', '', '', '/images/products/1769676421_d8bbac6f_YZ14003.jpg', '/images/products/1770815702_d7314931_YZ14003_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769676428_fe4891b0_YZ14003.jpg\",\"\\/images\\/products\\/1769676427_8b623915_YZ14003_1.jpg\",\"\\/images\\/products\\/1769676427_7c51d75e_YZ14003_2.jpg\"]', '50% 50%', 1.00, 4.19, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(14, 1, 'YZ14004', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ14004', '', '', '', '', '', '/images/products/1769676329_41cccad3_YZ14004.jpg', '/images/products/1770815722_c67ddbdd_YZ14004_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769676334_52f9705e_YZ14004.jpg\",\"\\/images\\/products\\/1769676333_60eed325_YZ14004_1.jpg\"]', '50% 50%', 1.00, 4.55, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(15, 1, 'YZ18005', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18005', '', '', '', '', '', '/images/products/1769612519_b0664034_YZ18005.png', '/images/products/1769612568_e0cd02ed_YZ18005_3.png', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769612564_1cccd8ec_YZ18005.png\",\"\\/images\\/products\\/1769612562_6c1ee178_YZ18005_2.png\",\"\\/images\\/products\\/1769612565_4caf4aec_YZ18005_1.png\"]', '50% 50%', 1.00, 8.45, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(16, 1, 'YZ14006', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ14006', '', '', '', '', '', '/images/products/1769676063_3b369e8a_YZ14006.jpg', '/images/products/1770815740_e6efa94f_YZ14006_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769676074_7abf37b8_YZ14006.jpg\",\"\\/images\\/products\\/1769676073_56b9a7ac_YZ14006_1.jpg\"]', '50% 50%', 1.00, 3.65, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(17, 1, 'YZ14007', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ14007', '', '', '', '', '', '/images/products/1769676000_780ceb97_YZ14007.jpg', '/images/products/1772542224_b82fe012_YZ14007_2_kopya.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769676016_e9934409_YZ14007.jpg\",\"\\/images\\/products\\/1769676015_0c095bac_YZ14007_1.jpg\"]', '50% 50%', 1.00, 3.54, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(18, 1, 'YZ14008', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ14008', '', '', '', '', '', '/images/products/1769675936_aaf086ed_YZ14008.jpg', '/images/products/1769675943_7e39a9d6_YZ14008_2.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769675951_102cfec0_YZ14008_1.jpg\",\"\\/images\\/products\\/1769675952_289df814_YZ14008.jpg\"]', '50% 50%', 1.00, 2.64, 14, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(19, 1, 'YZ18009', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18009', '', '', '', '', '', '/images/products/1769675836_09d1edfa_YZ18009.jpg', '/images/products/1769675857_915b5e39_YZ18009_3.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769675864_d11b5425_YZ18009.jpg\",\"\\/images\\/products\\/1769675864_0fc510a6_YZ18009_1.jpg\",\"\\/images\\/products\\/1769675864_9077801e_YZ18009_2.jpg\"]', '50% 50%', 1.00, 4.40, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(20, 1, 'YZ18010', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18010', '', '', '', '', '', '/images/products/yuzuk10.jpg', '/images/products/1773128569_e9f6c6ad_YZ18010_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769675724_801ade59_YZ18010.jpg\",\"\\/images\\/products\\/1769675723_9eb7339c_YZ18010_1.jpg\",\"\\/images\\/products\\/1769675723_4a625152_YZ18010_2.jpg\"]', '50% 50%', 1.00, 5.00, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(21, 1, 'YZ18011', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18011', '', '', '', '', '', '/images/products/1769675601_7edd7b68_YZ18011.jpg', '/images/products/1769769513_0346aeb0_YZ18011_3.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769675628_049021b5_YZ18011.jpg\",\"\\/images\\/products\\/1769675627_6184ab79_YZ18011_1.jpg\",\"\\/images\\/products\\/1769675627_2c2e48d5_YZ18011_2.jpg\"]', '50% 50%', 1.00, 5.00, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(22, 1, 'YZ18043', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18043', '', '', '', '', '', '/images/products/1769675510_32f526d4_YZ18012.jpg', '/images/products/1772542376_84df66f9_YZ18012_4_kopya.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769675523_a4bf73b0_YZ18012.jpg\",\"\\/images\\/products\\/1769675522_94a6f639_YZ18012_1.jpg\",\"\\/images\\/products\\/1769675522_2a55c261_YZ18012_2.jpg\"]', '50% 50%', 1.00, 9.05, 18, NULL, 0, 0, 1, '2026-01-26 13:30:32', '2026-03-18 13:36:29'),
(23, 1, 'YZ18013', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18013', '', '', '', '', '', '/images/products/1769675330_7c229668_YZ18013.jpg', '/images/products/1769675339_83b0d1ab_YZ18013_3.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769675347_db659f1c_YZ18013.jpg\",\"\\/images\\/products\\/1769675345_957e7f17_YZ18013_1.jpg\",\"\\/images\\/products\\/1769675346_8ddc1f5e_YZ18013_2.jpg\"]', '50% 50%', 1.00, 2.11, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(24, 1, 'YZ14014', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ14014', '', '', '', '', '', '/images/products/1769675174_5a564dd4_YZ14014.jpg', '/images/products/1769675218_7ef1aff3_YZ14014_3.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769675233_91ec3062_YZ14014.jpg\",\"\\/images\\/products\\/1769675231_be3e5be6_YZ14014_1.jpg\",\"\\/images\\/products\\/1769675232_36b14856_YZ14014_2.jpg\"]', '50% 50%', 1.00, 2.46, 14, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(25, 1, 'YZ18015', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18015', '', '', '', '', '', '/images/products/1769675090_fe25c997_YZ18015.jpg', '/images/products/1770816027_6a9987b7_YZ18015_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769675104_50a1976c_YZ18015.jpg\",\"\\/images\\/products\\/1769675101_76cb1b67_YZ18015_1.jpg\",\"\\/images\\/products\\/1769675102_05b2e123_YZ18015_2.jpg\"]', '50% 50%', 1.00, 4.91, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(26, 4, 'KP18007', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18007', '', '', '', '', '', '/images/products/1769677016_f264b7ea_KP18002_1.jpg', '/images/products/1770815620_55cee951_KP18002_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769677025_c3f2a659_KP18002_1.jpg\",\"\\/images\\/products\\/1769677025_a375d80e_KP18002_2.jpg\",\"\\/images\\/products\\/1769677026_3a0c4272_KP18002.jpg\"]', '50% 50%', 1.00, 2.63, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(27, 4, 'KP18003', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18003', '', '', '', '', '', '/images/products/1769676960_966a0e4f_KP18003_1.jpg', '/images/products/1769770953_850d871a_KP18003_4.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769676966_262293d0_KP18003_1.jpg\",\"\\/images\\/products\\/1769676966_3130cfcf_KP18003_2.jpg\",\"\\/images\\/products\\/1769676966_5231f00e_KP18003.jpg\"]', '50% 50%', 1.00, 2.45, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(28, 4, 'KP14004', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP14004', '', '', '', '', '', '/images/products/1769676889_bef70923_KP14004_1.jpg', '/images/products/1770815601_7db2f353_KP14004_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769676895_a44faf0e_KP14004_1.jpg\",\"\\/images\\/products\\/1769676895_013c709d_KP14004_2.jpg\",\"\\/images\\/products\\/1769676896_dd9fa0db_KP14004.jpg\"]', '50% 50%', 1.00, 1.28, 14, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(29, 4, 'KP18005', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18005', '', '', '', '', '', '/images/products/1769676775_17f91cff_KP18005_2.jpg', '/images/products/1770815664_9ec30ede_KP18005_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769676782_256e1fd5_KP18005_2.jpg\",\"\\/images\\/products\\/1769676781_67513187_KP18005_1.jpg\",\"\\/images\\/products\\/1769676782_8aa6fef0_KP18005.jpg\"]', '50% 50%', 1.00, 2.75, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(30, 1, 'YZ18016', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18016', '', '', '', '', '', '/images/products/1769674821_15dc356a_YZ18016.jpg', '/images/products/1769674828_2141e84d_YZ18016_3.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769674835_a179335a_YZ18016_1.jpg\",\"\\/images\\/products\\/1769674836_0d7c4018_YZ18016_2.jpg\",\"\\/images\\/products\\/1769674836_5c938752_YZ18016.jpg\"]', '50% 50%', 1.00, 3.55, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(31, 1, 'YZ14017', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ14017', '', '', '', '', '', '/images/products/1769674720_7a7a9d63_YZ14017.jpg', '/images/products/1769674726_b0d8b134_YZ14017_2.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769674737_98b4d00e_YZ14017.jpg\",\"\\/images\\/products\\/1769674736_08b51a22_YZ14017_1.jpg\"]', '50% 50%', 1.00, 4.25, 14, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(32, 1, 'YZ18018', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18018', '', '', '', '', '', '/images/products/1769674530_3b5671a3_YZ18018.jpg', '/images/products/1769674538_8bd4fdff_YZ18018_4.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769674548_6662f6a7_YZ18018.jpg\",\"\\/images\\/products\\/1769674546_ec20e9e8_YZ18018_1.jpg\",\"\\/images\\/products\\/1769674547_bc2f8a29_YZ18018_2.jpg\"]', '50% 50%', 1.00, 3.93, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(33, 1, 'YZ14019', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ14019', '', '', '', '', '', '/images/products/1769674443_98da16e9_YZ14019.jpg', '/images/products/1769674450_d6ec09bc_YZ14019_2.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769674459_caf199a1_YZ14019.jpg\",\"\\/images\\/products\\/1769674458_764010c0_YZ14019_1.jpg\"]', '50% 50%', 1.00, 4.55, 14, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(34, 2, 'KL18003', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18003', '', '', '', '', '', '/images/products/kolye3.jpg', '/images/products/1770815470_0db493e2_KL18003_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769673815_40e0f6e0_KL18003.jpg\",\"\\/images\\/products\\/1769673815_f8cff8fb_KL18003_1.jpg\"]', '50% 50%', 1.00, 37.32, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(35, 2, 'KL14019', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL14019', '', '', '', '', '', '/images/products/kolye4.jpg', '/images/products/1772541762_4f4d94fa_6891_dik_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769673751_fe6c2f20_KL14004.jpg\",\"\\/images\\/products\\/1769673751_982624cb_KL14004_1.jpg\"]', '50% 50%', 1.00, 15.07, 14, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(36, 1, 'YZ18020', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18020', '', '', '', '', '', '/images/products/1769674320_9f1987ed_YZ18020.jpg', '/images/products/1770816120_b24f1d3b_YZ18020_5.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769674331_45e5f1d9_YZ18020.jpg\",\"\\/images\\/products\\/1769674330_c9808cb2_YZ18020_1.jpg\",\"\\/images\\/products\\/1769674330_2c614c6a_YZ18020_2.jpg\"]', '50% 50%', 1.00, 4.20, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(37, 2, 'KL18007', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18007', '', '', '', '', '', '/images/products/1769672990_ad8b734e_KL18007.jpg', '/images/products/1773231290_460f7461_KL18007_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672995_197b3bd5_KL18007.jpg\",\"\\/images\\/products\\/1769672995_5cf3eef2_KL18007_1.jpg\"]', '50% 50%', 1.00, 2.20, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(38, 2, 'KL14008', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL14008', '', '', '', '', '', '/images/products/kolye8.jpg', '/images/products/1773235561_3bcf9b5d_KL14008_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672934_6700f4a8_KL14008.jpg\",\"\\/images\\/products\\/1769672934_53234a31_KL14008_1.jpg\"]', '50% 50%', 1.00, 15.30, 14, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(39, 3, 'BL18026', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18026', '', '', '', '', '', '/images/products/bileklik26.jpg', '/images/products/1770795609_d604ff65_bileklik_yuvarlak_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672250_87ea063c_BL18026.jpg\",\"\\/images\\/products\\/1769672249_defe0a4e_BL18026_2.jpg\",\"\\/images\\/products\\/1769672249_4d4854d7_BL18026_4.jpg\",\"\\/images\\/products\\/1769672250_62ea20b9_BL18026_5.jpg\"]', '50% 50%', 1.00, 26.29, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(40, 3, 'BL18001', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18001', '', '', '', '', '', '/images/products/bileklik1.jpg', '/images/products/1773391572_6701f45d_BL18001_lifestyle.jpg', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 46.10, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(41, 3, 'BL18005', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18015', '', '', '', '', '', '/images/products/bileklik2.jpg', '/images/products/1770813813_d9690895_BL18002_5.jpg', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 30.65, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(42, 3, 'BL18003', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18003', '', '', '', '', '', '/images/products/bileklik3.jpg', '/images/products/1773391917_f0eb6982_BL18003_lifestyle.jpg', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 23.25, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(43, 3, 'BL14011', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14011', '', '', '', '', '', '/images/products/1769672169_09a2694a_BL14011.jpg', '/images/products/1773235632_00724f0f_BL14011_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672177_400b07d2_BL14011.jpg\",\"\\/images\\/products\\/1769672175_30d1fbfb_BL14011_1.jpg\",\"\\/images\\/products\\/1769672176_24d8f28d_BL14011_2.jpg\",\"\\/images\\/products\\/1769672177_99c2f545_BL14011_3.jpg\"]', '50% 50%', 1.00, 7.66, 14, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(44, 2, 'KL18005', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18005', '', '', '', '', '', '/images/products/kolye5.jpg', '/images/products/1773235513_bfbecd7b_KL18005_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672848_ce468e5c_KL18005.jpg\",\"\\/images\\/products\\/1769672848_12d49262_KL18005_1.jpg\"]', '50% 50%', 1.00, 33.47, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(45, 2, 'KL14006', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL14006', '', '', '', '', '', '/images/products/kolye6.jpg', '/images/products/1773392142_434a3330_KL14006_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672760_5e818bfb_KL14006.jpg\",\"\\/images\\/products\\/1769672759_589ee028_KL14006_1.jpg\"]', '50% 50%', 1.00, 16.06, 14, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(46, 3, 'BL18017', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18017', '', '', '', '', '', '/images/products/bileklik17.jpg', '/images/products/1773392073_a300c968_BL18017_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672148_aa6e0edf_BL18017.jpg\",\"\\/images\\/products\\/1769672146_0c28fbfa_BL18017_2.jpg\",\"\\/images\\/products\\/1769672146_3261259c_BL18017_1.jpg\",\"\\/images\\/products\\/1769672147_3c4fd0e1_BL18017_3.jpg\"]', '50% 50%', 1.00, 17.50, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(47, 3, 'BL18019', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18019', '', '', '', '', '', '/images/products/bileklik19.jpg', '/images/products/1773129743_b878c968_bileklik1_dik_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769672069_aeb8b51f_BL18019.jpg\",\"\\/images\\/products\\/1769672068_c3b0aac3_BL18019_1.jpg\",\"\\/images\\/products\\/1769672068_e72f9119_BL18019_3.jpg\",\"\\/images\\/products\\/1769672068_023c4071_BL18019_2.jpg\"]', '50% 50%', 1.00, 9.56, 18, NULL, 0, 0, 1, '2026-01-26 13:30:33', '2026-03-18 13:36:29'),
(48, 3, 'BL18018', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18018', '', '', '', '', '', '/images/products/1769671915_6de42ead_BL18018.jpg', '/images/products/1773392107_995e0497_BL18018_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769671934_5e88d7f6_BL18018.jpg\",\"\\/images\\/products\\/1769671933_36d92853_BL18018_1.jpg\",\"\\/images\\/products\\/1769671934_ed84195c_BL18018_3.jpg\",\"\\/images\\/products\\/1769671933_1b8442a0_BL18018_2.jpg\"]', '50% 50%', 1.00, 13.83, 18, NULL, 0, 0, 1, '2026-01-26 13:35:22', '2026-03-18 13:36:29'),
(49, 3, 'BL18004', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18004', '', '', '', '', '', '/images/products/1769678975_6ca7c213_BL18004.jpg', '/images/products/1773391948_1a4797ed_BL18004_lifestyle.jpg', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 38.55, 18, NULL, 0, 0, 1, '2026-01-29 09:32:52', '2026-03-18 13:36:29'),
(50, 3, 'BL18027', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18027', '', '', '', '', '', '/images/products/1769764792_357432f4_BL18027.jpg', '/images/products/1772543191_07d06d72_IMG_1236_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769764865_61647735_BL18027.jpg\",\"\\/images\\/products\\/1769764837_963c7a49_BL18027_1.jpg\",\"\\/images\\/products\\/1769764850_8dc4e286_BL18027_2.jpg\",\"\\/images\\/products\\/1769764857_9c25fa7d_BL18027_3.jpg\"]', '50% 50%', 1.00, 17.20, 18, NULL, 0, 0, 1, '2026-01-30 09:21:11', '2026-03-18 13:36:29'),
(51, 3, 'BL18028', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18028', '', '', '', '', '', '/images/products/1769764933_ec12f92d_BL18028.jpg', '/images/products/1773231087_065e526f_BL18028_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769764966_c37fee5c_BL18028.jpg\",\"\\/images\\/products\\/1769764949_3c5ccad4_BL18028_1.jpg\",\"\\/images\\/products\\/1769764957_445cf668_BL18028_2.jpg\",\"\\/images\\/products\\/1769764964_8430bbe2_BL18028_3.jpg\"]', '50% 50%', 1.00, 17.06, 18, NULL, 0, 0, 1, '2026-01-30 09:23:42', '2026-03-18 13:36:29'),
(52, 2, 'KL18015', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18015', '', '', '', '', '', '/images/products/1769771084_94f56c46_KL18015.jpg', '/images/products/1773231375_93767b3c_KL18015_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769765392_dcff26fa_KL18015_1.jpg\",\"\\/images\\/products\\/1769765398_00d3f10b_KL18015.jpg\"]', '50% 50%', 1.00, 8.17, 18, NULL, 0, 0, 1, '2026-01-30 09:49:02', '2026-03-18 13:36:29'),
(53, 1, 'YZ18022', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18022', '', '', '', '', '', '/images/products/1769767759_958df574_YZ18022.jpg', '/images/products/1773128599_3dbd5a5f_YZ18022_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769767789_b9df64f1_YZ18022.jpg\",\"\\/images\\/products\\/1769767776_79722175_YZ18022_1.jpg\",\"\\/images\\/products\\/1769767782_3a752af9_YZ18022_2.jpg\"]', '50% 50%', 1.00, 13.22, 18, NULL, 0, 0, 1, '2026-01-30 10:12:47', '2026-03-18 13:36:29'),
(54, 1, 'YZ18023', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18023', '', '', '', '', '', '/images/products/1769768038_07f6ab99_YZ18023.jpg', '/images/products/1773128620_28ca4dcb_YZ18023_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769768065_f6c7891b_YZ18023.jpg\",\"\\/images\\/products\\/1769768055_c51800e6_YZ18023_1.jpg\",\"\\/images\\/products\\/1769768059_6845e4f8_YZ18023_2.jpg\"]', '50% 50%', 1.00, 3.04, 18, NULL, 0, 0, 1, '2026-01-30 10:15:37', '2026-03-18 13:36:29'),
(55, 1, 'YZ18024', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18024', '', '', '', '', '', '/images/products/1772453249_e3f50584_IMG_1178.jpg', '/images/products/1772453254_4c6c64ea_IMG_1178_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1772453263_e8af9e3d_IMG_1178.jpg\",\"\\/images\\/products\\/1772453270_2e44e433_IMG_1179.jpg\",\"\\/images\\/products\\/1772453269_634b3249_IMG_1177.jpg\"]', '50% 50%', 1.00, 3.60, 18, NULL, 0, 0, 1, '2026-01-30 10:20:21', '2026-03-18 13:36:29'),
(56, 1, 'YZ18025', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18025', '', '', '', '', '', '/images/products/1772453284_a9e1f2a9_IMG_1166.jpg', '/images/products/1772453293_c9c0cc4a_IMG_1166_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1772453301_eae766c1_IMG_1165.jpg\",\"\\/images\\/products\\/1772453302_23beeb94_IMG_1167.jpg\",\"\\/images\\/products\\/1772453302_e4aeee78_IMG_1166.jpg\"]', '50% 50%', 1.00, 6.11, 18, NULL, 0, 0, 1, '2026-01-30 10:23:16', '2026-03-18 13:36:29'),
(57, 1, 'YZ18026', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18026', '', '', '', '', '', '/images/products/1769768631_0cd0a3e3_YZ18026.jpg', '/images/products/1773128647_12b71cc1_YZ18026_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769768655_8531ddae_YZ18026.jpg\",\"\\/images\\/products\\/1769768637_af26cc51_YZ18026_1.jpg\",\"\\/images\\/products\\/1769768646_8f4fdc3a_YZ18026_2.jpg\"]', '50% 50%', 1.00, 2.75, 18, NULL, 0, 0, 1, '2026-01-30 10:25:06', '2026-03-18 13:36:29'),
(58, 1, 'YZ18027', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18027', '', '', '', '', '', '/images/products/1772453317_5d37c17c_IMG_1172.jpg', '/images/products/1773128666_c81c21e3_YZ18027_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1772453329_87dd1e96_IMG_1171.jpg\",\"\\/images\\/products\\/1772453910_33060e94_IMG_1173_jpg.jpg\",\"\\/images\\/products\\/1772453330_2ef4b739_IMG_1172.jpg\"]', '50% 50%', 1.00, 3.58, 18, NULL, 0, 0, 1, '2026-01-30 10:28:04', '2026-03-18 13:36:29'),
(59, 1, 'YZ18028', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18028', '', '', '', '', '', '/images/products/1769771056_656b5781_YZ18028.jpg', '/images/products/1773128684_009cdd42_YZ18028_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769768956_e0b3d81e_YZ18028.jpg\",\"\\/images\\/products\\/1769768941_f5660e72_YZ18028_1.jpg\",\"\\/images\\/products\\/1769768948_8a77d35f_YZ18028_2.jpg\"]', '50% 50%', 1.00, 9.53, 18, NULL, 0, 0, 1, '2026-01-30 10:30:38', '2026-03-18 13:36:29'),
(60, 1, 'YZ18032', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18032', '', '', '', '', '', '/images/products/1769769067_d9c99525_YZ18032.jpg', '/images/products/1773128808_0f99f5d8_YZ18032_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769769080_fec44cce_YZ18032.jpg\",\"\\/images\\/products\\/1769769076_0e987c4e_YZ18032_1.jpg\",\"\\/images\\/products\\/1769769078_5222f5d8_YZ18032_2.jpg\"]', '50% 50%', 1.00, 1.87, 18, NULL, 0, 0, 1, '2026-01-30 10:33:44', '2026-03-18 13:36:29'),
(61, 1, 'YZ18041', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18041', '', '', '', '', '', '/images/products/1769771030_dad88dea_YZ18041.jpg', '/images/products/1773128889_f4d6df81_YZ18041_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769769267_266d773c_YZ18041.jpg\",\"\\/images\\/products\\/1769769262_fc214e42_YZ18041_1.jpg\"]', '50% 50%', 1.00, 1.68, 18, NULL, 0, 0, 1, '2026-01-30 10:35:40', '2026-03-18 13:36:29'),
(62, 1, 'YZ14021', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ14021', '', '', '', '', '', '/images/products/1769769746_26b4cc75_YZ14021.jpg', '/images/products/1773128536_abb661e2_YZ14021_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769769677_7b713f36_YZ14021.jpg\",\"\\/images\\/products\\/1769769648_f738119d_YZ14021_1.jpg\",\"\\/images\\/products\\/1769769664_096ae8fe_YZ14021_2.jpg\"]', '50% 50%', 1.00, 2.82, 14, NULL, 0, 0, 1, '2026-01-30 10:43:35', '2026-03-18 13:36:29'),
(63, 4, 'KP18010', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18010', '', '', '', '', '', '/images/products/1769770147_33682121_KP18010.jpg', '/images/products/1773231450_22e6a9e6_KP18010_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769770109_9703a595_KP18010.jpg\",\"\\/images\\/products\\/1769770094_84fe0671_KP18010_1.jpg\",\"\\/images\\/products\\/1769770102_1849899f_KP18010_2.jpg\"]', '50% 50%', 1.00, 5.51, 18, NULL, 0, 0, 1, '2026-01-30 10:50:53', '2026-03-18 13:36:29'),
(64, 4, 'KP18009', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18009', '', '', '', '', '', '/images/products/1769770388_fc4ea30b_KP18009.jpg', '/images/products/1773231430_b952b772_KP18009_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769770327_845c4874_KP18009.jpg\",\"\\/images\\/products\\/1769770294_08c6bc09_KP18009_1.jpg\",\"\\/images\\/products\\/1769770302_7cf19a54_KP18009_2.jpg\",\"\\/images\\/products\\/1769770319_2ac0b95c_KP18009_4.jpg\",\"\\/images\\/products\\/1769770311_d79ce92d_KP18009_3.jpg\"]', '50% 50%', 1.00, 9.05, 18, NULL, 0, 0, 1, '2026-01-30 10:54:51', '2026-03-18 13:36:29'),
(65, 4, 'KP18008', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18008', '', '', '', '', '', '/images/products/1769770557_4efa40a2_KP18008.jpg', '/images/products/1773231415_7f00a58f_KP18008_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769770582_c048105e_KP18008.jpg\",\"\\/images\\/products\\/1769770570_4b41e56d_KP18008_1.jpg\",\"\\/images\\/products\\/1769770576_a6aff07d_KP18008_2.jpg\"]', '50% 50%', 1.00, 6.55, 18, NULL, 0, 0, 1, '2026-01-30 10:57:31', '2026-03-18 13:36:29'),
(66, 4, 'KP18002', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18002', '', '', '', '', '', '/images/products/1769770770_5d6e4888_KP18007.jpg', '/images/products/1773392469_e527cc9f_KP18002_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769770753_44988e07_KP18007.jpg\",\"\\/images\\/products\\/1769770741_8e0f08e5_KP18007_1.jpg\",\"\\/images\\/products\\/1769770748_ae680c4a_KP18007_2.jpg\"]', '50% 50%', 1.00, 7.30, 18, NULL, 0, 0, 1, '2026-01-30 11:00:08', '2026-03-18 13:36:29'),
(67, 4, 'KP18006', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18006', '', '', '', '', '', '/images/products/1769770838_b46c8c6b_KP18006.jpg', '/images/products/1773231396_14e05509_KP18006_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1769770853_c5eac12d_KP18006.jpg\",\"\\/images\\/products\\/1769770849_c0a63fda_KP18006_1.jpg\"]', '50% 50%', 1.00, 6.65, 18, NULL, 0, 0, 1, '2026-01-30 11:01:37', '2026-03-18 13:36:29'),
(68, 2, 'KL08017', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL08017', '', '', '', '', '', '/images/products/1772539003_c29750c7_KL08017_kopya.jpg', '/images/products/1773231162_a181efa7_KL08017_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770020291_33a362e0_KL08009.jpg\",\"\\/images\\/products\\/1770020290_6e98478b_KL08009_1.jpg\",\"\\/images\\/products\\/1770020291_c8574144_KL08009_2.jpg\"]', '50% 50%', 1.00, 5.80, 8, NULL, 0, 0, 1, '2026-02-02 08:19:28', '2026-03-18 13:36:29'),
(69, 2, 'KL08016', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL08016', '', '', '', '', '', '/images/products/1770020443_a0907e5a_KL08010.jpg', '/images/products/1773231141_c4c78274_KL08016_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770020449_a8c8cc2b_KL08010.jpg\",\"\\/images\\/products\\/1770020448_4f423b65_KL08010_2.jpg\",\"\\/images\\/products\\/1772539204_d54bdf0b_KL08016_1_kopya.jpg\"]', '50% 50%', 1.00, 7.76, 8, NULL, 0, 0, 1, '2026-02-02 08:21:58', '2026-03-18 13:36:29'),
(70, 2, 'KL08011', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL08011', '', '', '', '', '', '/images/products/1770020590_8f887269_KL08011.jpg', '/images/products/1773231112_92c607d5_KL08011_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770020596_8187fb07_KL08011.jpg\",\"\\/images\\/products\\/1772538742_9b0f4f59_KL08011_1_kkopya.jpg\"]', '50% 50%', 1.00, 14.70, 8, NULL, 0, 0, 1, '2026-02-02 08:24:12', '2026-03-18 13:36:29'),
(71, 2, 'KL18020', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18020', '', '', '', '', '', '/images/products/1770020703_a0417cec_KL18012.jpg', '/images/products/1773392203_5bf11115_KL18020_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1772539925_7111afce_KL18020_kopya.jpg\",\"\\/images\\/products\\/1772539967_0c2a5491_KL18020_1_kopya.jpg\",\"\\/images\\/products\\/1770020718_af6f310c_KL18012_2.jpg\"]', '50% 50%', 1.00, 7.20, 18, NULL, 0, 0, 1, '2026-02-02 08:26:04', '2026-03-18 13:36:29'),
(72, 2, 'KL18009', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18009', '', '', '', '', '', '/images/products/1770021084_8d7e6512_KL18017.jpg', '/images/products/1773231308_db1735b9_KL18009_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770021091_9fa421b0_KL18017.jpg\",\"\\/images\\/products\\/1772539712_4969d79e_KL18009_1_kopya.jpg\"]', '50% 50%', 1.00, 7.30, 18, NULL, 0, 0, 1, '2026-02-02 08:32:49', '2026-03-18 13:36:29'),
(73, 2, 'KL18010', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18010', '', '', '', '', '', '/images/products/1770021349_4a929aff_KL18016.jpg', '/images/products/1773231325_6b6aeecc_KL18010_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770021354_8cbf8426_KL18016.jpg\",\"\\/images\\/products\\/1770021353_ce6b9c99_KL18016_2.jpg\",\"\\/images\\/products\\/1772538624_8dc4cb6a_KL180101_1_kopya.jpg\"]', '50% 50%', 1.00, 4.93, 18, NULL, 0, 0, 1, '2026-02-02 08:36:48', '2026-03-18 13:36:29'),
(74, 1, 'YZ18031', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18031', '', '', '', '', '', '/images/products/1770030508_c79edd70_YZ18031.jpg', '/images/products/1773128738_28d039be_YZ18031_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770030512_da99d081_YZ18031_1.jpg\",\"\\/images\\/products\\/1770030512_b2614f70_YZ18031.jpg\"]', '50% 50%', 1.00, 0.78, 18, NULL, 0, 0, 1, '2026-02-02 11:09:09', '2026-03-18 13:36:29'),
(75, 1, 'YZ18035', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18035', '', '', '', '', '', '/images/products/1770030600_ba119f94_YZ18035.jpg', '/images/products/1773128828_59864a29_YZ18035_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770030605_cd723d75_YZ18035_1.jpg\",\"\\/images\\/products\\/1770030607_7480b07e_YZ18035.jpg\"]', '50% 50%', 1.00, 0.97, 18, NULL, 0, 0, 1, '2026-02-02 11:10:39', '2026-03-18 13:36:29'),
(76, 1, 'YZ18038', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18038', '', '', '', '', '', '/images/products/1770030725_96549e04_YZ18038.jpg', '/images/products/1773128863_13f237d5_YZ18038_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770030729_1f1b7cb3_YZ18038_1.jpg\",\"\\/images\\/products\\/1770030729_bb1eb1ea_YZ18038.jpg\"]', '50% 50%', 1.00, 0.86, 18, NULL, 0, 0, 1, '2026-02-02 11:12:45', '2026-03-18 13:36:29'),
(77, 1, 'YZ18042', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18042', '', '', '', '', '', '/images/products/1770032125_e310c79b_YZ18042.jpg', '/images/products/1773128911_a3351f43_YZ18042_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770032130_746cd026_YZ18042_1.jpg\",\"\\/images\\/products\\/1770032131_e24786ec_YZ18042.jpg\"]', '50% 50%', 1.00, 1.13, 18, NULL, 0, 0, 1, '2026-02-02 11:36:00', '2026-03-18 13:36:29'),
(78, 1, 'YZ18037', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18037', '', '', '', '', '', '/images/products/1770032225_73a30a31_YZ18037.jpg', '/images/products/1773128847_4e69e938_YZ18037_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770032229_7d962659_YZ18037_1.jpg\",\"\\/images\\/products\\/1770032229_600410b7_YZ18037.jpg\"]', '50% 50%', 1.00, 0.75, 18, NULL, 0, 0, 1, '2026-02-02 11:37:41', '2026-03-18 13:36:29'),
(79, 1, 'YZ18029', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18029', '', '', '', '', '', '/images/products/1770032403_9e29132e_YZ18029.jpg', '/images/products/1773128722_8fcf9ff2_YZ18029_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770032408_a952f06a_YZ18029.jpg\",\"\\/images\\/products\\/1770032408_61ab7c59_YZ18029_1.jpg\"]', '50% 50%', 1.00, 0.94, 18, NULL, 0, 0, 1, '2026-02-02 11:40:44', '2026-03-18 13:36:29'),
(80, 1, 'YZ18030', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18030', '', '', '', '', '', '/images/products/1770032475_1538d813_YZ18030.jpg', '/images/products/1773231538_f8d08a52_YZ18030_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770032479_b429cfd1_YZ18030.jpg\",\"\\/images\\/products\\/1770032478_08d533fb_YZ18030_1.jpg\"]', '50% 50%', 1.00, 1.14, 18, NULL, 0, 0, 1, '2026-02-02 11:41:55', '2026-03-18 13:36:29'),
(81, 1, 'YZ18033', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18033', '', '', '', '', '', '/images/products/1770032550_39d94523_YZ18033.jpg', '/images/products/1773231563_47a8c562_YZ18033_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770032557_0cccf1e6_YZ18033.jpg\",\"\\/images\\/products\\/1770032556_a958ebe3_YZ18033_1.jpg\"]', '50% 50%', 1.00, 1.07, 18, NULL, 0, 0, 1, '2026-02-02 11:43:11', '2026-03-18 13:36:29'),
(82, 1, 'YZ18034', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18034', '', '', '', '', '', '/images/products/1770032679_f5dbab82_YZ18034.jpg', '/images/products/1773231578_c3df1029_YZ18034_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770032683_06f6cd16_YZ18034.jpg\",\"\\/images\\/products\\/1770032682_e890a1e6_YZ18034_1.jpg\"]', '50% 50%', 1.00, 1.00, 18, NULL, 0, 0, 1, '2026-02-02 11:45:18', '2026-03-18 13:36:29'),
(83, 1, 'YZ18036', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18036', '', '', '', '', '', '/images/products/1770032752_06e47051_YZ18036.jpg', '/images/products/1773231596_d9c2695d_YZ18036_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770032756_1689fb28_YZ18036_1.jpg\",\"\\/images\\/products\\/1770032756_f02cde08_YZ18036.jpg\"]', '50% 50%', 1.00, 0.75, 18, NULL, 0, 0, 1, '2026-02-02 11:46:27', '2026-03-18 13:36:29'),
(84, 1, 'YZ18054', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18054', '', '', '', '', '', '/images/products/1770032831_4db339dd_YZ18039.jpg', '/images/products/1773231743_60a309ac_YZ18039_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770032835_e1d3f731_YZ18039_1.jpg\",\"\\/images\\/products\\/1770032835_33284d73_YZ18039.jpg\"]', '50% 50%', 1.00, 0.84, 18, NULL, 0, 0, 1, '2026-02-02 11:47:45', '2026-03-18 13:36:29'),
(85, 1, 'YZ18055', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18055', '', '', '', '', '', '/images/products/1770032886_9d6a8967_YZ18040.jpg', '/images/products/1773231791_89c207df_YZ18040_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770032890_bde21ea7_YZ18040.jpg\",\"\\/images\\/products\\/1770032889_2e86805b_YZ18040_1.jpg\"]', '50% 50%', 1.00, 1.17, 18, NULL, 0, 0, 1, '2026-02-02 11:48:41', '2026-03-18 13:36:29'),
(86, 4, 'barok-inci-kupe', 'Barok İnci Küpe', 'Baroque Pearl Earrings', 'Серьги с жемчугом барокко', 'KP18011', '', '', '', '', '', '/images/products/1772005657_637b0f2b___nci_k__pe.jpg', '/images/products/1773231501_c9114a4f_KP18011_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1772005669_b5cc0cb4___nci_k__pe.jpg\",\"\\/images\\/products\\/1772005677_63eeb25f_inci_k__peee.jpg\",\"\\/images\\/products\\/1772005670_d54d1b56_inci_k__peeeee.jpg\"]', '50% 50%', 1.00, 27.95, 18, NULL, 0, 0, 1, '2026-02-02 12:53:36', '2026-03-18 13:36:29'),
(87, 2, 'KL18013', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18013', '', '', '', '', '', '/images/products/1770623090_c025f38e_IMG_1264.jpg', '/images/products/1773231346_124b7d7f_KL18013_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770623094_ee922570_IMG_1264.jpg\",\"\\/images\\/products\\/1772539342_dfbca32b_KL18013_1_kopya.jpg\"]', '50% 50%', 1.00, 10.13, 18, NULL, 0, 0, 1, '2026-02-09 07:46:01', '2026-03-18 13:36:29'),
(88, 2, 'KL18014', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18014', '', '', '', '', '', '/images/products/1770623217_1b8d17ec_KL18014.jpg', '/images/products/1772538044_473c8708_KL18014_5_kopya.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770623220_cc274176_KL18014.jpg\",\"\\/images\\/products\\/1770623220_1be4189a_KL18014_2.jpg\",\"\\/images\\/products\\/1772538459_e734473a_KL18014_1_kopya.jpg\"]', '50% 50%', 1.00, 9.79, 18, NULL, 0, 0, 1, '2026-02-09 07:48:11', '2026-03-18 13:36:29'),
(89, 3, 'BL14021', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14021', '', '', '', '', '', '/images/products/1770710168_eaf66e12_3600_kapali.png', '/images/products/1773230916_80311369_BL14021_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770710208_1638917b_3600_kapali.png\",\"\\/images\\/products\\/1770710213_f620b418_3600_duz.png\",\"\\/images\\/products\\/1770710214_5fd4b1ad_3600_duz2.png\",\"\\/images\\/products\\/1770710215_33f70258_3600_yakin.png\"]', '50% 50%', 1.00, 5.93, 14, NULL, 0, 0, 1, '2026-02-10 07:57:05', '2026-03-18 13:36:29'),
(90, 3, 'BL14023', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14023', '', '', '', '', '', '/images/products/1770710370_078a4f6f_4170_kapali.png', '/images/products/1773230960_940d59cb_BL14023_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770710378_0535e468_4170_kapali.png\",\"\\/images\\/products\\/1770710377_43d55d88_4170_duz.png\",\"\\/images\\/products\\/1770710377_c997af11_4170_duz2.png\",\"\\/images\\/products\\/1770710379_600c2c5c_4170_yakin.png\"]', '50% 50%', 1.00, 6.90, 14, NULL, 0, 0, 1, '2026-02-10 08:00:15', '2026-03-18 13:36:29'),
(91, 3, 'BL14024', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14024', '', '', '', '', '', '/images/products/1770710504_100e1118_4173_kapali.png', '/images/products/1773230978_5cb8fc4a_BL14024_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770710512_37193ad5_4173_kapali.png\",\"\\/images\\/products\\/1770710510_f613c098_4173_duz.png\",\"\\/images\\/products\\/1770710511_8b49b960_4173_duz2.png\",\"\\/images\\/products\\/1770710513_5df7e492_4173_yakin.png\"]', '50% 50%', 1.00, 7.78, 14, NULL, 0, 0, 1, '2026-02-10 08:02:29', '2026-03-18 13:36:29'),
(92, 3, 'BL14025', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14025', '', '', '', '', '', '/images/products/1770710625_4c791ba9_4284_kapali.png', '/images/products/1773230998_a966f6c8_BL14025_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770710633_15653efd_4284_kapali.png\",\"\\/images\\/products\\/1770710632_bc2c30c3_4284_duz.png\",\"\\/images\\/products\\/1770710632_b2c2836d_4284_duz2.png\",\"\\/images\\/products\\/1770710635_66f7e146_4284_yakin.png\"]', '50% 50%', 1.00, 6.61, 14, NULL, 0, 0, 1, '2026-02-10 08:04:26', '2026-03-18 13:36:29'),
(93, 3, 'BL14022', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14022', '', '', '', '', '', '/images/products/1770710746_e08b248f_4500_kapali.png', '/images/products/1773230941_3357971e_BL14022_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770710755_4e24862b_4500_kapali.png\",\"\\/images\\/products\\/1770710753_a1440ecd_4500_duz.png\",\"\\/images\\/products\\/1770710754_fab3c3b0_4500_duz2.png\",\"\\/images\\/products\\/1770710756_34584418_4500_yakin.png\"]', '50% 50%', 1.00, 7.06, 14, NULL, 0, 0, 1, '2026-02-10 08:06:35', '2026-03-18 13:36:29'),
(94, 3, 'BL18020', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18020', '', '', '', '', '', '/images/products/1770710866_68784160_6555_kapali.png', '/images/products/1773129808_49b1d5ae_bileklik2_dik_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770710873_6e2e9762_6555_kapali.png\",\"\\/images\\/products\\/1770710871_04b4b3a6_6555_duz.png\",\"\\/images\\/products\\/1770710874_c5316480_6555_yakin.png\",\"\\/images\\/products\\/1770710872_9c19c590_6555_duz2.png\"]', '50% 50%', 1.00, 8.72, 18, NULL, 0, 0, 1, '2026-02-10 08:08:34', '2026-03-18 13:36:29'),
(95, 3, 'BL18002-1770711179', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18002', '', '', '', '', '', '/images/products/1770711130_6548c650_BL18005.jpg', '/images/products/1773391787_9f35bdd9_BL18002_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770711141_a5bf31a8_BL18005.jpg\",\"\\/images\\/products\\/1770711141_601a2d9c_BL18005_1.jpg\",\"\\/images\\/products\\/1770711141_9b4cffc6_BL18005_2.jpg\",\"\\/images\\/products\\/1770711141_fc69084a_BL18005_3.jpg\"]', '50% 50%', 1.00, 17.04, 18, NULL, 0, 0, 1, '2026-02-10 08:12:59', '2026-03-18 13:36:29'),
(96, 3, 'BL14005', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL14005', '', '', '', '', '', '/images/products/1770711880_e5bb3215_BL14015.jpg', '/images/products/1773391540_36c9a6c4_BL14005_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770711886_7a83dbeb_BL14015.jpg\",\"\\/images\\/products\\/1770711886_ebdd1503_BL14015_1.jpg\",\"\\/images\\/products\\/1770711886_78983b14_BL14015_2.jpg\",\"\\/images\\/products\\/1770711886_17ed606f_BL14015_3.jpg\"]', '50% 50%', 1.00, 12.06, 14, NULL, 0, 0, 1, '2026-02-10 08:25:24', '2026-03-18 13:36:29'),
(97, 3, 'BL18016', 'Pırlanta Bileklik', 'Diamond Bracelet', 'Бриллиантовый браслет', 'BL18016', '', '', '', '', '', '/images/products/1770711971_4efbefd6_BL18016.jpg', '/images/products/1773391988_361b5c1b_BL18016_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1770711976_c5790a33_BL18016.jpg\",\"\\/images\\/products\\/1770711975_40ac911f_BL18016_1.jpg\",\"\\/images\\/products\\/1770711975_0a34cab0_BL18016_2.jpg\"]', '50% 50%', 1.00, 16.76, 18, NULL, 0, 0, 1, '2026-02-10 08:26:45', '2026-03-18 13:36:29'),
(98, 16, 'divas-dream-necklace', 'DIVAS’ DREAM NECKLACE', 'DIVAS\' DREAM NECKLACE', 'КОЛЬЕ DIVAS\' DREAM', '', '', '', '', '', '', '/images/products/1771229275_dcbbf59c_IMG_1895.jpg', '/images/products/1771415942_32e95ddb_IMG_1895_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771229131_abb533f1_IMG_1895.jpg\",\"\\/images\\/products\\/1771851497_016cc551_1771229131_9135b5fb_IMG_1894.jpg\",\"\\/images\\/products\\/1771229131_9cb59c77_IMG_1897.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 08:07:20', '2026-03-18 13:36:29'),
(99, 16, '-1771229829', 'B.ZERO1 NECKLACE', 'B.ZERO1 NECKLACE', 'КОЛЬЕ B.ZERO1', '', '', '', '', '', '', '/images/products/1771229470_03bce209_IMG_1900.jpg', '/images/products/1771415959_0d81de7f_IMG_1900_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771229478_ad716283_IMG_1900.jpg\",\"\\/images\\/products\\/1771229479_0d92fb92_IMG_1901.jpg\",\"\\/images\\/products\\/1772545262_6ba9e289_IMG_1898.jpg\",\"\\/images\\/products\\/1772545263_79206144_IMG_1899.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 08:17:09', '2026-03-18 13:36:29');
INSERT INTO `products` (`id`, `category_id`, `slug`, `name`, `name_en`, `name_ru`, `subtitle`, `subtitle_en`, `subtitle_ru`, `description`, `description_en`, `description_ru`, `main_image`, `banner_image`, `banner_image_position`, `banner_image_scale`, `gallery_images`, `image_position`, `image_scale`, `gold_weight`, `gold_karat`, `product_type`, `is_featured`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(100, 16, 'cartier-d-amour-kolye-orta-model', 'CARTIER D\'AMOUR KOLYE, ORTA MODEL', 'CARTIER D\'AMOUR NECKLACE MEDIUM MODEL', 'КОЛЬЕ CARTIER D\'AMOUR СРЕДНЯЯ МОДЕЛЬ', '', '', '', '', '', '', '/images/products/1771230163_756737e7_IMG_1903.jpg', '/images/products/1771415976_60a9bebf_IMG_1903_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771230168_02def1be_IMG_1903.jpg\",\"\\/images\\/products\\/1772545385_b3050f83_IMG_1902.jpg\",\"\\/images\\/products\\/1771230168_73f2b6e7_IMG_1904.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 08:22:53', '2026-03-18 13:36:29'),
(101, 16, 'muska-de-cartier-kolye', 'MUSKA DE CARTIER KOLYE', 'AMULETTE DE CARTIER NECKLACE', 'КОЛЬЕ AMULETTE DE CARTIER', '', '', '', '', '', '', '/images/products/1771230502_76b4cb9e_IMG_1907.jpg', '/images/products/1771415989_4d7e1fb3_IMG_1908_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771230507_3a425d90_IMG_1908.jpg\",\"\\/images\\/products\\/1772545355_9397d1bf_IMG_1906.jpg\",\"\\/images\\/products\\/1771230507_3342cdca_IMG_1907.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 08:28:35', '2026-03-18 13:36:29'),
(102, 16, 'trinity-kolye', 'TRINITY KOLYE', 'TRINITY NECKLACE', 'КОЛЬЕ TRINITY', '', '', '', '', '', '', '/images/products/1771236658_74df3f83_IMG_1989.jpg', '/images/products/1771243055_bbf7327a_IMG_1989_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771236667_d312d425_IMG_1989.jpg\",\"\\/images\\/products\\/1772545326_2ddb0433_IMG_1988.jpg\",\"\\/images\\/products\\/1771236667_ee3c6ad4_IMG_1990.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 08:31:06', '2026-03-18 13:36:29'),
(103, 16, '-1771230746', 'LOVE BİLEZİK', 'LOVE BRACELET', 'БРАСЛЕТ LOVE', '', '', '', '', '', '', '/images/products/1771230736_a7c5cd3e_IMG_1918.jpg', '/images/products/1771416000_f4cf6a46_IMG_1921_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771230740_418a02fe_IMG_1917.jpg\",\"\\/images\\/products\\/1771230741_624db4fb_IMG_1918.jpg\",\"\\/images\\/products\\/1771230741_4cec9a8b_IMG_1921.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 08:32:26', '2026-03-18 13:36:29'),
(104, 16, '-1771231396', 'CARTIER D\'AMOUR BİLEZİK', '', '', '', '', '', '', '', '', '/images/products/1771231380_98015264_IMG_1933.jpg', '/images/products/1771491137_b9e9b385_IMG_1934_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771231385_29f37bf6_IMG_1935.jpg\",\"\\/images\\/products\\/1771231384_ac81bb95_IMG_1932.jpg\",\"\\/images\\/products\\/1771231385_b0c9d947_IMG_1934.jpg\",\"\\/images\\/products\\/1771231384_cc60b110_IMG_1933.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 08:43:16', '2026-02-27 08:09:24'),
(105, 16, '', 'TRINITY KOLYE', NULL, NULL, '', NULL, NULL, '', NULL, NULL, '/images/products/1771232482_43279596_IMG_1989.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771232490_23d82529_IMG_1990.jpg\",\"\\/images\\/products\\/1771232489_351224fc_IMG_1988.jpg\",\"\\/images\\/products\\/1771232489_7ee8c243_IMG_1989.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 0, '2026-02-16 09:01:36', '2026-02-16 10:10:39'),
(106, 2, 'KL14018', 'Altın Kolye', 'Gold Necklace', 'Золотое колье', 'KL14018', '', '', '', '', '', '/images/products/1771234461_f2af0b04_IMG_1944.jpg', '/images/products/1771491364_a64ea7a7_IMG_1947_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771234465_2c4ced65_IMG_1947.jpg\",\"\\/images\\/products\\/1772540874_5f393c17_kolye_sari_jpg.jpg\",\"\\/images\\/products\\/1771234465_0db977ae_IMG_1944.jpg\"]', '50% 50%', 1.00, 8.25, 14, NULL, 0, 0, 1, '2026-02-16 09:36:13', '2026-03-18 13:36:29'),
(107, 16, '-1771235049', 'B.ZERO1 NECKLACE', 'B.ZERO1 NECKLACE', 'КОЛЬЕ B.ZERO1', '', '', '', '', '', '', '/images/products/1771235041_552668da_IMG_1925.jpg', '/images/products/1771416037_b12699cd_IMG_1924_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771235045_8886dc63_IMG_1924.jpg\",\"\\/images\\/products\\/1771235045_dc752d1d_IMG_1925.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 09:44:09', '2026-03-18 13:36:29'),
(108, 16, '-1771236501', 'LOVE PENDANT, 6 DIAMONDS', 'LOVE PENDANT, 6 DIAMONDS', 'ПОДВЕСКА LOVE, 6 БРИЛЛИАНТОВ', '', '', '', '', '', '', '/images/products/1771236489_9d26b626_IMG_1938.jpg', '/images/products/1771491211_4603a08e_IMG_1939_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771236494_bbc03b15_IMG_1937.jpg\",\"\\/images\\/products\\/1771236494_bea30c71_IMG_1938.jpg\",\"\\/images\\/products\\/1771236494_5712a1e7_IMG_1939.jpg\",\"\\/images\\/products\\/1772545293_992b4984_IMG_1936.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 10:08:21', '2026-03-18 13:36:29'),
(109, 16, 'cartier-d-amour-kolye-kucuk-model', 'CARTIER D\'AMOUR KOLYE, KÜÇÜK MODEL', 'CARTIER D\'AMOUR NECKLACE SMALL MODEL', 'КОЛЬЕ CARTIER D\'AMOUR МАЛАЯ МОДЕЛЬ', '', '', '', '', '', '', '/images/products/1771236839_9be0f1a3_IMG_1929.jpg', '/images/products/1771491269_0581fbd9_IMG_1931_lifestyle_jpg.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1771236843_2a390216_IMG_1929.jpg\",\"\\/images\\/products\\/1772545410_dc18a746_IMG_1927.jpg\",\"\\/images\\/products\\/1771236844_52c66ed4_IMG_1931.jpg\"]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-02-16 10:15:08', '2026-03-18 13:36:29'),
(110, 4, 'KP18017', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18017', '', '', '', '', '', '/images/products/1773128473_fa2d2aff_KP18017_1.jpg', '/images/products/1773392503_c3077be6_KP18017_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773128480_0d387969_KP18017_1.jpg\",\"\\/images\\/products\\/1773128481_5cbeb2b3_KP18017.jpg\"]', '50% 50%', 1.00, 8.25, 18, NULL, 0, 0, 1, '2026-03-06 11:03:00', '2026-03-18 13:36:29'),
(111, 13, 'TS00001', 'İnci Tesbih', 'Pearl Prayer Beads', 'Жемчужные чётки', 'TS00001', '', '', '', '', '', '/images/products/1773128154_9a7cf2cc_TS00001.jpg', '', '50% 50%', 1.00, '[]', '50% 50%', 1.00, NULL, NULL, NULL, 0, 0, 1, '2026-03-06 11:06:05', '2026-03-18 13:36:29'),
(112, 17, 'KD18001', 'Pırlanta Kol Düğmesi', 'Diamond Cufflinks', 'Бриллиантовые запонки', 'KD18001', '', '', '', '', '', '/images/products/1773832962_39389377_KD18001.jpg', '', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 8.74, 18, NULL, 0, 0, 1, '2026-03-06 11:31:57', '2026-03-18 13:36:29'),
(113, 17, 'KD18005', 'Altın Kol Düğmesi', 'Gold Cufflinks', 'Золотые запонки', 'KD18005', '', '', '', '', '', '/images/products/1773832886_f51b03f3_KD18005.jpg', '', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 13.71, 18, NULL, 0, 0, 1, '2026-03-06 11:36:41', '2026-03-18 13:36:29'),
(114, 17, 'KD18006', 'Altın Kol Düğmesi', 'Gold Cufflinks', 'Золотые запонки', 'KD18006', '', '', '', '', '', '/images/products/1773832921_18e65def_KD18006.jpg', '', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 16.50, 18, NULL, 0, 0, 1, '2026-03-06 11:38:48', '2026-03-18 13:36:29'),
(115, 4, 'KP18025', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18025', '', '', '', '', '', '/images/products/1773128268_580e1e8c_KP18025_1.jpg', '/images/products/1773392558_f863227e_KP18025_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773128278_86f91cc0_KP18025_1.jpg\",\"\\/images\\/products\\/1773128278_7359e2ac_KP18025.jpg\"]', '50% 50%', 1.00, 1.31, 18, NULL, 0, 0, 1, '2026-03-06 11:46:31', '2026-03-18 13:36:29'),
(116, 2, 'KL18024', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18024', '', '', '', '', '', '/images/products/1773833085_a3b616d1_KL18024.jpg', '/images/products/1773392235_41b935a7_KL18024_lifestyle.jpg', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 4.63, 18, NULL, 0, 0, 1, '2026-03-06 11:48:58', '2026-03-18 13:36:29'),
(117, 2, 'KL18025', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18025', '', '', '', '', '', '/images/products/1773057218_37947412_KL18025.jpg', '/images/products/1773392252_d5063815_KL18025_lifestyle.jpg', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 4.28, 18, NULL, 0, 0, 1, '2026-03-06 11:50:07', '2026-03-18 13:36:29'),
(118, 2, 'KL18025-1772797818', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18025', NULL, NULL, '', NULL, NULL, '/images/products/1772797779_5d33fc0f_KL18025.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1772797782_00db1833_KL18025.jpg\"]', '50% 50%', 1.00, 4.28, 18, NULL, 0, 0, 0, '2026-03-06 11:50:18', '2026-03-18 13:36:29'),
(119, 2, 'KL18026', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18026', '', '', '', '', '', '/images/products/1773057397_129e5902_KL18026.jpg', '/images/products/1773392352_29906bc0_KL18026_lifestyle.jpg', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 4.98, 18, NULL, 0, 0, 1, '2026-03-06 12:20:06', '2026-03-18 13:36:29'),
(120, 2, 'KL18027', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18027', '', '', '', '', '', '/images/products/1773057413_22409894_KL18027.jpg', '/images/products/1773392410_d40be44d_KL18027_lifestyle.jpg', '50% 50%', 1.00, '[]', '50% 50%', 1.00, 4.43, 18, NULL, 0, 0, 1, '2026-03-06 12:22:25', '2026-03-18 13:36:29'),
(121, 4, 'KP18018', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18018', '', '', '', '', '', '/images/products/1773128305_71760008_KP18018.jpg', '/images/products/1773392530_86bd6de5_KP18018_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773128310_f91c1b46_KP18018_1.jpg\",\"\\/images\\/products\\/1773128311_bdd60a96_KP18018.jpg\"]', '50% 50%', 1.00, 2.96, 18, NULL, 0, 0, 1, '2026-03-06 12:27:16', '2026-03-18 13:36:29'),
(122, 4, 'KP18026', 'Pırlanta Küpe', 'Diamond Earrings', 'Бриллиантовые серьги', 'KP18026', '', '', '', '', '', '/images/products/1773128331_021e4013_KP18026.jpg', '/images/products/1773392581_a4957cff_KP18026_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773128324_22dc714a_KP18026_1.jpg\",\"\\/images\\/products\\/1773128325_57a18206_KP18026.jpg\"]', '50% 50%', 1.00, 1.92, 18, NULL, 0, 0, 1, '2026-03-06 12:30:12', '2026-03-18 13:36:29'),
(123, 17, 'KD18003', 'Pırlanta Kol Düğmesi', 'Diamond Cufflinks', 'Бриллиантовые запонки', 'KD18003', '', '', '', '', '', '/images/products/1773832993_4ea592a4_16.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773832998_82f3ad0d_14.jpg\",\"\\/images\\/products\\/1773832999_a556ca4e_15.jpg\",\"\\/images\\/products\\/1773833000_2bbf6104_16.jpg\"]', '50% 50%', 1.00, 9.40, 18, NULL, 0, 0, 1, '2026-03-09 07:20:02', '2026-03-18 13:36:29'),
(124, 17, 'KD18002', 'Pırlanta Kol Düğmesi', 'Diamond Cufflinks', 'Бриллиантовые запонки', 'KD18002', '', '', '', '', '', '/images/products/1773833061_1fe63e34_19.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773833052_a02c4a34_18.jpg\",\"\\/images\\/products\\/1773833054_79495a18_19.jpg\"]', '50% 50%', 1.00, 14.58, 18, NULL, 0, 0, 1, '2026-03-09 07:22:09', '2026-03-18 13:36:29'),
(125, 1, 'YZ18012', 'Pırlanta Yüzük', 'Diamond Ring', 'Бриллиантовое кольцо', 'YZ18012', '', '', '', '', '', '/images/products/1773128415_af8ecf93_4.jpg', '/images/products/1773392622_2a72039b_YZ18012_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773128420_0e66cdc2_3.jpg\",\"\\/images\\/products\\/1773128421_91658f3c_4.jpg\"]', '50% 50%', 1.00, 9.50, 18, NULL, 0, 0, 1, '2026-03-09 07:24:53', '2026-03-18 13:36:29'),
(126, 2, 'KL14012', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL14012', '', '', '', '', '', '/images/products/1773057440_4bc52e77_7.jpg', '/images/products/1773231184_d3b582c2_KL14012_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773057446_2ce00c96_7.jpg\",\"\\/images\\/products\\/1773057446_04bd9f71_8.jpg\"]', '50% 50%', 1.00, 10.85, 14, NULL, 0, 0, 1, '2026-03-09 07:29:25', '2026-03-18 13:36:29'),
(127, 5, 'KL18010-KP18010-BL18010', 'Pırlanta Set', 'Diamond Set', 'Бриллиантовый комплект', 'KL18010 - KP18010 - BL18010', '', '', '', '', '', '/images/products/1773054514_db479c1f_IMG_1266_set_jpg.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773060860_2a231b51_KL18010_1_kopya.jpg\",\"\\/images\\/products\\/1773054557_f1ecf482_KP18010.jpg\",\"\\/images\\/products\\/1773054569_3d8f0019_BL18010.jpg\",\"\\/images\\/products\\/1773054519_c66440da_IMG_1266_set_jpg.jpg\"]', '50% 50%', 1.00, 20.82, 18, NULL, 0, 0, 1, '2026-03-09 11:16:40', '2026-03-18 13:36:29'),
(128, 5, 'KL18009-KP18009-BL18009', 'Pırlanta Set', 'Diamond Set', 'Бриллиантовый комплект', 'KL18009 - KP18009 - BL18009', '', '', '', '', '', '/images/products/1773055342_0a75335f_IMG_1282_set_jpg.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773055362_69b20cc7_KL18009_1_kopya.jpg\",\"\\/images\\/products\\/1773055372_45deea6a_KP18009.jpg\",\"\\/images\\/products\\/1773055410_c47aa280_BL18009.jpg\",\"\\/images\\/products\\/1773055349_5b2d49c4_IMG_1282_set_jpg.jpg\"]', '50% 50%', 1.00, 25.98, 18, NULL, 0, 0, 1, '2026-03-09 11:27:18', '2026-03-18 13:36:29'),
(129, 5, 'KL18007-KP18007', 'Pırlanta Set', 'Diamond Set', 'Бриллиантовый комплект', 'KL18007 - KP18007', '', '', '', '', '', '/images/products/1773055712_eb6ec3d2_3150_yakin_set_jpg.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773055727_caf86dfe_KL18007.jpg\",\"\\/images\\/products\\/1773055755_7185abf0_KP18002_1.jpg\",\"\\/images\\/products\\/1773055761_39f633c9_3150_yakin_set_jpg.jpg\"]', '50% 50%', 1.00, 4.83, 18, NULL, 0, 0, 1, '2026-03-09 11:30:51', '2026-03-18 13:36:29'),
(130, 5, 'KL18005-KP18005', 'Pırlanta Set', 'Diamond Set', 'Бриллиантовый комплект', 'KL18005 - KP18005', '', '', '', '', '', '/images/products/1773056142_2cccbb9f_kolye1_dik_set_jpg.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773056158_2fa0dc50_KL18005.jpg\",\"\\/images\\/products\\/1773056170_c818fd3d_KP18005_2.jpg\",\"\\/images\\/products\\/1773056145_1d0b8579_kolye1_dik_set_jpg.jpg\"]', '50% 50%', 1.00, 36.22, 18, NULL, 0, 0, 1, '2026-03-09 11:37:32', '2026-03-18 13:36:29'),
(131, 5, 'KL18002-BL18002', 'Pırlanta Set', 'Diamond Set', 'Бриллиантовый комплект', 'KL18002 - BL18002', '', '', '', '', '', '/images/products/1773056842_3c9dcf58_BL18005_4.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773056938_94cd13d3_KL14008.jpg\",\"\\/images\\/products\\/1773056852_6a59645f_BL18005.jpg\",\"\\/images\\/products\\/1773056848_0858f10a_BL18005_4.jpg\"]', '50% 50%', 1.00, 54.96, 18, NULL, 0, 0, 1, '2026-03-09 11:50:23', '2026-03-18 13:36:29'),
(132, 2, 'KL18002', 'Pırlanta Kolye', 'Diamond Necklace', 'Бриллиантовое колье', 'KL18002', '', '', '', '', '', '/images/products/1773057516_61ae96ea_KL14008.jpg', '/images/products/1773392182_0329e693_KL18002_lifestyle.jpg', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773057520_ed732ccd_KL14008_1.jpg\",\"\\/images\\/products\\/1773057521_2d5ad197_KL14008.jpg\"]', '50% 50%', 1.00, 37.92, 18, NULL, 0, 0, 1, '2026-03-09 11:59:30', '2026-03-18 13:36:29'),
(133, 5, 'KL14036-BL14036-KP14036', 'Pırlanta Set', 'Diamond Set', 'Бриллиантовый комплект', 'KL14036 - BL14036 - KP14036', '', '', '', '', '', '/images/products/1773829783_dfde3f1d_14036.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773829795_d9b511c2_KL14036.jpg\",\"\\/images\\/products\\/1773829815_5f5ed846_BL14036_2.jpg\",\"\\/images\\/products\\/1773829816_05eb5fc3_KP14036.jpg\",\"\\/images\\/products\\/1773829814_34b96f0c_14036.jpg\"]', '50% 50%', 1.00, 29.00, 14, NULL, 0, 0, 1, '2026-03-18 10:33:22', '2026-03-18 13:36:29'),
(134, 5, 'KL14037-BL14037-KP14037', 'Pırlanta Set', 'Diamond Set', 'Бриллиантовый комплект', 'KL14037 - BL14037 - KP14037', '', '', '', '', '', '/images/products/1773830066_f74c1e8d_14037.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773830107_23088a49_KL14037.jpg\",\"\\/images\\/products\\/1773830106_aa525eb4_BL14037_2.jpg\",\"\\/images\\/products\\/1773830108_40dfe74b_KP14037.jpg\",\"\\/images\\/products\\/1773830106_af0e6967_14037.jpg\"]', '50% 50%', 1.00, 32.31, 14, NULL, 0, 0, 1, '2026-03-18 10:37:52', '2026-03-18 13:36:29'),
(135, 5, 'KL14038-BL14038-KP14038', 'Pırlanta Set', 'Diamond Set', 'Бриллиантовый комплект', 'KL14038 - BL14038 - KP14038', '', '', '', '', '', '/images/products/1773830382_82bc5559_14038.jpg', '', '50% 50%', 1.00, '[\"\\/images\\/products\\/1773830404_7f9d2a65_KL14038.jpg\",\"\\/images\\/products\\/1773830403_285e68d2_BL14038_2.jpg\",\"\\/images\\/products\\/1773830406_0c354b32_KP14038.jpg\",\"\\/images\\/products\\/1773830402_c80ae967_14038.jpg\"]', '50% 50%', 1.00, 48.67, 14, NULL, 0, 0, 1, '2026-03-18 10:42:13', '2026-03-18 13:36:29');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product_stones`
--

DROP TABLE IF EXISTS `product_stones`;
CREATE TABLE `product_stones` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL COMMENT 'Bağlı olduğu ürün',
  `stone_type` varchar(100) NOT NULL COMMENT 'Taş türü (Pırlanta, Yakut vb.)',
  `stone_type_en` varchar(100) DEFAULT NULL,
  `stone_type_ru` varchar(100) DEFAULT NULL,
  `product_type` varchar(50) DEFAULT NULL,
  `carat` decimal(10,2) DEFAULT NULL COMMENT 'Karat değeri',
  `quantity` int(11) DEFAULT 1 COMMENT 'Taş adedi',
  `color` varchar(20) DEFAULT NULL COMMENT 'Renk (F, G, H vb.)',
  `clarity` varchar(20) DEFAULT NULL COMMENT 'Berraklık (VS, VVS, SI vb.)',
  `cut` varchar(50) DEFAULT NULL COMMENT 'Kesim (Yuvarlak, Baget, Prenses vb.)',
  `cut_ru` varchar(50) DEFAULT NULL,
  `cut_en` varchar(50) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `product_stones`
--

INSERT INTO `product_stones` (`id`, `product_id`, `stone_type`, `stone_type_en`, `stone_type_ru`, `product_type`, `carat`, `quantity`, `color`, `clarity`, `cut`, `cut_ru`, `cut_en`, `sort_order`, `created_at`) VALUES
(841, 26, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.27, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-02 13:42:11'),
(853, 19, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.02, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:10:18'),
(873, 24, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.65, 1, 'G+', 'VS/SI', 'Armut', 'Грушевидная', 'Pear', 0, '2026-03-03 07:15:32'),
(874, 32, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.22, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:15:41'),
(875, 32, 'Turmalin', 'Tourmaline', 'Турмалин', NULL, 1.30, 1, '', '', 'Armut', 'Грушевидная', 'Pear', 1, '2026-03-03 07:15:41'),
(879, 25, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.16, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:17:03'),
(880, 21, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.48, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:17:09'),
(881, 21, 'Turmalin', 'Tourmaline', 'Турмалин', NULL, 1.65, 1, '', '', 'Oval', 'Овальная', 'Oval', 1, '2026-03-03 07:17:09'),
(882, 30, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.08, 1, 'G+', 'VS/SI', 'Prenses', 'Принцесса', 'Princess', 0, '2026-03-03 07:17:49'),
(883, 30, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.27, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-03 07:17:49'),
(887, 4, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.98, 1, 'G+', 'VS/SI', 'Baget', 'Багет', 'Baguette', 0, '2026-03-03 07:19:36'),
(888, 4, 'Tanzanit', 'Tanzanite', 'Танзанит', NULL, 14.35, 1, '', '', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-03 07:19:36'),
(891, 36, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.00, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:21:48'),
(892, 23, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.01, 1, 'G+', 'VS/SI', 'Baget', 'Багет', 'Baguette', 0, '2026-03-03 07:21:58'),
(893, 23, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.15, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-03 07:21:58'),
(902, 2, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.51, 1, 'G+', 'VS/SI', 'Markiz', 'Маркиз', 'Marquise', 0, '2026-03-03 07:26:44'),
(903, 2, 'Fancy Pırlanta', NULL, NULL, NULL, 0.81, 1, '', '', 'Oval', 'Овальная', 'Oval', 1, '2026-03-03 07:26:44'),
(905, 13, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.48, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:29:48'),
(915, 33, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.77, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:34:57'),
(918, 31, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.77, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:35:30'),
(924, 16, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.79, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:38:58'),
(927, 14, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.82, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:40:54'),
(930, 18, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.00, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:41:39'),
(932, 55, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.31, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 0, '2026-03-03 07:42:00'),
(933, 55, 'Yakut', 'Ruby', 'Рубин', NULL, 0.78, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-03 07:42:00'),
(934, 56, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.36, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:42:09'),
(935, 56, 'Yakut', 'Ruby', 'Рубин', NULL, 0.87, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-03 07:42:09'),
(938, 15, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 3.52, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 07:42:35'),
(948, 34, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 12.67, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 08:08:36'),
(988, 88, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.33, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 11:47:43'),
(989, 88, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.07, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 1, '2026-03-03 11:47:43'),
(1005, 35, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.15, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 12:42:44'),
(1008, 17, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.29, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-03 12:50:26'),
(1010, 22, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 3.13, 1, 'G+', 'VS/SI', 'Markiz', 'Маркиз', 'Marquise', 0, '2026-03-03 12:52:58'),
(1018, 118, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.18, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-06 11:50:18'),
(1111, 127, 'Pırlanta', 'Diamond', 'Бриллиант', 'Kolye', 0.50, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-09 13:42:08'),
(1112, 127, 'Yakut', 'Ruby', 'Рубин', NULL, 0.76, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-09 13:42:08'),
(1113, 127, 'Pırlanta', 'Diamond', 'Бриллиант', 'Küpe', 0.66, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 2, '2026-03-09 13:42:08'),
(1114, 127, 'Yakut', 'Ruby', 'Рубин', NULL, 1.14, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 3, '2026-03-09 13:42:08'),
(1115, 127, 'Pırlanta', 'Diamond', 'Бриллиант', 'Bileklik', 1.75, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 4, '2026-03-09 13:42:08'),
(1116, 127, 'Yakut', 'Ruby', 'Рубин', NULL, 2.52, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 5, '2026-03-09 13:42:08'),
(1117, 128, 'Pırlanta', 'Diamond', 'Бриллиант', 'Kolye', 0.87, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-09 13:42:50'),
(1118, 128, 'Yakut', 'Ruby', 'Рубин', NULL, 2.87, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-09 13:42:50'),
(1119, 128, 'Pırlanta', 'Diamond', 'Бриллиант', 'Küpe', 0.97, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 2, '2026-03-09 13:42:50'),
(1120, 128, 'Yakut', 'Ruby', 'Рубин', NULL, 2.87, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 3, '2026-03-09 13:42:50'),
(1121, 128, 'Pırlanta', 'Diamond', 'Бриллиант', 'Bileklik', 1.53, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 4, '2026-03-09 13:42:50'),
(1122, 128, 'Yakut', 'Ruby', 'Рубин', NULL, 2.16, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 5, '2026-03-09 13:42:50'),
(1123, 129, 'Pırlanta', 'Diamond', 'Бриллиант', 'Kolye', 0.60, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-09 13:42:59'),
(1124, 129, 'Pırlanta', 'Diamond', 'Бриллиант', 'Küpe', 1.27, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-09 13:42:59'),
(1134, 62, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.49, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:42:20'),
(1135, 62, 'Zümrüt', 'Emerald', 'Изумруд', NULL, 1.15, 1, '', '', 'Oval', 'Овальная', 'Oval', 1, '2026-03-10 07:42:20'),
(1136, 20, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.53, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:42:52'),
(1137, 20, 'Zümrüt', 'Emerald', 'Изумруд', NULL, 1.53, 1, '', '', 'Oval', 'Овальная', 'Oval', 1, '2026-03-10 07:42:52'),
(1138, 53, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 3.90, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:43:21'),
(1139, 54, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.43, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 0, '2026-03-10 07:43:43'),
(1140, 57, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.32, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 0, '2026-03-10 07:44:09'),
(1141, 58, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.36, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 0, '2026-03-10 07:44:29'),
(1142, 58, 'Yakut', 'Ruby', 'Рубин', NULL, 0.66, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-10 07:44:29'),
(1143, 59, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.25, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:44:46'),
(1144, 59, 'Zümrüt', 'Emerald', 'Изумруд', NULL, 2.50, 1, '', '', 'Armut', 'Грушевидная', 'Pear', 1, '2026-03-10 07:44:46'),
(1145, 79, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.30, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:45:24'),
(1146, 74, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.30, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:45:41'),
(1147, 60, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.31, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:46:54'),
(1148, 60, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.30, 1, 'G+', 'VS/SI', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-10 07:46:54'),
(1149, 75, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.30, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:47:10'),
(1150, 78, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.29, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:47:28'),
(1152, 61, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.30, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:48:11'),
(1153, 61, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.53, 1, 'G+', 'VS/SI', 'Armut', 'Грушевидная', 'Pear', 1, '2026-03-10 07:48:11'),
(1154, 77, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.32, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 07:48:32'),
(1164, 50, 'Tanzanit', 'Tanzanite', 'Танзанит', NULL, 2.23, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 0, '2026-03-10 09:34:26'),
(1168, 39, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 5.04, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 09:36:07'),
(1169, 39, 'Yakut', 'Ruby', 'Рубин', NULL, 8.00, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-10 09:36:07'),
(1175, 94, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.28, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 09:41:20'),
(1205, 27, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.85, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 09:49:10'),
(1206, 28, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.40, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 09:49:26'),
(1207, 29, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.82, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-10 09:49:32'),
(1224, 6, 'Mavi Pırlanta', NULL, NULL, NULL, 3.44, 1, '', '', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:05:53'),
(1225, 7, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.74, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:06:55'),
(1226, 7, 'Mavi Pırlanta', NULL, NULL, NULL, 5.78, 1, '', '', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-11 12:06:55'),
(1227, 10, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.51, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:07:28'),
(1228, 10, 'Safir', 'Sapphire', 'Сапфир', NULL, 1.89, 1, '', '', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-11 12:07:28'),
(1231, 12, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.75, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:08:10'),
(1232, 12, 'Kahverengi Pırlanta', NULL, NULL, NULL, 8.43, 1, '', '', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-11 12:08:10'),
(1233, 89, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.56, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:08:39'),
(1234, 93, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.39, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:09:03'),
(1235, 90, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.86, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:09:22'),
(1236, 91, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.94, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:09:41'),
(1237, 92, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.67, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:10:01'),
(1238, 5, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 4.43, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:10:27'),
(1239, 5, 'Zümrüt', 'Emerald', 'Изумруд', NULL, 9.25, 1, '', '', 'Oval', 'Овальная', 'Oval', 1, '2026-03-11 12:10:27'),
(1240, 8, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.53, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:10:47'),
(1241, 8, 'Yakut', 'Ruby', 'Рубин', NULL, 2.16, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-11 12:10:47'),
(1242, 9, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.75, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:11:05'),
(1243, 9, 'Yakut', 'Ruby', 'Рубин', NULL, 2.52, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-11 12:11:05'),
(1244, 51, 'Tanzanit', 'Tanzanite', 'Танзанит', NULL, 2.25, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 0, '2026-03-11 12:11:30'),
(1245, 70, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.62, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:11:54'),
(1246, 69, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.45, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:12:23'),
(1247, 68, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.35, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:12:44'),
(1248, 126, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.46, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 0, '2026-03-11 12:13:08'),
(1249, 126, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.32, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-11 12:13:08'),
(1250, 126, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.15, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 2, '2026-03-11 12:13:08'),
(1253, 3, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.46, 1, 'G+', 'VS/SI', 'Markiz', 'Маркиз', 'Marquise', 0, '2026-03-11 12:14:29'),
(1254, 3, 'Fancy Pırlanta', NULL, NULL, NULL, 0.65, 1, '', '', 'Oval', 'Овальная', 'Oval', 1, '2026-03-11 12:14:29'),
(1255, 37, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.60, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:14:52'),
(1256, 72, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.87, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:15:09'),
(1257, 72, 'Yakut', 'Ruby', 'Рубин', NULL, 2.87, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-11 12:15:09'),
(1258, 73, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.50, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:15:27'),
(1259, 73, 'Yakut', 'Ruby', 'Рубин', NULL, 0.76, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-11 12:15:27'),
(1260, 87, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.33, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:15:48'),
(1261, 87, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.07, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 1, '2026-03-11 12:15:48'),
(1262, 52, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.33, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:16:17'),
(1263, 52, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.77, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 1, '2026-03-11 12:16:17'),
(1264, 67, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.49, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:16:37'),
(1265, 65, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.57, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:16:56'),
(1266, 64, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.97, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:17:14'),
(1267, 64, 'Yakut', 'Ruby', 'Рубин', NULL, 2.87, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-11 12:17:14'),
(1268, 63, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.66, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:17:33'),
(1269, 63, 'Yakut', 'Ruby', 'Рубин', NULL, 1.14, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-11 12:17:33'),
(1272, 80, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.40, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:19:00'),
(1273, 81, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.37, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:19:25'),
(1274, 82, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.31, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:19:40'),
(1275, 83, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.29, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:19:58'),
(1276, 84, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.30, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:22:25'),
(1277, 85, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.30, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:23:14'),
(1278, 76, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.30, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:46:21'),
(1286, 41, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 7.61, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 12:57:05'),
(1287, 41, 'Safir', 'Sapphire', 'Сапфир', NULL, 16.48, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-11 12:57:05'),
(1291, 47, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 3.30, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 13:00:41'),
(1292, 11, 'Kahverengi Pırlanta', NULL, NULL, NULL, 4.46, 1, '', '', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 13:02:51'),
(1293, 11, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 4.14, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-11 13:02:51'),
(1294, 86, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.22, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 13:07:11'),
(1295, 86, 'Safir', 'Sapphire', 'Сапфир', NULL, 4.20, 1, '', '', 'Armut', 'Грушевидная', 'Pear', 1, '2026-03-11 13:07:11'),
(1296, 44, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 10.93, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 13:25:15'),
(1297, 38, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 4.46, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 13:26:04'),
(1298, 43, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.27, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-11 13:27:15'),
(1299, 43, 'Safir', 'Sapphire', 'Сапфир', NULL, 1.51, 1, '', '', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-11 13:27:15'),
(1300, 96, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 9.42, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:45:44'),
(1301, 40, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 19.10, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:46:16'),
(1302, 95, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 11.82, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:49:50'),
(1305, 42, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 3.82, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:52:00'),
(1306, 42, 'Yakut', 'Ruby', 'Рубин', NULL, 5.22, 1, '', '', 'Markiz', 'Маркиз', 'Marquise', 1, '2026-03-13 08:52:00'),
(1307, 49, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 20.53, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:52:31'),
(1308, 97, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 9.14, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:53:11'),
(1309, 46, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 4.53, 1, 'G+', 'VS/SI', 'Armut', 'Грушевидная', 'Pear', 0, '2026-03-13 08:54:43'),
(1310, 48, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 5.60, 1, 'G+', 'VS/SI', 'Markiz', 'Маркиз', 'Marquise', 0, '2026-03-13 08:55:09'),
(1311, 45, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.65, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:55:45'),
(1312, 132, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 28.48, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:56:25'),
(1313, 71, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.02, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:56:46'),
(1315, 117, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.18, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:57:36'),
(1318, 119, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.13, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 08:59:54'),
(1319, 120, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.84, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 09:00:11'),
(1320, 1, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.79, 1, 'G+', 'VS/SI', 'Markiz', 'Маркиз', 'Marquise', 0, '2026-03-13 09:00:42'),
(1321, 1, 'Fancy Pırlanta', NULL, NULL, NULL, 1.33, 1, '', '', 'Oval', 'Овальная', 'Oval', 1, '2026-03-13 09:00:42'),
(1322, 66, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.15, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 09:01:12'),
(1323, 110, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.90, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 09:01:47'),
(1324, 121, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.28, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 09:02:12'),
(1325, 115, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.35, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 09:02:40'),
(1326, 122, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.57, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-13 09:03:04'),
(1327, 125, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 2.16, 1, 'G+', 'VS/SI', 'Trapez', 'Трапеция', 'Trapeze', 0, '2026-03-13 09:03:48'),
(1340, 133, 'Pırlanta', 'Diamond', 'Бриллиант', 'Kolye', 3.05, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-18 10:42:56'),
(1341, 133, 'Pırlanta', 'Diamond', 'Бриллиант', 'Bileklik', 1.29, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-18 10:42:56'),
(1342, 133, 'Pırlanta', 'Diamond', 'Бриллиант', 'Küpe', 0.86, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 2, '2026-03-18 10:42:56'),
(1349, 130, 'Pırlanta', 'Diamond', 'Бриллиант', 'Kolye', 10.93, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-18 10:43:43'),
(1350, 130, 'Pırlanta', 'Diamond', 'Бриллиант', 'Küpe', 0.82, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-18 10:43:43'),
(1351, 131, 'Pırlanta', 'Diamond', 'Бриллиант', 'Kolye', 28.48, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-18 10:43:55'),
(1352, 131, 'Pırlanta', 'Diamond', 'Бриллиант', 'Bileklik', 11.82, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-18 10:43:55'),
(1353, 134, 'Pırlanta', 'Diamond', 'Бриллиант', 'Kolye', 2.94, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-18 10:45:53'),
(1354, 134, 'Pırlanta', 'Diamond', 'Бриллиант', 'Bileklik', 1.14, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-18 10:45:53'),
(1355, 134, 'Pırlanta', 'Diamond', 'Бриллиант', 'Küpe', 1.02, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 2, '2026-03-18 10:45:53'),
(1356, 135, 'Pırlanta', 'Diamond', 'Бриллиант', 'Kolye', 5.34, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-18 10:46:04'),
(1357, 135, 'Pırlanta', 'Diamond', 'Бриллиант', 'Bileklik', 1.83, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-18 10:46:04'),
(1358, 135, 'Pırlanta', 'Diamond', 'Бриллиант', 'Küpe', 1.91, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 2, '2026-03-18 10:46:04'),
(1359, 112, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.40, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-18 11:22:47'),
(1360, 123, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.15, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-18 11:23:26'),
(1361, 124, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 0.40, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-18 11:24:25'),
(1362, 124, 'Safir', 'Sapphire', 'Сапфир', NULL, 0.70, 1, '', '', 'Yuvarlak', 'Круглая', 'Round', 1, '2026-03-18 11:24:25'),
(1363, 116, 'Pırlanta', 'Diamond', 'Бриллиант', NULL, 1.05, 1, 'G+', 'VS/SI', 'Yuvarlak', 'Круглая', 'Round', 0, '2026-03-18 11:24:49');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `social_media`
--

DROP TABLE IF EXISTS `social_media`;
CREATE TABLE `social_media` (
  `id` int(11) NOT NULL,
  `platform` varchar(50) NOT NULL COMMENT 'instagram, facebook, twitter vb.',
  `url` varchar(255) NOT NULL,
  `icon` varchar(50) DEFAULT NULL COMMENT 'İkon sınıfı',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `social_media`
--

INSERT INTO `social_media` (`id`, `platform`, `url`, `icon`, `sort_order`, `is_active`) VALUES
(1, 'instagram', 'https://www.instagram.com/gozumunnuruantalya', 'instagram', 1, 1),
(2, 'instagram', 'https://www.instagram.com/hankuyumculuk_', 'instagram', 2, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `top_banner`
--

DROP TABLE IF EXISTS `top_banner`;
CREATE TABLE `top_banner` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL COMMENT 'Banner metni',
  `text_en` text DEFAULT NULL,
  `text_ru` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL COMMENT 'Tıklanınca gidilecek link',
  `is_visible` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `top_banner`
--

INSERT INTO `top_banner` (`id`, `text`, `text_en`, `text_ru`, `link`, `is_visible`, `updated_at`) VALUES
(1, 'Çok yakında sizlerle buluşuyoruz... Yeni koleksiyonlarımız için bizi takip edin!', 'We will be with you very soon... Follow us for our new collections!', 'Совсем скоро мы будем с вами... Следите за нашими новыми коллекциями!', '', 1, '2026-03-18 13:21:22');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `about_values`
--
ALTER TABLE `about_values`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Tablo için indeksler `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Tablo için indeksler `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_categories_parent` (`parent_type`),
  ADD KEY `idx_categories_slug` (`slug`);

--
-- Tablo için indeksler `category_products`
--
ALTER TABLE `category_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_category_product` (`category_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Tablo için indeksler `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `featured_products`
--
ALTER TABLE `featured_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Tablo için indeksler `footer_columns`
--
ALTER TABLE `footer_columns`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `footer_links`
--
ALTER TABLE `footer_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `column_id` (`column_id`);

--
-- Tablo için indeksler `footer_settings`
--
ALTER TABLE `footer_settings`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `general_settings`
--
ALTER TABLE `general_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Tablo için indeksler `header_main_nav`
--
ALTER TABLE `header_main_nav`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `header_settings`
--
ALTER TABLE `header_settings`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `header_top_links`
--
ALTER TABLE `header_top_links`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `hero_slides`
--
ALTER TABLE `hero_slides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_hero_slides_order` (`sort_order`);

--
-- Tablo için indeksler `homepage_blog_section`
--
ALTER TABLE `homepage_blog_section`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `homepage_cards`
--
ALTER TABLE `homepage_cards`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `homepage_featured_section`
--
ALTER TABLE `homepage_featured_section`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `homepage_investment_section`
--
ALTER TABLE `homepage_investment_section`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `homepage_parallax_section`
--
ALTER TABLE `homepage_parallax_section`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `homepage_special_section`
--
ALTER TABLE `homepage_special_section`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `homepage_story_section`
--
ALTER TABLE `homepage_story_section`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `homepage_trend_section`
--
ALTER TABLE `homepage_trend_section`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_pages_slug` (`slug`);

--
-- Tablo için indeksler `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_products_category` (`category_id`),
  ADD KEY `idx_products_slug` (`slug`),
  ADD KEY `idx_products_featured` (`is_featured`),
  ADD KEY `idx_products_active` (`is_active`);

--
-- Tablo için indeksler `product_stones`
--
ALTER TABLE `product_stones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Tablo için indeksler `social_media`
--
ALTER TABLE `social_media`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `top_banner`
--
ALTER TABLE `top_banner`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `about_values`
--
ALTER TABLE `about_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Tablo için AUTO_INCREMENT değeri `category_products`
--
ALTER TABLE `category_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1844;

--
-- Tablo için AUTO_INCREMENT değeri `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `featured_products`
--
ALTER TABLE `featured_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `footer_columns`
--
ALTER TABLE `footer_columns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `footer_links`
--
ALTER TABLE `footer_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `footer_settings`
--
ALTER TABLE `footer_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `general_settings`
--
ALTER TABLE `general_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=469;

--
-- Tablo için AUTO_INCREMENT değeri `header_main_nav`
--
ALTER TABLE `header_main_nav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `header_settings`
--
ALTER TABLE `header_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `header_top_links`
--
ALTER TABLE `header_top_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `hero_slides`
--
ALTER TABLE `hero_slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `homepage_blog_section`
--
ALTER TABLE `homepage_blog_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `homepage_cards`
--
ALTER TABLE `homepage_cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2401;

--
-- Tablo için AUTO_INCREMENT değeri `homepage_featured_section`
--
ALTER TABLE `homepage_featured_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `homepage_investment_section`
--
ALTER TABLE `homepage_investment_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `homepage_parallax_section`
--
ALTER TABLE `homepage_parallax_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `homepage_special_section`
--
ALTER TABLE `homepage_special_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `homepage_story_section`
--
ALTER TABLE `homepage_story_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `homepage_trend_section`
--
ALTER TABLE `homepage_trend_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- Tablo için AUTO_INCREMENT değeri `product_stones`
--
ALTER TABLE `product_stones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1364;

--
-- Tablo için AUTO_INCREMENT değeri `social_media`
--
ALTER TABLE `social_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `top_banner`
--
ALTER TABLE `top_banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `category_products`
--
ALTER TABLE `category_products`
  ADD CONSTRAINT `category_products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `category_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `featured_products`
--
ALTER TABLE `featured_products`
  ADD CONSTRAINT `featured_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `footer_links`
--
ALTER TABLE `footer_links`
  ADD CONSTRAINT `footer_links_ibfk_1` FOREIGN KEY (`column_id`) REFERENCES `footer_columns` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Tablo kısıtlamaları `product_stones`
--
ALTER TABLE `product_stones`
  ADD CONSTRAINT `product_stones_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
