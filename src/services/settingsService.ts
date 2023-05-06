import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export const settingsApi = createApi({
  reducerPath: "settingsApi",
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
    getAllSettings: builder.query({
      query: () => ({
        url: "/admin/api/settings",
        method: "GET",
      }),
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/admin/api/settings",
        method: "PUT",
        body: data,
      }),
    }),
    createSettings: builder.mutation({
      query: (data) => ({
        url: "/admin/api/settings/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllSupportedLocales: builder.query({
      query: () => ({
        url: "/admin/api/settings/support-locale",
        method: "GET",
      }),
    }),
    addNewSupportedLocale: builder.mutation({
      query: (data) => ({
        url: "/admin/api/settings/support-locale",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSettingsQuery,
  useUpdateSettingsMutation,
  useCreateSettingsMutation,
  useGetAllSupportedLocalesQuery,
  useAddNewSupportedLocaleMutation,
} = settingsApi;
