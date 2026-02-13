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
          {/* Page Title */}
          <h1 className="text-[32px] md:text-[50px] leading-[1.2] text-primary text-center mb-12" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
            {t('cookiePolicy.title')}
          </h1>
          
          {/* Content */}
          <div className="prose prose-lg max-w-none text-[#2f3237]">
            {/* Section */}
            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Han Kuyumculuk {t('cookiePolicy.title')}
            </h2>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {locale === 'tr' && 'Han Kuyumculuk … ("Han" veya "Şirket" ya da "biz", "bize", "bizim") olarak çerezler kullanmaktayız. Çerezler, internet sitemiz üzerinden bilgi topladığımız ve bazı durumlarda internet sitemizi kullanımınıza ilişkin bilgileri takip edebildiğimiz otomatik araçlardır. Çerezleri; kullanıcı deneyiminizi, internet sitemizin işlevselliğini ve size sunduğumuz hizmetleri optimize etmek amacıyla kullanıyoruz.'}
              {locale === 'en' && 'Han Kuyumculuk … ("Han" or "Company" or "we", "us", "our") uses cookies. Cookies are automated means by which we collect information through our website and, in some cases, track information about your use of our website. We use cookies to optimize your user experience, the functionality of our website, and the services we provide to you.'}
              {locale === 'ru' && 'Han Kuyumculuk … («Han» или «Компания» или «мы», «нас», «наш») использует файлы cookie. Файлы cookie — это автоматизированные средства, с помощью которых мы собираем информацию через наш веб-сайт и в некоторых случаях отслеживаем информацию об использовании вами нашего веб-сайта. Мы используем файлы cookie для оптимизации вашего пользовательского опыта, функциональности нашего веб-сайта и услуг, которые мы вам предоставляем.'}
            </p>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {locale === 'tr' && 'İnternet sitemizi ziyaret ettiğinizde, web sunucumuz bilgisayarınıza bir çerez gönderir. Bu çerez sayesinde bilgisayarınızı tanıyabilir ve çeşitli işlevleri yerine getirebiliriz.'}
              {locale === 'en' && 'When you visit our website, our web server sends a cookie to your computer. This cookie allows us to recognize your computer and perform various functions.'}
              {locale === 'ru' && 'Когда вы посещаете наш веб-сайт, наш веб-сервер отправляет cookie на ваш компьютер. Этот cookie позволяет нам распознавать ваш компьютер и выполнять различные функции.'}
            </p>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              {locale === 'tr' && 'Bu sayfanın ötesine geçerek internet sitemizi kullanmaya devam etmeniz halinde, bu Çerez Politikası\'nı ve Gizlilik Bildirimi\'ni okuduğunuzu ve anladığınızı kabul etmiş sayılırsınız.'}
              {locale === 'en' && 'By continuing to use our website beyond this page, you acknowledge that you have read and understood this Cookie Policy and Privacy Notice.'}
              {locale === 'ru' && 'Продолжая использовать наш веб-сайт за пределами этой страницы, вы подтверждаете, что прочитали и поняли настоящую Политику использования файлов cookie и Уведомление о конфиденциальности.'}
            </p>
          </div>
        </div>
      </main>
      
      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        description={content.footer.description}
        columns={content.footer.columns}
        socialLinks={content.footer.socialLinks}
        copyright={content.footer.copyright}
      />
    </>
  );
}
