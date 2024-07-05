import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    name: string;
    email: string;
}

interface JWT {
    jwt: string;
}

interface SignUpPayload {
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

export const signUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        signupRequest: (state, action: PayloadAction<SignUpPayload>) => {
            state.logging = true;
            state.error = null;
        },
        signupSuccess: (state, action: PayloadAction<JWT>) => {
            state.logging = false;
            state.isLoggedIn = true;
            state.error = null;
        },
        signupFailed: (state, action: PayloadAction<string>) => {
            state.logging = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        },
        handleCheckToken: (state, action: PayloadAction<string>) => {
            state.logging = false;
            state.isLoggedIn = true;
            state.error = null;
        }
    },
});

export const authSignUpAction = signUpSlice.actions;

export default signUpSlice.reducer;
