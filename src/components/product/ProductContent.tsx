'use client';

import { useRouter } from 'next/navigation';
import { VStack } from '../VStack';
import s from './style.module.scss';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ImageBox from './ImageBox';
import PhotoModal from './PhotoModal';
import Footer from '../Footer';
import CommentBox from '../CommentBox';
import useLanguage from '@/store/useLanguage';

interface Brand {
  name: string;
  link: string;
}

interface ProductContentProps {
  brand: Brand;
  product: {
    name: string | { ko: string; en: string };
    introduction: string | { ko: string; en: string };
    photo: string[];
  };
}

export default function ProductContent({ brand, product }: ProductContentProps) {
  const router = useRouter();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState('');
  const { language , setLanguage} = useLanguage();

  return (
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
          alt={product.name[language as keyof typeof product.name]} 
          className={s.thumbnail} 
          width={500} 
          height={300} 
        />
        <p className={s.name}>{product.name[language as keyof typeof product.name]}</p>
        <button onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')} style={{ cursor: 'pointer' }} className={s.changeLanguage}>change to {language === 'ko' ? 'English' : 'Korean'}</button>
        <p className={s.introduction}>{product.introduction[language as keyof typeof product.introduction]}</p>
      </VStack>
      <VStack justify='flex-start' align='flex-start' gap={16} style={{width: '100%'}}>
        <p className={s.photoTitle}>{language === 'ko' ? '사진' : 'Photos'}</p>
        <ImageBox
        photos={product.photo}
        onImageClick={(photo) => {setCurrentPhoto(photo); setIsPhotoModalOpen(true)}}
        />
      </VStack>
      <PhotoModal photo={currentPhoto} isPhotoModalOpen={isPhotoModalOpen} setIsPhotoModalOpen={setIsPhotoModalOpen}/>
      <CommentBox />
    </VStack>
    
  );
}