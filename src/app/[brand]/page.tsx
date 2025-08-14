import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import Link from 'next/link';
import type { BrandKey } from '@/types';

type PageProps = {
  params: Promise<{
    brand: string;
  }>;
};

export default async function BrandPage({ params }: PageProps) {
  const { brand } = await params;
  const brandKey = brand as BrandKey;
  const brandData = data[brandKey];

  if (!brandData) {
    notFound();
  }

  return (
    <div className="container">
      <h1>{brandData.name}</h1>
      <p>{brandData.description}</p>
      
      <div className="tags">
        {brandData.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>

      <h2>작품 목록</h2>
      <div className="products">
        {brandData.products.map((product, index) => (
          <Link 
            href={`/${brandKey}/${index}`} 
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
    brand,
  }));
}