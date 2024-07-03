import prisma from "../../../shared/prisma";
const getSingleDonor = async (id: string) => {
  const result = await prisma.projects.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const getAllProjects = async () => {
  const result = await prisma.projects.findMany();
  return result;
};
const createProject = async (data: any) => {
  const result = await prisma.projects.create({
    data,
  });
  return result;
};

const deleteProject = async (id: string) => {
  const result = await prisma.projects.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateProject = async (id: string, data: any) => {
  const result = await prisma.projects.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const ProjectService = {
  getAllProjects,
  getSingleDonor,
  createProject,
  deleteProject,
  updateProject,
};
