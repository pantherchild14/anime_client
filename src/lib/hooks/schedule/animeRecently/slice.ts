import { AnimeRecentlyStateService, AnimeService } from '@/lib/services/anime';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: AnimeRecentlyStateService = {
    data: null,
    error: null
};

export const animeRecentlySlice = createSlice({
    name: 'animeRecently',
    initialState,
    reducers: {
        animeRecentlyRequest: (state) => {
            state.data = null;
            state.error = null;
        },
        animeRecentlySuccess: (state, action: PayloadAction<AnimeService[]>) => {
            state.data = action.payload;
            state.error = null;
        },
        animeRecentlyFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const animeRecentlyAction = animeRecentlySlice.actions;
export default animeRecentlySlice.reducer;
