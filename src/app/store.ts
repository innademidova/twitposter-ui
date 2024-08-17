import { configureStore } from '@reduxjs/toolkit';
import { twitPosterApi } from './api';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        [twitPosterApi.reducerPath]: twitPosterApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(twitPosterApi.middleware),
});

// Создаем типы на основе конфигурации хранилища
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
