// Header/index.tsx
import { HStack } from "../HStack";
import logo from "../../../public/WORKI_logo.svg"; // 이미 import 되어 있음
import s from "./style.module.scss";
import Image from "next/image";

export default function Header() {
    return (
        <HStack className={s.container} align="center" justify="flex-start">
            <Image src={logo} alt="logo" width={73} height={19} /> {/* 수정된 부분 */}
        </HStack>
    );
}