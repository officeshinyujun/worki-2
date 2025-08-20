'use client';

import s from "@/app/page.module.scss"
import { VStack } from "@/components/VStack";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserBox from "@/components/UserBox";
import data from "@/data/data.json";
import useLanguage from "@/store/useLanguage";


export default function Home() {

    const { language } = useLanguage();

    return (
    <VStack className={s.container} align="center" justify="flex-start">
        <Header />
        <VStack gap={16} align="flex-start" justify="flex-start" className={s.userBoxContainer}>
            <UserBox name={data.haed.name} description={data.haed.description[language]} tags={data.haed.tags[language]} backgroundImage={data.haed.products[0].photo[0]} link="/haed" />
            <UserBox name={data.jae.name} description={data.jae.description[language]} tags={data.jae.tags[language]} backgroundImage={data.jae.products[0].photo[0]} link="/jae" />
            <UserBox name={data.wxv.name} description={data.wxv.description[language]} tags={data.wxv.tags[language]} backgroundImage={data.wxv.products[0].photo[0]} link="/wxv" />
            <UserBox name={data.hajun.name} description={data.hajun.description[language]} tags={data.hajun.tags[language]} backgroundImage={data.hajun.products[0].photo[0]} link="/hajun" />
            <UserBox name={data.mang.name} description={data.mang.description[language]} tags={data.mang.tags[language]} backgroundImage={data.mang.products[0].photo[0]} link="/mang" />
        </VStack>
        <Footer />
    </VStack>
    );
}