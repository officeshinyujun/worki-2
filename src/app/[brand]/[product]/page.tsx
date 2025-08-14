// src/app/[brand]/[product]/page.tsx
import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import Link from 'next/link';
import Image from 'next/image';

// 타입 가져오기
import type { BrandKey } from '@/types/index.d.ts';

// 페이지 컴포넌트 props 타입
type ProductPageProps = {
  params: {
    brand: BrandKey;
    product: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const brand = data[params.brand];
  
  if (!brand) {
    notFound();
  }

  const product = brand.products[parseInt(params.product)];
  
  if (!product) {
    notFound();
  }

  return (
    <div className="container">
      <Link href={`/${params.brand}`} className="back-link">
        ← {brand.name}으로 돌아가기
      </Link>
      
      <h1>{product.name}</h1>
      <div className="product-content">
        <p>{product.intruduction}</p>
        
        {product.photo && (
          <div className="product-images">
            {product.photo.map((image, index) => (
              <div key={index} className="product-image-container">
                <Image 
                  src={`/images${image}`}
                  alt={`${product.name} - 이미지 ${index + 1}`}
                  width={500}
                  height={300}
                  className="product-image"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 정적 생성 경로
export async function generateStaticParams() {
  return Object.entries(data).flatMap(([brand, brandData]) => 
    brandData.products.map((_, index) => ({
      brand: brand as BrandKey,
      product: index.toString(),
    }))
  );
}