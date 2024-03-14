import TabBar from '@/components/TabBar';
import React from 'react';

interface TabLayoutProps {
  children: React.ReactNode;
}

export default function TabLayout({ children }: TabLayoutProps) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
