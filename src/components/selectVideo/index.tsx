"use client"
import React, { useMemo, useState } from 'react';
import VideoPlayer from '../player/Player';

interface AnimeVideoTVService {
    HYDRAX: string;
    VPRO: string;
    HLS: string;
    AHS: string;
    TIK: string;

}

interface Props {
    animeVideo: {
        data: AnimeVideoTVService;
    };
}


const VideoPlayerIFrame: React.FC<{ src: string }> = ({ src }) => {
    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div className={`video-container ${loading ? 'loading' : ''}`}>
            {loading && <VideoPlayer src={src} />}
            <iframe
                className={`${loading ? 'hidden' : ''} rounded-md`}
                width="800"
                height="400"
                src={src}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Player"
                onLoad={handleLoad}
            ></iframe>
        </div>
    );
};
const VideoPlayerTV: React.FC<Props> = ({ animeVideo }) => {
    const servers = {
        '#SR1': animeVideo.data.HLS,
        '#SR2': animeVideo.data.VPRO,
        '#SR3': animeVideo.data.HYDRAX,
    };

    const [selectedServer, setSelectedServer] = useState<keyof typeof servers>('#SR1');

    const handleChange = (server: keyof typeof servers) => {
        setSelectedServer(server);
    };

    const src = useMemo(() => servers[selectedServer], [selectedServer]);
    return (
        <>
            {selectedServer !== '#SR1' ? (
                <VideoPlayerIFrame src={src} />
            ) : (
                <VideoPlayer src={src} />
            )}
            <div className='text-center mt-3'>
                {Object.keys(servers).map((serverKey) => (
                    <button
                        key={serverKey}
                        onClick={() => handleChange(serverKey as keyof typeof servers)}
                        style={{
                            marginRight: '10px',
                            marginBottom: '10px',
                            padding: '8px 12px',
                            backgroundColor: selectedServer === serverKey ? '#007bff' : '#ffffff',
                            color: selectedServer === serverKey ? '#ffffff' : '#000000',
                            border: '1px solid #cccccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {serverKey}
                    </button>
                ))}
            </div>
        </>
    );
};

export default VideoPlayerTV;
