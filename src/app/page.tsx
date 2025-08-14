import s from "@/app/page.module.scss"
import { VStack } from "@/components/VStack";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Home() {
    return (
    <VStack className={s.container} align="center" justify="space-between">
        <Header />
        <VStack>
            
        </VStack>
        <Footer />
    </VStack>
    );
}