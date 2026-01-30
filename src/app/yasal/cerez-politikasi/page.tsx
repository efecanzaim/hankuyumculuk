"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/hooks/useContent";

export default function CerezPolitikasiPage() {
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

      <main className="min-h-screen bg-white pt-[210px] pb-20">
        <div className="max-w-[900px] mx-auto px-6 md:px-8">
          {/* Page Title */}
          <h1 className="text-[32px] md:text-[50px] leading-[1.2] text-primary text-center mb-12" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
            Çerez Politikası
          </h1>
          
          {/* Content */}
          <div className="prose prose-lg max-w-none text-[#2f3237]">
            
            {/* Section */}
            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Han Kuyumculuk Çerez Politikası
            </h2>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Han Kuyumculuk … ("Han" veya "Şirket" ya da "biz", "bize", "bizim") olarak çerezler kullanmaktayız. Çerezler, internet sitemiz üzerinden bilgi topladığımız ve bazı durumlarda internet sitemizi kullanımınıza ilişkin bilgileri takip edebildiğimiz otomatik araçlardır. Çerezleri; kullanıcı deneyiminizi, internet sitemizin işlevselliğini ve size sunduğumuz hizmetleri optimize etmek amacıyla kullanıyoruz.
            </p>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              İnternet sitemizi ziyaret ettiğinizde, web sunucumuz bilgisayarınıza bir çerez gönderir. Bu çerez sayesinde bilgisayarınızı tanıyabilir ve çeşitli işlevleri yerine getirebiliriz.
            </p>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Bu sayfanın ötesine geçerek internet sitemizi kullanmaya devam etmeniz halinde, bu Çerez Politikası'nı ve Gizlilik Bildirimi'ni okuduğunuzu ve anladığınızı kabul etmiş sayılırsınız. Çerezleri çerez yönetim aracı ve/veya tarayıcı ayarlarınızı değiştirerek sınırlandırabileceğinizi hatırlatmak isteriz. Ancak bu tür kısıtlamaların, internet sitemizin işlevselliğini ve kullanıcı deneyiminizi olumsuz etkileyebileceğini lütfen unutmayınız.
            </p>
            
            {/* Section */}
            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Çerezler hangi amaçlarla kullanılır?
            </h2>
            
            {/* Subsection 1 */}
            <h3 className="text-[20px] md:text-[24px] text-[#2f3237] mt-8 mb-4 font-medium">
              1. Çerezler İnternet Sitesinin Temel İşlevlerini Destekler
            </h3>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Bazı çerezler, internet sitemizin temel işlevlerinin çalışabilmesi için gerekli olan zorunlu ve işlevsel çerezlerdir. Örneğin, alışveriş yapmaya devam ederken ve internet sitemizin farklı sayfaları arasında gezinirken sepetinizdeki ürünlerin saklanmasını sağlar.
            </p>
            
            {/* Subsection 2 */}
            <h3 className="text-[20px] md:text-[24px] text-[#2f3237] mt-8 mb-4 font-medium">
              2. Çerezler İnternet Sitemizin ve Hizmetlerimizin Kalitesini Artırmaya Yardımcı Olur
            </h3>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Çerezler (bazı durumlarda IP adresi dâhil olmak üzere) internet sitemizi nasıl kullandığınıza ilişkin bilgiler toplar. Bu sayede internet sitemizin gezilebilirliğini değerlendirebilir ve size daha iyi hizmet sunabiliriz. Bu bilgileri aşağıdaki amaçlarla kullanırız:
            </p>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li className="text-[16px] md:text-[18px] leading-[1.8]">İnternet sitemizin kullanımına ilişkin toplu ve anonim istatistikler sağlamak,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Reklamlarımızın etkinliğini ölçmek; hangi bağlantılara tıkladığınızı ve hangi internet sitesinden geldiğinizi tespit etmek,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Ziyaretçilerimizden birinin aynı zamanda iş birliği yaptığımız üçüncü tarafların internet sitesini de ziyaret ettiğine dair geri bildirim sağlamak,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Tarama deneyiminiz sırasında oluşan hataları tespit ederek internet sitemizi geliştirmek,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Daha gelişmiş site işlevleri sunmak, ek hizmetlere erişim sağlamak veya daha sonraki bir ziyaretinizde alışveriş sepetinizi geri yüklemek.</li>
            </ul>
            
            {/* Subsection 3 */}
            <h3 className="text-[20px] md:text-[24px] text-[#2f3237] mt-8 mb-4 font-medium">
              3. Çerezler Bilgileri Seçili Üçüncü Taraf İş Ortaklarımızla Paylaşabilir
            </h3>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Üçüncü taraf çerezler, internet sitemizde sunulan hizmetleri sağlamak amacıyla iş ortaklarımızla bilgi paylaşabilir. Paylaşılan bilgiler yalnızca ilgili hizmet veya işlevin sağlanması amacıyla kullanılır (örneğin sosyal medya "beğen" ve "paylaş" butonları).
            </p>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Bazı üçüncü taraf çerezler, ilgi alanına dayalı hizmetler sunarak hem bu internet sitesinde hem de diğer bazı internet sitelerinde kişiselleştirilmiş bir kullanıcı deneyimi sağlamaya yardımcı olabilir (bkz. "İlgi Alanına Dayalı Reklamcılık"). Bu kişiselleştirilmiş deneyimler, internet sitemizi ziyaret ettiğinizin anlaşılmasını sağlayan üçüncü taraf hizmetleriyle ilişkilendirilebilir.
            </p>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Bu bilgiler, ilginizi çekebilecek Han Kuyumculuk ürün ve hizmetleri hakkında sizi bilgilendirmek amacıyla kullanılır. Ayrıca bu çerezler, Facebook gibi sosyal medya ağlarına bağlanabilir veya reklam ajanslarının ziyaretiniz hakkında bilgi edinmesini sağlayarak, ilginizi çekebilecek Han Kuyumculuk ürün ve hizmetlerine ilişkin reklamların size sunulmasına imkân tanıyabilir.
            </p>
            
            {/* Section */}
            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Çerezlerin Toplanma Yöntemi ve Hukuki Sebebi
            </h2>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Çerezler, internet sitemizi kullandığınızda elektronik ortamda otomatik yöntemlerle, aşağıdaki hukuki sebeplere dayanılarak toplanmaktadır:
            </p>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Meşru menfaatlerimiz için veri işlenmesinin zorunlu olması:</strong> Analitik Çerezler</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması kaydıyla:</strong> Zorunlu Çerezler; İşlevsel Çerezler</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]"><strong>Açık rızanıza dayanılarak:</strong> Reklam ve Sosyal Medya Çerezleri</li>
            </ul>
            
            {/* Section */}
            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Çerezler aracılığıyla toplanan verilerin aktarımı
            </h2>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Çerezler aracılığıyla toplanan veriler, dijital reklamcılık alanında faaliyet gösteren bazı hizmet sağlayıcılarımızın yurt dışında bulunması sebebiyle yurt dışına aktarılabilmektedir.
            </p>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              İş ortaklarımızdan, çerezler yoluyla toplanan bilgileri yalnızca kendilerinden talep edilen hizmetlerin sağlanması amacıyla kullanmalarını; yürürlükteki veri koruma mevzuatına uygun hareket etmelerini ve kendilerine aktarılan kişisel verilerin gizliliğine azami özen göstermelerini kesin olarak talep etmekteyiz. Daha fazla bilgi için iş ortaklarımızın kişisel verilerin korunmasına ilişkin politikalarını inceleyebilirsiniz.
            </p>
            
            {/* Section */}
            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Çerez tercihlerinizi yönetme
            </h2>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              İnternet sitemizde kullanılan üçüncü taraf çerezlerini yönetmek için aşağıda yer alan bağlantıları ziyaret edebilirsiniz:
            </p>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li className="text-[16px] md:text-[18px] leading-[1.8]">
                <strong>Google Analytics:</strong>{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://policies.google.com/privacy
                </a>
              </li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">
                <strong>Adobe Analytics:</strong>{" "}
                <a href="http://www.adobe.com/privacy/analytics.html#1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  http://www.adobe.com/privacy/analytics.html#1
                </a>
              </li>
            </ul>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              İnternet sitemizde kullanılan tüm çerezleri (Şirketimiz tarafından yerleştirilenler dâhil) yönetmek için çerez yönetim aracımızı ve/veya tarayıcı ayarlarınızı kullanabilirsiniz. Çerezlerin yönetimi hakkında daha fazla bilgi için{" "}
              <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                http://www.allaboutcookies.org/
              </a>{" "}
              adresini ziyaret edebilirsiniz.
            </p>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Tarayıcı ayarlarınızdan çerezleri devre dışı bırakmanız, engellemeniz veya silmeniz halinde internet sitemizin tüm işlevlerinden tam olarak yararlanamayabileceğinizi lütfen unutmayınız.
            </p>
            
            {/* Section */}
            <h2 className="text-[24px] md:text-[30px] text-primary mt-12 mb-6" style={{ fontFamily: 'var(--font-faculty-glyphic)' }}>
              Kişisel verileriniz ve haklarınız
            </h2>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Çerezler aracılığıyla toplanan bilgiler her zaman sizi tanımlayabilecek nitelikte olmayabilir. Kişisel verilerinizin işlenmesine ilişkin daha fazla bilgi için lütfen Gizlilik Bildirimi'ni inceleyiniz.
            </p>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 11. maddesi uyarınca, çerezler aracılığıyla işlenen kişisel verilerinize ilişkin olarak aşağıdaki haklara sahipsiniz:
            </p>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Kişisel verilerinizin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Kanun'un 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Kişisel verilerinizin düzeltilmesi, silinmesi veya yok edilmesi hâlinde bu işlemlerin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
              <li className="text-[16px] md:text-[18px] leading-[1.8]">Kişisel verilerinizin hukuka aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
            </ul>
            
            <p className="text-[16px] md:text-[18px] leading-[1.8] mb-6">
              Yukarıda belirtilen haklarınıza ilişkin taleplerinizi info@hankuyumculuk.com adresi üzerinden veya mevzuatta öngörülen diğer yöntemlerle Şirketimize iletebilirsiniz. Talepleriniz, niteliğine göre en kısa sürede ve her hâlükârda en geç 30 (otuz) gün içinde ücretsiz olarak sonuçlandırılacaktır. Ancak işlemin ayrıca bir maliyet gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifeye göre ücret talep edilebilecektir.
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

