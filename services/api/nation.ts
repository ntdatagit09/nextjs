import { baseApi } from "./baseApi";
import { INationFilter, INationSummary } from "@/interfaces/nation";

type PostsResponse = {
    success: boolean,
    message: string,
    data: INationSummary[]
};

type NationDetail = {
    success: boolean,
    message: string,
    data: INationFilter
}

const extendedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNations: builder.query<PostsResponse, any>({
            query: (param) => `nation${param}`,
        }),
        getNation: builder.query<NationDetail, any>({
            query: (param) => `nation/${param}`
        })
    }),
})
export { extendedApi as nationApi };
export const { useGetNationsQuery, useGetNationQuery } = extendedApi;