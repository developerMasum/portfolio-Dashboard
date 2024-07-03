"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReactHtmlParser from "html-react-parser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/redux/api/blogApi";
import { Plus } from "lucide-react";

interface TBlog {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogsPage = () => {
  const { data, isLoading } = useGetAllBlogsQuery({});
  const [deleteUser] = useDeleteBlogMutation();

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  const blogs: TBlog[] = data?.blogs as TBlog[];

  if (!data || !data.blogs || blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        You don&apos;t have any Projects
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUser(id);
      if (res.data) {
        toast.success("Project deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(
        "An error occurred while deleting the user. Please try again later."
      );
    }
  };

  return (
    <div>
      <div className="text-center">
        <Link
          href={"/dashboard/admin/blogs/create"}
          className="uppercase w-1/6 px-3 py-3 font-semibold  bg-teal-600 text-white text-sm rounded-md flex gap-2 my-4"
        >
          ADD a new Blog <Plus />
        </Link>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs?.map((blog: TBlog, index) => (
              <TableRow key={blog?.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {ReactHtmlParser(blog?.category)}
                </TableCell>
                <TableCell className="font-medium">{blog?.title}</TableCell>
                <TableCell className="font-medium">
                  {blog?.description?.length > 21
                    ? ReactHtmlParser(blog.description.slice(0, 21) + "...")
                    : ReactHtmlParser(blog?.description)}
                </TableCell>

                <TableCell>
                  <Link
                    href={`/dashboard/admin/blogs/${blog?.id}`}
                    className="font-medium text-teal-600 hover:underline"
                  >
                    Edit
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(blog?.id)}
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogsPage;
