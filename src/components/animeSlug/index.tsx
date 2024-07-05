"use client"
import { animeSlugAction } from '@/lib/hooks/schedule/animeSlug/slice'
import { AppDispatch, RootState } from '@/lib/hooks/store'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HLSPlayer from '../player/Player'

interface AnimeSlugProps {
    slug: string;
}

const AnimeSlugComponent: React.FC<AnimeSlugProps> = ({ slug }) => {
    const dispatch = useDispatch<AppDispatch>();
    const animeSlug = useSelector((state: RootState) => state.animeSlug);

    useEffect(() => {
        dispatch(animeSlugAction.animeSlugRequest({ slug: slug }));
    }, [dispatch, slug]);

    if (!animeSlug.data) {
        return <div>Loading...</div>;
    }

    // handle Meta
    const metaObject = JSON.parse(animeSlug.data.meta);
    if (typeof metaObject !== 'object' || metaObject === null) {
        return <div>No metadata available</div>;
    }

    const keys = Object.keys(metaObject);
    const midIndex = Math.ceil(keys.length / 2);
    const column1Keys = keys.slice(0, midIndex);
    const column2Keys = keys.slice(midIndex);

    return (
        <div className='hin-wraperAnime'>
            <div className='flex gap-4 mb-5'>
                <div className='hin-animeImage' style={{ width: '80%' }}>
                    <img className='bg-mint text-mint fill-current rounded-md' src={`http://localhost:3000/images/${animeSlug.data.poster}`} alt={animeSlug.data.title} />
                </div>
                <div className='hin-animeDetail w-auto'>
                    <div className='hin-animeContent'>
                        <h2 className='text-2xl font-bold mb-2'>{animeSlug.data.title}</h2>
                        {/* <span className='text-sx'>{animeSlug.data.alias}</span> */}
                        <p className='text-sm mt-2'>{animeSlug.data.description}</p>
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
            {animeSlug?.data?.episode_number ? (
                <div className='py-5 px-2 rounded-md bg-gray-500'>
                    {animeSlug?.data?.episode_number.split(',').map((episodeNumber: string, index: number) => (
                        <Link href={`/${slug}/${episodeNumber}`} key={index} className={`rounded-md bg-blue-500 text-white text-xl py-1 px-3 mr-2`}>{episodeNumber}</Link>
                    ))}
                </div>
            ) : null}
        </div>

    );
};

export default AnimeSlugComponent;