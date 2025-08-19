import { VStack } from "@/components/VStack";
import s from './style.module.scss';

export default function PhotoModal({ photo, isPhotoModalOpen, setIsPhotoModalOpen }: { photo: string; isPhotoModalOpen: boolean; setIsPhotoModalOpen: (value: boolean) => void }) {
    return (
        <VStack align="center" justify="center" className={s.container} style={{ display: isPhotoModalOpen ? 'flex' : 'none' }} gap={16}>
            <img src={`/images${photo}`} alt="?" className={s.image}/>
            <button onClick={() => setIsPhotoModalOpen(false)} style={{ cursor: 'pointer' }} className={s.closeButton}>Close</button>
        </VStack>
    );
}