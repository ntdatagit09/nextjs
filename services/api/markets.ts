import { IMarketFilter } from "@/interfaces/market";
import { baseApi } from "./baseApi";

type PostsResponse = {
    success: boolean,
    message: string,
    data: IMarketFilter[]
};

type MarketFilterResponse = {
    success: boolean,
    message: string,
    data: IMarketFilter
};

const extendedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMarkets: builder.query<PostsResponse, any>({
            query: (param) => `market${param}`,
        }),
        getMarketFilter: builder.query<MarketFilterResponse, any>({
            query: (param) => `market/filter/${param}`,
        }),
    }),
})
export { extendedApi as marketApi };
export const { useGetMarketsQuery, useGetMarketFilterQuery } = extendedApi;