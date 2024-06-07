import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

const Test = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [allMessage, setAllMessage] = useState([]);

    useEffect(() => {
        socketInitializer();
    }, []);

    async function socketInitializer() {
        console.log('socketInitializer 1번');

        await fetch('/api/socket');

        socket = io();

        console.log('socketInitializer 2번');

        await new Promise(resolve => socket.on('connect', resolve)); // socket 객체가 준비될 때까지 기다림

        console.log('socketInitializer 3번');

        // 기존에 등록된 'receive_message' 이벤트 핸들러가 있는지 확인하고, 없으면 새로 등록
        if (!socket.hasListeners('receive_message')) {
            socket.on('receive_message', data => {
                console.log(data);
                setAllMessage(pre => [...pre, data]);
                console.log('receive_message 1번');
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log('emitted');

        socket.emit('send_message', {
            username,
            message,
        });
        setMessage('');
    }

    return (
        <div>
            <h1>Test</h1>
            <p>Enter username</p>
            <input value={username} onChange={e => setUsername(e.target.value)} />

            <br />
            <br />

            {!!username && (
                <div>
                    {allMessage.map(({ username, message }, index) => (
                        <p key={index}>
                            {username} : {message}
                        </p>
                    ))}

                    <br />

                    <form onSubmit={handleSubmit}>
                        <input name="message" value={message} onChange={e => setMessage(e.target.value)} />
                        <button type="submit">보내기</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Test;
