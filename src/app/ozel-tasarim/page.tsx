"use client";

import CustomDesignPage from "@/components/CustomDesignPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

export default function OzelTasarimPage() {
  const content = useContent();

  return (
    <>
      <Header
        logo={content.header.logo}
        logoAlt={content.header.logoAlt}
        mainNav={content.header.mainNav}
        isTransparent={true}
        bannerText={content.topBanner?.text}
        bannerVisible={content.topBanner?.visible}
      />
      <CustomDesignPage />
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
