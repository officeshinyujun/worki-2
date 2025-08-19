import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import type { BrandKey } from '@/types';
import BrandContent from '@/components/brand/BrandContent';

// Fix the data structure to handle the typo in the data
const normalizeProducts = (products: any[]) => {
  return products.map(product => ({
    ...product,
    introduction: product.introduction || product.intruduction || ''
  }));
};

type PageProps = {
  params: {
    brand: string;
  };
};

export default async function BrandPage({ params }: PageProps) {
  // Await the params if they're a Promise
  const resolvedParams = await params;
  const brandKey = resolvedParams.brand as BrandKey;
  const brandData = data[brandKey];

  if (!brandData) {
    notFound();
  }

  // Normalize the products data to handle the typo
  const normalizedProducts = normalizeProducts(brandData.products);

  return (
    <BrandContent 
      brandName={brandData.name}
      products={normalizedProducts}
    />
  );
}

export async function generateStaticParams() {
  return Object.keys(data).map(brand => ({
    brand,
  }));
}
