import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimeCommentState, AnimeCommentPayloadService, AnimeCommentService, AnimeComment, CommentResponseService } from '@/lib/services/anime';

const initialState: AnimeCommentState = {
    data: null,
    error: null,
};

export const animeCommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        animeCommentRequest: (state, action: PayloadAction<CommentResponseService>) => {
            state.data = null;
            state.error = null;
        },
        animeCommentSuccess: (state, action: PayloadAction<AnimeCommentService>) => {
            state.data = action.payload;
            state.error = null;
        },
        animeCommentError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        fetchCommentRequest: (state, action: PayloadAction<number>) => {
            state.data = null;
            state.error = null;
        },
        fetchCommentSuccess: (state, action: PayloadAction<AnimeCommentService>) => {
            state.data = action.payload;
            state.error = null;
        },
        fetchCommentError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const animeCommentAction = animeCommentSlice.actions;

export default animeCommentSlice.reducer;
