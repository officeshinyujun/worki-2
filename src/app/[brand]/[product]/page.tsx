// src/app/[brand]/[product]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import data from '@/data/data.json';
import type { BrandKey } from '@/types/index.d.ts';

// Next.js App Router의 PageProps 타입 정의
interface Params {
  brand: BrandKey;
  product: string;
}

interface PageProps {
  params: Params;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ProductPage({ params }: PageProps) {
  const brand = data[params.brand];

  if (!brand) {
    notFound();
  }

  const productIndex = parseInt(params.product, 10);
  const product = brand.products[productIndex];

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

        {product.photo?.length > 0 && (
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
export async function generateStaticParams(): Promise<Params[]> {
  return Object.entries(data).flatMap(([brand, brandData]) =>
    brandData.products.map((_, index) => ({
      brand: brand as BrandKey,
      product: index.toString(),
    }))
  );
}
