import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import Link from 'next/link';
import type { BrandKey } from '@/types';
import { VStack } from '@/components/VStack';
import s from './style.module.scss';
import { HStack } from '@/components/HStack';
import { ChevronLeft } from 'lucide-react';

type PageProps = {  
  params: Promise<{
    brand: string;
  }>;
};

export default async function BrandLayout({ params }: PageProps) {
  const { brand } = await params; // ✅ 비동기 해제
  const brandKey = brand as BrandKey;
  const brandData = data[brandKey];

  if (!brandData) {
    notFound();
  }

  return (
    // <div className="container">
    //   <h1>{brandData.name}</h1>
    //   <p>{brandData.description}</p>
      
    //   <div className="tags">
    //     {brandData.tags.map((tag, index) => (
    //       <span key={index} className="tag">{tag}</span>
    //     ))}
    //   </div>

    //   <h2>작품 목록</h2>
    //   <div className="products">
    //     {brandData.products.map((product, index) => (
    //       <Link 
    //         href={`/${brandKey}/${index}`} 
    //         key={index} 
    //         className="product-card"
    //       >
    //         <h3>{product.name}</h3>
    //         <p>{product.intruduction.substring(0, 100)}...</p>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    <div className={s.container}>
      <VStack className={s.contentsContainer} gap={16}>
        <HStack gap={8} align='center' justify='flex-start'>
          <ChevronLeft size={30} color='black' />
          <p>{brandData.name}</p>
        </HStack>
        <VStack gap={16} align='flex-start' justify='flex-start'>
          
        </VStack>
      </VStack>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(data).map(brand => ({
    brand,
  }));
}
