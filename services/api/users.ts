import { IUser } from "@/interfaces/user";
import { baseApi } from "./baseApi";

type PostsResponse = IUser[];

const extendedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<PostsResponse, { name: string, id: string }>({
            query: (name) => 'users',
        }),
        getUser: builder.query<PostsResponse, void>({
            query: () => 'users',
        }),
    }),
})
export { extendedApi as usersApi };
export const { useGetUserQuery, useGetUsersQuery } = extendedApi;