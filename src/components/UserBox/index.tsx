import Link from "next/link";
import { HStack } from "../HStack";
import { VStack } from "../VStack";
import s from "./style.module.scss"
import Tag from "./Tag";

interface UserBoxProps {
    backgroundImage: string;
    name: string;
    description: string;
    tags: string[];
    link: string;
}

export default function UserBox({ name, description, tags, backgroundImage, link }: UserBoxProps) {
    const fullImagePath = backgroundImage.startsWith('http') ? backgroundImage : `/images${backgroundImage}`;
    
    return (
        <Link href={link} className={s.linkWrapper}>
            <VStack 
                className={s.container}
                align="flex-start"
                justify="flex-start"
                gap={16}
                style={{
                    '--background-image': `url(${fullImagePath})`
                } as React.CSSProperties}
            >
                <p className={s.name}>{name}</p>
                <p className={s.description}>{description}</p>
                <HStack align="flex-start" justify="flex-start" gap={8} wrap="wrap">
                    {tags.map((tag, index) => (
                        <Tag key={index} tag={tag} />
                    ))}
                </HStack>
            </VStack>
        </Link>
    );
}