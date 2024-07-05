"use client"

import { AnimeRecentlyStateService } from '@/lib/services/anime';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

interface Props {
    animeRecently: AnimeRecentlyStateService;
}

const SliderPage: React.FC<Props> = ({ animeRecently }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newData = animeRecently.data?.slice(0, 3);
        const newIndex = isFirstSlide ? (newData?.length || 0) - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newData = animeRecently.data?.slice(0, 3);
        const isLastSlide = currentIndex === (newData?.length || 0) - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    // Autoplay functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    if (!animeRecently.data) {
        return null;
    }


    return (
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 relative group'>
            <div
                // background-size: contain;
                // background-position: center;
                // background-repeat: no-repeat; 
                // opacity: 1;
                style={{ backgroundImage: `url(http://localhost:3000/images/${animeRecently.data.slice(0, 3)[currentIndex]?.poster})` }}
                className='w-full h-full rounded-md bg-center bg-cover duration-500 relative'
            >
                <div className='absolute bottom-0 z-50 w-full flex justify-between p-7 gap-20'>
                    <div className='hin-titleSlider'>
                        <p className='text-2xl font-bold leading-6 text-slate-50 mb-3'>{animeRecently.data.slice(0, 3)[currentIndex]?.title}</p>
                        <span className='text-sm leading-6 text-slate-300 line-clamp-3'>{animeRecently.data.slice(0, 3)[currentIndex]?.description}</span>
                    </div>
                    <div className='hin-btSlider w-40 self-center text-center'>
                        {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>watching now</button> */}
                        <Link href={animeRecently.data.slice(0, 3)[currentIndex]?.paramHref} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>watching</Link>
                    </div>
                </div>
            </div>
            {/* Left Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
        </div>
    );
};

export default SliderPage;
