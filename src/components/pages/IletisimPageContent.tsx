'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";
import { useTranslation } from "@/i18n/useTranslation";
import { getLocalizedPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { FiMapPin, FiPhone, FiMail, FiClock, FiInstagram } from "react-icons/fi";

interface IletisimPageContentProps {
  locale: Locale;
}

export default function IletisimPageContent({ locale }: IletisimPageContentProps) {
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

      <main className="min-h-screen bg-[#faf9f7] pt-[170px] lg:pt-[190px]">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] bg-[#2f3237] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/50" />
          <div className="relative z-10 text-center px-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wide">
              {t('contact.title')}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light">
              {t('contact.subtitle')}
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
                    {t('contact.reachUs')}
                  </h2>
                  <p className="text-[#6b7280] text-lg leading-relaxed mb-8">
                    {t('contact.description')}
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
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">{t('contact.address')}</h3>
                      <p className="text-[#6b7280] leading-relaxed">
                        {t('contact.addressLine1')}<br />
                        {t('contact.addressLine2')}<br />
                        {t('contact.addressLine3')}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#2f3237] flex items-center justify-center shrink-0 group-hover:bg-[#d4af37] transition-colors duration-300">
                      <FiPhone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">{t('contact.phone')}</h3>
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
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">{t('contact.email')}</h3>
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
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">{t('contact.workingHours')}</h3>
                      <p className="text-[#6b7280]">
                        {t('contact.workingHoursValue')}
                      </p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#2f3237] flex items-center justify-center shrink-0 group-hover:bg-[#d4af37] transition-colors duration-300">
                      <FiInstagram className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2f3237] text-lg mb-1">{t('contact.instagram')}</h3>
                      <div className="flex flex-col gap-1">
                        <a
                          href="https://www.instagram.com/gozumunnuru.antalya"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6b7280] hover:text-[#d4af37] transition-colors"
                        >
                          @gozumunnuru.antalya
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
                    href={getLocalizedPath('appointment', locale)}
                    className="inline-block px-8 py-4 bg-[#2f3237] text-white text-sm tracking-wider hover:bg-[#d4af37] transition-colors duration-300"
                  >
                    {t('common.bookAppointment')}
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
                      title={t('contact.mapTitle')}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Additional Info Card */}
                <div className="bg-white p-8 shadow-lg">
                  <h3 className="font-serif text-2xl text-[#2f3237] mb-4">
                    {t('contact.specialAppointment')}
                  </h3>
                  <p className="text-[#6b7280] leading-relaxed mb-6">
                    {t('contact.specialAppointmentDesc')}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    <span>{t('contact.freeConsultation')}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#6b7280] mt-2">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    <span>{t('contact.personalService')}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#6b7280] mt-2">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    <span>{t('contact.customDesignOption')}</span>
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
              title={t('contact.mapTitleMobile')}
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
