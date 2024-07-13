import { useEffect } from 'react';
import { Server } from 'socket.io';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../api/firebase/firebasedb';

export default function SocketHandler(req, res) {

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    let connectedClient;

    io.on('connection', socket => {
        // 새로운 클라이언트 연결 정보 저장
        connectedClient = socket;
        socket.on('disconnect', () => {
            // 클라이언트 연결 해제 시 연결 정보 초기화
            if (connectedClient === socket) {
                connectedClient = null;
            }
        });

        // 메시지
        socket.on('send_message', obj => {

            sendChat(obj);
            io.emit('receive_message');
        });
    });

    res.end();
}

const sendChat = async obj => {
    try {
        // Firestore에 저장할 사용자의 추가 정보
        await addDoc(collection(db, `Chat-${obj.streamerKey}`), {
            UID: obj.uid,
            NickName: obj.nickName,
            Message: obj.chatText,
            StreamKey: obj.streamKey,
            StreamerKey: obj.streamerKey,
            Timestamp: serverTimestamp(),
        });
    } catch (error) {

    }
};
