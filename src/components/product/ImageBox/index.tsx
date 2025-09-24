// src/components/product/ImageBox/index.tsx
'use client';

import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import s from './style.module.scss';
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageSkeleton from "@/components/ImageSkeleton";

interface ImageBoxProps {
  photos: string[];
  onImageClick?: (photo: string, index: number) => void;
}

export default function ImageBox({ photos, onImageClick }: ImageBoxProps) {
  const [currentThisPhoto, setCurrentThisPhoto] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setCurrentImage(photos[currentThisPhoto]);
  }, [currentThisPhoto, photos]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handlePrev = () => {
    if (currentThisPhoto > 0) {
      setCurrentThisPhoto(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentThisPhoto < photos.length - 1) {
      setCurrentThisPhoto(prev => prev + 1);
    }
  };

  return (
    <VStack className={s.container} justify='flex-start' align='center' gap={12}>
      <div className={s.imageWrapper}>
        {isLoading && <ImageSkeleton />}
        <img 
          src={`/images${currentImage}`} 
          alt={`Photo ${currentThisPhoto + 1}`} 
          className={`${s.thumbnail} ${isLoading ? s.hidden : ''}`}
          onLoad={handleImageLoad}
          onClick={() => onImageClick?.(currentImage, currentThisPhoto)}
        />
      </div>
      <HStack align="center" justify="center" gap={8}>
        <ChevronLeft 
          size={28} 
          color={currentThisPhoto === 0 ? '#9E9E9E' : 'black'} 
          onClick={handlePrev}
          style={{ cursor: currentThisPhoto === 0 ? 'not-allowed' : 'pointer' }}
        />
        <p className={s.photoIndex}>{currentThisPhoto + 1}/{photos.length}</p>
        <ChevronRight 
          size={28} 
          color={currentThisPhoto === photos.length - 1 ? '#9E9E9E' : 'black'} 
          onClick={handleNext}
          style={{ cursor: currentThisPhoto === photos.length - 1 ? 'not-allowed' : 'pointer' }}
        />
      </HStack>
    </VStack>
  );
}