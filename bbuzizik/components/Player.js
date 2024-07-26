import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const Player = ({ src, type }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (type === 'm3u8' && Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
        }
    }, [src, type]);

    return type === 'm3u8' ? (
        <video key={src} ref={videoRef} controls width={'100%'} height={'100%'} autoPlay />
    ) : (
        <video key={src} ref={videoRef} src={src} controls />
    );
};

export default Player;
