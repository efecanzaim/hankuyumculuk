import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PreviewProvider } from "@/contexts/PreviewContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Han Kuyumculuk | Pırlanta & Mücevher",
  description: "Seninle güzelleşir her şey… Her pırlantada aşkın zarafetini taşır.",
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
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <PreviewProvider>
          {children}
        </PreviewProvider>
      </body>
    </html>
  );
}
