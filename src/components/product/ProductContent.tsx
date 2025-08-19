'use client';

import { useRouter } from 'next/navigation';
import { VStack } from '../VStack';
import s from './style.module.scss';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ImageBox from './ImageBox';
import PhotoModal from './PhotoModal';

interface Brand {
  name: string;
  link: string;
}

interface ProductContentProps {
  brand: Brand;
  product: {
    name: string;
    introduction?: string;
    'en-introduction'?: string;
    photo: string[];
  };
  brandKey: string;
}

export default function ProductContent({ brand, product, brandKey }: ProductContentProps) {
  const router = useRouter();
  const [isEn, setIsEn] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState('');

  return (
    <>
    <VStack className={s.container} justify='flex-start' align='flex-start' gap={16}>
    <div style={{ cursor: 'pointer' }}>
        <ChevronLeft 
        size={30}  // Using size instead of width/height
        color='black' 
        onClick={() => router.push(`/${brand.link}`)}
      />
    </div>
      <VStack justify='flex-start' align='flex-start' gap={16}>
        <Image 
          src={`/images${product.photo[0]}`} 
          alt={product.name} 
          className={s.thumbnail} 
          width={500} 
          height={300} 
        />
        <p className={s.name}>{product.name}</p>
        <button onClick={() => setIsEn(!isEn)} style={{ cursor: 'pointer' }} className={s.changeLanguage}>change to {isEn ? 'Korean' : 'English'}</button>
        <p className={s.introduction}>{isEn ? product['en-introduction'] : product.introduction}</p>
      </VStack>
      <VStack justify='flex-start' align='flex-start' gap={16} style={{width: '100%'}}>
        <p className={s.photoTitle}>사진</p>
        <ImageBox
        photos={product.photo}
        onImageClick={(photo) => {setCurrentPhoto(photo); setIsPhotoModalOpen(true)}}
        />
      </VStack>
    </VStack>
     <PhotoModal photo={currentPhoto} isPhotoModalOpen={isPhotoModalOpen} setIsPhotoModalOpen={setIsPhotoModalOpen}/>
    </>
  );
}
