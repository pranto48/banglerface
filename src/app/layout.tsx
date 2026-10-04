import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategories } from '@/lib/api';

export const metadata: Metadata = {
  title: 'বাংলার ফেস - সর্বশেষ সংবাদ, বাংলাদেশ ও বিশ্ব',
  description: 'বাংলার ফেস - বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ, রাজনীতি, খেলাধুলা, বিনোদন ও আরও অনেক কিছু নিয়ে বাংলা সংবাদ পোর্টাল। নির্ভরযোগ্য খবর বিশ্বস্ত মাধ্যম।',
  keywords: ['বাংলা নিউজ', 'বাংলাদেশ', 'সংবাদ', 'রাজনীতি', 'খেলা', 'বিনোদন', 'BanglarFace'],
  openGraph: {
    title: 'বাংলার ফেস - সর্বশেষ সংবাদ, বাংলাদেশ ও বিশ্ব',
    description: 'নির্ভরযোগ্য খবর বিশ্বস্ত মাধ্যম - বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ',
    url: 'https://banglarface.com',
    siteName: 'বাংলার ফেস',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://banglarface.com/uploads/settings/favicon_1786447720_6a7b0768ee439.png" />
      </head>
      <body>
        <Header categories={categories} />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
