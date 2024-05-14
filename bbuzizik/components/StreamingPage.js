import React, { useEffect } from 'react';
import Hls from 'hls.js';

const StreamingPage = () => {
    useEffect(() => {
        if (Hls.isSupported()) {
            const video = document.getElementById('my-video');
            const hls = new Hls();
            hls.loadSource('http://15.164.59.52:8088/hls/bbbbbb.m3u8');
            hls.attachMedia(video);
        } else {
            console.error('HLS is not supported');
        }
    }, []);

    return (
        <>
            <video id="my-video" controls autoPlay />
        </>
    );
};

export default StreamingPage;