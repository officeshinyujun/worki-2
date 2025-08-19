'use client';

import { useEffect } from 'react';
import { VStack } from '../VStack';
import { HStack } from '../HStack';
import { ChevronLeft } from 'lucide-react';
import ProductBox from '../ProductBox';
import s from '../../app/[brand]/style.module.scss';

type BrandContentProps = {
  brandName: string;
  products: Array<{
    name: string;
    intruduction?: string; // Handle typo in the data
    photo: string[];
  }>;
};

export default function BrandContent({ brandName, products }: BrandContentProps) {

    
  const handleBack = () => {
    window.history.back();
  };
  useEffect(() => {
    console.log('Products loaded:', products);
    // 여기에 필요한 클라이언트 사이드 로직 추가
  }, [products]);

  return (
    <div className={s.container}>
      <VStack className={s.contentsContainer} gap={16}>
        <div onClick={handleBack} style={{ cursor: 'pointer' }}>
          <HStack gap={8} align='center' justify='flex-start'>
            <ChevronLeft size={30} color='black' />
            <p>{brandName}</p>
          </HStack>
        </div>
        <VStack gap={16} align='flex-start' justify='flex-start'>
          {products.map((product, index) => (
            <ProductBox
              key={index}
              name={product.name}
              description={product.intruduction || ''}
              backgroundImage={product.photo?.[0] || ''}
            />
          ))}
        </VStack>
      </VStack>
    </div>
  );
}
