
'use client';
import { HStack } from "../HStack";
import logo from "../../../public/WORKI_logo.svg"; // 이미 import 되어 있음
import s from "./style.module.scss";
import Image from "next/image";
import useLanguage from "@/store/useLanguage";

export default function Header() {
    const { language, setLanguage } = useLanguage();

    return (
        <HStack className={s.container} align="center" justify="space-between">
            <Image src={logo} alt="logo" width={73} height={19} /> 
            <button
            className={s.button}
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            >
                {language === 'ko' ? 'EN' : 'KO'}
            </button>
        </HStack>
    );
}