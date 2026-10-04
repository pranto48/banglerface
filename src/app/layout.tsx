import type { Metadata, Viewport } from 'next';
import { Hind_Siliguri, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { getCategories } from '@/lib/api';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-bangla',
});

const outfit = Outfit({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-latin',
});

export const viewport: Viewport = {
  themeColor: '#dc3545',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://banglarface.bdold.com'),
  title: {
    default: 'বাংলার ফেস - সর্বশেষ সংবাদ, বাংলাদেশ ও বিশ্ব',
    template: '%s | বাংলার ফেস',
  },
  description: 'বাংলার ফেস - বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ, রাজনীতি, খেলাধুলা, বিনোদন ও আরও অনেক কিছু নিয়ে বাংলা সংবাদ পোর্টাল। নির্ভরযোগ্য খবর বিশ্বস্ত মাধ্যম।',
  keywords: ['বাংলা নিউজ', 'বাংলাদেশ', 'সংবাদ', 'রাজনীতি', 'খেলা', 'বিনোদন', 'BanglarFace', 'banglarface.bdold.com'],
  alternates: {
    canonical: 'https://banglarface.bdold.com',
  },
  openGraph: {
    title: 'বাংলার ফেস - সর্বশেষ সংবাদ, বাংলাদেশ ও বিশ্ব',
    description: 'নির্ভরযোগ্য খবর বিশ্বস্ত মাধ্যম - বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ',
    url: 'https://banglarface.bdold.com',
    siteName: 'বাংলার ফেস',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: 'https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png',
        width: 1200,
        height: 630,
        alt: 'বাংলার ফেস',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="bn" data-theme="light" className={`${hindSiliguri.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://banglarface.com/uploads/settings/favicon_1786447720_6a7b0768ee439.png" />
        <link rel="preconnect" href="https://banglarface.com" />
        <link rel="dns-prefetch" href="https://banglarface.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('banglarface_theme');
                  if (saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header categories={categories} />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
