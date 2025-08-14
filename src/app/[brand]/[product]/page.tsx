import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import data from '@/data/data.json';
import type { BrandKey } from '@/types/index.d.ts';

interface PageParams {
  brand: BrandKey;
  product: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams?: Promise<SearchParams>;
}) {
  // ✅ 비동기 props 해제
  const { brand: brandKey, product: productId } = await params;

  const brand = data[brandKey];
  if (!brand) notFound();

  const productIndex = parseInt(productId, 10);
  const product = brand.products[productIndex];
  if (!product) notFound();

  return (
    <div className="container">
      {/* 뒤로 가기 링크 */}
      <Link href={`/${brandKey}`} className="back-link">
        ← {brand.name}으로 돌아가기
      </Link>

      <h1>{product.name}</h1>
      <div className="product-content">
        <p>{product.intruduction}</p>

        {/* 제품 이미지 목록 */}
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

export async function generateStaticParams(): Promise<PageParams[]> {
  return Object.entries(data).flatMap(([brand, brandData]) =>
    brandData.products.map((_, index) => ({
      brand: brand as BrandKey,
      product: index.toString(),
    }))
  );
}
