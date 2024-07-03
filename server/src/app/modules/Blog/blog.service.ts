import prisma from "../../../shared/prisma";
const getSingleDonor = async (id: string) => {
  const result = await prisma.blogs.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllBlogs = async () => {
  const result = await prisma.blogs.findMany();
  return result;
};
const createBlog = async (data: any) => {
  const result = await prisma.blogs.create({
    data,
  });
  console.log(result);
  return result;
};

const deleteBlog = async (id: string) => {
  const result = await prisma.blogs.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateBlog = async (id: string, data: any) => {
  const result = await prisma.blogs.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const BlogService = {
  getAllBlogs,
  getSingleDonor,
  createBlog,
  deleteBlog,
  updateBlog,
};
