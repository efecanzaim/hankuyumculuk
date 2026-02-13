"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import type { Locale } from "@/i18n/config";

interface BakimGarantiPageContentProps {
  locale: Locale;
}

export default function BakimGarantiPageContent({ locale }: BakimGarantiPageContentProps) {
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
          <h1 className="text-[32px] md:text-[50px] leading-[1.2] text-primary text-center mb-16" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
            {t('careWarranty.title')}
          </h1>

          {/* Section 1: Değerli Taş ve İnci */}
          <section className="mb-20">
            <h2 className="text-[24px] md:text-[32px] text-primary mb-8" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Değerli Taş ve İnci Mücevher
            </h2>

            <div className="space-y-8 text-[#2f3237] leading-relaxed">
              {/* 1. Günlük Kullanım */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  1. Günlük Kullanım ve Bakım Uyarıları
                </h3>
                <p className="mb-4">
                  Elmas, değerli taş ve inci içeren mücevherler; doğal yapıları ve montaj hassasiyetleri nedeniyle özenli kullanım gerektirir. Ürününüzün estetik görünümünü ve teknik bütünlüğünü korumak amacıyla aşağıdaki hususlara dikkat edilmesi önerilir:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ani ve değişken sıcaklık koşullarına maruz bırakılmamalıdır.</li>
                  <li>Kozmetik ürünler (parfüm, krem, saç spreyi vb.) ile doğrudan temasından kaçınılmalıdır.</li>
                  <li>Ultrasonik temizlik cihazları kullanılmamalıdır.</li>
                  <li>Spor, ağır fiziksel faaliyetler, deniz ve havuz kullanımı sırasında mücevherlerin çıkarılması tavsiye edilir.</li>
                  <li>Mücevherler, çizilmeyi ve darbe riskini önlemek amacıyla orijinal kutusu veya kesesi içinde, ayrı ayrı muhafaza edilmelidir.</li>
                </ul>
                <p className="mt-4 text-sm italic">
                  Bu bilgilendirme, 6502 sayılı Kanun kapsamında tüketicinin doğru ve açık şekilde bilgilendirilmesi amacıyla sunulmaktadır.
                </p>
              </div>

              {/* 2. Temizlik Talimatları */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  2. Temizlik Talimatları
                </h3>

                <h4 className="text-[16px] font-medium mb-2 text-primary/80">2.1. Değerli Taşlı Mücevherler</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Temizlik işlemi, yalnızca ürüne uygun bakım kitleri ve yumuşak kıllı fırçalar kullanılarak yapılmalıdır.</li>
                  <li>Taş yuvalarının arkası ve girintili bölgeler, nazik hareketlerle temizlenmelidir.</li>
                  <li>Temizlik sonrası mücevher durulanmalı ve uygun bir parlatma bezi ile kurulanmalıdır.</li>
                </ul>
                <p className="mb-4 bg-[#f5f5f5] p-4 rounded-lg">
                  <strong>Önemli Not:</strong> Hassas nitelikteki değerli taşlar, yalnızca hafif sabunlu su ve yumuşak bir fırça kullanılarak temizlenmelidir.
                </p>

                <h4 className="text-[16px] font-medium mb-2 text-primary/80">2.2. İnci Mücevherler</h4>
                <p>
                  İnciler organik ve hassas yapıya sahip olup, kimyasallara karşı son derece duyarlıdır. Sık kullanılan inci mücevherlerin yılda en az bir kez, tercihen yetkili servis tarafından temizlenmesi önerilir.
                </p>
              </div>

              {/* 3. Garanti Kapsamı */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  3. Garanti Kapsamı
                </h3>
                <p className="mb-4">
                  Mücevherler, teslim tarihinden itibaren, aşağıda belirtilen şartlar dâhilinde garanti kapsamındadır:
                </p>
                <div className="bg-[#f5f5f5] p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Garanti Kapsamına Giren Durumlar</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Üretimden kaynaklanan işçilik hataları</li>
                    <li>Taş yuvası montajında üretim kaynaklı kusurlar</li>
                    <li>Normal kullanım koşulları altında ortaya çıkan yapısal ayıplar</li>
                  </ul>
                </div>
              </div>

              {/* 4. Garanti Dışı */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  4. Garanti Kapsamı Dışında Kalan Haller
                </h3>
                <p className="mb-4">Aşağıda belirtilen durumlar garanti kapsamı dışında değerlendirilir:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kullanıcı hatası, darbe, düşme, çarpma veya ezilme sonucu oluşan hasarlar</li>
                  <li>Kozmetik ürünler, kimyasal maddeler veya ultrasonik temizlik nedeniyle meydana gelen hasarlar</li>
                  <li>Yetkisiz kişilerce yapılan onarım, bakım veya ölçü değişiklikleri</li>
                  <li>Normal kullanım sonucu oluşan çizikler, aşınmalar ve doğal yüzey değişimleri</li>
                  <li>Üretim hatasına dayanmayan taş düşmesi veya inci hasarları</li>
                </ul>
                <p className="mt-4 italic">
                  Bu durumlarda yapılacak işlemler, ücretli servis kapsamında değerlendirilir.
                </p>
              </div>

              {/* 5. Tüketici Hakları */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  5. Tüketici Hakları
                </h3>
                <p className="mb-4">
                  6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, garanti kapsamına giren bir ayıp hâlinde tüketici;
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ürünün ücretsiz onarılmasını,</li>
                  <li>Ayıp oranında bedel indirimi yapılmasını,</li>
                  <li>Ürünün ayıpsız misli ile değiştirilmesini,</li>
                  <li>Sözleşmeden dönerek bedel iadesini</li>
                </ul>
                <p className="mt-2">talep etme haklarına sahiptir.</p>
              </div>

              {/* 6. Başvuru */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  6. Başvuru ve Servis Süreci
                </h3>
                <p>
                  Garanti, bakım veya onarım taleplerinin değerlendirilebilmesi için ürünün; satın alma belgesi, garanti belgesi ve varsa sertifikası ile birlikte yetkili satış noktasına veya müşteri hizmetlerine ibraz edilmesi gerekmektedir.
                </p>
                <div className="mt-4 bg-primary/10 p-4 rounded-lg">
                  <p className="font-medium">
                    <strong>Önemli Hukuki Uyarı:</strong> Bu metin, ürünün bakım ve garanti koşullarına ilişkin bilgilendirme amacıyla hazırlanmıştır. Tüketicinin kanundan doğan zorunlu haklarını sınırlamaz veya ortadan kaldırmaz.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-primary/20 my-16" />

          {/* Section 2: Altın ve Platin */}
          <section className="mb-20">
            <h2 className="text-[24px] md:text-[32px] text-primary mb-8" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Altın ve Platin Mücevher
            </h2>

            <div className="space-y-8 text-[#2f3237] leading-relaxed">
              {/* 1. Ürün Bakımı */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  1. Ürün Bakımına İlişkin Bilgilendirme
                </h3>
                <p className="mb-4">
                  Altın ve platin mücevherler; doğal özellikleri, el işçiliği ve değerli taş içermeleri sebebiyle hassas ürünlerdir. Ürününüzün ilk günkü parlaklığını ve formunu koruyabilmesi için aşağıdaki hususlara dikkat edilmesi önerilir:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ev tipi temizlik ürünleri, çamaşır suyu, kimyasal çözücüler ve parfüm gibi maddelerle doğrudan temasından kaçınılmalıdır.</li>
                  <li>Spor yaparken, ağır fiziksel faaliyetlerde, deniz ve havuz kullanımında mücevherlerin çıkarılması tavsiye edilir.</li>
                  <li>Mücevherlerin çizilmesini ve deformasyonunu önlemek amacıyla, orijinal mücevher kesesi veya kutusu içerisinde, ayrı ayrı saklanması önerilir.</li>
                </ul>
                <p className="mt-4 text-sm italic">
                  Bu bilgilendirme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında tüketicinin doğru bilgilendirilmesi amacıyla sunulmaktadır.
                </p>
              </div>

              {/* 2. Temizlik */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  2. Temizlik ve Periyodik Bakım
                </h3>
                <p className="mb-4">
                  Altın ve platin mücevherlerin temizliği, yalnızca ürüne uygun parlatma ürünleri ve yumuşak kıllı fırçalar kullanılarak yapılmalıdır.
                </p>
                <p className="mb-4">
                  Yetkisiz kişiler veya uygun olmayan yöntemlerle yapılan temizlik işlemleri, ürünün yüzeyinde aşınmaya, taş yuvalarında gevşemeye ve kalıcı hasara neden olabilir.
                </p>
                <p className="bg-[#f5f5f5] p-4 rounded-lg">
                  Şirketimiz, talep edilmesi hâlinde mücevherleriniz için profesyonel temizlik ve bakım hizmeti sunmaktadır.
                </p>
              </div>

              {/* 3. Garanti Kapsamı */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  3. Garanti Kapsamı
                </h3>
                <p className="mb-4">
                  Satın alınan altın ve platin mücevherler, teslim tarihinden itibaren aşağıda belirtilen şartlar çerçevesinde garanti kapsamındadır:
                </p>
                <div className="bg-[#f5f5f5] p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Garanti Kapsamına Giren Durumlar</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Üretimden kaynaklanan işçilik hataları</li>
                    <li>Taş yuvası montajında üretim kaynaklı sorunlar</li>
                    <li>Normal kullanım koşulları altında ortaya çıkan yapısal kusurlar</li>
                  </ul>
                </div>
              </div>

              {/* 4. Garanti Dışı */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  4. Garanti Kapsamı Dışında Kalan Durumlar
                </h3>
                <p className="mb-4">Aşağıda belirtilen durumlar garanti kapsamı dışındadır:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kullanıcı hatası, darbe, düşme, ezilme veya çarpma sonucu oluşan hasarlar</li>
                  <li>Kimyasal maddelere maruz kalma sonucu meydana gelen renk değişimleri veya yüzey aşınmaları</li>
                  <li>Yetkisiz üçüncü kişiler tarafından yapılan onarım, bakım veya ölçü değişiklikleri</li>
                  <li>Normal kullanım sonucu oluşan çizikler, aşınmalar ve doğal deformasyonlar</li>
                  <li>Taş düşmesi veya hasarının, üretim hatası dışında bir nedene dayanması</li>
                </ul>
                <p className="mt-4 italic">
                  Bu hallerde yapılacak işlemler, ücretli servis kapsamında değerlendirilir.
                </p>
              </div>

              {/* 5. Tüketici Hakları */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  5. Tüketici Hakları
                </h3>
                <p className="mb-4">
                  6502 sayılı Kanun uyarınca, garanti kapsamındaki bir ayıp durumunda tüketici;
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ürünün ücretsiz onarılmasını,</li>
                  <li>Ayıp oranında bedel indirimi,</li>
                  <li>Ürünün ayıpsız misli ile değiştirilmesini,</li>
                  <li>Sözleşmeden dönerek bedel iadesini</li>
                </ul>
                <p className="mt-2">talep etme haklarına sahiptir.</p>
              </div>

              {/* 6. Başvuru */}
              <div>
                <h3 className="text-[18px] md:text-[20px] font-semibold mb-4 text-primary">
                  6. Başvuru ve İletişim
                </h3>
                <p>
                  Garanti, bakım veya onarım talepleriniz için, ürünü satın alma belgesi ve varsa sertifikası ile birlikte yetkili satış noktamıza veya müşteri hizmetlerimize başvurmanız gerekmektedir.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-[#f5f5f5] p-8 rounded-lg text-center">
            <h3 className="text-[20px] font-semibold mb-4 text-primary">{t('contact.title')}</h3>
            <p className="text-[#2f3237]">
              Sorularınız için bize ulaşın:<br />
              <a href="mailto:info@hankuyumculuk.com" className="text-primary hover:underline">
                info@hankuyumculuk.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer
        logo={content.footer.logo}
        slogan={content.footer.slogan}
        description={content.footer.description}
        columns={content.footer.columns}
        copyright={content.footer.copyright}
        socialLinks={content.footer.socialLinks}
      />
    </>
  );
}
