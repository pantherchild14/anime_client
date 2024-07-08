import React, { useEffect } from 'react'
import HotAnimeComponent from './HotAnime'
import { animeCategoryAction } from '@/lib/hooks/schedule/animeCategory/slice';
import { AppDispatch, RootState } from '@/lib/hooks/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
type Props = {}

const SideBarComponent: React.FC<Props> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const animeCategory = useSelector((state: RootState) => state.animeCategory);

    useEffect(() => {
        dispatch(animeCategoryAction.animeCategoryRequest({ params: { page: 1, limit: 5 } }));
    }, [dispatch]);

    return (
        <div className='hin-sidebar'>
            <HotAnimeComponent title={'Hot Tuần'} data={animeCategory?.data} />
        </div>
    )
}

export default SideBarComponent