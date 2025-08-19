import { VStack } from '@/components/VStack';
import s from './style.module.scss';
import { HStack } from '@/components/HStack';

interface CommentProps {
    comment : string;
    nickname : string;
    image : string;
}

export default function Comment({comment, nickname, image} : CommentProps) {
    return (
        <VStack align="flex-start" justify="flex-start" gap={8} className={s.container}>
            <HStack align='flex-start' justify='center' gap={8}>
                <img src={image} alt={nickname} className={s.image} />
                <p className={s.nickname}>{nickname}</p>
            </HStack>
            <HStack align='flex-start' justify='center' gap={8}>
                <div className={s.spacer}/>
                <p className={s.comment}>{comment}</p>
            </HStack>
        </VStack>
    );
}