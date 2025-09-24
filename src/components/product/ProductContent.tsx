'use client';

import { useRouter } from 'next/navigation';
import { VStack } from '@/components/VStack';
import s from './style.module.scss';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ImageBox from './ImageBox';
import PhotoModal from './PhotoModal';
import CommentBox from '@/components/CommentBox';
import useLanguage from '@/store/useLanguage';

interface Brand {
  name: string;
  link: string;
}

interface LocalizedText {
  ko: string;
  en: string;
}

interface ProductContentProps {
  brand: Brand;
  product: {
    name: string | LocalizedText;
    introduction: string | LocalizedText;
    photo: string[];
  };
}

export default function ProductContent({ brand, product }: ProductContentProps) {
  const router = useRouter();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  const handlePhotoClick = (photoUrl: string, index: number) => {
    setCurrentPhotoIndex(index);
    setIsPhotoModalOpen(true);
  };
  
  const handleNavigate = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < product.photo.length) {
      setCurrentPhotoIndex(newIndex);
    }
  };

  const { language , setLanguage } = useLanguage();

  return (
    <VStack className={s.container} justify='flex-start' align='center'>
      <div className={s.header}>
        <ChevronLeft 
          size={30}  
          color='black' 
          onClick={() => router.push(`/${brand.link}`)}
        />
      </div>

      <Image 
        src={`/images${product.photo[0]}`} 
        alt={typeof product.name === 'string' ? product.name : product.name[language]} 
        className={s.thumbnail} 
        width={500} 
        height={300} 
        priority
      />

      <VStack className={s.contentsContainer}>
        <VStack justify='flex-start' align='flex-start' gap={16} >
          <p className={s.name}>
            {typeof product.name === 'string' ? product.name : product.name[language]}
          </p>
          <button 
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')} 
            style={{ cursor: 'pointer' }} 
            className={s.changeLanguage}
          >
            change to {language === 'ko' ? 'English' : 'Korean'}
          </button>
          <p className={s.introduction}>
            {typeof product.introduction === 'string' 
              ? product.introduction 
              : product.introduction[language]}
          </p>
        </VStack>

        <VStack justify='flex-start' align='flex-start' gap={16} style={{ width: '100%' }}>
          <p className={s.photoTitle}>{language === 'ko' ? '사진' : 'Photos'}</p>
          <ImageBox
            photos={product.photo}
            onImageClick={handlePhotoClick}
          />
        </VStack>

        {isPhotoModalOpen && (
          <PhotoModal 
            photo={product.photo[currentPhotoIndex] ?? ''} 
            isPhotoModalOpen={isPhotoModalOpen} 
            setIsPhotoModalOpen={setIsPhotoModalOpen}
            photos={product.photo || []}
            currentIndex={currentPhotoIndex}
            onNavigate={handleNavigate}
          />
        )}

        <CommentBox />
      </VStack>
    </VStack>
  );
}
