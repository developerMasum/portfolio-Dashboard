import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const skillsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSkills: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/skills",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          skills: response,
        };
      },
      providesTags: [tagTypes.donner],
    }),

    createSkills: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/skills/create",
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          data,
          invalidatesTags: [tagTypes.donner],
        };
      },
    }),
  }),
});

export const { useCreateSkillsMutation, useGetAllSkillsQuery } = skillsApi;
