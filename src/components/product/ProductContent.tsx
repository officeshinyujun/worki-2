'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductContentProps {
  brand: {
    name: string;
  };
  product: {
    name: string;
    introduction?: string;
    photo: string[];
  };
  brandKey: string;
}

export default function ProductContent({ brand, product, brandKey }: ProductContentProps) {
  const router = useRouter();

  return (
    <div className="container">
      {/* 뒤로 가기 버튼 */}
      <button 
        onClick={() => router.back()}
        className="back-link"
      >
        ← {brand.name}으로 돌아가기
      </button>

      <h1>{product.name}</h1>
      <div className="product-content">
        <p>{product.introduction}</p>

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
