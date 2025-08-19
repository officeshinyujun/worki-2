'use client';

import { VStack } from "@/components/VStack";
import s from './style.module.scss';
import Comment from './Comment';
import { HStack } from "../HStack";
import { ArrowUpFromLine } from "lucide-react";
import comment from '@/data/coment.json';
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";  // 추가

export default function CommentBox() {
    const [fakerImage, setFakerImage] = useState('');  // 상태로 관리

    // 클라이언트 사이드에서만 실행되도록 useEffect 사용
    useEffect(() => {
        setFakerImage(faker.image.avatar());
    }, []);

    return (
        <VStack align="flex-start" justify="flex-start" gap={16} className={s.container}>
            <p className={s.title}>댓글</p>
            {comment.comments.map((comment, index) => (
                <Comment
                    key={index}
                    comment={comment.comment}
                    nickname={comment.nickname}
                    image={comment.image}
                />
            ))}
            <HStack align="center" justify="center" gap={12} style={{width: '100%'}}>
                {fakerImage && (  // 이미지가 로드된 경우에만 렌더링
                    <img 
                        src={fakerImage} 
                        alt="사용자 프로필" 
                        className={s.image}
                    />
                )}
                <input 
                    type="text" 
                    className={s.nameInput} 
                    placeholder="남길 이름을 입력하십시오..."
                />
            </HStack>
            <HStack align="center" justify="center" gap={12} style={{width: '100%'}}>
            <div style={{ width: '30px', flexShrink: 0 }} />                <input 
                    type="text" 
                    placeholder="댓글을 입력하세요..." 
                    className={s.commentInput}
                />
                <button className={s.commentButton}>
                    <ArrowUpFromLine size={24} color="white" />
                </button>
            </HStack>
        </VStack>
    );
}