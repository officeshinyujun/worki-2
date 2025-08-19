import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import type { BrandKey } from '@/types';
import BrandContent from '@/components/brand/BrandContent';

interface Product {
  name: string;
  introduction?: string;
  intruduction?: string;
  photo: string[];
}

// Fix the data structure to handle the typo in the data
const normalizeProducts = (products: Product[]) => {
  return products.map(product => ({
    ...product,
    introduction: product.introduction || product.intruduction || ''
  }));
};

export default async function BrandPage({ params }: any) {
  const resolvedParams = await params;
  const brandKey = resolvedParams.brand as BrandKey;
  const brandData = data[brandKey];

  if (!brandData) {
    notFound();
  }

  const normalizedProducts = normalizeProducts(brandData.products);

  return (
    <BrandContent 
      brandName={brandData.name}
      brandLink={brandData.link || brandKey}
      products={normalizedProducts}
    />
  );
}

export async function generateStaticParams() {
  return Object.keys(data).map(brand => ({
    brand,
  }));
}
