import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

const baseUrl = process.env.REACT_APP_API_URL_ROOT;

export interface User {
  id: string;
  incId: number;
  firstName: string;
  lastName: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  remainName: string;
  isSupperAdmin: boolean;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  id: string;
  firstName: string;
  remainName: string;
  token: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AdminAccount {
  id: string;
  email: string;
  firstName: string;
  isSupperAdmin: boolean;
  remainName: string;
  createdAt: string;
  updatedAt: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
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
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/admin/api/auth/create-account",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<LoginResponse, AuthRequest>({
      query: (data) => ({
        url: "/admin/api/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getAdmins: builder.query<AdminAccount[], undefined>({
      query: () => ({
        url: "/admin/api/auth/admins",
        method: "GET",
      }),
    }),
    deleteAdminAccount: builder.mutation<undefined, string>({
      query: (id) => ({
        url: `/admin/api/auth/admins/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAdminsQuery,
  useDeleteAdminAccountMutation,
} = authApi;
