"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

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
import { useCreateBlogsMutation } from "@/redux/api/blogApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  title: z.string().min(6, { message: "Title must be at least 6 characters" }),
  description: z.string().min(1, { message: "Content must be provided" }),
  category: z.string().min(1, { message: "Category must be selected" }),
  image: z.any(),
});

const AddBlogForm = () => {
  const [createBlog, { isLoading }] = useCreateBlogsMutation({});
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: null,
    },
  });

  const onSubmit = async (values: any) => {
    if (values.image && values.image.length > 0) {
      const url = await uploadImage(values.image[0]);
      values.image = url;
    } else {
      values.image = "";
    }

    try {
      const res = await createBlog(values).unwrap();
      // console.log(res);
      if (res?.id) {
        toast.success("Project created successfully");
        router.push("/dashboard/admin/blogs");
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 px-2 md:px-5 py-6">
          <div className="grid grid-cols-1  gap-4 justify-center items-center">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="text"
                      placeholder="Title..."
                      {...field}
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
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="description..."
                      theme="snow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="category..."
                      theme="snow"
                      className="rounded-md"
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
          </div>
          <div className="mt-6">
            <Button type="submit" disabled={isLoading} className="w-full">
              Add Now
              {isLoading && <Loader2 className="ml-6 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddBlogForm;
