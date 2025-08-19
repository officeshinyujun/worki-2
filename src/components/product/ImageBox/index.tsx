'use client';

import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import s from './style.module.scss';
import { useState } from "react";   
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageBox({ photos, onImageClick }: { photos: string[]; onImageClick?: () => void }) {
    const [currentThisPhoto, setCurrentThisPhoto] = useState(0);
    
    return (
        <VStack className={s.container} justify='flex-start' align='center' gap={12}>
            <img 
                src={`/images${photos[currentThisPhoto]}`} 
                alt={photos[currentThisPhoto]} 
                className={s.thumbnail} 
                onClick={onImageClick}
            />      
            <HStack align="center" justify="center" gap={8}>
            <ChevronLeft 
                size={28} 
                color={currentThisPhoto === 0 ? '#9E9E9E' : 'black'} 
                onClick={currentThisPhoto === 0 ? undefined : () => setCurrentThisPhoto(currentThisPhoto - 1)}
                style={{ cursor: currentThisPhoto === 0 ? 'not-allowed' : 'pointer' }}
            />
            <p className={s.photoIndex}>{currentThisPhoto + 1}/{photos.length}</p>
            <ChevronRight 
                size={28} 
                color={currentThisPhoto === photos.length - 1 ? '#9E9E9E' : 'black'} 
                onClick={currentThisPhoto === photos.length - 1 ? undefined : () => setCurrentThisPhoto(currentThisPhoto + 1)}
                style={{ cursor: currentThisPhoto === photos.length - 1 ? 'not-allowed' : 'pointer' }}
            />
            </HStack>
        </VStack>
    );
}   