

import { API_PATH, BASE_URL } from '@/constants/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: "baseAPI",
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://jsonplaceholder.typicode.com/',
        baseUrl: `${BASE_URL}${API_PATH}`, //localhost domain for dev replace later with env
        prepareHeaders: (headers, { getState }) => {

            // const token = (getState() as RootState).auth.token
            // if (token) {
            //     headers.set('authorization', `Bearer ${token}`)
            // }

            return headers
        },
    }),
    endpoints: () => ({}),
})