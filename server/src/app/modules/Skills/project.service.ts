import prisma from "../../../shared/prisma";
const getAllSkills = async () => {
  const result = await prisma.skills.findMany();
  return result;
};
const createSkills = async (data: any) => {
  const result = await prisma.skills.create({
    data,
  });
  return result;
};

const deleteSkills = async (id: string) => {
  const result = await prisma.skills.delete({
    where: {
      id,
    },
  });
  return result;
};

export const SkillsService = {
  getAllSkills,
  createSkills,
  deleteSkills,
};
