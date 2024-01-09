import type { Metadata, Viewport } from 'next';

import Providers from '@app/providers';
import { Layout } from '@lib/layout';
import './globals.css';
import { lisbeth } from '@lib/common/helpers';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'mega DAO';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | mega DAO' },
  description: 'A DAO for the megapont community',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://dao.megapont.com',
    title: 'Mega DAO',
    description: 'A DAO for the megapont community',
    images: {
      url: '/MEGA_DA_OG.png',
      alt: 'mega DAO og-image',
    },
  },
  twitter: {
    creator: '@MegapontNFT',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={`${lisbeth.variable}`}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
