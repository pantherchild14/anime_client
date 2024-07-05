import { ApiLogin } from '@/apis/user';
import { setCookie } from '@/lib/util/cookie';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { authLoginAction } from './slice';
import { LoginPayloadService, LoginResponsesService } from '@/lib/services/auth';



function* handleLogin(action: PayloadAction<LoginPayloadService>): Generator<any, void, any> {
    try {
        const { email, password } = action.payload;
        const response: AxiosResponse<LoginResponsesService> = yield call(ApiLogin, { email, password });
        const userJWT = response.data.jwt;

        setCookie('access_token', userJWT, 1);
        yield put(authLoginAction.loginSuccess({ jwt: response.data.jwt }));

    } catch (error) {
        yield put(authLoginAction.loginFailed('Login failed. Please check your credentials.'));
        console.error('Error logging in:', error);
    }
}

function* watchHandleLogin(): Generator<any, void, any> {
    yield takeEvery(authLoginAction.loginRequest.type, handleLogin);
}

export default function* rootSaga(): Generator<any, void, any> {
    yield all([
        watchHandleLogin(),
    ]);
}
