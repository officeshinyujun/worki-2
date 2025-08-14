import s from "@/app/page.module.scss"
import { VStack } from "@/components/VStack";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserBox from "@/components/UserBox";
import data from "@/data/data.json";
export default function Home() {
    return (
    <VStack className={s.container} align="center" justify="space-between">
        <Header />
        <VStack gap={16} align="flex-start" justify="flex-start" className={s.userBoxContainer}>
            <UserBox name={data.haed.name} description={data.haed.description} tags={data.haed.tags} backgroundImage={data.haed.products[0].photo[0]} link="/haed" />
            <UserBox name={data.jae.name} description={data.jae.description} tags={data.jae.tags} backgroundImage={data.jae.products[0].photo[0]} link="/jae" />
            <UserBox name={data.wxv.name} description={data.wxv.description} tags={data.wxv.tags} backgroundImage={data.wxv.products[0].photo[0]} link="/wxv" />
        </VStack>
        <Footer />
    </VStack>
    );
}