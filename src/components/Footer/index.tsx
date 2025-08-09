import { HStack } from "../HStack";
import { VStack } from "../VStack";
import s from './style.module.scss'
import { Github } from "lucide-react";

export default function Footer() {
    return (
        <VStack className={s.container} align="flex-start" justify="flex-start" gap={16}>
            <HStack align="center" justify="flex-start" gap={8}>
                <p>@made by shinyujun</p>
                <Github width={22} height={22} color="white" />
            </HStack>
        </VStack>
    );
}