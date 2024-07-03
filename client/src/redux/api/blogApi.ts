import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/blogs",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          blogs: response,
        };
      },
      providesTags: [tagTypes.donner],
    }),
    getSingleBlog: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.donner],
    }),

    createBlogs: build.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: "/blogs/create",
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          data,
        };
      },
    }),

    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blogs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.donner],
    }),
    updateBlog: build.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/blogs/update/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.donner, tagTypes.user],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogsMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
