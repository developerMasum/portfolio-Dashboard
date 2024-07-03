"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useDeleteUserMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projectsApi";
import Link from "next/link";
import CreateProjectHeader from "@/components/Projects/CreateProjectHeader";

interface TProject {
  id: string;
  title: string;
  image: string;
  description: string;
  gitHubLink: string;
  liveLink: string;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectsPage = () => {
  const { data, isLoading } = useGetAllProjectsQuery({});
  const [deleteUser] = useDeleteProjectMutation({});
  const [updateUser] = useUpdateProjectMutation({});
  //   console.log(data?.donner);
  if (isLoading) {
    return <p>Loading.....</p>;
  }

  const projects: TProject[] = data?.projects as TProject[];

  if (!data || !data.projects || projects.length === 0) {
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
      <CreateProjectHeader />
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Live Link</TableHead>
              <TableHead>Github Link</TableHead>

              <TableHead>Action</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((user: TProject, index) => (
              <TableRow key={user?.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{user?.title}</TableCell>
                <TableCell className="font-medium">{user?.liveLink}</TableCell>
                <TableCell className="font-medium">
                  {user?.gitHubLink}
                </TableCell>

                <TableCell>
                  <Link href={`/dashboard/admin/projects/${user?.id}`}>
                    Edit
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(user?.id)}
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

export default ProjectsPage;
