import { AnimeVideoPayloadService, AnimeVideoService, AnimeVideoStateService } from '@/lib/services/anime';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AnimeVideoStateService = {
    data: null,
    error: null,
};

export const animeVideoSlice = createSlice({
    name: 'animeVideo',
    initialState,
    reducers: {
        animeVideoRequest: (state, action: PayloadAction<AnimeVideoPayloadService>) => {
            state.data = null;
            state.error = null;
        },
        animeVideoSuccess: (state, action: PayloadAction<AnimeVideoService>) => {
            state.data = action.payload;
            state.error = null;
        },
        animeVideoFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const animeVideoAction = animeVideoSlice.actions;
export default animeVideoSlice.reducer;
