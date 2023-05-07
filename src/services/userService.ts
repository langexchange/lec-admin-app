import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page = 1, perPage = 10 }) => ({
        url: "/admin/api/users?page=" + page + "&pageSize=" + perPage,
        method: "GET",
      }),
      keepUnusedDataFor: 20,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/api/users/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation } = usersApi;
