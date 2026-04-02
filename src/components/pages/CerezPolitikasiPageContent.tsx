'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import type { Locale } from "@/i18n/config";

interface CerezPolitikasiPageContentProps {
  locale: Locale;
  pageId?: string;
}

export default function CerezPolitikasiPageContent({ locale }: CerezPolitikasiPageContentProps) {
  const content = useContent(locale);
  const t = useTranslation(locale);

  const isTR = locale === 'tr';
  const isEN = locale === 'en';

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isHero={false}
        isTransparent={false}
        bannerText={content.topBanner?.text}
        bannerVisible={content.topBanner?.visible}
      />

      <main className="min-h-screen bg-white pt-[210px] pb-20">
        <div className="max-w-[900px] mx-auto px-6 md:px-8">
          <h1 className="text-[32px] md:text-[50px] leading-[1.2] text-primary text-center mb-12" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
            {t('cookiePolicy.title')}
          </h1>

          <div className="prose prose-lg max-w-none text-[#2f3237]">

            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Han Kuyumculuk {t('cookiePolicy.title')}
            </h2>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'Han Kuyumculuk … ("Han" veya "Şirket" ya da "biz", "bize", "bizim") olarak çerezler kullanmaktayız. Çerezler, internet sitemiz üzerinden bilgi topladığımız ve bazı durumlarda internet sitemizi kullanımınıza ilişkin bilgileri takip edebildiğimiz otomatik araçlardır. Çerezleri; kullanıcı deneyiminizi, internet sitemizin işlevselliğini ve size sunduğumuz hizmetleri optimize etmek amacıyla kullanıyoruz.'}
              {isEN && 'Han Kuyumculuk … ("Han" or "Company" or "we", "us", "our") uses cookies. Cookies are automated means by which we collect information through our website and, in some cases, track information about your use of our website. We use cookies to optimize your user experience, the functionality of our website, and the services we provide to you.'}
              {!isTR && !isEN && 'Han Kuyumculuk … («Han» или «Компания» или «мы», «нас», «наш») использует файлы cookie. Файлы cookie — это автоматизированные средства, с помощью которых мы собираем информацию через наш веб-сайт и в некоторых случаях отслеживаем информацию об использовании вами нашего веб-сайта. Мы используем файлы cookie для оптимизации вашего пользовательского опыта, функциональности нашего веб-сайта и услуг, которые мы вам предоставляем.'}
            </p>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'İnternet sitemizi ziyaret ettiğinizde, web sunucumuz bilgisayarınıza bir çerez gönderir. Bu çerez sayesinde bilgisayarınızı tanıyabilir ve çeşitli işlevleri yerine getirebiliriz.'}
              {isEN && 'When you visit our website, our web server sends a cookie to your computer. This cookie allows us to recognize your computer and perform various functions.'}
              {!isTR && !isEN && 'Когда вы посещаете наш веб-сайт, наш веб-сервер отправляет cookie на ваш компьютер. Этот cookie позволяет нам распознавать ваш компьютер и выполнять различные функции.'}
            </p>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'Bu sayfanın ötesine geçerek internet sitemizi kullanmaya devam etmeniz halinde, bu Çerez Politikası\'nı ve Gizlilik Bildirimi\'ni okuduğunuzu ve anladığınızı kabul etmiş sayılırsınız. Çerezleri çerez yönetim aracı ve/veya tarayıcı ayarlarınızı değiştirerek sınırlandırabileceğinizi hatırlatmak isteriz. Ancak bu tür kısıtlamaların, internet sitemizin işlevselliğini ve kullanıcı deneyiminizi olumsuz etkileyebileceğini lütfen unutmayınız.'}
              {isEN && 'By continuing to use our website beyond this page, you acknowledge that you have read and understood this Cookie Policy and Privacy Notice. Please note that you can limit cookies by modifying your cookie management tool and/or browser settings, but such restrictions may negatively impact our website\'s functionality and your user experience.'}
              {!isTR && !isEN && 'Продолжая использовать наш веб-сайт за пределами этой страницы, вы подтверждаете, что прочитали и поняли настоящую Политику использования файлов cookie и Уведомление о конфиденциальности. Обратите внимание, что вы можете ограничить использование файлов cookie, изменив инструмент управления cookies и/или настройки браузера, однако такие ограничения могут негативно повлиять на функциональность нашего веб-сайта и ваш пользовательский опыт.'}
            </p>

            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              {isTR && 'Çerezler hangi amaçlarla kullanılır?'}
              {isEN && 'For what purposes are cookies used?'}
              {!isTR && !isEN && 'В каких целях используются файлы cookie?'}
            </h2>

            <h3 className="text-[20px] md:text-[24px] text-[#2f3237] mt-8 mb-4 font-medium">
              {isTR && '1. Çerezler İnternet Sitesinin Temel İşlevlerini Destekler'}
              {isEN && '1. Cookies Support Core Website Functions'}
              {!isTR && !isEN && '1. Файлы cookie поддерживают основные функции сайта'}
            </h3>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'Bazı çerezler, internet sitemizin temel işlevlerinin çalışabilmesi için gerekli olan zorunlu ve işlevsel çerezlerdir. Örneğin, alışveriş yapmaya devam ederken ve internet sitemizin farklı sayfaları arasında gezinirken sepetinizdeki ürünlerin saklanmasını sağlar.'}
              {isEN && 'Some cookies are mandatory and functional cookies necessary for the basic functions of our website to operate. For example, they ensure that items in your shopping cart are saved while you continue shopping and navigating between different pages of our website.'}
              {!isTR && !isEN && 'Некоторые файлы cookie являются обязательными и функциональными файлами cookie, необходимыми для работы основных функций нашего веб-сайта. Например, они обеспечивают сохранение товаров в вашей корзине покупок при продолжении покупок и навигации между различными страницами нашего веб-сайта.'}
            </p>

            <h3 className="text-[20px] md:text-[24px] text-[#2f3237] mt-8 mb-4 font-medium">
              {isTR && '2. Çerezler İnternet Sitemizin ve Hizmetlerimizin Kalitesini Artırmaya Yardımcı Olur'}
              {isEN && '2. Cookies Help Improve the Quality of Our Website and Services'}
              {!isTR && !isEN && '2. Файлы cookie помогают улучшить качество нашего веб-сайта и услуг'}
            </h3>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'Çerezler (bazı durumlarda IP adresi dâhil olmak üzere) internet sitemizi nasıl kullandığınıza ilişkin bilgiler toplar. Bu sayede internet sitemizin gezilebilirliğini değerlendirebilir ve size daha iyi hizmet sunabiliriz.'}
              {isEN && 'Cookies collect information about how you use our website (including, in some cases, your IP address). This allows us to evaluate the navigability of our website and provide you with better service.'}
              {!isTR && !isEN && 'Файлы cookie собирают информацию о том, как вы используете наш веб-сайт (включая, в некоторых случаях, ваш IP-адрес). Это позволяет нам оценивать навигацию по нашему веб-сайту и предоставлять вам лучший сервис.'}
            </p>

            <ul className="list-disc pl-8 mb-6 space-y-2">
              {isTR && <>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">İnternet sitemizin kullanımına ilişkin toplu ve anonim istatistikler sağlamak,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Reklamlarımızın etkinliğini ölçmek; hangi bağlantılara tıkladığınızı ve hangi internet sitesinden geldiğinizi tespit etmek,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Ziyaretçilerimizden birinin aynı zamanda iş birliği yaptığımız üçüncü tarafların internet sitesini de ziyaret ettiğine dair geri bildirim sağlamak,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Tarama deneyiminiz sırasında oluşan hataları tespit ederek internet sitemizi geliştirmek,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Daha gelişmiş site işlevleri sunmak, ek hizmetlere erişim sağlamak veya daha sonraki bir ziyaretinizde alışveriş sepetinizi geri yüklemek.</li>
              </>}
              {isEN && <>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Providing aggregated and anonymous statistics on the use of our website,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Measuring the effectiveness of our advertisements; identifying which links you click and which website you came from,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Providing feedback that one of our visitors also visited the website of third parties we partner with,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Detecting errors during your browsing experience to improve our website,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Offering more advanced site features, providing access to additional services, or restoring your shopping cart on a later visit.</li>
              </>}
              {!isTR && !isEN && <>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Предоставление сводной и анонимной статистики использования нашего веб-сайта,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Измерение эффективности нашей рекламы; определение, на какие ссылки вы нажимаете и с какого веб-сайта вы пришли,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Предоставление обратной связи о том, что один из наших посетителей также посетил веб-сайт третьих лиц, с которыми мы сотрудничаем,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Обнаружение ошибок во время вашего просмотра для улучшения нашего веб-сайта,</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]">Предложение более продвинутых функций сайта, предоставление доступа к дополнительным услугам или восстановление корзины покупок при следующем посещении.</li>
              </>}
            </ul>

            <h3 className="text-[20px] md:text-[24px] text-[#2f3237] mt-8 mb-4 font-medium">
              {isTR && '3. Çerezler Bilgileri Seçili Üçüncü Taraf İş Ortaklarımızla Paylaşabilir'}
              {isEN && '3. Cookies May Share Information with Our Selected Third-Party Business Partners'}
              {!isTR && !isEN && '3. Файлы cookie могут передавать информацию нашим избранным сторонним деловым партнёрам'}
            </h3>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'Üçüncü taraf çerezler, internet sitemizde sunulan hizmetleri sağlamak amacıyla iş ortaklarımızla bilgi paylaşabilir. Paylaşılan bilgiler yalnızca ilgili hizmet veya işlevin sağlanması amacıyla kullanılır (örneğin sosyal medya "beğen" ve "paylaş" butonları).'}
              {isEN && 'Third-party cookies may share information with our business partners to provide services offered on our website. Shared information is used only for the purpose of providing the relevant service or function (e.g. social media "like" and "share" buttons).'}
              {!isTR && !isEN && 'Сторонние файлы cookie могут передавать информацию нашим деловым партнёрам для предоставления услуг, предлагаемых на нашем веб-сайте. Совместно используемая информация используется только в целях предоставления соответствующей услуги или функции (например, кнопки «Нравится» и «Поделиться» в социальных сетях).'}
            </p>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'Bazı üçüncü taraf çerezler, ilgi alanına dayalı hizmetler sunarak hem bu internet sitesinde hem de diğer bazı internet sitelerinde kişiselleştirilmiş bir kullanıcı deneyimi sağlamaya yardımcı olabilir. Bu bilgiler, ilginizi çekebilecek Han Kuyumculuk ürün ve hizmetleri hakkında sizi bilgilendirmek amacıyla kullanılır.'}
              {isEN && 'Some third-party cookies may help provide a personalized user experience on both this website and some other websites by offering interest-based services. This information is used to inform you about Han Kuyumculuk products and services that may interest you.'}
              {!isTR && !isEN && 'Некоторые сторонние файлы cookie могут помочь обеспечить персонализированный пользовательский опыт как на этом веб-сайте, так и на некоторых других веб-сайтах, предлагая услуги, основанные на интересах. Эта информация используется для информирования вас о продуктах и услугах Han Kuyumculuk, которые могут вас заинтересовать.'}
            </p>

            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              {isTR && 'Çerezlerin Toplanma Yöntemi ve Hukuki Sebebi'}
              {isEN && 'Method of Cookie Collection and Legal Basis'}
              {!isTR && !isEN && 'Метод сбора файлов cookie и правовое основание'}
            </h2>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'Çerezler, internet sitemizi kullandığınızda elektronik ortamda otomatik yöntemlerle toplanmaktadır:'}
              {isEN && 'Cookies are collected automatically by electronic means when you use our website:'}
              {!isTR && !isEN && 'Файлы cookie собираются автоматически электронными средствами при использовании вами нашего веб-сайта:'}
            </p>

            <ul className="list-disc pl-8 mb-6 space-y-2">
              {isTR && <>
                <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Meşru menfaatlerimiz için veri işlenmesinin zorunlu olması:</strong> Analitik Çerezler</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması kaydıyla:</strong> Zorunlu Çerezler; İşlevsel Çerezler</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Açık rızanıza dayanılarak:</strong> Reklam ve Sosyal Medya Çerezleri</li>
              </>}
              {isEN && <>
                <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Necessity for processing data for our legitimate interests:</strong> Analytical Cookies</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Directly related to the establishment or performance of a contract:</strong> Mandatory Cookies; Functional Cookies</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Based on your explicit consent:</strong> Advertising and Social Media Cookies</li>
              </>}
              {!isTR && !isEN && <>
                <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Необходимость обработки данных в наших законных интересах:</strong> Аналитические файлы cookie</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Непосредственно связано с заключением или исполнением договора:</strong> Обязательные файлы cookie; Функциональные файлы cookie</li>
                <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>На основании вашего явного согласия:</strong> Рекламные файлы cookie и файлы cookie социальных сетей</li>
              </>}
            </ul>

            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              {isTR && 'Çerez tercihlerinizi yönetme'}
              {isEN && 'Managing your cookie preferences'}
              {!isTR && !isEN && 'Управление настройками файлов cookie'}
            </h2>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'İnternet sitemizde kullanılan tüm çerezleri yönetmek için çerez yönetim aracımızı ve/veya tarayıcı ayarlarınızı kullanabilirsiniz. Çerezlerin yönetimi hakkında daha fazla bilgi için '}
              {isEN && 'You can use our cookie management tool and/or browser settings to manage all cookies used on our website. For more information about managing cookies, visit '}
              {!isTR && !isEN && 'Вы можете использовать наш инструмент управления cookie и/или настройки браузера для управления всеми файлами cookie, используемыми на нашем веб-сайте. Для получения дополнительной информации об управлении файлами cookie посетите '}
              <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                http://www.allaboutcookies.org/
              </a>
              {isTR && ' adresini ziyaret edebilirsiniz.'}
              {isEN && '.'}
              {!isTR && !isEN && '.'}
            </p>

            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              {isTR && 'Kişisel verileriniz ve haklarınız'}
              {isEN && 'Your personal data and rights'}
              {!isTR && !isEN && 'Ваши персональные данные и права'}
            </h2>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'Çerezler aracılığıyla toplanan bilgiler her zaman sizi tanımlayabilecek nitelikte olmayabilir. Kişisel verilerinizin işlenmesine ilişkin daha fazla bilgi için lütfen Gizlilik Bildirimi\'ni inceleyiniz.'}
              {isEN && 'Information collected through cookies may not always be of a nature that can identify you. For more information about the processing of your personal data, please review the Privacy Notice.'}
              {!isTR && !isEN && 'Информация, собранная с помощью файлов cookie, не всегда может иметь характер, позволяющий идентифицировать вас. Для получения дополнительной информации об обработке ваших персональных данных ознакомьтесь с Уведомлением о конфиденциальности.'}
            </p>

            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {isTR && 'Yukarıda belirtilen haklarınıza ilişkin taleplerinizi info@hankuyumculuk.com adresi üzerinden veya mevzuatta öngörülen diğer yöntemlerle Şirketimize iletebilirsiniz.'}
              {isEN && 'You can submit requests regarding your rights to info@hankuyumculuk.com or through other methods provided by applicable law.'}
              {!isTR && !isEN && 'Вы можете направлять запросы в отношении своих прав на адрес info@hankuyumculuk.com или иными способами, предусмотренными действующим законодательством.'}
            </p>

          </div>
        </div>
      </main>

      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        columns={content.footer.columns}
        socialLinks={content.footer.socialLinks}
        copyright={content.footer.copyright}
      />
    </>
  );
}
