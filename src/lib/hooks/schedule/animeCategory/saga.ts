import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { animeCategoryAction } from "./slice";
import { AnimeCategoryPayloadService, AnimeCategoryResponseService, AnimeCategoryService, AnimeService } from "@/lib/services/anime";
import { ApiAnimeCategory } from "@/apis/schedule";
import { PayloadAction } from "@reduxjs/toolkit";


function* handleGetanimeCategory(action: PayloadAction<AnimeCategoryPayloadService>): Generator<any, void, any> {
    try {
        const { params } = action.payload;
        const response: AxiosResponse<AnimeCategoryResponseService> = yield call(ApiAnimeCategory, params);
        yield put(animeCategoryAction.animeCategorySuccess({ data: response.data.anime, total_anime: response.data.countAnime.total_anime }));
    } catch (error) {
        console.log('API Error:', error);
        yield put(animeCategoryAction.animeCategoryFailed('Get Data Anime Recently failed.'));
    }
}


function* watchHandleanimeCategory(): Generator<any, void, any> {
    yield takeEvery(animeCategoryAction.animeCategoryRequest.type, handleGetanimeCategory);
}

export default function* rootSaga(): Generator<any, void, any> {
    yield all([
        watchHandleanimeCategory(),
    ]);
}
