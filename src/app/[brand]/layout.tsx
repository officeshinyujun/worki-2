import type { Metadata } from 'next';
import type { BrandKey } from '@/types';

type LayoutProps = {
  children: React.ReactNode;
  params: {
    brand: string;
  };
};

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand } = await params;
  return {
    title: `${brand.toUpperCase()} - Worki`,
    description: `View ${brand}'s portfolio on Worki`,
  };
}

export default function BrandLayout({ children, params }: LayoutProps) {
  return (
    <main className="brand-page">
      {children}
    </main>
  );
}
