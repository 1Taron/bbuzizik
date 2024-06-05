import { useEffect } from 'react';
import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
    console.log('Setting Socket');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    let connectedClient;

    io.on('connection', socket => {
        io.on('connection', socket => {
            // 이미 연결된 클라이언트가 있다면 끊기
            if (connectedClient) {
                console.log('Disconnecting previous client...');
                connectedClient.disconnect(true);
            }

            // 새로운 클라이언트 연결 정보 저장
            connectedClient = socket;

            console.log(`Client connected: ${socket.id}`);

            socket.on('disconnect', () => {
                // 클라이언트 연결 해제 시 연결 정보 초기화
                if (connectedClient === socket) {
                    connectedClient = null;
                    console.log(`Client disconnected: ${socket.id}`);
                }
            });
        });

        // 메시지
        socket.on('send_message', obj => {
            console.log('send client before', socket.id, obj);
            io.emit('receive_message', obj);
            console.log('send client after', socket.id, obj);
        });
    });
    res.end();
}
