import { call, put, takeEvery, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { AnimeCommentPayloadService, AnimeCommentService } from "@/lib/services/anime";
import { ApiGetComment, ApiPostComment } from '@/apis/comment';
import { animeCommentAction } from './slice';

function* handlePostAnimeComment(action: PayloadAction<AnimeCommentPayloadService>): Generator<any, void, any> {
    try {
        const { formDataPost } = action.payload
        console.log(formDataPost)
        const response: AxiosResponse<AnimeCommentService> = yield call(ApiPostComment, formDataPost)
        yield put(animeCommentAction.animeCommentSuccess(response.data))
    } catch (error) {
        console.log('API Error:', error)
        yield put(animeCommentAction.animeCommentError('Post Comment failed.'))
    }
}

function* handleGetAnimeComment(action: PayloadAction<number>): Generator<any, void, any> {
    try {
        const post_id = action.payload;
        const response: AxiosResponse<AnimeCommentService> = yield call(ApiGetComment, post_id);
        yield put(animeCommentAction.fetchCommentSuccess(response.data));
    } catch (error) {
        console.log('API Error:', error);
        yield put(animeCommentAction.fetchCommentError('Get Comment failed.'));
    }
}

function* watchHandleAnimeComment(): Generator<any, void, any> {
    yield takeEvery(animeCommentAction.animeCommentRequest.type, handlePostAnimeComment);
    yield takeEvery(animeCommentAction.fetchCommentRequest.type, handleGetAnimeComment);
}

export default function* rootSaga(): Generator<any, void, any> {
    yield all([
        watchHandleAnimeComment(),
    ]);
}
