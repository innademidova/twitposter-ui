// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../../app/store";

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const selectToken = (state: RootState) => state.auth.token;
export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
