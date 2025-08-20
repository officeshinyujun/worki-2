'use client';

import { VStack } from "@/components/VStack";
import s from './style.module.scss';
import Comment from './Comment';
import { HStack } from "../HStack";
import { ArrowUpFromLine } from "lucide-react";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";  // 추가
import { usePathname } from 'next/navigation';
import { commentRead, commentWrite } from '@/features/https';

interface Comment {
    _id: string;
    nickname: string;
    content: string;
    userImage: string;
    createdAt: string;
}

export default function CommentBox() {
    const [fakerImage, setFakerImage] = useState('');  // 상태로 관리
    const [comments, setComments] = useState<Comment[]>([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const pathname = usePathname();
    const formattedPath = pathname.replace(/\//g, '-').substring(1); // 맨 앞의 '/' 제거
    // 클라이언트 사이드에서만 실행되도록 useEffect 사용
    useEffect(() => {
        setFakerImage(faker.image.avatar());
        const fetchData = async () => {
            try {
                const response = await commentRead(formattedPath);
                setComments(response); // Store the fetched comments in state
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchData();
    }, [formattedPath]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;
    
        try {
            await commentWrite(formattedPath, content, name, fakerImage);
            
            // Refresh comments after successful submission
            const response = await commentRead(formattedPath);
            setComments(response);
            
            // Clear input fields
            setContent('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <VStack align="flex-start" justify="flex-start" gap={16} className={s.container}>
            <p className={s.title}>댓글</p>
            {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
                <Comment
                    key={comment._id || index} // Use _id as key if available
                    nickname={comment.nickname}
                    comment={comment.content}
                    image={comment.userImage}
                />
            ))
) : (
    <p>댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
)}
            <HStack align="center" justify="center" gap={12} style={{width: '100%'}}>
    {fakerImage && (
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
        value={name}
        onChange={(e) => setName(e.target.value)}
    />
</HStack>
<HStack align="center" justify="center" gap={12} style={{width: '100%'}}>
    <div style={{ width: '30px', flexShrink: 0 }} />
    <input 
        type="text" 
        placeholder="댓글을 입력하세요..." 
        className={s.commentInput}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
            }
        }}
    />
    <button 
        className={s.commentButton}
        onClick={handleSubmit}
    >
        <ArrowUpFromLine size={24} color="white" />
    </button>
</HStack>
        </VStack>
    );
}