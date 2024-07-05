"use client"
// import React, { useEffect, useRef } from 'react';
// import Hls from 'hls.js';

// type HLSPlayerProps = {
//     src: string;
// };

// const HLSPlayer: React.FC<HLSPlayerProps> = ({ src }) => {
//     const videoRef = useRef<HTMLVideoElement>(null);

//     useEffect(() => {
//         const video = videoRef.current;

//         if (Hls.isSupported()) {
//             const hls = new Hls();
//             hls.loadSource(src);
//             hls.attachMedia(video);
//             hls.on(Hls.Events.MANIFEST_PARSED, () => {
//                 console.log('MANIFEST_PARSED');
//                 video.play().catch((error) => {
//                     console.error('Error attempting to play', error);
//                 });
//             });
//             hls.on(Hls.Events.ERROR, (event, data) => {
//                 console.error('HLS.js error', data);
//             });
//             return () => {
//                 hls.destroy();
//             };
//         } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
//             video.src = src;
//             video.addEventListener('loadedmetadata', () => {
//                 video.play().catch((error) => {
//                     console.error('Error attempting to play', error);
//                 });
//             });
//         } else {
//             console.error('HLS not supported');
//         }

//         return () => {
//             if (video) {
//                 video.removeEventListener('loadedmetadata', () => {
//                     video.play().catch((error) => {
//                         console.error('Error attempting to play', error);
//                     });
//                 });
//             }
//         };
//     }, [src]);

//     return (
//         <div>
//             <video ref={videoRef} controls style={{ width: '100%' }} />
//         </div>
//     );
// };

// export default HLSPlayer;


// components/VideoPlayer.tsx

// components/VideoPlayer.tsx

import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
    src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current && Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (videoRef.current) {
                    videoRef.current.play();
                }
            });

            return () => {
                hls.destroy();
            };
        } else if (videoRef.current) {
            videoRef.current.src = src;
            videoRef.current.addEventListener('loadedmetadata', () => {
                if (videoRef.current) {
                    videoRef.current.play();
                }
            });
        }
    }, [src]);

    return (
        <div>
            <video
                ref={videoRef}
                className="video-js vjs-default-skin rounded-md"
                width="800"
                height="400"
                controls
            ></video>
        </div>
    );
};

export default VideoPlayer;
