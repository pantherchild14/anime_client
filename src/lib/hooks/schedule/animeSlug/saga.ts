import { ApiAnimeSlug } from "@/apis/schedule";
import { AnimeSlugPayloadService, AnimeSlugService } from "@/lib/services/anime";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { animeSlugAction } from "./slice";

function* handleGetAnimeSlug(action: PayloadAction<AnimeSlugPayloadService>): Generator<any, void, any> {
    try {
        const { slug } = action.payload;
        const response: AxiosResponse<AnimeSlugService> = yield call(ApiAnimeSlug, slug);
        yield put(animeSlugAction.animeSlugSuccess(response.data));
    } catch (error) {
        console.log('API Error:', error);
        yield put(animeSlugAction.animeSlugFailed('Get Data Anime Slug failed.'));
    }
}

function* watchHandleAnimeSlug(): Generator<any, void, any> {
    yield takeEvery(animeSlugAction.animeSlugRequest.type, handleGetAnimeSlug);
}

export default function* rootSaga(): Generator<any, void, any> {
    yield all([
        watchHandleAnimeSlug(),
    ]);
}
