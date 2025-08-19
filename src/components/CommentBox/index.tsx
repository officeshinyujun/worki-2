import { VStack } from "@/components/VStack";
import s from './style.module.scss';
import Comment from './Comment';
import { HStack } from "../HStack";
import { ArrowUpFromLine } from "lucide-react";
import comment from '@/data/coment.json';

export default function CommentBox() {
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
            <input type="text" className={s.nameInput} placeholder="남길 이름을 입력하십시오..."/>
            <HStack align="center" justify="center" gap={12} style={{width: '100%'}}>
                <input type="text" placeholder="댓글을 입력하세요..." className={s.commentInput}/>
                <button className={s.commentButton}>
                    <ArrowUpFromLine
                    size={24}
                    color="white"
                    />
                </button>
            </HStack>
        </VStack>
    );
}