import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import type { BrandKey } from '@/types';
import BrandContent from '@/components/brand/BrandContent';

interface Product {
  name: {
    ko: string;
    en: string;
  };
  introduction: {
    ko: string;
    en: string;
  };
  photo: string[];
}

interface BrandData {
  name: string;
  link: string;
  description: {
    ko: string;
    en: string;
  };
  tags: {
    ko: string[];
    en: string[];
  };
  products: Product[];
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const brandKey = params.brand as BrandKey;
  const brandData = data[brandKey] as BrandData | undefined;

  if (!brandData) {
    notFound();
  }

  return (
    <BrandContent 
      brandName={brandData.name}
      //@ts-ignore
      brandDescription={brandData.description}
      brandTags={brandData.tags}
      brandLink={brandData.link}
      products={brandData.products}
    />
  );
}

export function generateStaticParams() {
  return Object.keys(data).map((brand) => ({
    brand,
  }));
}