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

        socket.on('receive_message', data => {
            console.log(data);
            setAllMessage(pre => [...pre, data]);
            console.log('receive_message 1번');
        });

        console.log('socketInitializer 3번');
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 딜레이
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
