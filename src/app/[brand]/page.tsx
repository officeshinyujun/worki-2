// src/app/[brand]/page.tsx
import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import Link from 'next/link';
import type { BrandKey } from '@/types';

type BrandPageProps = {
  params: {
    brand: BrandKey;
  };
};

export default function BrandPage({ params }: BrandPageProps) {
  const brand = data[params.brand];
  
  if (!brand) {
    notFound();
  }

  return (
    <div className="container">
      <h1>{brand.name}</h1>
      <p>{brand.description}</p>
      
      <div className="tags">
        {brand.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>

      <h2>작품 목록</h2>
      <div className="products">
        {brand.products.map((product, index) => (
          <Link 
            href={`/${params.brand}/${index}`} 
            key={index} 
            className="product-card"
          >
            <h3>{product.name}</h3>
            <p>{product.intruduction.substring(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(data).map(brand => ({
    brand: brand as BrandKey,
  }));
}