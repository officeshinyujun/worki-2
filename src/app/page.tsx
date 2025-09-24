'use client';

import { VStack } from "@/components/VStack";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserBox from "@/components/UserBox";
import data from "@/data/data.json";
import useLanguage from "@/store/useLanguage";
import s from "./page.module.scss";
import { HStack } from "@/components/HStack";

export default function Home() {
    const { language } = useLanguage();

    return (
    <VStack className={s.container} align="center" justify="flex-start">
        <Header />
        <img src="/images/background.png" alt="worki" className ={s.backgroundImage} />
        <VStack gap={24} align="center" justify="center" className={s.welcomeContainer}>
            <p className={s.welcomeTitle}>welcome to WORKI!</p>
            <p className={s.welcomeDescription}>WORKI는 자신의 창작물을 자유롭게 올리고, 댓글을 달 수 있는 사이트입니다.</p>
            <img src="/images/mockup.png" alt="worki" />
        </VStack>
        <VStack gap={12} align="flex-start" justify="flex-start" className={s.productContainer}>
            <p className={s.title}>작품들을 클릭하여 자유롭게 감상해보세요!</p>
            <HStack gap={16} align="flex-start" justify="flex-start" className={s.userBoxContainer} wrap="nowrap">
                <UserBox name={data.haed.name} description={data.haed.description[language]} tags={data.haed.tags[language]} backgroundImage={data.haed.products[0].photo[0]} link="/haed" />
                <UserBox name={data.jae.name} description={data.jae.description[language]} tags={data.jae.tags[language]} backgroundImage={data.jae.products[0].photo[0]} link="/jae" />
                <UserBox name={data.wxv.name} description={data.wxv.description[language]} tags={data.wxv.tags[language]} backgroundImage={data.wxv.products[0].photo[0]} link="/wxv" />
                <UserBox name={data.hajun.name} description={data.hajun.description[language]} tags={data.hajun.tags[language]} backgroundImage={data.hajun.products[0].photo[0]} link="/hajun" />
                <UserBox name={data.mang.name} description={data.mang.description[language]} tags={data.mang.tags[language]} backgroundImage={data.mang.products[0].photo[0]} link="/mang" />
                <UserBox name={data.hottuck.name} description={data.hottuck.description[language]} tags={data.hottuck.tags[language]} backgroundImage={data.hottuck.products[0].photo[0]} link="/hottuck" />
            </HStack>   
        </VStack>
        <Footer />
    </VStack>
    );
}