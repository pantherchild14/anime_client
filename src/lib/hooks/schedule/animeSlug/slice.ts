import { AnimeSlugPayloadService, AnimeSlugService, AnimeSlugStateService } from '@/lib/services/anime';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AnimeSlugStateService = {
    data: null,
    error: null,
};

export const animeSlugSlice = createSlice({
    name: 'animeSlug',
    initialState,
    reducers: {
        animeSlugRequest: (state, action: PayloadAction<AnimeSlugPayloadService>) => {
            state.data = null;
            state.error = null;
        },
        animeSlugSuccess: (state, action: PayloadAction<AnimeSlugService>) => {
            state.data = action.payload;
            state.error = null;
        },
        animeSlugFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const animeSlugAction = animeSlugSlice.actions;
export default animeSlugSlice.reducer;
