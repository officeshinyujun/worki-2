export async function commentRead(where : string) {
    const res = await fetch(`https://worki-2-backend.onrender.com/api/comments/${where}`);
    const data = await res.json();
    return data;
}

export async function commentWrite(where : string, comment : string, nickname : string, image : string) {
    const res = await fetch(`https://worki-2-backend.onrender.com/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: comment,
            nickname: nickname,
            userImage: image,
            postName: where
        }),
    });
    const data = await res.json();
    return data;
}
