// src/app/[brand]/[product]/page.tsx
import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import type { BrandKey } from '@/types/index.d.ts';
import ProductContent from '@/components/product/ProductContent';
interface PageParams {
  brand: BrandKey;
  product: string;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { brand: brandKey, product: productId } = await params;
  const brand = data[brandKey];
  
  if (!brand) notFound();

  const productIndex = parseInt(productId, 10);
  const product = brand.products[productIndex];
  
  if (!product) notFound();

  // Handle the typo in the data
  const productWithTypo = product as any;
  const normalizedProduct = {
    ...product,
    introduction: productWithTypo.introduction || productWithTypo.intruduction || ''
  };

  return (
    <ProductContent
      brand={brand}
      product={normalizedProduct}
    />
    
  );
}

export async function generateStaticParams(): Promise<PageParams[]> {
  return Object.entries(data).flatMap(([brand, brandData]) =>
    brandData.products.map((_, index) => ({
      brand: brand as BrandKey,
      product: index.toString(),
    }))
  );
}