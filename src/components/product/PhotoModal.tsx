'use client';

import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import s from './style.module.scss';

export interface PhotoModalProps {
  photo: string;
  isPhotoModalOpen: boolean;
  setIsPhotoModalOpen: (isOpen: boolean) => void;
  photos: string[];
  currentIndex?: number;
  onNavigate?: (newIndex: number) => void;
}

export default function PhotoModal(props: PhotoModalProps) {
  const { 
    photo, 
    isPhotoModalOpen, 
    setIsPhotoModalOpen, 
    photos = [], 
    currentIndex = 0, 
    onNavigate 
  } = props;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPhotoModalOpen) return;
      
      if (e.key === 'Escape') {
        setIsPhotoModalOpen(false);
      } else if (e.key === 'ArrowLeft' && onNavigate && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && onNavigate && currentIndex < photos.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPhotoModalOpen, currentIndex, photos.length, onNavigate, setIsPhotoModalOpen]);

  if (!isPhotoModalOpen) return null;

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  return (
    <div className={s.modalOverlay} onClick={() => setIsPhotoModalOpen(false)}>
      <button 
        className={s.closeButton}
        onClick={(e) => {
          e.stopPropagation();
          setIsPhotoModalOpen(false);
        }}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
      
      {onNavigate && photos.length > 1 && (
        <>
          {hasPrevious && (
            <button 
              className={`${s.navButton} ${s.leftButton}`}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(currentIndex - 1);
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={40} />
            </button>
          )}
          
          {hasNext && (
            <button 
              className={`${s.navButton} ${s.rightButton}`}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(currentIndex + 1);
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={40} />
            </button>
          )}
        </>
      )}
      
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <div className={s.imageContainer}>
          <Image
            src={`/images${photo}`}
            alt="Enlarged view"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
