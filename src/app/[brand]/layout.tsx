import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  params: {
    brand: string;
  };
};

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  return {
    title: `${params.brand.toUpperCase()} - Worki`,
    description: `View ${params.brand}'s portfolio on Worki`,
  };
}

export default function BrandLayout({ children }: LayoutProps) {
  return (
    <main className="brand-page">
      {children}
    </main>
  );
}
