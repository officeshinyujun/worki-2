
'use client'
import { VStack } from "../VStack";
import s from "./style.module.scss"

interface ProductBoxProps {
    backgroundImage: string;
    name: string;
    description: string;
}

export default function ProductBox({ backgroundImage, name, description }: ProductBoxProps) {
    const fullImagePath = backgroundImage.startsWith('http') ? backgroundImage : `/images${backgroundImage}`;
    
    return (
        <VStack 
            className={s.container}
            style={{ '--background-image': `url(${fullImagePath})` } as React.CSSProperties}
            align="flex-start"
            justify="flex-start"
            gap={8}
        >
            <p className={s.name}>{name}</p>
            <p className={s.description}>{description.substring(0, 20)}...</p>
        </VStack>
    );
}