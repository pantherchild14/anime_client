"use client"
import { animeVideoAction } from '@/lib/hooks/schedule/animeVideo/slice';
import { AppDispatch, RootState } from '@/lib/hooks/store';
import { AnimeVideoTVService, AnimeVideoTVStateService } from '@/lib/services/anime';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayerTV from '../selectVideo';

interface AnimeVideoProps {
    slug: string;
    episode: number;
}

interface AnimeVideoItem {
    type: string;
    value: string;
}

const AnimeVideoComponent: React.FC<AnimeVideoProps> = ({ slug, episode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const animeVideo = useSelector((state: RootState) => state.animeVideo);

    useEffect(() => {
        dispatch(animeVideoAction.animeVideoRequest({ slug, episode }));
    }, [dispatch, slug, episode]);

    if (!animeVideo.data) {
        return <div>Loading...</div>;
    }

    const metaObject = JSON.parse(animeVideo.data.anime.meta);
    if (typeof metaObject !== 'object' || metaObject === null) {
        return <div>No metadata available</div>;
    }

    const keys = Object.keys(metaObject);
    const midIndex = Math.ceil(keys.length / 2);
    const column1Keys = keys.slice(0, midIndex);
    const column2Keys = keys.slice(midIndex);

    const parsedData: AnimeVideoItem[][] = JSON.parse(animeVideo.data.animeVideoTV);

    const filteredData = parsedData[0].reduce((acc: { [key: string]: string }, item: AnimeVideoItem) => {
        acc[item.type] = item.value;
        return acc;
    }, {});

    const completeFilteredData: AnimeVideoTVService = {
        VPRO: filteredData.VPRO || '',
        TIK: filteredData.TIK || '',
        HYDRAX: filteredData.HYDRAX || '',
        HLS: animeVideo.data.hlsServer || '',
        AHS: filteredData.AHS || '',
    };

    const animeVideoTV: AnimeVideoTVStateService = {
        data: completeFilteredData,
        error: null,
    };

    return (
        <div className='hin-wraperAnime'>
            <div className='grid grid-cols-3 gap-4'>
                <div className='grid gap-4 col-span-2'>
                    <div className='player_video'>
                        {animeVideoTV.data && (
                            <VideoPlayerTV animeVideo={{ data: animeVideoTV.data }} />
                        )}
                    </div>
                    <div className='flex gap-4 mb-5'>
                        <div className='hin-animeImage' style={{ width: '150%' }}>
                            <img className='bg-mint text-mint fill-current rounded-md' src={`http://localhost:3000/images/${animeVideo.data.anime.poster}`} alt={animeVideo.data.anime.title} />
                        </div>
                        <div className='hin-animeDetail w-auto'>
                            <div className='hin-animeContent'>
                                <h2 className='text-2xl font-bold mb-2'>{animeVideo.data.anime.title}</h2>
                                {/* <span className='text-sx'>{animeVideo.data.anime.alias}</span> */}
                                <p className='text-sm mt-2'>{animeVideo.data.anime.description}</p>
                            </div>
                            <div className="hin-animeMeta flex gap-10 mt-4">
                                <div className="column">
                                    {column1Keys.map((key) => (
                                        <div key={key}>
                                            <strong>{key}:</strong> {metaObject[key]}
                                        </div>
                                    ))}
                                </div>
                                <div className="column">
                                    {column2Keys.map((key) => (
                                        <div key={key}>
                                            <strong>{key}:</strong> {metaObject[key]}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {animeVideo.data.anime?.episode_number ? (
                        <div className='py-3 px-2 rounded-md bg-gray-500'>
                            {animeVideo.data.anime?.episode_number.split(',').map((episodeNumber: string, index: number) => (
                                <Link
                                    key={index}
                                    href={`/${slug}/${episodeNumber}`}
                                    className={`rounded-md ${episodeNumber === String(episode) ? 'bg-blue-500' : ''} text-white text-xl py-1 px-3 mr-2`}
                                >
                                    {episodeNumber}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div>side bar</div>
            </div>

        </div>
    );
}

export default AnimeVideoComponent;
