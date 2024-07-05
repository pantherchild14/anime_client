"use client"

import { animeRecentlyAction } from '@/lib/hooks/schedule/animeRecently/slice';
import { AppDispatch, RootState } from '@/lib/hooks/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimeRecently from './animeRecently';
import SliderPage from './slider';

type Props = {}

const HomePage = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const animeRecently = useSelector((state: RootState) => state.animeRecently)

    useEffect(() => {
        if (!animeRecently.data || animeRecently.data.length === 0) {
            dispatch(animeRecentlyAction.animeRecentlyRequest())
        }
    }, [dispatch, animeRecently.data]);
    console.log(animeRecently);
    return (
        <>
            <SliderPage animeRecently={animeRecently} />
            <AnimeRecently animeRecently={animeRecently} />
        </>
    );
};

export default HomePage;