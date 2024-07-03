"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utils/UploadImage";
import { useRouter } from "next/navigation";
import { useCreateProjectMutation } from "@/redux/api/projectsApi";

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

const CreateProject = () => {
  const router = useRouter();
  const [createProject, { isLoading, isError }] = useCreateProjectMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: null,
      description: "",
      gitHubLink: "",
      liveLink: "",
      technologies: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.image && values.image.length > 0) {
      const url = await uploadImage(values.image[0]);
      values.image = url;
    } else {
      values.image = "";
    }

    // Process the technologies string into an array
    const technologiesArray = values.technologies
      .split(",")
      .map((tech) => tech.trim());
    const updatedValues = { ...values, technologies: technologiesArray };

    try {
      const res = await createProject(updatedValues).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Project created successfully");
        router.push("/dashboard/admin/projects");
      }
    } catch (err: any) {
      toast(err?.message);
    }
  };

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
          <Button className="w-full mt-2" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Project..." : "Create Project"}
          </Button>
          <div>
            {`Go back to `}
            <Link
              href="/dashboard/admin/projects"
              className="text-teal-500 font-semibold   hover:underline"
            >
              Projects
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateProject;
