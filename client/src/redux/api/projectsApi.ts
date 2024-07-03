import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/projects/create",
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          data,
        };
      },
      // invalidatesTags: [{ type: "Donner", id: "LIST" }],
    }),

    getAllProjects: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/projects",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          projects: response,
          meta,
        };
      },
      providesTags: [tagTypes.donner],
    }),

    deleteProject: build.mutation({
      query: (id) => ({
        url: `/projects/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.donner],
    }),
    //get single doctor
    getSingleProject: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.donner],
    }),

    updateProject: build.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/projects/update/${data.id}`,
          method: "POST",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.donner, tagTypes.user],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} = projectsApi;
