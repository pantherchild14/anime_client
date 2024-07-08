"use client"

import { animeRecentlyAction } from '@/lib/hooks/schedule/animeRecently/slice';
import { AppDispatch, RootState } from '@/lib/hooks/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimeRecently from './animeRecently';
import SliderPage from './slider';
import SideBarComponent from '../sideBar';

type Props = {}

const HomePage = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const animeRecently = useSelector((state: RootState) => state.animeRecently)

    useEffect(() => {
        if (!animeRecently.data || animeRecently.data.length === 0) {
            dispatch(animeRecentlyAction.animeRecentlyRequest())
        }
    }, [dispatch, animeRecently.data]);

    return (
        <>
            <div className='grid grid-cols-4 gap-4'>
                <div className='grid gap-4 col-span-3'>
                    <SliderPage animeRecently={animeRecently} />
                    <AnimeRecently animeRecently={animeRecently} />
                </div>
                <div className="sidebar"><SideBarComponent /></div>
            </div>

        </>
    );
};

export default HomePage;