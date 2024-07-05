import { ApiAnimeVideo } from "@/apis/schedule";
import { AnimeVideoPayloadService, AnimeVideoResponseService, AnimeVideoService } from "@/lib/services/anime";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { animeVideoAction } from "./slice";

function* handleGetAnimeVideo(action: PayloadAction<AnimeVideoPayloadService>): Generator<any, void, any> {
    try {
        const { slug, episode } = action.payload;
        const response: AxiosResponse<AnimeVideoService> = yield call(() => ApiAnimeVideo(slug, episode));
        yield put(animeVideoAction.animeVideoSuccess(response.data));
    } catch (error) {
        console.log('API Error:', error);
        yield put(animeVideoAction.animeVideoFailed('Get Data Anime Video failed.'));
    }
}

function* watchHandleAnimeVideo(): Generator<any, void, any> {
    yield takeEvery(animeVideoAction.animeVideoRequest.type, handleGetAnimeVideo);
}

export default function* rootSaga(): Generator<any, void, any> {
    yield all([
        watchHandleAnimeVideo(),
    ]);
}
