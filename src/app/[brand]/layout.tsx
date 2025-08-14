import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Define the params type
type Params = {
  brand: string;
};

type LayoutProps = {
  children: ReactNode;
  params: Params | Promise<Params>;
};

// Helper function to safely extract params
async function getParams(params: Params | Promise<Params>): Promise<Params> {
  return await Promise.resolve(params);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brand } = await getParams(params);
  return {
    title: `${brand.toUpperCase()} - Worki`,
    description: `View ${brand}'s portfolio on Worki`,
  };
}

export default async function BrandLayout({ children, params }: LayoutProps) {
  const { brand } = await getParams(params);
  
  return (
    <main className="brand-page">
      {children}
    </main>
  );
}
