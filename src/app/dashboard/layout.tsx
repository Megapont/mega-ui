'use client';

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
    </AppLayout>
  );
};

export default Layout;
