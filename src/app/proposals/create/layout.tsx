'use client';

import { AppLayout } from '@lib/layout/AppLayout';

type RootLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: RootLayoutProps) => {
  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
