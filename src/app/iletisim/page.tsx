'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { FiMapPin, FiPhone, FiMail, FiClock, FiInstagram } from "react-icons/fi";

export default function IletisimPage() {
  const content = useContent();
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

      <main className="min-h-screen bg-[#faf9f7] pt-[170px] lg:pt-[190px]">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-[#2f3237] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/50" />
          <div className="relative z-10 text-center px-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wide">
              İletişim
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Sizinle tanışmak için sabırsızlanıyoruz
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              
              {/* Contact Info */}
              <div className="space-y-10">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#2f3237] mb-6">
                    Bize Ulaşın
                  </h2>
                  <p className="text-[#6b7280] text-lg leading-relaxed mb-8">
                    Han Kuyumculuk olarak, size en iyi hizmeti sunmak için buradayız. 
                    Sorularınız, önerileriniz veya özel tasarım talepleriniz için 
                    bizimle iletişime geçebilirsiniz.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#2f3237] flex items-center justify-center shrink-0 group-hover:bg-[#d4af37] transition-colors duration-300">
                      <FiMapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">Adres</h3>
                      <p className="text-[#6b7280] leading-relaxed">
                        Liman Mahallesi, Akdeniz Bulvarı<br />
                        No: 257 Fenix Center<br />
                        Konyaaltı/Antalya
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#2f3237] flex items-center justify-center shrink-0 group-hover:bg-[#d4af37] transition-colors duration-300">
                      <FiPhone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">Telefon</h3>
                      <a 
                        href="tel:+902422123456" 
                        className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
                      >
                        +90 (242) 212 34 56
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#2f3237] flex items-center justify-center shrink-0 group-hover:bg-[#d4af37] transition-colors duration-300">
                      <FiMail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">E-posta</h3>
                      <a 
                        href="mailto:info@hankuyumculuk.com" 
                        className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
                      >
                        info@hankuyumculuk.com
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#2f3237] flex items-center justify-center shrink-0 group-hover:bg-[#d4af37] transition-colors duration-300">
                      <FiClock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">Çalışma Saatleri</h3>
                      <p className="text-[#6b7280]">
                        Haftanın Her Günü: 10:00 - 20:00
                      </p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#2f3237] flex items-center justify-center shrink-0 group-hover:bg-[#d4af37] transition-colors duration-300">
                      <FiInstagram className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">Instagram</h3>
                      <div className="flex flex-col gap-1">
                        <a 
                          href="https://www.instagram.com/gozumunnuruantalya" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
                        >
                          @gozumunnuru.antalyaantalya
                        </a>
                        <a 
                          href="https://www.instagram.com/hankuyumculuk_" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
                        >
                          @hankuyumculuk_
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <a
                    href="/randevu"
                    className="inline-block px-8 py-4 bg-[#2f3237] text-white text-sm tracking-wider hover:bg-[#d4af37] transition-colors duration-300"
                  >
                    RANDEVU ALIN
                  </a>
                </div>
              </div>

              {/* Map Section */}
              <div className="space-y-6">
                <div className="bg-white p-2 shadow-lg">
                  <div className="aspect-4/3 w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.8477013417514!2d30.602089575529437!3d36.84612336511002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39303a734f60f%3A0xe343a4fa77583d88!2sFenix%20Center%20AVM!5e0!3m2!1str!2str!4v1768831178229!5m2!1str!2str"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Han Kuyumculuk Konum"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                
                {/* Additional Info Card */}
                <div className="bg-white p-8 shadow-lg">
                  <h3 className="font-serif text-2xl text-[#2f3237] mb-4">
                    Özel Randevu
                  </h3>
                  <p className="text-[#6b7280] leading-relaxed mb-6">
                    Özel tasarım görüşmeleri ve kişiye özel alışveriş deneyimi için 
                    randevu alabilirsiniz. Size özel bir deneyim sunmak için 
                    sabırsızlanıyoruz.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    <span>Ücretsiz danışmanlık</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#6b7280] mt-2">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    <span>Kişiye özel hizmet</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#6b7280] mt-2">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    <span>Özel tasarım imkanı</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Width Map for Mobile */}
        <section className="lg:hidden">
          <div className="h-[300px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.8477013417514!2d30.602089575529437!3d36.84612336511002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39303a734f60f%3A0xe343a4fa77583d88!2sFenix%20Center%20AVM!5e0!3m2!1str!2str!4v1768831178229!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Han Kuyumculuk Konum Mobile"
              className="w-full h-full"
            />
          </div>
        </section>
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

