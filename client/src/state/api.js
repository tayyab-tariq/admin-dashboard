import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products', 'Customers', 'Transactions', 'Geography', 'Sales', 'Admins', 'Performance', 'Dashboard'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ['User'],
        }),
        getProducts: build.query({
            query: ({ page, pageSize }) => ({
                url: `client/products`,
                method: 'GET',
                params: { page, pageSize },
            }),
        }),
        getCustomers: build.query({
            query: () => `client/customers`,
            providesTags: ['Customers'],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: `client/transactions`,
                method: 'GET',
                params: { page, pageSize, sort, search },
            }),
            providesTags: ['Transactions'],
        }),
        getGeography: build.query({
            query: () => `client/geography`,
            providesTags: ['Geography'],
        }),
        getSales: build.query({
            query: () => `sales`,
            providesTags: ['Sales'],
        }),
        getAdmins: build.query({
            query: () => `management/admins`,
            providesTags: ['Admins'],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),
        addCustomer: build.mutation({
            query: (data) => ({
                url: "client/customers", 
                method: "POST",
                body: data,
            }),
        }),
        updateCustomer: build.mutation({
            query: (data) => ({
                url: "client/customers", 
                method: "PUT",
                body: data,
            }),
        }),
        deleteCustomer: build.mutation({
            query: (data) => ({
                url: "client/customers", 
                method: "DELETE",
                body: data,
            }),
        }),
    })
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeographyQuery, useGetSalesQuery, useGetAdminsQuery, useGetUserPerformanceQuery, useGetDashboardQuery, useUpdateCustomerMutation, useAddCustomerMutation, useDeleteCustomerMutation } = api;