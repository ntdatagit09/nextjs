
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../services/api/baseApi';
import toursSlice from './toursSlice';
import usersSlice from './usersSlice';
import searchSlice from './searchSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [baseApi.reducerPath]: baseApi.reducer,
            tour: toursSlice,
            user: usersSlice,
            search: searchSlice,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                baseApi.middleware
            ),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
