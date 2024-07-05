import { ApiAnimeRecently } from "@/apis/schedule";
import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { animeRecentlyAction } from "./slice";
import { AnimeService } from "@/lib/services/anime";


function* handleGetAnimeRecently(): Generator<any, void, any> {
    try {
        const response: AxiosResponse<AnimeService[]> = yield call(ApiAnimeRecently);
        yield put(animeRecentlyAction.animeRecentlySuccess(response.data));
    } catch (error) {
        console.log('API Error:', error);
        yield put(animeRecentlyAction.animeRecentlyFailed('Get Data Anime Recently failed.'));
    }
}

function* watchHandleAnimeRecently(): Generator<any, void, any> {
    yield takeEvery(animeRecentlyAction.animeRecentlyRequest.type, handleGetAnimeRecently);
}

export default function* rootSaga(): Generator<any, void, any> {
    yield all([
        watchHandleAnimeRecently(),
    ]);
}
