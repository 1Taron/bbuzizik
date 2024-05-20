import { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

export default function Player() {
    return (
        <>
            <ReactPlayer
                url={'http://15.164.59.52:8088/hls/bbbbbb.m3u8'}
                // ref={playerRef}
                muted={true}
                controls={true}
                playing={true}
                width={'100%'}
                height={'100%'}
            />
        </>
    );
}
