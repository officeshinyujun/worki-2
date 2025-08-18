import { VStack } from "../VStack";
import s from "./style.module.scss"

interface ProductBoxProps {
    backgroundImage: string;
    name: string;
    description: string;
}

export default function ProductBox({ backgroundImage, name, description }: ProductBoxProps) {
    return (
        <VStack style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } as React.CSSProperties}
        className={s.container}
        align="flex-start"
        justify="flex-start"
        gap={16}
        >
            <p className={s.name}>{name}</p>
            <p className={s.description}>{description}</p>
        </VStack>
    );
}