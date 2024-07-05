import { ApiSignUp } from '@/apis/user';
import { setCookie } from '@/lib/util/cookie';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { authSignUpAction } from './slice';

interface LoginPayload {
    username: string;
    email: string;
    password: string;
}

interface SignUpResponse {
    data: {
        id: string;
    };
    jwt: string
}

function* handleSignUp(action: PayloadAction<LoginPayload>): Generator<any, void, any> {
    try {
        const { username, email, password } = action.payload;
        const response: AxiosResponse<SignUpResponse> = yield call(ApiSignUp, { username, email, password });
        const userJWT = response.data.jwt;

        setCookie('access_token', userJWT, 1);
        yield put(authSignUpAction.signupSuccess({ jwt: response.data.jwt }));

    } catch (error) {
        yield put(authSignUpAction.signupFailed('Sign up failed. Please check your credentials.'));
        console.error('Error sign up:', error);
    }
}

function* watchHandleSignUp(): Generator<any, void, any> {
    yield takeEvery(authSignUpAction.signupRequest.type, handleSignUp);
}

export default function* rootSaga(): Generator<any, void, any> {
    yield all([
        watchHandleSignUp(),
    ]);
}
