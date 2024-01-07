'use client';

import { AppFooter } from '@lib/components/AppFooter';
import { Header } from '@lib/components/Header';
import { AppLayout } from '@lib/layout/AppLayout';

type RootLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: RootLayoutProps) => {
  return (
    <AppLayout>
      <Header></Header>
      {children}
      <AppFooter></AppFooter>
    </AppLayout>
  );
};

export default Layout;
