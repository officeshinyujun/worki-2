'use client';

import { useRouter } from 'next/navigation';
import { VStack } from '../VStack';
import s from './style.module.scss';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

interface Brand {
  name: string;
  link: string;
}

interface ProductContentProps {
  brand: Brand;
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
    <VStack className={s.container} justify='flex-start' align='flex-start' gap={16}>
    <div style={{ cursor: 'pointer' }}>
        <ChevronLeft 
        size={30}  // Using size instead of width/height
        color='black' 
        onClick={() => router.push(`/${brand.link}`)}
      />
    </div>
      <VStack justify='flex-start' align='flex-start' gap={12}>
        <Image 
          src={`/images${product.photo[0]}`} 
          alt={product.name} 
          className={s.thumbnail} 
          width={500} 
          height={300} 
        />
        <p className={s.name}>{product.name}</p>
        <p className={s.introduction}>{product.introduction}</p>
      </VStack>
    </VStack>
  );
}
