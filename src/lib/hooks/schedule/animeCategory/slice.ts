import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimeCategoryPayloadService, AnimeCategoryService, animeCategoryStateService } from '@/lib/services/anime';

const initialState: animeCategoryStateService = {
    data: null,
    error: null,
    total_anime: 0,
};

export const animeCategorySlice = createSlice({
    name: 'animeCategory',
    initialState,
    reducers: {
        animeCategoryRequest: (state, action: PayloadAction<AnimeCategoryPayloadService>) => {
            state.data = null;
            state.error = null;
        },
        animeCategorySuccess: (state, action: PayloadAction<{
            data: AnimeCategoryService[];
            total_anime: number;
        }>) => {
            state.data = action.payload.data;
            state.total_anime = action.payload.total_anime;
            state.error = null;
        },
        animeCategoryFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const animeCategoryAction = animeCategorySlice.actions;
export default animeCategorySlice.reducer;