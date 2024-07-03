"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projectsApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utils/UploadImage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Enter the project title",
  }),
  image: z.any(),
  description: z.string().min(1, {
    message: "Enter the project description",
  }),
  gitHubLink: z.string().url({
    message: "Please enter a valid GitHub link",
  }),
  liveLink: z.string().url({
    message: "Please enter a valid live link",
  }),
  technologies: z.string().min(1, {
    message: "Enter at least one technology used, separated by commas",
  }),
});

const UpdateProjectPage = (params: { params: { projectId: string } }) => {
  const projectId = params?.params?.projectId;
  const {
    data,
    isLoading: isFetching,
    isError,
  } = useGetSingleProjectQuery(projectId);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        description: data.description,
        gitHubLink: data.gitHubLink,
        liveLink: data.liveLink,
        technologies: data.technologies.join(", "),
      });
    }
  }, [data, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let imageUrl = data.image;
    if (values.image && values.image.length > 0) {
      imageUrl = await uploadImage(values.image[0]);
    }

    const technologiesArray = values.technologies
      .split(",")
      .map((tech) => tech.trim());
    const updatedValues = {
      ...values,
      image: imageUrl,
      technologies: technologiesArray,
    };

    try {
      const res = await updateProject({
        id: projectId,
        body: updatedValues,
      }).unwrap();
      // console.log(res);
      toast.success("Project updated successfully");
      // router.push("/projects");
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error loading project</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 px-10 py-6 border-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter project title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter project description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gitHubLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Link</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter GitHub link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="liveLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Link</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter live project link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter technologies, separated by commas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-2" type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating Project..." : "Update Project"}
          </Button>
          <div>
            {`Go back to `}
            <Link
              href="/projects"
              className="text-blue-800 ml-2 hover:underline"
            >
              Projects
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProjectPage;
