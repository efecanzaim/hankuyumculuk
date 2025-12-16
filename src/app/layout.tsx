import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Gözümün Nuru | Pırlanta & Mücevher",
  description: "Işıltının Anlama Dönüştüğü Yer. Her pırlantada aşkın zarafetini taşır.",
  keywords: "pırlanta, mücevher, altın, yüzük, kolye, bileklik, küpe, özel tasarım",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  return (
    <html lang="tr">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Buljirya';
              src: url('${basePath}/fonts/Buljirya.otf') format('opentype');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
