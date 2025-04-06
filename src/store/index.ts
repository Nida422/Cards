"use client"
import { configureStore } from '@reduxjs/toolkit';
// import weather from '@/features/weather/weatherSlice';
import weather from '@/features/weather/weatherSlice'
import crypto from '@/features/crypto/cryptoSlice';
import news from '@/features/news/newsSlice';
import preferences from '@/features/preferences/preferencesSlice';

export const store = configureStore({
  reducer: {
    weather,
    crypto,
    news,
    preferences,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;