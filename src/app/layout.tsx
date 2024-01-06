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
    url: 'https://dao.magepont.com',
    title: 'nextarter-chakra',
    description: 'Next.js + chakra-ui + TypeScript template',
    images: {
      url: 'https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'nextarter-chakra.sznm.dev og-image',
    },
  },
  // twitter: {
  //   creator: '@sozonome',
  //   card: 'summary_large_image',
  // },
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
