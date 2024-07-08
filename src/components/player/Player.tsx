"use client"

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
