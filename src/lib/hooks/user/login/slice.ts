import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    name: string;
    email: string;
}

interface JWT {
    jwt: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

interface CounterState {
    isLoggedIn: JWT | boolean;
    logging: boolean;
    currentUser: User | null;
    error: string | null;
}

const initialState: CounterState = {
    isLoggedIn: false,
    logging: false,
    currentUser: null,
    error: null
}

export const counterSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRequest: (state, action: PayloadAction<LoginPayload>) => {
            state.logging = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<JWT>) => {
            state.logging = false;
            state.isLoggedIn = true;
            state.error = null;
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.logging = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
            state.error = null;
        },
        handleCheckLogin: (state, action: PayloadAction<string>) => {
            state.logging = false;
            state.isLoggedIn = true;
            state.error = null;
        }
        // handleLogin: This action is not necessary here since we handle it in the saga
    },
});

export const authLoginAction = counterSlice.actions;

export default counterSlice.reducer;
