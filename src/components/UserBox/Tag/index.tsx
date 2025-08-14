import { VStack } from "@/components/VStack";
import s from "./style.module.scss"

export default function Tag({tag} : {tag : string}) {
    return (
       <VStack className={s.container} align="center" justify="center" gap={8}>
        <p className={s.name}># {tag}</p>
       </VStack>
    );
}