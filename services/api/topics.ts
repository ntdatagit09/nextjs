import { baseApi } from "./baseApi";
import { ITopicSummary } from "@/interfaces/topic";

type PostsResponse = {
    success: string,
    message: string,
    data: ITopicSummary[]
};
type DetailResponse = {
    success: string,
    message: string,
    data: ITopicSummary
};
const extendedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // query list topic
        getTopics: builder.query<PostsResponse, any>({
            query: (param) => `topic${param}`,
        }),
        // query detail topic by slug
        getTopic: builder.query<DetailResponse, any>({
            query: (slug) => `topic/${slug}`
        })
    }),
})
export { extendedApi as topicApi };
export const {
    useGetTopicsQuery,
    useGetTopicQuery
} = extendedApi;