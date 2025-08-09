import s from "@/app/page.module.scss"
import { VStack } from "@/components/VStack";
import Header from "@/components/Header";

export default function Home() {
    return (
    <VStack className={s.container} align="center" justify="flex-start">
        <Header />
    </VStack>
    );
}